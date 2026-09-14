# 代码开发验证报告

- 工程：D:\HW\testproject\complete\3
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 生成鸿蒙demo，实现按钮、下拉按钮、开关、滑动条、子页签、操作块的沉浸光感效果 | arkui-api26 | inconclusive |

## 生成鸿蒙demo，实现按钮、下拉按钮、开关、滑动条、子页签、操作块的沉浸光感效果

- 判据策略：fresh，冻结于 2026-09-10T07:33:41.395Z

- 总结果：`inconclusive`
- 能力：immersive-light
- 技术路线：arkui-api26

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C01：Button 组件级显式设置 systemMaterial（ULTRA_THIN），不设置 buttonStyle、backgroundColor 与材质颜色，使其默认生效 Button 主题色的材质样式。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- C02：Button 的 fontColor 使用系统预定义可反色颜色资源 $r('sys.color.font_primary')，THIN/ULTRA_THIN 样式下可随材质自动反色。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- C03：应用级 ENABLE 下 Button 不默认开启，demo 中通过组件级 systemMaterial 显式开启。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- C04：Select 同时设置 systemMaterial（下拉按钮，ULTRA_THIN + interactive + lightEffect）与 menuSystemMaterial（下拉菜单，THICK）两个独立入口。
  - 官网冻结来源：component:131-143，片段 SHA-256：`aa5d7d5929b567b2ccf15854b7db2b45e1f4a656bef413055dfc77e5ec9b540a`
- C05：Select 第二个实例单独关闭下拉菜单沉浸光感：menuSystemMaterial(uiMaterial.Material.empty)，演示按钮与菜单相互独立、用 empty 关闭而非 undefined。
  - 官网冻结来源：component:131-143，片段 SHA-256：`aa5d7d5929b567b2ccf15854b7db2b45e1f4a656bef413055dfc77e5ec9b540a`
- C06：组件级设置与官网默认一致：下拉按钮 ULTRA_THIN 并开启 interactive 与 lightEffect，下拉菜单 THICK；页面文案标注默认取值。
  - 官网冻结来源：component:131-143，片段 SHA-256：`aa5d7d5929b567b2ccf15854b7db2b45e1f4a656bef413055dfc77e5ec9b540a`
- C07：不实现：Checkbox 形态不设置任何沉浸光感入口，demo 仅使用 ToggleType.Switch 与 ToggleType.Button 形态。
  - 官网冻结来源：component:145-161，片段 SHA-256：`b7f792693a8b6089cd82daede941daffc4609b20951f578d34ca6b6c2c391a56`
- C08：Button 开启 lightEffect 光感交互反馈，按压/悬浮反馈由材质光感替代（组件不设置额外按压态样式）。
  - 官网冻结来源：component:115-129，片段 SHA-256：`1744a35c9491e3fe09cd45989728d0d3cdf0fdb32999e580dbd5139c167b52c2`
- C09：Button 材质对象设置 interactive: true，按压产生弹性形变、松手恢复。
  - 官网冻结来源：common:134-142，片段 SHA-256：`1165e4345ff9759968a379da9eee0c473eea8e31b382abb5321db8288eeb1fef`
- C10：Button 材质对象设置 lightEffect: {}（默认白色流光）；另设一个 lightEffect: { color: '#80FFD6AA' } 的按钮演示自定义流光颜色。
  - 官网冻结来源：common:134-142，片段 SHA-256：`1165e4345ff9759968a379da9eee0c473eea8e31b382abb5321db8288eeb1fef`
- C11：Toggle 使用 ToggleType.Switch 形态并设置 systemMaterial，页面标注材质参数仅作开关标记、不影响实际视觉参数。
  - 官网冻结来源：component:145-161，片段 SHA-256：`b7f792693a8b6089cd82daede941daffc4609b20951f578d34ca6b6c2c391a56`
- C12：Slider 设置 systemMaterial（非 undefined）开启沉浸光感。
  - 官网冻结来源：component:163-175，片段 SHA-256：`febdd458fb3e4a6f2ce6bc9b0c3f00044a69406b1bdc8a4daea413541b18a694`
- C13：Slider 的 blockStyle 显式设置 type: SliderBlockType.DEFAULT，style 设置 SliderStyle.OutSet（不为 NONE），满足交互反馈生效条件。
  - 官网冻结来源：component:163-175，片段 SHA-256：`febdd458fb3e4a6f2ce6bc9b0c3f00044a69406b1bdc8a4daea413541b18a694`
- C14：module.json5（entry 模块）配置应用级开关 ohos.arkui.UIMaterial.state = enable；Slider/Toggle/Select 等按钮与选择类组件放置在页面内容区任意位置即可生效。
  - 官网冻结来源：constraints:11-15，片段 SHA-256：`201eedb21496108f0c9b4e15dc2a07e2756674e50aabcf76c37d594ce38e6127`
- C15：ChipGroup 设置 backgroundSystemMaterial（普通）、selectedBackgroundSystemMaterial（选中）两个材质入口；suffix 使用 IconGroupSuffix 设置 iconBackgroundSystemMaterial（图标）入口，三种入口齐全。
  - 官网冻结来源：component:177-187，片段 SHA-256：`3d4f6fe993c2cadf455fe4764927c6e3c10bef80fb46be1ecb649c7a9f140685`
- C16：SegmentButton 通过 SegmentButtonOptions.capsule({ multiply: false, backgroundSystemMaterial }) 创建单选胶囊分段按钮；SegmentButtonV2 通过 CapsuleSegmentButtonV2 组件 options 中的 backgroundSystemMaterial 设置。
  - 官网冻结来源：component:189-203，片段 SHA-256：`03cde46ca581d9dbffebd987ec007372e8f5f952eab62a0626809ec4be1142f1`
- C17：不实现：demo 的胶囊分段按钮均为单选（multiply 为 false），不出现 capsule + multiply=true 组合。
  - 官网冻结来源：component:189-203，片段 SHA-256：`03cde46ca581d9dbffebd987ec007372e8f5f952eab62a0626809ec4be1142f1`
- C18：SegmentButtonV2 的 CapsuleSegmentButtonV2 设置 backgroundSystemMaterial 后，选中项背景支持跟随手指拖拽（页面文案标注该能力）。
  - 官网冻结来源：component:189-203，片段 SHA-256：`03cde46ca581d9dbffebd987ec007372e8f5f952eab62a0626809ec4be1142f1`
- C19：通过 uiMaterial.Material.empty 演示组件级关闭：Select 下拉菜单 menuSystemMaterial(uiMaterial.Material.empty) 与 Toggle 单独关闭 systemMaterial(uiMaterial.Material.empty)，与 undefined（恢复默认）语义区分。
  - 官网冻结来源：ui-material-api:79-85，片段 SHA-256：`68ac2c4f56786250033551459c964c6165dca074d284ca9014c5f859100dfe86`
- C20：页面顶部展示 uiMaterial.isImmersiveMaterialSupported() 与 uiMaterial.getGlobalMaterialLevel() 查询结果；不支持沉浸式材质的设备上材质设置无效果（自然降级，不做额外分支）。
  - 官网冻结来源：ui-material-api:389-393，片段 SHA-256：`4d827ba0900197f4565f9ea35576159117bee13ff6a3f91f4182dda6cfc661aa`

#### S01 · 已实施

build-profile.json5 将目标 product 的 targetSdkVersion 与 compatibleSdkVersion 设置为 26.0.0（沉浸光感接口起始版本 26.0.0，工程约束使用 "26.0.0" 字符串格式）。

- 位置：`build-profile.json5:8-9`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-9`（修改后；已对应 diff）
- 判据依据（fresh）：沉浸光感 API（systemMaterial/menuSystemMaterial/ImmersiveMaterial）起始版本为 26.0.0，工程需以 API 26 为目标。
  - C20：在不支持沉浸式材质的设备上可设置沉浸式材质但无效果；可通过 uiMaterial.isImmersiveMaterialSupported 判断设备是否支持沉浸式材质。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：在不支持沉浸式材质的设备上可设置沉浸式材质但无效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S02 · 已实施

entry/src/main/module.json5 增加应用级开关 metadata：ohos.arkui.UIMaterial.state = enable。

- 位置：`entry/src/main/module.json5:12-17`（修改后；已对应 diff）
- 判据依据（fresh）：沉浸光感开启后按钮与选择类组件（Slider、Toggle、Select）可在页面内全部区域生效；应用级 enable 是开启方式之一。
  - C14：沉浸光感开启后，按钮与选择类组件（Slider、Toggle、Select）可在页面内全部区域生效，无需位于 Navigation 标题栏或底部 TabBar。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：以及按钮与选择类组件（Slider、Toggle、Select）可在页面内全部区域生效 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`

#### S03 · 已实施

重写 Index.ets 页面骨架：渐变背景 + Scroll 滚动内容 + 设备材质状态行（isImmersiveMaterialSupported / getGlobalMaterialLevel）。

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-157`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:293-304`（修改后；已对应 diff）
- 判据依据（fresh）：页面展示设备是否支持沉浸式材质与材质等级查询结果。
  - C20：在不支持沉浸式材质的设备上可设置沉浸式材质但无效果；可通过 uiMaterial.isImmersiveMaterialSupported 判断设备是否支持沉浸式材质。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：在不支持沉浸式材质的设备上可设置沉浸式材质但无效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S04 · 已实施

Button 演示区：主题色材质按钮（ULTRA_THIN，不设颜色属性）、带交互形变+默认流光按钮、自定义流光颜色按钮、禁用态按钮。

- 位置：`entry/src/main/ets/pages/Index.ets:25-35`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:158-175`（修改后；已对应 diff）
- 判据依据（fresh）：组件级 systemMaterial 开启，不设 buttonStyle/backgroundColor/材质颜色，默认 Button 主题色材质。
  - C01：Button 通过通用属性 systemMaterial 组件级开启沉浸光感；配置沉浸光感但未设置 buttonStyle、backgroundColor 等颜色相关属性且未设置材质颜色时，默认生效 Button 主题色的材质样式。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：默认生效Button主题色的材质样式 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：fontColor 使用 $r('sys.color.font_primary') 可反色系统资源。
  - C02：Button 材质样式为 THIN 或 ULTRA_THIN 时，fontColor 使用系统预定义的可反色颜色资源，可随材质自动反色。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：可随材质自动反色 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：Button 不依赖应用级默认开启，逐个显式设置 systemMaterial。
  - C03：应用级开关处于 ENABLE 模式下，按钮不会默认开启沉浸光感，需通过组件级 systemMaterial 显式设置。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：按钮不会默认开启沉浸光感 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：开启 lightEffect 后由光感交互反馈替代默认按压/悬浮态。
  - C08：当沉浸光感启用了光感交互反馈效果（lightEffect）时，按钮默认的点击态和悬浮态视觉反馈不再展示，由材质的光感交互反馈效果替代。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：按钮默认的点击态和悬浮态视觉反馈不再展示 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：interactive: true 开启按压弹性形变。
  - C09：通过 interactive 开启交互形变：组件在按压时产生弹性形变，松手后自动恢复，增强交互的视觉反馈。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：组件在按压时产生弹性形变 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：lightEffect: {} 默认白色流光与 lightEffect: { color } 自定义流光各一个实例。
  - C10：通过 lightEffect 开启点光源：用户手指触摸组件时会产生流光跟随效果；lightEffect 传入有效对象即启用，传入 null 或 undefined 则不启用；对象中的 color 字段自定义流光颜色，默认值为 Color.White。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：用户手指触摸组件时会产生流光跟随效果 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`

#### S05 · 已实施

Select 演示区：实例一 systemMaterial(ULTRA_THIN+interactive+lightEffect) + menuSystemMaterial(THICK)；实例二菜单单独关闭 menuSystemMaterial(uiMaterial.Material.empty)。

- 位置：`entry/src/main/ets/pages/Index.ets:37-45`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:176-205`（修改后；已对应 diff）
- 判据依据（fresh）：下拉按钮 systemMaterial 与下拉菜单 menuSystemMaterial 双入口同时设置。
  - C04：Select 下拉按钮通过 systemMaterial 属性设置沉浸光感效果；下拉菜单通过独立的 menuSystemMaterial 接口设置沉浸光感效果。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：下拉菜单通过独立的 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：第二实例用 Material.empty 单独关闭菜单材质，演示两入口相互独立。
  - C05：下拉按钮与下拉菜单的沉浸光感相互独立，可分别开启或关闭；如需单独关闭沉浸光感，应设置 uiMaterial.Material.empty，而非将 systemMaterial 设置为 undefined。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：下拉按钮与下拉菜单的沉浸光感相互独立 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：组件级取值与官网默认一致：按钮 ULTRA_THIN + interactive + lightEffect，菜单 THICK。
  - C06：应用级 ENABLE 模式下下拉按钮与下拉菜单默认开启沉浸光感：下拉按钮材质样式默认 ULTRA_THIN 并默认开启交互形变（interactive）与光感交互反馈（lightEffect）；下拉菜单材质样式默认 THICK。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：下拉按钮沉浸式系统材质样式默认取值为ULTRA_THIN · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：empty 关闭语义在此落地。
  - C19：uiMaterial.Material.empty 返回空材质对象，用于组件单独关闭沉浸式系统材质效果；undefined 表示恢复为组件默认的沉浸光感效果，两者含义不同。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：返回空材质对象，用于组件单独关闭沉浸式系统材质效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S06 · 已实施

Toggle 演示区：默认开启的 Switch、单独关闭（empty）的 Switch、ToggleType.Button 形态开关。

- 位置：`entry/src/main/ets/pages/Index.ets:47-49`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:206-241`（修改后；已对应 diff）
- 判据依据（fresh）：Switch 形态设置 systemMaterial，参数仅作开关标记。
  - C11：ToggleType.Switch 传入的材质参数仅作为开启沉浸光感的开关标记，不影响实际视觉效果，实际使用组件内部预设的视觉参数，主要影响滑块大小、滑块样式、阴影等；材质效果随设备算力档位变化。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：仅作为开启沉浸光感的开关标记，不影响实际视觉效果 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：对照实例 .systemMaterial(uiMaterial.Material.empty) 演示组件级关闭。
  - C19：uiMaterial.Material.empty 返回空材质对象，用于组件单独关闭沉浸式系统材质效果；undefined 表示恢复为组件默认的沉浸光感效果，两者含义不同。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：返回空材质对象，用于组件单独关闭沉浸式系统材质效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S07 · 已实施

Slider 演示区：blockStyle type 为 SliderBlockType.DEFAULT、style 为 SliderStyle.OutSet，设置 systemMaterial。

- 位置：`entry/src/main/ets/pages/Index.ets:51-55`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:242-264`（修改后；已对应 diff）
- 判据依据（fresh）：systemMaterial 传有效材质对象开启沉浸光感。
  - C12：Slider 传入的材质参数仅作为开启沉浸光感的开关标记；传入 undefined 时沉浸光感不生效，恢复为原先的 Slider 样式。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：传入undefined时沉浸光感不生效，恢复为原先的Slider样式 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：显式 DEFAULT 滑块形状 + 非 NONE 样式，满足交互反馈生效条件。
  - C13：Slider 沉浸光感的交互反馈效果仅在滑块形状为 SliderBlockType.DEFAULT 且 SliderStyle 不为 NONE 时生效。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：不为NONE时生效 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

#### S08 · 已实施

ChipGroup 演示区：backgroundSystemMaterial、selectedBackgroundSystemMaterial 与 IconGroupSuffix 的 iconBackgroundSystemMaterial 三入口。

- 位置：`entry/src/main/ets/pages/Index.ets:57-74`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:116-127`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:265-277`（修改后；已对应 diff）
- 判据依据（fresh）：普通/选中/图标三种材质入口齐全。
  - C15：ChipGroup 通过 backgroundSystemMaterial、selectedBackgroundSystemMaterial（选中状态）和 iconBackgroundSystemMaterial（图标）三个字段设置沉浸光感效果。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：的backgroundSystemMaterial、selectedBackgroundSystemMaterial（选中状态）和iconBackgroundSystemMaterial（图标）字段 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

#### S09 · 已实施

SegmentButton 演示区：SegmentButtonOptions.capsule 单选 + backgroundSystemMaterial；CapsuleSegmentButtonV2 + backgroundSystemMaterial（拖拽跟随）。

- 位置：`entry/src/main/ets/pages/Index.ets:76-101`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:278-292`（修改后；已对应 diff）
- 判据依据（fresh）：SegmentButton 与 SegmentButtonV2 各自通过 options 的 backgroundSystemMaterial 接入。
  - C16：SegmentButton 通过 SegmentButtonOptions 中的 backgroundSystemMaterial 字段设置沉浸光感效果；SegmentButtonV2 通过各类分段按钮 options 参数中的 backgroundSystemMaterial 字段设置。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：SegmentButtonOptions中的backgroundSystemMaterial字段 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：SegmentButtonV2 开启后支持选中项背景跟随手指拖拽。
  - C18：SegmentButtonV2 开启沉浸光感后，支持选中项背景跟随手指拖拽，否则不支持跟随手指拖拽。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：支持选中项背景跟随手指拖拽 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

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
| runtime | 是 | passed | 应用安装拉起成功；导航断言命中页面标题与底部操作块区块；组件树包含全部六大目标区块（Button/Select/Toggle/Slider/ChipGroup/SegmentButton）及其材质入口组件，运行结构符合判据预期。 |
| visual | 是 | inconclusive | 模型判图：判图模型无法读取截图（当前环境不支持图片输入），用户选择跳过视觉判定；组件树仅能证明目标组件已渲染挂载，无法证明材质通透质感、弹性形变与流光反馈的视觉效果，视觉层保持待人工观察。 |

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
- after：`c2c94a8b9d855fa95d2c346475058d7a6d17072922c50804b936b5b2b613a9fc`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,304 @@
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
+import {
+  uiMaterial,
+  ChipGroup,
+  ChipGroupItemOptions,
+  IconGroupSuffix,
+  SegmentButton,
+  SegmentButtonOptions,
+  SegmentButtonV2ItemOptions,
+  SegmentButtonV2Items,
+  CapsuleSegmentButtonV2
+} from '@kit.ArkUI';
+
+@Entry
+@Component
+struct Index {
+  @State switchOn: boolean = true;
+  @State toggleBtnOn: boolean = false;
+  @State sliderValue: number = 40;
+  @State segSelected: number[] = [0];
+  @State segV2Selected: number = 0;
+
+  private isMaterialSupported: boolean = uiMaterial.isImmersiveMaterialSupported();
+  private materialLevel: uiMaterial.MaterialLevel = uiMaterial.getGlobalMaterialLevel();
+
+  private buttonThemeMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
+    interactive: true,
+    lightEffect: {}
+  });
+
+  private buttonCustomLightMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.THIN,
+    interactive: true,
+    lightEffect: { color: '#80FFD6AA' }
+  });
+
+  private selectButtonMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
+    interactive: true,
+    lightEffect: {}
+  });
+
+  private selectMenuMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.THICK
+  });
+
+  private switchMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.THIN
+  });
+
+  private sliderMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
+    interactive: true,
+    lightEffect: {}
+  });
+
+  private chipNormalMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.ULTRA_THIN
+  });
+
+  private chipSelectedMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.THICK
+  });
+
+  private chipIconMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.THIN
+  });
+
+  private chipItems: ChipGroupItemOptions[] = [
+    { label: { text: '推荐' } },
+    { label: { text: '热榜' } },
+    { label: { text: '关注' } },
+    { label: { text: '视频' } }
+  ];
+
+  @State segOptions: SegmentButtonOptions = SegmentButtonOptions.capsule({
+    buttons: [
+      { text: '日' },
+      { text: '周' },
+      { text: '月' }
+    ],
+    multiply: false,
+    fontColor: $r('sys.color.font_secondary'),
+    selectedFontColor: $r('sys.color.font_primary'),
+    backgroundSystemMaterial: new uiMaterial.ImmersiveMaterial({
+      style: uiMaterial.ImmersiveStyle.THIN
+    })
+  });
+
+  private segV2ItemOptions: SegmentButtonV2ItemOptions[] = [
+    { text: '列表' },
+    { text: '卡片' }
+  ];
+
+  private segV2Items: SegmentButtonV2Items = new SegmentButtonV2Items(this.segV2ItemOptions);
+
+  private segV2Material: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
+    style: uiMaterial.ImmersiveStyle.THIN
+  });
+
+  @Builder
+  SectionTitle(title: string, subtitle: string) {
+    Column({ space: 4 }) {
+      Text(title)
+        .fontSize(20)
+        .fontWeight(FontWeight.Bold)
+        .fontColor(Color.White)
+      Text(subtitle)
+        .fontSize(12)
+        .fontColor('#B3FFFFFF')
+    }
+    .alignItems(HorizontalAlign.Start)
+    .width('100%')
+  }
+
+  @Builder
+  ChipGroupSuffix() {
+    IconGroupSuffix({
+      items: [
+        {
+          icon: { src: $r('app.media.startIcon'), size: { width: 16, height: 16 } },
+          action: () => {
+          }
+        }
+      ],
+      iconBackgroundSystemMaterial: this.chipIconMaterial
+    })
+  }
+
+  build() {
+    Stack() {
+      Column()
+        .width('100%')
+        .height('100%')
+        .linearGradient({
+          angle: 200,
+          colors: [
+            ['#0A2A6B', 0.0],
+            ['#1E6FD9', 0.35],
+            ['#3FBF9F', 0.7],
+            ['#F2E8C9', 1.0]
+          ]
+        })
+
+      Scroll() {
+        Column({ space: 28 }) {
+          Column({ space: 8 }) {
+            Text('沉浸光感 · 按钮与选择类组件')
+              .fontSize(24)
+              .fontWeight(FontWeight.Bold)
+              .fontColor(Color.White)
+            Text(`设备支持沉浸式材质: ${this.isMaterialSupported} ｜ 材质等级: ${this.materialLevel}`)
+              .fontSize(12)
+              .fontColor('#D9FFFFFF')
+          }
+          .alignItems(HorizontalAlign.Center)
+          .width('100%')
+
+          Column({ space: 12 }) {
+            this.SectionTitle('按钮 Button', '未设置颜色属性时默认生效主题色材质；按压弹性形变 + 流光反馈')
+            Row({ space: 14 }) {
+              Button('主题色')
+                .fontColor($r('sys.color.font_primary'))
+                .systemMaterial(this.buttonThemeMaterial)
+              Button('自定义流光')
+                .fontColor($r('sys.color.font_primary'))
+                .systemMaterial(this.buttonCustomLightMaterial)
+              Button('禁用态')
+                .enabled(false)
+                .fontColor($r('sys.color.font_secondary'))
+                .systemMaterial(this.buttonThemeMaterial)
+            }
+          }
+          .width('100%')
+
+          Column({ space: 12 }) {
+            this.SectionTitle('下拉按钮 Select', '按钮 systemMaterial 与菜单 menuSystemMaterial 相互独立')
+            Row({ space: 16 }) {
+              Select([
+                { value: '全部' },
+                { value: '图片' },
+                { value: '视频' },
+                { value: '文档' }
+              ])
+                .selected(0)
+                .value('按钮+菜单均开启')
+                .fontColor($r('sys.color.font_primary'))
+                .selectedOptionFontColor($r('sys.color.font_emphasize'))
+                .systemMaterial(this.selectButtonMaterial)
+                .menuSystemMaterial(this.selectMenuMaterial)
+
+              Select([
+                { value: '全部' },
+                { value: '图片' },
+                { value: '视频' }
+              ])
+                .selected(0)
+                .value('菜单已单独关闭')
+                .fontColor($r('sys.color.font_primary'))
+                .systemMaterial(this.selectButtonMaterial)
+                .menuSystemMaterial(uiMaterial.Material.empty)
+            }
+          }
+          .width('100%')
+
+          Column({ space: 12 }) {
+            this.SectionTitle('开关 Toggle', 'Switch 材质参数仅作开关标记；Material.empty 单独关闭')
+            Row({ space: 20 }) {
+              Column({ space: 6 }) {
+                Toggle({ type: ToggleType.Switch, isOn: this.switchOn })
+                  .systemMaterial(this.switchMaterial)
+                  .onChange((isOn: boolean) => {
+                    this.switchOn = isOn;
+                  })
+                Text('默认开启')
+                  .fontSize(11)
+                  .fontColor('#D9FFFFFF')
+              }
+
+              Column({ space: 6 }) {
+                Toggle({ type: ToggleType.Switch, isOn: false })
+                  .systemMaterial(uiMaterial.Material.empty)
+                Text('empty 关闭')
+                  .fontSize(11)
+                  .fontColor('#D9FFFFFF')
+              }
+
+              Column({ space: 6 }) {
+                Toggle({ type: ToggleType.Button, isOn: this.toggleBtnOn })
+                  .systemMaterial(this.switchMaterial)
+                  .onChange((isOn: boolean) => {
+                    this.toggleBtnOn = isOn;
+                  })
+                Text('Button 形态')
+                  .fontSize(11)
+                  .fontColor('#D9FFFFFF')
+              }
+            }
+          }
+          .width('100%')
+
+          Column({ space: 12 }) {
+            this.SectionTitle('滑动条 Slider', '材质参数仅作开关标记；DEFAULT 滑块 + 非 NONE 样式时交互反馈生效')
+            Slider({
+              value: this.sliderValue,
+              min: 0,
+              max: 100,
+              step: 1,
+              style: SliderStyle.OutSet
+            })
+              .width('90%')
+              .blockStyle({ type: SliderBlockType.DEFAULT })
+              .trackColor($r('sys.color.comp_divider'))
+              .selectedColor($r('sys.color.brand'))
+              .systemMaterial(this.sliderMaterial)
+              .onChange((value: number) => {
+                this.sliderValue = value;
+              })
+            Text(`当前进度: ${this.sliderValue.toFixed(0)}`)
+              .fontSize(12)
+              .fontColor('#D9FFFFFF')
+          }
+          .width('100%')
+
+          Column({ space: 12 }) {
+            this.SectionTitle('子页签 ChipGroup', '普通 / 选中 / 图标三种材质入口')
+            ChipGroup({
+              items: this.chipItems,
+              multiple: false,
+              backgroundSystemMaterial: this.chipNormalMaterial,
+              selectedBackgroundSystemMaterial: this.chipSelectedMaterial
+            }) {
+              this.ChipGroupSuffix()
+            }
+          }
+          .width('100%')
+
+          Column({ space: 12 }) {
+            this.SectionTitle('操作块 SegmentButton', '胶囊单选接入材质；V2 开启后选中项背景跟随手指拖拽')
+            SegmentButton({
+              options: this.segOptions,
+              selectedIndexes: this.segSelected
+            })
+            CapsuleSegmentButtonV2({
+              items: this.segV2Items,
+              selectedIndex: this.segV2Selected!,
+              backgroundSystemMaterial: this.segV2Material
+            })
+          }
+          .width('100%')
+        }
+        .width('100%')
+        .padding({ left: 20, right: 20, top: 48, bottom: 40 })
+        .alignItems(HorizontalAlign.Center)
+      }
+      .scrollBar(BarState.Off)
+      .width('100%')
+      .height('100%')
+    }
+    .width('100%')
+    .height('100%')
+  }
+}
+
```

### 待验证

- PENDING-001 [visual] 模型判图：判图模型无法读取截图（当前环境不支持图片输入），用户选择跳过视觉判定；组件树仅能证明目标组件已渲染挂载，无法证明材质通透质感、弹性形变与流光反馈的视觉效果，视觉层保持待人工观察。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\3\ohos-feature-engineering\evidence\7470b94c-db36-455e-9d07-087def2cbf06\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\3\ohos-feature-engineering\evidence\7470b94c-db36-455e-9d07-087def2cbf06\device-run.log
- EVID-006 [device_log] 导航步骤 swipe-mid：坐标滑动。 — D:\HW\testproject\complete\3\ohos-feature-engineering\evidence\7470b94c-db36-455e-9d07-087def2cbf06\nav-swipe-mid.log
- EVID-007 [device_log] 导航步骤 swipe-bottom：坐标滑动。 — D:\HW\testproject\complete\3\ohos-feature-engineering\evidence\7470b94c-db36-455e-9d07-087def2cbf06\nav-swipe-bottom.log
- EVID-008 [device_log] 导航编排：passed
- EVID-009 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\3\ohos-feature-engineering\evidence\images\ea7f28abf7073e83034e201da3a5a1605eba88b53bbe6e5ec528d338feed149b.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/ea7f28abf7073e83034e201da3a5a1605eba88b53bbe6e5ec528d338feed149b.png>)

- EVID-010 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\3\ohos-feature-engineering\evidence\images\3e3495b694c0cf19695146e412718427eba4f45830b5f57405ee40e90b6ea380.png

![判图引用的截图。](<evidence/images/3e3495b694c0cf19695146e412718427eba4f45830b5f57405ee40e90b6ea380.png>)

- EVID-011 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\3\ohos-feature-engineering\evidence\2b290e26-61b3-48a8-8319-452f32c5829b\nav-swipe-bottom.log
- EVID-012 [visual_judgment] 判图模型无法读取截图（当前环境不支持图片输入），用户选择跳过视觉判定；组件树仅能证明目标组件已渲染挂载，无法证明材质通透质感、弹性形变与流光反馈的视觉效果，视觉层保持待人工观察。
