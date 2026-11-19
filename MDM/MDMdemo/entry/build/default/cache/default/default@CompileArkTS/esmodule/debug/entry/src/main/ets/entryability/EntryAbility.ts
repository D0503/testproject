import UIAbility from "@ohos:app.ability.UIAbility";
import type window from "@ohos:window";
import hilog from "@ohos:hilog";
export default class EntryAbility extends UIAbility {
    onWindowStageCreate(windowStage: window.WindowStage): void {
        hilog.info(0x0000, 'EdmDemo', 'EntryAbility onWindowStageCreate');
        windowStage.loadContent('pages/Index', (err) => {
            if (err.code) {
                hilog.error(0x0000, 'EdmDemo', `loadContent failed: ${JSON.stringify(err)}`);
            }
        });
    }
}
