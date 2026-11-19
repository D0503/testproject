if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    windowId?: number;
    fileList?: DemoFileItem[];
    statusLines?: string[];
    rejectReceive?: boolean;
    lastKnockCoordinate?: string;
    lastReceiveCoordinate?: string;
    recvRegistry?: harmonyShare.RecvCapabilityRegistry | null;
    sendRegistry?: harmonyShare.SendCapabilityRegistry | null;
    knockShareCallback?;
    dataReceiveCallback?;
}
import utd from "@ohos:data.uniformTypeDescriptor";
import systemShare from "@hms:collaboration.systemShare";
import harmonyShare from "@hms:collaboration.harmonyShare";
import fileUri from "@ohos:file.fileuri";
import fileIo from "@ohos:file.fs";
import type common from "@ohos:app.ability.common";
import deviceInfo from "@ohos:deviceInfo";
import type { BusinessError } from "@ohos:base";
import window from "@ohos:window";
import componentUtils from "@ohos:arkui.componentUtils";
import hilog from "@ohos:hilog";
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
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__windowId = new ObservedPropertySimplePU(-1, this, "windowId");
        this.__fileList = new ObservedPropertyObjectPU([], this, "fileList");
        this.__statusLines = new ObservedPropertyObjectPU([], this, "statusLines");
        this.__rejectReceive = new ObservedPropertySimplePU(false, this, "rejectReceive");
        this.__lastKnockCoordinate = new ObservedPropertySimplePU('未获取', this, "lastKnockCoordinate");
        this.__lastReceiveCoordinate = new ObservedPropertySimplePU('未获取', this, "lastReceiveCoordinate");
        this.recvRegistry = null;
        this.sendRegistry = null;
        this.knockShareCallback = (sharableTarget: harmonyShare.SharableTarget) => {
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
                }
                catch (error) {
                    hilog.error(DOMAIN, TAG, 'addRecord failed: %{public}s', JSON.stringify(error));
                }
            }
            sharableTarget.share(shareData);
            this.pushStatus('普通碰一碰分享：已发起全部演示文件分享');
        };
        this.dataReceiveCallback = (receivableTarget: harmonyShare.ReceivableTarget) => {
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
                        }
                        else {
                            this.fileList = [...this.fileList, received];
                            this.pushStatus(`触发点无匹配元素，已将 ${name} 追加到文件列表末尾`);
                        }
                    });
                },
                onResult: (resultCode: harmonyShare.ShareResultCode) => {
                    if (resultCode === harmonyShare.ShareResultCode.SHARE_SUCCESS) {
                        this.pushStatus('沙箱接收成功（SHARE_SUCCESS）');
                    }
                    else if (resultCode === harmonyShare.ShareResultCode.SEND_FAILED) {
                        this.pushStatus('数据传输失败（SEND_FAILED）');
                    }
                    else if (resultCode === harmonyShare.ShareResultCode.CANCEL_BY_SENDER) {
                        this.pushStatus('发送端取消发送（CANCEL_BY_SENDER）');
                    }
                    else if (resultCode === harmonyShare.ShareResultCode.CANCEL_BY_RECEIVER) {
                        this.pushStatus('接收端取消接收（CANCEL_BY_RECEIVER）');
                    }
                    else {
                        this.pushStatus(`沙箱接收结束，结果码 ${resultCode}`);
                    }
                }
            });
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.windowId !== undefined) {
            this.windowId = params.windowId;
        }
        if (params.fileList !== undefined) {
            this.fileList = params.fileList;
        }
        if (params.statusLines !== undefined) {
            this.statusLines = params.statusLines;
        }
        if (params.rejectReceive !== undefined) {
            this.rejectReceive = params.rejectReceive;
        }
        if (params.lastKnockCoordinate !== undefined) {
            this.lastKnockCoordinate = params.lastKnockCoordinate;
        }
        if (params.lastReceiveCoordinate !== undefined) {
            this.lastReceiveCoordinate = params.lastReceiveCoordinate;
        }
        if (params.recvRegistry !== undefined) {
            this.recvRegistry = params.recvRegistry;
        }
        if (params.sendRegistry !== undefined) {
            this.sendRegistry = params.sendRegistry;
        }
        if (params.knockShareCallback !== undefined) {
            this.knockShareCallback = params.knockShareCallback;
        }
        if (params.dataReceiveCallback !== undefined) {
            this.dataReceiveCallback = params.dataReceiveCallback;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__windowId.purgeDependencyOnElmtId(rmElmtId);
        this.__fileList.purgeDependencyOnElmtId(rmElmtId);
        this.__statusLines.purgeDependencyOnElmtId(rmElmtId);
        this.__rejectReceive.purgeDependencyOnElmtId(rmElmtId);
        this.__lastKnockCoordinate.purgeDependencyOnElmtId(rmElmtId);
        this.__lastReceiveCoordinate.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__windowId.aboutToBeDeleted();
        this.__fileList.aboutToBeDeleted();
        this.__statusLines.aboutToBeDeleted();
        this.__rejectReceive.aboutToBeDeleted();
        this.__lastKnockCoordinate.aboutToBeDeleted();
        this.__lastReceiveCoordinate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __windowId: ObservedPropertySimplePU<number>;
    get windowId() {
        return this.__windowId.get();
    }
    set windowId(newValue: number) {
        this.__windowId.set(newValue);
    }
    private __fileList: ObservedPropertyObjectPU<DemoFileItem[]>;
    get fileList() {
        return this.__fileList.get();
    }
    set fileList(newValue: DemoFileItem[]) {
        this.__fileList.set(newValue);
    }
    private __statusLines: ObservedPropertyObjectPU<string[]>;
    get statusLines() {
        return this.__statusLines.get();
    }
    set statusLines(newValue: string[]) {
        this.__statusLines.set(newValue);
    }
    private __rejectReceive: ObservedPropertySimplePU<boolean>;
    get rejectReceive() {
        return this.__rejectReceive.get();
    }
    set rejectReceive(newValue: boolean) {
        this.__rejectReceive.set(newValue);
    }
    private __lastKnockCoordinate: ObservedPropertySimplePU<string>;
    get lastKnockCoordinate() {
        return this.__lastKnockCoordinate.get();
    }
    set lastKnockCoordinate(newValue: string) {
        this.__lastKnockCoordinate.set(newValue);
    }
    private __lastReceiveCoordinate: ObservedPropertySimplePU<string>;
    get lastReceiveCoordinate() {
        return this.__lastReceiveCoordinate.get();
    }
    set lastReceiveCoordinate(newValue: string) {
        this.__lastReceiveCoordinate.set(newValue);
    }
    private recvRegistry: harmonyShare.RecvCapabilityRegistry | null;
    private sendRegistry: harmonyShare.SendCapabilityRegistry | null;
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
        }
        catch (error) {
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
            }
            catch (error) {
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
        }
        catch (error) {
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
            }
            catch (error) {
                hilog.error(DOMAIN, TAG, 'hitTest failed: %{public}s', JSON.stringify(error));
            }
        }
        return -1;
    }
    private knockShareCallback;
    private dataReceiveCallback;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('碰一碰精准分享 Demo');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 12, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('KPS-S003 沙箱接收 / KPS-S004 轻碰坐标精准分享');
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`设备类型=${deviceInfo.deviceType}，精准分享(电脑+API>=26.0.0)=${this.isPreciseShareAvailable() ? '可用' : '不可用，降级普通碰一碰'}`);
            Text.fontSize(13);
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`发送侧轻碰坐标：${this.lastKnockCoordinate}；接收侧轻碰坐标：${this.lastReceiveCoordinate}`);
            Text.fontSize(13);
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('拒绝本次沙箱接收');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.rejectReceive });
            Toggle.onChange((isOn: boolean) => {
                this.rejectReceive = isOn;
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('官网行为说明：类型不匹配时跳过已注册沙箱能力、回退华为分享默认逻辑接收；数量不匹配由系统弹窗提示；utd=IMAGE 默认存图库、utd=FILE 默认存文件管理；注册 dataReceive 后文件存应用沙箱目录；内容分享(content)与文件分享(uri)不可混合。');
            Text.fontSize(12);
            Text.fontColor('#888888');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('文件列表（轻碰触发点命中项将决定插入/发送目标）');
            Text.fontSize(14);
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 6 });
            List.layoutWeight(1);
            List.width('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.id(`${FILE_ITEM_ID_PREFIX}${index}`);
                            Row.width('100%');
                            Row.padding(8);
                            Row.backgroundColor('#F0F6FF');
                            Row.borderRadius(8);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`${index}. ${item.name}`);
                            Text.fontSize(14);
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.utd);
                            Text.fontSize(12);
                            Text.fontColor('#0A7CFF');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.fileList, forEachItemGenFunction, (item: DemoFileItem) => item.uri, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('状态日志');
            Text.fontSize(14);
            Text.margin({ top: 8, bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 4 });
            List.layoutWeight(1);
            List.width('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const line = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(line);
                            Text.fontSize(12);
                            Text.fontColor('#333333');
                        }, Text);
                        Text.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.statusLines, forEachItemGenFunction, (line: string) => line, false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.knocksharedemo", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
