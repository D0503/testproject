import restrictions from "@ohos:enterprise.restrictions";
import deviceInfo from "@ohos:deviceInfo";
import type { BusinessError } from "@ohos:base";
import { buildAdminWant } from "@bundle:com.huaagcwei.mdm.hm/entry/ets/mdm/MdmAdminWant";
export class RestrictionPolicyService {
    static setWifiDisallowed(disallow: boolean): string {
        if (deviceInfo.sdkApiVersion >= 24) {
            try {
                restrictions.setDisallowedPolicy(buildAdminWant(), restrictions.FeatureForDevice.WIFI, disallow);
                return `已按 24+ 枚举接口${disallow ? '禁用' : '放开'}设备 Wi-Fi 能力`;
            }
            catch (err) {
                const e = err as BusinessError;
                return `setDisallowedPolicy(枚举) 失败 code=${e.code}`;
            }
        }
        try {
            restrictions.setDisallowedPolicy(buildAdminWant(), 'wifi', disallow);
            return `已按旧字符串接口${disallow ? '禁用' : '放开'}设备 Wi-Fi 能力（该字符串接口于 26.0.0 废弃，低版本兼容路径）`;
        }
        catch (err) {
            const e = err as BusinessError;
            return `setDisallowedPolicy(字符串) 失败 code=${e.code}`;
        }
    }
    static queryWifiDisallowed(): string {
        if (deviceInfo.sdkApiVersion >= 24) {
            try {
                const result = restrictions.getDisallowedPolicy(buildAdminWant(), restrictions.FeatureForDevice.WIFI);
                if (deviceInfo.sdkApiVersion >= 26) {
                    const effective = restrictions.getDisallowedPolicy(null, restrictions.FeatureForDevice.WIFI);
                    return `Wi-Fi 禁用策略: 本应用设置=${result}，整机实际生效=${effective}`;
                }
                return `Wi-Fi 禁用策略（本应用设置）: ${result}`;
            }
            catch (err) {
                const e = err as BusinessError;
                return `getDisallowedPolicy(枚举) 失败 code=${e.code}`;
            }
        }
        try {
            const result = restrictions.getDisallowedPolicy(buildAdminWant(), 'wifi');
            return `Wi-Fi 禁用策略（旧接口查询）: ${result}`;
        }
        catch (err) {
            const e = err as BusinessError;
            return `getDisallowedPolicy(字符串) 失败 code=${e.code}`;
        }
    }
    static setUserRestrictionDemo(accountId: number, restricted: boolean): string {
        if (deviceInfo.sdkApiVersion < 26) {
            return 'setUserRestrictionForAccount(SettingsForAccount) 需要 API 26.0.0 及以上';
        }
        try {
            restrictions.setUserRestrictionForAccount(buildAdminWant(), restrictions.SettingsForAccount.MODIFY_WALLPAPER, accountId, restricted);
            const current = restrictions.getUserRestrictedForAccount(buildAdminWant(), restrictions.SettingsForAccount.MODIFY_WALLPAPER, accountId);
            return `用户级限制（修改壁纸）已${restricted ? '设置' : '解除'}，当前实际: ${current}`;
        }
        catch (err) {
            const e = err as BusinessError;
            return `用户级限制接口失败 code=${e.code}`;
        }
    }
}
