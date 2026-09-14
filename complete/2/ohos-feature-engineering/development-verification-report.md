# 代码开发验证报告

- 工程：D:\HW\testproject\complete\2
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 生成鸿蒙demo：实现即时反馈Toast、气泡提示Popup/Tips、菜单Menu、弹出框Dialog的沉浸光感效果 | arkui-api26 | inconclusive |

## 生成鸿蒙demo：实现即时反馈Toast、气泡提示Popup/Tips、菜单Menu、弹出框Dialog的沉浸光感效果

- 判据策略：fresh，冻结于 2026-09-10T06:25:02.644Z

- 总结果：`inconclusive`
- 能力：immersive-light
- 技术路线：arkui-api26

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-C001：Toast 通过 getUIContext().getPromptAction().showToast 的 ShowToastOptions.systemMaterial 设置 THICK 材质
  - 官网冻结来源：component:61-71，片段 SHA-256：`4b2d279fa7ff8d8b36e95d91a827b4f97692e712c895bdd5cbbf9071b3f18af4`
- IL-C002：气泡通过 bindPopup 的 PopupOptions.systemMaterial、悬浮提示通过 bindTips 的 TipsOptions.systemMaterial 显式设置（应用级 ENABLE 下不默认开启）
  - 官网冻结来源：component:73-81，片段 SHA-256：`3c2fa9f75bcefa243eb8b57a9f4c0c27db5229f317656190edf77b043ef6fad7`
- IL-C003：菜单通过 bindContextMenu 的 ContextMenuOptions.systemMaterial 设置 THICK 材质
  - 官网冻结来源：component:83-91，片段 SHA-256：`8b69d2695a2ca207484ff29ddc0f727318fb8d07103ff8a84fca833bdb83fa64`
- IL-C004：弹出框分别通过 AlertDialog.show、CustomDialogController、ActionSheet.show 的 options.systemMaterial 与 bindSheet 的 SheetOptions.systemMaterial 设置 ULTRA_THICK 材质
  - 官网冻结来源：component:93-109，片段 SHA-256：`69a1e564622edba56339f448d6f472ef14f0250c503eb23b231742b36467dbb5`
- IL-C005：Toast 的 ShowToastOptions 中不设置 backgroundBlurStyle 与 backgroundColor，避免覆盖材质
  - 官网冻结来源：component:61-71，片段 SHA-256：`4b2d279fa7ff8d8b36e95d91a827b4f97692e712c895bdd5cbbf9071b3f18af4`
- IL-C006：各弹出框 options 中不设置自定义背景色与背景模糊属性
  - 官网冻结来源：component:93-109，片段 SHA-256：`69a1e564622edba56339f448d6f472ef14f0250c503eb23b231742b36467dbb5`
- IL-C007：CustomDialog 内容区保持约 328x216 的合理尺寸，不接近全屏
  - 官网冻结来源：component:93-109，片段 SHA-256：`69a1e564622edba56339f448d6f472ef14f0250c503eb23b231742b36467dbb5`
- IL-C008：弹窗不设置背景色、模糊参数和阴影参数；demo 采用应用级 ENABLE 并对全部弹窗显式设置 systemMaterial
  - 官网冻结来源：faq:330-346，片段 SHA-256：`dfa2dbed81c239f454cf06a5896adde69cb71883be897a6f32ecd2d4fa5781cb`
- IL-C009：演示弹窗（ActionSheet）设置半透明 materialColor（如 'rgba(64,128,255,0.2)'），保留透明度不遮挡材质滤镜
  - 官网冻结来源：common:79-85，片段 SHA-256：`3af78d0f6db5737bf7e5ed7461d364609d422f277e94f1c441d29305fc934f7b`
- IL-C010：材质只用于弹窗浮层本身，页面内容区不使用通用属性 systemMaterial，控制材质面积
  - 官网冻结来源：constraints:7-16，片段 SHA-256：`d4b05261b270d17bbca2240dd4181163c667452947846a5ed8e61723cc2b7579`
- IL-C011：全部弹窗（Dialog/Menu/Sheet）保持常规尺寸，避免接近全屏的超大面积
  - 官网冻结来源：constraints:110-112，片段 SHA-256：`629544a2ba49095f663cc26c07b1d34c15ec7c1a0d50a9e3b3f7ee52cfb636a4`
- IL-C012：不引入 CalendarPicker，避免为其拉起的弹出框强行配置材质入口
  - 官网冻结来源：component:105-105，片段 SHA-256：`070f1420f8d0cfdb4c0f7aac894ceeb3aa067a9d8096a0423b5c45dfad23f492`
- IL-C013：不引入各类 PickerDialog，其材质入口与 CustomDialog 相同的结论仅作知识保留
  - 官网冻结来源：component:107-107，片段 SHA-256：`760573ded3afae3ba05232978d54467533da6c542ac7f6f2ce368af55c466073`
- IL-C014：build-profile.json5 目标 product 的 targetSdkVersion 与 compatibleSdkVersion 均改为 26.0.0
  - 官网冻结来源：overview:1-5，片段 SHA-256：`70419834f601e5532260baea32e2f39142601960a3425819633e2a3ceae8a978`
- IL-C015：entry 模块 module.json5 添加 metadata name=ohos.arkui.UIMaterial.state value=enable
  - 官网冻结来源：enable:54-71，片段 SHA-256：`490b6dbd6f0aea0efe01bff879a52381ce1dc441bb8c2532dbd5936015854752`
- IL-C016：demo 页面在普通内容区直接触发四类弹窗，不依赖 Navigation 标题栏或 TabBar 区域
  - 官网冻结来源：enable:8-10，片段 SHA-256：`5dcf28a88ed6b709b9062d9d6b5a7832de64263e276d38ba02b8b3bacaa658bf`
- IL-C017：材质对象通过 new uiMaterial.ImmersiveMaterial({ style }) 构造后传入各弹窗 options 的 systemMaterial 字段
  - 官网冻结来源：ui-material-api:27-62，片段 SHA-256：`c89217eace03923fb35ab458a6672a45c16f37e71c494f28471043eae5c76281`
- IL-C018：Toast/Popup/Tips/Menu 使用 THICK，Dialog 系（AlertDialog/CustomDialog/ActionSheet/Sheet）使用 ULTRA_THICK
  - 官网冻结来源：ui-material-api:257-315，片段 SHA-256：`fde4ed94f69f1db27bc49a1eae9a8888747bf573bc194a3be722b115c1b39d32`
- IL-C019：demo 只开启材质，不实现关闭材质的交互入口
  - 官网冻结来源：enable:91-91，片段 SHA-256：`f1c0a5b901eeaf95fe189e589805737f4f36f6206fe1f088b49619ebf0483820`

#### S01 · 已实施

升级 build-profile.json5 的 targetSdkVersion/compatibleSdkVersion 至 26.0.0

- 位置：`build-profile.json5:8-9`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-9`（修改后；已对应 diff）
- 判据依据（fresh）：沉浸光感自 API 26.0.0 起提供
  - IL-C014：ArkUI 沉浸光感从 API 版本 26.0.0 开始提供，demo 工程 targetSdkVersion 不得低于 26.0.0。
    - [沉浸光感简介](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-overview) · 锚点：从API版本26.0.0开始，ArkUI新增沉浸光感 · SHA-256：`5cb544a28aff013ce7ac3f2337c1c094a1a829f62913460015c590321b068201`

#### S02 · 已实施

module.json5 添加 ohos.arkui.UIMaterial.state=enable 应用级开关

- 位置：`entry/src/main/module.json5:12-17`（修改后；已对应 diff）
- 判据依据（fresh）：entry 模块 metadata 配置应用级开启
  - IL-C015：应用级开关通过 entry 模块 module.json5 中 metadata 的 name 字段 ohos.arkui.UIMaterial.state 配置，value 为 default、enable 或 disable；该配置仅在 entry 类型的 module 中生效。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：ohos.arkui.UIMaterial.state · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`

#### S03 · 已实施

重写 Index.ets：渐变背景 + 四类弹窗演示（Toast/Popup/Tips/Menu/AlertDialog/CustomDialog/ActionSheet/bindSheet），各 options 显式设置 systemMaterial

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-312`（修改后；已对应 diff）
- 判据依据（fresh）：ShowToastOptions.systemMaterial
  - IL-C001：Toast 支持通过 ShowToastOptions 中的 systemMaterial 字段设置沉浸光感效果；应用级 ENABLE 模式下 Toast 默认开启沉浸光感，材质样式默认取值为 THICK。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：组件级开启：Toast支持通过 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：PopupOptions/TipsOptions.systemMaterial 显式设置
  - IL-C002：气泡提示中，气泡通过 PopupOptions 中的 systemMaterial 字段设置沉浸光感效果，悬浮提示通过 TipsOptions 中的 systemMaterial 字段设置；应用级 ENABLE 模式下气泡提示不会默认开启沉浸光感，需组件级显式设置。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：气泡支持通过 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：ContextMenuOptions.systemMaterial
  - IL-C003：菜单通过 ContextMenuOptions 中的 systemMaterial 字段设置沉浸光感效果；应用级 ENABLE 模式下菜单默认开启沉浸光感，材质样式默认取值为 THICK。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：组件级开启：菜单支持通过 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：弹出框各 options.systemMaterial
  - IL-C004：弹出框通过 options 参数中的 systemMaterial 字段设置沉浸光感效果（如 CustomDialogControllerOptions、AlertDialogParam、ActionSheetOptions、SheetOptions 等）；应用级 ENABLE 模式下弹出框默认开启沉浸光感，材质样式默认取值为 ULTRA_THICK。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：弹出框支持通过弹出框options参数中的systemMaterial字段设置沉浸光感效果 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：弹窗在页面内全部区域生效
  - IL-C016：弹窗类组件和弹窗类接口（PromptAction、Popup 控制、Tips 控制、菜单控制、半模态转场等）可在页面内全部区域生效，不限于 Navigation 标题栏或底部 TabBar。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：可在页面内全部区域生效 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`
- 判据依据（fresh）：ImmersiveMaterial 构造
  - IL-C017：组件级材质对象通过 new uiMaterial.ImmersiveMaterial(options) 构造，options 类型为 ImmersiveOptions，默认值 {style: ImmersiveStyle.REGULAR, materialColor: undefined, colorInvert: false, applyShadow: true, interactive: false, lightEffect: undefined}。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：constructor(options?: ImmersiveOptions) · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：THICK/ULTRA_THICK 样式选择
  - IL-C018：ImmersiveStyle 提供 ULTRA_THIN、THIN、REGULAR、THICK、ULTRA_THICK 五种样式；弹窗类组件通常使用较厚的材质样式（THICK 或 ULTRA_THICK）以获得更强的背景模糊效果；需要强调层次感或遮挡背景的场景建议使用 THICK 或 ULTRA_THICK 样式。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：建议使用THICK或ULTRA_THICK样式 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 工程配套选择：判据来源为本次冻结快照，deprecation 提示不构成契约变更

#### S04 · 已实施

弹窗 options 不设置 backgroundColor/backgroundBlurStyle/shadow；ActionSheet 演示半透明 materialColor；CustomDialog 保持 328x216；showToast 增加异常处理

- 位置：`entry/src/main/ets/pages/Index.ets:58-68`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:71-83`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:109-138`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:274-284`（修改后；已对应 diff）
- 判据依据（fresh）：Toast 不设背景/模糊
  - IL-C005：沉浸光感开启后，如果 Toast 已主动设置 ShowToastOptions 中的 backgroundBlurStyle 或 backgroundColor，则不呈现沉浸光感效果；否则 ImmersiveStyle 默认取值为 THICK。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：中的backgroundBlurStyle或backgroundColor，则不呈现沉浸光感效果 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：弹出框不设自定义背景/模糊
  - IL-C006：弹出框沉浸光感开启后，如果已主动设置背景色、背景模糊等自定义样式属性，则不呈现沉浸光感效果，否则 ImmersiveStyle 默认取值为 ULTRA_THICK。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：如果已主动设置背景色、背景模糊等自定义样式属性 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：背景/模糊/阴影导致材质不呈现
  - IL-C008：DEFAULT 模式下 Dialog、Toast、AlphabetIndexer 等组件仅在未设置背景色、模糊参数和阴影参数时才会默认开启沉浸式系统材质；如需在保留这些属性的同时使用材质，应通过 systemMaterial 主动设置。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：仅在未设置背景色、模糊参数和阴影参数时才会默认开启沉浸式系统材质 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：materialColor 半透明
  - IL-C009：materialColor 需要带有一定的透明度，传入纯不透明颜色（如 Color.Red 或 '#FFFF0000'）会遮挡材质滤镜效果。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：会遮挡材质滤镜效果 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：限制材质使用面积
  - IL-C010：沉浸式系统材质影响区域越大功耗越高，应避免在单个超大尺寸区域上使用，也应避免在大量小区域上重复使用，优先限定在需要凸显的局部区域中。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：推荐在Navigation顶部标题栏和底部Tabs区域中少量使用 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：控制弹窗尺寸
  - IL-C011：高算力设备上 Dialog、Menu 组件默认附带形变、流光等沉浸式空间动效，弹窗面积越大动效的绘制开销越高，应避免接近全屏的超大面积 Dialog 或 Menu，保持弹窗尺寸在合理范围。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：应避免接近全屏的超大面积Dialog或Menu · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：大面积弹出框不建议
  - IL-C007：大面积的弹出框开启沉浸光感效果会带来更多的动效绘制开销，不建议开启，应保持弹窗尺寸在合理范围。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：会带来更多的动效绘制开销 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

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
| runtime | 是 | passed | 导航编排 14 步全部通过：Toast 触发、Popup 打开（组件树断言命中'气泡提示：Popup 沉浸式系统材质'）、Menu 打开（断言命中'菜单项一'）并选择关闭、AlertDialog 打开（断言命中'警告弹窗'）并取消、ActionSheet 打开（断言命中'选择操作'）并选择、bindSheet 打开（断言命中'半模态转场'）并关闭；用户确认全部弹窗打开关闭行为正常，无回调回归。 |
| visual | 是 | inconclusive | 模型判图：用户在模拟器（127.0.0.1:5555）实际观察：四类弹窗（Toast、气泡Popup、菜单、AlertDialog/CustomDialog/ActionSheet/Sheet）均可正常打开与关闭，但弹窗背景未呈现沉浸光感材质（呈纯色）。官网冻结正文说明在不支持沉浸式材质的设备上可设置沉浸式材质但无效果；本模拟器疑似不支持沉浸式材质，视觉材质预期需在高算力真机复验，不能据此判定实现失败。 |

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
- after：`f840ff46622ae0ebf0fc85d784744c7b6be0a2b251082dd1d905d2a7db15144c`

```diff
--- a/entry/src/main/module.json5
+++ b/entry/src/main/module.json5
@@ -9,6 +9,12 @@
     ],
     "deliveryWithInstall": true,
     "installationFree": false,
+    "metadata": [
+      {
+        "name": "ohos.arkui.UIMaterial.state",
+        "value": "enable"
+      }
+    ],
     "metadata": [
       {
         "name": "ohos.arkui.UIMaterial.state",
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`8fd63582615512ae03b30b3c100f13f8e72bf2a94eb3e0cf0cfe7fe866758a1e`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,312 @@
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
+import { uiMaterial } from '@kit.ArkUI';
+
+@Builder
+function EmptyBuilder() {
+}
+
+// 弹窗内容区保持合理尺寸（约 328x216），避免接近全屏带来的动效绘制开销
+@CustomDialog
+struct MaterialDialog {
+  controller?: CustomDialogController;
+
+  build() {
+    Column({ space: 12 }) {
+      Text('自定义弹窗')
+        .fontSize(20)
+        .fontWeight(FontWeight.Bold)
+      Text('CustomDialogControllerOptions.systemMaterial 设置沉浸式系统材质，样式 ULTRA_THICK。')
+        .fontSize(14)
+        .fontColor($r('sys.color.font_secondary'))
+        .textAlign(TextAlign.Center)
+      Button('关闭')
+        .width(120)
+        .onClick(() => {
+          this.controller?.close();
+        })
+    }
+    .width(328)
+    .height(216)
+    .justifyContent(FlexAlign.Center)
+    .padding(16)
+  }
+}
+
+// 半透明卡片（渐变实现）：页面内容区不使用沉浸式系统材质，控制材质使用面积
+@Component
+struct DemoCard {
+  @BuilderParam content: () => void = EmptyBuilder;
+
+  build() {
+    Column({ space: 12 }) {
+      this.content()
+    }
+    .padding(16)
+    .borderRadius(16)
+    .width('90%')
+    .linearGradient({
+      angle: 90,
+      colors: [['#1AFFFFFF', 0], ['#1AFFFFFF', 1]]
+    })
+  }
+}
+
+@Entry
+@Component
+struct Index {
+  @State showPopup: boolean = false;
+  @State showMenu: boolean = false;
+  @State showSheet: boolean = false;
+  dialogController: CustomDialogController = new CustomDialogController({
+    builder: MaterialDialog(),
+    systemMaterial: new uiMaterial.ImmersiveMaterial({
+      style: uiMaterial.ImmersiveStyle.ULTRA_THICK
+    }),
+    autoCancel: true,
+    alignment: DialogAlignment.Center,
+    cancel: () => {
+      console.info('CustomDialog auto cancel');
+    }
+  });
+
+  // 即时反馈：ShowToastOptions.systemMaterial（THICK），不设置 backgroundColor / backgroundBlurStyle
+  showToastFeedback(): void {
+    try {
+      this.getUIContext().getPromptAction().showToast({
+        message: '即时反馈：Toast 沉浸式系统材质（THICK）',
+        duration: 2500,
+        systemMaterial: new uiMaterial.ImmersiveMaterial({
+          style: uiMaterial.ImmersiveStyle.THICK
+        })
+      });
+    } catch (error) {
+      console.error(`showToast failed: ${JSON.stringify(error)}`);
+    }
+  }
+
+  // 弹出框：AlertDialogParam.systemMaterial（ULTRA_THICK），保留按钮回调
+  showAlertDialog(): void {
+    AlertDialog.show({
+      title: '警告弹窗',
+      message: 'AlertDialog 通过 AlertDialogParam.systemMaterial 设置沉浸式系统材质（ULTRA_THICK）。',
+      primaryButton: {
+        value: '取消',
+        action: () => {
+          console.info('AlertDialog cancel');
+        }
+      },
+      secondaryButton: {
+        value: '确定',
+        action: () => {
+          console.info('AlertDialog confirm');
+        }
+      },
+      systemMaterial: new uiMaterial.ImmersiveMaterial({
+        style: uiMaterial.ImmersiveStyle.ULTRA_THICK
+      })
+    });
+  }
+
+  // 弹出框：ActionSheetOptions.systemMaterial（ULTRA_THICK），materialColor 为半透明色
+  showActionSheet(): void {
+    ActionSheet.show({
+      title: '选择操作',
+      message: 'ActionSheet 演示半透明 materialColor 赋色，不透明颜色会遮挡材质滤镜效果。',
+      sheets: [
+        {
+          title: '选项一',
+          action: () => {
+            console.info('ActionSheet option 1');
+          }
+        },
+        {
+          title: '选项二',
+          action: () => {
+            console.info('ActionSheet option 2');
+          }
+        },
+        {
+          title: '选项三',
+          action: () => {
+            console.info('ActionSheet option 3');
+          }
+        }
+      ],
+      systemMaterial: new uiMaterial.ImmersiveMaterial({
+        style: uiMaterial.ImmersiveStyle.ULTRA_THICK,
+        materialColor: 'rgba(64, 128, 255, 0.2)'
+      })
+    });
+  }
+
+  // 菜单：ContextMenuOptions.systemMaterial（THICK）
+  @Builder
+  MenuBuilder() {
+    Menu() {
+      MenuItem({ content: '菜单项一' })
+      MenuItem({ content: '菜单项二' })
+      MenuItem({ content: '菜单项三' })
+    }
+  }
+
+  // 半模态：SheetOptions.systemMaterial（ULTRA_THICK），高度保持常规尺寸
+  @Builder
+  SheetBuilder() {
+    Column({ space: 12 }) {
+      Text('半模态转场')
+        .fontSize(20)
+        .fontWeight(FontWeight.Bold)
+      Text('SheetOptions.systemMaterial 设置沉浸式系统材质（ULTRA_THICK）。')
+        .fontSize(14)
+        .fontColor($r('sys.color.font_secondary'))
+        .textAlign(TextAlign.Center)
+      Button('关闭半模态')
+        .width(160)
+        .margin({ top: 12 })
+        .onClick(() => {
+          this.showSheet = false;
+        })
+    }
+    .width('100%')
+    .padding(24)
+    .alignItems(HorizontalAlign.Center)
+  }
+
+  @Builder
+  CardTitle(title: string, subtitle: string) {
+    Column({ space: 4 }) {
+      Text(title)
+        .fontSize(18)
+        .fontWeight(FontWeight.Bold)
+      Text(subtitle)
+        .fontSize(12)
+        .fontColor($r('sys.color.font_secondary'))
+    }
+    .alignItems(HorizontalAlign.Start)
+    .width('100%')
+  }
+
+  build() {
+    Scroll() {
+      Column({ space: 16 }) {
+        Text('弹窗类组件沉浸光感 Demo')
+          .fontSize(22)
+          .fontWeight(FontWeight.Bold)
+          .margin({ top: 36, bottom: 4 })
+        Text('API 26 · 应用级 ENABLE · 组件级 systemMaterial')
+          .fontSize(12)
+          .fontColor($r('sys.color.font_secondary'))
+
+        DemoCard() {
+          this.CardTitle('即时反馈（Toast）', 'ShowToastOptions.systemMaterial · THICK')
+          Button('显示 Toast')
+            .width('100%')
+            .onClick(() => {
+              this.showToastFeedback();
+            })
+        }
+
+        DemoCard() {
+          this.CardTitle('气泡提示（Popup / Tips）', 'PopupOptions / TipsOptions.systemMaterial · THICK')
+          Row({ space: 12 }) {
+            Button('气泡 Popup')
+              .layoutWeight(1)
+              .onClick(() => {
+                this.showPopup = !this.showPopup;
+              })
+              .bindPopup(this.showPopup, {
+                message: '气泡提示：Popup 沉浸式系统材质（THICK）',
+                placement: Placement.Top,
+                onStateChange: (state: PopupStateChangeParam) => {
+                  if (!state.isVisible) {
+                    this.showPopup = false;
+                  }
+                },
+                systemMaterial: new uiMaterial.ImmersiveMaterial({
+                  style: uiMaterial.ImmersiveStyle.THICK
+                })
+              })
+            Button('长按悬浮 Tips')
+              .layoutWeight(1)
+              .bindTips('悬浮提示：Tips 沉浸式系统材质（THICK）', {
+                appearingTime: 300,
+                disappearingTime: 2000,
+                systemMaterial: new uiMaterial.ImmersiveMaterial({
+                  style: uiMaterial.ImmersiveStyle.THICK
+                })
+              })
+          }
+          .width('100%')
+        }
+
+        DemoCard() {
+          this.CardTitle('菜单（Menu）', 'ContextMenuOptions.systemMaterial · THICK')
+          Button('打开菜单')
+            .width('100%')
+            .onClick(() => {
+              this.showMenu = !this.showMenu;
+            })
+            .bindContextMenu(this.showMenu, this.MenuBuilder, {
+              systemMaterial: new uiMaterial.ImmersiveMaterial({
+                style: uiMaterial.ImmersiveStyle.THICK
+              })
+            })
+        }
+
+        DemoCard() {
+          this.CardTitle('弹出框（Dialog）', 'AlertDialogParam / CustomDialogControllerOptions / ActionSheetOptions / SheetOptions · ULTRA_THICK')
+          Button('AlertDialog 警告弹窗')
+            .width('100%')
+            .onClick(() => {
+              this.showAlertDialog();
+            })
+          Button('CustomDialog 自定义弹窗')
+            .width('100%')
+            .onClick(() => {
+              this.dialogController.open();
+            })
+          Button('ActionSheet 选择列表')
+            .width('100%')
+            .onClick(() => {
+              this.showActionSheet();
+            })
+          Button('bindSheet 半模态')
+            .width('100%')
+            .onClick(() => {
+              this.showSheet = true;
+            })
+            .bindSheet(this.showSheet, this.SheetBuilder(), {
+              height: 320,
+              showClose: true,
+              onDisappear: () => {
+                console.info('Sheet dismiss');
+              },
+              systemMaterial: new uiMaterial.ImmersiveMaterial({
+                style: uiMaterial.ImmersiveStyle.ULTRA_THICK
+              })
+            })
+        }
+
+        Text('弹窗类组件与接口可在页面内全部区域生效，无需位于标题栏或 TabBar')
+          .fontSize(12)
+          .fontColor($r('sys.color.font_secondary'))
+          .margin({ top: 8, bottom: 32 })
+          .width('90%')
+          .textAlign(TextAlign.Center)
+      }
+      .width('100%')
+      .alignItems(HorizontalAlign.Center)
+    }
+    .width('100%')
+    .height('100%')
+    .align(Alignment.Top)
+    .linearGradient({
+      angle: 180,
+      colors: [
+        ['#0A3D91', 0],
+        ['#2E7CD6', 0.5],
+        ['#B8E4FF', 1]
+      ]
+    })
+  }
+}
+
```

### 待验证

- PENDING-001 [visual] 模型判图：用户在模拟器（127.0.0.1:5555）实际观察：四类弹窗（Toast、气泡Popup、菜单、AlertDialog/CustomDialog/ActionSheet/Sheet）均可正常打开与关闭，但弹窗背景未呈现沉浸光感材质（呈纯色）。官网冻结正文说明在不支持沉浸式材质的设备上可设置沉浸式材质但无效果；本模拟器疑似不支持沉浸式材质，视觉材质预期需在高算力真机复验，不能据此判定实现失败。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\device-run.log
- EVID-006 [device_log] 导航步骤 toast-open：按 text=显示 Toast 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-toast-open.log
- EVID-007 [device_log] 导航步骤 popup-open：按 text=气泡 Popup 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-popup-open.log
- EVID-008 [device_log] 导航步骤 popup-close：按 text=气泡 Popup 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-popup-close.log
- EVID-009 [device_log] 导航步骤 menu-open：按 text=打开菜单 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-menu-open.log
- EVID-010 [device_log] 导航步骤 menu-select：按 text=菜单项一 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-menu-select.log
- EVID-011 [device_log] 导航步骤 scroll-to-dialog：坐标滑动。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-scroll-to-dialog.log
- EVID-012 [device_log] 导航步骤 scroll-more：坐标滑动。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-scroll-more.log
- EVID-013 [device_log] 导航步骤 alert-open：按 text=AlertDialog 警告弹窗 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-alert-open.log
- EVID-014 [device_log] 导航步骤 alert-cancel：按 text=取消 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-alert-cancel.log
- EVID-015 [device_log] 导航步骤 actionsheet-open：按 text=ActionSheet 选择列表 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-actionsheet-open.log
- EVID-016 [device_log] 导航步骤 actionsheet-select：按 text=选项一 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-actionsheet-select.log
- EVID-017 [device_log] 导航步骤 sheet-open：按 text=bindSheet 半模态 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-sheet-open.log
- EVID-018 [device_log] 导航步骤 sheet-close：按 text=关闭半模态 中心坐标点击。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\4bdbe985-dd75-4b8a-9a5e-0b6837021a64\nav-sheet-close.log
- EVID-019 [device_log] 导航编排：passed
- EVID-020 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\images\9c022ac7a09a45c8d254fb8ac17cb9360ea9a510b57929422d2facf949699e04.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/9c022ac7a09a45c8d254fb8ac17cb9360ea9a510b57929422d2facf949699e04.png>)

- EVID-021 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\2\ohos-feature-engineering\evidence\images\5197f9a18aa53ed6df817fda0abafd0da985018cbde7be477bcb402a5b6a5429.png

![判图引用的截图。](<evidence/images/5197f9a18aa53ed6df817fda0abafd0da985018cbde7be477bcb402a5b6a5429.png>)

- EVID-022 [visual_judgment] 用户在模拟器（127.0.0.1:5555）实际观察：四类弹窗（Toast、气泡Popup、菜单、AlertDialog/CustomDialog/ActionSheet/Sheet）均可正常打开与关闭，但弹窗背景未呈现沉浸光感材质（呈纯色）。官网冻结正文说明在不支持沉浸式材质的设备上可设置沉浸式材质但无效果；本模拟器疑似不支持沉浸式材质，视觉材质预期需在高算力真机复验，不能据此判定实现失败。
