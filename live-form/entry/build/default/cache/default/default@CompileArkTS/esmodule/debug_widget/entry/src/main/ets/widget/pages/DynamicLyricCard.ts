if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DynamicLyricCard_Params {
    formId?: string;
    isNeedRequestUpdate?: boolean;
    isPlay?: boolean;
    title?: string;
    singer?: string;
    currentLyric?: string;
}
import { ActionUtils, PlayActionType } from "@normalized:N&&&entry/src/main/ets/common/ActionUtils&";
let storageUpdateLyric = new LocalStorage();
class DynamicLyricCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isNeedRequestUpdate", this.requestData);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DynamicLyricCard_Params) {
    }
    updateStateVars(params: DynamicLyricCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__formId.purgeDependencyOnElmtId(rmElmtId);
        this.__isNeedRequestUpdate.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__singer.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLyric.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__formId.aboutToBeDeleted();
        this.__isNeedRequestUpdate.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__singer.aboutToBeDeleted();
        this.__currentLyric.aboutToBeDeleted();
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
    private __isNeedRequestUpdate: ObservedPropertyAbstractPU<boolean> = this.createLocalStorageProp<boolean>('isNeedRequestUpdate', false, "isNeedRequestUpdate");
    get isNeedRequestUpdate() {
        return this.__isNeedRequestUpdate.get();
    }
    set isNeedRequestUpdate(newValue: boolean) {
        this.__isNeedRequestUpdate.set(newValue);
    }
    private __isPlay: ObservedPropertyAbstractPU<boolean> = this.createLocalStorageProp<boolean>('isPlay', false, "isPlay");
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private __title: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('title', 'SongName', "title");
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
    private __currentLyric: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('currentLyric', '', "currentLyric");
    get currentLyric() {
        return this.__currentLyric.get();
    }
    set currentLyric(newValue: string) {
        this.__currentLyric.set(newValue);
    }
    requestData() {
        // 卡片进程无法直接获取播放状态，请求应用主进程刷新数据
        ActionUtils.updateControlCardAction(this, this.formId);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.height('100%');
            Column.padding(12);
            Column.linearGradient({
                angle: 180,
                colors: [['#4C4844', 0.0], ['#18191D', 1.0]]
            });
            Column.onClick(() => {
                // 点击卡片其余区域跳转到应用播放页
                ActionUtils.jumpPlayPage(this);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E5FFFFFF');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.singer);
            Text.fontSize(12);
            Text.fontColor('#99FFFFFF');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 当前播放进度匹配的歌词行，随updateForm刷新并平滑过渡
            Text.create(this.currentLyric);
            // 当前播放进度匹配的歌词行，随updateForm刷新并平滑过渡
            Text.fontSize(18);
            // 当前播放进度匹配的歌词行，随updateForm刷新并平滑过渡
            Text.fontColor('#FFFFFF');
            // 当前播放进度匹配的歌词行，随updateForm刷新并平滑过渡
            Text.maxLines(1);
            // 当前播放进度匹配的歌词行，随updateForm刷新并平滑过渡
            Text.margin({ top: 8 });
            // 当前播放进度匹配的歌词行，随updateForm刷新并平滑过渡
            Text.transition(TransitionEffect.OPACITY.animation({ duration: 300 }));
        }, Text);
        // 当前播放进度匹配的歌词行，随updateForm刷新并平滑过渡
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831829, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(20);
            SymbolGlyph.fontColor(['#E5FFFFFF']);
            SymbolGlyph.width(28);
            SymbolGlyph.height(28);
            SymbolGlyph.onClick(() => {
                ActionUtils.playByAction(this, PlayActionType.PREVIOUS, this.formId);
            });
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(this.isPlay ? { "id": 125831176, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" } : { "id": 125831175, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(20);
            SymbolGlyph.fontColor(['#E5FFFFFF']);
            SymbolGlyph.width(28);
            SymbolGlyph.height(28);
            SymbolGlyph.onClick(() => {
                ActionUtils.playByAction(this, this.isPlay ? PlayActionType.PAUSE : PlayActionType.PLAY, this.formId);
            });
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831830, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(20);
            SymbolGlyph.fontColor(['#E5FFFFFF']);
            SymbolGlyph.width(28);
            SymbolGlyph.height(28);
            SymbolGlyph.onClick(() => {
                ActionUtils.playByAction(this, PlayActionType.NEXT, this.formId);
            });
        }, SymbolGlyph);
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
        this.__formId.resetSource();
        this.__isNeedRequestUpdate.resetSource();
        this.__isPlay.resetSource();
        this.__title.resetSource();
        this.__singer.resetSource();
        this.__currentLyric.resetSource();
    }
    static getEntryName(): string {
        return "DynamicLyricCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new DynamicLyricCard(undefined, {}, storageUpdateLyric), "com.example.liveformdemo/entry/ets/widget/pages/DynamicLyricCard");
ViewStackProcessor.StopGetAccessRecording();
