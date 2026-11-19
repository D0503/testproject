import { uniformTypeDescriptor as utd } from '@kit.ArkData';
import { systemShare, harmonyShare } from '@kit.ShareKit';
import { fileUri, fileIo } from '@kit.CoreFileKit';
import { common } from '@kit.AbilityKit';
import { deviceInfo, BusinessError } from '@kit.BasicServicesKit';
import { window, componentUtils } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';

const DOMAIN: number = 0x0200;
const TAG: string = 'KnockShareDemo';
const FILE_ITEM_ID_PREFIX: string = 'kps-file-item-';

interface DemoFileItem {
  name: string;
  path: string;
  uri: string;
  utd: string;
}

interface DemoFileDef {
  name: string;
  content: string;
}

@Entry
@Component
struct Index {
  @State private windowId: number = -1;
  @State private fileList: DemoFileItem[] = [];
  @State private statusLines: string[] = [];
  @State private rejectReceive: boolean = false;
  @State private lastKnockCoordinate: string = '未获取';
  @State private lastReceiveCoordinate: string = '未获取';
  private recvRegistry: harmonyShare.RecvCapabilityRegistry | null = null;
  private sendRegistry: harmonyShare.SendCapabilityRegistry | null = null;

  aboutToAppear(): void {
    this.prepareDemoFiles();
    this.registerShareListeners();
  }

  aboutToDisappear(): void {
    this.unregisterShareListeners();
  }

  private getContext(): common.UIAbilityContext | null {
    try {
      return this.getUIContext().getHostContext() as common.UIAbilityContext;
    } catch (error) {
      hilog.error(DOMAIN, TAG, 'getHostContext failed: %{public}s', JSON.stringify(error));
      return null;
    }
  }

  private pushStatus(message: string): void {
    this.statusLines = [...this.statusLines, message];
    hilog.info(DOMAIN, TAG, '%{public}s', message);
  }

  private prepareDemoFiles(): void {
    const context = this.getContext();
    if (!context) {
      return;
    }
    const defs: DemoFileDef[] = [
      { name: 'knock-demo-image.jpg', content: 'knock share demo image placeholder' },
      { name: 'knock-demo-text.txt', content: 'knock share demo text file' }
    ];
    const items: DemoFileItem[] = [];
    for (const def of defs) {
      const path = `${context.filesDir}/${def.name}`;
      try {
        if (!fileIo.accessSync(path)) {
          const file = fileIo.openSync(path, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
          fileIo.writeSync(file.fd, def.content);
          fileIo.closeSync(file);
        }
        const extension = def.name.substring(def.name.lastIndexOf('.'));
        const utdId = utd.getUniformDataTypeByFilenameExtension(extension);
        items.push({ name: def.name, path: path, uri: fileUri.getUriFromPath(path), utd: utdId });
      } catch (error) {
        hilog.error(DOMAIN, TAG, 'prepare demo file failed: %{public}s', JSON.stringify(error));
      }
    }
    this.fileList = items;
    this.pushStatus(`演示文件已就绪（${items.length} 个，存放于应用沙箱目录）`);
  }

  // 精准分享门槛：电脑设备且 API 版本 >= 26.0.0，不满足时降级为普通碰一碰分享
  private isPreciseShareAvailable(): boolean {
    return deviceInfo.deviceType === '2in1' && deviceInfo.apiAvailable('26.0.0');
  }

  private registerShareListeners(): void {
    if (!canIUse('SystemCapability.Collaboration.HarmonyShare')) {
      this.pushStatus('当前设备不支持 SystemCapability.Collaboration.HarmonyShare，跳过监听注册');
      return;
    }
    const context = this.getContext();
    if (!context) {
      return;
    }
    window.getLastWindow(context).then((win: window.Window) => {
      const windowId = win.getWindowProperties().id;
      this.windowId = windowId;
      const capabilityRegistry: harmonyShare.RecvCapabilityRegistry = {
        windowId: windowId,
        capabilities: [
          { utd: utd.UniformDataType.TEXT, maxSupportedCount: 5 },
          { utd: utd.UniformDataType.IMAGE, maxSupportedCount: 5 },
          { utd: utd.UniformDataType.FILE, maxSupportedCount: 5 }
        ]
      };
      this.recvRegistry = capabilityRegistry;
      const sendRegistry: harmonyShare.SendCapabilityRegistry = { windowId: windowId };
      this.sendRegistry = sendRegistry;
      harmonyShare.on('knockShare', sendRegistry, this.knockShareCallback);
      harmonyShare.on('dataReceive', capabilityRegistry, this.dataReceiveCallback);
      this.pushStatus(`已注册 knockShare 与 dataReceive 监听（真实 windowId=${windowId}）`);
    }).catch((error: BusinessError) => {
      hilog.error(DOMAIN, TAG, 'getLastWindow failed: %{public}s', JSON.stringify(error));
      this.pushStatus('获取窗口失败，碰一碰监听未注册');
    });
  }

  private unregisterShareListeners(): void {
    if (!canIUse('SystemCapability.Collaboration.HarmonyShare')) {
      return;
    }
    try {
      if (this.recvRegistry) {
        harmonyShare.off('dataReceive', this.recvRegistry, this.dataReceiveCallback);
      }
      if (this.sendRegistry) {
        harmonyShare.off('knockShare', this.sendRegistry, this.knockShareCallback);
      }
      this.pushStatus('已取消 knockShare 与 dataReceive 监听');
    } catch (error) {
      hilog.error(DOMAIN, TAG, 'unregister failed: %{public}s', JSON.stringify(error));
    }
  }

  // 文件分享 SharedRecord：仅传 uri+utd（不携带 content，内容与文件不混合）；uri 经 fileUri.getUriFromPath 转换
  private buildShareRecord(item: DemoFileItem): systemShare.SharedRecord {
    return {
      utd: item.utd,
      uri: item.uri,
      thumbnailUri: item.uri,
      title: item.name,
      description: 'knock precise share demo file'
    };
  }

  // 触发点命中测试：坐标为以屏幕左上角为原点的整数 px，与组件 screenOffset 直接比较
  private hitTestFileItems(screenX: number, screenY: number): number {
    for (let index = 0; index < this.fileList.length; index++) {
      try {
        const rect = componentUtils.getRectangleById(`${FILE_ITEM_ID_PREFIX}${index}`);
        const left = rect.screenOffset.x;
        const top = rect.screenOffset.y;
        const right = left + rect.size.width;
        const bottom = top + rect.size.height;
        if (screenX >= left && screenX <= right && screenY >= top && screenY <= bottom) {
          return index;
        }
      } catch (error) {
        hilog.error(DOMAIN, TAG, 'hitTest failed: %{public}s', JSON.stringify(error));
      }
    }
    return -1;
  }

  private knockShareCallback = (sharableTarget: harmonyShare.SharableTarget) => {
    if (this.fileList.length === 0) {
      this.pushStatus('无可分享文件，未发起分享');
      return;
    }
    if (this.isPreciseShareAvailable()) {
      // 发送端精准分享：获取轻碰坐标并命中文件项
      const sharableTargetInfo = sharableTarget.getInfo();
      const screenX = sharableTargetInfo.coordinate?.screenX;
      const screenY = sharableTargetInfo.coordinate?.screenY;
      this.lastKnockCoordinate = screenX !== undefined && screenY !== undefined ?
        `screenX=${screenX}, screenY=${screenY}` : '未获取到轻碰坐标';
      if (screenX === undefined || screenY === undefined) {
        this.pushStatus('触发点无坐标信息，未匹配到图片/视频元素，按官网规则不发送文件');
        return;
      }
      const hitIndex = this.hitTestFileItems(screenX, screenY);
      if (hitIndex < 0) {
        this.pushStatus(`触发点(${screenX}, ${screenY})无匹配文件项，按官网规则不发送任何文件`);
        return;
      }
      const item = this.fileList[hitIndex];
      const shareData = new systemShare.SharedData(this.buildShareRecord(item));
      sharableTarget.share(shareData);
      this.pushStatus(`精准分享：触发点命中 ${item.name}，已发起分享`);
      return;
    }
    // 降级：普通碰一碰分享全部演示文件
    const shareData = new systemShare.SharedData(this.buildShareRecord(this.fileList[0]));
    for (let index = 1; index < this.fileList.length; index++) {
      try {
        shareData.addRecord(this.buildShareRecord(this.fileList[index]));
      } catch (error) {
        hilog.error(DOMAIN, TAG, 'addRecord failed: %{public}s', JSON.stringify(error));
      }
    }
    sharableTarget.share(shareData);
    this.pushStatus('普通碰一碰分享：已发起全部演示文件分享');
  };

  private dataReceiveCallback = (receivableTarget: harmonyShare.ReceivableTarget) => {
    if (this.rejectReceive) {
      receivableTarget.reject(harmonyShare.ReceivableErrorCode.NO_RECEIVABLE_ERROR);
      this.pushStatus('按页面开关拒绝本次沙箱接收（NO_RECEIVABLE_ERROR）');
      return;
    }
    const context = this.getContext();
    if (!context) {
      return;
    }
    let hitIndex = -1;
    if (this.isPreciseShareAvailable()) {
      // 接收端精准分享：获取轻碰坐标决定插入位置
      const receivableTargetInfo = receivableTarget.getInfo();
      const screenX = receivableTargetInfo.coordinate?.screenX;
      const screenY = receivableTargetInfo.coordinate?.screenY;
      this.lastReceiveCoordinate = screenX !== undefined && screenY !== undefined ?
        `screenX=${screenX}, screenY=${screenY}` : '未获取到轻碰坐标';
      if (screenX !== undefined && screenY !== undefined) {
        hitIndex = this.hitTestFileItems(screenX, screenY);
      }
    }
    const sandboxUri = fileUri.getUriFromPath(context.filesDir);
    receivableTarget.receive(sandboxUri, {
      onDataReceived: (sharedData: systemShare.SharedData) => {
        const sharedRecords = sharedData.getRecords();
        sharedRecords.forEach((record: systemShare.SharedRecord) => {
          if (!record.uri) {
            return;
          }
          const name = record.uri.split('/').pop() ?? 'received-file';
          const received: DemoFileItem = { name: name, path: record.uri, uri: record.uri, utd: record.utd };
          if (hitIndex >= 0) {
            this.fileList = [
              ...this.fileList.slice(0, hitIndex),
              received,
              ...this.fileList.slice(hitIndex)
            ];
            this.pushStatus(`触发点命中文件项，已将 ${name} 插入位置 ${hitIndex}`);
          } else {
            this.fileList = [...this.fileList, received];
            this.pushStatus(`触发点无匹配元素，已将 ${name} 追加到文件列表末尾`);
          }
        });
      },
      onResult: (resultCode: harmonyShare.ShareResultCode) => {
        if (resultCode === harmonyShare.ShareResultCode.SHARE_SUCCESS) {
          this.pushStatus('沙箱接收成功（SHARE_SUCCESS）');
        } else if (resultCode === harmonyShare.ShareResultCode.SEND_FAILED) {
          this.pushStatus('数据传输失败（SEND_FAILED）');
        } else if (resultCode === harmonyShare.ShareResultCode.CANCEL_BY_SENDER) {
          this.pushStatus('发送端取消发送（CANCEL_BY_SENDER）');
        } else if (resultCode === harmonyShare.ShareResultCode.CANCEL_BY_RECEIVER) {
          this.pushStatus('接收端取消接收（CANCEL_BY_RECEIVER）');
        } else {
          this.pushStatus(`沙箱接收结束，结果码 ${resultCode}`);
        }
      }
    });
  };

  build() {
    Column() {
      Text('碰一碰精准分享 Demo')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 12, bottom: 8 })
      Text('KPS-S003 沙箱接收 / KPS-S004 轻碰坐标精准分享')
        .fontSize(14)
        .fontColor('#666666')
        .margin({ bottom: 8 })
      Text(`设备类型=${deviceInfo.deviceType}，精准分享(电脑+API>=26.0.0)=${this.isPreciseShareAvailable() ? '可用' : '不可用，降级普通碰一碰'}`)
        .fontSize(13)
        .margin({ bottom: 4 })
      Text(`发送侧轻碰坐标：${this.lastKnockCoordinate}；接收侧轻碰坐标：${this.lastReceiveCoordinate}`)
        .fontSize(13)
        .margin({ bottom: 4 })
      Row() {
        Text('拒绝本次沙箱接收')
          .fontSize(14)
        Toggle({ type: ToggleType.Switch, isOn: this.rejectReceive })
          .onChange((isOn: boolean) => {
            this.rejectReceive = isOn;
          })
      }
      .margin({ bottom: 8 })

      Text('官网行为说明：类型不匹配时跳过已注册沙箱能力、回退华为分享默认逻辑接收；数量不匹配由系统弹窗提示；utd=IMAGE 默认存图库、utd=FILE 默认存文件管理；注册 dataReceive 后文件存应用沙箱目录；内容分享(content)与文件分享(uri)不可混合。')
        .fontSize(12)
        .fontColor('#888888')
        .margin({ bottom: 8 })

      Text('文件列表（轻碰触发点命中项将决定插入/发送目标）')
        .fontSize(14)
        .margin({ bottom: 4 })
      List({ space: 6 }) {
        ForEach(this.fileList, (item: DemoFileItem, index: number) => {
          ListItem() {
            Row() {
              Text(`${index}. ${item.name}`)
                .fontSize(14)
                .layoutWeight(1)
              Text(item.utd)
                .fontSize(12)
                .fontColor('#0A7CFF')
            }
            .id(`${FILE_ITEM_ID_PREFIX}${index}`)
            .width('100%')
            .padding(8)
            .backgroundColor('#F0F6FF')
            .borderRadius(8)
          }
        }, (item: DemoFileItem) => item.uri)
      }
      .layoutWeight(1)
      .width('100%')

      Text('状态日志')
        .fontSize(14)
        .margin({ top: 8, bottom: 4 })
      List({ space: 4 }) {
        ForEach(this.statusLines, (line: string) => {
          ListItem() {
            Text(line)
              .fontSize(12)
              .fontColor('#333333')
          }
        }, (line: string) => line)
      }
      .layoutWeight(1)
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .padding(16)
  }
}
