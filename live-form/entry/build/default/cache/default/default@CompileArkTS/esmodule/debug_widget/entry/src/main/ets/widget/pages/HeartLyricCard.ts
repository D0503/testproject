if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HeartLyricCard_Params {
    title?: string;
    singer?: string;
    currentLyric?: string;
}
class HeartLyricCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HeartLyricCard_Params) {
    }
    updateStateVars(params: HeartLyricCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__singer.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLyric.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__singer.aboutToBeDeleted();
        this.__currentLyric.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('title', '心动歌词', "title");
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __singer: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('singer', 'Singer', "singer");
    get singer() {
        return this.__singer.get();
    }
    set singer(newValue: string) {
        this.__singer.set(newValue);
    }
    private __currentLyric: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('currentLyric', '遇见懂你的那句歌词', "currentLyric");
    get currentLyric() {
        return this.__currentLyric.get();
    }
    set currentLyric(newValue: string) {
        this.__currentLyric.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.height('100%');
            Column.padding(12);
            Column.linearGradient({
                angle: 160,
                colors: [['#5A3A4C', 0.0], ['#1D1B22', 1.0]]
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831545, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(18);
            SymbolGlyph.fontColor(['#FF6B81']);
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E5FFFFFF');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 根据听歌历史推荐的心动歌词内容
            Text.create(this.currentLyric);
            // 根据听歌历史推荐的心动歌词内容
            Text.fontSize(20);
            // 根据听歌历史推荐的心动歌词内容
            Text.fontColor('#FFFFFF');
            // 根据听歌历史推荐的心动歌词内容
            Text.maxLines(2);
            // 根据听歌历史推荐的心动歌词内容
            Text.margin({ top: 4 });
        }, Text);
        // 根据听歌历史推荐的心动歌词内容
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.singer);
            Text.fontSize(12);
            Text.fontColor('#99FFFFFF');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 静态卡片通过FormLink的router事件点击卡片跳转对应歌曲播放页面
            FormLink.create({
                action: 'router',
                abilityName: 'EntryAbility',
                params: {
                    type: 'player'
                }
            });
        }, FormLink);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('点击播放');
            Text.fontSize(14);
            Text.fontColor('#2875F5');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.borderRadius(16);
            Text.backgroundColor('#33FFFFFF');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        // 静态卡片通过FormLink的router事件点击卡片跳转对应歌曲播放页面
        FormLink.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
        this.__title.resetSource();
        this.__singer.resetSource();
        this.__currentLyric.resetSource();
    }
    static getEntryName(): string {
        return "HeartLyricCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new HeartLyricCard(undefined, {}), "com.example.liveformdemo/entry/ets/widget/pages/HeartLyricCard");
ViewStackProcessor.StopGetAccessRecording();
