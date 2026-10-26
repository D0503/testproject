if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FloatViewPage_Params {
}
class FloatViewPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FloatViewPage_Params) {
    }
    updateStateVars(params: FloatViewPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#0A59F7');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('闪控窗内容页 CUSTOM-S001');
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('绑定态：点击标题栏缩小按钮收起为闪控球');
            Text.fontSize(12);
            Text.fontColor('#E5FFFFFF');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('解绑态：点击最小化按钮应收起到侧边栏（观察项）');
            Text.fontSize(12);
            Text.fontColor('#E5FFFFFF');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
    static getEntryName(): string {
        return "FloatViewPage";
    }
}
registerNamedRoute(() => new FloatViewPage(undefined, {}), "", { bundleName: "com.example.floatviewunbinds001", moduleName: "entry", pagePath: "pages/FloatViewPage", pageFullPath: "entry/src/main/ets/pages/FloatViewPage", integratedHsp: "false", moduleType: "followWithHap" });
