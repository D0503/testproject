import { deviceInfo } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { AdminActivationService } from '../mdm/AdminActivationService';
import { AppLifecyclePolicyService } from '../mdm/AppLifecyclePolicyService';
import { RestrictionPolicyService } from '../mdm/RestrictionPolicyService';
import { KeyAndLogPolicyService } from '../mdm/KeyAndLogPolicyService';
import { adminComponentLabel } from '../mdm/MdmAdminWant';

@Entry
@Component
struct Index {
  @State logLines: string[] = [];
  @State currentSdk: number = deviceInfo.sdkApiVersion;

  private appendLog(line: string): void {
    this.logLines = [...this.logLines, `[${new Date().toLocaleTimeString()}] ${line}`];
    hilog.info(0x0001, 'MdmDemo', '%{public}s', line);
  }

  build() {
    Column({ space: 10 }) {
      Text('企业设备管理（MDM Kit）文档验证 Demo')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
      Text(`管理组件: ${adminComponentLabel()}`)
        .fontSize(12)
        .fontColor(Color.Gray)
      Text(`当前设备 API 版本: ${this.currentSdk}`)
        .fontSize(12)
        .fontColor(Color.Gray)
      Text('说明: 未激活设备管理应用时接口返回 9200001/9200002 属预期；调试激活见 entry/debug/edm-debug.md')
        .fontSize(12)
        .fontColor(Color.Orange)

      Scroll() {
        Column({ space: 8 }) {
          Button('S003: 订阅管理事件')
            .onClick(() => this.appendLog(AdminActivationService.subscribeManagedEvents()))
          Button('S003: 查询是否 BYOD 管理应用')
            .onClick(() => this.appendLog(AdminActivationService.queryIsByodAdmin()))
          Button('S003: BYOD 拉起激活页')
            .onClick(() => this.appendLog(AdminActivationService.startByodAdminProvision(this.getUIContext().getHostContext() as never)))
          Button('S003: 解除激活自身')
            .onClick(async () => this.appendLog(await AdminActivationService.deactivateSelf()))
          Button('S004: 下发运行禁止名单')
            .onClick(() => this.appendLog(AppLifecyclePolicyService.setDisallowedRunningBundles(['demo_app_identifier_1'])))
          Button('S004: 查询运行禁止名单')
            .onClick(() => this.appendLog(AppLifecyclePolicyService.queryDisallowedRunningBundles()))
          Button('S004: 添加开机自启动应用')
            .onClick(() => this.appendLog(AppLifecyclePolicyService.addAutoStartApp('com.example.targetapp', 'EntryAbility')))
          Button('S008: 禁用 Wi-Fi 能力')
            .onClick(() => this.appendLog(RestrictionPolicyService.setWifiDisallowed(true)))
          Button('S008: 查询 Wi-Fi 禁用状态')
            .onClick(() => this.appendLog(RestrictionPolicyService.queryWifiDisallowed()))
          Button('S008: 设置用户级限制（修改壁纸）')
            .onClick(() => this.appendLog(RestrictionPolicyService.setUserRestrictionDemo(100, true)))
          Button('S002: 下发电源键按键策略')
            .onClick(() => this.appendLog(KeyAndLogPolicyService.setupKeyEventPolicies()))
          Button('S002: 创建日志收集任务')
            .onClick(async () => this.appendLog(await KeyAndLogPolicyService.startLogCollect()))
        }
        .width('100%')
      }
      .layoutWeight(1)

      Scroll() {
        Text(this.logLines.join('\n'))
          .fontSize(11)
          .width('100%')
      }
      .layoutWeight(1)
      .backgroundColor('#F5F5F5')
      .width('100%')
    }
    .padding(16)
    .width('100%')
    .height('100%')
  }
}
