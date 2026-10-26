if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    floatViewController?: floatView.FloatViewController | undefined;
    floatingBallController?: floatingBall.FloatingBallController | undefined;
    fvStopped?: boolean;
    ballStopped?: boolean;
    boundActive?: boolean;
    logLines?: string[];
    fvStateText?: string;
    ballStateText?: string;
    bindStateText?: string;
    branchText?: string;
    switchEvents?: string[];
    onFvStateChange?;
    onBallStateChange?;
    onBallDestroy?;
    onBallClick?;
}
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import bundleManager from "@ohos:bundle.bundleManager";
import type common from "@ohos:app.ability.common";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import type { BusinessError } from "@ohos:base";
import floatingBall from "@ohos:window.floatingBall";
import floatView from "@ohos:window.floatView";
import type window from "@ohos:window";
import hilog from "@ohos:hilog";
const TAG: string = 'FloatViewUnbindS001';
const DOMAIN: number = 0xF101;
function fvStateName(state: floatView.FloatViewState): string {
    switch (state) {
        case floatView.FloatViewState.STARTED:
            return 'STARTED(1)';
        case floatView.FloatViewState.HIDDEN:
            return 'HIDDEN(2)';
        case floatView.FloatViewState.STOPPED:
            return 'STOPPED(3)';
        case floatView.FloatViewState.IN_SIDEBAR:
            return 'IN_SIDEBAR(4)';
        case floatView.FloatViewState.IN_FLOATING_BALL:
            return 'IN_FLOATING_BALL(5)';
        case floatView.FloatViewState.ERROR:
            return 'ERROR(6)';
        default:
            return `UNKNOWN(${state})`;
    }
}
function ballStateName(state: floatingBall.FloatingBallState): string {
    switch (state) {
        case floatingBall.FloatingBallState.STARTED:
            return 'STARTED(1)';
        case floatingBall.FloatingBallState.STOPPED:
            return 'STOPPED(2)';
        default:
            return `UNKNOWN(${state})`;
    }
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.floatViewController = undefined;
        this.floatingBallController = undefined;
        this.fvStopped = false;
        this.ballStopped = false;
        this.boundActive = false;
        this.__logLines = new ObservedPropertyObjectPU([], this, "logLines");
        this.__fvStateText = new ObservedPropertySimplePU('闪控窗状态: -', this, "fvStateText");
        this.__ballStateText = new ObservedPropertySimplePU('闪控球状态: -', this, "ballStateText");
        this.__bindStateText = new ObservedPropertySimplePU('绑定状态: 未绑定', this, "bindStateText");
        this.__branchText = new ObservedPropertySimplePU('分支: 未选择', this, "branchText");
        this.__switchEvents = new ObservedPropertyObjectPU([], this, "switchEvents");
        this.onFvStateChange = (info: floatView.FloatViewStateChangeInfo): void => {
            const name: string = fvStateName(info.state);
            this.fvStateText = `闪控窗状态: ${name}`;
            this.record('状态回调', 'floatView.onStateChange', `state=${name}, stopReason=${info.stopReason}`);
            if (info.state === floatView.FloatViewState.STOPPED) {
                this.fvStopped = true;
            }
            if (info.state === floatView.FloatViewState.STARTED) {
                this.fvStopped = false;
                this.switchEvents = [...this.switchEvents, '闪控窗显示(STARTED)'];
            }
            if (info.state === floatView.FloatViewState.IN_FLOATING_BALL) {
                this.switchEvents = [...this.switchEvents, '闪控窗收起为闪控球(IN_FLOATING_BALL)'];
            }
            if (info.state === floatView.FloatViewState.IN_SIDEBAR) {
                this.switchEvents = [...this.switchEvents, '闪控窗收起到侧边栏(IN_SIDEBAR)'];
            }
        };
        this.onBallStateChange = (state: floatingBall.FloatingBallState): void => {
            const name: string = ballStateName(state);
            this.ballStateText = `闪控球状态: ${name}`;
            this.record('状态回调', "floatingBall.on('stateChange')", `state=${name}`);
            this.ballStopped = state === floatingBall.FloatingBallState.STOPPED;
            if (state === floatingBall.FloatingBallState.STARTED) {
                this.switchEvents = [...this.switchEvents, '闪控球显示(STARTED)'];
            }
        };
        this.onBallDestroy = (reason: string): void => {
            this.record('状态回调', 'floatingBall.onDestroy', `销毁原因=${reason}（绑定态跟随闪控窗停止应为 FLOAT_VIEW_STOP）`);
        };
        this.onBallClick = (): void => {
            this.switchEvents = [...this.switchEvents, '闪控球点击回调触发(click)'];
            this.record('交互', "floatingBall.on('click')", '闪控球点击回调（绑定态预期不触发，解绑态预期触发）');
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.floatViewController !== undefined) {
            this.floatViewController = params.floatViewController;
        }
        if (params.floatingBallController !== undefined) {
            this.floatingBallController = params.floatingBallController;
        }
        if (params.fvStopped !== undefined) {
            this.fvStopped = params.fvStopped;
        }
        if (params.ballStopped !== undefined) {
            this.ballStopped = params.ballStopped;
        }
        if (params.boundActive !== undefined) {
            this.boundActive = params.boundActive;
        }
        if (params.logLines !== undefined) {
            this.logLines = params.logLines;
        }
        if (params.fvStateText !== undefined) {
            this.fvStateText = params.fvStateText;
        }
        if (params.ballStateText !== undefined) {
            this.ballStateText = params.ballStateText;
        }
        if (params.bindStateText !== undefined) {
            this.bindStateText = params.bindStateText;
        }
        if (params.branchText !== undefined) {
            this.branchText = params.branchText;
        }
        if (params.switchEvents !== undefined) {
            this.switchEvents = params.switchEvents;
        }
        if (params.onFvStateChange !== undefined) {
            this.onFvStateChange = params.onFvStateChange;
        }
        if (params.onBallStateChange !== undefined) {
            this.onBallStateChange = params.onBallStateChange;
        }
        if (params.onBallDestroy !== undefined) {
            this.onBallDestroy = params.onBallDestroy;
        }
        if (params.onBallClick !== undefined) {
            this.onBallClick = params.onBallClick;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__logLines.purgeDependencyOnElmtId(rmElmtId);
        this.__fvStateText.purgeDependencyOnElmtId(rmElmtId);
        this.__ballStateText.purgeDependencyOnElmtId(rmElmtId);
        this.__bindStateText.purgeDependencyOnElmtId(rmElmtId);
        this.__branchText.purgeDependencyOnElmtId(rmElmtId);
        this.__switchEvents.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__logLines.aboutToBeDeleted();
        this.__fvStateText.aboutToBeDeleted();
        this.__ballStateText.aboutToBeDeleted();
        this.__bindStateText.aboutToBeDeleted();
        this.__branchText.aboutToBeDeleted();
        this.__switchEvents.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private floatViewController: floatView.FloatViewController | undefined;
    private floatingBallController: floatingBall.FloatingBallController | undefined;
    private fvStopped: boolean;
    private ballStopped: boolean;
    private boundActive: boolean;
    private __logLines: ObservedPropertyObjectPU<string[]>;
    get logLines() {
        return this.__logLines.get();
    }
    set logLines(newValue: string[]) {
        this.__logLines.set(newValue);
    }
    private __fvStateText: ObservedPropertySimplePU<string>;
    get fvStateText() {
        return this.__fvStateText.get();
    }
    set fvStateText(newValue: string) {
        this.__fvStateText.set(newValue);
    }
    private __ballStateText: ObservedPropertySimplePU<string>;
    get ballStateText() {
        return this.__ballStateText.get();
    }
    set ballStateText(newValue: string) {
        this.__ballStateText.set(newValue);
    }
    private __bindStateText: ObservedPropertySimplePU<string>;
    get bindStateText() {
        return this.__bindStateText.get();
    }
    set bindStateText(newValue: string) {
        this.__bindStateText.set(newValue);
    }
    private __branchText: ObservedPropertySimplePU<string>;
    get branchText() {
        return this.__branchText.get();
    }
    set branchText(newValue: string) {
        this.__branchText.set(newValue);
    }
    private __switchEvents: ObservedPropertyObjectPU<string[]>;
    get switchEvents() {
        return this.__switchEvents.get();
    }
    set switchEvents(newValue: string[]) {
        this.__switchEvents.set(newValue);
    }
    private record(step: string, api: string, detail: string): void {
        const line: string = `${step} | ${api} | ${detail}`;
        hilog.info(DOMAIN, TAG, '%{public}s', line);
        this.logLines = [...this.logLines, line];
    }
    private onFvStateChange;
    private onBallStateChange;
    private onBallDestroy;
    private onBallClick;
    async preCheck(): Promise<void> {
        const syscap: boolean = canIUse('SystemCapability.Window.SessionManager');
        this.record('前置检查', 'canIUse', `SystemCapability.Window.SessionManager=${syscap}`);
        try {
            const fvEnabled: boolean = floatView.isFloatViewEnabled();
            this.record('前置检查', 'floatView.isFloatViewEnabled', `enabled=${fvEnabled}`);
            const ballEnabled: boolean = floatingBall.isFloatingBallEnabled();
            this.record('前置检查', 'floatingBall.isFloatingBallEnabled', `enabled=${ballEnabled}`);
        }
        catch (err) {
            const e = err as BusinessError;
            this.record('前置检查', 'isEnabled', `失败 code=${e.code}, message=${e.message}`);
        }
        try {
            const flag = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
            const bundleInfo = bundleManager.getBundleInfoForSelfSync(flag);
            const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
            const fvStatus = await atManager.checkAccessToken(bundleInfo.appInfo.accessTokenId, 'ohos.permission.FLOAT_VIEW');
            const ballStatus = await atManager.checkAccessToken(bundleInfo.appInfo.accessTokenId, 'ohos.permission.USE_FLOAT_BALL');
            const fvGranted: boolean = fvStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
            const ballGranted: boolean = ballStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
            this.record('前置检查', 'checkAccessToken', `FLOAT_VIEW=${fvGranted ? '已授权' : '未授权'}, USE_FLOAT_BALL=${ballGranted ? '已授权' : '未授权'}`);
            if (!fvGranted || !ballGranted) {
                const hostContext = this.getUIContext().getHostContext();
                const data = await atManager.requestPermissionsFromUser(hostContext as common.UIAbilityContext, ['ohos.permission.FLOAT_VIEW', 'ohos.permission.USE_FLOAT_BALL'] as Permissions[]);
                this.record('前置检查', 'requestPermissionsFromUser', `authResults=${JSON.stringify(data.authResults)}`);
            }
        }
        catch (err) {
            const e = err as BusinessError;
            this.record('前置检查', 'permission', `失败 code=${e.code}, message=${e.message}`);
        }
    }
    async establishPrecondition(): Promise<void> {
        try {
            const ctx = this.getUIContext().getHostContext() as common.UIAbilityContext;
            if (!this.floatingBallController) {
                const ballConfig: floatingBall.FloatingBallConfiguration = { context: ctx };
                this.floatingBallController = await floatingBall.create(ballConfig);
                this.record('前置条件', 'floatingBall.create', '闪控球控制器创建成功');
                this.floatingBallController.on('stateChange', this.onBallStateChange);
                this.floatingBallController.on('click', this.onBallClick);
                this.floatingBallController.onDestroy(this.onBallDestroy);
            }
            if (!this.floatViewController) {
                const floatConfig: floatView.FloatViewConfiguration = {
                    context: ctx,
                    templateType: floatView.FloatViewTemplateType.ROUNDED_RECTANGLE
                };
                this.floatViewController = await floatView.create(floatConfig);
                this.record('前置条件', 'floatView.create', '闪控窗控制器创建成功');
                this.floatViewController.onStateChange(this.onFvStateChange);
            }
            const fvController = this.floatViewController;
            const fbController = this.floatingBallController;
            const ballParams: floatingBall.FloatingBallParams = {
                template: floatingBall.FloatingBallTemplate.EMPHATIC,
                title: '闪控球解绑验证',
                content: '绑定态'
            };
            await floatView.bind(fvController, fbController, ballParams);
            this.bindStateText = '绑定状态: 已绑定';
            this.boundActive = true;
            this.record('前置条件', 'floatView.bind', '绑定成功（绑定时配置闪控球参数）');
            await fvController.setUIContext('pages/FloatViewPage');
            this.record('前置条件', 'setUIContext', '已设置闪控窗内容 pages/FloatViewPage');
            const limits: floatView.FloatViewLimits = floatView.getFloatViewLimits(floatView.FloatViewTemplateType.ROUNDED_RECTANGLE);
            const size: window.Size = {
                width: limits.maxSize.width,
                height: limits.maxSize.height
            };
            await fvController.setWindowSize(size);
            await fvController.start();
            this.record('前置条件', 'floatViewController.start', 'start() 已返回；绑定态同时创建两窗口（以 STARTED 回调确认），请先手动确认球→窗→球双向切换可用');
        }
        catch (err) {
            const e = err as BusinessError;
            this.record('前置条件', 'create/bind/start', `失败 code=${e.code}, message=${e.message}`);
        }
    }
    step1StopBoundWindows(): void {
        if (!this.floatViewController) {
            this.record('步骤1', 'floatViewController.stop', '闪控窗控制器不存在，无法执行 stop');
            return;
        }
        this.fvStopped = false;
        this.ballStopped = false;
        this.record('步骤1', 'floatViewController.stop', '发起 stop；绑定态会同时销毁闪控窗与闪控球窗口');
        this.floatViewController.stop().then(() => {
            this.record('步骤1', 'floatViewController.stop', 'stop() Promise 已解决（接口返回不代表停止结束，以 STOPPED 回调为准）');
        }).catch((err: BusinessError) => {
            this.record('步骤1', 'floatViewController.stop', `stop 失败 code=${err.code}, message=${err.message}（1300030 表示重复停止）`);
        });
    }
    step1ConfirmStopped(): void {
        if (this.fvStopped && this.ballStopped) {
            this.record('步骤1', 'onStateChange', '已收到闪控窗 STOPPED 与闪控球 STOPPED，停止完成确认通过，可进入步骤2');
        }
        else {
            this.record('步骤1', 'onStateChange', `停止尚未完成：fvStopped=${this.fvStopped}, ballStopped=${this.ballStopped}，请等待状态回调`);
        }
    }
    async step2BranchAUnbind(): Promise<void> {
        this.branchText = '分支: A-stop后解绑';
        if (!this.floatViewController || !this.floatingBallController) {
            this.record('步骤2-分支A', 'floatView.unbind', '控制器不存在，不执行解绑');
            return;
        }
        if (!this.fvStopped || !this.ballStopped) {
            this.record('步骤2-分支A', 'floatView.unbind', '闪控窗/闪控球尚未均停止（未收到 STOPPED），按官网要求均停止后才可解绑，本次不发起调用');
            return;
        }
        try {
            await floatView.unbind(this.floatViewController, this.floatingBallController);
            this.bindStateText = '绑定状态: 已解绑';
            this.boundActive = false;
            this.record('步骤2-分支A', 'floatView.unbind', '解绑成功（Promise 无返回结果）');
        }
        catch (err) {
            const e = err as BusinessError;
            this.record('步骤2-分支A', 'floatView.unbind', `解绑失败 code=${e.code}, message=${e.message}（801/1300025/1300031 见官网错误码）`);
        }
    }
    step2BranchBKeepBound(): void {
        this.branchText = '分支: B-stop后保持绑定';
        if (!this.fvStopped || !this.ballStopped) {
            this.record('步骤2-分支B', 'branch', '停止尚未完成，请先执行步骤1并等待双侧 STOPPED');
            return;
        }
        this.bindStateText = '绑定状态: 保持绑定';
        this.record('步骤2-分支B', 'branch', '对照分支：保持绑定关系，不调用 floatView.unbind');
    }
    async step3RestartFloatingBall(): Promise<void> {
        if (!this.floatingBallController) {
            this.record('步骤3', 'startFloatingBall', '闪控球控制器不存在，无法启动');
            return;
        }
        if (!this.ballStopped) {
            this.record('步骤3', 'startFloatingBall', '闪控球停止流程未完成（未收到 STOPPED），此时启动会触发 1300025，本次不发起调用');
            return;
        }
        const params: floatingBall.FloatingBallParams = {
            template: floatingBall.FloatingBallTemplate.EMPHATIC,
            title: '闪控球解绑验证',
            content: this.boundActive ? '绑定态' : '解绑态'
        };
        try {
            await this.floatingBallController.startFloatingBall(params);
            this.record('步骤3', 'startFloatingBall', this.boundActive
                ? 'startFloatingBall() 已返回；绑定态预期同时创建两窗口并展示闪控球'
                : 'startFloatingBall() 已返回；解绑态预期仅启动独立闪控球');
        }
        catch (err) {
            const e = err as BusinessError;
            this.record('步骤3', 'startFloatingBall', `启动失败 code=${e.code}, message=${e.message}`);
        }
    }
    async step3TryStartFloatView(): Promise<void> {
        if (!this.floatViewController) {
            this.record('步骤3', 'floatViewController.start', '闪控窗控制器不存在');
            return;
        }
        try {
            await this.floatViewController.start();
            this.record('步骤3', 'floatViewController.start', 'start() 已返回（以状态回调确认实际形态）；绑定态已启动时预期 1300030，解绑态闪控球已启动时预期冲突 1300034');
        }
        catch (err) {
            const e = err as BusinessError;
            this.record('步骤3', 'floatViewController.start', `start 被拒绝 code=${e.code}, message=${e.message}`);
        }
    }
    step3RecordSwitchObservation(): void {
        this.record('步骤3', 'observe', `请手动执行“球→窗→球”：点击闪控球、再点击闪控窗标题栏缩小/最小化按钮。当前 ${this.fvStateText}；${this.ballStateText}；事件序列=${JSON.stringify(this.switchEvents)}`);
    }
    async resetForOtherBranch(): Promise<void> {
        if (this.floatViewController && !this.fvStopped) {
            try {
                await this.floatViewController.stop();
                this.record('重置', 'floatViewController.stop', '停止闪控窗成功');
            }
            catch (err) {
                const e = err as BusinessError;
                this.record('重置', 'floatViewController.stop', `停止失败 code=${e.code}, message=${e.message}`);
            }
        }
        if (this.floatingBallController && !this.ballStopped) {
            try {
                await this.floatingBallController.stopFloatingBall();
                this.record('重置', 'floatingBallController.stopFloatingBall', '停止闪控球成功');
            }
            catch (err) {
                const e = err as BusinessError;
                this.record('重置', 'floatingBallController.stopFloatingBall', `停止失败 code=${e.code}, message=${e.message}`);
            }
        }
        try {
            this.floatViewController?.offStateChange(this.onFvStateChange);
            this.floatingBallController?.off('stateChange', this.onBallStateChange);
            this.floatingBallController?.off('click', this.onBallClick);
            this.floatingBallController?.offDestroy(this.onBallDestroy);
            this.record('重置', 'off listeners', '状态、点击与销毁监听已注销');
        }
        catch (err) {
            const e = err as BusinessError;
            this.record('重置', 'off listeners', `注销监听异常 code=${e.code}, message=${e.message}`);
        }
        this.floatViewController = undefined;
        this.floatingBallController = undefined;
        this.fvStopped = false;
        this.ballStopped = false;
        this.boundActive = false;
        this.bindStateText = '绑定状态: 未绑定';
        this.branchText = '分支: 未选择';
        this.switchEvents = [];
        this.record('重置', 'reset', '已恢复初始状态，另一分支请从“前置条件”重新执行');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.backgroundColor('#F5F5F5');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('闪控窗补充场景 CUSTOM-S001：stop 后调用解绑接口，验证解绑是否实际生效');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.fvStateText);
            Text.fontSize(13);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.ballStateText);
            Text.fontSize(13);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.bindStateText);
            Text.fontSize(13);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.branchText);
            Text.fontSize(13);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('0. 前置检查（能力/双权限/授权）');
            Button.width('100%');
            Button.onClick(() => {
                this.preCheck();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('前置条件：创建双控制器并绑定启动（先手动确认双向切换）');
            Button.width('100%');
            Button.onClick(() => {
                this.establishPrecondition();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步骤1：执行 stop');
            Button.width('100%');
            Button.onClick(() => {
                this.step1StopBoundWindows();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步骤1：确认停止完成（等待双侧 STOPPED）');
            Button.width('100%');
            Button.onClick(() => {
                this.step1ConfirmStopped();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步骤2 分支A：调用解绑 floatView.unbind');
            Button.width('100%');
            Button.onClick(() => {
                this.step2BranchAUnbind();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步骤2 分支B（对照）：保持绑定不解绑');
            Button.width('100%');
            Button.onClick(() => {
                this.step2BranchBKeepBound();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步骤3：重新 startFloatingBall 启动闪控球');
            Button.width('100%');
            Button.onClick(() => {
                this.step3RestartFloatingBall();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步骤3：尝试 start() 启动闪控窗（观察 1300034/1300030）');
            Button.width('100%');
            Button.onClick(() => {
                this.step3TryStartFloatView();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步骤3：手动“球→窗→球”后记录观察结果');
            Button.width('100%');
            Button.onClick(() => {
                this.step3RecordSwitchObservation();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置（为另一分支重建相同前置条件）');
            Button.width('100%');
            Button.onClick(() => {
                this.resetForOtherBranch();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('运行证据日志（接口返回值/错误码/状态回调，同步写入 hilog）');
            Text.fontSize(13);
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const line = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(line);
                    Text.fontSize(11);
                    Text.fontColor('#333333');
                    Text.width('100%');
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.logLines, forEachItemGenFunction, (line: string) => line, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.floatviewunbinds001", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
