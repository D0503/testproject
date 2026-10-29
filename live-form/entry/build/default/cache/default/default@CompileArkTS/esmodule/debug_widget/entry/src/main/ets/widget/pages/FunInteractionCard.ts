if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FunInteractionCard_Params {
    formId?: string;
}
let storageUpdateFun = new LocalStorage();
class FunInteractionCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FunInteractionCard_Params) {
    }
    updateStateVars(params: FunInteractionCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__formId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__formId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __formId: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('formId', '', "formId");
    get formId() {
        return this.__formId.get();
    }
    set formId(newValue: string) {
        this.__formId.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            Text.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            Text.fontSize(12);
            Text.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
        this.__formId.resetSource();
    }
    static getEntryName(): string {
        return "FunInteractionCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new FunInteractionCard(undefined, {}, storageUpdateFun), "com.example.liveformdemo/entry/ets/widget/pages/FunInteractionCard");
ViewStackProcessor.StopGetAccessRecording();
