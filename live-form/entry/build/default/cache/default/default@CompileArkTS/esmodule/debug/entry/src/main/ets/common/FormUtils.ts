import formBindingData from "@ohos:app.form.formBindingData";
import formProvider from "@ohos:app.form.formProvider";
import preferences from "@ohos:data.preferences";
import type { BusinessError } from "@ohos:base";
import type common from "@ohos:app.ability.common";
import hilog from "@ohos:hilog";
import { MediaService } from "@normalized:N&&&entry/src/main/ets/common/MediaService&";
import type { SongItem } from "@normalized:N&&&entry/src/main/ets/common/MediaService&";
const TAG: string = 'FormUtils';
const DOMAIN_NUMBER: number = 0xFF00;
const PREF_NAME: string = 'live_form_demo_store';
const KEY_FORMS: string = 'play_control_forms';
const KEY_LATEST_DATA: string = 'latest_card_data';
interface StoredFormInfo {
    formId: string;
    formName: string;
}
interface UpdateData {
    isNeedRequestUpdate?: boolean;
    formId?: string;
    isPlay?: boolean;
    isCollected?: boolean;
}
// 音乐播控卡片数据，键名与卡片@LocalStorageProp一一对应
class FormControlData {
    formId: string = '';
    isPlay: boolean = false;
    title: string = 'SongName';
    singer: string = 'Singer';
    songId: string = '';
    isCollected: boolean = false;
    currentLyric: string = '';
}
export class FormUtils {
    private static getPreferences(context: common.Context): preferences.Preferences {
        return preferences.getPreferencesSync(context, { name: PREF_NAME });
    }
    // onAddForm时持久化卡片标识与名称
    public static insertForm(context: common.Context, formId: string, formName: string): void {
        let forms = FormUtils.queryAllForms(context);
        if (forms.findIndex((item) => item.formId === formId) < 0) {
            forms.push({ formId: formId, formName: formName });
            let prefs = FormUtils.getPreferences(context);
            prefs.putSync(KEY_FORMS, JSON.stringify(forms));
            prefs.flush();
        }
    }
    // onRemoveForm时删除持久化的卡片记录
    public static deleteForm(context: common.Context, formId: string): void {
        let forms = FormUtils.queryAllForms(context).filter((item) => item.formId !== formId);
        let prefs = FormUtils.getPreferences(context);
        prefs.putSync(KEY_FORMS, JSON.stringify(forms));
        prefs.flush();
    }
    public static queryAllForms(context: common.Context): StoredFormInfo[] {
        let prefs = FormUtils.getPreferences(context);
        let text = prefs.getSync(KEY_FORMS, '[]') as string;
        try {
            return JSON.parse(text) as StoredFormInfo[];
        }
        catch (e) {
            hilog.error(DOMAIN_NUMBER, TAG, `queryAllForms parse error: ${JSON.stringify(e)}`);
            return [];
        }
    }
    public static queryPlayControlForms(context: common.Context): StoredFormInfo[] {
        return FormUtils.queryAllForms(context).filter((item) => item.formName.includes('PlayControlCard'));
    }
    public static queryDynamicLyricForms(context: common.Context): StoredFormInfo[] {
        return FormUtils.queryAllForms(context).filter((item) => item.formName.includes('DynamicLyricCard'));
    }
    // 应用侧每次更新卡片前持久化最新数据，保证onAddForm返回数据与updateForm一致
    public static persistLatestData(context: common.Context, data: FormControlData): void {
        let prefs = FormUtils.getPreferences(context);
        prefs.putSync(KEY_LATEST_DATA, JSON.stringify(data));
        prefs.flush();
    }
    // 卡片进程读取持久化的最新数据作为兜底
    public static buildInitialCardData(context: common.Context): FormControlData {
        let prefs = FormUtils.getPreferences(context);
        let text = prefs.getSync(KEY_LATEST_DATA, '') as string;
        if (text) {
            try {
                return JSON.parse(text) as FormControlData;
            }
            catch (e) {
                hilog.error(DOMAIN_NUMBER, TAG, `buildInitialCardData parse error: ${JSON.stringify(e)}`);
            }
        }
        let data = new FormControlData();
        let song = MediaService.getDefaultSong();
        data.title = song.title;
        data.singer = song.singer;
        data.songId = song.id;
        data.currentLyric = MediaService.getInstance().getCurrentLyric();
        return data;
    }
    public static updateMusicControlCard(formId: string, needUpdate: boolean) {
        hilog.info(DOMAIN_NUMBER, TAG, `updateMusicControlCard formId:${formId}, needUpdate:${needUpdate}`);
        const updateData: UpdateData = { isNeedRequestUpdate: needUpdate, formId: formId };
        FormUtils.updateForm(formId, updateData);
    }
    // 以持久化的最新数据刷新单张卡片（被动刷新或卡片主动请求更新时）
    public static updateMusicControlSingle(context: common.Context, formId: string) {
        let data = FormUtils.buildInitialCardData(context);
        data.formId = formId;
        FormUtils.updateForm(formId, data);
    }
    // 播放状态或歌曲变化时持久化最新数据，并批量更新桌面上所有音乐播控卡片与动态歌词卡片
    public static updateMusicControlCards(context: common.Context, songItem: SongItem, isPlay: boolean, currentLyric: string): void {
        let data = new FormControlData();
        data.isPlay = isPlay;
        data.singer = songItem.singer;
        data.title = songItem.title;
        data.songId = songItem.id;
        data.isCollected = MediaService.getInstance().isCollected(songItem.id);
        data.currentLyric = currentLyric;
        FormUtils.persistLatestData(context, data);
        FormUtils.queryPlayControlForms(context).forEach((form) => {
            data.formId = form.formId;
            FormUtils.updateForm(form.formId, data);
        });
        FormUtils.queryDynamicLyricForms(context).forEach((form) => {
            data.formId = form.formId;
            FormUtils.updateForm(form.formId, data);
        });
    }
    // 应用进程销毁前将卡片更新为未播放状态
    public static updateCardPlayStatus(context: common.Context, isPlay: boolean) {
        let latest = FormUtils.buildInitialCardData(context);
        latest.isPlay = isPlay;
        FormUtils.persistLatestData(context, latest);
        const updateData: UpdateData = { isPlay: isPlay };
        FormUtils.queryPlayControlForms(context).forEach((form) => {
            FormUtils.updateForm(form.formId, updateData);
        });
    }
    // 收藏状态变化时持久化并批量更新所有音乐播控卡片
    public static updateCardCollectStatus(context: common.Context, isCollected: boolean) {
        let latest = FormUtils.buildInitialCardData(context);
        latest.isCollected = isCollected;
        FormUtils.persistLatestData(context, latest);
        const updateData: UpdateData = { isCollected: isCollected };
        FormUtils.queryPlayControlForms(context).forEach((form) => {
            FormUtils.updateForm(form.formId, updateData);
        });
    }
    // 通过FormBindingData键值对刷新卡片，仅传递文本与布尔数据，单次刷新数据远小于共享内存上限
    private static updateForm(formId: string, updateData: object) {
        let formMsg: formBindingData.FormBindingData = formBindingData.createFormBindingData(updateData);
        formProvider
            .updateForm(formId, formMsg)
            .then(() => {
            hilog.info(DOMAIN_NUMBER, TAG, `updateForm success formId: ${formId}`);
        })
            .catch((error: BusinessError) => {
            hilog.error(DOMAIN_NUMBER, TAG, `updateForm failed: ${JSON.stringify(error)}`);
        });
    }
}
