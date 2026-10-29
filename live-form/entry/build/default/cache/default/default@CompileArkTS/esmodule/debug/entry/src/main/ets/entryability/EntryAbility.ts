import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
const TAG: string = 'EntryAbility';
const DOMAIN_NUMBER: number = 0xFF00;
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(DOMAIN_NUMBER, TAG, 'onCreate');
    }
    onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(DOMAIN_NUMBER, TAG, 'onNewWant');
    }
    onDestroy(): void {
        hilog.info(DOMAIN_NUMBER, TAG, 'onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        windowStage.loadContent('pages/Index', (err) => {
            if (err.code) {
                hilog.error(DOMAIN_NUMBER, TAG, `loadContent failed, code: ${err.code}, message: ${err.message}`);
            }
        });
    }
    onWindowStageDestroy(): void {
    }
    onForeground(): void {
    }
    onBackground(): void {
    }
}
