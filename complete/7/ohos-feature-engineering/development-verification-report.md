# 代码开发验证报告

- 工程：D:\HW\testproject\complete\7
- 开发目标数：2

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 生成鸿蒙demo验证FAQ解决方案是否正确（排障验证：设置systemMaterial后看不到材质效果）：背景色或背景模糊遮挡材质效果；materialColor传入不透明颜色后材质效果消失 | arkui-api26 | inconclusive |
| 生成鸿蒙demo验证FAQ解决方案是否正确（排障验证：设置systemMaterial后看不到材质效果）：背景色或背景模糊遮挡材质效果；materialColor传入不透明颜色后材质效果消失；并增加静态彩色色块背景增强沉浸光感可观察性 | arkui-api26 | inconclusive |

## 生成鸿蒙demo验证FAQ解决方案是否正确（排障验证：设置systemMaterial后看不到材质效果）：背景色或背景模糊遮挡材质效果；materialColor传入不透明颜色后材质效果消失

- 判据策略：fresh，冻结于 2026-09-11T04:13:49.755Z

- 总结果：`inconclusive`
- 能力：immersive-light
- 技术路线：arkui-api26

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-S008-C01：页面顶部调用 uiMaterial.isImmersiveMaterialSupported() 与 uiMaterial.getGlobalMaterialLevel() 并展示结果，采用 ui-material-api.md 示例5 的只读属性模式。
  - 官网冻结来源：ui-material-api:1161-1163，片段 SHA-256：`059cb5bdaec094f4729315a0a1ccea0de4f54185436ee5857d7dcaa22d2c4acd`
- IL-S008-C02：展示不支持沉浸式材质时设置无效果的提示文案，帮助在验证截图上区分设备能力问题与遮挡问题。
  - 官网冻结来源：ui-material-api:3-3，片段 SHA-256：`773189baec5721506258ee3ae273f7e24dd236ca678a7023d1acbf00c0873227`
- IL-S008-C03：FAQ2 验证组错误卡片：materialColor: Color.Red（纯不透明），预期材质滤镜效果被完全遮挡，仅显示纯红背景。
  - 官网冻结来源：faq:220-225，片段 SHA-256：`65736b4021ab0c2e9e30a4925988714af4b7dfabac0fd6980d33885ad05b5565`
- IL-S008-C04：FAQ2 验证组推荐卡片：materialColor: '#80FF0000'（50% 透明度红色），预期材质在透出背景内容的同时呈现红色调。
  - 官网冻结来源：faq:227-232，片段 SHA-256：`e633c36a35db7c0dfc7e8184a1abed7d4656bd43ae75a8b43f8098af3ab1c926`
- IL-S008-C05：在 FAQ2 组说明文字中注明 materialColor 分档行为：高/中算力为材质滤镜混合纯色，低算力作为背景色属性值。
  - 官网冻结来源：faq:216-216，片段 SHA-256：`f6cfc40d2d0d309c1bccf076ed2cfe17ac271eee9ba5fc866f6c056e4848e572`
- IL-S008-C06：demo 全部卡片不设置 shadow 通用属性，材质阴影由默认 applyShadow=true 提供；不引入重复阴影负面场景。
  - 官网冻结来源：common:193-193，片段 SHA-256：`7ba2a9249648ae82ccfcaa02d0072a9d59990022a3230ef5ad408b7df92877f8`
- IL-S008-C07：材质仅设置在 328x56 小卡片上，不整页设置；不叠加视频动图等动态背景，页面背景为静态渐变。
  - 官网冻结来源：constraints:5-9，片段 SHA-256：`f3a83fe8cf50af9f63e0c040c3e0671f229859333306dee58f0dac49ae3e581c`
- IL-S008-C08：推荐写法卡片不叠加 backgroundBlurStyle；背景模糊仅出现在 FAQ1 错误示例卡片中（复现官网 FAQ 错误写法以验证遮挡结论，属场景必需的负面用例，Static blur-stacking 检查将按预期返回 inconclusive）。
  - 官网冻结来源：constraints:87-108，片段 SHA-256：`6409a4384490c40fa2c52a082c7581aad869309ca21ea79b4784459d7d676883`
- IL-S008-C09：FAQ1 验证组错误卡片 A：按官网 FAQ 错误写法将 .backgroundColor(Color.White) 设置在 .systemMaterial(...) 之后，预期不透明背景覆盖材质层、卡片呈纯白。
  - 官网冻结来源：faq:143-157，片段 SHA-256：`1ff403efe6673f7560b7fcbe791a1dc8dd964c1c522537a88a606ab8e144707e`
- IL-S008-C10：FAQ1 验证组：错误卡片 B（systemMaterial 后叠加 backgroundBlurStyle 复现模糊遮挡）；推荐卡片（backgroundColor(Color.Transparent) 在前、systemMaterial 在后，且不设置背景模糊），预期推荐卡片呈现材质通透效果。
  - 官网冻结来源：faq:155-184，片段 SHA-256：`a651973ebedca5b7acf54b39a36a5add2571cb508bef73ebc6a42881f530b385`
- IL-S008-C11：采用 constraints.md 正例骨架：材质卡片全部置于 Navigation 标题栏子树（.title({ builder, height: '100%' })），保证普通 Column 组件处于生效范围内。
  - 官网冻结来源：constraints:20-45，片段 SHA-256：`00800b98d363ea43743e22e286d81e0864494af3b5cfc17e7ac93b5344147618`
- IL-S008-C12：推荐卡片中 backgroundColor 等样式属性在前、systemMaterial 最后设置；错误卡片按 FAQ 原文复现错误顺序（材质在前、背景在后）以验证顺序影响。
  - 官网冻结来源：faq:300-328，片段 SHA-256：`11a6cd832e9ff376f1077b92f6da63e0a54837b84b9a58681548d4c71461c630`
- IL-S008-C13：卡片固定 width(328)、height(56)、borderRadius(28)，布局区域与可视区域一致，材质渲染区域可预期。
  - 官网冻结来源：faq:348-368，片段 SHA-256：`565e7587fe4924effabb8d545f6421c656d8909cb02b2bbb83194ea5bece147d`
- IL-S008-C14：demo 使用普通容器 Column 承载材质，不使用 TextArea 等自绘制组件，不出现内容层遮挡背板层的场景。
  - 官网冻结来源：faq:400-414，片段 SHA-256：`9f781b5d065d82c13757eee8c40c783f8a67b8c985feb9d68894cbadd69eaa73`
- IL-S008-C15：推荐卡片先设置 backgroundColor(Color.Transparent) 再设置 systemMaterial，与官方示例5注释中背景色写在前、材质写在后的顺序一致；说明文字注明高/中算力设备上 systemMaterial 生效后已设背景色会被恢复为透明色。
  - 官网冻结来源：ui-material-api:25-25，片段 SHA-256：`1528d0bb3fd5c9ad8c17e347905df44d0a411bd24cb840c16d5b2473965f01cc`
- IL-S008-C16：三组 ImmersiveMaterial 对象一次性定义为只读属性，页面无定时器或交互修改材质参数，子树结构稳定。
  - 官网冻结来源：constraints:194-209，片段 SHA-256：`de423ecedd206d4b2baec813920cc6c2ed1b269ef3f73ec8b231409251e30cfb`
- IL-S008-C17：在 FAQ1 推荐卡片说明文字中注明：THIN 薄样式边框呈现周围背景颜色为正常折射现象而非故障；FAQ2 推荐卡片说明半透明赋色可降低折射可见程度。
  - 官网冻结来源：faq:186-200，片段 SHA-256：`86741cef756ec5fc2c477ffcaa04587f58758d8970c41bc5b9c6bd8b185a75be`
- IL-S008-C18：诊断区展示材质等级并说明：材质效果随设备算力档位自适应，低算力设备上 style 不产生差异，无需差异化代码。
  - 官网冻结来源：faq:234-246，片段 SHA-256：`c1772384a2a8f07a35bfc6c699d7eca8bdbf3966016cf1c3063141acf3387dc4`
- IL-S008-C19：诊断区说明材质效果受系统设置中沉浸光感强弱配置影响，不同配置下参数和效果存在差异。
  - 官网冻结来源：ui-material-api:25-25，片段 SHA-256：`1528d0bb3fd5c9ad8c17e347905df44d0a411bd24cb840c16d5b2473965f01cc`

#### S01 · 已实施

将 build-profile.json5 的 targetSdkVersion 与 compatibleSdkVersion 配置为 26.0.0（uiMaterial 起始版本 26.0.0，demo 无低版本兼容需求）

- 位置：`build-profile.json5:8-9`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-9`（修改后；已对应 diff）
- 判据依据（fresh）：uiMaterial 查询与材质接口起始版本 26.0.0，工程 SDK 版本须满足接口版本前提
  - IL-S008-C01：运行时通过 uiMaterial.getGlobalMaterialLevel() 获取全局材质等级（与设备算力相关、由设备定义不可修改），通过 uiMaterial.isImmersiveMaterialSupported() 判断设备是否支持沉浸式材质。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：获取全局材质等级，与设备算力相关 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S02 · 已实施

Index.ets 引入 @kit.ArkUI 的 uiMaterial，以只读属性方式调用 isImmersiveMaterialSupported()/getGlobalMaterialLevel() 并在演示区顶部展示诊断结果与自适应说明

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-14`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:51-70`（修改后；已对应 diff）
- 判据依据（fresh）：运行时能力与档位查询
  - IL-S008-C01：运行时通过 uiMaterial.getGlobalMaterialLevel() 获取全局材质等级（与设备算力相关、由设备定义不可修改），通过 uiMaterial.isImmersiveMaterialSupported() 判断设备是否支持沉浸式材质。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：获取全局材质等级，与设备算力相关 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：不支持设备可设置但无效果的提示
  - IL-S008-C02：只有支持沉浸式材质的设备上设置沉浸式材质才有效果；在不支持沉浸式材质的设备上可设置沉浸式材质但无效果。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：在不支持沉浸式材质的设备上可设置沉浸式材质但无效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：算力档位自适应说明
  - IL-S008-C18：沉浸式系统材质的效果会根据设备算力档位自动适配：高算力和中算力设备上影响材质滤镜效果和阴影效果，低算力设备上仅影响背景色、边框颜色、边框宽度和阴影效果，style 和 colorInvert 参数在低算力设备上设置不会产生视觉效果差异；这是系统级自适应行为，开发者无需为不同档位设备编写差异化代码。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：沉浸式系统材质的效果会根据设备算力档位自动适配 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：系统沉浸光感配置影响说明
  - IL-S008-C19：同一材质的效果会受到系统设置应用中沉浸光感配置项的影响，不同强弱程度的沉浸光感配置下，材质的参数和效果存在差异。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：不同强弱程度的沉浸光感配置下，材质的参数和效果存在差异 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S03 · 已实施

页面骨架：Stack 内 Navigation 内容区为静态线性渐变背景，标题栏子树（.title({ builder, height: '100%' })）承载可滚动的演示卡片列表

- 位置：`entry/src/main/ets/pages/Index.ets:47-50`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:160-191`（修改后；已对应 diff）
- 判据依据（fresh）：普通组件材质仅在 Navigation/NavDestination 标题栏或底部 TabBar 生效
  - IL-S008-C11：沉浸光感生效范围：弹窗类组件/接口与按钮选择类组件（Slider、Toggle、Select）可在页面内全部区域生效；其他组件仅在 Navigation/NavDestination 标题栏或横向 Tab 中 barPosition 为 BarPosition.End 的底部 TabBar 中生效，在其他区域中设置沉浸光感效果不生效。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：在其他区域中设置沉浸光感效果不生效 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：材质限定在局部小区域、非动态背景
  - IL-S008-C07：沉浸光感效果应作为一种稀缺视觉资源使用，需控制面积与层数、不应固定显示在视频动图动画等变化的内容之上。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：需控制面积与层数 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`

#### S04 · 已实施

FAQ1 验证组三张卡片：错误A（systemMaterial 后设置 backgroundColor(Color.White)）、错误B（systemMaterial 后设置 backgroundBlurStyle）、推荐（backgroundColor(Color.Transparent) 在前 + systemMaterial 在后，无模糊）；含分组标题与说明辅助组件

- 位置：`entry/src/main/ets/pages/Index.ets:15-46`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:71-121`（修改后；已对应 diff）
- 判据依据（fresh）：复现不透明背景/背景模糊覆盖材质层的现象
  - IL-S008-C09：沉浸光感的视觉层级位于组件的 backgroundColor、backgroundBlurStyle 等属性之下；如果同时设置了不透明的背景色或背景模糊样式，这些属性会覆盖在材质层之上，导致材质效果被遮挡不可见。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：导致材质效果被遮挡不可见 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：背景透明与移除模糊两条解决措施
  - IL-S008-C10：背景色或背景模糊遮挡材质效果的解决措施：将组件的背景色设置为透明（Color.Transparent）或移除背景色设置；移除 backgroundBlurStyle 等背景模糊样式，避免模糊效果覆盖材质层。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：将组件的背景色设置为透明（Color.Transparent）或移除背景色设置 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：错误卡片B按FAQ原文复现模糊叠加错误写法（负面用例），推荐卡片不叠加背景模糊
  - IL-S008-C08：沉浸式系统材质自带的材质滤镜已包含背景模糊效果，再叠加 backgroundBlurStyle、backgroundEffect 等模糊属性属于重复处理，会增加额外的功耗开销。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：属于重复处理，会增加额外的功耗开销 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：推荐卡片 systemMaterial 位于其他样式属性之后
  - IL-S008-C12：通过通用属性 systemMaterial 设置沉浸式系统材质时，应将 systemMaterial 放在其他样式属性（如背景色、边框、阴影等）之后设置；放在其他样式属性之前可能导致材质效果优先级与预期不符。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：放在其他样式属性（如背景色、边框、阴影等）之后设置 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：固定 width/height/borderRadius 保证渲染区域与可视区域一致
  - IL-S008-C13：材质渲染区域由组件布局区域决定，组件可视区域为实际呈现内容的区域，可能不等于布局区域；应通过 width、height、borderRadius 接口控制组件可视区域与材质渲染区域一致。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：材质渲染区域由组件布局区域决定 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：背景色在前、材质在后的顺序及恢复透明行为说明
  - IL-S008-C15：在支持沉浸式材质的高算力和中算力设备上，当 systemMaterial 属性生效后，已设置的背景色属性 backgroundColor 会被恢复为透明色，已设置的边框宽度 borderWidth 属性会被恢复为无边框效果。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：会被恢复为透明色 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：注明薄样式边框折射为正常现象
  - IL-S008-C17：设置沉浸式系统材质后组件边框呈现出周围背景的颜色是正常的折射光学表现而非渲染故障；沉浸光感视效能够将组件周围的内容透过材质层折射到组件的边框区域，在 ULTRA_THIN 和 THIN 等薄材质样式下表现更为明显。减少折射的措施：使用较厚的材质样式（REGULAR、THICK、ULTRA_THICK）降低材质透明度，或为材质层添加 materialColor 半透明赋色。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：能够将组件周围的内容透过材质层折射到组件的边框区域 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`

#### S05 · 已实施

FAQ2 验证组两张卡片：错误（materialColor: Color.Red 不透明）、推荐（materialColor: '#80FF0000' 半透明），材质对象以只读属性一次性定义；含底部验证方法说明

- 位置：`entry/src/main/ets/pages/Index.ets:122-159`（修改后；已对应 diff）
- 判据依据（fresh）：复现不透明 materialColor 遮挡材质滤镜效果
  - IL-S008-C03：materialColor 参数为材质滤镜再混合一层纯色效果；该颜色需要带有一定的透明度值，如果传入纯不透明颜色（如 Color.Red 或 '#FFFF0000'），会遮挡材质滤镜效果，组件仅显示纯色背景。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：该颜色需要带有一定的透明度值 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：推荐写法传入带透明度颜色值
  - IL-S008-C04：materialColor 传入不透明颜色导致材质效果消失的解决措施：为 materialColor 传入带有透明度的颜色值（示例 '#80FF0000' 为带有 50% 透明度的红色）。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：传入带有透明度的颜色值 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：分档行为说明文字
  - IL-S008-C05：materialColor 参数对所有档位的算力设备均生效：高算力和中算力设备上该参数为材质滤镜再混合一层纯色效果；低算力设备上该参数作为背景色 backgroundColor 属性值。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：该参数作为背景色 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：材质参数一次性定义并保持稳定
  - IL-S008-C16：频繁修改 style、materialColor 等材质参数，或在材质区域内频繁增删子节点，都会触发材质效果重新计算；建议一次性确定材质参数并保持稳定，材质区域内部的子树结构也应尽量稳定。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：都会触发材质效果重新计算 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | inconclusive | 场景静态规则存在失败或待人工确认项。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 应用在模拟器（127.0.0.1:5555，API 26）安装并拉起成功，页面正常渲染；用户确认运行无异常。 |
| visual | 是 | passed | 用户在模拟器上人工确认：FAQ1 验证组错误卡片呈纯白/模糊背景（材质被遮挡不可见）、推荐卡片透出渐变背景的材质效果；FAQ2 验证组 Color.Red 卡片呈纯红色（材质效果消失）、'#80FF0000' 卡片呈半透明红色调材质。两组错误/推荐对比均符合官网 FAQ 判据预期，两个 FAQ 解决方案验证正确。 |

### 代码变化

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`4d8acb824ee46741b3fe1a69824b3faeff0ec348c04ee9c56c771534134eebd1`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,191 @@
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
+
+  private plainMaterial: uiMaterial.ImmersiveMaterial =
+    new uiMaterial.ImmersiveMaterial({ style: uiMaterial.ImmersiveStyle.THIN });
+  private opaqueColorMaterial: uiMaterial.ImmersiveMaterial =
+    new uiMaterial.ImmersiveMaterial({ style: uiMaterial.ImmersiveStyle.THIN, materialColor: Color.Red });
+  private translucentColorMaterial: uiMaterial.ImmersiveMaterial =
+    new uiMaterial.ImmersiveMaterial({ style: uiMaterial.ImmersiveStyle.THIN, materialColor: '#80FF0000' });
+
+  @Builder
+  SectionHeader(title: string, subtitle: string) {
+    Column({ space: 4 }) {
+      Text(title)
+        .fontSize(18)
+        .fontWeight(FontWeight.Bold)
+        .fontColor('#FF182431')
+      Text(subtitle)
+        .fontSize(12)
+        .fontColor('#99182431')
+    }
+    .width('100%')
+    .alignItems(HorizontalAlign.Start)
+    .margin({ top: 16, bottom: 4 })
+  }
+
+  @Builder
+  CardCaption(main: string, detail: string, color: string) {
+    Column({ space: 2 }) {
+      Text(main)
+        .fontSize(13)
+        .fontWeight(FontWeight.Medium)
+        .fontColor(color)
+      Text(detail)
+        .fontSize(11)
+        .fontColor('#99182431')
+    }
+    .width(328)
+    .alignItems(HorizontalAlign.Start)
+  }
+
+  @Builder
+  MaterialDemoList() {
+    Scroll() {
+      Column({ space: 6 }) {
+        Text('沉浸光感 FAQ 验证 Demo')
+          .fontSize(22)
+          .fontWeight(FontWeight.Bold)
+          .fontColor('#FF182431')
+          .margin({ top: 12 })
+
+        Column({ space: 4 }) {
+          Text(`isImmersiveMaterialSupported: ${this.isSupported}`)
+            .fontSize(13)
+            .fontColor('#FF182431')
+          Text(`getGlobalMaterialLevel: ${this.materialLevel}`)
+            .fontSize(13)
+            .fontColor('#FF182431')
+          Text('材质效果随设备算力档位与系统沉浸光感强弱配置自适应；不支持沉浸式材质的设备上设置材质无效果。')
+            .fontSize(11)
+            .fontColor('#99182431')
+        }
+        .alignItems(HorizontalAlign.Start)
+        .width('100%')
+
+        this.SectionHeader('FAQ1 背景色或背景模糊遮挡材质效果',
+          '沉浸光感视觉层级位于 backgroundColor、backgroundBlurStyle 等属性之下，不透明背景或背景模糊会覆盖材质层')
+
+        Column({ space: 4 }) {
+          Column() {
+            Text('沉浸光感')
+              .fontSize(16)
+              .fontColor('#FF182431')
+          }
+          .width(328)
+          .height(56)
+          .borderRadius(28)
+          .justifyContent(FlexAlign.Center)
+          .systemMaterial(this.plainMaterial)
+          .backgroundColor(Color.White)
+          this.CardCaption('错误写法A：不透明背景色遮挡材质',
+            'systemMaterial 之后设置 backgroundColor(Color.White)，材质效果被遮挡不可见', '#FFE84026')
+        }
+
+        Column({ space: 4 }) {
+          Column() {
+            Text('沉浸光感')
+              .fontSize(16)
+              .fontColor('#FF182431')
+          }
+          .width(328)
+          .height(56)
+          .borderRadius(28)
+          .justifyContent(FlexAlign.Center)
+          .systemMaterial(this.plainMaterial)
+          .backgroundBlurStyle(BlurStyle.COMPONENT_THICK)
+          this.CardCaption('错误写法B：背景模糊遮挡材质',
+            'systemMaterial 之后叠加 backgroundBlurStyle，模糊效果覆盖材质层且重复处理', '#FFE84026')
+        }
+
+        Column({ space: 4 }) {
+          Column() {
+            Text('沉浸光感')
+              .fontSize(16)
+              .fontColor('#FF182431')
+          }
+          .width(328)
+          .height(56)
+          .borderRadius(28)
+          .justifyContent(FlexAlign.Center)
+          .backgroundColor(Color.Transparent)
+          .systemMaterial(this.plainMaterial)
+          this.CardCaption('推荐写法：背景透明，材质可见',
+            'backgroundColor(Color.Transparent) 在前、systemMaterial 在后，不设置背景模糊；边框若透出周围背景色为正常折射现象', '#FF0A59F7')
+        }
+
+        this.SectionHeader('FAQ2 materialColor 传入不透明颜色后材质效果消失',
+          'materialColor 为材质滤镜再混合纯色，需带透明度；纯不透明颜色会遮挡材质滤镜效果')
+
+        Column({ space: 4 }) {
+          Column() {
+            Text('沉浸光感')
+              .fontSize(16)
+              .fontColor('#FFFFFFFF')
+          }
+          .width(328)
+          .height(56)
+          .borderRadius(28)
+          .justifyContent(FlexAlign.Center)
+          .systemMaterial(this.opaqueColorMaterial)
+          this.CardCaption('错误写法：materialColor 为纯不透明 Color.Red',
+            '材质滤镜效果被完全遮挡，仅显示纯红色背景', '#FFE84026')
+        }
+
+        Column({ space: 4 }) {
+          Column() {
+            Text('沉浸光感')
+              .fontSize(16)
+              .fontColor('#FF182431')
+          }
+          .width(328)
+          .height(56)
+          .borderRadius(28)
+          .justifyContent(FlexAlign.Center)
+          .systemMaterial(this.translucentColorMaterial)
+          this.CardCaption("推荐写法：materialColor 为 '#80FF0000'（50% 透明度红色）",
+            '材质透出背景内容同时呈现红色调；高/中算力设备混合材质滤镜，低算力设备作为背景色属性值', '#FF0A59F7')
+        }
+
+        Text('验证方法：对比同组错误与推荐卡片。错误卡片呈纯色/模糊背景（材质不可见），推荐卡片呈透出渐变背景的材质效果，即 FAQ 解决方案正确。')
+          .fontSize(11)
+          .fontColor('#99182431')
+          .width('100%')
+          .margin({ top: 8, bottom: 24 })
+      }
+      .width('100%')
+      .alignItems(HorizontalAlign.Center)
+      .padding({ left: 16, right: 16 })
+    }
+    .width('100%')
+    .height('100%')
+    .scrollBar(BarState.Off)
+  }
+
+  build() {
+    Column() {
+      Navigation() {
+        Column()
+          .width('100%')
+          .height('100%')
+          .linearGradient({
+            angle: 180,
+            colors: [
+              ['#004AAF', 0.0],
+              ['#2787D9', 0.5],
+              ['#F0FAFF', 1.0]
+            ]
+          })
+      }
+      .title({ builder: this.MaterialDemoList, height: '100%' })
+    }
+    .width('100%')
+    .height('100%')
+  }
+}
+
```

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

### 待验证

- PENDING-001 [static] 场景静态规则存在失败或待人工确认项。

### 证据

- EVID-001 [static] 场景静态规则：inconclusive
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\de925c0e-5b11-4c3e-9cdd-4037c1d73e4e\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\de925c0e-5b11-4c3e-9cdd-4037c1d73e4e\device-run.log
- EVID-006 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\images\284ddc90d2e5e72ad92db7380775ae1758cf7a7f9e4097f1f8c586e4de830739.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/284ddc90d2e5e72ad92db7380775ae1758cf7a7f9e4097f1f8c586e4de830739.png>)

- EVID-007 [device_log] devecocli run 安装并拉起成功日志（本轮重跑前的同一构建产物） — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\3f5331be-dd32-457f-be1a-01b51d7495db\device-run.log
- EVID-008 [screenshot] 设备屏幕截图：含两个 FAQ 验证组的错误/推荐卡片对比 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\images\7936bc13cc5ee69861e10a2560da2bb8d0565593064360cf5f05bbaaa8ef487f.png

![设备屏幕截图：含两个 FAQ 验证组的错误/推荐卡片对比](<evidence/images/7936bc13cc5ee69861e10a2560da2bb8d0565593064360cf5f05bbaaa8ef487f.png>)



## 生成鸿蒙demo验证FAQ解决方案是否正确（排障验证：设置systemMaterial后看不到材质效果）：背景色或背景模糊遮挡材质效果；materialColor传入不透明颜色后材质效果消失；并增加静态彩色色块背景增强沉浸光感可观察性

- 判据策略：reuse，冻结于 2026-09-11T07:33:02.890Z

- 总结果：`inconclusive`
- 能力：immersive-light
- 技术路线：arkui-api26

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-S008-C01：页面顶部调用 uiMaterial.isImmersiveMaterialSupported() 与 uiMaterial.getGlobalMaterialLevel() 并展示结果，采用 ui-material-api.md 示例5 的只读属性模式。
  - 官网冻结来源：ui-material-api:1161-1163，片段 SHA-256：`059cb5bdaec094f4729315a0a1ccea0de4f54185436ee5857d7dcaa22d2c4acd`
- IL-S008-C02：展示不支持沉浸式材质时设置无效果的提示文案，帮助在验证截图上区分设备能力问题与遮挡问题。
  - 官网冻结来源：ui-material-api:3-3，片段 SHA-256：`773189baec5721506258ee3ae273f7e24dd236ca678a7023d1acbf00c0873227`
- IL-S008-C03：FAQ2 验证组错误卡片：materialColor: Color.Red（纯不透明），预期材质滤镜效果被完全遮挡，仅显示纯红背景。
  - 官网冻结来源：faq:220-225，片段 SHA-256：`65736b4021ab0c2e9e30a4925988714af4b7dfabac0fd6980d33885ad05b5565`
- IL-S008-C04：FAQ2 验证组推荐卡片：materialColor: '#80FF0000'（50% 透明度红色），预期材质在透出背景内容的同时呈现红色调。
  - 官网冻结来源：faq:227-232，片段 SHA-256：`e633c36a35db7c0dfc7e8184a1abed7d4656bd43ae75a8b43f8098af3ab1c926`
- IL-S008-C05：在 FAQ2 组说明文字中注明 materialColor 分档行为：高/中算力为材质滤镜混合纯色，低算力作为背景色属性值。
  - 官网冻结来源：faq:216-216，片段 SHA-256：`f6cfc40d2d0d309c1bccf076ed2cfe17ac271eee9ba5fc866f6c056e4848e572`
- IL-S008-C06：demo 全部卡片不设置 shadow 通用属性，材质阴影由默认 applyShadow=true 提供；不引入重复阴影负面场景。
  - 官网冻结来源：common:193-193，片段 SHA-256：`7ba2a9249648ae82ccfcaa02d0072a9d59990022a3230ef5ad408b7df92877f8`
- IL-S008-C07：材质仅设置在 328x56 小卡片上，不整页设置；不叠加视频动图等动态背景，页面背景为静态渐变。
  - 官网冻结来源：constraints:5-9，片段 SHA-256：`f3a83fe8cf50af9f63e0c040c3e0671f229859333306dee58f0dac49ae3e581c`
- IL-S008-C08：推荐写法卡片不叠加 backgroundBlurStyle；背景模糊仅出现在 FAQ1 错误示例卡片中（复现官网 FAQ 错误写法以验证遮挡结论，属场景必需的负面用例，Static blur-stacking 检查将按预期返回 inconclusive）。
  - 官网冻结来源：constraints:87-108，片段 SHA-256：`6409a4384490c40fa2c52a082c7581aad869309ca21ea79b4784459d7d676883`
- IL-S008-C09：FAQ1 验证组错误卡片 A：按官网 FAQ 错误写法将 .backgroundColor(Color.White) 设置在 .systemMaterial(...) 之后，预期不透明背景覆盖材质层、卡片呈纯白。
  - 官网冻结来源：faq:143-157，片段 SHA-256：`1ff403efe6673f7560b7fcbe791a1dc8dd964c1c522537a88a606ab8e144707e`
- IL-S008-C10：FAQ1 验证组：错误卡片 B（systemMaterial 后叠加 backgroundBlurStyle 复现模糊遮挡）；推荐卡片（backgroundColor(Color.Transparent) 在前、systemMaterial 在后，且不设置背景模糊），预期推荐卡片呈现材质通透效果。
  - 官网冻结来源：faq:155-184，片段 SHA-256：`a651973ebedca5b7acf54b39a36a5add2571cb508bef73ebc6a42881f530b385`
- IL-S008-C11：采用 constraints.md 正例骨架：材质卡片全部置于 Navigation 标题栏子树（.title({ builder, height: '100%' })），保证普通 Column 组件处于生效范围内。
  - 官网冻结来源：constraints:20-45，片段 SHA-256：`00800b98d363ea43743e22e286d81e0864494af3b5cfc17e7ac93b5344147618`
- IL-S008-C12：推荐卡片中 backgroundColor 等样式属性在前、systemMaterial 最后设置；错误卡片按 FAQ 原文复现错误顺序（材质在前、背景在后）以验证顺序影响。
  - 官网冻结来源：faq:300-328，片段 SHA-256：`11a6cd832e9ff376f1077b92f6da63e0a54837b84b9a58681548d4c71461c630`
- IL-S008-C13：卡片固定 width(328)、height(56)、borderRadius(28)，布局区域与可视区域一致，材质渲染区域可预期。
  - 官网冻结来源：faq:348-368，片段 SHA-256：`565e7587fe4924effabb8d545f6421c656d8909cb02b2bbb83194ea5bece147d`
- IL-S008-C14：demo 使用普通容器 Column 承载材质，不使用 TextArea 等自绘制组件，不出现内容层遮挡背板层的场景。
  - 官网冻结来源：faq:400-414，片段 SHA-256：`9f781b5d065d82c13757eee8c40c783f8a67b8c985feb9d68894cbadd69eaa73`
- IL-S008-C15：推荐卡片先设置 backgroundColor(Color.Transparent) 再设置 systemMaterial，与官方示例5注释中背景色写在前、材质写在后的顺序一致；说明文字注明高/中算力设备上 systemMaterial 生效后已设背景色会被恢复为透明色。
  - 官网冻结来源：ui-material-api:25-25，片段 SHA-256：`1528d0bb3fd5c9ad8c17e347905df44d0a411bd24cb840c16d5b2473965f01cc`
- IL-S008-C16：三组 ImmersiveMaterial 对象一次性定义为只读属性，页面无定时器或交互修改材质参数，子树结构稳定。
  - 官网冻结来源：constraints:194-209，片段 SHA-256：`de423ecedd206d4b2baec813920cc6c2ed1b269ef3f73ec8b231409251e30cfb`
- IL-S008-C17：在 FAQ1 推荐卡片说明文字中注明：THIN 薄样式边框呈现周围背景颜色为正常折射现象而非故障；FAQ2 推荐卡片说明半透明赋色可降低折射可见程度。
  - 官网冻结来源：faq:186-200，片段 SHA-256：`86741cef756ec5fc2c477ffcaa04587f58758d8970c41bc5b9c6bd8b185a75be`
- IL-S008-C18：诊断区展示材质等级并说明：材质效果随设备算力档位自适应，低算力设备上 style 不产生差异，无需差异化代码。
  - 官网冻结来源：faq:234-246，片段 SHA-256：`c1772384a2a8f07a35bfc6c699d7eca8bdbf3966016cf1c3063141acf3387dc4`
- IL-S008-C19：诊断区说明材质效果受系统设置中沉浸光感强弱配置影响，不同配置下参数和效果存在差异。
  - 官网冻结来源：ui-material-api:25-25，片段 SHA-256：`1528d0bb3fd5c9ad8c17e347905df44d0a411bd24cb840c16d5b2473965f01cc`

#### S01 · 部分实施

将 build-profile.json5 的 targetSdkVersion 与 compatibleSdkVersion 配置为 26.0.0（uiMaterial 起始版本 26.0.0，demo 无低版本兼容需求）

- 位置：`build-profile.json5:8-9`（修改前；未确认变更）
- 位置：`build-profile.json5:8-9`（修改后；未确认变更）
- 判据依据（fresh）：uiMaterial 查询与材质接口起始版本 26.0.0，工程 SDK 版本须满足接口版本前提
  - IL-S008-C01：运行时通过 uiMaterial.getGlobalMaterialLevel() 获取全局材质等级（与设备算力相关、由设备定义不可修改），通过 uiMaterial.isImmersiveMaterialSupported() 判断设备是否支持沉浸式材质。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：获取全局材质等级，与设备算力相关 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 待确认：build-profile.json5:8-9 无可对应的基线差异，实施情况待确认。
- 待确认：build-profile.json5:8-9 无可对应的基线差异，实施情况待确认。

#### S02 · 部分实施

Index.ets 引入 @kit.ArkUI 的 uiMaterial，以只读属性方式调用 isImmersiveMaterialSupported()/getGlobalMaterialLevel() 并在演示区顶部展示诊断结果与自适应说明

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:1-14`（修改后；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:51-70`（修改后；未确认变更）
- 判据依据（fresh）：运行时能力与档位查询
  - IL-S008-C01：运行时通过 uiMaterial.getGlobalMaterialLevel() 获取全局材质等级（与设备算力相关、由设备定义不可修改），通过 uiMaterial.isImmersiveMaterialSupported() 判断设备是否支持沉浸式材质。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：获取全局材质等级，与设备算力相关 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：不支持设备可设置但无效果的提示
  - IL-S008-C02：只有支持沉浸式材质的设备上设置沉浸式材质才有效果；在不支持沉浸式材质的设备上可设置沉浸式材质但无效果。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：在不支持沉浸式材质的设备上可设置沉浸式材质但无效果 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：算力档位自适应说明
  - IL-S008-C18：沉浸式系统材质的效果会根据设备算力档位自动适配：高算力和中算力设备上影响材质滤镜效果和阴影效果，低算力设备上仅影响背景色、边框颜色、边框宽度和阴影效果，style 和 colorInvert 参数在低算力设备上设置不会产生视觉效果差异；这是系统级自适应行为，开发者无需为不同档位设备编写差异化代码。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：沉浸式系统材质的效果会根据设备算力档位自动适配 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：系统沉浸光感配置影响说明
  - IL-S008-C19：同一材质的效果会受到系统设置应用中沉浸光感配置项的影响，不同强弱程度的沉浸光感配置下，材质的参数和效果存在差异。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：不同强弱程度的沉浸光感配置下，材质的参数和效果存在差异 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 待确认：entry/src/main/ets/pages/Index.ets:1-23 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:1-14 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:51-70 无可对应的基线差异，实施情况待确认。

#### S03 · 部分实施

页面骨架：Stack 内 Navigation 内容区为静态线性渐变背景，标题栏子树（.title({ builder, height: '100%' })）承载可滚动的演示卡片列表

- 位置：`entry/src/main/ets/pages/Index.ets:47-50`（修改后；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:160-171`（修改后；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:199-204`（修改后；未确认变更）
- 判据依据（fresh）：普通组件材质仅在 Navigation/NavDestination 标题栏或底部 TabBar 生效
  - IL-S008-C11：沉浸光感生效范围：弹窗类组件/接口与按钮选择类组件（Slider、Toggle、Select）可在页面内全部区域生效；其他组件仅在 Navigation/NavDestination 标题栏或横向 Tab 中 barPosition 为 BarPosition.End 的底部 TabBar 中生效，在其他区域中设置沉浸光感效果不生效。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：在其他区域中设置沉浸光感效果不生效 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：材质限定在局部小区域、非动态背景
  - IL-S008-C07：沉浸光感效果应作为一种稀缺视觉资源使用，需控制面积与层数、不应固定显示在视频动图动画等变化的内容之上。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：需控制面积与层数 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 待确认：entry/src/main/ets/pages/Index.ets:47-50 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:160-171 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:199-204 无可对应的基线差异，实施情况待确认。

#### S04 · 部分实施

FAQ1 验证组三张卡片：错误A（systemMaterial 后设置 backgroundColor(Color.White)）、错误B（systemMaterial 后设置 backgroundBlurStyle）、推荐（backgroundColor(Color.Transparent) 在前 + systemMaterial 在后，无模糊）；含分组标题与说明辅助组件

- 位置：`entry/src/main/ets/pages/Index.ets:15-46`（修改后；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:71-121`（修改后；未确认变更）
- 判据依据（fresh）：复现不透明背景/背景模糊覆盖材质层的现象
  - IL-S008-C09：沉浸光感的视觉层级位于组件的 backgroundColor、backgroundBlurStyle 等属性之下；如果同时设置了不透明的背景色或背景模糊样式，这些属性会覆盖在材质层之上，导致材质效果被遮挡不可见。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：导致材质效果被遮挡不可见 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：背景透明与移除模糊两条解决措施
  - IL-S008-C10：背景色或背景模糊遮挡材质效果的解决措施：将组件的背景色设置为透明（Color.Transparent）或移除背景色设置；移除 backgroundBlurStyle 等背景模糊样式，避免模糊效果覆盖材质层。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：将组件的背景色设置为透明（Color.Transparent）或移除背景色设置 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：错误卡片B按FAQ原文复现模糊叠加错误写法（负面用例），推荐卡片不叠加背景模糊
  - IL-S008-C08：沉浸式系统材质自带的材质滤镜已包含背景模糊效果，再叠加 backgroundBlurStyle、backgroundEffect 等模糊属性属于重复处理，会增加额外的功耗开销。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：属于重复处理，会增加额外的功耗开销 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：推荐卡片 systemMaterial 位于其他样式属性之后
  - IL-S008-C12：通过通用属性 systemMaterial 设置沉浸式系统材质时，应将 systemMaterial 放在其他样式属性（如背景色、边框、阴影等）之后设置；放在其他样式属性之前可能导致材质效果优先级与预期不符。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：放在其他样式属性（如背景色、边框、阴影等）之后设置 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：固定 width/height/borderRadius 保证渲染区域与可视区域一致
  - IL-S008-C13：材质渲染区域由组件布局区域决定，组件可视区域为实际呈现内容的区域，可能不等于布局区域；应通过 width、height、borderRadius 接口控制组件可视区域与材质渲染区域一致。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：材质渲染区域由组件布局区域决定 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：背景色在前、材质在后的顺序及恢复透明行为说明
  - IL-S008-C15：在支持沉浸式材质的高算力和中算力设备上，当 systemMaterial 属性生效后，已设置的背景色属性 backgroundColor 会被恢复为透明色，已设置的边框宽度 borderWidth 属性会被恢复为无边框效果。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：会被恢复为透明色 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`
- 判据依据（fresh）：注明薄样式边框折射为正常现象
  - IL-S008-C17：设置沉浸式系统材质后组件边框呈现出周围背景的颜色是正常的折射光学表现而非渲染故障；沉浸光感视效能够将组件周围的内容透过材质层折射到组件的边框区域，在 ULTRA_THIN 和 THIN 等薄材质样式下表现更为明显。减少折射的措施：使用较厚的材质样式（REGULAR、THICK、ULTRA_THICK）降低材质透明度，或为材质层添加 materialColor 半透明赋色。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：能够将组件周围的内容透过材质层折射到组件的边框区域 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 待确认：entry/src/main/ets/pages/Index.ets:15-46 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:71-121 无可对应的基线差异，实施情况待确认。

#### S05 · 部分实施

FAQ2 验证组两张卡片：错误（materialColor: Color.Red 不透明）、推荐（materialColor: '#80FF0000' 半透明），材质对象以只读属性一次性定义；含底部验证方法说明

- 位置：`entry/src/main/ets/pages/Index.ets:122-159`（修改后；未确认变更）
- 判据依据（fresh）：复现不透明 materialColor 遮挡材质滤镜效果
  - IL-S008-C03：materialColor 参数为材质滤镜再混合一层纯色效果；该颜色需要带有一定的透明度值，如果传入纯不透明颜色（如 Color.Red 或 '#FFFF0000'），会遮挡材质滤镜效果，组件仅显示纯色背景。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：该颜色需要带有一定的透明度值 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：推荐写法传入带透明度颜色值
  - IL-S008-C04：materialColor 传入不透明颜色导致材质效果消失的解决措施：为 materialColor 传入带有透明度的颜色值（示例 '#80FF0000' 为带有 50% 透明度的红色）。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：传入带有透明度的颜色值 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：分档行为说明文字
  - IL-S008-C05：materialColor 参数对所有档位的算力设备均生效：高算力和中算力设备上该参数为材质滤镜再混合一层纯色效果；低算力设备上该参数作为背景色 backgroundColor 属性值。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：该参数作为背景色 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 判据依据（fresh）：材质参数一次性定义并保持稳定
  - IL-S008-C16：频繁修改 style、materialColor 等材质参数，或在材质区域内频繁增删子节点，都会触发材质效果重新计算；建议一次性确定材质参数并保持稳定，材质区域内部的子树结构也应尽量稳定。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：都会触发材质效果重新计算 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 待确认：entry/src/main/ets/pages/Index.ets:122-159 无可对应的基线差异，实施情况待确认。

#### S06 · 部分实施

可观察性增强：在 Navigation 内容区渐变背景上叠加两排静态高饱和彩色色块（红/橙/绿、蓝/紫/粉），为材质滤镜与折射效果提供更易观察的背景内容

- 位置：`entry/src/main/ets/pages/Index.ets:173-184`（修改前；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:172-198`（修改后；未确认变更）
- 判据依据（fresh）：背景为静态色块与渐变，不属于视频动图等变化内容，材质上方叠加不触发动态重采样
  - IL-S008-C07：沉浸光感效果应作为一种稀缺视觉资源使用，需控制面积与层数、不应固定显示在视频动图动画等变化的内容之上。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：需控制面积与层数 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：高饱和色块使材质折射/滤镜透出效果更易肉眼对比观察
  - IL-S008-C17：设置沉浸式系统材质后组件边框呈现出周围背景的颜色是正常的折射光学表现而非渲染故障；沉浸光感视效能够将组件周围的内容透过材质层折射到组件的边框区域，在 ULTRA_THIN 和 THIN 等薄材质样式下表现更为明显。减少折射的措施：使用较厚的材质样式（REGULAR、THICK、ULTRA_THICK）降低材质透明度，或为材质层添加 materialColor 半透明赋色。
    - [沉浸光感常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) · 锚点：能够将组件周围的内容透过材质层折射到组件的边框区域 · SHA-256：`542084a3ed0e90c51d0fb5c6aa937687dd1bd708b959829f723f6519043d8532`
- 待确认：entry/src/main/ets/pages/Index.ets:173-184 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:172-198 无可对应的基线差异，实施情况待确认。

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | inconclusive | 场景静态规则存在失败或待人工确认项。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 应用在模拟器（127.0.0.1:5555，API 26）安装并拉起成功，页面正常渲染；用户确认运行无异常。 |
| visual | 是 | passed | 用户在模拟器上人工确认：FAQ1 验证组错误卡片呈纯白/模糊背景（材质被遮挡不可见）、推荐卡片透出渐变背景的材质效果；FAQ2 验证组 Color.Red 卡片呈纯红色（材质效果消失）、'#80FF0000' 卡片呈半透明红色调材质。两组错误/推荐对比均符合官网 FAQ 判据预期，两个 FAQ 解决方案验证正确。 |

### 代码变化

#### entry/src/main/ets/pages/Index.ets

- 状态：unchanged
- before：`e43ec7a4bc2b764a0998c85f04bd68d311ab4d021fd525037190a676002cfa0e`
- after：`e43ec7a4bc2b764a0998c85f04bd68d311ab4d021fd525037190a676002cfa0e`

#### build-profile.json5

- 状态：unchanged
- before：`810fc1e7293f5581220f36bc2383ed91a426f7697262b758d8e21ba3cce217bf`
- after：`810fc1e7293f5581220f36bc2383ed91a426f7697262b758d8e21ba3cce217bf`

### 待验证

- PENDING-001 [static] 场景静态规则存在失败或待人工确认项。

### 证据

- EVID-001 [static] 场景静态规则：inconclusive
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\745f5c2e-1167-4c97-b251-9e715c78e2bc\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\745f5c2e-1167-4c97-b251-9e715c78e2bc\device-run.log
- EVID-006 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\images\86f1a84cb0ca40525ec50ecdcc1d35de27205b61fdcb62ff37c5ebe059f0fa06.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/86f1a84cb0ca40525ec50ecdcc1d35de27205b61fdcb62ff37c5ebe059f0fa06.png>)

- EVID-007 [device_log] devecocli run 安装并拉起成功日志（本轮重跑前的同一构建产物） — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\3f5331be-dd32-457f-be1a-01b51d7495db\device-run.log
- EVID-008 [screenshot] 设备屏幕截图：含两个 FAQ 验证组的错误/推荐卡片对比 — D:\HW\testproject\complete\7\ohos-feature-engineering\evidence\images\7936bc13cc5ee69861e10a2560da2bb8d0565593064360cf5f05bbaaa8ef487f.png

![设备屏幕截图：含两个 FAQ 验证组的错误/推荐卡片对比](<evidence/images/7936bc13cc5ee69861e10a2560da2bb8d0565593064360cf5f05bbaaa8ef487f.png>)
