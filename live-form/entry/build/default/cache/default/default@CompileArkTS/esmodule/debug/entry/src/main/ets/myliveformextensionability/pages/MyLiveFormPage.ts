if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MyLiveFormPage_Params {
    columnScale?: number;
    columnTranslate?: number;
    uiContext?: UIContext | undefined;
    storageForMyLiveFormPage?: LocalStorage | undefined;
    formId?: string | undefined;
    formRect?: formInfo.Rect | undefined;
    formBorderRadius?: number | undefined;
    liveFormContext?: common.LiveFormExtensionContext | undefined;
}
import type formInfo from "@ohos:app.form.formInfo";
import formProvider from "@ohos:app.form.formProvider";
import type { BusinessError } from "@ohos:base";
import type common from "@ohos:app.ability.common";
import { Constants } from "@normalized:N&&&entry/src/main/ets/common/Constants&";
import hilog from "@ohos:hilog";
const ANIMATION_RECT_SIZE: number = 100;
const END_SCALE: number = 1.5;
const END_TRANSLATE: number = -300;
const DOMAIN = 0x0000;
class MyLiveFormPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__columnScale = new ObservedPropertySimplePU(1.0, this, "columnScale");
        this.__columnTranslate = new ObservedPropertySimplePU(0.0, this, "columnTranslate");
        this.uiContext = undefined;
        this.storageForMyLiveFormPage = undefined;
        this.formId = undefined;
        this.formRect = undefined;
        this.formBorderRadius = undefined;
        this.liveFormContext = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MyLiveFormPage_Params) {
        if (params.columnScale !== undefined) {
            this.columnScale = params.columnScale;
        }
        if (params.columnTranslate !== undefined) {
            this.columnTranslate = params.columnTranslate;
        }
        if (params.uiContext !== undefined) {
            this.uiContext = params.uiContext;
        }
        if (params.storageForMyLiveFormPage !== undefined) {
            this.storageForMyLiveFormPage = params.storageForMyLiveFormPage;
        }
        if (params.formId !== undefined) {
            this.formId = params.formId;
        }
        if (params.formRect !== undefined) {
            this.formRect = params.formRect;
        }
        if (params.formBorderRadius !== undefined) {
            this.formBorderRadius = params.formBorderRadius;
        }
        if (params.liveFormContext !== undefined) {
            this.liveFormContext = params.liveFormContext;
        }
    }
    updateStateVars(params: MyLiveFormPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__columnScale.purgeDependencyOnElmtId(rmElmtId);
        this.__columnTranslate.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__columnScale.aboutToBeDeleted();
        this.__columnTranslate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __columnScale: ObservedPropertySimplePU<number>;
    get columnScale() {
        return this.__columnScale.get();
    }
    set columnScale(newValue: number) {
        this.__columnScale.set(newValue);
    }
    private __columnTranslate: ObservedPropertySimplePU<number>;
    get columnTranslate() {
        return this.__columnTranslate.get();
    }
    set columnTranslate(newValue: number) {
        this.__columnTranslate.set(newValue);
    }
    private uiContext: UIContext | undefined;
    private storageForMyLiveFormPage: LocalStorage | undefined;
    private formId: string | undefined;
    private formRect: formInfo.Rect | undefined;
    private formBorderRadius: number | undefined;
    private liveFormContext: common.LiveFormExtensionContext | undefined;
    aboutToAppear(): void {
        this.uiContext = this.getUIContext();
        if (!this.uiContext) {
            hilog.error(DOMAIN, 'testTag', 'no uiContext');
            return;
        }
        this.initParams();
    }
    private initParams(): void {
        this.storageForMyLiveFormPage = this.uiContext?.getSharedLocalStorage();
        this.formId = this.storageForMyLiveFormPage?.get<string>('formId');
        this.formRect = this.storageForMyLiveFormPage?.get<formInfo.Rect>('formRect');
        this.formBorderRadius = this.storageForMyLiveFormPage?.get<number>('borderRadius');
        this.liveFormContext = this.storageForMyLiveFormPage?.get<common.LiveFormExtensionContext>('context');
    }
    // 执行动效
    private runAnimation(): void {
        this.uiContext?.animateTo({
            duration: Constants.OVERFLOW_DURATION,
            curve: Curve.Ease
        }, () => {
            this.columnScale = END_SCALE;
            this.columnTranslate = END_TRANSLATE;
        });
    }
    private startAbilityByLiveForm(): void {
        try {
            // 使用显式Want拉起互动卡片提供方应用的EntryAbility页面
            this.liveFormContext?.startAbilityByLiveForm({
                bundleName: 'com.example.liveformdemo',
                abilityName: 'EntryAbility',
            })
                .then(() => {
                hilog.info(DOMAIN, 'testTag', 'startAbilityByLiveForm succeed');
            })
                .catch((err: BusinessError) => {
                hilog.error(DOMAIN, 'testTag', `startAbilityByLiveForm failed, code is ${err?.code}, message is ${err?.message}`);
            });
        }
        catch (e) {
            let error = e as BusinessError;
            hilog.error(DOMAIN, 'testTag', `startAbilityByLiveForm failed, code is ${error?.code}, message is ${error?.message}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width('100%');
            Stack.height('100%');
            Stack.onClick(() => {
                // startAbilityByLiveForm仅限在点击事件回调中直接调用
                hilog.info(DOMAIN, 'testTag', 'MyLiveFormPage click to start ability');
                if (!this.liveFormContext) {
                    hilog.info(DOMAIN, 'testTag', 'MyLiveFormPage liveFormContext is empty');
                    return;
                }
                this.startAbilityByLiveForm();
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景组件和普通卡片一样大
            Column.create();
            // 背景组件和普通卡片一样大
            Column.width(this.formRect ? this.formRect.width : 0);
            // 背景组件和普通卡片一样大
            Column.height(this.formRect ? this.formRect.height : 0);
            // 背景组件和普通卡片一样大
            Column.offset({
                x: this.formRect ? this.formRect.left : 0,
                y: this.formRect ? this.formRect.top : 0,
            });
            // 背景组件和普通卡片一样大
            Column.borderRadius(this.formBorderRadius ? this.formBorderRadius : 0);
            // 背景组件和普通卡片一样大
            Column.backgroundColor('#2875F5');
        }, Column);
        // 背景组件和普通卡片一样大
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.buildContent.bind(this)();
        Stack.pop();
        Stack.pop();
    }
    buildContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(ANIMATION_RECT_SIZE);
            Stack.height(ANIMATION_RECT_SIZE);
            Stack.backgroundColor(Color.White);
            Stack.scale({
                x: this.columnScale,
                y: this.columnScale,
            });
            Stack.translate({
                y: this.columnTranslate
            });
            Stack.onAppear(() => {
                // 在页面出现时执行动效
                this.runAnimation();
            });
        }, Stack);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            Button.backgroundColor(Color.Grey);
            Button.onClick(() => {
                if (!this.formId) {
                    hilog.info(DOMAIN, 'testTag', 'MyLiveFormPage formId is empty, cancel overflow failed');
                    return;
                }
                hilog.info(DOMAIN, 'testTag', 'MyLiveFormPage cancel overflow animation');
                formProvider.cancelOverflow(this.formId);
            });
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
    static getEntryName(): string {
        return "MyLiveFormPage";
    }
}
registerNamedRoute(() => new MyLiveFormPage(undefined, {}), "", { bundleName: "com.example.liveformdemo", moduleName: "entry", pagePath: "myliveformextensionability/pages/MyLiveFormPage", pageFullPath: "entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage", integratedHsp: "false", moduleType: "followWithHap" });
