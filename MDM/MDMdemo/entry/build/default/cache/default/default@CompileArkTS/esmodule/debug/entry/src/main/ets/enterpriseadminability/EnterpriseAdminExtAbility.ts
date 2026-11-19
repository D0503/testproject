import EnterpriseAdminExtensionAbility from "@ohos:enterprise.EnterpriseAdminExtensionAbility";
import adminManager from "@ohos:enterprise.adminManager";
import common from "@ohos:enterprise.common";
import systemManager from "@ohos:enterprise.systemManager";
import deviceInfo from "@ohos:deviceInfo";
import hilog from "@ohos:hilog";
import { buildAdminWant } from "@bundle:com.huaagcwei.mdm.hm/entry/ets/mdm/MdmAdminWant";
const TAG = 'EdmAdminExt';
export default class EnterpriseAdminExtAbility extends EnterpriseAdminExtensionAbility {
    onAdminEnabled(): void {
        hilog.info(0x0000, TAG, 'onAdminEnabled: 激活回调，进行初始化策略设置');
        try {
            adminManager.subscribeManagedEventSync(buildAdminWant(), [
                adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_ADDED,
                adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_REMOVED,
                adminManager.ManagedEvent.MANAGED_EVENT_APP_START,
                adminManager.ManagedEvent.MANAGED_EVENT_APP_STOP
            ]);
            hilog.info(0x0000, TAG, '管理事件订阅成功');
        }
        catch (err) {
            hilog.error(0x0000, TAG, `订阅失败: ${JSON.stringify(err)}`);
        }
    }
    onAdminDisabled(): void {
        hilog.info(0x0000, TAG, 'onAdminDisabled: 解除激活回调，通知企业管理员并清理');
        try {
            adminManager.unsubscribeManagedEventSync(buildAdminWant(), [
                adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_ADDED,
                adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_REMOVED,
                adminManager.ManagedEvent.MANAGED_EVENT_APP_START,
                adminManager.ManagedEvent.MANAGED_EVENT_APP_STOP
            ]);
        }
        catch (err) {
            hilog.error(0x0000, TAG, `取消订阅失败: ${JSON.stringify(err)}`);
        }
    }
    onBundleAdded(bundleName: string, accountId?: number): void {
        hilog.info(0x0000, TAG, `onBundleAdded: ${bundleName}, accountId=${accountId ?? 'current'}`);
    }
    onBundleRemoved(bundleName: string, accountId?: number): void {
        hilog.info(0x0000, TAG, `onBundleRemoved: ${bundleName}, accountId=${accountId ?? 'current'}`);
    }
    onAppStart(bundleName: string, accountId?: number): void {
        hilog.info(0x0000, TAG, `onAppStart: ${bundleName}, accountId=${accountId ?? 'current'}`);
    }
    onAppStop(bundleName: string, accountId?: number): void {
        hilog.info(0x0000, TAG, `onAppStop: ${bundleName}, accountId=${accountId ?? 'current'}`);
    }
    onKeyEvent(keyEvent: systemManager.KeyEvent): void {
        hilog.info(0x0000, TAG, `onKeyEvent: keyCode=${keyEvent.keyCode}, action=${keyEvent.keyAction}, items=${keyEvent.keyItems.length}`);
    }
    onLogCollected(result: common.Result): void {
        hilog.info(0x0000, TAG, `onLogCollected: result=${result}`);
        if (result === common.Result.SUCCESS) {
            hilog.info(0x0000, TAG, '日志收集成功，须访问沙箱目录 /data/edm/log 获取日志后清理');
            try {
                systemManager.finishLogCollected(buildAdminWant());
            }
            catch (err) {
                hilog.error(0x0000, TAG, `finishLogCollected 失败: ${JSON.stringify(err)}`);
            }
        }
    }
    onAdminPolicyChanged(event: common.PolicyChangedEvent): void {
        hilog.info(0x0000, TAG, `onAdminPolicyChanged: bundle=${event.bundleName}, function=${event.functionName}`);
    }
    async startTargetAbilityByAdmin(): Promise<string> {
        if (deviceInfo.sdkApiVersion < 23) {
            return '当前系统不支持 startAbilityByAdmin（需要 23 及以上）';
        }
        try {
            await this.context.startAbilityByAdmin(buildAdminWant(), {
                bundleName: 'com.example.targetapp',
                abilityName: 'EntryAbility'
            });
            return '已通过 startAbilityByAdmin 静默启动目标组件';
        }
        catch (err) {
            return `startAbilityByAdmin 失败: ${JSON.stringify(err)}`;
        }
    }
}
