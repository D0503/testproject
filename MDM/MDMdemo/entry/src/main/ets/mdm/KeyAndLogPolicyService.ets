import { systemManager } from '@kit.MDMKit';
import { deviceInfo, BusinessError } from '@kit.BasicServicesKit';
import { buildAdminWant } from './MdmAdminWant';

export class KeyAndLogPolicyService {
  static setupKeyEventPolicies(): string {
    if (deviceInfo.sdkApiVersion < 23) {
      return 'addKeyEventPolicies 需要 API 23 及以上（且仅 Phone/Tablet 正常调用）';
    }
    try {
      systemManager.addKeyEventPolicies(buildAdminWant(), [
        {
          keyCode: systemManager.KeyCode.POWER,
          keyPolicy: systemManager.KeyPolicy.CUSTOM
        }
      ]);
      return '已下发按键事件处理策略（电源键自定义）';
    } catch (err) {
      const e = err as BusinessError;
      return `addKeyEventPolicies 失败 code=${e.code}`;
    }
  }

  static async startLogCollect(): Promise<string> {
    if (deviceInfo.sdkApiVersion < 23) {
      return 'startCollectLog 需要 API 23 及以上（且仅 PC/2in1 正常调用）';
    }
    try {
      await systemManager.startCollectLog(buildAdminWant());
      return '日志收集任务已创建，等待 onLogCollected 回调';
    } catch (err) {
      const e = err as BusinessError;
      return `startCollectLog 失败 code=${e.code}`;
    }
  }
}
