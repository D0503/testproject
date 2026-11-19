import { adminManager } from '@kit.MDMKit';
import { common } from '@kit.AbilityKit';
import { deviceInfo, BusinessError } from '@kit.BasicServicesKit';
import { buildAdminWant, adminComponentLabel } from './MdmAdminWant';

export class AdminActivationService {
  static subscribeManagedEvents(): string {
    try {
      adminManager.subscribeManagedEventSync(buildAdminWant(), [
        adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_ADDED,
        adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_REMOVED
      ]);
      return `已为 ${adminComponentLabel()} 订阅管理事件`;
    } catch (err) {
      const e = err as BusinessError;
      return `订阅失败 code=${e.code} message=${e.message}`;
    }
  }

  static unsubscribeManagedEvents(): string {
    try {
      adminManager.unsubscribeManagedEventSync(buildAdminWant(), [
        adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_ADDED,
        adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_REMOVED
      ]);
      return '已取消订阅管理事件';
    } catch (err) {
      const e = err as BusinessError;
      return `取消订阅失败 code=${e.code}`;
    }
  }

  static queryIsByodAdmin(): string {
    if (deviceInfo.sdkApiVersion < 20) {
      return 'isByodAdmin 需要 API 20 及以上';
    }
    try {
      const result = adminManager.isByodAdmin(buildAdminWant());
      return `当前应用是否为 BYOD 设备管理应用: ${result}`;
    } catch (err) {
      const e = err as BusinessError;
      return `isByodAdmin 失败 code=${e.code}`;
    }
  }

  static startByodAdminProvision(context: common.Context): string {
    if (deviceInfo.sdkApiVersion < 15) {
      return 'startAdminProvision 需要 API 15 及以上';
    }
    try {
      adminManager.startAdminProvision(buildAdminWant(), adminManager.AdminType.ADMIN_TYPE_BYOD, context, {
        activateId: 'demo-activate-id'
      });
      return '已拉起 BYOD 管理员激活页面';
    } catch (err) {
      const e = err as BusinessError;
      return `startAdminProvision 失败 code=${e.code}`;
    }
  }

  static async enableDeviceAdminBySda(): Promise<string> {
    if (deviceInfo.sdkApiVersion < 23) {
      return 'enableDeviceAdmin 需要 API 23 及以上，且仅 PC/2in1 正常调用（其他设备返回 801）';
    }
    try {
      await adminManager.enableDeviceAdmin(buildAdminWant());
      return 'DA 激活成功';
    } catch (err) {
      const e = err as BusinessError;
      return `enableDeviceAdmin 失败 code=${e.code}`;
    }
  }

  static async disableDeviceAdminBySda(): Promise<string> {
    if (deviceInfo.sdkApiVersion < 23) {
      return 'disableDeviceAdmin 需要 API 23 及以上';
    }
    try {
      await adminManager.disableDeviceAdmin(buildAdminWant());
      return 'DA 解除激活成功';
    } catch (err) {
      const e = err as BusinessError;
      return `disableDeviceAdmin 失败 code=${e.code}`;
    }
  }

  static enableSelfDeviceAdminWithCredential(credential: string): string {
    if (deviceInfo.sdkApiVersion < 26) {
      return 'enableSelfDeviceAdmin 需要 API 26.0.0 及以上';
    }
    try {
      adminManager.enableSelfDeviceAdmin(buildAdminWant(), credential);
      return '自激活调用成功';
    } catch (err) {
      const e = err as BusinessError;
      return `enableSelfDeviceAdmin 失败 code=${e.code}`;
    }
  }

  static delegatePolicies(targetBundleName: string): string {
    if (deviceInfo.sdkApiVersion < 14) {
      return '委托策略接口需要 API 14 及以上';
    }
    try {
      adminManager.setDelegatedPolicies(buildAdminWant(), targetBundleName, ['disallow_running_bundles']);
      const delegated = adminManager.getDelegatedPolicies(buildAdminWant(), targetBundleName);
      return `已向 ${targetBundleName} 委托策略: ${delegated.join(',')}`;
    } catch (err) {
      const e = err as BusinessError;
      return `委托策略失败 code=${e.code}`;
    }
  }

  static async deactivateSelf(): Promise<string> {
    try {
      await adminManager.disableAdmin(buildAdminWant());
      return '已解除激活';
    } catch (err) {
      const e = err as BusinessError;
      return `disableAdmin 失败 code=${e.code}`;
    }
  }
}
