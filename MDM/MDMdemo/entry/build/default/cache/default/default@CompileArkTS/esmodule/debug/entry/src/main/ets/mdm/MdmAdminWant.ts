import type Want from "@ohos:app.ability.Want";
const ADMIN_BUNDLE_NAME = 'com.huaagcwei.mdm.hm';
const ADMIN_ABILITY_NAME = 'EnterpriseAdminExtAbility';
export function buildAdminWant(): Want {
    return {
        bundleName: ADMIN_BUNDLE_NAME,
        abilityName: ADMIN_ABILITY_NAME
    };
}
export function adminComponentLabel(): string {
    return `${ADMIN_BUNDLE_NAME}/${ADMIN_ABILITY_NAME}`;
}
