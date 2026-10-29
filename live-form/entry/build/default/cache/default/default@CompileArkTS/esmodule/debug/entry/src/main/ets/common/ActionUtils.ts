// 卡片播控操作类型
export enum PlayActionType {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT"
}
// 收藏操作类型
export enum CollectAction {
    COLLECTED = "COLLECTED",
    UNCOLLECTED = "UNCOLLECTED"
}
// call事件方法名
export enum CallMethod {
    PLAY_BY_ACTION = "playByAction",
    COLLECT_ACTION = "collectAction",
    REQUEST_UPDATE_CARD = "requestUpdatePlayCard"
}
// router事件目标页面类型
export enum RouterType {
    PLAYER = "player"
}
const ENTRY_ABILITY: string = 'EntryAbility';
export class ActionUtils {
    // 通过call事件向应用主进程发送音乐播控信息
    public static playByAction(component: Object, type: PlayActionType, formId: string) {
        postCardAction(component, {
            action: 'call',
            abilityName: ENTRY_ABILITY,
            params: {
                method: CallMethod.PLAY_BY_ACTION,
                playActionType: type,
                formId: formId
            }
        });
    }
    // 通过call事件向应用主进程发送收藏/取消收藏信息
    public static collectAction(component: Object, type: CollectAction, formId: string, songId: string) {
        postCardAction(component, {
            action: 'call',
            abilityName: ENTRY_ABILITY,
            params: {
                method: CallMethod.COLLECT_ACTION,
                collectActionType: type,
                formId: formId,
                songId: songId
            }
        });
    }
    // 卡片收到isNeedRequestUpdate标识后，通过call事件请求主进程更新卡片数据
    public static updateControlCardAction(component: Object, formId: string) {
        postCardAction(component, {
            action: 'call',
            abilityName: ENTRY_ABILITY,
            params: {
                method: CallMethod.REQUEST_UPDATE_CARD,
                formId: formId
            }
        });
    }
    // 点击卡片播控组件以外的区域，通过router事件拉起应用播放页面
    public static jumpPlayPage(component: Object) {
        postCardAction(component, {
            action: 'router',
            abilityName: ENTRY_ABILITY,
            params: {
                type: RouterType.PLAYER
            }
        });
    }
}
