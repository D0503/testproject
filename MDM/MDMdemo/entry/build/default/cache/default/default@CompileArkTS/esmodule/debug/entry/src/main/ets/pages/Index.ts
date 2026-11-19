if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    logLines?: string[];
    currentSdk?: number;
}
import deviceInfo from "@ohos:deviceInfo";
import hilog from "@ohos:hilog";
import { AdminActivationService } from "@bundle:com.huaagcwei.mdm.hm/entry/ets/mdm/AdminActivationService";
import { AppLifecyclePolicyService } from "@bundle:com.huaagcwei.mdm.hm/entry/ets/mdm/AppLifecyclePolicyService";
import { RestrictionPolicyService } from "@bundle:com.huaagcwei.mdm.hm/entry/ets/mdm/RestrictionPolicyService";
import { KeyAndLogPolicyService } from "@bundle:com.huaagcwei.mdm.hm/entry/ets/mdm/KeyAndLogPolicyService";
import { adminComponentLabel } from "@bundle:com.huaagcwei.mdm.hm/entry/ets/mdm/MdmAdminWant";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__logLines = new ObservedPropertyObjectPU([], this, "logLines");
        this.__currentSdk = new ObservedPropertySimplePU(deviceInfo.sdkApiVersion, this, "currentSdk");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.logLines !== undefined) {
            this.logLines = params.logLines;
        }
        if (params.currentSdk !== undefined) {
            this.currentSdk = params.currentSdk;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__logLines.purgeDependencyOnElmtId(rmElmtId);
        this.__currentSdk.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__logLines.aboutToBeDeleted();
        this.__currentSdk.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __logLines: ObservedPropertyObjectPU<string[]>;
    get logLines() {
        return this.__logLines.get();
    }
    set logLines(newValue: string[]) {
        this.__logLines.set(newValue);
    }
    private __currentSdk: ObservedPropertySimplePU<number>;
    get currentSdk() {
        return this.__currentSdk.get();
    }
    set currentSdk(newValue: number) {
        this.__currentSdk.set(newValue);
    }
    private appendLog(line: string): void {
        this.logLines = [...this.logLines, `[${new Date().toLocaleTimeString()}] ${line}`];
        hilog.info(0x0001, 'MdmDemo', '%{public}s', line);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.padding(16);
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('企业设备管理（MDM Kit）文档验证 Demo');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`管理组件: ${adminComponentLabel()}`);
            Text.fontSize(12);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`当前设备 API 版本: ${this.currentSdk}`);
            Text.fontSize(12);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('说明: 未激活设备管理应用时接口返回 9200001/9200002 属预期；调试激活见 entry/debug/edm-debug.md');
            Text.fontSize(12);
            Text.fontColor(Color.Orange);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S003: 订阅管理事件');
            Button.onClick(() => this.appendLog(AdminActivationService.subscribeManagedEvents()));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S003: 查询是否 BYOD 管理应用');
            Button.onClick(() => this.appendLog(AdminActivationService.queryIsByodAdmin()));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S003: BYOD 拉起激活页');
            Button.onClick(() => this.appendLog(AdminActivationService.startByodAdminProvision(this.getUIContext().getHostContext() as never)));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S003: 解除激活自身');
            Button.onClick(async () => this.appendLog(await AdminActivationService.deactivateSelf()));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S004: 下发运行禁止名单');
            Button.onClick(() => this.appendLog(AppLifecyclePolicyService.setDisallowedRunningBundles(['demo_app_identifier_1'])));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S004: 查询运行禁止名单');
            Button.onClick(() => this.appendLog(AppLifecyclePolicyService.queryDisallowedRunningBundles()));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S004: 添加开机自启动应用');
            Button.onClick(() => this.appendLog(AppLifecyclePolicyService.addAutoStartApp('com.example.targetapp', 'EntryAbility')));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S008: 禁用 Wi-Fi 能力');
            Button.onClick(() => this.appendLog(RestrictionPolicyService.setWifiDisallowed(true)));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S008: 查询 Wi-Fi 禁用状态');
            Button.onClick(() => this.appendLog(RestrictionPolicyService.queryWifiDisallowed()));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S008: 设置用户级限制（修改壁纸）');
            Button.onClick(() => this.appendLog(RestrictionPolicyService.setUserRestrictionDemo(100, true)));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S002: 下发电源键按键策略');
            Button.onClick(() => this.appendLog(KeyAndLogPolicyService.setupKeyEventPolicies()));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('S002: 创建日志收集任务');
            Button.onClick(async () => this.appendLog(await KeyAndLogPolicyService.startLogCollect()));
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F5F5F5');
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.logLines.join('\n'));
            Text.fontSize(11);
            Text.width('100%');
        }, Text);
        Text.pop();
        Scroll.pop();
        Column.pop();
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
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huaagcwei.mdm.hm", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
