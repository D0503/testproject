import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import type { BusinessError } from "@ohos:base";
const DOMAIN: number = 0x0200;
const TAG: string = 'EntryAbility';
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(DOMAIN, TAG, '%{public}s', 'onCreate');
    }
    onDestroy(): void {
        hilog.info(DOMAIN, TAG, '%{public}s', 'onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        windowStage.loadContent('pages/Index', (err: BusinessError<void>) => {
            if (err.code) {
                hilog.error(DOMAIN, TAG, 'loadContent failed %{public}s', JSON.stringify(err));
                return;
            }
            hilog.info(DOMAIN, TAG, '%{public}s', 'loadContent succeed');
        });
    }
    onWindowStageDestroy(): void {
        hilog.info(DOMAIN, TAG, '%{public}s', 'onWindowStageDestroy');
    }
    onForeground(): void {
        hilog.info(DOMAIN, TAG, '%{public}s', 'onForeground');
    }
    onBackground(): void {
        hilog.info(DOMAIN, TAG, '%{public}s', 'onBackground');
    }
}
