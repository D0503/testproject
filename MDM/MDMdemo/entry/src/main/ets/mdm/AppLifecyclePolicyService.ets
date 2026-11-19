import { applicationManager } from '@kit.MDMKit';
import { deviceInfo, BusinessError } from '@kit.BasicServicesKit';
import { buildAdminWant } from './MdmAdminWant';

export class AppLifecyclePolicyService {
  static setDisallowedRunningBundles(appIdentifiers: string[]): string {
    if (appIdentifiers.length > 200) {
      return '运行禁止名单单用户总数不能超过 200';
    }
    try {
      applicationManager.addDisallowedRunningBundlesSync(buildAdminWant(), appIdentifiers);
      return `已将 ${appIdentifiers.length} 个应用加入运行禁止名单`;
    } catch (err) {
      const e = err as BusinessError;
      return `addDisallowedRunningBundlesSync 失败 code=${e.code}`;
    }
  }

  static queryDisallowedRunningBundles(): string {
    try {
      const list = applicationManager.getDisallowedRunningBundlesSync(buildAdminWant());
      return `运行禁止名单共 ${list.length} 项: ${list.join(',')}`;
    } catch (err) {
      const e = err as BusinessError;
      return `getDisallowedRunningBundlesSync 失败 code=${e.code}`;
    }
  }

  static addAutoStartApp(bundleName: string, abilityName: string): string {
    try {
      // 目标应用必须真实安装在设备上，否则系统参数校验返回 401；Demo 以本应用自身作为演示目标
      const targetBundle = 'com.huaagcwei.mdm.hm';
      applicationManager.addAutoStartApps(buildAdminWant(), [{ bundleName: targetBundle, abilityName }]);
      return `已将 ${targetBundle}/${abilityName} 加入开机自启动名单`;
    } catch (err) {
      const e = err as BusinessError;
      return `addAutoStartApps 失败 code=${e.code}`;
    }
  }

  static addAllowedRunningWithSelf(targetAppIdentifier: string, accountId: number): string {
    if (deviceInfo.sdkApiVersion < 21) {
      return 'addAllowedRunningBundles 需要 API 21 及以上';
    }
    try {
      const selfIdentifier = 'demo_self_app_identifier';
      applicationManager.addAllowedRunningBundles(buildAdminWant(), [selfIdentifier, targetAppIdentifier], accountId);
      const allowed = applicationManager.getAllowedRunningBundles(buildAdminWant(), accountId);
      return `允许名单已含 MDM 应用自身与目标应用，当前名单: ${allowed.join(',')}`;
    } catch (err) {
      const e = err as BusinessError;
      return `addAllowedRunningBundles 失败 code=${e.code}（允许名单非空时不可再设置禁止名单，否则 9200010）`;
    }
  }

  static addUserNonStopApp(appIdentifier: string, accountId: number): string {
    if (deviceInfo.sdkApiVersion < 22) {
      return 'addUserNonStopApps 需要 API 22 及以上';
    }
    try {
      applicationManager.addUserNonStopApps(buildAdminWant(), [{ appIdentifier, accountId, appIndex: 0 }]);
      return `已将应用 ${appIdentifier} 加入不可关停名单`;
    } catch (err) {
      const e = err as BusinessError;
      return `addUserNonStopApps 失败 code=${e.code}`;
    }
  }
}
