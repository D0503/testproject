# HarmonyOS 文档质量审查报告

## 维度评分

按维度得分从高到低排列。

| 维度 | 权重 | 得分 | 说明 |
|---|---:|---:|---|
| 安全合规 | 3 | 92 | 无敏感信息泄露；[功耗优化文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints)提供温控、算力自适应等性能合规建议；元服务/卡片能力边界标注完备。 |
| 版本兼容性 | 12 | 88 | ArkUI 路线（API 26.0.0 起）与 HDS 路线（6.1.0(23) 起）分层清晰；[开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)明确 targetSDKVersion 不低于 26.0.0 的前置条件并提供低版本兼容指引链接；各 API 起始版本、元服务/卡片能力标注完备一致。未发现 compatibleSdkVersion/targetSdkVersion/compileSdkVersion 关系错误。 |
| 行文逻辑与信息架构 | 10 | 85 | 容器页→简介→开发指导（开启/组件适配/材质视效）→功耗优化→FAQ→典型场景的信息架构清晰；容器页（[arkts-immersive-light-sense](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense) / [development](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-development)）为纯导航页且链接完整；README 索引与实际文件一一对应，并如实记录 compatibility 页已下线的情况。 |
| 完整性 | 10 | 78 | empty 关闭能力的模式覆盖在 [API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial)中仅提 ENABLE，开启指南另述默认开启组件也可用 empty 关闭（DOC-008）；lightEffect 省略时'取决于组件是否默认有交互光感效果'但未提供默认具备该效果的组件清单（DOC-007）；DEFAULT 模式下默认开启组件的完整清单分散在 API 参考与 FAQ 两处（DOC-004）。 |
| 上下文清晰与歧义 | 10 | 72 | DOC-005：FAQ 称材质视觉层级位于背景色之下会被遮挡，而 API 参考与示例5 表明高/中算力设备材质生效后背景色自动恢复透明、且官方推荐同时设置背景色作降级兜底，两套表述未对齐算力/组件作用域，开发者难以调和。DOC-004 的'组件默认开启'未限定组件范围亦属条件限定不足。 |
| 开发者易用性与可复现性 | 15 | 70 | DOC-009：典型场景示例四个代码块均使用 uiMaterial 但无一提供 import 语句，listItems 虽有注释提示但整体不可直接复制运行；DOC-010：示例代码存在异常缩进等格式瑕疵与未标注语言的代码围栏；DOC-011：术语大小写不统一与循环表述降低检索效率。正面：FAQ 每条问题均含现象/原因/措施/示例四段，排障路径完备。 |
| 技术正确性 | 25 | 62 | DOC-001（disable 语义文档内直接矛盾，API 参考与官网实时版本佐证'全局禁用'一侧）与 DOC-003（典型场景示例 materialColor 传入纯不透明色，违反三处文档一致声明的赋色规则，官网 API 实时版本再次确认该规则）为核心技术主张层面的已确认缺陷。其余 API 名称、参数默认值、枚举值交叉核对未见错误。 |
| 一致性 | 10 | 60 | DOC-001 为同文档内直接矛盾；DOC-002（'按钮与选择类组件'成员集与生效枚举不一致）为组件适配页与五处生效范围表述的类目级冲突；DOC-004（DEFAULT 模式默认开启范围）为跨文档范围歧义；DOC-006（索引条沉浸光感引文指向互斥的模糊材质示例，官网参考页 2026-09-10 实时取证确认）为已确认的指南-参考引文冲突；DOC-007（lightEffect 省略行为）为指南与 API 参考表述不一致。正面：生效范围约束在简介/开启/功耗优化/FAQ/API 参考五处互相一致，但与组件适配页同名类目成员集不一致（DOC-002）；UI Design Kit 与 ArkUI 两条路线的分工说明一致；hdsMaterial.MaterialLevel 枚举在 FAQ 与 hdsMaterial 参考中一致。 |
| 链接资源 | 5 | 100 | 正文官网交叉链接保留完整、锚点规范。 |

## Findings

以下问题按严重度从高到低排列；同一严重度保持原始顺序。

### DOC-001 · 应用级 disable 的作用范围在同一文档内直接矛盾

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`confirmed` / `High` / `certain`
- 位置：[arkts-immersive-light-sense-enable · 沉浸光感开启方式对比（行 43）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)
- 原文：应用级开关设置为disable时，会全局禁用沉浸光感，应用级或组件级开启的设置均不生效。
- 被检验主张：module.json5 应用级开关设置为 disable 时，组件级开启的沉浸光感设置是否仍然生效。

同一文档第 43 行无条件断言 disable 全局禁用、组件级开启均不生效；第 52 行又无条件断言 disable 只针对应用级开启的组件。两处均未附加版本、算力、组件等任何限定，六个作用域轴完全相同而结果互斥。[API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) MaterialState.DISABLE 的定义（'所有组件禁止开启沉浸式系统材质，即使主动为组件设置沉浸式系统材质参数也不会生效'）与官网 2026-09-08 实时抓取内容均站在'全局禁用'一侧，故第 52 行为孤立且与参考矛盾的表述。

影响：开发者按第 52 行理解，会认为配置 disable 后仍可通过组件级 systemMaterial 保留局部沉浸光感；实际（按第 43 行与 API 参考）材质全部被禁用，组件级沉浸光感效果全部丢失，且排障时无法从文档获得可靠结论。

- 内部冲突主题：module.json5 应用级开关 disable 对组件级开启沉浸光感的组件是否生效
- 原子命题 A：应用级开关设置为disable时，会全局禁用沉浸光感，应用级或组件级开启的设置均不生效。 → 组件级开启的沉浸光感设置不生效（被全局禁用）
- 原子命题 B：应用级关闭：应用级开关设置为disable，只针对应用级开启的组件。 → 组件级开启的组件不受 disable 影响（disable 只针对应用级开启的组件）
- 共同作用域：版本=未限定；模式=disable；组件=未限定；条件=未限定；环境=未限定；生命周期=未限定
- 互斥原因：同一 disable 开关下，组件级开启的沉浸光感不可能既被禁用又不受影响，两个结果不能同时成立。

建议：将第 52 行修改为与第 43 行及 MaterialState.DISABLE 定义一致，例如：'应用级关闭：应用级开关设置为 disable，会全局禁用沉浸光感；如需保留部分组件的沉浸光感，应改用 enable/default 模式并对不需要的组件单独设置 uiMaterial.Material.empty。'

建议改写：2. 应用级关闭：应用级开关设置为 disable，全局禁用沉浸光感，应用级或组件级开启的设置均不生效；如需仅关闭部分组件，请使用组件级关闭方式。

### DOC-002 · '按钮与选择类组件'分类成员集与全页面生效枚举跨文档不一致

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`ambiguous` / `High` / `high`
- 位置：[arkts-immersive-light-sense-component-adaptation · 按钮与选择类组件（行 106）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation)
- 原文：按钮与选择类组件包括Button、Select、Toggle、Slider、ChipGroup和SegmentButton
- 被检验主张：Button、ChipGroup、SegmentButton 属于'按钮与选择类组件'，可在页面内全部区域设置并生效沉浸光感。

[开启指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)（行 8-10，与[简介](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-overview) 行 49、[功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) 行 15、[FAQ](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) 行 34、[API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) 行 23 共五处完全一致）将'可在页面内全部区域生效'的按钮与选择类组件枚举为（Slider、Toggle、Select），并规定'其他组件仅在Navigation/NavDestination标题栏或横向Tab中barPosition为BarPosition.End的底部TabBar中生效'；[组件适配指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) 行 106 却将同一类目'按钮与选择类组件'定义为六个成员（新增Button、ChipGroup、SegmentButton），且 Button（行 108-120）、ChipGroup、SegmentButton 小节均未复述任何生效区域限制，仅'其余组件'小节（行 191）标注了受限区域。同一类目名在两处成员集不同（3 个 vs 6 个），'全页面生效'的实际判定依据是被显式枚举而非属于该分类：按开启指南枚举，Button 等三组件落入'其他组件'、仅标题栏/底部TabBar生效；按组件适配指南分类名与'内嵌于内容流中的交互元素'的定位理解，则预期全页面生效。两侧对同一组件在同一模式下给出相反预期。

影响：开发者在内容区为 Button、ChipGroup、SegmentButton 设置 systemMaterial 后，若实际走'其他组件'受限规则，材质效果静默不生效且无任何报错，产生'能力未生效'误判与排障成本；且任一文档单独阅读都无法获得这三个组件的确定生效范围。

建议：统一两处口径——在组件适配指南 Button、ChipGroup、SegmentButton 小节显式补充生效区域说明（如'生效区域同其余组件，仅 Navigation/NavDestination 标题栏或 BarPosition.End 底部 TabBar'），或将开启指南等五处枚举改为与六成员分类一致（以官方实际行为为准）；并避免两页复用同一类目名表达不同成员集。

### DOC-003 · 典型场景示例 materialColor 传入纯不透明颜色，违反赋色规则

- 维度：`technical_correctness`
- 状态 / 严重度 / 置信度：`confirmed` / `High` / `high`
- 位置：[arkts-immersive-light-sample · 内容区标题栏开启沉浸光感（行 289）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample)
- 原文：materialColor: '#d3d3d3'
- 被检验主张：ImmersiveOptions.materialColor 传入不带透明度通道的 6 位 HEX 颜色（'#d3d3d3'、'#333333'）即可获得正常的材质赋色与滤镜效果。

[沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability)、[FAQ](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq) 与 [API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial)三处一致声明 materialColor 需带一定透明度，'若该颜色为纯不透明的颜色，会遮挡材质层滤镜效果'，FAQ 进一步说明后果是'材质效果完全消失，仅显示纯色背景'。6 位 HEX 颜色不含 alpha 通道（等价 #FFD3D3D3），属于文档所定义的纯不透明颜色（FAQ 错误示例中的 '#FFFF0000' 与推荐示例 '#80FF0000' 的对比亦确认以 alpha 通道区分）。典型场景页三处示例共 4 个颜色值全部使用 6 位不透明色。官网 2026-09-08 实时抓取的 API 参考再次确认该规则原文。规则侧未限定组件例外，示例直接违反参数规则。

影响：开发者复制典型场景示例后，材质滤镜效果被遮挡，沉浸光感核心视觉（通透、折射）完全消失，仅剩纯色背景，且示例行为与 FAQ 排障条目（materialColor传入不透明颜色后材质效果消失）自相印证，导致对能力本身产生错误认知。

建议：将[典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample)第 132、235、289 行的 materialColor 值改为带透明度通道的颜色（如 '#80D3D3D3'、'#80333333'），或在示例处显式说明不透明色仅用于'以纯色高亮替代材质'的特殊意图（如确为有意设计，应补充说明与 FAQ 规则的关系）。

建议改写：materialColor: '#80D3D3D3'

### DOC-004 · DEFAULT 模式下'组件默认开启沉浸光感'的范围表述歧义

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `high`
- 位置：[arkts-immersive-light-sense-enable · 沉浸光感开启方式对比（行 19）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)
- 原文：module.json5未配置该字段时即为default模式，开发者的应用从API版本26.0.0之前升级至API版本26.0.0及以上，在未主动设置沉浸光感的情况下，组件默认开启沉浸光感，无需任何配置。
- 被检验主张：default 模式下（应用从 API 26 之前升级且未主动设置），所有支持沉浸光感的组件默认开启沉浸光感。

[开启指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)第 19 行的'组件默认开启沉浸光感'未限定组件范围；而 [API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) MaterialState.DEFAULT 明确枚举'Dialog、Toast、AlphabetIndexer（未设置背景/模糊/阴影时）及 Text 文本菜单默认开启，其他组件由应用主动设置'，[组件适配指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation)第 21 行亦明确 DEFAULT 下 Navigation 标题栏无材质效果。两侧作用域的条件轴（升级应用 vs 未设置背景参数）与组件轴（未限定 vs 明确清单）未对齐，按确认规则不能定为已确认矛盾，但同一模式的默认行为在指南与参考之间呈现明显不同的预期。

影响：从低版本升级的应用开发者按开启指南预期'无需任何配置即可获得沉浸光感'，实际上仅弹窗类等少数组件默认开启，Navigation 标题栏等需要主动设置或切换 ENABLE 模式，升级后的视觉表现与预期不符，产生'能力未生效'的误判与排障成本。

建议：在开启指南第 19 行补充组件范围限定，与 MaterialState.DEFAULT 枚举说明对齐，例如：'…组件默认开启沉浸光感（默认开启的组件清单详见 MaterialState.DEFAULT 说明，如 Dialog、Toast、AlphabetIndexer 等；Navigation 标题栏等其他组件仍需主动设置或配置 ENABLE 模式）'。

### DOC-005 · 材质与背景色的层级关系表述在 FAQ 与 API 参考/示例之间不一致

- 维度：`context_clarity`
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `high`
- 位置：[arkts-immersive-light-sense-faq · 背景色或背景模糊遮挡材质效果（行 148）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq)
- 原文：沉浸光感的视觉层级位于组件的backgroundColor、backgroundBlurStyle等属性之下。如果同时设置了不透明的背景色或背景模糊样式，这些属性会覆盖在材质层之上，导致材质效果被遮挡不可见。
- 被检验主张：同时设置 backgroundColor 与 systemMaterial 时，不透明背景色会覆盖材质层、导致材质不可见。

[FAQ](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-faq)第 148 行未限定算力与组件类型，断言背景色覆盖材质；而 [API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial)第 27 行说明高/中算力设备'systemMaterial 属性生效后，已设置的背景色属性 backgroundColor 会被恢复为透明色'，同文档示例 5 的注释与代码进一步示范了官方推荐的降级兜底写法——同时设置背景色与 systemMaterial，并说明高/中算力下材质清除背景色、低算力下材质自带背景色生效。两侧环境轴（null vs 高/中算力）未对齐，不能确认为直接矛盾，但开发者无法从文档调和这两套表述。

影响：开发者按 FAQ 结论回避'背景色+材质'的组合，不敢采用示例 5 的跨设备降级兜底写法；或在低算力/自绘制组件上遇到遮挡问题时，因缺少算力与组件类型的作用域说明而无法定位真实原因，排障成本显著增加。

建议：在 FAQ 第 148 行补充作用域限定：区分（1）高/中算力设备上通用属性材质生效后背景色被自动恢复透明；（2）低算力设备与自绘制组件（如 TextArea 内容层背景）中背景色/模糊可能遮挡材质；并交叉引用示例 5 的降级兜底模式。

### DOC-006 · 索引条'组件开启沉浸光感'引文指向互斥的 popupBackgroundBlurStyle 示例

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`confirmed` / `Medium` / `certain`
- 位置：[arkts-immersive-light-sense-component-adaptation · 索引条（AlphabetIndexer）（行 51）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation)
- 原文：组件开启沉浸光感的效果请参见示例3（设置提示弹窗背景模糊材质）。
- 被检验主张：指南所引官网示例3（主动调用 popupBackgroundBlurStyle）可演示索引条组件开启沉浸光感的效果。

[组件适配指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation)同一节第 46/49 行明确：popupBackground 与 popupBackgroundBlurStyle 均未主动设置（或 value 传 undefined）时提示弹窗才默认呈现沉浸光感 THICK，且'popupBackground、popupBackgroundBlurStyle 属性和沉浸光感能力互斥。主动设置 popupBackground 或 popupBackgroundBlurStyle 后无沉浸光感效果'；而第 51 行将'组件开启沉浸光感的效果'指向 [AlphabetIndexer 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-alphabet-indexer)示例3。该参考页（2026-09-10 实时抓取，页面更新时间 2026-09-07）显示：示例3标题即'设置提示弹窗背景模糊材质'，正文为'通过popupBackgroundBlurStyle属性实现提示弹窗的背景模糊效果'，代码主动调用 .popupBackgroundBlurStyle(this.customBlurStyle)（初始值 BlurStyle.NONE，为有效枚举值而非 undefined），且未设置 systemMaterial；同页 popupBackgroundBlurStyle 条目的 API 26 说明与指南互斥规则一致——'均未被主动调用或者传入undefined时'才默认沉浸式材质 THICK 样式。因此按互斥规则运行示例3不会呈现沉浸光感，指南引文与其引用目标分属互斥的两条路径。

影响：开发者按第 51 行引文复制示例3验证或开启索引条沉浸光感时，实际主动设置了互斥的 popupBackgroundBlurStyle，提示弹窗回落为普通背景模糊（BlurStyle.NONE 时为白色/半透明灰背景），得不到沉浸光感效果，易误判'组件级开启不生效'或放弃适配；指南该节亦未提供演示正确开启方式（不设两参数或设置通用属性 systemMaterial）的替代示例。

建议：将第 51 行引文替换为不设置 popupBackground/popupBackgroundBlurStyle（应用级 ENABLE 模式下默认 THICK）或通过通用属性 systemMaterial 开启沉浸光感的示例；若暂无此类示例，应删除该引文并显式提示'示例3演示的是与沉浸光感互斥的背景模糊材质效果，开启沉浸光感时不应调用该参数'。

### DOC-007 · lightEffect 省略时的行为表述不一致

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`ambiguous` / `Low` / `high`
- 位置：[arkts-immersive-light-sense-common-capability · 设置沉浸式系统材质交互效果（行 145）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability)
- 原文：lightEffect传入有效对象即启用，传入null或undefined则不启用
- 被检验主张：ImmersiveOptions.lightEffect 传入 null 或 undefined 时不启用光感交互反馈。

[沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability)第 145 行称 undefined 则不启用；[API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial)第 269 行称'不传入时默认为 undefined，取决于组件是否默认有交互光感效果'，同一行末尾又写'默认值：undefined，不设置光感交互反馈效果'。undefined 的实际结果（确定不启用 vs 取决于组件默认）在两份文档间乃至 API 参考同一条目内部均存在两种表述，且资料集未提供'默认有交互光感效果'的组件清单。

影响：开发者省略 lightEffect 时无法预判是否会意外出现（或缺失）流光效果，组件默认行为不可考。

建议：统一口径：若存在默认启用光感的组件，在 API 参考中列明清单并使材质视效指南措辞保持一致；若不存在，将'取决于组件是否默认有交互光感效果'删除。

### DOC-008 · empty 关闭材质的模式覆盖范围说明不一致

- 维度：`completeness`
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[arkts-apis-uimaterial · empty（行 69）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial)
- 原文：在ENABLE使能模式下，可通过设置systemMaterial(uiMaterial.Material.empty)来单独关闭某个组件的沉浸式系统材质效果。
- 被检验主张：uiMaterial.Material.empty 仅在 ENABLE 使能模式下可用于关闭组件的沉浸式系统材质效果。

[开启指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)第 50 行称'应用级开启和组件级开启两种接入方式均可通过该操作关闭'，第 56 行进一步说明'要关闭一个默认开启沉浸光感的组件（DEFAULT 模式语境），应使用 uiMaterial.Material.empty'。API 参考 empty 条目仅提 ENABLE 模式，覆盖范围小于指南侧描述（两侧非互斥，属参考说明不完整而非矛盾）。

影响：开发者仅查阅 API 参考时可能误判 DEFAULT 模式下无法用 empty 关闭默认开启的弹窗类组件，转而采用不生效的 undefined 方式。

建议：将 API 参考 empty 条目的模式说明扩展为与指南一致：'可通过设置 systemMaterial(uiMaterial.Material.empty) 单独关闭组件的沉浸式系统材质效果（含 ENABLE 模式下默认开启的组件，以及 DEFAULT 模式下默认开启的弹窗类组件）'。

### DOC-009 · 典型场景示例代码块缺少 import 与完整变量上下文

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `certain`
- 位置：[arkts-immersive-light-sample · 搜索框标题栏效果（行 75）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample)
- 原文：.barFloatingStyle({ barBottomMargin: 8, systemMaterial: new uiMaterial.ImmersiveMaterial({}) })
- 被检验主张：典型场景示例代码可直接复制到工程中编译运行。

[典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample)四个代码块（行 13-83、91-201、211-251、255-364）均使用 uiMaterial.ImmersiveMaterial、BarStyle.STACK 等符号，但没有任何一个代码块包含 import 语句（对比[沉浸式系统材质视效](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-common-capability)、[API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial)的示例均带 import { uiMaterial } from '@kit.ArkUI'）；listItems 变量未定义（行 161、313 有注释提示需自定义）。复制后需开发者自行补齐 import 与数据结构，降低可复现性。

影响：示例无法直接编译运行，初次接入的开发者需对照其他文档补齐 import 与变量定义，增加上手成本。

建议：为典型场景各代码块补充 import { uiMaterial } from '@kit.ArkUI' 等导入语句，或在文档开头统一声明'以下示例默认已导入 @kit.ArkUI 中的 uiMaterial'。

### DOC-010 · 示例代码存在少量格式瑕疵

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `certain`
- 位置：[arkts-immersive-light-sample · 搜索框标题栏效果（行 30）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample)
- 原文：（.margin 前存在异常连续空格）等
- 被检验主张：示例代码格式规范、可直接复制。

[典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample)第 30 行 .margin 前存在异常连续空格（预检 code-formatting-anomaly 候选之一，复核确认属编辑瑕疵，不影响语义与编译）；List({space: 12}) 缺少空格等多处问题；资料集另有若干未标注语言的代码围栏（预检 unlabeled-code-fence 58 处），影响渲染高亮但不影响复制。

影响：极小；仅影响阅读体验与渲染高亮。

建议：统一示例缩进并为代码围栏补充 arkts 语言标注。

### DOC-011 · 术语大小写不统一与循环表述

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：[arkts-immersive-light-sense-enable · 开启沉浸光感（行 7）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)
- 原文：要确保应用的targetSDKVersion不低于26.0.0
- 被检验主张：版本字段写作 targetSDKVersion（与 build-profile.json5 的 targetSdkVersion 字段名大小写不一致）；组件级开启的『支持的组件』以『支持设置沉浸式系统材质的组件』循环表述。

targetSDKVersion 的拼写与工程配置文件字段 targetSdkVersion 不一致，跨文档检索时容易漏配；[开启指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable)第 43 行『支持的组件：支持设置沉浸式系统材质的组件』没有给出可操作的清单或链接，信息量低（实际清单在[组件适配页](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation)）。均为表达层问题，不涉及技术事实错误。

影响：降低检索效率与首读可理解性。

建议：统一使用 targetSdkVersion（或与所链发布说明页保持一致）；第 43 行改为指向组件适配页的具体分类或 MaterialState 清单的明确表述。