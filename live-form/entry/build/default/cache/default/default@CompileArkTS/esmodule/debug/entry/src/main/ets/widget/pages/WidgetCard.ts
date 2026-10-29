if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WidgetCard_Params {
}
class WidgetCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WidgetCard_Params) {
    }
    updateStateVars(params: WidgetCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height('100%');
            Row.onClick(() => {
                // 点击卡片时，向EntryFormAbility发送message，并在其onFormEvent回调中调用formProvider.requestOverflow请求卡片动效
                postCardAction(this, {
                    action: 'message',
                    abilityName: 'EntryFormAbility',
                    params: {
                        message: 'requestOverflow'
                    }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            Text.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
    static getEntryName(): string {
        return "WidgetCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new WidgetCard(undefined, {}), "com.example.liveformdemo/entry/ets/widget/pages/WidgetCard");
ViewStackProcessor.StopGetAccessRecording();
