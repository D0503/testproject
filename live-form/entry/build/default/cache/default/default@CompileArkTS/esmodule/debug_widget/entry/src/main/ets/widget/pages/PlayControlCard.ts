if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PlayControlCard_Params {
    formId?: string;
    isNeedRequestUpdate?: boolean;
    isPlay?: boolean;
    title?: string;
    isCollected?: boolean;
    singer?: string;
    songId?: string;
}
import { ActionUtils, CollectAction, PlayActionType } from "@normalized:N&&&entry/src/main/ets/common/ActionUtils&";
let storageUpdateCall = new LocalStorage();
class PlayControlCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isNeedRequestUpdate", this.requestData);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PlayControlCard_Params) {
    }
    updateStateVars(params: PlayControlCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__formId.purgeDependencyOnElmtId(rmElmtId);
        this.__isNeedRequestUpdate.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__isCollected.purgeDependencyOnElmtId(rmElmtId);
        this.__singer.purgeDependencyOnElmtId(rmElmtId);
        this.__songId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__formId.aboutToBeDeleted();
        this.__isNeedRequestUpdate.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__isCollected.aboutToBeDeleted();
        this.__singer.aboutToBeDeleted();
        this.__songId.aboutToBeDeleted();
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
    private __isCollected: ObservedPropertyAbstractPU<boolean> = this.createLocalStorageProp<boolean>('isCollected', false, "isCollected");
    get isCollected() {
        return this.__isCollected.get();
    }
    set isCollected(newValue: boolean) {
        this.__isCollected.set(newValue);
    }
    private __singer: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('singer', 'Singer', "singer");
    get singer() {
        return this.__singer.get();
    }
    set singer(newValue: string) {
        this.__singer.set(newValue);
    }
    private __songId: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('songId', '', "songId");
    get songId() {
        return this.__songId.get();
    }
    set songId(newValue: string) {
        this.__songId.set(newValue);
    }
    requestData() {
        ActionUtils.updateControlCardAction(this, this.formId);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.height('100%');
            RelativeContainer.width('100%');
            RelativeContainer.padding(12);
            RelativeContainer.linearGradient({
                angle: 180,
                colors: [['#4C4844', 0.0], ['#18191D', 1.0]]
            });
            RelativeContainer.onClick(() => {
                ActionUtils.jumpPlayPage(this);
            });
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignRules({
                top: { anchor: '__container__', align: VerticalAlign.Top },
                left: { anchor: '__container__', align: HorizontalAlign.Start }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(14);
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
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(this.isCollected ? { "id": 125831545, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" } : { "id": 125831544, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(24);
            SymbolGlyph.fontColor(['#E5FFFFFF']);
            SymbolGlyph.width(40);
            SymbolGlyph.height(40);
            SymbolGlyph.alignRules({
                top: { anchor: '__container__', align: VerticalAlign.Top },
                right: { anchor: '__container__', align: HorizontalAlign.End }
            });
            SymbolGlyph.onClick(() => {
                if (this.isCollected) {
                    ActionUtils.collectAction(this, CollectAction.UNCOLLECTED, this.formId, this.songId);
                }
                else {
                    ActionUtils.collectAction(this, CollectAction.COLLECTED, this.formId, this.songId);
                }
            });
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignRules({
                bottom: { anchor: '__container__', align: VerticalAlign.Bottom },
                middle: { anchor: '__container__', align: HorizontalAlign.Center }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831829, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(22);
            SymbolGlyph.fontColor(['#E5FFFFFF']);
            SymbolGlyph.width(32);
            SymbolGlyph.height(32);
            SymbolGlyph.onClick(() => {
                ActionUtils.playByAction(this, PlayActionType.PREVIOUS, this.formId);
            });
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(this.isPlay ? { "id": 125831176, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" } : { "id": 125831175, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(22);
            SymbolGlyph.fontColor(['#E5FFFFFF']);
            SymbolGlyph.width(32);
            SymbolGlyph.height(32);
            SymbolGlyph.onClick(() => {
                if (this.isPlay) {
                    ActionUtils.playByAction(this, PlayActionType.PAUSE, this.formId);
                }
                else {
                    ActionUtils.playByAction(this, PlayActionType.PLAY, this.formId);
                }
            });
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831830, "type": 40000, params: [], "bundleName": "com.example.liveformdemo", "moduleName": "entry" });
            SymbolGlyph.fontSize(22);
            SymbolGlyph.fontColor(['#E5FFFFFF']);
            SymbolGlyph.width(32);
            SymbolGlyph.height(32);
            SymbolGlyph.onClick(() => {
                ActionUtils.playByAction(this, PlayActionType.NEXT, this.formId);
            });
        }, SymbolGlyph);
        Row.pop();
        RelativeContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
        this.__formId.resetSource();
        this.__isNeedRequestUpdate.resetSource();
        this.__isPlay.resetSource();
        this.__title.resetSource();
        this.__isCollected.resetSource();
        this.__singer.resetSource();
        this.__songId.resetSource();
    }
    static getEntryName(): string {
        return "PlayControlCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new PlayControlCard(undefined, {}, storageUpdateCall), "com.example.liveformdemo/entry/ets/widget/pages/PlayControlCard");
ViewStackProcessor.StopGetAccessRecording();
