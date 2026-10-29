if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RecommendCard_Params {
}
class RecommendCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RecommendCard_Params) {
    }
    updateStateVars(params: RecommendCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.height('100%');
            Column.padding(12);
            Column.linearGradient({
                angle: 160,
                colors: [['#31465F', 0.0], ['#171B24', 1.0]]
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('歌单推荐');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E5FFFFFF');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 点击“我的收藏”通过FormLink的router事件跳转到应用收藏列表
            FormLink.create({
                action: 'router',
                abilityName: 'EntryAbility',
                params: {
                    type: 'favorite'
                }
            });
        }, FormLink);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831544, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(16);
            SymbolGlyph.fontColor(['#FF6B81']);
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的收藏');
            Text.fontSize(14);
            Text.fontColor('#E5FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
        // 点击“我的收藏”通过FormLink的router事件跳转到应用收藏列表
        FormLink.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 点击“热门歌单”跳转到歌单列表
            FormLink.create({
                action: 'router',
                abilityName: 'EntryAbility',
                params: {
                    type: 'playlist'
                }
            });
        }, FormLink);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('热门歌单');
            Text.fontSize(14);
            Text.fontColor('#6BB7FF');
        }, Text);
        Text.pop();
        Row.pop();
        // 点击“热门歌单”跳转到歌单列表
        FormLink.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
    static getEntryName(): string {
        return "RecommendCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new RecommendCard(undefined, {}), "com.example.liveformdemo/entry/ets/widget/pages/RecommendCard");
ViewStackProcessor.StopGetAccessRecording();
