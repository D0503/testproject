# 代码开发验证报告

- 工程：D:\HW\testproject\complete\BookRead
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| HDS沉浸光感组合接入（HdsNavigation标题栏材质+HdsTabs底部悬浮页签材质） | hds-api23 | build_passed_runtime_pending |

## HDS沉浸光感组合接入（HdsNavigation标题栏材质+HdsTabs底部悬浮页签材质）

- 判据策略：fresh，冻结于 2026-09-11T01:58:54.276Z

- 总结果：`build_passed_runtime_pending`
- 能力：immersive-light
- 技术路线：hds-api23

静态、SDK 和构建已通过，仍缺少必需设备运行或视觉证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：现有工程
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-F027：将工程 targetSdkVersion 从 6.0.2(22) 升级到 6.1.0(23)（HDS 沉浸光感材质起始版本），compatibleSdkVersion 保持 6.0.0(20) 不提高最低兼容；工程为 Stage 模型满足约束
  - 官网冻结来源：hds-component-material-guide:5-5，片段 SHA-256：`5fad79183d8c6d2675b0f944c4a76fdda328718c8b70daaaf92c0c74e679e757`
- IL-F028：Index.ets 根路由容器由 Navigation 等价替换为 HdsNavigation，并在 titleBar 的 style.systemMaterialEffect 中为标题栏按钮配置沉浸光感
  - 官网冻结来源：hds-component-material-guide:7-7，片段 SHA-256：`1475cdeaea0987f38b1a4b65236e8f21ddd9971ed0e21adb29a3e655976fa2bc`
  - 官网冻结来源：hds-navigation-api:1479-1483，片段 SHA-256：`997f30ce747627d3fdd61ec8c59faf324c83fb5e026fd97a74c08f54b4ce8b05`
- IL-F029：BookHomePage 的 Tabs 替换为 HdsTabs，通过 barFloatingStyle.systemMaterialEffect 为底部悬浮页签配置沉浸光感
  - 官网冻结来源：hds-component-material-guide:9-9，片段 SHA-256：`02e570cd8fd60a2c39d537fef666868df1ebb939a5013433576e3b5eea15f55f`
  - 官网冻结来源：hds-tabs-api:715-719，片段 SHA-256：`969fe73994deccb2bf9d74d68c24049f1e299a6a60ea50533dd8a88fa2625c24`
- IL-F030：两处 systemMaterialEffect 均显式设置 materialType 与 materialLevel，不省略 materialType（默认 NONE 不等于启用材质）
  - 官网冻结来源：hds-navigation-api:2055-2066，片段 SHA-256：`f108ae25742c9d40fc4e2ec6e53ec0ed147272d24e1748b1e614156ea04e140e`
- IL-F031：materialType 使用 hdsMaterial.MaterialType.ADAPTIVE（自适应系统材质，默认采用沉浸式材质）
  - 官网冻结来源：hds-material-api:60-66，片段 SHA-256：`58ad7edbea837a5110b3f54c1730bfb4f485ca0e1238be3b6c04e606095298fd`
- IL-F032：materialLevel 使用 hdsMaterial.MaterialLevel.ADAPTIVE（系统按设备算力自适应材质等级）
  - 官网冻结来源：hds-material-api:80-96，片段 SHA-256：`1a2b274e1396653764b72062e52864d6fe786a561f1c4352c4a7dd6d160bb1f2`
- IL-F033：采用官网推荐的系统自适应组合 materialType=ADAPTIVE + materialLevel=ADAPTIVE，不在工程内自行选级
  - 官网冻结来源：hds-component-material-guide:11-13，片段 SHA-256：`f2212a12749be1d6112bce51e53cd3e0d7d5068fd8721947a708695d4f1eb61d`
  - 官网冻结来源：hds-material-api:88-90，片段 SHA-256：`60d2029de8592453852712d8395d6560c013e6f698491c4bb6a084c0389c61e7`
- IL-F035：工程目标设备为 Phone/Tablet（可直接调用）；不选自定义材质等级，PC/2in1 的能力差异由 ADAPTIVE 系统自适应策略承担，无需 getSystemMaterialTypes 前置查询；TV 非目标设备
  - 官网冻结来源：hds-navigation-api:2049-2053，片段 SHA-256：`ebd77d2875a0a2c2e3f6c55a3bb4f69e1db80ca9c870b3e0aded7c7ee4542e6d`
- IL-F036：现有工程模式：参考官网示例的 systemMaterialEffect 配置结构，不复制 scenery01 等示例资源，不为接入引入示例外的异常处理代码
  - 官网冻结来源：hds-component-material-guide:20-23，片段 SHA-256：`ef4b133c429f6c2ee4da54c175bc3710a504f146247ddcf4696a41c36c953489`
  - 官网冻结来源：hds-component-material-guide:64-67，片段 SHA-256：`28b78084027eedea155521faa8d917b172dd5dd1c404ea1f6471b2cfc27c6dec`
- IL-F037：HdsNavigation 标题栏通过 TitleBarStyleOptions.systemMaterialEffect 配置沉浸光感样式（6.1.0(23) 起，targetSdk 升级后可用）
  - 官网冻结来源：hds-navigation-api:1479-1483，片段 SHA-256：`997f30ce747627d3fdd61ec8c59faf324c83fb5e026fd97a74c08f54b4ce8b05`
- IL-F038：titleBar.style.scrollEffectOpts 配置 GRADIENT_BLUR 并同时配置 systemMaterialEffect，enableScrollEffect=false 时 originalStyle 背景使用默认 comp_background_gray（不自定义 backgroundColor）
  - 官网冻结来源：hds-navigation-api:1150-1158，片段 SHA-256：`be199a7859e952827b10b45ef1ff86f1960817e71eaf720f345e07303b7cf20e`
- IL-F039：scrollEffectOpts 显式配置 enableScrollEffect: false（首页由 NavDestination 全屏承载，不依赖滚动联动），仅生效 originalStyle 初始样式
  - 官网冻结来源：hds-navigation-api:1381-1388，片段 SHA-256：`68d02b61fb3ce2cb725691f6838e9f1b239de5f43163bc37f2e761f34298aa74`
- IL-F040：手机模式（非平板断点）HdsTabs 同时设置 barOverlap(true)、vertical(false)、barPosition(BarPosition.End) 与 barFloatingStyle；平板模式保持侧边页签（vertical(true)/BarPosition.Start）不启用悬浮样式
  - 官网冻结来源：hds-tabs-api:1601-1603，片段 SHA-256：`dde363512d4d795acbef69cfcc90ab757160e9e16bda70e4ab3f98a8c2890253`
- IL-F041：barFloatingStyle.systemMaterialEffect 显式赋值（默认 undefined 无材质）；工程不含 TV 目标，TV 无效果不影响
  - 官网冻结来源：hds-tabs-api:715-719，片段 SHA-256：`969fe73994deccb2bf9d74d68c24049f1e299a6a60ea50533dd8a88fa2625c24`
  - 官网冻结来源：hds-tabs-api:825-835，片段 SHA-256：`00b12981a1dd3e991f749d1ddbf041e09477226803d25dfd17f58bb31e3807fa`

#### S01 · 已实施

build-profile.json5 将 default product 的 targetSdkVersion 升级为 6.1.0(23)，compatibleSdkVersion 保持 6.0.0(20)

- 位置：`build-profile.json5:8-8`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-8`（修改后；已对应 diff）
- 判据依据（fresh）：HDS 沉浸光感材质从 6.1.0(23) 起提供
  - IL-F027：HDS 组件沉浸光感材质从 6.1.0(23) 起提供，仅支持 Stage 模型，系统能力为 SystemCapability.UIDesign.HDSComponent.Core。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：新增支持HDS组件的沉浸光感材质能力 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`

#### S02 · 已实施

Index.ets 根容器 Navigation 等价替换为 HdsNavigation（保留 pathInfos/hideNavBar/hideTitleBar/mode/navDestination/尺寸属性），新增 titleBar 配置：style.scrollEffectOpts{enableScrollEffect:false, scrollEffectType:GRADIENT_BLUR} + systemMaterialEffect{ADAPTIVE,ADAPTIVE}

- 位置：`entry/src/main/ets/pages/Index.ets:39-152`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:39-165`（修改后；已对应 diff）
- 判据依据（fresh）：标题栏材质入口
  - IL-F028：HdsNavigation 通过 TitleBarStyleOptions.systemMaterialEffect 为标题栏按钮设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为标题栏按钮设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：显式材质参数
  - IL-F030：HDS SystemMaterialParams 包含可选的 materialType 和 materialLevel；默认 materialType 为 NONE，默认 materialLevel 为 ADAPTIVE，因此省略 materialType 不能视为已经启用材质。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：默认值：hdsMaterial.MaterialType.NONE · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：MaterialType.ADAPTIVE
  - IL-F031：HDS MaterialType 取值为 NONE=0、ADAPTIVE=100、IMMERSIVE=101；ADAPTIVE 表示自适应系统材质且默认采用沉浸式材质。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：自适应系统材质。默认为沉浸式材质 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：MaterialLevel.ADAPTIVE
  - IL-F032：HDS MaterialLevel 取值为 EXQUISITE=0、GENTLE=1、SMOOTH=2、ADAPTIVE=10；ADAPTIVE 档由系统按设备算力自适应；设备不支持 IMMERSIVE 时官网建议使用 SMOOTH 以降低卡顿和发热风险。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：材质生效策略由系统策略决定 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：系统自适应推荐
  - IL-F033：官网推荐 HDS 使用 materialType=ADAPTIVE、materialLevel=ADAPTIVE，让系统根据设备算力动态平衡材质效果和性能。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：推荐使用系统自适应 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：设备差异由系统自适应承担
  - IL-F035：HDS 材质在 Phone、Tablet 可调用；PC/2in1 使用前需查询设备材质能力；HdsTabs 的该接口在 TV 无效果。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：在PC/2in1设备调用时需先调用 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：TitleBarStyleOptions.systemMaterialEffect 从 6.1.0(23) 起可用
  - IL-F037：HdsNavigation 标题栏通过 TitleBarStyleOptions.systemMaterialEffect 设置沉浸光感样式，起始版本 6.1.0(23)。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：设置标题栏沉浸光感样式 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：GRADIENT_BLUR 与 systemMaterialEffect 搭配的背景默认值行为
  - IL-F038：模糊样式为 GRADIENT_BLUR 且配置 systemMaterialEffect 时，标题栏背景默认值随滚动联动：enableScrollEffect 为 false 时 originalStyle 的 backgroundColor 默认 $r('sys.color.comp_background_gray')；为 true 时 originalStyle 默认透明、scrollEffectStyle 默认 $r('sys.color.comp_background_gray')。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：当模糊样式类型为GRADIENT_BLUR并配置沉浸光感属性 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：enableScrollEffect 显式 false
  - IL-F039：标题栏是否随内容区滚动动态生效样式由 ScrollEffectOptions.enableScrollEffect 控制：默认 true，样式从 originalStyle 到 scrollEffectStyle 随滚动总偏移量线性过渡；false 时不随滚动动态生效，仅生效 originalStyle。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：配置标题栏是否随内容区滚动的总偏移量动态生效标题栏样式 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`

#### S03 · 已实施

BookHomePage.ets 将 Tabs 替换为 HdsTabs（tabsController 改为 HdsTabsController，继承 TabsController 保持 changeIndex 兼容），手机模式新增 barOverlap(true) 与 barFloatingStyle{systemMaterialEffect{ADAPTIVE,ADAPTIVE}}，平板模式保持侧边页签不设悬浮样式；不引入官网示例资源

- 位置：`entry/src/main/ets/pages/BookHomePage.ets:15-86`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/BookHomePage.ets:15-94`（修改后；已对应 diff）
- 判据依据（fresh）：底部悬浮页签材质入口
  - IL-F029：HdsTabs 通过 HdsTabsFloatingStyle.systemMaterialEffect 为底部悬浮页签设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为底部页签设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：显式材质参数
  - IL-F030：HDS SystemMaterialParams 包含可选的 materialType 和 materialLevel；默认 materialType 为 NONE，默认 materialLevel 为 ADAPTIVE，因此省略 materialType 不能视为已经启用材质。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：默认值：hdsMaterial.MaterialType.NONE · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：MaterialType.ADAPTIVE
  - IL-F031：HDS MaterialType 取值为 NONE=0、ADAPTIVE=100、IMMERSIVE=101；ADAPTIVE 表示自适应系统材质且默认采用沉浸式材质。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：自适应系统材质。默认为沉浸式材质 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：MaterialLevel.ADAPTIVE
  - IL-F032：HDS MaterialLevel 取值为 EXQUISITE=0、GENTLE=1、SMOOTH=2、ADAPTIVE=10；ADAPTIVE 档由系统按设备算力自适应；设备不支持 IMMERSIVE 时官网建议使用 SMOOTH 以降低卡顿和发热风险。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：材质生效策略由系统策略决定 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：系统自适应推荐
  - IL-F033：官网推荐 HDS 使用 materialType=ADAPTIVE、materialLevel=ADAPTIVE，让系统根据设备算力动态平衡材质效果和性能。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：推荐使用系统自适应 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：目标设备 Phone/Tablet 直接可用
  - IL-F035：HDS 材质在 Phone、Tablet 可调用；PC/2in1 使用前需查询设备材质能力；HdsTabs 的该接口在 TV 无效果。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：在PC/2in1设备调用时需先调用 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：不复制示例资源
  - IL-F036：HDS 官网指南示例是需补齐工程上下文的片段：示例导入仅含 @kit.UIDesignKit 与 @kit.ArkUI 的 SymbolGlyphModifier，示例本身不含异常处理代码；scenery01 明确要求替换为本地资源。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：scenery为自定义资源，开发者需替换本地资源 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：悬浮布局条件 barOverlap/vertical/barPosition/barFloatingStyle
  - IL-F040：页签栏悬浮样式须同时满足：设置 HdsTabs 组件的 barFloatingStyle 样式，并设置 barOverlap 为 true、vertical 为 false、barPosition 为 BarPosition.End。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：并设置barOverlap为true，vertical为false，barPosition为BarPosition.End，可实现页签栏的悬浮样式 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`
- 判据依据（fresh）：systemMaterialEffect 显式配置
  - IL-F041：HdsTabsFloatingStyle.systemMaterialEffect 类型为 SystemMaterialParams（起始版本 6.1.0(23)），默认 undefined 表示没有新材质；该接口在 TV 无效果，PC/2in1 设备调用前需先调用 getSystemMaterialTypes() 查询当前设备支持的材质能力。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：默认值：undefined，没有新材质 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | HDS 沉浸光感 6.1.0(23)：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | not_run | 未请求运行验证。 |
| runtime | 是 | not_run | 未请求运行验证。 |
| visual | 是 | not_run | 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。 |

### 代码变化

#### build-profile.json5

- 状态：modified
- before：`5f4422a2d92fd24dadd2733507b75bbc5fb1d6cb23dd85a18d0ce4672a524ef6`
- after：`588ad38703254a2f5b55ae3a6c25125f2797e1fc0e3aed9f1c9561582fda98ee`

```diff
--- a/build-profile.json5
+++ b/build-profile.json5
@@ -5,7 +5,7 @@
       {
         "name": "default",
         "signingConfig": "default",
-        "targetSdkVersion": "6.0.2(22)",
+        "targetSdkVersion": "6.1.0(23)",
         "compatibleSdkVersion": "6.0.0(20)",
         "runtimeOS": "HarmonyOS",
         "buildOption": {
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`8f1f67c0c568c2c53ea6b9ac9edbb460196b385b2d10a7e422252637537fd997`
- after：`8de6e88ec88e942dd55bcea2b3a883fd7ea7d7f94a1abd32cf6d2bd7caea254b`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -36,120 +36,133 @@
 import { BookGroupContent, BookShelfPage } from 'book_shelf';
 import { BookListPage, BookViewListPage, SearchPage } from 'book_home';
 import { ReaderPage, WriteReviewPage, WriteCommentPage, WonderfulReviewPage, MyReviewPage } from 'book_read_kit';
-
-
-@Entry
-@ComponentV2
-struct Index {
-  aboutToAppear(): void {
-    const uiContext = this.getUIContext()
-    BreakpointSystem.register(uiContext)
-    TCRouter.push(Constants.PRIVACY_AGREEMENT_ROUTER)
-    this.pushKitRouter()
-  }
-
-  pushKitRouter() {
-    if (AppStorage.get('takeMessage') === 1) {
-      TCRouter.push(Constants.MESSAGE_PAGE_ROUTE)
-      AppStorage.setOrCreate('takeMessage', 0)
-      AppStorage.setOrCreate('inMessagePage', 1)
-    }
-  }
-
-  @Builder
-  routerMap(name: string) {
-    if (name === Constants.HOME_ROUTER) {
-      BookHomePage();
-    } else if (name === Constants.READ_KIT_ROUTER) {
-      ReaderPage();
-    } else if (name === Constants.SETTING_ROUTE) {
-      SettingPage()
-    } else if (name === Constants.ACCOUNT_ROUTE) {
-      AccountPage();
-    } else if (name === Constants.LIBARY_ROUTE) {
-      LibraryPage();
-    } else if (name === Constants.BORROW_DETAIL_ROUTE) {
-      BorrowDetailInfoPage();
-    } else if (name === Constants.BORROW_ROUTE) {
-      BorrowPage();
-    } else if (name === Constants.SHELF_ROUTER) {
-      BookShelfPage();
-    } else if (name === Constants.BOOK_LIST_ROUTE) {
-      BookViewListPage();
-    } else if (name === Constants.SEARCH_ROUTE) {
-      SearchPage();
-    } else if (name === Constants.LOGIN_ROUTE) {
-      LoginPage();
-    } else if (name === Constants.PREFERENCE_ROUTE) {
-      PreferencePage();
-    } else if (name === Constants.ACTIVITY_ROUTE) {
-      ActivityPage();
-    } else if (name === Constants.ABOUT_ROUTE) {
-      AboutPage();
-    } else if (name === Constants.PRIVACY_ROUTE) {
-      PrivacyPage();
-    } else if (name === Constants.FONT_ROUTE) {
-      SettingFont();
-    } else if (name === Constants.FEEDBACK_ROUTE) {
-      FeedbackPage();
-    } else if (name === Constants.FEEDBACK_RECORD_ROUTE) {
-      FeedbackRecordPage();
-    } else if (name === Constants.ISSUE_AND_FEEDBACK_ROUTE) {
-      IssueAndFeedbackPage();
-    } else if (name === Constants.BOOK_CASE_ROUTER) {
-      BookListPage();
-    } else if (name === Constants.PRIVACY_POLICY_ROUTE) {
-      PrivacyPolicyPage();
-    } else if (name === Constants.MEMBER_CENTER_ROUTE) {
-      MemberCenterPage();
-    } else if (name === Constants.MEMBER_AGREEMENT_ROUTE) {
-      MemberAgreementPage();
-    } else if (name === Constants.RECHARGE_ROUTE) {
-      RechargePage();
-    } else if (name === Constants.RECHARGE_RECORD_ROUTE) {
-      RechargeRecordPage();
-    } else if (name === Constants.WELFARE_CENTER) {
-      WelfareCenter()
-    } else if (name === Constants.DATA_COLLECTION_ROUTE) {
-      DataCollectionPage();
-    } else if (name === Constants.DATA_SHARING_ROUTE) {
-      DataSharingPage();
-    } else if (name === Constants.READ_SETTING_ROUTE) {
-      ReadSettingPage();
-    } else if (name === Constants.WRITE_REVIEW_ROUTE) {
-      WriteReviewPage();
-    } else if (name === Constants.ALL_REVIEW_ROUTE) {
-      WriteReviewPage();
-    } else if (name === Constants.WRITE_COMMENT_ROUTE) {
-      WriteCommentPage();
-    } else if (name === Constants.WONDERFUL_REVIEW_ROUTE) {
-      WonderfulReviewPage();
-    } else if (name === Constants.MY_EVALUATION_ROUTE) {
-      MyReviewPage();
-    } else if (name === Constants.MESSAGE_PAGE_ROUTE) {
-      messagePage();
-    } else if (name === Constants.GROUP_ROUTE) {
-      BookGroupContent();
-    } else if (name === Constants.READ_HISTORY_ROUTE) {
-      ReadHistoryBuilder();
-    } else if (name === Constants.MINORS_MODE_ROUTE) {
-      MinorsModePage();
-    } else if (name === Constants.READ_RECORD_ROUTE) {
-      ReadRecordPage();
-    } else if (name === Constants.MY_DOWNLOAD_ROUTE) {
-      MyDownloadPageBuilder();
-    } else if (name === Constants.LAUNCH_AD_ROUTER) {
-      LaunchAdPage();
-    } else if (name === Constants.PRIVACY_AGREEMENT_ROUTER) {
-      PrivacyAgreementPage();
-    } else if (name === Constants.CUSTOMER_SERVICE_CHAT_ROUTER) {
-      CustomerServiceChatPage();
-    }
-  }
-
-  build() {
-    Stack() {
-      Navigation(TCRouter.getStack())
+import { HdsNavigation, ScrollEffectType, hdsMaterial } from '@kit.UIDesignKit';
+
+
+@Entry
+@ComponentV2
+struct Index {
+  aboutToAppear(): void {
+    const uiContext = this.getUIContext()
+    BreakpointSystem.register(uiContext)
+    TCRouter.push(Constants.PRIVACY_AGREEMENT_ROUTER)
+    this.pushKitRouter()
+  }
+
+  pushKitRouter() {
+    if (AppStorage.get('takeMessage') === 1) {
+      TCRouter.push(Constants.MESSAGE_PAGE_ROUTE)
+      AppStorage.setOrCreate('takeMessage', 0)
+      AppStorage.setOrCreate('inMessagePage', 1)
+    }
+  }
+
+  @Builder
+  routerMap(name: string) {
+    if (name === Constants.HOME_ROUTER) {
+      BookHomePage();
+    } else if (name === Constants.READ_KIT_ROUTER) {
+      ReaderPage();
+    } else if (name === Constants.SETTING_ROUTE) {
+      SettingPage()
+    } else if (name === Constants.ACCOUNT_ROUTE) {
+      AccountPage();
+    } else if (name === Constants.LIBARY_ROUTE) {
+      LibraryPage();
+    } else if (name === Constants.BORROW_DETAIL_ROUTE) {
+      BorrowDetailInfoPage();
+    } else if (name === Constants.BORROW_ROUTE) {
+      BorrowPage();
+    } else if (name === Constants.SHELF_ROUTER) {
+      BookShelfPage();
+    } else if (name === Constants.BOOK_LIST_ROUTE) {
+      BookViewListPage();
+    } else if (name === Constants.SEARCH_ROUTE) {
+      SearchPage();
+    } else if (name === Constants.LOGIN_ROUTE) {
+      LoginPage();
+    } else if (name === Constants.PREFERENCE_ROUTE) {
+      PreferencePage();
+    } else if (name === Constants.ACTIVITY_ROUTE) {
+      ActivityPage();
+    } else if (name === Constants.ABOUT_ROUTE) {
+      AboutPage();
+    } else if (name === Constants.PRIVACY_ROUTE) {
+      PrivacyPage();
+    } else if (name === Constants.FONT_ROUTE) {
+      SettingFont();
+    } else if (name === Constants.FEEDBACK_ROUTE) {
+      FeedbackPage();
+    } else if (name === Constants.FEEDBACK_RECORD_ROUTE) {
+      FeedbackRecordPage();
+    } else if (name === Constants.ISSUE_AND_FEEDBACK_ROUTE) {
+      IssueAndFeedbackPage();
+    } else if (name === Constants.BOOK_CASE_ROUTER) {
+      BookListPage();
+    } else if (name === Constants.PRIVACY_POLICY_ROUTE) {
+      PrivacyPolicyPage();
+    } else if (name === Constants.MEMBER_CENTER_ROUTE) {
+      MemberCenterPage();
+    } else if (name === Constants.MEMBER_AGREEMENT_ROUTE) {
+      MemberAgreementPage();
+    } else if (name === Constants.RECHARGE_ROUTE) {
+      RechargePage();
+    } else if (name === Constants.RECHARGE_RECORD_ROUTE) {
+      RechargeRecordPage();
+    } else if (name === Constants.WELFARE_CENTER) {
+      WelfareCenter()
+    } else if (name === Constants.DATA_COLLECTION_ROUTE) {
+      DataCollectionPage();
+    } else if (name === Constants.DATA_SHARING_ROUTE) {
+      DataSharingPage();
+    } else if (name === Constants.READ_SETTING_ROUTE) {
+      ReadSettingPage();
+    } else if (name === Constants.WRITE_REVIEW_ROUTE) {
+      WriteReviewPage();
+    } else if (name === Constants.ALL_REVIEW_ROUTE) {
+      WriteReviewPage();
+    } else if (name === Constants.WRITE_COMMENT_ROUTE) {
+      WriteCommentPage();
+    } else if (name === Constants.WONDERFUL_REVIEW_ROUTE) {
+      WonderfulReviewPage();
+    } else if (name === Constants.MY_EVALUATION_ROUTE) {
+      MyReviewPage();
+    } else if (name === Constants.MESSAGE_PAGE_ROUTE) {
+      messagePage();
+    } else if (name === Constants.GROUP_ROUTE) {
+      BookGroupContent();
+    } else if (name === Constants.READ_HISTORY_ROUTE) {
+      ReadHistoryBuilder();
+    } else if (name === Constants.MINORS_MODE_ROUTE) {
+      MinorsModePage();
+    } else if (name === Constants.READ_RECORD_ROUTE) {
+      ReadRecordPage();
+    } else if (name === Constants.MY_DOWNLOAD_ROUTE) {
+      MyDownloadPageBuilder();
+    } else if (name === Constants.LAUNCH_AD_ROUTER) {
+      LaunchAdPage();
+    } else if (name === Constants.PRIVACY_AGREEMENT_ROUTER) {
+      PrivacyAgreementPage();
+    } else if (name === Constants.CUSTOMER_SERVICE_CHAT_ROUTER) {
+      CustomerServiceChatPage();
+    }
+  }
+
+  build() {
+    Stack() {
+      HdsNavigation(TCRouter.getStack())
+        .titleBar({
+          style: {
+            scrollEffectOpts: {
+              enableScrollEffect: false,
+              scrollEffectType: ScrollEffectType.GRADIENT_BLUR
+            },
+            systemMaterialEffect: {
+              materialType: hdsMaterial.MaterialType.ADAPTIVE,
+              materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
+            }
+          }
+        })
       HdsNavigation(TCRouter.getStack())
         .titleBar({
           style: {
```

#### entry/src/main/ets/pages/BookHomePage.ets

- 状态：modified
- before：`5db4fd4568c608671084a82466daf5fd81a4ac6a5c8e9226783fb1906f31d114`
- after：`5239451c3913fceb51738c83485acd0dd78812f19250714919c12d1cb8647909`

```diff
--- a/entry/src/main/ets/pages/BookHomePage.ets
+++ b/entry/src/main/ets/pages/BookHomePage.ets
@@ -12,78 +12,86 @@
 import { notificationManager } from '@kit.NotificationKit';
 import { hilog } from '@kit.PerformanceAnalysisKit';
 import { common } from '@kit.AbilityKit';
-
-@ComponentV2
-export struct BookHomePage {
-  @Provider('isDeleteShelf') isDeleteShelf: boolean = false;
-  @Provider('currentIndexTab') currentIndexTab: number = 0;
-  @Provider('tabController') tabsController: TabsController = new TabsController();
-  @Provider('isHistory') isHistory: boolean = false
-  @Provider('userInfo') userInfo: UserInfo | undefined = undefined;
-  @Local curBreakpoint: BreakpointStorage = BreakpointSystem.currentBreakpoint
-  @Local minorsMode: MinorsMode =
-    AppStorageV2.connect(MinorsMode, 'isMinorsMode', () => new MinorsMode(MinorsProtectionUtils.getMinorsMode()))!
-
-  aboutToAppear(): void {
-    MinorsProtectionUtils.createSubscriber();
-    let context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
-    notificationManager.requestEnableNotification(context).then(() => {
-      hilog.info(0x0000, 'testTag', `[ANS] requestEnableNotification success`);
-    }).catch((err: BusinessError) => {
-      hilog.error(0x0000, 'testTag',
-        `[ANS] requestEnableNotification failed, code is ${err.code}, message is ${err.message}`);
-    });
-  }
-
-  @Builder
-  tabBuilder(title: string, index: number, selectedImg: Resource, normalImg: Resource) {
-    Column() {
-      SymbolGlyph(selectedImg)
-        .fontSize(fp2pxUtil(24))
-        .fontColor(this.currentIndexTab === index ? [$r('app.color.font_overdue')] :
-          [$r('sys.color.icon_secondary')])
-      Text(title)
-        .margin({ top: 4 })
-        .fontSize(fp2pxUtil(10))
-        .fontColor(this.currentIndexTab === index ? $r('app.color.font_overdue') : $r('app.color.tab_color_default'))
-    }
-    .justifyContent(FlexAlign.Center)
-    .height(this.isTablet ? 100 : undefined)
-    .width('100%')
-    .onClick(() => {
-      this.currentIndexTab = index;
-      this.tabsController.changeIndex(this.currentIndexTab);
-    })
-
-  }
-
-  @Computed
-  get isTablet() {
-    return BreakpointSystem.currentBreakpoint.value === BreakpointTypeEnum.LG
-  }
-
-  build() {
-    NavDestination() {
-      Tabs({
-        barPosition: this.curBreakpoint.value === BreakpointTypeEnum.LG ? BarPosition.Start : BarPosition.End,
-        index: this.currentIndexTab,
-        controller: this.tabsController
-      }) {
-        ForEach(this.minorsMode.isMinorsMode ? IndexData.MINOR_TAB : IndexData.MAIN_TAB, (item: TabInfo) => {
-          TabContent() {
-            item.component?.builder();
-          }
-          .tabBar(this.tabBuilder(item.label, item.index, item.activeIcon, item.defaultIcon))
-        }, (item: TabInfo) => item.index.toString()+item.label)
-      }
-      .clip(false)
-      .height('100%')
-      .backgroundColor($r('sys.color.background_secondary'))
-      .padding({ bottom: 18 })
-      .animationDuration(0)
-      .scrollable(false)
-      .barMode(this.isTablet ? BarMode.Scrollable : BarMode.Fixed)
-      .vertical(this.isTablet)
+import { HdsTabs, HdsTabsController, hdsMaterial } from '@kit.UIDesignKit';
+
+@ComponentV2
+export struct BookHomePage {
+  @Provider('isDeleteShelf') isDeleteShelf: boolean = false;
+  @Provider('currentIndexTab') currentIndexTab: number = 0;
+  @Provider('tabController') tabsController: HdsTabsController = new HdsTabsController();
+  @Provider('isHistory') isHistory: boolean = false
+  @Provider('userInfo') userInfo: UserInfo | undefined = undefined;
+  @Local curBreakpoint: BreakpointStorage = BreakpointSystem.currentBreakpoint
+  @Local minorsMode: MinorsMode =
+    AppStorageV2.connect(MinorsMode, 'isMinorsMode', () => new MinorsMode(MinorsProtectionUtils.getMinorsMode()))!
+
+  aboutToAppear(): void {
+    MinorsProtectionUtils.createSubscriber();
+    let context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
+    notificationManager.requestEnableNotification(context).then(() => {
+      hilog.info(0x0000, 'testTag', `[ANS] requestEnableNotification success`);
+    }).catch((err: BusinessError) => {
+      hilog.error(0x0000, 'testTag',
+        `[ANS] requestEnableNotification failed, code is ${err.code}, message is ${err.message}`);
+    });
+  }
+
+  @Builder
+  tabBuilder(title: string, index: number, selectedImg: Resource, normalImg: Resource) {
+    Column() {
+      SymbolGlyph(selectedImg)
+        .fontSize(fp2pxUtil(24))
+        .fontColor(this.currentIndexTab === index ? [$r('app.color.font_overdue')] :
+          [$r('sys.color.icon_secondary')])
+      Text(title)
+        .margin({ top: 4 })
+        .fontSize(fp2pxUtil(10))
+        .fontColor(this.currentIndexTab === index ? $r('app.color.font_overdue') : $r('app.color.tab_color_default'))
+    }
+    .justifyContent(FlexAlign.Center)
+    .height(this.isTablet ? 100 : undefined)
+    .width('100%')
+    .onClick(() => {
+      this.currentIndexTab = index;
+      this.tabsController.changeIndex(this.currentIndexTab);
+    })
+
+  }
+
+  @Computed
+  get isTablet() {
+    return BreakpointSystem.currentBreakpoint.value === BreakpointTypeEnum.LG
+  }
+
+  build() {
+    NavDestination() {
+      HdsTabs({
+        barPosition: this.curBreakpoint.value === BreakpointTypeEnum.LG ? BarPosition.Start : BarPosition.End,
+        index: this.currentIndexTab,
+        controller: this.tabsController
+      }) {
+        ForEach(this.minorsMode.isMinorsMode ? IndexData.MINOR_TAB : IndexData.MAIN_TAB, (item: TabInfo) => {
+          TabContent() {
+            item.component?.builder();
+          }
+          .tabBar(this.tabBuilder(item.label, item.index, item.activeIcon, item.defaultIcon))
+        }, (item: TabInfo) => item.index.toString()+item.label)
+      }
+      .clip(false)
+      .height('100%')
+      .backgroundColor($r('sys.color.background_secondary'))
+      .padding({ bottom: 18 })
+      .animationDuration(0)
+      .scrollable(false)
+      .barMode(this.isTablet ? BarMode.Scrollable : BarMode.Fixed)
+      .vertical(this.isTablet)
+      .barOverlap(!this.isTablet)
+      .barFloatingStyle(this.isTablet ? undefined : {
+        systemMaterialEffect: {
+          materialType: hdsMaterial.MaterialType.ADAPTIVE,
+          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
+        }
+      })
       .vertical(this.isTablet)
       .barOverlap(!this.isTablet)
       .barFloatingStyle(this.isTablet ? undefined : {
```

### 待验证

- PENDING-001 [install] 未请求运行验证。
- PENDING-002 [runtime] 未请求运行验证。
- PENDING-003 [visual] 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/kits/@kit.UIDesignKit.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/api/@hms.hds.hdsMaterial.d.ets
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/api/@hms.hds.hdsBaseComponent.d.ets
- EVID-005 [build_log] devecocli build 成功 — D:\HW\testproject\complete\BookRead\ohos-feature-engineering\evidence\59522281-50da-49e8-bd53-2ee5636d26fe\build.log
