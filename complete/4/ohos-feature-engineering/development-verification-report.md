# 代码开发验证报告

- 工程：D:\HW\testproject\complete\4
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 验证 Button 沉浸光感生效区域是否具有限制 | arkui-api26 | inconclusive |

## 验证 Button 沉浸光感生效区域是否具有限制

- 判据策略：fresh，冻结于 2026-09-10T07:55:29.605Z

- 总结果：`inconclusive`
- 能力：immersive-light
- 技术路线：arkui-api26

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-C001：标题栏与内容区 Button 均通过通用属性 systemMaterial 显式设置沉浸光感。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- IL-C002：demo 不配置应用级 metadata（default 模式），Button 一律组件级显式设置 systemMaterial，验证组件级开启路径。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- IL-C003：对照组 Select 通过 systemMaterial 属性设置下拉按钮材质（本 demo 不接下拉菜单 menuSystemMaterial，仅验证按钮区域表现）。
  - 官网冻结来源：component:131-143，片段 SHA-256：`aa5d7d5929b567b2ccf15854b7db2b45e1f4a656bef413055dfc77e5ec9b540a`
- IL-C004：对照组 Toggle 使用 ToggleType.Switch 形态设置材质，不使用 Checkbox 形态（Checkbox 不适配沉浸光感）。
  - 官网冻结来源：component:145-155，片段 SHA-256：`988db6a652beeee1bb2cf6d441b78ad89505e6e7fd18675e651103dc4bab442d`
- IL-C005：标题栏内提供一个开启 interactive 与 lightEffect 的 Button 变体，运行时观察默认点击态/悬浮态反馈被光感交互反馈替代。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- IL-C006：Toggle.Switch 传入材质参数仅作为开启标记，demo 不预期其视觉随参数变化。
  - 官网冻结来源：component:153-159，片段 SHA-256：`2e0233bd19f5e93413eee6c1922d04b6b2ae9de2b4dc401e8fb943563c4e1e3a`
- IL-C007：对照组 Slider 保持默认滑块形状（SliderBlockType.DEFAULT）与默认样式（非 NONE）后设置材质。
  - 官网冻结来源：component:163-175，片段 SHA-256：`febdd458fb3e4a6f2ce6bc9b0c3f00044a69406b1bdc8a4daea413541b18a694`
- IL-C008：不在本 demo 实现 ChipGroup 三入口，仅保留判据与来源供后续场景复用。
  - 官网冻结来源：component:177-199，片段 SHA-256：`7131c960d7df688ead55ebf93765e741897a02d7b2b3f42cdbe15bea8dd6ac91`
- IL-C009：不在本 demo 实现 SegmentButton 及其胶囊多选限制，仅保留判据与来源供后续场景复用。
  - 官网冻结来源：component:177-199，片段 SHA-256：`7131c960d7df688ead55ebf93765e741897a02d7b2b3f42cdbe15bea8dd6ac91`
- IL-C010：内容区布置 Button 探针：按清单字面 Button 不在全页面生效清单（仅 Slider、Toggle、Select），页面文案标注该预期，运行时以视觉与日志裁决。
  - 官网冻结来源：constraints:7-15，片段 SHA-256：`4eb94b184f3a85d4200f2909503b622550131175db43fe022faeeae6e1503fa0`
- IL-C011：同上内容区 Button 探针同时承载『清单外组件仅标题栏/底部TabBar 生效』的字面预期，与 IL-C012 构成 button-effective-scope 冲突组双预期，验证按状态机裁决。
  - 官网冻结来源：constraints:7-15，片段 SHA-256：`4eb94b184f3a85d4200f2909503b622550131175db43fe022faeeae6e1503fa0`
- IL-C012：Button 章节提供组件级 systemMaterial 入口且未标注区域限制——demo 在标题栏与内容区同时设置，实测两侧预期；保留冲突组不提前选边。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- IL-C013：demo 页面注明观察点：运行时抓取 hilog 中的『Material inactive: out of scope』特征日志作为内容区 Button 是否受限的诊断信号。
  - 官网冻结来源：faq:25-47，片段 SHA-256：`0ca7364f29e090f79b43751020c625e92e9f618460bca06a1b28131c34db5d57`
- IL-C014：所有探针 Button 显式设置 width/height（并配 borderRadius），使材质渲染区域（布局区域）与可视区域一致，避免误判。
  - 官网冻结来源：faq:348-368，片段 SHA-256：`565e7587fe4924effabb8d545f6421c656d8909cb02b2bbb83194ea5bece147d`
- IL-C015：页面顶部展示 isImmersiveMaterialSupported() 与 getGlobalMaterialLevel() 结果，并以 isSupported 守卫材质设置（不支持时降级普通样式）。
  - 官网冻结来源：ui-material-api:389-414，片段 SHA-256：`661037db5e1e2ec692e3a195205626706b112f5b5505b3ef364b2721d2d8a828`
- IL-C016：build-profile.json5 targetSdkVersion 使用 26.0.0（工程配置约束，非官网判据数值格式的来源）。
  - 官网冻结来源：ui-material-api:811-816，片段 SHA-256：`c8aa7e3cfe532ac9b63c5796b5762fc2c21be17f960801e8fc622e7df11eb07f`
- IL-C017：build-profile.json5 targetSdkVersion 不低于 26.0.0（设为 26.0.0）。
  - 官网冻结来源：enable:3-5，片段 SHA-256：`c003ddbb00e5b13a5867c02a29c3de2440704c60da43d4cdc492694a75d6150d`
- IL-C018：demo 采用组件级显式 systemMaterial（优先级高于应用级），不依赖应用级开关。
  - 官网冻结来源：enable:75-77，片段 SHA-256：`fd84b7c5d2d6ca1e1376dc7c02cf7e38f61885e7dea295da0f90b626f6901f52`
- IL-C019：探针 Button 不设置 buttonStyle/backgroundColor 等颜色属性，验证属性生效后背景恢复透明/默认 Button 主题色材质的信号。
  - 官网冻结来源：ui-material-api:15-25，片段 SHA-256：`9509b47214a584bab8ede8703965257ced041dbf140bf6b666e2f123ebd374a3`
- IL-C020：所有 systemMaterial 属性调用放在其他样式属性（宽度、圆角、背景等）之后设置。
  - 官网冻结来源：faq:300-312，片段 SHA-256：`d12e72442f118c256e14b2054461490b9667d1adb0c35e8083bb44788d7eb576`

#### S01 · 已实施

build-profile.json5 将 targetSdkVersion 与 compatibleSdkVersion 设置为 26.0.0

- 位置：`build-profile.json5:8-9`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-9`（修改后；已对应 diff）
- 判据依据（fresh）：ImmersiveMaterial/systemMaterial 自 API 26 提供
  - IL-C016：ImmersiveMaterial 对象和 systemMaterial 属性从 API 版本 26.0.0 开始新增。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：从API版本26.0.0开始，新增ImmersiveMaterial对象和systemMaterial属性。 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：开启沉浸光感需 targetSDKVersion 不低于 26.0.0
  - IL-C017：开启沉浸光感要确保应用的 targetSDKVersion 不低于 26.0.0。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：开启沉浸光感，要确保应用的 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`

#### S02 · 已实施

页面骨架与能力状态卡：isImmersiveMaterialSupported/getGlobalMaterialLevel 查询展示、守卫降级、渐变背景骨架

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-29`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:59-90`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:173-195`（修改后；已对应 diff）
- 判据依据（fresh）：运行时能力查询与不支持降级
  - IL-C015：运行时通过 isImmersiveMaterialSupported 判断设备是否支持沉浸式系统材质，通过 getGlobalMaterialLevel 获取设备材质等级；不支持设备上可设置但无效果，应降级普通样式。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：判断当前设备是否支持沉浸式系统材质 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S03 · 已实施

Navigation STACK 标题栏内 Button 探针（纯材质版 + interactive/lightEffect 版），systemMaterial 置于样式之后；demo 不配置应用级 metadata，标题栏与内容区探针全部走组件级显式设置

- 位置：`entry/src/main/ets/pages/Index.ets:30-58`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:196-200`（修改后；已对应 diff）
- 判据依据（fresh）：Button 组件级 systemMaterial 入口
  - IL-C001：按钮支持通过通用属性 systemMaterial 为 Button 组件设置沉浸光感效果（组件级开启方式）。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：组件级开启：按钮支持通过[systemMaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#systemmaterial)属性为[Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)组件设置沉浸光感效果。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：应用级 ENABLE 下按钮不默认开启，demo 以组件级显式设置验证
  - IL-C002：应用级开关处于 ENABLE 模式下，按钮不会默认开启沉浸光感，需组件级显式设置。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：应用级开关处于[ENABLE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial#materialstate)模式下，按钮不会默认开启沉浸光感。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：lightEffect 替代默认点击/悬浮反馈
  - IL-C005：Button 启用光感交互反馈效果（lightEffect）后，默认的点击态和悬浮态视觉反馈不再展示，由材质的光感交互反馈效果替代。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：按钮默认的点击态和悬浮态视觉反馈不再展示，由材质的光感交互反馈效果替代。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：冲突组：入口侧未标注区域限制
  - IL-C012：组件适配指南为 Button 提供组件级 systemMaterial 开启入口，Button 章节本身未标注页面区域限制。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：组件级开启：按钮支持通过[systemMaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#systemmaterial)属性为[Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)组件设置沉浸光感效果。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：组件级开启优先级高于应用级，直接覆盖
  - IL-C018：组件级开启的优先级高于应用级开启，通过组件的沉浸式系统材质接口可以直接覆盖应用级开关开启的组件效果。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：组件级开启的优先级高于应用级开启 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`
- 判据依据（fresh）：显式 width/height 控制渲染区域
  - IL-C014：材质渲染区域由组件布局区域决定，可能不等于可视区域；通过 width、height、borderRadius 接口控制组件可视区域与材质渲染区域一致。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：材质渲染区域由组件布局区域决定 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：不设颜色属性观察生效信号
  - IL-C019：systemMaterial 属性生效后，已设置的 backgroundColor 会被恢复为透明色，borderWidth 会被恢复为无边框效果，可作为属性是否生效的判定信号。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：属性会被恢复为无边框效果。 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：systemMaterial 放最后
  - IL-C020：通过通用属性 systemMaterial 设置沉浸式系统材质时，应放在其他样式属性（如背景色、边框、阴影等）之后设置。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：放在其他样式属性（如背景色、边框、阴影等）之后设置。 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`

#### S04 · 已实施

内容区 Button 探针（清单字面生效范围外）+ 观察点与判定说明文案（out of scope 日志特征、双预期说明）

- 位置：`entry/src/main/ets/pages/Index.ets:91-117`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:157-172`（修改后；已对应 diff）
- 判据依据（fresh）：清单未列 Button
  - IL-C010：生效区域清单中按钮与选择类组件可在页面内全部区域生效的范围仅列举 Slider、Toggle、Select，未包含 Button。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：以及按钮与选择类组件（Slider、Toggle、Select）可在页面内全部区域生效。 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：清单外组件仅标题栏/TabBar 生效
  - IL-C011：清单外组件仅在 Navigation/NavDestination 标题栏或横向 Tab 中 barPosition 为 BarPosition.End 的底部 TabBar 中生效，在其他区域设置沉浸光感不生效；按清单字面 Button 未列入全页面生效范围。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：其他组件仅在Navigation/NavDestination标题栏或横向Tab中barPosition为BarPosition.End的底部TabBar中生效。在其他区域中设置沉浸光感效果不生效。 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：out of scope 日志诊断特征
  - IL-C013：组件不在沉浸光感生效范围时，日志中存在打印 Material inactive: out of scope. Use component in navigation title bar or Tabbar.，可作为 demo 运行时判定 Button 是否受限的诊断信号。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：Material inactive: out of scope. Use component in navigation title bar or Tabbar. · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`

#### S05 · 已实施

内容区对照组：Slider（默认形状）+ Toggle(ToggleType.Switch) + Select(systemMaterial) 与说明文案

- 位置：`entry/src/main/ets/pages/Index.ets:118-156`（修改后；已对应 diff）
- 判据依据（fresh）：Select 按钮入口
  - IL-C003：Select 的下拉按钮与下拉菜单是两个独立材质入口，分别使用 systemMaterial 与 menuSystemMaterial，可分别开启或关闭。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：下拉按钮支持通过[systemMaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#systemmaterial)属性设置沉浸光感效果；下拉菜单通过独立的[menuSystemMaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select#menusystemmaterial)接口设置沉浸光感效果。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：Checkbox 不适配，使用 Switch
  - IL-C004：Toggle 的 Checkbox 形态当前未适配沉浸光感效果，设置后无沉浸光感效果，应保留普通样式。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：ToggleType.Checkbox：当前未适配沉浸光感效果，设置后无沉浸光感效果。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：Switch 材质参数仅标记
  - IL-C006：Toggle.Switch 传入的材质参数仅作为开启沉浸光感的开关标记，不影响实际视觉效果，实际使用组件内部预设的视觉参数。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：ToggleType.Switch：传入的材质参数仅作为开启沉浸光感的开关标记，不影响实际视觉效果 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：Slider DEFAULT/NONE 条件
  - IL-C007：Slider 的沉浸光感交互反馈效果仅在滑块形状为 SliderBlockType.DEFAULT 且 SliderStyle 不为 NONE 时生效。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：沉浸光感的交互反馈效果仅在滑块形状为 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

冲突规范与待验证预期：

- IL-C001（步骤引用）：按钮支持通过通用属性 systemMaterial 为 Button 组件设置沉浸光感效果（组件级开启方式）。
  - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：组件级开启：按钮支持通过[systemMaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#systemmaterial)属性为[Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)组件设置沉浸光感效果。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- IL-C010（步骤引用）：生效区域清单中按钮与选择类组件可在页面内全部区域生效的范围仅列举 Slider、Toggle、Select，未包含 Button。
  - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：以及按钮与选择类组件（Slider、Toggle、Select）可在页面内全部区域生效。 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- IL-C011（步骤引用）：清单外组件仅在 Navigation/NavDestination 标题栏或横向 Tab 中 barPosition 为 BarPosition.End 的底部 TabBar 中生效，在其他区域设置沉浸光感不生效；按清单字面 Button 未列入全页面生效范围。
  - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：其他组件仅在Navigation/NavDestination标题栏或横向Tab中barPosition为BarPosition.End的底部TabBar中生效。在其他区域中设置沉浸光感效果不生效。 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- IL-C012（步骤引用）：组件适配指南为 Button 提供组件级 systemMaterial 开启入口，Button 章节本身未标注页面区域限制。
  - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：组件级开启：按钮支持通过[systemMaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#systemmaterial)属性为[Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)组件设置沉浸光感效果。 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

上述预期仍需逐项对照实际行为；步骤中的实施选择不裁决规范真值。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | inconclusive | 场景静态规则存在失败或待人工确认项。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 应用安装拉起成功；组件树证实标题栏 A1/A2 与内容区 B 三个 Button 探针及 Slider/Toggle/Select 对照组全部渲染在位（btnContent onClick 计数为 1，点击交互无回归）；能力查询实际返回 isImmersiveMaterialSupported=true、getGlobalMaterialLevel=SMOOTH(低算力)，与 IL-C015 查询守卫契约一致。 |
| visual | 是 | inconclusive | 模型判图：模型无图像输入能力无法判读截图；模拟器为 SMOOTH 低算力档位（材质样式滤镜参数不生效，仅背景色/边框/阴影方式实现）；out of scope 特征日志在模拟器 hilog 中不可得（Material 关键字 0 条）。button-effective-scope 冲突组（IL-C010/IL-C011 vs IL-C012）无法在本次环境裁决，需高算力真机复验。截图与组件树已留存供人工复核。 |

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

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`09a93764c461949cbb808b63837b0d2fa00b44c95970221f88e5f36c6aadf145`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,200 @@
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
+@Entry
+@Component
+struct Index {
+  private isSupported: boolean = uiMaterial.isImmersiveMaterialSupported();
+  private materialLevel: uiMaterial.MaterialLevel = uiMaterial.getGlobalMaterialLevel();
+  private levelText: string = '';
+  private plainMaterial: uiMaterial.ImmersiveMaterial | undefined = undefined;
+  private interactiveMaterial: uiMaterial.ImmersiveMaterial | undefined = undefined;
+  @State titlePlainCount: number = 0;
+  @State titleLightCount: number = 0;
+  @State contentBtnCount: number = 0;
+
+  aboutToAppear(): void {
+    const levelNames: string[] = ['EXQUISITE(高算力)', 'GENTLE(中算力)', 'SMOOTH(低算力)'];
+    this.levelText = levelNames[this.materialLevel] ?? `${this.materialLevel}`;
+    if (this.isSupported) {
+      this.plainMaterial = new uiMaterial.ImmersiveMaterial({
+        style: uiMaterial.ImmersiveStyle.THIN,
+      });
+      this.interactiveMaterial = new uiMaterial.ImmersiveMaterial({
+        style: uiMaterial.ImmersiveStyle.THIN,
+        interactive: true,
+        lightEffect: {},
+      });
+    }
+  }
+
+  @Builder
+  NavigationTitle() {
+    Column({ space: 8 }) {
+      Text('A · 标题栏内 Button（生效范围内，预期材质生效）')
+        .fontSize(12)
+        .fontColor('#182431')
+      Row({ space: 12 }) {
+        Button(`A1 纯材质 ${this.titlePlainCount}`)
+          .id('btnTitlePlain')
+          .fontSize(14)
+          .width(136)
+          .height(44)
+          .borderRadius(22)
+          .onClick(() => {
+            this.titlePlainCount += 1;
+          })
+          .systemMaterial(this.plainMaterial)
+        Button(`A2 流光 ${this.titleLightCount}`)
+          .id('btnTitleLight')
+          .fontSize(14)
+          .width(136)
+          .height(44)
+          .borderRadius(22)
+          .onClick(() => {
+            this.titleLightCount += 1;
+          })
+          .systemMaterial(this.interactiveMaterial)
+      }
+      .justifyContent(FlexAlign.Center)
+    }
+    .alignItems(HorizontalAlign.Center)
+    .width('100%')
+    .padding({ top: 8, bottom: 8 })
+  }
+
+  build() {
+    Column() {
+      Navigation() {
+        Scroll() {
+          Column({ space: 16 }) {
+            Column({ space: 6 }) {
+              Text('验证目标：Button 沉浸光感生效区域是否具有限制')
+                .fontSize(16)
+                .fontWeight(FontWeight.Bold)
+                .fontColor('#182431')
+              Text(`设备支持沉浸材质: ${this.isSupported}`)
+                .fontSize(12)
+                .fontColor('#182431')
+              Text(`全局材质等级: ${this.levelText}`)
+                .fontSize(12)
+                .fontColor('#182431')
+              Text('官网清单：Slider/Toggle/Select 可全页面生效；Button 未列入该清单')
+                .fontSize(12)
+                .fontColor('#182431')
+              Text('观察点：内容区组件受限时 hilog 出现 Material inactive: out of scope')
+                .fontSize(12)
+                .fontColor('#182431')
+            }
+            .alignItems(HorizontalAlign.Start)
+            .width('100%')
+            .padding(14)
+            .borderRadius(14)
+            .backgroundColor('rgba(255,255,255,0.72)')
+
+            Column({ space: 10 }) {
+              Text('B · 内容区 Button（清单字面：生效范围外）')
+                .fontSize(14)
+                .fontWeight(FontWeight.Bold)
+                .fontColor('#FFFFFF')
+              Button(`B 内容区Button ${this.contentBtnCount}`)
+                .id('btnContent')
+                .fontSize(14)
+                .width(200)
+                .height(48)
+                .borderRadius(24)
+                .onClick(() => {
+                  this.contentBtnCount += 1;
+                })
+                .systemMaterial(this.plainMaterial)
+              Text('预期分歧：按清单字面不生效并打印 out of scope 日志；按组件章入口侧则生效。以本页实测裁决。')
+                .fontSize(11)
+                .fontColor('#F0FAFF')
+            }
+            .alignItems(HorizontalAlign.Start)
+            .width('100%')
+            .padding(14)
+            .borderRadius(14)
+            .backgroundColor('rgba(0,0,0,0.12)')
+
+            Column({ space: 10 }) {
+              Text('C · 清单内对照组（Slider/Toggle/Select，预期全页面生效）')
+                .fontSize(14)
+                .fontWeight(FontWeight.Bold)
+                .fontColor('#FFFFFF')
+              Row({ space: 16 }) {
+                Slider({ value: 40, min: 0, max: 100 })
+                  .id('sliderContent')
+                  .width(170)
+                  .systemMaterial(this.plainMaterial)
+                Toggle({ type: ToggleType.Switch, isOn: false })
+                  .id('toggleSwitch')
+                  .systemMaterial(this.plainMaterial)
+              }
+              Row() {
+                Select([
+                  { value: '选项一' },
+                  { value: '选项二' },
+                  { value: '选项三' }
+                ])
+                  .id('selectContent')
+                  .selected(0)
+                  .value('选项一')
+                  .fontColor('#FFFFFF')
+                  .width(150)
+                  .onSelect(() => {
+                  })
+                  .systemMaterial(this.plainMaterial)
+              }
+              .width('100%')
+              .justifyContent(FlexAlign.Start)
+            }
+            .alignItems(HorizontalAlign.Start)
+            .width('100%')
+            .padding(14)
+            .borderRadius(14)
+            .backgroundColor('rgba(0,0,0,0.12)')
+
+            Column({ space: 6 }) {
+              Text('判定说明')
+                .fontSize(14)
+                .fontWeight(FontWeight.Bold)
+                .fontColor('#FFFFFF')
+              Text('1. A 组与 B 组 Button 使用同一材质对象与尺寸，仅位置不同（标题栏 vs 内容区）。')
+                .fontSize(11)
+                .fontColor('#F0FAFF')
+              Text('2. 探针未设置 buttonStyle/backgroundColor；材质生效后背景恢复透明，可作生效信号。')
+                .fontSize(11)
+                .fontColor('#F0FAFF')
+              Text('3. C 组为清单内组件对照：若 C 生效而 B 不生效并伴随 out of scope 日志，则 Button 生效区域受限成立。')
+                .fontSize(11)
+                .fontColor('#F0FAFF')
+            }
+            .alignItems(HorizontalAlign.Start)
+            .width('100%')
+            .padding(14)
+            .borderRadius(14)
+            .backgroundColor('rgba(0,0,0,0.12)')
+          }
+          .width('100%')
+          .padding(16)
+          .linearGradient({
+            angle: 180,
+            colors: [
+              ['#004AAF', 0.0],
+              ['#2787D9', 0.5],
+              ['#F0FAFF', 1.0]
+            ]
+          })
+        }
+        .scrollBar(BarState.Off)
+        .width('100%')
+        .height('100%')
+      }
+      .title(this.NavigationTitle, { barStyle: BarStyle.STACK })
+    }
+    .width('100%')
+    .height('100%')
+    .backgroundColor('#F1F3F5')
+  }
+}
+
```

### 待验证

- PENDING-001 [static] 场景静态规则存在失败或待人工确认项。
- PENDING-002 [visual] 模型判图：模型无图像输入能力无法判读截图；模拟器为 SMOOTH 低算力档位（材质样式滤镜参数不生效，仅背景色/边框/阴影方式实现）；out of scope 特征日志在模拟器 hilog 中不可得（Material 关键字 0 条）。button-effective-scope 冲突组（IL-C010/IL-C011 vs IL-C012）无法在本次环境裁决，需高算力真机复验。截图与组件树已留存供人工复核。

### 证据

- EVID-001 [static] 场景静态规则：inconclusive
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\4\ohos-feature-engineering\evidence\7446ead6-8535-4fa5-aa6c-34889f091bc5\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\4\ohos-feature-engineering\evidence\7446ead6-8535-4fa5-aa6c-34889f091bc5\device-run.log
- EVID-006 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\4\ohos-feature-engineering\evidence\images\7d8728f98e572d7abc8b5d599cbd7d344eeff4a6d250a4996d81c6fb4650db03.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/7d8728f98e572d7abc8b5d599cbd7d344eeff4a6d250a4996d81c6fb4650db03.png>)

- EVID-007 [component_tree] 完整组件树（devecocli ui layout --mode full）。 — D:\HW\testproject\complete\4\ohos-feature-engineering\evidence\7446ead6-8535-4fa5-aa6c-34889f091bc5\device-layout.json
- EVID-008 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\4\ohos-feature-engineering\evidence\images\9e42a1024a945a1198a53a78ca0716f8f14349c22a0edd1b78a54ae304c276d6.png

![判图引用的截图。](<evidence/images/9e42a1024a945a1198a53a78ca0716f8f14349c22a0edd1b78a54ae304c276d6.png>)

- EVID-009 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\4\ohos-feature-engineering\evidence-manual\device-layout.json
- EVID-010 [visual_judgment] 模型无图像输入能力无法判读截图；模拟器为 SMOOTH 低算力档位（材质样式滤镜参数不生效，仅背景色/边框/阴影方式实现）；out of scope 特征日志在模拟器 hilog 中不可得（Material 关键字 0 条）。button-effective-scope 冲突组（IL-C010/IL-C011 vs IL-C012）无法在本次环境裁决，需高算力真机复验。截图与组件树已留存供人工复核。

### 规范冲突披露

本次判据集保留冲突判据：IL-C001、IL-C010、IL-C011、IL-C012。本次匹配：IL-C015。
