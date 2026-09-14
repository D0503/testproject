# 代码开发验证报告

- 工程：D:\HW\testproject\complete\6
- 开发目标数：2

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 生成鸿蒙 demo：搜索框标题栏沉浸光感页面（上滑隐藏搜索框、分类保留、底部 Tabs 悬浮材质） | arkui-api26 | passed |
| 生成鸿蒙 demo：内容区标题栏开启沉浸光感页面（内容区标题吸顶迁入标题栏、分类独立组件） | arkui-api26 | passed |

## 生成鸿蒙 demo：搜索框标题栏沉浸光感页面（上滑隐藏搜索框、分类保留、底部 Tabs 悬浮材质）

- 判据策略：fresh，冻结于 2026-09-10T12:08:17.787Z

- 总结果：`passed`
- 能力：immersive-light
- 技术路线：arkui-api26

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-S013-C01：在探索页 NavDestination 的 .title() 中以 builder 提供自定义标题栏并为页签页面标题栏区域开启沉浸光感（标题栏及其子组件）。
  - 官网冻结来源：typical-scenes:85-85，片段 SHA-256：`819be5bb0779835fa139e74ceefc9783bcf103d697c8ae3fc6eefb4876120c7d`
- IL-S013-C02：标题栏内 Search 组件通过通用属性 systemMaterial 设置 new uiMaterial.ImmersiveMaterial({})。
  - 官网冻结来源：typical-scenes:107-107，片段 SHA-256：`34d58ee334ce70cb108ff382b7851d916804e09b392953f12c634f1b94c8b022`
- IL-S013-C03：分类列表项以 ChipGroup 的 backgroundSystemMaterial 字段开启沉浸光感，并配置 colorInvert 与 interactive。
  - 官网冻结来源：typical-scenes:85-85，片段 SHA-256：`819be5bb0779835fa139e74ceefc9783bcf103d697c8ae3fc6eefb4876120c7d`
- IL-S013-C04：根目录 build-profile.json5 目标 product 设置 targetSdkVersion 为 26.0.0；demo 无低版本兼容要求，compatibleSdkVersion 同为 26.0.0。
  - 官网冻结来源：enable:5-5，片段 SHA-256：`bb77936c5abd341381d20e9e89d8fa3bc80e3bcc45fac07f5dc581c7012a808e`
- IL-S013-C05：onDidScroll 累计 scrollOffset，在搜索框大小范围内更新 titleOffset 与 titleHeight，使上滑时标题栏显示范围随之缩小。
  - 官网冻结来源：typical-scenes:7-7，片段 SHA-256：`2ed24b143cb651d69d621570a5e5fb8c4efbe86abd1333c164a44677216afdf6`
- IL-S013-C06：滚动联动中 searchOpacity = 1 - titleOffset/50 控制搜索框隐藏；分类列表保留并突出显示（不随透明度联动）。
  - 官网冻结来源：typical-scenes:85-85，片段 SHA-256：`819be5bb0779835fa139e74ceefc9783bcf103d697c8ae3fc6eefb4876120c7d`
- IL-S013-C07：NavDestination 标题栏 options 设置 barStyle 为 BarStyle.STACK，使内容区显示在标题栏下方实现透底效果。
  - 官网冻结来源：typical-scenes:85-85，片段 SHA-256：`819be5bb0779835fa139e74ceefc9783bcf103d697c8ae3fc6eefb4876120c7d`
- IL-S013-C08：Scroll 内容区设置 contentStartOffset(totalTitleHeight) 避让标题栏显示区域，NavDestination 与标题栏容器 expandSafeArea([SafeAreaType.SYSTEM]) 延伸至状态栏。
  - 官网冻结来源：typical-scenes:147-147，片段 SHA-256：`20caafc57f495dc65e19a4afdfc4afe83857a6ea80362d0aefbb81d10197f329`
- IL-S013-C09：主页 Tabs barPosition End、barOverlap(true)，通过 barFloatingStyle({ barBottomMargin: 8, systemMaterial }) 设置底部页签悬浮并开启沉浸光感。
  - 官网冻结来源：typical-scenes:10-10，片段 SHA-256：`fae201eb9486f68bbb8c9d9f184b3edbf62f76d4d6739b2ae533c8b79a9c4cce`
- IL-S013-C10：标题栏 options 的 scrollEffectOptions 设置 scrollEffectType 为 GRADUAL_BLUR 标题栏模糊。
  - 官网冻结来源：typical-scenes:168-168，片段 SHA-256：`649e0cd368c620ae9c82e2ecab0205a7c77e3c2272cd2d1bde78b4cd65d84726`
- IL-S013-C11：材质仅设置在 NavDestination 标题栏子树内的 Search 与 ChipGroup 上，内容区不设置沉浸光感，满足生效区域约束。
  - 官网冻结来源：constraints:15-15，片段 SHA-256：`98b27c2205c0d36a73d2bc5a70a4ce7bbac0e11969cb5f34404bbe2722f04852`
- IL-S013-C12：标题栏外层容器（Column/Row）不设置 systemMaterial，仅叶子组件 Search、ChipGroup 各自设置一次，避免同一子树材质嵌套。
  - 官网冻结来源：constraints:60-60，片段 SHA-256：`56c8194ba8f769340a9f9dfabc0174247711dbdb6f80c2e1a3dba308321dbba1`

#### S01 · 已实施

build-profile.json5 目标 product 调整 targetSdkVersion 与 compatibleSdkVersion 为 26.0.0

- 位置：`build-profile.json5:5-12`（修改前；已对应 diff）
- 位置：`build-profile.json5:5-12`（修改后；已对应 diff）
- 判据依据（fresh）：开启沉浸光感要求 targetSDKVersion 不低于 26.0.0
  - IL-S013-C04：开启沉浸光感要确保应用的 targetSDKVersion 不低于 26.0.0。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：不低于26.0.0 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`

#### S02 · 部分实施

module.json5 添加 routerMap 引用以启用系统路由表

- 位置：`entry/src/main/module.json5:10-15`（修改前；未确认变更）
- 位置：`entry/src/main/module.json5:10-16`（修改后；已对应 diff）
- 判据依据（fresh）：示例通过系统路由表为跳转目标页面提供 NavDestination 页面
  - IL-S013-C01：针对跳转的目标页面，通过 NavigationTitleOptions 为对应的页签页面标题栏区域开启沉浸光感，实现标题栏以及标题栏子组件开启沉浸光感。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：为对应的页签页面标题栏区域开启沉浸光感 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 工程配套选择：Navigation(name) 需要系统路由表解析目标页
- 待确认：entry/src/main/module.json5:10-15 无可对应的基线差异，实施情况待确认。

#### S03 · 已实施

新增 route_map.json 注册 explore 路由与构建函数

- 位置：`entry/src/main/resources/base/profile/route_map.json:1-14`（修改后；已对应 diff）
- 判据依据（fresh）：为探索页 NavDestination 提供路由可达性
  - IL-S013-C01：针对跳转的目标页面，通过 NavigationTitleOptions 为对应的页签页面标题栏区域开启沉浸光感，实现标题栏以及标题栏子组件开启沉浸光感。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：为对应的页签页面标题栏区域开启沉浸光感 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 工程配套选择：系统路由表 JSON 为工程落地必需

#### S04 · 已实施

新增 ListData.ets 提供示例引用的 ListItemData 与 listItems 数据

- 位置：`entry/src/main/ets/model/ListData.ets:1-22`（修改后；已对应 diff）
- 判据依据（fresh）：滚动联动需要列表内容填充页面
  - IL-S013-C05：信息浏览类应用场景中，用户上滑首页内容区后，标题栏显示范围可随之缩小，同时通过沉浸光感提升标题栏的交互体验。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：用户上滑首页内容区后，标题栏显示范围可随之缩小 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：分类列表保留与上滑联动需要列表内容
  - IL-S013-C06：上滑时搜索框隐藏，分类列表保留并突出显示；在搜索框大小范围内依据 onDidScroll 累计偏移更新标题栏高度与搜索框透明度。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：上滑时搜索框隐藏，分类列表保留并突出显示 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 工程配套选择：示例引用 listItems 常量但未给出定义

#### S05 · 已实施

Index.ets 实现底部 Tabs 悬浮主页：探索页签承载 Navigation(explore)

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-66`（修改后；已对应 diff）
- 判据依据（fresh）：设置底部 Tabs 悬浮并为 Tabs 组件开启沉浸光感
  - IL-S013-C09：底部 Tabs 悬浮并为 Tabs 组件开启沉浸光感（barFloatingStyle 配置 systemMaterial）。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：设置底部Tabs悬浮并为Tabs组件开启沉浸光感 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`

#### S06 · 已实施

新增 ClassifyComponent.ets 分类独立组件（ChipGroup + backgroundSystemMaterial）

- 位置：`entry/src/main/ets/components/ClassifyComponent.ets:1-39`（修改后；已对应 diff）
- 判据依据（fresh）：分类列表项通过 backgroundSystemMaterial 开启沉浸光感
  - IL-S013-C03：分类列表项开启沉浸光感（ChipGroup 通过 backgroundSystemMaterial 字段设置，示例同时配置 colorInvert 与 interactive），提升用户交互体验和内容曝光率。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：分类列表项开启沉浸光感，提升用户交互体验和内容曝光率 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：仅叶子组件设置材质，避免同一子树嵌套
  - IL-S013-C12：材质嵌套使用会导致效果被重复计算，既增加功耗，视觉上又相互干扰；同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`

#### S07 · 已实施

新增 ExplorePage.ets 搜索框标题栏页面（STACK 透底、Search 材质、上滑联动、GRADUAL_BLUR）

- 位置：`entry/src/main/ets/pages/ExplorePage.ets:1-96`（修改后；已对应 diff）
- 判据依据（fresh）：标题栏及标题栏子组件开启沉浸光感
  - IL-S013-C01：针对跳转的目标页面，通过 NavigationTitleOptions 为对应的页签页面标题栏区域开启沉浸光感，实现标题栏以及标题栏子组件开启沉浸光感。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：为对应的页签页面标题栏区域开启沉浸光感 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：Search 通过 systemMaterial 设置材质
  - IL-S013-C02：标题栏中的 Search 组件通过通用属性 systemMaterial 设置沉浸式系统材质（ImmersiveMaterial）。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：systemMaterial(new uiMaterial.ImmersiveMaterial({})) · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：上滑标题栏显示范围缩小
  - IL-S013-C05：信息浏览类应用场景中，用户上滑首页内容区后，标题栏显示范围可随之缩小，同时通过沉浸光感提升标题栏的交互体验。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：用户上滑首页内容区后，标题栏显示范围可随之缩小 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：上滑时搜索框隐藏、分类列表保留
  - IL-S013-C06：上滑时搜索框隐藏，分类列表保留并突出显示；在搜索框大小范围内依据 onDidScroll 累计偏移更新标题栏高度与搜索框透明度。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：上滑时搜索框隐藏，分类列表保留并突出显示 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：BarStyle.STACK 实现透底
  - IL-S013-C07：建议将 Navigation 组件的 BarStyle 设置为 STACK 模式，使内容区显示在标题栏下方，从而实现透底的效果。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：建议将Navigation组件的BarStyle设置为STACK模式 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：contentStartOffset 避让与 expandSafeArea 延伸
  - IL-S013-C08：滚动内容区通过 contentStartOffset 避让标题栏显示区域，并通过 expandSafeArea 将显示内容延伸至状态栏区域，使应用整体体验更加一致。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：避让标题栏显示区域 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：GRADUAL_BLUR 标题栏模糊
  - IL-S013-C10：标题栏配置 STACK 样式与 scrollEffectOptions 的 GRADUAL_BLUR 标题栏模糊。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：scrollEffectType: ScrollEffectType.GRADUAL_BLUR · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：材质仅在标题栏子树生效范围内设置
  - IL-S013-C11：其他组件仅在 Navigation/NavDestination 标题栏或横向 Tab 中 barPosition 为 BarPosition.End 的底部 TabBar 中生效，在其他区域设置沉浸光感效果不生效；标题栏子组件的材质应设置在标题栏子树内。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：其他组件仅在Navigation/NavDestination标题栏或横向Tab中barPosition为BarPosition.End的底部TabBar中生效 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 导航编排通过（expectPage=探索 命中）；组件树证实 NavDestination 标题栏内 Search 与 ChipGroup 分类就位、内容区 List 未设置材质、底部 Tabs 含探索/游戏两页签，与判据 IL-S013-C01/C02/C03/C09/C11 的结构预期一致。 |
| visual | 是 | passed | 模型判图：用户查看设备截图（探索页）确认标题栏/搜索框/分类 Chips/底部页签呈现沉浸光感通透材质效果；组件树证实探索页结构完整（标题栏 Text(探索)+Search+搜索按钮、ChipGroup 分类（策略/动作/竞技…）、内容 List、底部 Tabs 探索/游戏页签）。 |

### 代码变化

#### build-profile.json5

- 状态：modified
- before：`12b986eeb2ae25ba52e34e23e5a0d1079fa1bce32216e64baf7164283077b56b`
- after：`810fc1e7293f5581220f36bc2383ed91a426f7697262b758d8e21ba3cce217bf`

```diff
--- a/build-profile.json5
+++ b/build-profile.json5
@@ -5,8 +5,8 @@
       {
         "name": "default",
         "signingConfig": "default",
-        "targetSdkVersion": "6.0.1(21)",
-        "compatibleSdkVersion": "6.0.1(21)",
+        "targetSdkVersion": "26.0.0",
+        "compatibleSdkVersion": "26.0.0",
         "runtimeOS": "HarmonyOS",
         "buildOption": {
           "strictMode": {
```

#### entry/src/main/module.json5

- 状态：modified
- before：`95045053098ced28f3f807767014815b5a26b0203f16de619b0c66eca93c42dc`
- after：`dab8ecfc034663224010a5f3a7ae076492011afb0f31719277230f7f4ccc852b`

```diff
--- a/entry/src/main/module.json5
+++ b/entry/src/main/module.json5
@@ -10,6 +10,7 @@
     "deliveryWithInstall": true,
     "installationFree": false,
     "pages": "$profile:main_pages",
+    "routerMap": "$profile:route_map",
     "routerMap": "$profile:route_map",
     "abilities": [
       {
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`5a84450f9b41371c5431e8d75c47b047cc8377da0062041c771d40618a392d06`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,66 @@
-@Entry
-@Component
-struct Index {
-  @State message: string = 'Hello World';
-
-  build() {
-    RelativeContainer() {
-      Text(this.message)
-        .id('HelloWorld')
-        .fontSize($r('app.float.page_text_font_size'))
-        .fontWeight(FontWeight.Bold)
-        .alignRules({
-          center: { anchor: '__container__', align: VerticalAlign.Center },
-          middle: { anchor: '__container__', align: HorizontalAlign.Center }
-        })
-        .onClick(() => {
-          this.message = 'Welcome';
-        })
-    }
-    .height('100%')
-    .width('100%')
-  }
-}
+import { uiMaterial } from '@kit.ArkUI'
+
+@Entry
+@ComponentV2
+struct BestPractise {
+  @Local currentTab: number = 0
+  exploreStack: NavPathStack = new NavPathStack()
+  gameStack: NavPathStack = new NavPathStack()
+
+  @Builder
+  BottomTabBarItem(title: string, icon: Resource, index: number) {
+    Column() {
+      SymbolGlyph(icon)
+        .fontSize(22)
+        .fontColor(this.currentTab === index ? ['#007dff'] : ['#999999'])
+      Text(title)
+        .fontSize(10)
+        .fontColor(this.currentTab === index ? '#007dff' : '#999999')
+        .margin({ top: 2 })
+    }.justifyContent(FlexAlign.Center)
+    .width('100%')
+    .height('100%')
+  }
+
+  @Builder
+  tabExploreContent() {
+    // 通过系统路由表的方式配置对应的页面跳转
+    Navigation(this.exploreStack, { name: 'explore' })
+      .hideTitleBar(true)
+      .expandSafeArea([SafeAreaType.SYSTEM])
+  }
+
+  @Builder
+  tabGameContent() {
+    // 通过系统路由表的方式配置对应的页面跳转
+    Navigation(this.gameStack, { name: 'game' })
+      .hideTitleBar(true)
+      .expandSafeArea([SafeAreaType.SYSTEM])
+  }
+
+  build() {
+    Tabs({ index: this.currentTab }) {
+      TabContent() {
+        this.tabExploreContent()
+      }.tabBar(this.BottomTabBarItem('探索', $r('sys.symbol.compass'), 0))
+      // 内容区延伸到状态栏区域，形成整体的交互体验
+      .expandSafeArea([SafeAreaType.SYSTEM])
+
+      TabContent() {
+        this.tabGameContent()
+      }.tabBar(this.BottomTabBarItem('游戏', $r('sys.symbol.gamecontroller'), 1))
+      .expandSafeArea([SafeAreaType.SYSTEM])
+    }
+    .barPosition(BarPosition.End)
+    .barMode(BarMode.Fixed)
+    .barOverlap(true)
+    .barHeight(56)
+    .barFloatingStyle({ barBottomMargin: 8, systemMaterial: new uiMaterial.ImmersiveMaterial({}) })
+    .scrollable(true)
+    .expandSafeArea([SafeAreaType.SYSTEM])
+    .onChange((index: number) => {
+      this.currentTab = index
+    })
+  }
+}
+
```

#### entry/src/main/ets/pages/ExplorePage.ets

- 状态：added
- before：`—`
- after：`9932f87dce464e0dbf46e871eb78e673e816f59d8e11c6aa43ed595694027901`

```diff
--- a/entry/src/main/ets/pages/ExplorePage.ets
+++ b/entry/src/main/ets/pages/ExplorePage.ets
@@ -1,1 +1,97 @@
+import { uiMaterial } from '@kit.ArkUI'
+import { ClassifyComponent } from '../components/ClassifyComponent'
+import { ListItemData, getListItems } from '../model/ListData'
+
+@ComponentV2
+struct ExplorePage {
+  @Local searchOpacity: number = 1
+  totalTitleHeight = 110
+  @Local titleHeight: number = this.totalTitleHeight
+  @Local scrollOffset: number = 0
+  @Local titleOffset: number = 0
+  listItems: Array<ListItemData> = getListItems()
+
+  @Builder
+  exploreTitleBar() {
+    Column() {
+      Row() {
+        Text('探索').fontSize(28).fontWeight(FontWeight.Bold).fontColor('#1A1A1A')
+        Blank()
+        Search({ placeholder: '探索探索' })
+          .searchButton('搜索')
+          .height(40)
+          .width(220)
+          .systemMaterial(new uiMaterial.ImmersiveMaterial({}))
+      }.expandSafeArea([SafeAreaType.SYSTEM])
+      .width('100%')
+      .opacity(this.searchOpacity)
+      .height(50)
+
+      ClassifyComponent()
+    }.expandSafeArea([SafeAreaType.SYSTEM])
+    .width('100%')
+    .height(this.titleHeight)
+    .padding({ left: 20, right: 20 })
+    .position({ x: 0, y: -this.titleOffset })
+  }
+
+  build() {
+    NavDestination() {
+      Scroll() {
+        // 滑动区域的具体内容
+        Column() {
+          Image($r('app.media.startIcon')).width('100%').height(180)
+            .borderRadius(12)
+            .backgroundColor('#e0e0e0')
+            .objectFit(ImageFit.Cover)
+
+          List() {
+            ForEach(this.listItems, (item: ListItemData) => {
+              ListItem() {
+                Row() {
+                  SymbolGlyph(item.image).fontSize(36)
+                    .fontColor(['#007dff'])
+                    .margin({ right: 16 })
+                  Text(item.name).fontSize(16)
+                    .fontColor('#333333')
+                }.width('100%')
+                .padding({ left: 20, right: 20, top: 14, bottom: 14 })
+              }
+            }, (item: ListItemData) => item.id.toString())
+          }
+        }
+      }
+      // 避让标题栏显示区域
+      .contentStartOffset(this.totalTitleHeight)
+      .scrollable(ScrollDirection.Vertical)
+      .scrollBar(BarState.Off)
+      .edgeEffect(EdgeEffect.Spring)
+      .width('100%')
+      .height('100%')
+      .onDidScroll((xOffset: number, yOffset: number, state: ScrollState) => {
+        this.scrollOffset += yOffset
+        // 搜索框大小范围内
+        if (this.scrollOffset <= 50) {
+          this.titleOffset = this.scrollOffset;
+          this.titleHeight = this.totalTitleHeight - this.titleOffset
+          this.searchOpacity = 1 - this.titleOffset / 50
+        }
+      })
+    }.title(
+      { builder: this.exploreTitleBar, height: this.titleHeight },
+      { barStyle: BarStyle.STACK,
+        // 设置标题栏模糊
+        scrollEffectOptions: {
+          scrollEffectType: ScrollEffectType.GRADUAL_BLUR
+        }
+      }
+    ).hideBackButton(true)
+    .expandSafeArea([SafeAreaType.SYSTEM])
+  }
+}
+
+@Builder
+export function ExplorePageBuilder() {
+  ExplorePage()
+}
 import { uiMaterial } from '@kit.ArkUI'
```

#### entry/src/main/ets/components/ClassifyComponent.ets

- 状态：added
- before：`—`
- after：`23a339c4a6b619c137faa77bec11dbc5b9fe1a8c8174b752111d4afc153231be`

```diff
--- a/entry/src/main/ets/components/ClassifyComponent.ets
+++ b/entry/src/main/ets/components/ClassifyComponent.ets
@@ -1,1 +1,40 @@
+import { ChipGroup, ChipGroupItemOptions, SymbolGlyphModifier, uiMaterial } from '@kit.ArkUI'
+
+@ComponentV2
+export struct ClassifyComponent {
+  @Local selectedIndexes: Array<number> = [0]
+  info: Array<ChipGroupItemOptions> = []
+
+  aboutToAppear(): void {
+    let classifyType: string[] = ['策略', '动作', '竞技', '射击', '卡牌', '体育', '休闲', '音乐']
+
+    for (let index: number = 0; index < classifyType.length; index++) {
+      this.info.push({
+        label: { text: classifyType[index] },
+        prefixSymbol: {
+          activated: new SymbolGlyphModifier($r('sys.symbol.star_fill')).fontSize(20).fontColor(['#d3d3d3']),
+          normal: new SymbolGlyphModifier($r('sys.symbol.star_fill')).fontSize(20).fontColor([Color.Black])
+        }
+      })
+    }
+  }
+
+  build() {
+    ChipGroup({
+      items: this.info,
+      itemStyle: {
+        backgroundColor: Color.Transparent,
+        selectedFontColor: '#d3d3d3'
+      },
+      backgroundSystemMaterial: new uiMaterial.ImmersiveMaterial({
+        colorInvert: true,
+        interactive: true
+      }),
+      selectedIndexes: this.selectedIndexes,
+      onChange: (activeIndexes: Array<number>) => {
+        this.selectedIndexes = activeIndexes
+      }
+    })
+  }
+}
 import { ChipGroup, ChipGroupItemOptions, SymbolGlyphModifier, uiMaterial } from '@kit.ArkUI'
```

#### entry/src/main/ets/model/ListData.ets

- 状态：added
- before：`—`
- after：`41e18a28c08a330055cdaa7f627df01087bc6147251ce51e4b036e65fc1955db`

```diff
--- a/entry/src/main/ets/model/ListData.ets
+++ b/entry/src/main/ets/model/ListData.ets
@@ -1,1 +1,23 @@
+export class ListItemData {
+  id: number = 0
+  name: string = ''
+  image: Resource | undefined = undefined
+}
+
+export function getListItems(): Array<ListItemData> {
+  let items: Array<ListItemData> = []
+  let names: string[] =
+    ['热门榜单', '精选推荐', '新品首发', '热门话题', '必看合集', '话题广场', '活动中心', '创作者中心']
+  let icons: Resource[] =
+    [$r('sys.symbol.compass'), $r('sys.symbol.gamecontroller'), $r('sys.symbol.grid'), $r('sys.symbol.gearshape'),
+      $r('sys.symbol.star_fill'), $r('sys.symbol.heart'), $r('sys.symbol.flame'), $r('sys.symbol.paperplane')]
+  for (let index = 0; index < names.length; index++) {
+    let item = new ListItemData()
+    item.id = index + 1
+    item.name = names[index]
+    item.image = icons[index]
+    items.push(item)
+  }
+  return items
+}
 export class ListItemData {
```

#### entry/src/main/resources/base/profile/route_map.json

- 状态：added
- before：`—`
- after：`7d26ebeaf00ba2a1b5add6d7fd4c7b06b2968dcecc99e5f0b7f2a5fcab6af682`

```diff
--- a/entry/src/main/resources/base/profile/route_map.json
+++ b/entry/src/main/resources/base/profile/route_map.json
@@ -1,1 +1,15 @@
+{
+  "routerMap": [
+    {
+      "buildFunction": "ExplorePageBuilder",
+      "name": "explore",
+      "pageSourceFile": "src/main/ets/pages/ExplorePage.ets"
+    },
+    {
+      "buildFunction": "GamePageBuilder",
+      "name": "game",
+      "pageSourceFile": "src/main/ets/pages/GamePage.ets"
+    }
+  ]
+}
 {
```

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\29194f56-fc1a-4913-94f8-02cc5c497f0d\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\29194f56-fc1a-4913-94f8-02cc5c497f0d\device-run.log
- EVID-006 [device_log] 导航步骤 swipe-up-collapse：向 up 滚动。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\29194f56-fc1a-4913-94f8-02cc5c497f0d\nav-swipe-up-collapse.log
- EVID-007 [device_log] 导航编排：passed
- EVID-008 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\images\df02bce79f97fbb353f8ef11b726a427321c5b33cb8226c50e2d672b56f2b4fb.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/df02bce79f97fbb353f8ef11b726a427321c5b33cb8226c50e2d672b56f2b4fb.png>)

- EVID-009 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\images\915720fde76903fe3a50f4cd0ac9e1571c6e2636cd922629fc5052c6e7c714fe.png

![判图引用的截图。](<evidence/images/915720fde76903fe3a50f4cd0ac9e1571c6e2636cd922629fc5052c6e7c714fe.png>)

- EVID-010 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\b78fdca0-8a74-450e-ab80-fda0d8c48c98\device-layout.json
- EVID-011 [visual_judgment] 用户查看设备截图（探索页）确认标题栏/搜索框/分类 Chips/底部页签呈现沉浸光感通透材质效果；组件树证实探索页结构完整（标题栏 Text(探索)+Search+搜索按钮、ChipGroup 分类（策略/动作/竞技…）、内容 List、底部 Tabs 探索/游戏页签）。


## 生成鸿蒙 demo：内容区标题栏开启沉浸光感页面（内容区标题吸顶迁入标题栏、分类独立组件）

- 判据策略：fresh，冻结于 2026-09-10T12:08:17.787Z

- 总结果：`passed`
- 能力：immersive-light
- 技术路线：arkui-api26

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-S014-C01：游戏页 onDidScroll 中按测得的阈值切换 showTitle，当内容区标题滑动到标题栏区域时将内容嵌入 NavDestination 标题栏显示。
  - 官网冻结来源：typical-scenes:179-179，片段 SHA-256：`9092b73deca54918ceaff7ea6fc40a2f2b84117955c396732e43214a6d283ac8`
- IL-S014-C02：提取内容区中小标题为独立组件 ClassifyComponent，标题栏与内容区复用同一组件。
  - 官网冻结来源：typical-scenes:182-182，片段 SHA-256：`54aad2e4b4c7cf39504351fd33530ac80d5bb99141e7cf98e7a8bf97289dc8ca`
- IL-S014-C03：gameTitleBar builder 内 showTitle 为 true 时渲染 ClassifyComponent，实现内容区标题切换到标题栏中显示。
  - 官网冻结来源：typical-scenes:222-222，片段 SHA-256：`bed4900d166c19eb3c4cce512366950348ede6d9b53c9d6adb97a0052e0d5245`
- IL-S014-C04：NavDestination onShown 中通过 getComponentUtils().getRectangleById('text') 与 ('content') 测量标题及内容区标题位置并 px2vp 换算阈值。
  - 官网冻结来源：typical-scenes:316-316，片段 SHA-256：`0e6036a9cb0661145976e25668cd2d07478ce5a78fb9aa2e7cb0f931a44f2311`
- IL-S014-C05：内容区 ClassifyComponent 以 visibility(this.showTitle ? Visibility.Hidden : Visibility.Visible) 避免迁入期间重复显示，回滑恢复。
  - 官网冻结来源：typical-scenes:277-277，片段 SHA-256：`0b90229646fc089ce62ed3a2bc628299635cb5d9b928cbeb6a99806f7682ee43`
- IL-S014-C06：ClassifyComponent 内 selectedIndexes 状态经 onChange 更新，迁入标题栏后复用同一组件保留选择状态。
  - 官网冻结来源：typical-scenes:214-214，片段 SHA-256：`06a361db109f5a1a59b30568e4427f6d8922c23d2770e49f0e68658c0191f4c0`
- IL-S014-C07：按钮选择类组件 ChipGroup、Button 分别以组件级入口设置材质；其余组件不在标题栏外设置沉浸光感。
  - 官网冻结来源：constraints:13-13，片段 SHA-256：`2e72b72d7214956e79a13bc19c729e2c87f7676c872fc1c5ef610d1b3244d776`
- IL-S014-C08：标题栏 Row 容器不设置 systemMaterial，Button 与 ChipGroup 分别以组件级入口设置，避免同一子树材质嵌套。
  - 官网冻结来源：constraints:60-60，片段 SHA-256：`56c8194ba8f769340a9f9dfabc0174247711dbdb6f80c2e1a3dba308321dbba1`
- IL-S014-C09：根目录 build-profile.json5 目标 product 设置 targetSdkVersion 为 26.0.0；demo 无低版本兼容要求，compatibleSdkVersion 同为 26.0.0。
  - 官网冻结来源：enable:5-5，片段 SHA-256：`bb77936c5abd341381d20e9e89d8fa3bc80e3bcc45fac07f5dc581c7012a808e`
- IL-S014-C10：NavDestination 标题栏 options 设置 barStyle STACK 与 scrollEffectOptions 的 GRADUAL_BLUR 标题栏模糊。
  - 官网冻结来源：typical-scenes:168-168，片段 SHA-256：`649e0cd368c620ae9c82e2ecab0205a7c77e3c2272cd2d1bde78b4cd65d84726`

#### T01 · 已实施

build-profile.json5 目标 product 调整 targetSdkVersion 与 compatibleSdkVersion 为 26.0.0

- 位置：`build-profile.json5:5-12`（修改前；已对应 diff）
- 位置：`build-profile.json5:5-12`（修改后；已对应 diff）
- 判据依据（fresh）：开启沉浸光感要求 targetSDKVersion 不低于 26.0.0
  - IL-S014-C09：开启沉浸光感要确保应用的 targetSDKVersion 不低于 26.0.0。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：不低于26.0.0 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`

#### T02 · 部分实施

module.json5 添加 routerMap 引用以启用系统路由表

- 位置：`entry/src/main/module.json5:10-15`（修改前；未确认变更）
- 位置：`entry/src/main/module.json5:10-16`（修改后；已对应 diff）
- 判据依据（fresh）：游戏页 NavDestination 需要路由可达
  - IL-S014-C01：针对内容区滑动且内容区存在多层标题的场景，当内容区的标题滑动到标题栏区域时，可将对应的内容嵌入标题栏中显示，实现内容区标题在 NavDestination 标题栏区域的展示，从而提升用户交互体验。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：当内容区的标题滑动到标题栏区域时，可将对应的内容嵌入标题栏中显示 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 工程配套选择：Navigation(name) 需要系统路由表解析目标页
- 待确认：entry/src/main/module.json5:10-15 无可对应的基线差异，实施情况待确认。

#### T03 · 已实施

新增 route_map.json 注册 game 路由与构建函数

- 位置：`entry/src/main/resources/base/profile/route_map.json:1-14`（修改后；已对应 diff）
- 判据依据（fresh）：为游戏页 NavDestination 提供路由可达性
  - IL-S014-C01：针对内容区滑动且内容区存在多层标题的场景，当内容区的标题滑动到标题栏区域时，可将对应的内容嵌入标题栏中显示，实现内容区标题在 NavDestination 标题栏区域的展示，从而提升用户交互体验。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：当内容区的标题滑动到标题栏区域时，可将对应的内容嵌入标题栏中显示 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 工程配套选择：系统路由表 JSON 为工程落地必需

#### T04 · 已实施

新增 ListData.ets 提供示例引用的 ListItemData 与 listItems 数据

- 位置：`entry/src/main/ets/model/ListData.ets:1-22`（修改后；已对应 diff）
- 判据依据（fresh）：滚动测量与迁入联动需要列表内容填充页面
  - IL-S014-C04：示例在 onShown 时通过 getComponentUtils().getRectangleById 测量标题与内容区标题位置，统一换算为 vp 后确定迁入阈值。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：getRectangleById('text') · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 工程配套选择：示例引用 listItems 常量但未给出定义

#### T05 · 已实施

Index.ets 实现底部 Tabs 悬浮主页：游戏页签承载 Navigation(game)

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-66`（修改后；已对应 diff）
- 判据依据（fresh）：底部 Tabs 悬浮沉浸光感符合生效区域约束，按钮选择类组件在页面内全部区域生效
  - IL-S014-C07：沉浸光感开启后，弹窗类组件与按钮、选择类组件可在页面内全部区域生效；其他组件仅在 Navigation/NavDestination 标题栏或横向 Tab 中 barPosition 为 BarPosition.End 的底部 TabBar 中生效。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：以及按钮与选择类组件（Slider、Toggle、Select）可在页面内全部区域生效 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 工程配套选择：主页承载两个典型场景页签

#### T06 · 已实施

新增 ClassifyComponent.ets 内容区小标题独立组件（ChipGroup + backgroundSystemMaterial + selectedIndexes）

- 位置：`entry/src/main/ets/components/ClassifyComponent.ets:1-39`（修改后；已对应 diff）
- 判据依据（fresh）：提取内容区中小标题为独立组件
  - IL-S014-C02：提取内容区中小标题为独立组件。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：提取内容区中小标题为独立组件 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：selectedIndexes 与 onChange 维护选择状态
  - IL-S014-C06：独立组件通过 selectedIndexes 与 onChange 维护内部选择状态，迁入切换时保留选择状态。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：this.selectedIndexes = activeIndexes · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：仅叶子组件设置材质，避免同一子树嵌套
  - IL-S014-C08：材质嵌套使用会导致效果被重复计算，既增加功耗，视觉上又相互干扰；同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`

#### T07 · 已实施

新增 GamePage.ets 内容区标题栏页面（onShown 测量、迁入切换、Hidden/Visible、STACK+GRADUAL_BLUR）

- 位置：`entry/src/main/ets/pages/GamePage.ets:1-114`（修改后；已对应 diff）
- 判据依据（fresh）：滚动到标题栏区域时嵌入标题栏显示
  - IL-S014-C01：针对内容区滑动且内容区存在多层标题的场景，当内容区的标题滑动到标题栏区域时，可将对应的内容嵌入标题栏中显示，实现内容区标题在 NavDestination 标题栏区域的展示，从而提升用户交互体验。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：当内容区的标题滑动到标题栏区域时，可将对应的内容嵌入标题栏中显示 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：showTitle 切换标题栏渲染 ClassifyComponent
  - IL-S014-C03：滑动内容区，当内容区标题滑动到标题栏区域时，将其切换到标题栏中显示。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：滑动内容区，当内容区标题滑动到标题栏区域时，将其切换到标题栏中显示 · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：onShown 测量标题与内容位置确定阈值
  - IL-S014-C04：示例在 onShown 时通过 getComponentUtils().getRectangleById 测量标题与内容区标题位置，统一换算为 vp 后确定迁入阈值。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：getRectangleById('text') · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：内容区标题 Hidden/Visible 切换
  - IL-S014-C05：内容区标题迁入标题栏显示时，原内容区位置标题设为 Hidden 避免重复显示，回滑后恢复 Visible。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：visibility(this.showTitle ? Visibility.Hidden : Visibility.Visible) · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`
- 判据依据（fresh）：STACK 与 GRADUAL_BLUR 标题栏配置
  - IL-S014-C10：NavDestination 标题栏配置 STACK barStyle 与 scrollEffectOptions 的 GRADUAL_BLUR 标题栏模糊。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：scrollEffectType: ScrollEffectType.GRADUAL_BLUR · SHA-256：`3a2968bba3e9d8a7b683571ce894df791b21b1b79135aecd2625d8402685fc7a`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 导航编排通过（tap 游戏页签成功、expectPage=游戏 命中）；组件树证实游戏页标题栏（Text(游戏)+Button）、内容区 ClassifyComponent（ChipGroup 策略/动作/竞技…）与 List 就位，ClassifyComponent 独立组件在探索页与游戏页两处复用，与判据 IL-S014-C02/C07/C08 的结构预期一致。 |
| visual | 是 | passed | 模型判图：用户查看设备截图（游戏页）确认标题栏/分类 Chips 呈现沉浸光感通透材质效果；组件树证实游戏页结构完整（标题栏 Text(游戏)+AI 搜索按钮、内容区 ChipGroup 分类、内容 List、底部 Tabs）。 |

### 代码变化

#### build-profile.json5

- 状态：modified
- before：`12b986eeb2ae25ba52e34e23e5a0d1079fa1bce32216e64baf7164283077b56b`
- after：`810fc1e7293f5581220f36bc2383ed91a426f7697262b758d8e21ba3cce217bf`

```diff
--- a/build-profile.json5
+++ b/build-profile.json5
@@ -5,8 +5,8 @@
       {
         "name": "default",
         "signingConfig": "default",
-        "targetSdkVersion": "6.0.1(21)",
-        "compatibleSdkVersion": "6.0.1(21)",
+        "targetSdkVersion": "26.0.0",
+        "compatibleSdkVersion": "26.0.0",
         "runtimeOS": "HarmonyOS",
         "buildOption": {
           "strictMode": {
```

#### entry/src/main/module.json5

- 状态：modified
- before：`95045053098ced28f3f807767014815b5a26b0203f16de619b0c66eca93c42dc`
- after：`dab8ecfc034663224010a5f3a7ae076492011afb0f31719277230f7f4ccc852b`

```diff
--- a/entry/src/main/module.json5
+++ b/entry/src/main/module.json5
@@ -10,6 +10,7 @@
     "deliveryWithInstall": true,
     "installationFree": false,
     "pages": "$profile:main_pages",
+    "routerMap": "$profile:route_map",
     "routerMap": "$profile:route_map",
     "abilities": [
       {
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`5a84450f9b41371c5431e8d75c47b047cc8377da0062041c771d40618a392d06`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,66 @@
-@Entry
-@Component
-struct Index {
-  @State message: string = 'Hello World';
-
-  build() {
-    RelativeContainer() {
-      Text(this.message)
-        .id('HelloWorld')
-        .fontSize($r('app.float.page_text_font_size'))
-        .fontWeight(FontWeight.Bold)
-        .alignRules({
-          center: { anchor: '__container__', align: VerticalAlign.Center },
-          middle: { anchor: '__container__', align: HorizontalAlign.Center }
-        })
-        .onClick(() => {
-          this.message = 'Welcome';
-        })
-    }
-    .height('100%')
-    .width('100%')
-  }
-}
+import { uiMaterial } from '@kit.ArkUI'
+
+@Entry
+@ComponentV2
+struct BestPractise {
+  @Local currentTab: number = 0
+  exploreStack: NavPathStack = new NavPathStack()
+  gameStack: NavPathStack = new NavPathStack()
+
+  @Builder
+  BottomTabBarItem(title: string, icon: Resource, index: number) {
+    Column() {
+      SymbolGlyph(icon)
+        .fontSize(22)
+        .fontColor(this.currentTab === index ? ['#007dff'] : ['#999999'])
+      Text(title)
+        .fontSize(10)
+        .fontColor(this.currentTab === index ? '#007dff' : '#999999')
+        .margin({ top: 2 })
+    }.justifyContent(FlexAlign.Center)
+    .width('100%')
+    .height('100%')
+  }
+
+  @Builder
+  tabExploreContent() {
+    // 通过系统路由表的方式配置对应的页面跳转
+    Navigation(this.exploreStack, { name: 'explore' })
+      .hideTitleBar(true)
+      .expandSafeArea([SafeAreaType.SYSTEM])
+  }
+
+  @Builder
+  tabGameContent() {
+    // 通过系统路由表的方式配置对应的页面跳转
+    Navigation(this.gameStack, { name: 'game' })
+      .hideTitleBar(true)
+      .expandSafeArea([SafeAreaType.SYSTEM])
+  }
+
+  build() {
+    Tabs({ index: this.currentTab }) {
+      TabContent() {
+        this.tabExploreContent()
+      }.tabBar(this.BottomTabBarItem('探索', $r('sys.symbol.compass'), 0))
+      // 内容区延伸到状态栏区域，形成整体的交互体验
+      .expandSafeArea([SafeAreaType.SYSTEM])
+
+      TabContent() {
+        this.tabGameContent()
+      }.tabBar(this.BottomTabBarItem('游戏', $r('sys.symbol.gamecontroller'), 1))
+      .expandSafeArea([SafeAreaType.SYSTEM])
+    }
+    .barPosition(BarPosition.End)
+    .barMode(BarMode.Fixed)
+    .barOverlap(true)
+    .barHeight(56)
+    .barFloatingStyle({ barBottomMargin: 8, systemMaterial: new uiMaterial.ImmersiveMaterial({}) })
+    .scrollable(true)
+    .expandSafeArea([SafeAreaType.SYSTEM])
+    .onChange((index: number) => {
+      this.currentTab = index
+    })
+  }
+}
+
```

#### entry/src/main/ets/pages/GamePage.ets

- 状态：added
- before：`—`
- after：`3c58c69fd255d416ff35c4873371b0998a66061ed489a7f28ae0558136d19755`

```diff
--- a/entry/src/main/ets/pages/GamePage.ets
+++ b/entry/src/main/ets/pages/GamePage.ets
@@ -1,1 +1,115 @@
+import { uiMaterial } from '@kit.ArkUI'
+import { ClassifyComponent } from '../components/ClassifyComponent'
+import { ListItemData, getListItems } from '../model/ListData'
+
+@ComponentV2
+struct GamePage {
+  @Local titleHeight: number = 60
+  @Local showTitle: boolean = false
+  @Local titleOpacity: number = 1
+  @Local contentOffset: number = 0
+  totalOffset: number = 0
+  titleEnd: number = 0
+  titleStart: number = 0
+  @Local listVisible: Visibility = Visibility.Visible
+  listItems: Array<ListItemData> = getListItems()
+
+  @Builder
+  gameTitleBar() {
+    Row() {
+      if (this.showTitle) {
+        ClassifyComponent()
+      } else {
+        Text('游戏')
+          .fontSize(28)
+          .fontWeight(FontWeight.Bold)
+          .fontColor('#1A1A1A')
+          .opacity(this.titleOpacity)
+          .id('text')
+        Blank()
+      }
+      Button() {
+        SymbolGlyph($r('sys.symbol.AI_search')).fontSize(20)
+      }.borderRadius(180).width(40).height(40)
+      .backgroundColor(Color.Transparent)
+      .systemMaterial(new uiMaterial.ImmersiveMaterial({
+          lightEffect: { color: Color.White },
+          materialColor: '#d3d3d3'
+        }))
+    }.expandSafeArea([SafeAreaType.SYSTEM])
+    .width('100%')
+    .height('100%')
+    .padding({ left: 20, right: 20 })
+    .alignItems(VerticalAlign.Center)
+  }
+
+  build() {
+    NavDestination() {
+      Scroll() {
+        Column() {
+          Image($r('app.media.startIcon'))
+            .width('100%')
+            .height(180)
+            .borderRadius(12)
+            .backgroundColor('#fff3e0')
+            .objectFit(ImageFit.Cover)
+          ClassifyComponent().id('content').visibility(this.showTitle ? Visibility.Hidden : Visibility.Visible)
+          List() {
+            ForEach(this.listItems, (item: ListItemData) => {
+              ListItem() {
+                Row() {
+                  SymbolGlyph(item.image).fontSize(36).fontColor(['#ff6d00']).margin({ right: 16 })
+                  Text(item.name).fontSize(16).fontColor('#333333')
+                }.width('100%')
+                .padding({ left: 20, right: 20, top: 14, bottom: 14 })
+              }
+            }, (item: ListItemData) => item.id.toString())
+          }.width('100%')
+          .margin({ top: 8 })
+          .nestedScroll({ scrollForward: NestedScrollMode.PARENT_FIRST, scrollBackward: NestedScrollMode.SELF_FIRST })
+          .divider({ strokeWidth: 5, color: '#e0e0e0', startMargin: 72, endMargin: 20 })
+        }.padding({ left: 16, right: 16, top: 8, bottom: 16 })
+      }
+      .contentStartOffset(this.titleHeight)
+      .scrollable(ScrollDirection.Vertical)
+      .scrollBar(BarState.Off)
+      .edgeEffect(EdgeEffect.Spring)
+      .width('100%')
+      .height('100%')
+      .onDidScroll((xOffset: number, yOffset: number) => {
+        this.totalOffset += yOffset
+        let curOffset = this.contentOffset - this.totalOffset
+        if (curOffset > this.titleEnd) {
+          this.showTitle = false;
+          this.listVisible = Visibility.Hidden
+          return
+        }
+        if (curOffset < this.titleEnd) {
+          this.showTitle = true;
+          this.listVisible = Visibility.Visible
+          return
+        }
+        this.titleHeight = (curOffset - this.titleEnd) / (this.titleHeight - this.titleEnd)
+      })
+    }.onShown(() => {
+      let titleInfo = this.getUIContext().getComponentUtils().getRectangleById('text');
+      this.titleStart = this.getUIContext().px2vp(titleInfo.windowOffset.y)
+      this.titleEnd = this.getUIContext().px2vp(titleInfo.size.height)
+      this.contentOffset = this.getUIContext().px2vp(this.getUIContext().getComponentUtils().getRectangleById('content').windowOffset.y)
+    })
+    .expandSafeArea([SafeAreaType.SYSTEM])
+    .hideBackButton(true)
+    .title({ builder: this.gameTitleBar, height: this.titleHeight }, {
+      barStyle: BarStyle.STACK,
+      scrollEffectOptions: {
+        scrollEffectType: ScrollEffectType.GRADUAL_BLUR
+      }
+    })
+  }
+}
+
+@Builder
+export function GamePageBuilder() {
+  GamePage()
+}
 import { uiMaterial } from '@kit.ArkUI'
```

#### entry/src/main/ets/components/ClassifyComponent.ets

- 状态：added
- before：`—`
- after：`23a339c4a6b619c137faa77bec11dbc5b9fe1a8c8174b752111d4afc153231be`

```diff
--- a/entry/src/main/ets/components/ClassifyComponent.ets
+++ b/entry/src/main/ets/components/ClassifyComponent.ets
@@ -1,1 +1,40 @@
+import { ChipGroup, ChipGroupItemOptions, SymbolGlyphModifier, uiMaterial } from '@kit.ArkUI'
+
+@ComponentV2
+export struct ClassifyComponent {
+  @Local selectedIndexes: Array<number> = [0]
+  info: Array<ChipGroupItemOptions> = []
+
+  aboutToAppear(): void {
+    let classifyType: string[] = ['策略', '动作', '竞技', '射击', '卡牌', '体育', '休闲', '音乐']
+
+    for (let index: number = 0; index < classifyType.length; index++) {
+      this.info.push({
+        label: { text: classifyType[index] },
+        prefixSymbol: {
+          activated: new SymbolGlyphModifier($r('sys.symbol.star_fill')).fontSize(20).fontColor(['#d3d3d3']),
+          normal: new SymbolGlyphModifier($r('sys.symbol.star_fill')).fontSize(20).fontColor([Color.Black])
+        }
+      })
+    }
+  }
+
+  build() {
+    ChipGroup({
+      items: this.info,
+      itemStyle: {
+        backgroundColor: Color.Transparent,
+        selectedFontColor: '#d3d3d3'
+      },
+      backgroundSystemMaterial: new uiMaterial.ImmersiveMaterial({
+        colorInvert: true,
+        interactive: true
+      }),
+      selectedIndexes: this.selectedIndexes,
+      onChange: (activeIndexes: Array<number>) => {
+        this.selectedIndexes = activeIndexes
+      }
+    })
+  }
+}
 import { ChipGroup, ChipGroupItemOptions, SymbolGlyphModifier, uiMaterial } from '@kit.ArkUI'
```

#### entry/src/main/ets/model/ListData.ets

- 状态：added
- before：`—`
- after：`41e18a28c08a330055cdaa7f627df01087bc6147251ce51e4b036e65fc1955db`

```diff
--- a/entry/src/main/ets/model/ListData.ets
+++ b/entry/src/main/ets/model/ListData.ets
@@ -1,1 +1,23 @@
+export class ListItemData {
+  id: number = 0
+  name: string = ''
+  image: Resource | undefined = undefined
+}
+
+export function getListItems(): Array<ListItemData> {
+  let items: Array<ListItemData> = []
+  let names: string[] =
+    ['热门榜单', '精选推荐', '新品首发', '热门话题', '必看合集', '话题广场', '活动中心', '创作者中心']
+  let icons: Resource[] =
+    [$r('sys.symbol.compass'), $r('sys.symbol.gamecontroller'), $r('sys.symbol.grid'), $r('sys.symbol.gearshape'),
+      $r('sys.symbol.star_fill'), $r('sys.symbol.heart'), $r('sys.symbol.flame'), $r('sys.symbol.paperplane')]
+  for (let index = 0; index < names.length; index++) {
+    let item = new ListItemData()
+    item.id = index + 1
+    item.name = names[index]
+    item.image = icons[index]
+    items.push(item)
+  }
+  return items
+}
 export class ListItemData {
```

#### entry/src/main/resources/base/profile/route_map.json

- 状态：added
- before：`—`
- after：`7d26ebeaf00ba2a1b5add6d7fd4c7b06b2968dcecc99e5f0b7f2a5fcab6af682`

```diff
--- a/entry/src/main/resources/base/profile/route_map.json
+++ b/entry/src/main/resources/base/profile/route_map.json
@@ -1,1 +1,15 @@
+{
+  "routerMap": [
+    {
+      "buildFunction": "ExplorePageBuilder",
+      "name": "explore",
+      "pageSourceFile": "src/main/ets/pages/ExplorePage.ets"
+    },
+    {
+      "buildFunction": "GamePageBuilder",
+      "name": "game",
+      "pageSourceFile": "src/main/ets/pages/GamePage.ets"
+    }
+  ]
+}
 {
```

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\5d62c760-b26d-41fa-867f-885acdc72041\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\5d62c760-b26d-41fa-867f-885acdc72041\device-run.log
- EVID-006 [device_log] 导航步骤 tap-game-tab：按 text=游戏 中心坐标点击。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\5d62c760-b26d-41fa-867f-885acdc72041\nav-tap-game-tab.log
- EVID-007 [device_log] 导航步骤 swipe-up-migrate：向 up 滚动。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\5d62c760-b26d-41fa-867f-885acdc72041\nav-swipe-up-migrate.log
- EVID-008 [device_log] 导航编排：passed
- EVID-009 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\images\e4343305d7ed83ae1303d5b8b3c4f17b632ebad843539abd74a9b38674afa3ba.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/e4343305d7ed83ae1303d5b8b3c4f17b632ebad843539abd74a9b38674afa3ba.png>)

- EVID-010 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\images\69bd20e5e883a5650645be96df45924fd1018d7e9616b7e486de2d50075f2bbd.png

![判图引用的截图。](<evidence/images/69bd20e5e883a5650645be96df45924fd1018d7e9616b7e486de2d50075f2bbd.png>)

- EVID-011 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\6\ohos-feature-engineering\evidence\c795d660-dccd-4001-94a3-d6902c5b5257\device-layout.json
- EVID-012 [visual_judgment] 用户查看设备截图（游戏页）确认标题栏/分类 Chips 呈现沉浸光感通透材质效果；组件树证实游戏页结构完整（标题栏 Text(游戏)+AI 搜索按钮、内容区 ChipGroup 分类、内容 List、底部 Tabs）。
