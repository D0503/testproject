import type formInfo from "@ohos:app.form.formInfo";
import LiveFormExtensionAbility from "@ohos:app.form.LiveFormExtensionAbility";
import type { LiveFormInfo } from "@ohos:app.form.LiveFormExtensionAbility";
import type UIExtensionContentSession from "@ohos:app.ability.UIExtensionContentSession";
import hilog from "@ohos:hilog";
const DOMAIN = 0x0000;
export default class MyLiveFormExtensionAbility extends LiveFormExtensionAbility {
    onLiveFormCreate(liveFormInfo: LiveFormInfo, session: UIExtensionContentSession) {
        let storage: LocalStorage = new LocalStorage();
        storage.setOrCreate('context', this.context);
        storage.setOrCreate('session', session);
        let formId: string = liveFormInfo.formId;
        storage.setOrCreate('formId', formId);
        // 获取卡片圆角信息
        let borderRadius: number = liveFormInfo.borderRadius;
        storage.setOrCreate('borderRadius', borderRadius);
        // liveFormInfo.rect字段表示非激活态卡片组件相对激活态UI的位置和尺寸信息
        let formRect: formInfo.Rect = liveFormInfo.rect;
        storage.setOrCreate('formRect', formRect);
        hilog.info(DOMAIN, 'testTag', `MyLiveFormExtensionAbility onLiveFormCreate formId: ${formId}` +
            `, borderRadius: ${borderRadius}, formRectInfo: ${JSON.stringify(formRect)}`);
        // 加载互动页面
        session.loadContent('myliveformextensionability/pages/MyLiveFormPage', storage);
    }
    onLiveFormDestroy(liveFormInfo: LiveFormInfo) {
        // 互动卡片切换为非激活态，此处释放onLiveFormCreate中申请的资源
        hilog.info(DOMAIN, 'testTag', `MyLiveFormExtensionAbility onLiveFormDestroy formId: ${liveFormInfo.formId}`);
    }
}
