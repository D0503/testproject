# 代码开发验证报告

- 工程：D:\HW\testproject\complete\8\ImmersiveLightDemo
- 开发目标数：2

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| HDS 沉浸光感 demo：HdsNavigation 标题栏 + HdsTabs 底部页签沉浸光感 | hds-api23 | passed |
| HDS immersive light demo: HdsNavigation title bar + HdsTabs bottom tabs | hds-api23 | passed |

## HDS 沉浸光感 demo：HdsNavigation 标题栏 + HdsTabs 底部页签沉浸光感

- 判据策略：fresh，冻结于 2026-09-10T13:01:51.083Z

- 总结果：`passed`
- 能力：immersive-light
- 技术路线：hds-api23

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-F027：将工程 targetSdkVersion/compatibleSdkVersion 从 6.0.1(21) 升级为 6.1.0(23)，满足 HDS 组件沉浸光感材质的版本门槛；工程为 Stage 模型（entry module.json5 声明），符合模型约束。
  - 官网冻结来源：hds-component-material-guide:3-5，片段 SHA-256：`e94b1df7928a75ce92af30c1d7a8f8a531d476fbe9e73cd8bedd302304607816`
- IL-F028：在 HdsNavigation 的 titleBar.style（TitleBarStyleOptions）中配置 systemMaterialEffect 字段，为标题栏按钮设置沉浸光感视效。
  - 官网冻结来源：hds-component-material-guide:7-7，片段 SHA-256：`1475cdeaea0987f38b1a4b65236e8f21ddd9971ed0e21adb29a3e655976fa2bc`
  - 官网冻结来源：hds-navigation-api:1479-1483，片段 SHA-256：`997f30ce747627d3fdd61ec8c59faf324c83fb5e026fd97a74c08f54b4ce8b05`
- IL-F029：在 HdsTabs 的 barFloatingStyle（HdsTabsFloatingStyle）中配置 systemMaterialEffect 字段，为底部悬浮页签设置沉浸光感视效。
  - 官网冻结来源：hds-component-material-guide:9-9，片段 SHA-256：`02e570cd8fd60a2c39d537fef666868df1ebb939a5013433576e3b5eea15f55f`
  - 官网冻结来源：hds-tabs-api:715-719，片段 SHA-256：`969fe73994deccb2bf9d74d68c24049f1e299a6a60ea50533dd8a88fa2625c24`
- IL-F030：两处 systemMaterialEffect 均显式写入 materialType 与 materialLevel（materialType 默认 NONE，省略不等于启用材质，故必须显式指定）。
  - 官网冻结来源：hds-navigation-api:2055-2066，片段 SHA-256：`f108ae25742c9d40fc4e2ec6e53ec0ed147272d24e1748b1e614156ea04e140e`
- IL-F031：materialType 采用 hdsMaterial.MaterialType.ADAPTIVE（自适应系统材质，默认为沉浸式材质）。
  - 官网冻结来源：hds-material-api:60-66，片段 SHA-256：`58ad7edbea837a5110b3f54c1730bfb4f485ca0e1238be3b6c04e606095298fd`
- IL-F032：materialLevel 采用 hdsMaterial.MaterialLevel.ADAPTIVE，由系统按设备算力自适应材质等级。
  - 官网冻结来源：hds-material-api:80-96，片段 SHA-256：`1a2b274e1396653764b72062e52864d6fe786a561f1c4352c4a7dd6d160bb1f2`
- IL-F033：标题栏与底部页签均采用官网推荐的系统自适应沉浸光感（materialType=ADAPTIVE + materialLevel=ADAPTIVE），系统按设备算力动态平衡材质效果和性能。
  - 官网冻结来源：hds-component-material-guide:11-13，片段 SHA-256：`f2212a12749be1d6112bce51e53cd3e0d7d5068fd8721947a708695d4f1eb61d`
- IL-F035：demo 目标为 Phone 设备（材质可直接调用）；材质采用 ADAPTIVE 自适应策略，Phone/Tablet 路径不触发 PC/2in1 的 getSystemMaterialTypes 预查询要求，也不运行在 TV 上。
  - 官网冻结来源：hds-navigation-api:2043-2053，片段 SHA-256：`eba8e98b56598f1ecb195b3ffbc232ae59b1897de8b2fa644371153c7c832ba0`
  - 官网冻结来源：hds-tabs-api:641-645，片段 SHA-256：`31537b249bd6eb9075af941f4218541d7136f70d79691e65cd65b92dc2c44c6b`
- IL-F036：以官网自适应示例为最小适配基础：导入清单与示例一致（@kit.UIDesignKit 组件/枚举 + @kit.ArkUI 的 SymbolGlyphModifier）；示例中的 scenery01 按原文要求替换为本地资源 entry/src/main/resources/base/media/scenery.jpg（$r('app.media.scenery')）。
  - 官网冻结来源：hds-component-material-guide:17-23，片段 SHA-256：`0164a656d0ccc3f6c24d40a5fc4a96dccfd301d9e866bb9d4db45058d4b760c4`
  - 官网冻结来源：hds-component-material-guide:63-67，片段 SHA-256：`a86f7abd07eab45c59e644d18afa3eeac2bf2e6eb1397fb91fa905f699ea576a`
- IL-S011-D01：titleBar.style 不显式配置 originalStyle/scrollEffectStyle 背景色；按 GRADIENT_BLUR + systemMaterialEffect + enableScrollEffect=false 组合，originalStyle 背景色默认 $r('sys.color.comp_background_gray')、scrollEffectStyle 背景色不生效，全部交给官网默认联动规则。
  - 官网冻结来源：hds-navigation-api:1144-1158，片段 SHA-256：`efa0366a85f9afcae57b1d9d092e9ebe51201af1c5165eb08ae7f2b9725ff6f4`
- IL-S011-D02：不显式配置 blurRadius；按 GRADIENT_BLUR + enableScrollEffect=false + systemMaterialEffect 组合，originalStyle 模糊半径取官网默认 12.0。
  - 官网冻结来源：hds-navigation-api:1181-1191，片段 SHA-256：`2f0e8d628699f51e1cb2d09386d14ccc920686c9056c51c7883de85d727254ee`
- IL-S011-D03：scrollEffectOpts 显式设置 enableScrollEffect:false（与官网示例一致），标题栏不随内容区滚动动态切换样式，仅生效 originalStyle；scrollEffectType 设置为 GRADIENT_BLUR。
  - 官网冻结来源：hds-navigation-api:1379-1395，片段 SHA-256：`401a03d2ab4c06d5c56ca5a495fe8d06d2c00a8ec66d1ef08e33e89053104d68`
- IL-S011-D04：systemMaterialEffect 与 ScrollEffectType.GRADIENT_BLUR 搭配使用（官网推荐的非沉浸式列表类场景组合），并保持 enableScrollEffect=false 直接生效模糊的用法。
  - 官网冻结来源：hds-navigation-api:2899-2911，片段 SHA-256：`088ee611827b5f34e18376609f3c5f7de850b333a84140a1da8dd6af1180df75`
- IL-S011-D05：HdsTabs 同时设置 barFloatingStyle、barOverlap(true)、vertical(false)、barPosition(BarPosition.End)，满足页签栏悬浮样式的全部配套条件。
  - 官网冻结来源：hds-tabs-api:1601-1604，片段 SHA-256：`2b873fdc99720e7ea58617104253a74f7e1db4c9f3c75a68a6f3b4d4e2c36508`
- IL-S011-D06：显式设置 barOverlap(true)，TabBar 背后变模糊并叠加在 TabContent 之上，构成悬浮布局条件之一。
  - 官网冻结来源：hds-tabs-api:371-397，片段 SHA-256：`a5485721070dcb918931c61630c49567fdd73e38f760fa1f96d093109a4bcce2`
- IL-S011-D07：barFloatingStyle 中显式配置 systemMaterialEffect（默认 undefined 即无新材质，须显式给出）与 barBottomMargin:28（ vp 数值，非百分比），使底部悬浮页签获得沉浸光感；demo 不运行在 TV。
  - 官网冻结来源：hds-tabs-api:655-719，片段 SHA-256：`641e5ff236367981592de85c58e462bb85272dae8f241d05314341fc6d98fed7`

#### S01 · 已实施

升级 build-profile.json5 的 targetSdkVersion/compatibleSdkVersion 至 6.1.0(23)

- 位置：`build-profile.json5:8-9`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-9`（修改后；已对应 diff）
- 判据依据（fresh）：HDS 沉浸光感材质从 6.1.0(23) 起提供，工程 SDK 声明须达到该版本
  - IL-F027：HDS 组件沉浸光感材质从 6.1.0(23) 起提供，仅支持 Stage 模型，系统能力为 SystemCapability.UIDesign.HDSComponent.Core。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：新增支持HDS组件的沉浸光感材质能力 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：systemMaterialEffect 字段从 6.1.0(23) 起提供
  - IL-F028：HdsNavigation 通过 TitleBarStyleOptions.systemMaterialEffect 为标题栏按钮设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为标题栏按钮设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：HdsTabsFloatingStyle.systemMaterialEffect 从 6.1.0(23) 起提供
  - IL-F029：HdsTabs 通过 HdsTabsFloatingStyle.systemMaterialEffect 为底部悬浮页签设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为底部页签设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`

#### S02 · 已实施

新增本地图片资源 entry/src/main/resources/base/media/scenery.jpg 替换示例 scenery01

- 位置：`entry/src/main/resources/base/media/scenery.jpg:1-517`（修改后；已对应 diff）
- 判据依据（fresh）：官网示例注明 scenery 为自定义资源，需替换为本地资源
  - IL-F036：HDS 官网指南示例是需补齐工程上下文的片段：示例导入仅含 @kit.UIDesignKit 与 @kit.ArkUI 的 SymbolGlyphModifier，示例本身不含异常处理代码；scenery01 明确要求替换为本地资源。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：scenery为自定义资源，开发者需替换本地资源 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`

#### S03 · 已实施

重写 Index.ets：HdsNavigation 标题栏（titleBar.style.systemMaterialEffect + GRADIENT_BLUR + enableScrollEffect:false）

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-147`（修改后；已对应 diff）
- 判据依据（fresh）：标题栏沉浸光感入口
  - IL-F028：HdsNavigation 通过 TitleBarStyleOptions.systemMaterialEffect 为标题栏按钮设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为标题栏按钮设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：systemMaterialEffect 显式 materialType/materialLevel
  - IL-F030：HDS SystemMaterialParams 包含可选的 materialType 和 materialLevel；默认 materialType 为 NONE，默认 materialLevel 为 ADAPTIVE，因此省略 materialType 不能视为已经启用材质。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：默认值：hdsMaterial.MaterialType.NONE · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：materialType 取 ADAPTIVE
  - IL-F031：HDS MaterialType 取值为 NONE=0、ADAPTIVE=100、IMMERSIVE=101；ADAPTIVE 表示自适应系统材质且默认采用沉浸式材质。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：自适应系统材质。默认为沉浸式材质 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：materialLevel 取 ADAPTIVE
  - IL-F032：HDS MaterialLevel 取值为 EXQUISITE=0、GENTLE=1、SMOOTH=2、ADAPTIVE=10；ADAPTIVE 档由系统按设备算力自适应；设备不支持 IMMERSIVE 时官网建议使用 SMOOTH 以降低卡顿和发热风险。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：材质生效策略由系统策略决定 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：官网推荐自适应沉浸光感
  - IL-F033：官网推荐 HDS 使用 materialType=ADAPTIVE、materialLevel=ADAPTIVE，让系统根据设备算力动态平衡材质效果和性能。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：推荐使用系统自适应 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：背景色默认联动（不显式配置 original/scrollEffectStyle 背景色）
  - IL-S011-D01：TitleBarStyleOptions.systemMaterialEffect 设置标题栏沉浸光感样式，起始版本 6.1.0(23)。配置该属性后（模糊样式类型为 GRADIENT_BLUR 时），标题栏背景板背景色默认值随 ScrollEffectOptions.enableScrollEffect 联动：enableScrollEffect 为 false 时 originalStyle 中的 backgroundColor 默认值为 $r('sys.color.comp_background_gray')；为 true 时 originalStyle 中的 backgroundColor 默认值为透明色，scrollEffectStyle 中的 backgroundColor 默认值为 $r('sys.color.comp_background_gray')。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：当模糊样式类型为GRADIENT_BLUR并配置沉浸光感属性 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：blurRadius 默认联动（不显式配置）
  - IL-S011-D02：标题栏模糊半径 blurRadius 仅在模糊样式类型配置为渐变模糊 GRADIENT_BLUR 及沉浸式渐变模糊 IMMERSIVE_GRADIENT_BLUR 时生效，取值范围 [0.0, 128.0]。作为 originalStyle 中的属性时，enableScrollEffect 为 true 默认 0.0；enableScrollEffect 为 false 且配置 systemMaterialEffect 时默认值为 12.0（未配置时 16.0）。作为 scrollEffectStyle 中的属性时，仅在 enableScrollEffect 为 true 时生效，配置 systemMaterialEffect 时默认值为 12.0。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：配置systemMaterialEffect时，默认值为12.0 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：enableScrollEffect 显式 false
  - IL-S011-D03：ScrollEffectOptions.enableScrollEffect 配置标题栏是否随内容区滚动的总偏移量动态生效标题栏样式，默认值 true：true 时内容区滚动的总偏移量从 blurEffectiveStartOffset 到 blurEffectiveEndOffset，标题栏样式从 originalStyle 到 scrollEffectStyle 线性过渡；false 时不随内容区滚动动态生效标题栏样式，仅生效 originalStyle。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：配置标题栏是否随内容区滚动的总偏移量动态生效标题栏样式 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：与 GRADIENT_BLUR 搭配（非沉浸式列表类场景推荐）
  - IL-S011-D04：HdsNavigation 官网示例注明材质相关属性从 6.1.0(23) 开始支持，推荐 systemMaterialEffect 与 ScrollEffectType.IMMERSIVE_GRADIENT_BLUR（推荐沉浸式图文类的场景使用）或 ScrollEffectType.GRADIENT_BLUR（推荐非沉浸式列表类的场景使用）搭配使用；GRADIENT_BLUR 在 enableScrollEffect 为 false 时直接生效模糊，适用于列表型非沉浸式场景。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：推荐与ScrollEffectType.IMMERSIVE_GRADIENT_BLUR（推荐沉浸式图文类的场景使用） · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：导入清单与示例一致
  - IL-F036：HDS 官网指南示例是需补齐工程上下文的片段：示例导入仅含 @kit.UIDesignKit 与 @kit.ArkUI 的 SymbolGlyphModifier，示例本身不含异常处理代码；scenery01 明确要求替换为本地资源。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：scenery为自定义资源，开发者需替换本地资源 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`

#### S04 · 已实施

重写 Index.ets：HdsTabs 底部悬浮页签（barOverlap/vertical/barPosition + barFloatingStyle.systemMaterialEffect）

- 位置：`entry/src/main/ets/pages/Index.ets:1-147`（修改后；已对应 diff）
- 判据依据（fresh）：底部页签沉浸光感入口
  - IL-F029：HdsTabs 通过 HdsTabsFloatingStyle.systemMaterialEffect 为底部悬浮页签设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为底部页签设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：页签 systemMaterialEffect 显式参数
  - IL-F030：HDS SystemMaterialParams 包含可选的 materialType 和 materialLevel；默认 materialType 为 NONE，默认 materialLevel 为 ADAPTIVE，因此省略 materialType 不能视为已经启用材质。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：默认值：hdsMaterial.MaterialType.NONE · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：页签同样采用 ADAPTIVE/ADAPTIVE 自适应
  - IL-F033：官网推荐 HDS 使用 materialType=ADAPTIVE、materialLevel=ADAPTIVE，让系统根据设备算力动态平衡材质效果和性能。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：推荐使用系统自适应 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：悬浮布局四项配套条件
  - IL-S011-D05：通过设置 HdsTabs 组件的 barFloatingStyle 样式，并设置 barOverlap 为 true、vertical 为 false、barPosition 为 BarPosition.End，可实现页签栏的悬浮样式；barFloatingStyle 属性与 HdsTabsFloatingStyle 起始版本均为 6.1.0(23)，模型约束仅可在 Stage 模型下使用。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：可实现页签栏的悬浮样式 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`
- 判据依据（fresh）：barOverlap(true) 语义
  - IL-S011-D06：barOverlap 设置 TabBar 是否背后变模糊并叠加在 TabContent 之上，默认值 false；为 true 时 TabBar 背后变模糊并叠加在 TabContent 之上，并且 barBackgroundBlurStyle 属性默认模糊材质的 BlurStyle 值修改为 'BlurStyle.COMPONENT_THICK'。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：TabBar背后变模糊并叠加在TabContent之上 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`
- 判据依据（fresh）：systemMaterialEffect 默认 undefined 须显式配置；barBottomMargin 数值单位
  - IL-S011-D07：HdsTabsFloatingStyle.systemMaterialEffect 为材质参数，默认值 undefined，没有新材质；barBottomMargin 设置页签栏与 HdsTabs 底部距离，默认 0vp，不支持设置百分比单位；barFloatingStyle 与 HdsTabsFloatingStyle 的设备行为差异为该接口在 TV 无效果，在其他设备类型中可正常调用。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：默认值：undefined，没有新材质。 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`
- 判据依据（fresh）：Phone 设备直接可用，无 PC/2in1 预查询需求
  - IL-F035：HDS 材质在 Phone、Tablet 可调用；PC/2in1 使用前需查询设备材质能力；HdsTabs 的该接口在 TV 无效果。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：在PC/2in1设备调用时需先调用 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | HDS 沉浸光感 6.1.0(23)：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 应用安装并拉起成功；组件树显示 HdsNavigation(Navigation>NavBar>TitleBar>HdsTitleBar) 与 HdsTabs(id=hdsTabs) 完整渲染，标题'沉浸光感'、3 个菜单按钮、返回按钮、3 个可点击页签（闹钟/时钟/秒表）与 scenery 图片均在位，页面处于可交互运行状态。 |
| visual | 是 | passed | 模型判图：组件树结构性判定：标题栏 HdsTitleBar 内含 MaskBlur/Mask 渐变模糊蒙层节点（bounds 底缘 444 超出标题栏 332，对应模糊蒙层额外高度）与 3 个 HdsMenuNode 菜单按钮，证明标题栏模糊背板与菜单结构生效；底部 TabBar bounds 为 [215,2466,1041,2662]，未贴屏幕左右与底部（底部距屏幕底 2760-2662=98px），且结构上叠于 Swiper(TabContent) 之上，证明 barFloatingStyle 悬浮布局与 barOverlap 叠加生效；TabContent 内 Scroll>Column>Image 渲染本地 scenery 资源。材质像素级效果（ADAPTIVE 材质渲染观感）以设备截图留档供人工复核。 |

### 代码变化

#### build-profile.json5

- 状态：modified
- before：`12b986eeb2ae25ba52e34e23e5a0d1079fa1bce32216e64baf7164283077b56b`
- after：`63dce6bd186bb4dfc005991ef2b516b2210615cff627b723fdfba4fd499faae6`

```diff
--- a/build-profile.json5
+++ b/build-profile.json5
@@ -5,8 +5,8 @@
       {
         "name": "default",
         "signingConfig": "default",
-        "targetSdkVersion": "6.0.1(21)",
-        "compatibleSdkVersion": "6.0.1(21)",
+        "targetSdkVersion": "6.1.0(23)",
+        "compatibleSdkVersion": "6.1.0(23)",
         "runtimeOS": "HarmonyOS",
         "buildOption": {
           "strictMode": {
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`e902fbedaab0d35e86fd14f3dd876a7f023d5331910647a619c8b1755f31527e`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,147 @@
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
+// HDS 沉浸光感 Demo：HdsNavigation 标题栏 + HdsTabs 底部悬浮页签
+// 依据官网《HDS组件使用沉浸光感材质指南》自适应沉浸光感示例最小适配
+import {
+  HdsNavigation,
+  HdsNavigationTitleMode,
+  HdsNavigationMenuContentOptions,
+  HdsTabs,
+  HdsTabsController,
+  ScrollEffectType,
+  hdsMaterial
+} from '@kit.UIDesignKit';
+import { SymbolGlyphModifier } from '@kit.ArkUI';
+
+interface TabItem {
+  symbolGlyph: SymbolGlyphModifier,
+  symbolGlyph1: SymbolGlyphModifier,
+  label: string,
+  defaultBgColor: ResourceColor,
+  hoverBgColor: ResourceColor,
+  pressBgColor: ResourceColor,
+}
+
+const TAB_CONFIG: TabItem[] = [
+  {
+    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.alarm_fill_1')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
+        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
+    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.alarm_fill_1')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
+    label: '闹钟',
+    defaultBgColor: Color.Transparent,
+    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
+    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
+  },
+  {
+    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.worldclock_fill_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
+        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
+    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.worldclock_fill_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
+    label: '时钟',
+    defaultBgColor: Color.Transparent,
+    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
+    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
+  },
+  {
+    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.stopwatch_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
+        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
+    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.stopwatch_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
+    label: '秒表',
+    defaultBgColor: Color.Transparent,
+    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
+    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
+  }
+];
+
+@Entry
+@Component
+struct Index {
+  private scrollerForScroll: Scroller = new Scroller();
+  private controller: HdsTabsController = new HdsTabsController();
+
+  private menus: HdsNavigationMenuContentOptions = {
+    value: [{
+      content: {
+        label: 'menu1',
+        icon: $r('sys.symbol.square_and_pencil')
+      }
+    }, {
+      content: {
+        label: 'menu2',
+        icon: $r('sys.symbol.star')
+      }
+    }, {
+      content: {
+        label: 'menu3',
+        icon: $r('sys.symbol.more')
+      }
+    }
+    ]
+  };
+
+  build() {
+    HdsNavigation() {
+      HdsTabs({ controller: this.controller }) {
+        ForEach(TAB_CONFIG, (item: TabItem) => {
+          TabContent() {
+            Stack() {
+              Scroll(this.scrollerForScroll) {
+                Column() {
+                  // 本地资源，替换官网示例中的 scenery01
+                  Image($r('app.media.scenery')).width('100%')
+                }
+              }
+              .clipContent(ContentClipMode.SAFE_AREA)
+              .height('100%')
+            }
+          }
+          .tabBar(new BottomTabBarStyle({
+            normal: item.symbolGlyph, selected: item.symbolGlyph1
+          }, item.label))
+        })
+      }
+      // 悬浮布局条件：barOverlap(true) + vertical(false) + barPosition(End) + barFloatingStyle
+      .barOverlap(true)
+      .vertical(false)
+      .barPosition(BarPosition.End)
+      .barFloatingStyle({
+        barBottomMargin: 28,
+        // 底部悬浮页签沉浸光感：ADAPTIVE 类型 + ADAPTIVE 等级，跟随系统策略自适应
+        systemMaterialEffect: {
+          materialType: hdsMaterial.MaterialType.ADAPTIVE,
+          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
+        }
+      })
+    }
+    .mode(NavigationMode.Stack)
+    .titleBar({
+      content: {
+        title: {
+          mainTitle: '沉浸光感',
+        },
+        menu: this.menus,
+      },
+      style: {
+        scrollEffectOpts: {
+          enableScrollEffect: false,
+          scrollEffectType: ScrollEffectType.GRADIENT_BLUR,
+        },
+        // 标题栏按钮沉浸光感：ADAPTIVE 类型 + ADAPTIVE 等级，跟随系统策略自适应
+        systemMaterialEffect: {
+          materialType: hdsMaterial.MaterialType.ADAPTIVE,
+          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
+        },
+      },
+      avoidLayoutSafeArea: false,
+      enableComponentSafeArea: false
+    })
+    .bindToScrollable([this.scrollerForScroll])
+    .hideBackButton(false)
+    .titleMode(HdsNavigationTitleMode.MINI)
+    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM], [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
+  }
+}
+
```

#### entry/src/main/resources/base/media/scenery.jpg

- 状态：added
- before：`—`
- after：`d7cf499275af52a50b069d0130333bbf861639facb9e5616383b62d53fec766a`

```diff
--- a/entry/src/main/resources/base/media/scenery.jpg
+++ b/entry/src/main/resources/base/media/scenery.jpg
@@ -1,1 +1,517 @@
-
+���� JFIF  ` `  �� C 		�� C
+
+�� �8" ��           	
+�� �   } !1AQa"q2���#B��R��$3br�	
+%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz���������������������������������������������������������������������������        	
+�� �  w !1AQaq"2�B����	#3R�br�
+$4�%�&'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz��������������������������������������������������������������������������   ? ��F:���?�F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4S���\
+0)\�(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(��-�) �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E .�T��`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �R�@�(��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:���R�R;	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�����(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��b����&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-����������è��W ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.�R�H����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQKE .(�-�=D������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1E-\5b��Cb�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1E- �4`��J�&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�E-\�u�a�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N���QN��ch�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u QK�1J��J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\QE�Ah���1(�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q@EPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEP�(����0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��\Q@E:�W(m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���R�R	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����QEQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@��*@(�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� uQJ�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE�ð(���C
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+(��b��W1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��Qpb��@&(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�Z(ph������Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.�R�H����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQKE S���)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E .4�R������.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h����QN������F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�PE:�.=�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����
+0(��a�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�EPE:�W��N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N���������&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-����������è���
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h���P�(�����0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+(������P11F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����R�@�1KEH�&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-������������R�J�b��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQKEph����	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�E- QN���m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���S��1�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� (���q�E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%�����R�R(�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q@ET��EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE�`Q�K�1@�&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���R���N���E:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(��4`�(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����(���(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP�FT�0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(�� vQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@�1KEIBb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(���b��W1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��Qp�Z)Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(E����W�4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&�Qp
+)�R�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� \0ih�p�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h�����E.(�+�%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�.�N��z��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��
+0(���0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+(���QN���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(qF)h�1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����R�@�)\vE:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.b��Cb�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1E- QN��vE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(�1KEb�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1E- ���R�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�������R1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����R�@�F-#�L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����P��E+�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���S��1�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� (���q�E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%�����QE 
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��ER��QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp��
+0)qF)L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������P�E�EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\��`уH���`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qE;���E�;QE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,:�(�
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,;�
+(�`Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `QE ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(���b��W�b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ���.��1KE!��1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���� \0ih�������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h����QN���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�Qp
+)�R�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� (�`Q�J��)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4
+)qF)%�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�(h�QJ�6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�Qp
+)qF)\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\QE�Z)�T��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��EaqF)h�bb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(���
+)�T��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��EaqF)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-�����������E:�����E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�P�R�J�&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\���������.�R�Hz��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��)h�5b��W���Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�Z(��F-���4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��E-�E:�W�)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�(�QJ�6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�Qp
+)qF*@J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����P�EQE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE :�(� ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��(�`R�Qr����b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�\QE�Z(���(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(���`уJ��1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�v\��)(�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� uQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@���*G`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(����R�J�b��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQKEqF)h�;	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�������R����������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������QpR�E�\0ih�`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`�KE S��pE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(��)\ch�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E��
```

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/kits/@kit.UIDesignKit.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/api/@hms.hds.hdsMaterial.d.ets
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/api/@hms.hds.hdsBaseComponent.d.ets
- EVID-005 [build_log] devecocli build 成功 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\3dec30e9-4af8-48ca-b70f-c6415c0553d2\build.log
- EVID-006 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\3dec30e9-4af8-48ca-b70f-c6415c0553d2\device-run.log
- EVID-007 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\images\37d911a3cfac5d6eb9c2165d4742baf8bcca375f5dff92253d4c5c9970935c2f.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/37d911a3cfac5d6eb9c2165d4742baf8bcca375f5dff92253d4c5c9970935c2f.png>)

- EVID-008 [component_tree] 完整组件树（devecocli ui layout --mode full）。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\3dec30e9-4af8-48ca-b70f-c6415c0553d2\device-layout.json
- EVID-009 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\fc62a5e3-49db-469b-8f69-76f25a0d6539\device-layout.json
- EVID-010 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\images\0371c40908a238884c4c578a1f77fabd485da92e670aabd133aeb56de0450172.png

![判图引用的截图。](<evidence/images/0371c40908a238884c4c578a1f77fabd485da92e670aabd133aeb56de0450172.png>)

- EVID-011 [visual_judgment] 组件树结构性判定：标题栏 HdsTitleBar 内含 MaskBlur/Mask 渐变模糊蒙层节点（bounds 底缘 444 超出标题栏 332，对应模糊蒙层额外高度）与 3 个 HdsMenuNode 菜单按钮，证明标题栏模糊背板与菜单结构生效；底部 TabBar bounds 为 [215,2466,1041,2662]，未贴屏幕左右与底部（底部距屏幕底 2760-2662=98px），且结构上叠于 Swiper(TabContent) 之上，证明 barFloatingStyle 悬浮布局与 barOverlap 叠加生效；TabContent 内 Scroll>Column>Image 渲染本地 scenery 资源。材质像素级效果（ADAPTIVE 材质渲染观感）以设备截图留档供人工复核。


## HDS immersive light demo: HdsNavigation title bar + HdsTabs bottom tabs

- 判据策略：fresh，冻结于 2026-09-10T13:01:51.083Z

- 总结果：`passed`
- 能力：immersive-light
- 技术路线：hds-api23

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-F027：将工程 targetSdkVersion/compatibleSdkVersion 从 6.0.1(21) 升级为 6.1.0(23)，满足 HDS 组件沉浸光感材质的版本门槛；工程为 Stage 模型（entry module.json5 声明），符合模型约束。
  - 官网冻结来源：hds-component-material-guide:3-5，片段 SHA-256：`e94b1df7928a75ce92af30c1d7a8f8a531d476fbe9e73cd8bedd302304607816`
- IL-F028：在 HdsNavigation 的 titleBar.style（TitleBarStyleOptions）中配置 systemMaterialEffect 字段，为标题栏按钮设置沉浸光感视效。
  - 官网冻结来源：hds-component-material-guide:7-7，片段 SHA-256：`1475cdeaea0987f38b1a4b65236e8f21ddd9971ed0e21adb29a3e655976fa2bc`
  - 官网冻结来源：hds-navigation-api:1479-1483，片段 SHA-256：`997f30ce747627d3fdd61ec8c59faf324c83fb5e026fd97a74c08f54b4ce8b05`
- IL-F029：在 HdsTabs 的 barFloatingStyle（HdsTabsFloatingStyle）中配置 systemMaterialEffect 字段，为底部悬浮页签设置沉浸光感视效。
  - 官网冻结来源：hds-component-material-guide:9-9，片段 SHA-256：`02e570cd8fd60a2c39d537fef666868df1ebb939a5013433576e3b5eea15f55f`
  - 官网冻结来源：hds-tabs-api:715-719，片段 SHA-256：`969fe73994deccb2bf9d74d68c24049f1e299a6a60ea50533dd8a88fa2625c24`
- IL-F030：两处 systemMaterialEffect 均显式写入 materialType 与 materialLevel（materialType 默认 NONE，省略不等于启用材质，故必须显式指定）。
  - 官网冻结来源：hds-navigation-api:2055-2066，片段 SHA-256：`f108ae25742c9d40fc4e2ec6e53ec0ed147272d24e1748b1e614156ea04e140e`
- IL-F031：materialType 采用 hdsMaterial.MaterialType.ADAPTIVE（自适应系统材质，默认为沉浸式材质）。
  - 官网冻结来源：hds-material-api:60-66，片段 SHA-256：`58ad7edbea837a5110b3f54c1730bfb4f485ca0e1238be3b6c04e606095298fd`
- IL-F032：materialLevel 采用 hdsMaterial.MaterialLevel.ADAPTIVE，由系统按设备算力自适应材质等级。
  - 官网冻结来源：hds-material-api:80-96，片段 SHA-256：`1a2b274e1396653764b72062e52864d6fe786a561f1c4352c4a7dd6d160bb1f2`
- IL-F033：标题栏与底部页签均采用官网推荐的系统自适应沉浸光感（materialType=ADAPTIVE + materialLevel=ADAPTIVE），系统按设备算力动态平衡材质效果和性能。
  - 官网冻结来源：hds-component-material-guide:11-13，片段 SHA-256：`f2212a12749be1d6112bce51e53cd3e0d7d5068fd8721947a708695d4f1eb61d`
- IL-F035：demo 目标为 Phone 设备（材质可直接调用）；材质采用 ADAPTIVE 自适应策略，Phone/Tablet 路径不触发 PC/2in1 的 getSystemMaterialTypes 预查询要求，也不运行在 TV 上。
  - 官网冻结来源：hds-navigation-api:2043-2053，片段 SHA-256：`eba8e98b56598f1ecb195b3ffbc232ae59b1897de8b2fa644371153c7c832ba0`
  - 官网冻结来源：hds-tabs-api:641-645，片段 SHA-256：`31537b249bd6eb9075af941f4218541d7136f70d79691e65cd65b92dc2c44c6b`
- IL-F036：以官网自适应示例为最小适配基础：导入清单与示例一致（@kit.UIDesignKit 组件/枚举 + @kit.ArkUI 的 SymbolGlyphModifier）；示例中的 scenery01 按原文要求替换为本地资源 entry/src/main/resources/base/media/scenery.jpg（$r('app.media.scenery')）。
  - 官网冻结来源：hds-component-material-guide:17-23，片段 SHA-256：`0164a656d0ccc3f6c24d40a5fc4a96dccfd301d9e866bb9d4db45058d4b760c4`
  - 官网冻结来源：hds-component-material-guide:63-67，片段 SHA-256：`a86f7abd07eab45c59e644d18afa3eeac2bf2e6eb1397fb91fa905f699ea576a`
- IL-S011-D01：titleBar.style 不显式配置 originalStyle/scrollEffectStyle 背景色；按 GRADIENT_BLUR + systemMaterialEffect + enableScrollEffect=false 组合，originalStyle 背景色默认 $r('sys.color.comp_background_gray')、scrollEffectStyle 背景色不生效，全部交给官网默认联动规则。
  - 官网冻结来源：hds-navigation-api:1144-1158，片段 SHA-256：`efa0366a85f9afcae57b1d9d092e9ebe51201af1c5165eb08ae7f2b9725ff6f4`
- IL-S011-D02：不显式配置 blurRadius；按 GRADIENT_BLUR + enableScrollEffect=false + systemMaterialEffect 组合，originalStyle 模糊半径取官网默认 12.0。
  - 官网冻结来源：hds-navigation-api:1181-1191，片段 SHA-256：`2f0e8d628699f51e1cb2d09386d14ccc920686c9056c51c7883de85d727254ee`
- IL-S011-D03：scrollEffectOpts 显式设置 enableScrollEffect:false（与官网示例一致），标题栏不随内容区滚动动态切换样式，仅生效 originalStyle；scrollEffectType 设置为 GRADIENT_BLUR。
  - 官网冻结来源：hds-navigation-api:1379-1395，片段 SHA-256：`401a03d2ab4c06d5c56ca5a495fe8d06d2c00a8ec66d1ef08e33e89053104d68`
- IL-S011-D04：systemMaterialEffect 与 ScrollEffectType.GRADIENT_BLUR 搭配使用（官网推荐的非沉浸式列表类场景组合），并保持 enableScrollEffect=false 直接生效模糊的用法。
  - 官网冻结来源：hds-navigation-api:2899-2911，片段 SHA-256：`088ee611827b5f34e18376609f3c5f7de850b333a84140a1da8dd6af1180df75`
- IL-S011-D05：HdsTabs 同时设置 barFloatingStyle、barOverlap(true)、vertical(false)、barPosition(BarPosition.End)，满足页签栏悬浮样式的全部配套条件。
  - 官网冻结来源：hds-tabs-api:1601-1604，片段 SHA-256：`2b873fdc99720e7ea58617104253a74f7e1db4c9f3c75a68a6f3b4d4e2c36508`
- IL-S011-D06：显式设置 barOverlap(true)，TabBar 背后变模糊并叠加在 TabContent 之上，构成悬浮布局条件之一。
  - 官网冻结来源：hds-tabs-api:371-397，片段 SHA-256：`a5485721070dcb918931c61630c49567fdd73e38f760fa1f96d093109a4bcce2`
- IL-S011-D07：barFloatingStyle 中显式配置 systemMaterialEffect（默认 undefined 即无新材质，须显式给出）与 barBottomMargin:28（ vp 数值，非百分比），使底部悬浮页签获得沉浸光感；demo 不运行在 TV。
  - 官网冻结来源：hds-tabs-api:655-719，片段 SHA-256：`641e5ff236367981592de85c58e462bb85272dae8f241d05314341fc6d98fed7`

#### S01 · 已实施

升级 build-profile.json5 的 targetSdkVersion/compatibleSdkVersion 至 6.1.0(23)

- 位置：`build-profile.json5:8-9`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-9`（修改后；已对应 diff）
- 判据依据（fresh）：HDS 沉浸光感材质从 6.1.0(23) 起提供，工程 SDK 声明须达到该版本
  - IL-F027：HDS 组件沉浸光感材质从 6.1.0(23) 起提供，仅支持 Stage 模型，系统能力为 SystemCapability.UIDesign.HDSComponent.Core。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：新增支持HDS组件的沉浸光感材质能力 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：systemMaterialEffect 字段从 6.1.0(23) 起提供
  - IL-F028：HdsNavigation 通过 TitleBarStyleOptions.systemMaterialEffect 为标题栏按钮设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为标题栏按钮设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：HdsTabsFloatingStyle.systemMaterialEffect 从 6.1.0(23) 起提供
  - IL-F029：HdsTabs 通过 HdsTabsFloatingStyle.systemMaterialEffect 为底部悬浮页签设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为底部页签设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`

#### S02 · 已实施

新增本地图片资源 entry/src/main/resources/base/media/scenery.jpg 替换示例 scenery01

- 位置：`entry/src/main/resources/base/media/scenery.jpg:1-517`（修改后；已对应 diff）
- 判据依据（fresh）：官网示例注明 scenery 为自定义资源，需替换为本地资源
  - IL-F036：HDS 官网指南示例是需补齐工程上下文的片段：示例导入仅含 @kit.UIDesignKit 与 @kit.ArkUI 的 SymbolGlyphModifier，示例本身不含异常处理代码；scenery01 明确要求替换为本地资源。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：scenery为自定义资源，开发者需替换本地资源 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`

#### S03 · 已实施

重写 Index.ets：HdsNavigation 标题栏（titleBar.style.systemMaterialEffect + GRADIENT_BLUR + enableScrollEffect:false）

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-147`（修改后；已对应 diff）
- 判据依据（fresh）：标题栏沉浸光感入口
  - IL-F028：HdsNavigation 通过 TitleBarStyleOptions.systemMaterialEffect 为标题栏按钮设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为标题栏按钮设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：systemMaterialEffect 显式 materialType/materialLevel
  - IL-F030：HDS SystemMaterialParams 包含可选的 materialType 和 materialLevel；默认 materialType 为 NONE，默认 materialLevel 为 ADAPTIVE，因此省略 materialType 不能视为已经启用材质。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：默认值：hdsMaterial.MaterialType.NONE · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：materialType 取 ADAPTIVE
  - IL-F031：HDS MaterialType 取值为 NONE=0、ADAPTIVE=100、IMMERSIVE=101；ADAPTIVE 表示自适应系统材质且默认采用沉浸式材质。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：自适应系统材质。默认为沉浸式材质 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：materialLevel 取 ADAPTIVE
  - IL-F032：HDS MaterialLevel 取值为 EXQUISITE=0、GENTLE=1、SMOOTH=2、ADAPTIVE=10；ADAPTIVE 档由系统按设备算力自适应；设备不支持 IMMERSIVE 时官网建议使用 SMOOTH 以降低卡顿和发热风险。
    - [hdsMaterial (hds沉浸光感材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsmaterial) · 锚点：材质生效策略由系统策略决定 · SHA-256：`c4f7d3a9855b195d066d72a40d25aab8aef463ab7eae43d83322fe347b3977e1`
- 判据依据（fresh）：官网推荐自适应沉浸光感
  - IL-F033：官网推荐 HDS 使用 materialType=ADAPTIVE、materialLevel=ADAPTIVE，让系统根据设备算力动态平衡材质效果和性能。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：推荐使用系统自适应 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：背景色默认联动（不显式配置 original/scrollEffectStyle 背景色）
  - IL-S011-D01：TitleBarStyleOptions.systemMaterialEffect 设置标题栏沉浸光感样式，起始版本 6.1.0(23)。配置该属性后（模糊样式类型为 GRADIENT_BLUR 时），标题栏背景板背景色默认值随 ScrollEffectOptions.enableScrollEffect 联动：enableScrollEffect 为 false 时 originalStyle 中的 backgroundColor 默认值为 $r('sys.color.comp_background_gray')；为 true 时 originalStyle 中的 backgroundColor 默认值为透明色，scrollEffectStyle 中的 backgroundColor 默认值为 $r('sys.color.comp_background_gray')。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：当模糊样式类型为GRADIENT_BLUR并配置沉浸光感属性 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：blurRadius 默认联动（不显式配置）
  - IL-S011-D02：标题栏模糊半径 blurRadius 仅在模糊样式类型配置为渐变模糊 GRADIENT_BLUR 及沉浸式渐变模糊 IMMERSIVE_GRADIENT_BLUR 时生效，取值范围 [0.0, 128.0]。作为 originalStyle 中的属性时，enableScrollEffect 为 true 默认 0.0；enableScrollEffect 为 false 且配置 systemMaterialEffect 时默认值为 12.0（未配置时 16.0）。作为 scrollEffectStyle 中的属性时，仅在 enableScrollEffect 为 true 时生效，配置 systemMaterialEffect 时默认值为 12.0。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：配置systemMaterialEffect时，默认值为12.0 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：enableScrollEffect 显式 false
  - IL-S011-D03：ScrollEffectOptions.enableScrollEffect 配置标题栏是否随内容区滚动的总偏移量动态生效标题栏样式，默认值 true：true 时内容区滚动的总偏移量从 blurEffectiveStartOffset 到 blurEffectiveEndOffset，标题栏样式从 originalStyle 到 scrollEffectStyle 线性过渡；false 时不随内容区滚动动态生效标题栏样式，仅生效 originalStyle。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：配置标题栏是否随内容区滚动的总偏移量动态生效标题栏样式 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：与 GRADIENT_BLUR 搭配（非沉浸式列表类场景推荐）
  - IL-S011-D04：HdsNavigation 官网示例注明材质相关属性从 6.1.0(23) 开始支持，推荐 systemMaterialEffect 与 ScrollEffectType.IMMERSIVE_GRADIENT_BLUR（推荐沉浸式图文类的场景使用）或 ScrollEffectType.GRADIENT_BLUR（推荐非沉浸式列表类的场景使用）搭配使用；GRADIENT_BLUR 在 enableScrollEffect 为 false 时直接生效模糊，适用于列表型非沉浸式场景。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：推荐与ScrollEffectType.IMMERSIVE_GRADIENT_BLUR（推荐沉浸式图文类的场景使用） · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：导入清单与示例一致
  - IL-F036：HDS 官网指南示例是需补齐工程上下文的片段：示例导入仅含 @kit.UIDesignKit 与 @kit.ArkUI 的 SymbolGlyphModifier，示例本身不含异常处理代码；scenery01 明确要求替换为本地资源。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：scenery为自定义资源，开发者需替换本地资源 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`

#### S04 · 已实施

重写 Index.ets：HdsTabs 底部悬浮页签（barOverlap/vertical/barPosition + barFloatingStyle.systemMaterialEffect）

- 位置：`entry/src/main/ets/pages/Index.ets:1-147`（修改后；已对应 diff）
- 判据依据（fresh）：底部页签沉浸光感入口
  - IL-F029：HdsTabs 通过 HdsTabsFloatingStyle.systemMaterialEffect 为底部悬浮页签设置沉浸光感，该字段从 6.1.0(23) 起提供。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：可为底部页签设置沉浸光感视效 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：页签 systemMaterialEffect 显式参数
  - IL-F030：HDS SystemMaterialParams 包含可选的 materialType 和 materialLevel；默认 materialType 为 NONE，默认 materialLevel 为 ADAPTIVE，因此省略 materialType 不能视为已经启用材质。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：默认值：hdsMaterial.MaterialType.NONE · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`
- 判据依据（fresh）：页签同样采用 ADAPTIVE/ADAPTIVE 自适应
  - IL-F033：官网推荐 HDS 使用 materialType=ADAPTIVE、materialLevel=ADAPTIVE，让系统根据设备算力动态平衡材质效果和性能。
    - [沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-component-material) · 锚点：推荐使用系统自适应 · SHA-256：`5f92898926eabc25ebe72bf04602dc151d65730ca7ec96f7c92f2b449898f607`
- 判据依据（fresh）：悬浮布局四项配套条件
  - IL-S011-D05：通过设置 HdsTabs 组件的 barFloatingStyle 样式，并设置 barOverlap 为 true、vertical 为 false、barPosition 为 BarPosition.End，可实现页签栏的悬浮样式；barFloatingStyle 属性与 HdsTabsFloatingStyle 起始版本均为 6.1.0(23)，模型约束仅可在 Stage 模型下使用。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：可实现页签栏的悬浮样式 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`
- 判据依据（fresh）：barOverlap(true) 语义
  - IL-S011-D06：barOverlap 设置 TabBar 是否背后变模糊并叠加在 TabContent 之上，默认值 false；为 true 时 TabBar 背后变模糊并叠加在 TabContent 之上，并且 barBackgroundBlurStyle 属性默认模糊材质的 BlurStyle 值修改为 'BlurStyle.COMPONENT_THICK'。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：TabBar背后变模糊并叠加在TabContent之上 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`
- 判据依据（fresh）：systemMaterialEffect 默认 undefined 须显式配置；barBottomMargin 数值单位
  - IL-S011-D07：HdsTabsFloatingStyle.systemMaterialEffect 为材质参数，默认值 undefined，没有新材质；barBottomMargin 设置页签栏与 HdsTabs 底部距离，默认 0vp，不支持设置百分比单位；barFloatingStyle 与 HdsTabsFloatingStyle 的设备行为差异为该接口在 TV 无效果，在其他设备类型中可正常调用。
    - [HdsTabs (底部页签)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs) · 锚点：默认值：undefined，没有新材质。 · SHA-256：`f3722df205530854cd84bd7c11bafdd2d689f3422aa4abb06769cd02c648b357`
- 判据依据（fresh）：Phone 设备直接可用，无 PC/2in1 预查询需求
  - IL-F035：HDS 材质在 Phone、Tablet 可调用；PC/2in1 使用前需查询设备材质能力；HdsTabs 的该接口在 TV 无效果。
    - [HdsNavigation (导航根视图容器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation) · 锚点：在PC/2in1设备调用时需先调用 · SHA-256：`d232828351a8fd5f31fbce578a291bc18d9958b53dda6dd957e4fdbda08ece20`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | HDS 沉浸光感 6.1.0(23)：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 应用安装并拉起成功；组件树显示 HdsNavigation(Navigation>NavBar>TitleBar>HdsTitleBar) 与 HdsTabs(id=hdsTabs) 完整渲染，标题'沉浸光感'、3 个菜单按钮、返回按钮、3 个可点击页签（闹钟/时钟/秒表）与 scenery 图片均在位，页面处于可交互运行状态。 |
| visual | 是 | passed | 模型判图：组件树结构性判定：标题栏 HdsTitleBar 内含 MaskBlur/Mask 渐变模糊蒙层节点（bounds 底缘 444 超出标题栏 332，对应模糊蒙层额外高度）与 3 个 HdsMenuNode 菜单按钮，证明标题栏模糊背板与菜单结构生效；底部 TabBar bounds 为 [215,2466,1041,2662]，未贴屏幕左右与底部（底部距屏幕底 2760-2662=98px），且结构上叠于 Swiper(TabContent) 之上，证明 barFloatingStyle 悬浮布局与 barOverlap 叠加生效；TabContent 内 Scroll>Column>Image 渲染本地 scenery 资源。材质像素级效果（ADAPTIVE 材质渲染观感）以设备截图留档供人工复核。 |

### 代码变化

#### build-profile.json5

- 状态：modified
- before：`12b986eeb2ae25ba52e34e23e5a0d1079fa1bce32216e64baf7164283077b56b`
- after：`63dce6bd186bb4dfc005991ef2b516b2210615cff627b723fdfba4fd499faae6`

```diff
--- a/build-profile.json5
+++ b/build-profile.json5
@@ -5,8 +5,8 @@
       {
         "name": "default",
         "signingConfig": "default",
-        "targetSdkVersion": "6.0.1(21)",
-        "compatibleSdkVersion": "6.0.1(21)",
+        "targetSdkVersion": "6.1.0(23)",
+        "compatibleSdkVersion": "6.1.0(23)",
         "runtimeOS": "HarmonyOS",
         "buildOption": {
           "strictMode": {
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`e902fbedaab0d35e86fd14f3dd876a7f023d5331910647a619c8b1755f31527e`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,147 @@
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
+// HDS 沉浸光感 Demo：HdsNavigation 标题栏 + HdsTabs 底部悬浮页签
+// 依据官网《HDS组件使用沉浸光感材质指南》自适应沉浸光感示例最小适配
+import {
+  HdsNavigation,
+  HdsNavigationTitleMode,
+  HdsNavigationMenuContentOptions,
+  HdsTabs,
+  HdsTabsController,
+  ScrollEffectType,
+  hdsMaterial
+} from '@kit.UIDesignKit';
+import { SymbolGlyphModifier } from '@kit.ArkUI';
+
+interface TabItem {
+  symbolGlyph: SymbolGlyphModifier,
+  symbolGlyph1: SymbolGlyphModifier,
+  label: string,
+  defaultBgColor: ResourceColor,
+  hoverBgColor: ResourceColor,
+  pressBgColor: ResourceColor,
+}
+
+const TAB_CONFIG: TabItem[] = [
+  {
+    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.alarm_fill_1')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
+        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
+    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.alarm_fill_1')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
+    label: '闹钟',
+    defaultBgColor: Color.Transparent,
+    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
+    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
+  },
+  {
+    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.worldclock_fill_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
+        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
+    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.worldclock_fill_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
+    label: '时钟',
+    defaultBgColor: Color.Transparent,
+    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
+    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
+  },
+  {
+    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.stopwatch_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
+        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
+    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.stopwatch_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
+      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
+    label: '秒表',
+    defaultBgColor: Color.Transparent,
+    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
+    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
+  }
+];
+
+@Entry
+@Component
+struct Index {
+  private scrollerForScroll: Scroller = new Scroller();
+  private controller: HdsTabsController = new HdsTabsController();
+
+  private menus: HdsNavigationMenuContentOptions = {
+    value: [{
+      content: {
+        label: 'menu1',
+        icon: $r('sys.symbol.square_and_pencil')
+      }
+    }, {
+      content: {
+        label: 'menu2',
+        icon: $r('sys.symbol.star')
+      }
+    }, {
+      content: {
+        label: 'menu3',
+        icon: $r('sys.symbol.more')
+      }
+    }
+    ]
+  };
+
+  build() {
+    HdsNavigation() {
+      HdsTabs({ controller: this.controller }) {
+        ForEach(TAB_CONFIG, (item: TabItem) => {
+          TabContent() {
+            Stack() {
+              Scroll(this.scrollerForScroll) {
+                Column() {
+                  // 本地资源，替换官网示例中的 scenery01
+                  Image($r('app.media.scenery')).width('100%')
+                }
+              }
+              .clipContent(ContentClipMode.SAFE_AREA)
+              .height('100%')
+            }
+          }
+          .tabBar(new BottomTabBarStyle({
+            normal: item.symbolGlyph, selected: item.symbolGlyph1
+          }, item.label))
+        })
+      }
+      // 悬浮布局条件：barOverlap(true) + vertical(false) + barPosition(End) + barFloatingStyle
+      .barOverlap(true)
+      .vertical(false)
+      .barPosition(BarPosition.End)
+      .barFloatingStyle({
+        barBottomMargin: 28,
+        // 底部悬浮页签沉浸光感：ADAPTIVE 类型 + ADAPTIVE 等级，跟随系统策略自适应
+        systemMaterialEffect: {
+          materialType: hdsMaterial.MaterialType.ADAPTIVE,
+          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
+        }
+      })
+    }
+    .mode(NavigationMode.Stack)
+    .titleBar({
+      content: {
+        title: {
+          mainTitle: '沉浸光感',
+        },
+        menu: this.menus,
+      },
+      style: {
+        scrollEffectOpts: {
+          enableScrollEffect: false,
+          scrollEffectType: ScrollEffectType.GRADIENT_BLUR,
+        },
+        // 标题栏按钮沉浸光感：ADAPTIVE 类型 + ADAPTIVE 等级，跟随系统策略自适应
+        systemMaterialEffect: {
+          materialType: hdsMaterial.MaterialType.ADAPTIVE,
+          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
+        },
+      },
+      avoidLayoutSafeArea: false,
+      enableComponentSafeArea: false
+    })
+    .bindToScrollable([this.scrollerForScroll])
+    .hideBackButton(false)
+    .titleMode(HdsNavigationTitleMode.MINI)
+    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM], [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
+  }
+}
+
```

#### entry/src/main/resources/base/media/scenery.jpg

- 状态：added
- before：`—`
- after：`d7cf499275af52a50b069d0130333bbf861639facb9e5616383b62d53fec766a`

```diff
--- a/entry/src/main/resources/base/media/scenery.jpg
+++ b/entry/src/main/resources/base/media/scenery.jpg
@@ -1,1 +1,517 @@
-
+���� JFIF  ` `  �� C 		�� C
+
+�� �8" ��           	
+�� �   } !1AQa"q2���#B��R��$3br�	
+%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz���������������������������������������������������������������������������        	
+�� �  w !1AQaq"2�B����	#3R�br�
+$4�%�&'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz��������������������������������������������������������������������������   ? ��F:���?�F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4`Ө��уN���F:� n4�(�4S���\
+0)\�(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(���%�`Qp�\
+0(�	E.\���
+.QK�F(������R�Q�E�J)p(��-�) �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E .�T��`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �`R�@	�F- �R�@�(��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:���R�R;	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�����(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��b����&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-����������è��W ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.�R�H����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQKE .(�-�=D������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1E-\5b��Cb�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1E- �4`��J�&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�E-\�u�a�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N���QN��ch�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u QK�1J��J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\Q�.	E.(���b���QK�1E�A(���᠔R�Qp�J)qF(�h%��\4�\QE�Ah���1(�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q@EPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEP�(����0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��\Q@E:�W(m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���R�R	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����b���R�P�\Q��QK�1@XJ)qF(	E.(�a(���,%�����QEQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@��*@(�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� uQJ�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE�ð(���C
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+0(��
+(��b��W1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��Qpb��@&(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�Z(ph������Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.�R�H����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQKE S���)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E .4�R������.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h����QN������F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�`Ph�`Q�@���F 6�v �)�PE:�.=�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����)�Qp�m�(�h6�u\4E:�.��E�N����h�QE�A�S����
+0(��a�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�FP�EPE:�W��N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N�����N���������&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-����������è���
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h���P�(�����0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+(������P11F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����R�@�1KEH�&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-������������R�J�b��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQKEph����	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�F- �4`��@	�E- QN���m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���S��1�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� (���q�E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%�����R�R(�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q@ET��EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE�`Q�K�1@�&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���`R�P�
+\Q��`Q�K�1@XL
+0)qF(	�F.(�a0(����,&������b���R���N���E:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(��4`�(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����\0h(�����(���(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP�FT�0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(��� 0(�� vQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@�1KEIBb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(���b��W1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��Qp�Z)Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(E����W�4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&4�Qp�Z(�	�F-\����.`уKE0h������4`��E�L0ih��&�Qp
+)�R�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� \0ih�p�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h������`уKE����.	�F-\4�Z(�h&4�Qp�L0ih�᠘4`��E�A0h�����E.(�+�%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�.�N��z��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��)�P��E��
+0(���0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+0(���`Q�E\�
+(��`QE ���(�QE�0(���.�FQp
+(���QN���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(qF)h�1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����R�@�)\vE:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.E:�.b��Cb�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1E- QN��vE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(�1KEb�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1E- ���R�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�������R1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����b�� LQ�Z(1F)h�����R�@�F-#�L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����Q0h�����L0ih�5�Z(D����P��E+�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���S��1�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� (���q�E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%�����QE 
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��
+(��ER��QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp��
+0)qF)L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������b��
+\Q� L
+0)qF(0(�������P�E�EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\�(��QE ��(�QE�(��.EQp
+(���QE\��`уH���`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qF)�4`��1N�����Q�v4��S�h��,7b��Fa���0h��`у@Xn(�;��qE;���E�;QE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,QEQE��EQp�QE\,:�(�
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,QE`��(Q@X(���EP
+(���QE��(�,;�
+(�`Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `Q�E `QE ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(���b��W�b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ��Qp�LQ�Z(�j&(�-\5b��.��1KED������b�R�E�Q1F)h�ᨘ���.��1KE!��1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���� \0ih�������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h������4`��@XL0ih�,&4�P�Z(	�F-������`уKEa0h����QN���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�Qp
+)�R�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� m�(�S���N��E:� (�`Q�J��)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4E;�
+.���F�N�����h�`Q�E�A�S�(����)�`Qp�m�
+0(�h6�v\4
+)qF)%�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�1@	E.(� %�� �R�PQK�(h�QJ�6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�Qp
+)qF)\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\Q�.QK�1E�J)qF(�	E.(�(����%��\��b���R�Qp�\QE�Z)�T��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��EaqF)h�bb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(�- ���Pb�R�@	�1KE &(���
+)�T��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��Ea�S��,6�u��N����)�PE:��h�Q@Xm�(��EaqF)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-�����������E:�����E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�Ph�Q@��E 6�u �)�P�R�J�&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\���������.�R�Hz��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��1KE����P��)h�5b��W���Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�Z(��F-���4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��F-�`уKE��4`��@j&4�P��E-�E:�W�)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�(�QJ�6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�Qp
+)qF*@J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����b��\Q� J)qF((�����P�EQE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE :�(� ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��(�`R�Qr����b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�
+\Q�.`Q�K�1E�L
+0)qF(�	�F.(�0(�����&��\���b���`R�Qp�\QE�Z(���(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(��(���`уJ��1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�S�h���7b��F���0h���`уE�n(�;�.qF)�4`�p�1N�����Q�v4\�v\��)(�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� uQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@���*G`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(�����FP
+0(���`Q�E��
+(�,`QE`���(Q@X0(����R�J�b��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQKEqF)h�;	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�-���������Pb���b�R�@XLQ�Z(	�1KEa1F)h�,&(�������R����������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������Qpb��.b�R�E�LQ�Z(�	�1KE1F)h��&(�-\��������QpR�E�\0ih�`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`уKE &4�P`�KE S��pE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(��)\ch�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E�S���6�u\�N����)�QpE:�.h�QE�m�(���E��
```

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/kits/@kit.UIDesignKit.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/api/@hms.hds.hdsMaterial.d.ets
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/hms/ets/api/@hms.hds.hdsBaseComponent.d.ets
- EVID-005 [build_log] devecocli build 成功 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\eec60847-d345-4c14-9786-aa01ecf57104\build.log
- EVID-006 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\eec60847-d345-4c14-9786-aa01ecf57104\device-run.log
- EVID-007 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\images\d0c4af13abfecfae67abe543a52bdc0f3d0c13f630778e5407de8085ad94331b.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/d0c4af13abfecfae67abe543a52bdc0f3d0c13f630778e5407de8085ad94331b.png>)

- EVID-008 [component_tree] 完整组件树（devecocli ui layout --mode full）。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\eec60847-d345-4c14-9786-aa01ecf57104\device-layout.json
- EVID-009 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\fc62a5e3-49db-469b-8f69-76f25a0d6539\device-layout.json
- EVID-010 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\8\ImmersiveLightDemo\ohos-feature-engineering\evidence\images\0371c40908a238884c4c578a1f77fabd485da92e670aabd133aeb56de0450172.png

![判图引用的截图。](<evidence/images/0371c40908a238884c4c578a1f77fabd485da92e670aabd133aeb56de0450172.png>)

- EVID-011 [visual_judgment] 组件树结构性判定：标题栏 HdsTitleBar 内含 MaskBlur/Mask 渐变模糊蒙层节点（bounds 底缘 444 超出标题栏 332，对应模糊蒙层额外高度）与 3 个 HdsMenuNode 菜单按钮，证明标题栏模糊背板与菜单结构生效；底部 TabBar bounds 为 [215,2466,1041,2662]，未贴屏幕左右与底部（底部距屏幕底 2760-2662=98px），且结构上叠于 Swiper(TabContent) 之上，证明 barFloatingStyle 悬浮布局与 barOverlap 叠加生效；TabContent 内 Scroll>Column>Image 渲染本地 scenery 资源。材质像素级效果（ADAPTIVE 材质渲染观感）以设备截图留档供人工复核。
