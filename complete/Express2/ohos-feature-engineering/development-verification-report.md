# 代码开发验证报告

- 工程：D:\HW\testproject\complete\Express2
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| tab沉浸光感设置自动反色、材质赋色rgba(255, 0, 0, 0.2)、材质交互效果、标题栏右侧圆形、沉浸材质阴影效果 | arkui-api26 | passed |

## tab沉浸光感设置自动反色、材质赋色rgba(255, 0, 0, 0.2)、材质交互效果、标题栏右侧圆形、沉浸材质阴影效果

- 判据策略：fresh，冻结于 2026-09-11T08:11:49.029Z

- 总结果：`passed`
- 能力：immersive-light
- 技术路线：arkui-api26

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：现有工程
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-S006-C01：在 TabBar 沉浸材质 ImmersiveOptions 中设置 materialColor: 'rgba(255, 0, 0, 0.2)'（带透明度的 rgba 颜色，与官网示例一致，不遮挡材质滤镜）。
  - 官网冻结来源：common:81-81，片段 SHA-256：`868d638408afd923be6ecd1b39baac730749a9dec70fd59c602b9554fbd49e64`
- IL-S006-C02：materialColor 对全档位设备生效（低算力降级为背景色），同一处设置覆盖，无需差异化代码。
  - 官网冻结来源：common:83-83，片段 SHA-256：`b1babdda8f8f39041fb50ed62224a99ee641b112a8ebc44f0737497db8bd691e`
- IL-S006-C03：在 TabBar 材质中开启 colorInvert: true，使页签子节点文字颜色自动调整为材质下方背景色的反色。
  - 官网冻结来源：common:7-7，片段 SHA-256：`0380209d2936753c32f77cf2b96a6a43ea732a9977465164e57a6b50d251a6a0`
- IL-S006-C04：TabBar 材质 style 保持 THIN（满足 ULTRA_THIN/THIN 反色前提），通过 barFloatingStyle.systemMaterial 设置材质；工程 Tabs 已配置 barOverlap(true)（手机模式）+ BarPosition.End + vertical(false)。
  - 官网冻结来源：common:60-70，片段 SHA-256：`2d53a4afe3d41554ec05e8972c4c60d6d913095f91063ec7eaf1db605206c1cd`
- IL-S006-C05：在 TabBar 材质中设置 interactive: true 开启按压弹性形变。
  - 官网冻结来源：common:138-138，片段 SHA-256：`4f8cdf7e47d1822ccc5faf5b86d345e68e18b99183e853f18612e3da1de70b09`
- IL-S006-C06：在 TabBar 材质中传入 lightEffect: {} 有效对象启用点光源流光（默认 Color.White 流光颜色）。
  - 官网冻结来源：common:140-140，片段 SHA-256：`64769133539c0dc68dafbdba212de34ee1dba1e9069fb54f08c525cc21e8a0b8`
- IL-S006-C07：沉浸材质添加阴影效果使用材质自带阴影：显式设置 applyShadow: true，且不同时设置通用 .shadow() 属性，避免冲突与重复阴影。
  - 官网冻结来源：common:193-193，片段 SHA-256：`7ba2a9249648ae82ccfcaa02d0072a9d59990022a3230ef5ad408b7df92877f8`
- IL-S006-C08：标题栏与页签材质均设置 applyShadow: true（默认值显式化），材质阴影固定生效并优先于 shadow 通用属性；全工程不新增 .shadow() 调用。
  - 官网冻结来源：ui-material-api:546-552，片段 SHA-256：`4d20792a29cb2f7f98e32bfb028aae6473d184f4a1a00d25ecf3bbe82efc950c`
- IL-S006-C09：interactive: true（默认 false），对全档位算力设备生效，无需按设备差异化。
  - 官网冻结来源：ui-material-api:564-570，片段 SHA-256：`6cc78c8bb32e2ace560d46ff51e948d851186651f6cfbe6f5816d64759147ae8`
- IL-S006-C10：lightEffect 传入空对象 {}（LightEffectOptions 有效对象）启用；不传 null/undefined；高算力和中算力设备生效为系统行为。
  - 官网冻结来源：ui-material-api:582-586，片段 SHA-256：`c05689f845becc787683b87e4840e1bd279e0d7dbc82f21e01d1ed1dd88e5ad6`
- IL-S006-C11：代码侧满足可控条件：THIN 薄材质 + colorInvert:true；设备档位与系统强弱配置由系统侧决定，不做硬编码假设。
  - 官网冻结来源：faq:256-264，片段 SHA-256：`7903c9fea59ab0668cfc53f3f6ca7e006b2e698f9ee43a3f581cf9995a1fe391`
- IL-S006-C12：将 TabBar 选中文字硬编码色 '#0A59F7' 改为系统资源色 $r('sys.color.brand')（官网示例反色支持色），未选中色已是 $r('sys.color.icon_secondary') 资源色，使 colorInvert 反色可观察生效。
  - 官网冻结来源：faq:264-264，片段 SHA-256：`0f5da08fafb98df65482a9394d9d42081f0d2b78f2f7e378a4b983942894fc3b`
- IL-S006-C13：复用工程现有 Tabs 悬浮三条件：手机模式 barOverlap(!isTabVertical)=true、vertical(false)、barPosition(End)，systemMaterial 经 barFloatingStyle 生效；大屏侧栏模式悬浮样式不生效为系统定义行为。
  - 官网冻结来源：component:33-35，片段 SHA-256：`9a0409209ec18cebc1641df0abb723d9a8df4edfa99ad8a0b55fae343299b433`
- IL-S006-C14：知晓性约束：lightEffect 启用后页签默认点击态/悬浮态反馈由光感交互反馈替代，无需额外保留旧按压样式。
  - 官网冻结来源：component:125-125，片段 SHA-256：`964dd3f52b4512f58770ce42259a38e9490b85f73ea5bfbe2a8bea76102de596`
- IL-S006-C15：参考官网标题栏示例：在标题栏右侧经 CommonTitle.rightBuilder 放置 50x50、borderRadius(25) 圆形 Column，通过 AttributeModifier 设置 ULTRA_THIN 材质 + applyShadow:true（沉浸材质阴影）+ interactive:true；按用户需求使用材质自带阴影而非 applyShadow:false+自定义 shadow。
  - 官网冻结来源：common:203-225，片段 SHA-256：`af2ad057a749047eb20108074b90790ef7317b11aa886f2f6a3b5c3a958fb8c2`
- IL-S006-C16：材质均通过 AttributeModifier.applyNormalAttribute 调用 systemMaterial/barFloatingStyle，在组件其他样式属性（尺寸、圆角等）之后应用，满足顺序建议。
  - 官网冻结来源：faq:270-272，片段 SHA-256：`333b731a178915a6fc1244b1a8ef569510c2c566d49451dda3f96b605fa45652`

#### S01 · 已实施

ImmersiveCompat.ets：TabBar 材质增加 colorInvert/materialColor/interactive/lightEffect/applyShadow；标题栏材质显式 applyShadow:true；新增 titleBarCircle 材质 modifier。

- 位置：`products/entry/src/main/ets/utils/ImmersiveCompat.ets:9-76`（修改后；已对应 diff）
- 位置：`products/entry/src/main/ets/utils/ImmersiveCompat.ets:11-53`（修改前；已对应 diff）
- 判据依据（fresh）：materialColor 带透明度 rgba
  - IL-S006-C01：materialColor 参数为材质滤镜再混合一层纯色效果，需要带有一定的透明度；传入纯不透明颜色（如 Color.Red 或 '#FFFF0000'）会遮挡材质滤镜效果。官网赋色示例即为 Tabs 页签材质设置 materialColor: 'rgba(255, 0, 0, 0.2)'。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：该颜色需要带有一定的透明度，传入纯不透明颜色（如Color.Red或'#FFFF0000'）会遮挡材质滤镜效果 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：colorInvert:true 自动反色
  - IL-S006-C03：开启 ImmersiveOptions 中的 colorInvert 自动反色功能后，组件子节点中的文字颜色会自动调整为沉浸式系统材质下方背景色的反色，确保文字始终可读。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：组件子节点中的文字颜色会自动调整为沉浸式系统材质下方背景色的反色 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：THIN 样式反色前提
  - IL-S006-C04：为 TabBar 设置 colorInvert 为 true 时需配合 ULTRA_THIN 或 THIN 的 style 才能反色；官网示例为 BarPosition.End 的 Tabs 通过 barFloatingStyle 的 systemMaterial 设置 ULTRA_THIN + colorInvert:true 材质，并设置 barOverlap(true)。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：且需配合ULTRA_THIN或THIN的style才能反色 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：interactive:true 交互形变
  - IL-S006-C05：通过 interactive 开启交互形变，组件在按压时产生弹性形变，松手后自动恢复，增强交互的视觉反馈。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：组件在按压时产生弹性形变，松手后自动恢复 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：lightEffect:{} 点光源
  - IL-S006-C06：lightEffect 传入有效对象即启用点光源，用户手指触摸组件时会产生流光跟随效果；传入 null 或 undefined 则不启用；对象中的 color 字段自定义流光颜色，默认值为 Color.White。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：lightEffect传入有效对象即启用，传入null或undefined则不启用 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：applyShadow:true 材质阴影
  - IL-S006-C07：沉浸式系统材质默认自带阴影效果（applyShadow 为 true），材质阴影固定生效并优先于 shadow 通用属性，此时自定义的 shadow 设置不会生效；如需使用自定义阴影，将 applyShadow 置为 false 后再设置 shadow。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：沉浸式系统材质默认自带阴影效果 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：三处材质显式 applyShadow
  - IL-S006-C08：applyShadow 为 true 时材质中的阴影效果固定生效，优先于 shadow 通用属性；为 false 时 shadow 通用属性生效、材质阴影不生效；该参数对支持沉浸式材质的所有档位算力设备生效，默认值 true。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：是否添加材质的阴影效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：interactive 全档位
  - IL-S006-C09：interactive 用于启用交互形变效果（用户交互时产生形变的视觉反馈），true 启用、false 不启用；该参数对支持沉浸式材质的所有档位的算力设备的显示效果生效，默认值 false。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：是否启用交互形变效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：lightEffect 对象启用
  - IL-S006-C10：lightEffect 传入 LightEffectOptions 对象时启用光感交互反馈，传入 null 时显式禁用，不传入默认为 undefined；该参数仅对支持沉浸式材质的高算力和中算力设备的显示效果生效。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：传入LightEffectOptions对象时启用光感交互反馈 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S02 · 已实施

MainEntry.ets：标题栏经 CommonTitle.rightBuilder（箭头函数包装保留 this）添加右侧圆形（50x50/borderRadius 25）并绑定 titleBarCircle 沉浸材质（阴影+交互）。

- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:152-181`（修改后；已对应 diff）
- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:160-172`（修改前；已对应 diff）
- 判据依据（fresh）：参考官网标题栏圆形示例
  - IL-S006-C15：官网自定义阴影示例：在标题栏 Row 内放置 50x50、borderRadius(25) 的 Column，通过 systemMaterial 设置 ULTRA_THIN 材质、applyShadow:false、interactive:true，再设置 shadow（如 { radius: 100, color: Color.Pink }）实现标题栏右侧圆形材质与自定义阴影。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：如需使用自定义阴影，将applyShadow置为false后再设置shadow · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 判据依据（fresh）：圆形材质 applyShadow:true
  - IL-S006-C08：applyShadow 为 true 时材质中的阴影效果固定生效，优先于 shadow 通用属性；为 false 时 shadow 通用属性生效、材质阴影不生效；该参数对支持沉浸式材质的所有档位算力设备生效，默认值 true。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：是否添加材质的阴影效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 工程配套选择：修复 jscrash：@BuilderParam 跨组件执行 this 丢失，箭头函数包装保留 MainEntry 上下文

#### S03 · 已实施

MainEntry.ets：tabBarBuilder 选中文字颜色改为系统资源色 sys.color.brand。

- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:182-195`（修改后；已对应 diff）
- 判据依据（fresh）：反色仅对资源色生效
  - IL-S006-C12：自动反色仅对通过资源接口设置的颜色值生效（Text/Button/SymbolGlyph 的 fontColor、Image 的 fillColor、BottomTabBarStyle 的 labelStyle 与 iconStyle 颜色等）；使用代码中硬编码的颜色值（如 Color.White、'#FFFFFFFF'）不会触发自动反色。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：使用代码中硬编码的颜色值 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：反色条件配合资源色
  - IL-S006-C11：自动反色功能的生效需要同时满足以下条件：设备算力档位需为高算力或中算力（低算力设备不产生视觉效果差异）；系统沉浸光感的强弱配置影响反色触发阈值，材质越薄、沉浸光感越强越容易触发；自动反色仅对通过资源接口设置的颜色值生效。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：自动反色功能的生效需要同时满足以下条件 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`

#### S04 · 部分实施

核对工程现有 Tabs 悬浮三条件与 barFloatingStyle 接入保持满足（existing，未修改该区段）。

- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:115-125`（修改后；未确认变更）
- 判据依据（fresh）：悬浮三条件已满足
  - IL-S006-C13：底部页签支持通过 barFloatingStyle 属性中 FloatingTabBarStyle 的 systemMaterial 字段设置 TabBar 背板的沉浸光感效果；悬浮样式仅在 barOverlap 为 true、vertical 为 false、barPosition 为 BarPosition.End 时生效，三个条件需同时满足，否则 systemMaterial 设置不生效。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：三个条件需同时满足，否则systemMaterial设置不生效 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：materialColor 全档位单处设置
  - IL-S006-C02：materialColor 参数对所有档位的算力设备均生效：高算力和中算力设备上为材质滤镜再混合一层纯色效果；低算力设备上作为背景色 backgroundColor 属性值。
    - [沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability) · 锚点：materialColor参数对所有档位的算力设备均生效 · SHA-256：`cb214d728b234428ffbe58ac10792d0d3cd9b1b4ea8664fa7da9fc5e45b5cd57`
- 待确认：products/entry/src/main/ets/pages/MainEntry.ets:115-125 无可对应的基线差异，实施情况待确认。

#### S05 · 已实施

核对材质应用顺序（AttributeModifier 在样式属性之后）与光感反馈替代默认按压/悬浮态（existing 行为核对）。

- 位置：`products/entry/src/main/ets/utils/ImmersiveCompat.ets:22-36`（修改后；已对应 diff）
- 判据依据（fresh）：systemMaterial 经 modifier 后置应用
  - IL-S006-C16：通过通用属性 systemMaterial 设置沉浸式系统材质时，应将 systemMaterial 放在其他样式属性（如背景色、边框、阴影等）之后设置；放在其他样式属性之前可能导致材质效果优先级与预期不符。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：放在其他样式属性（如背景色、边框、阴影等）之后设置 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：光感反馈替代默认按压态
  - IL-S006-C14：当沉浸光感启用了光感交互反馈效果（lightEffect）时，组件默认的点击态和悬浮态视觉反馈不再展示，由材质的光感交互反馈效果替代。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：由材质的光感交互反馈效果替代 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

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
| runtime | 是 | passed | 导航编排断言命中主页（首页/查快递/福利/我的 tab 全部渲染，组件树 Tabs/TabContent 在场，无崩溃）；用户确认 tab 交互弹性形变与流光跟随生效。 |
| visual | 是 | passed | 模型判图：用户明确观察确认：底部 TabBar 呈半透明红色调（materialColor rgba(255,0,0,0.2) 赋色可见，未遮挡材质滤镜）；标题栏右侧圆形（50x50 沉浸材质）可见；标题栏/TabBar 沉浸材质阴影可见；按压/触摸 tab 有弹性形变与流光跟随（interactive+lightEffect 生效）。 |

### 代码变化

#### products/entry/src/main/ets/utils/ImmersiveCompat.ets

- 状态：modified
- before：`d88776d8cf64838babab3eb77513fcedd9c11971aa3a6b8c13709e294bc36c00`
- after：`5ae8d8c182bf70d7decfede3c87efbcf0382d55eeb6f5e076279f00c80c3c3e9`

```diff
--- a/products/entry/src/main/ets/utils/ImmersiveCompat.ets
+++ b/products/entry/src/main/ets/utils/ImmersiveCompat.ets
@@ -8,49 +8,69 @@
  */
 export interface ImmersiveModifierHolder {
   titleBar: AttributeModifier<ColumnAttribute>;
-  tabBar: AttributeModifier<TabsAttribute>;
-}
-
-class TitleBarMaterialModifier implements AttributeModifier<ColumnAttribute> {
-  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;
-
-  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
-    this.material = material;
-  }
-
-  applyNormalAttribute(instance: ColumnAttribute): void {
-    instance.systemMaterial(this.material);
-  }
-}
-
-class TabBarMaterialModifier implements AttributeModifier<TabsAttribute> {
-  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;
-
-  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
-    this.material = material;
-  }
-
-  applyNormalAttribute(instance: TabsAttribute): void {
-    instance.barFloatingStyle({ systemMaterial: this.material });
-  }
-}
-
-export function createImmersiveModifiers(): ImmersiveModifierHolder | undefined {
-  let supported = false;
-  try {
-    supported = deviceInfo.sdkApiVersion >= 26 && uiMaterial.isImmersiveMaterialSupported();
-  } catch (err) {
-    supported = false;
-  }
-  if (!supported) {
-    return undefined;
-  }
-  return {
-    titleBar: new TitleBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
-      style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
-    })),
-    tabBar: new TabBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
-      style: uiMaterial.ImmersiveStyle.THIN,
+  titleBarCircle: AttributeModifier<ColumnAttribute>;
+  tabBar: AttributeModifier<TabsAttribute>;
+}
+
+class TitleBarMaterialModifier implements AttributeModifier<ColumnAttribute> {
+  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;
+
+  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
+    this.material = material;
+  }
+
+  applyNormalAttribute(instance: ColumnAttribute): void {
+    instance.systemMaterial(this.material);
+  }
+}
+
+class TabBarMaterialModifier implements AttributeModifier<TabsAttribute> {
+  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;
+
+  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
+    this.material = material;
+  }
+
+  applyNormalAttribute(instance: TabsAttribute): void {
+    instance.barFloatingStyle({ systemMaterial: this.material });
+  }
+}
+
+export function createImmersiveModifiers(): ImmersiveModifierHolder | undefined {
+  let supported = false;
+  try {
+    supported = deviceInfo.sdkApiVersion >= 26 && uiMaterial.isImmersiveMaterialSupported();
+  } catch (err) {
+    supported = false;
+  }
+  if (!supported) {
+    return undefined;
+  }
+  return {
+    titleBar: new TitleBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
+      style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
+      // 沉浸材质自带阴影效果，优先于通用 shadow 属性
+      applyShadow: true,
+    })),
+    // 标题栏右侧圆形：ULTRA_THIN 材质 + 材质阴影 + 按压交互形变
+    titleBarCircle: new TitleBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
+      style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
+      applyShadow: true,
+      interactive: true,
+    })),
+    tabBar: new TabBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
+      // THIN 薄材质：满足自动反色的样式前提
+      style: uiMaterial.ImmersiveStyle.THIN,
+      // 开启自动反色：子节点资源颜色随背景反色
+      colorInvert: true,
+      // 材质赋色：带透明度的红色，不遮挡材质滤镜
+      materialColor: 'rgba(255, 0, 0, 0.2)',
+      // 交互形变：按压弹性形变
+      interactive: true,
+      // 点光源：触摸流光跟随（默认白色）
+      lightEffect: {},
+      // 沉浸材质阴影效果
+      applyShadow: true,
     })),
     // 标题栏右侧圆形：ULTRA_THIN 材质 + 材质阴影 + 按压交互形变
     titleBarCircle: new TitleBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
```

#### products/entry/src/main/ets/pages/MainEntry.ets

- 状态：modified
- before：`3ae1da25ae1f2338a84e16b45f071d226d6d9de44541d6dd430380b5e50d3194`
- after：`0ae759ceb92b67721353089f2b18459e2d4e1fc7a0b1085b1ffa2fb35bdbe458`

```diff
--- a/products/entry/src/main/ets/pages/MainEntry.ets
+++ b/products/entry/src/main/ets/pages/MainEntry.ets
@@ -157,19 +157,35 @@
         title: this.vm.tabList[this.vm.curIndex].label,
         titleHeight: 80,
         showBackBtn: false,
-      })
-    }
-    .attributeModifier(this.vm.immersiveModifierHolder?.titleBar)
-  }
-
-  @Builder
-  tabBarBuilder(index: number, item: TabListItem) {
-    Column() {
-      Image(this.vm.curIndex === index ? item.iconChecked : item.icon)
-        .width(24)
-        .height(24);
-      Text(item.label)
-        .fontColor(this.vm.curIndex === index ? '#0A59F7' :
+        // 箭头函数包装保留 MainEntry 的 this，避免 @BuilderParam 跨组件执行时上下文丢失
+        rightBuilder: () => {
+          this.titleRightBuilder();
+        },
+      })
+    }
+    .attributeModifier(this.vm.immersiveModifierHolder?.titleBar)
+  }
+
+  // 标题栏右侧圆形：沉浸光感材质（材质阴影 + 按压交互形变）
+  @Builder
+  titleRightBuilder() {
+    Column()
+      .width(50)
+      .height(50)
+      .borderRadius(25)
+      .justifyContent(FlexAlign.Center)
+      .attributeModifier(this.vm.immersiveModifierHolder?.titleBarCircle)
+  }
+
+  @Builder
+  tabBarBuilder(index: number, item: TabListItem) {
+    Column() {
+      Image(this.vm.curIndex === index ? item.iconChecked : item.icon)
+        .width(24)
+        .height(24);
+      Text(item.label)
+        // 选中色使用系统资源色，配合材质 colorInvert 自动反色
+        .fontColor(this.vm.curIndex === index ? $r('sys.color.brand') :
       .width(50)
       .height(50)
       .borderRadius(25)
```

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\Express2\ohos-feature-engineering\evidence\857e92c5-c29b-44d3-866d-acc5cbb4397f\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\Express2\ohos-feature-engineering\evidence\857e92c5-c29b-44d3-866d-acc5cbb4397f\device-run.log
- EVID-006 [device_log] 导航编排：passed
- EVID-007 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\Express2\ohos-feature-engineering\evidence\images\9db5b0780befa3ffd9e4e5f0e9ec8745a8a5b0521f014470df975360876fd05d.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/9db5b0780befa3ffd9e4e5f0e9ec8745a8a5b0521f014470df975360876fd05d.png>)

- EVID-008 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\Express2\ohos-feature-engineering\evidence\images\910443936ff34626253783fbdc1e7077e04ba3e2842695646ac72b0da9bd8d5c.png

![判图引用的截图。](<evidence/images/910443936ff34626253783fbdc1e7077e04ba3e2842695646ac72b0da9bd8d5c.png>)

- EVID-009 [visual_judgment] 用户明确观察确认：底部 TabBar 呈半透明红色调（materialColor rgba(255,0,0,0.2) 赋色可见，未遮挡材质滤镜）；标题栏右侧圆形（50x50 沉浸材质）可见；标题栏/TabBar 沉浸材质阴影可见；按压/触摸 tab 有弹性形变与流光跟随（interactive+lightEffect 生效）。
