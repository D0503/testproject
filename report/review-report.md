# HarmonyOS 文档质量审查报告

- 结论：不合格
- 总分：72
- 接入门禁：`blocked`
- 输入：`D:\HW\testproject\docs`
- 审查来源数：16

资料集整体结构清晰、版本标注完备、生效范围等关键内容跨文档高度一致，但存在一处已确认的文档内部直接矛盾（应用级 disable 对组件级开启是否生效，DOC-001），以及典型场景示例违反自身赋色规则（materialColor 传入纯不透明颜色，DOC-002），两项均直接影响沉浸光感接入决策；另有一处已确认的指南引文缺陷（索引条'组件开启沉浸光感'引文指向互斥的 popupBackgroundBlurStyle 示例，DOC-013），门禁判定为 blocked。其余为 DEFAULT 模式范围歧义、材质与背景色层级表述歧义等中低危问题。已对 3 个官方页面实时取证（预算 12），官网当前版本仍并存矛盾表述与缺陷引文，属源头文档缺陷而非快照过时。

## 源完整性

状态：`verified`；使用内部快照索引：否。

- 输入为普通本地目录，README.md 声明其内容为 2026-09-08 从 developer.huawei.com 冻结抓取的快照；本地文件未附带可校验的来源清单，来源身份以 README 声明为准，capturedAt 记录为 null。

## 维度评分

| 维度 | 权重 | 得分 | 说明 |
|---|---:|---:|---|
| 技术正确性 | 25 | 62 | DOC-001（disable 语义文档内直接矛盾，API 参考与官网实时版本佐证'全局禁用'一侧）与 DOC-002（典型场景示例 materialColor 传入纯不透明色，违反三处文档一致声明的赋色规则，官网 API 实时版本再次确认该规则）为核心技术主张层面的已确认缺陷。其余 API 名称、参数默认值、枚举值交叉核对未见错误。 |
| 版本兼容性 | 12 | 88 | ArkUI 路线（API 26.0.0 起）与 HDS 路线（6.1.0(23) 起）分层清晰；enable.md 明确 targetSDKVersion 不低于 26.0.0 的前置条件并提供低版本兼容指引链接；各 API 起始版本、元服务/卡片能力标注完备一致。未发现 compatibleSdkVersion/targetSdkVersion/compileSdkVersion 关系错误。 |
| 完整性 | 10 | 78 | empty 关闭能力的模式覆盖在 API 参考中仅提 ENABLE，enable.md 另提默认开启组件也可用 empty 关闭（DOC-009）；lightEffect 省略时'取决于组件是否默认有交互光感效果'但未提供默认具备该效果的组件清单（DOC-006）；DEFAULT 模式下默认开启组件的完整清单分散在 API 参考与 FAQ 两处（DOC-003）。 |
| 一致性 | 10 | 60 | DOC-001 为同文档内直接矛盾；DOC-003（DEFAULT 模式默认开启范围）、DOC-005（Slider undefined 语义）为跨文档范围歧义；DOC-013（索引条沉浸光感引文指向互斥的模糊材质示例，官网参考页 2026-09-10 实时取证确认）为已确认的指南-参考引文冲突。正面：生效范围约束在 overview/enable/constraints/faq/uimaterial 五处完全一致；UI Design Kit 与 ArkUI 两条路线的分工说明一致；hdsMaterial.MaterialLevel 枚举在 faq 与 hdsmaterial 参考中一致。 |
| 上下文清晰与歧义 | 10 | 72 | DOC-004：FAQ 称材质视觉层级位于背景色之下会被遮挡，而 API 参考与示例5 表明高/中算力设备材质生效后背景色自动恢复透明、且官方推荐同时设置背景色作降级兜底，两套表述未对齐算力/组件作用域，开发者难以调和。DOC-003 的'组件默认开启'未限定组件范围亦属条件限定不足。 |
| 行文逻辑与信息架构 | 10 | 85 | 容器页→简介→开发指导（开启/组件适配/材质视效）→功耗优化→FAQ→典型场景的信息架构清晰；容器页（arkts-immersive-light-sense.md / development.md）为纯导航页且链接完整；README 索引与实际文件一一对应，并如实记录 compatibility 页已下线的情况。 |
| 开发者易用性与可复现性 | 15 | 70 | DOC-010：典型场景示例（sample.md）四个代码块均使用 uiMaterial 但无一提供 import 语句，listItems 虽有注释提示但整体不可直接复制运行；DOC-007：common-capability 自定义阴影示例的 systemMaterial 位于 shadow 之前，与 FAQ 推荐的属性设置顺序不一致；DOC-008：hdstabs 参考示例硬编码 IMMERSIVE 未包含 PC/2in1 的设备能力查询步骤。正面：FAQ 每条问题均含现象/原因/措施/示例四段，排障路径完备。 |
| 链接资源 | 5 | 60 | 87 处 ![](https://media:xxx) 站内媒体引用站外不可访问（design-guides 8、guides 20、refs 58、README 1），导致三档强度对比图、五档材质样式对比图等视觉依据缺失（DOC-011）；README 已声明该限制属预期。正文官网交叉链接保留完整、锚点规范。 |
| 安全合规 | 3 | 92 | 无敏感信息泄露；功耗优化文档（constraints.md）提供温控、算力自适应等性能合规建议；元服务/卡片能力边界标注完备。 |

## Findings

以下问题按严重度从高到低排列；同一严重度保持原始顺序。

### DOC-001 · 应用级 disable 的作用范围在同一文档内直接矛盾

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`confirmed` / `High` / `certain`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-enable.md` · 沉浸光感开启方式对比:43
- 原文：应用级开关设置为disable时，会全局禁用沉浸光感，应用级或组件级开启的设置均不生效。
- 被检验主张：module.json5 应用级开关设置为 disable 时，组件级开启的沉浸光感设置是否仍然生效。
- 证据：`EVID-001`、`EVID-002`、`EVID-003`、`EVID-004`、`EVID-005`

同一文档第 43 行无条件断言 disable 全局禁用、组件级开启均不生效；第 52 行又无条件断言 disable 只针对应用级开启的组件。两处均未附加版本、算力、组件等任何限定，六个作用域轴完全相同而结果互斥。API 参考 MaterialState.DISABLE 的定义（'所有组件禁止开启沉浸式系统材质，即使主动为组件设置沉浸式系统材质参数也不会生效'）与官网 2026-09-08 实时抓取内容均站在'全局禁用'一侧，故第 52 行为孤立且与参考矛盾的表述。

影响：开发者按第 52 行理解，会认为配置 disable 后仍可通过组件级 systemMaterial 保留局部沉浸光感；实际（按第 43 行与 API 参考）材质全部被禁用，组件级沉浸光感效果全部丢失，且排障时无法从文档获得可靠结论。

建议：将第 52 行修改为与第 43 行及 MaterialState.DISABLE 定义一致，例如：'应用级关闭：应用级开关设置为 disable，会全局禁用沉浸光感；如需保留部分组件的沉浸光感，应改用 enable/default 模式并对不需要的组件单独设置 uiMaterial.Material.empty。'
- 内部冲突主题：module.json5 应用级开关 disable 对组件级开启沉浸光感的组件是否生效
- 原子命题 A（EVID-001）：应用级开关设置为disable时，会全局禁用沉浸光感，应用级或组件级开启的设置均不生效。 → 组件级开启的沉浸光感设置不生效（被全局禁用）
- 原子命题 B（EVID-002）：应用级关闭：应用级开关设置为disable，只针对应用级开启的组件。 → 组件级开启的组件不受 disable 影响（disable 只针对应用级开启的组件）
- 共同作用域：版本=未限定；模式=disable；组件=未限定；条件=未限定；环境=未限定；生命周期=未限定
- 互斥原因：同一 disable 开关下，组件级开启的沉浸光感不可能既被禁用又不受影响，两个结果不能同时成立。

建议改写：2. 应用级关闭：应用级开关设置为 disable，全局禁用沉浸光感，应用级或组件级开启的设置均不生效；如需仅关闭部分组件，请使用组件级关闭方式。

### DOC-002 · 典型场景示例 materialColor 传入纯不透明颜色，违反赋色规则

- 维度：`technical_correctness`
- 状态 / 严重度 / 置信度：`confirmed` / `High` / `high`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sample.md` · 内容区标题栏开启沉浸光感:289
- 原文：materialColor: '#d3d3d3'
- 被检验主张：ImmersiveOptions.materialColor 传入不带透明度通道的 6 位 HEX 颜色（'#d3d3d3'、'#333333'）即可获得正常的材质赋色与滤镜效果。
- 证据：`EVID-006`、`EVID-007`、`EVID-008`、`EVID-009`、`EVID-010`

common-capability.md、faq.md 与 arkts-apis-uimaterial.md 三处一致声明 materialColor 需带一定透明度，'若该颜色为纯不透明的颜色，会遮挡材质层滤镜效果'，faq 进一步说明后果是'材质效果完全消失，仅显示纯色背景'。6 位 HEX 颜色不含 alpha 通道（等价 #FFD3D3D3），属于文档所定义的纯不透明颜色（faq 错误示例中的 '#FFFF0000' 与推荐示例 '#80FF0000' 的对比亦确认以 alpha 通道区分）。sample.md 作为官方典型场景，三处示例共 4 个颜色值全部使用 6 位不透明色。官网 2026-09-08 实时抓取的 API 参考再次确认该规则原文。规则侧未限定组件例外，示例直接违反参数规则。

影响：开发者复制典型场景示例后，材质滤镜效果被遮挡，沉浸光感核心视觉（通透、折射）完全消失，仅剩纯色背景，且示例行为与 FAQ 排障条目（materialColor传入不透明颜色后材质效果消失）自相印证，导致对能力本身产生错误认知。

建议：将 sample.md 第 132、235、289 行的 materialColor 值改为带透明度通道的颜色（如 '#80D3D3D3'、'#80333333'），或在示例处显式说明不透明色仅用于'以纯色高亮替代材质'的特殊意图（如确为有意设计，应补充说明与 FAQ 规则的关系）。

建议改写：materialColor: '#80D3D3D3'

### DOC-003 · DEFAULT 模式下'组件默认开启沉浸光感'的范围表述歧义

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `high`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-enable.md` · 沉浸光感开启方式对比:19
- 原文：module.json5未配置该字段时即为default模式，开发者的应用从API版本26.0.0之前升级至API版本26.0.0及以上，在未主动设置沉浸光感的情况下，组件默认开启沉浸光感，无需任何配置。
- 被检验主张：default 模式下（应用从 API 26 之前升级且未主动设置），所有支持沉浸光感的组件默认开启沉浸光感。
- 证据：`EVID-011`、`EVID-012`、`EVID-013`

enable.md 第 19 行的'组件默认开启沉浸光感'未限定组件范围；而 API 参考 MaterialState.DEFAULT 明确枚举'Dialog、Toast、AlphabetIndexer（未设置背景/模糊/阴影时）及 Text 文本菜单默认开启，其他组件由应用主动设置'，component-adaptation.md 第 21 行亦明确 DEFAULT 下 Navigation 标题栏无材质效果。两侧作用域的条件轴（升级应用 vs 未设置背景参数）与组件轴（未限定 vs 明确清单）未对齐，按确认规则不能定为已确认矛盾，但同一模式的默认行为在指南与参考之间呈现明显不同的预期。

影响：从低版本升级的应用开发者按 enable.md 预期'无需任何配置即可获得沉浸光感'，实际上仅弹窗类等少数组件默认开启，Navigation 标题栏等需要主动设置或切换 ENABLE 模式，升级后的视觉表现与预期不符，产生'能力未生效'的误判与排障成本。

建议：在 enable.md 第 19 行补充组件范围限定，与 MaterialState.DEFAULT 枚举说明对齐，例如：'…组件默认开启沉浸光感（默认开启的组件清单详见 MaterialState.DEFAULT 说明，如 Dialog、Toast、AlphabetIndexer 等；Navigation 标题栏等其他组件仍需主动设置或配置 ENABLE 模式）'。

### DOC-004 · 材质与背景色的层级关系表述在 FAQ 与 API 参考/示例之间不一致

- 维度：`context_clarity`
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `high`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-faq.md` · 背景色或背景模糊遮挡材质效果:148
- 原文：沉浸光感的视觉层级位于组件的backgroundColor、backgroundBlurStyle等属性之下。如果同时设置了不透明的背景色或背景模糊样式，这些属性会覆盖在材质层之上，导致材质效果被遮挡不可见。
- 被检验主张：同时设置 backgroundColor 与 systemMaterial 时，不透明背景色会覆盖材质层、导致材质不可见。
- 证据：`EVID-014`、`EVID-015`、`EVID-016`

faq 第 148 行未限定算力与组件类型，断言背景色覆盖材质；而 arkts-apis-uimaterial.md 第 27 行说明高/中算力设备'systemMaterial 属性生效后，已设置的背景色属性 backgroundColor 会被恢复为透明色'，同文档示例 5 的注释与代码进一步示范了官方推荐的降级兜底写法——同时设置背景色与 systemMaterial，并说明高/中算力下材质清除背景色、低算力下材质自带背景色生效。两侧环境轴（null vs 高/中算力）未对齐，不能确认为直接矛盾，但开发者无法从文档调和这两套表述。

影响：开发者按 FAQ 结论回避'背景色+材质'的组合，不敢采用示例 5 的跨设备降级兜底写法；或在低算力/自绘制组件上遇到遮挡问题时，因缺少算力与组件类型的作用域说明而无法定位真实原因，排障成本显著增加。

建议：在 faq 第 148 行补充作用域限定：区分（1）高/中算力设备上通用属性材质生效后背景色被自动恢复透明；（2）低算力设备与自绘制组件（如 TextArea 内容层背景）中背景色/模糊可能遮挡材质；并交叉引用示例 5 的降级兜底模式。

### DOC-005 · Slider 组件 systemMaterial 传 undefined 的语义与通用规则表述张力

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `medium`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-component-adaptation.md` · 滑动条（Slider）:158
- 原文：传入undefined时沉浸光感不生效，恢复为原先的Slider样式。
- 被检验主张：Slider 组件将 systemMaterial 设置为 undefined 时，沉浸光感不生效并恢复原先的 Slider 样式。
- 证据：`EVID-017`、`EVID-018`

enable.md 第 56 行定义通用语义：'undefined 表示恢复为组件默认的沉浸光感效果；uiMaterial.Material.empty 是关闭沉浸光感效果'。Slider 在应用级 ENABLE 模式下默认开启沉浸光感（component-adaptation.md 第 154 行），按通用规则此时 undefined 应恢复默认（即开启）的材质效果，而第 158 行称 undefined 时'沉浸光感不生效'。两侧组件轴（泛指 vs Slider）未对齐，不能确认为直接矛盾，但同一操作在通用规则与组件细则下给出相反预期。

影响：开发者在 ENABLE 模式下尝试用 undefined 恢复/关闭 Slider 沉浸光感时，行为与预期不符，需依赖试错确认；关错了方式（undefined vs empty）还会导致样式异常。

建议：在 component-adaptation.md 第 158 行明确该表述的作用域（例如仅指应用级未开启/DEFAULT 场景），或与 enable.md 第 56 行的通用语义统一：'传入 undefined 时恢复组件默认的沉浸光感效果；需关闭沉浸光感时应设置 uiMaterial.Material.empty'。

### DOC-013 · 索引条'组件开启沉浸光感'引文指向互斥的 popupBackgroundBlurStyle 示例

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`confirmed` / `Medium` / `certain`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-component-adaptation.md` · 索引条（AlphabetIndexer）:51
- 原文：组件开启沉浸光感的效果请参见示例3（设置提示弹窗背景模糊材质）。
- 被检验主张：指南所引官网示例3（主动调用 popupBackgroundBlurStyle）可演示索引条组件开启沉浸光感的效果。
- 证据：`EVID-030`、`EVID-031`、`EVID-032`、`EVID-033`

同一节第 46/49 行明确：popupBackground 与 popupBackgroundBlurStyle 均未主动设置（或 value 传 undefined）时提示弹窗才默认呈现沉浸光感 THICK，且'popupBackground、popupBackgroundBlurStyle 属性和沉浸光感能力互斥。主动设置 popupBackground 或 popupBackgroundBlurStyle 后无沉浸光感效果'；而第 51 行将'组件开启沉浸光感的效果'指向官网示例3。官网 ts-container-alphabet-indexer（2026-09-10 实时抓取，页面更新时间 2026-09-07）显示：示例3标题即'设置提示弹窗背景模糊材质'，正文为'通过popupBackgroundBlurStyle属性实现提示弹窗的背景模糊效果'，代码主动调用 .popupBackgroundBlurStyle(this.customBlurStyle)（初始值 BlurStyle.NONE，为有效枚举值而非 undefined），且未设置 systemMaterial；同页 popupBackgroundBlurStyle 条目的 API 26 说明与指南互斥规则一致——'均未被主动调用或者传入undefined时'才默认沉浸式材质 THICK 样式。因此按互斥规则运行示例3不会呈现沉浸光感，指南引文与其引用目标分属互斥的两条路径。

影响：开发者按第 51 行引文复制示例3验证或开启索引条沉浸光感时，实际主动设置了互斥的 popupBackgroundBlurStyle，提示弹窗回落为普通背景模糊（BlurStyle.NONE 时为白色/半透明灰背景），得不到沉浸光感效果，易误判'组件级开启不生效'或放弃适配；指南该节亦未提供演示正确开启方式（不设两参数或设置通用属性 systemMaterial）的替代示例。

建议：将第 51 行引文替换为不设置 popupBackground/popupBackgroundBlurStyle（应用级 ENABLE 模式下默认 THICK）或通过通用属性 systemMaterial 开启沉浸光感的示例；若暂无此类示例，应删除该引文并显式提示'示例3演示的是与沉浸光感互斥的背景模糊材质效果，开启沉浸光感时不应调用该参数'。

建议改写：组件开启沉浸光感的效果：保持 popupBackground 与 popupBackgroundBlurStyle 均未设置（应用级 ENABLE 模式下提示弹窗默认沉浸光感 THICK），或通过通用属性 systemMaterial 主动设置；示例3演示的 popupBackgroundBlurStyle 与沉浸光感互斥，开启沉浸光感时不应参照该示例。

### DOC-006 · lightEffect 省略时的行为表述不一致

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`ambiguous` / `Low` / `high`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-common-capability.md` · 设置沉浸式系统材质交互效果:145
- 原文：lightEffect传入有效对象即启用，传入null或undefined则不启用
- 被检验主张：ImmersiveOptions.lightEffect 传入 null 或 undefined 时不启用光感交互反馈。
- 证据：`EVID-019`、`EVID-020`

common-capability.md 第 145 行称 undefined 则不启用；arkts-apis-uimaterial.md 第 269 行称'不传入时默认为 undefined，取决于组件是否默认有交互光感效果'，同一行末尾又写'默认值：undefined，不设置光感交互反馈效果'。undefined 的实际结果（确定不启用 vs 取决于组件默认）在两份文档间乃至 API 参考同一条目内部均存在两种表述，且资料集未提供'默认有交互光感效果'的组件清单。

影响：开发者省略 lightEffect 时无法预判是否会意外出现（或缺失）流光效果，组件默认行为不可考。

建议：统一口径：若存在默认启用光感的组件，在 API 参考中列明清单并使 common-capability 措辞保持一致；若不存在，将'取决于组件是否默认有交互光感效果'删除。

### DOC-007 · 自定义阴影示例的属性设置顺序与 FAQ 推荐顺序不一致

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`likely` / `Low` / `high`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-common-capability.md` · 设置沉浸式系统材质阴影效果:222
- 原文：.systemMaterial(new uiMaterial.ImmersiveMaterial({
  style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
  applyShadow: false,
  interactive: true,
}))
.shadow({ radius: 100, color: Color.Pink })
- 被检验主张：该示例中 systemMaterial 位于 shadow 之前符合官方推荐的属性设置顺序。
- 证据：`EVID-021`、`EVID-022`

faq.md 第 301 行明确建议'将 systemMaterial 放在其他样式属性（如背景色、边框、阴影等）之后设置'，并称放之前'可能导致材质效果优先级与预期不符'；arkts-apis-uimaterial.md 示例 5 亦遵循背景色在前、systemMaterial 在后的顺序。本示例将 systemMaterial 置于 shadow 之前，与 FAQ 的推荐写法不一致（faq 用词为'可能'，故不构成确定性冲突）。

影响：开发者复制该示例后如遇阴影/材质优先级异常，与 FAQ 排障建议相互矛盾，增加排查成本。

建议：将示例调整为 .shadow(...) 在前、.systemMaterial(...) 在后，与 FAQ 推荐顺序及示例 5 保持一致。

### DOC-008 · HdsTabs 参考示例硬编码 IMMERSIVE 未包含设备能力查询

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`likely` / `Low` / `high`
- 位置：`D:\HW\testproject\docs\harmonyos-references\ui-design-hdstabs.md` · 示例（悬浮页签设置系统材质）:1396
- 原文：materialType: hdsMaterial.MaterialType.IMMERSIVE,
- 被检验主张：直接设置 materialType 为 IMMERSIVE 而不查询设备能力即可在所有设备上获得预期材质效果。
- 证据：`EVID-023`、`EVID-024`

同一文档 SystemMaterialParams 的设备行为差异说明要求'在 PC/2in1 设备调用时需先调用 getSystemMaterialTypes() 接口查询当前设备支持的材质能力'；ui-design-hds-component-material.md 亦给出'先查询、支持 IMMERSIVE 用 EXQUISITE/GENTLE、不支持用 SMOOTH'的降级指引。该示例无任何查询与降级逻辑，在 PC/2in1 或不支持 IMMERSIVE 的设备上直接复制存在卡顿、发热或效果缺失风险。

影响：开发者直接复制参考示例到 PC/2in1 等设备时材质能力不匹配，产生性能或显示问题，需回溯指南才能定位。

建议：在示例中补充 getSystemMaterialTypes() 查询与降级分支（参考 ui-design-hds-component-material.md 自定义示例的 aboutToAppear 写法），或在示例注释中明确提示 PC/2in1 需先查询。

### DOC-009 · empty 关闭材质的模式覆盖范围说明不一致

- 维度：`completeness`
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：`D:\HW\testproject\docs\harmonyos-references\arkts-apis-uimaterial.md` · empty:69
- 原文：在ENABLE使能模式下，可通过设置systemMaterial(uiMaterial.Material.empty)来单独关闭某个组件的沉浸式系统材质效果。
- 被检验主张：uiMaterial.Material.empty 仅在 ENABLE 使能模式下可用于关闭组件的沉浸式系统材质效果。
- 证据：`EVID-025`、`EVID-026`

enable.md 第 50 行称'应用级开启和组件级开启两种接入方式均可通过该操作关闭'，第 56 行进一步说明'要关闭一个默认开启沉浸光感的组件（DEFAULT 模式语境），应使用 uiMaterial.Material.empty'。API 参考 empty 条目仅提 ENABLE 模式，覆盖范围小于指南侧描述（两侧非互斥，属参考说明不完整而非矛盾）。

影响：开发者仅查阅 API 参考时可能误判 DEFAULT 模式下无法用 empty 关闭默认开启的弹窗类组件，转而采用不生效的 undefined 方式。

建议：将 API 参考 empty 条目的模式说明扩展为与指南一致：'可通过设置 systemMaterial(uiMaterial.Material.empty) 单独关闭组件的沉浸式系统材质效果（含 ENABLE 模式下默认开启的组件，以及 DEFAULT 模式下默认开启的弹窗类组件）'。

### DOC-010 · 典型场景示例代码块缺少 import 与完整变量上下文

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `certain`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sample.md` · 搜索框标题栏效果:75
- 原文：.barFloatingStyle({ barBottomMargin: 8, systemMaterial: new uiMaterial.ImmersiveMaterial({}) })
- 被检验主张：典型场景示例代码可直接复制到工程中编译运行。
- 证据：`EVID-027`

sample.md 四个代码块（行 13-83、91-201、211-251、255-364）均使用 uiMaterial.ImmersiveMaterial、BarStyle.STACK 等符号，但没有任何一个代码块包含 import 语句（对比同资料集 common-capability.md、arkts-apis-uimaterial.md 的示例均带 import { uiMaterial } from '@kit.ArkUI'）；listItems 变量未定义（行 161、313 有注释提示需自定义）。复制后需开发者自行补齐 import 与数据结构，降低可复现性。

影响：示例无法直接编译运行，初次接入的开发者需对照其他文档补齐 import 与变量定义，增加上手成本。

建议：为 sample.md 各代码块补充 import { uiMaterial } from '@kit.ArkUI' 等导入语句，或在文档开头统一声明'以下示例默认已导入 @kit.ArkUI 中的 uiMaterial'。

### DOC-011 · 站内媒体引用在本地资料集中全部不可访问

- 维度：`links_resources`
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `certain`
- 位置：`D:\HW\testproject\docs\README.md` · 注意:43
- 原文：文中 ![](https://media:xxx) 为文档站内部媒体引用，站外无法直接访问。
- 被检验主张：资料集内 87 处站内媒体引用（design-guides 8 处、harmonyos-guides 20 处、harmonyos-references 58 处、README 1 处）可在审查中作为视觉证据使用。
- 证据：`EVID-028`

README 已如实声明该限制，属快照来源的已知约束而非文档缺陷；但设计规范的三档强度对比图、五档材质样式对比图、各算力设备表现截图等关键视觉依据因此缺失，本次审查无法对视觉类主张进行核验。

影响：基于本资料集的开发与审查只能依赖文字与代码，视觉规格（如三档差异、样式对比）无法离线核对。

建议：如需完整审阅视觉规格，可在可访问官网的环境补充抓取媒体资源，或在快照清单中登记媒体清单与替代描述。

### DOC-012 · 示例代码存在少量格式瑕疵

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `certain`
- 位置：`D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sample.md` · 搜索框标题栏效果:30
- 原文：           .margin({ top: 2 })
- 被检验主张：示例代码格式规范、可直接复制。
- 证据：`EVID-029`

sample.md 第 30 行 .margin 前存在异常连续空格（预检 code-formatting-anomaly 候选之一，复核确认属编辑瑕疵，不影响语义与编译）；资料集另有若干未标注语言的代码围栏（预检 unlabeled-code-fence 58 处），影响渲染高亮但不影响复制。

影响：极小；仅影响阅读体验与渲染高亮。

建议：统一示例缩进并为代码围栏补充 arkts 语言标注。

## 待确认项

| ID | 优先级 | 主张 | 原因 | 所需证据 |
|---|---|---|---|---|
| PV-001 | high | 同时设置 backgroundColor 与 systemMaterial 时，高/中/低算力设备及不支持沉浸式材质设备上的实际视觉结果（DOC-004 双方表述）。 | 需要可运行的 API 26 SDK 工程与不同算力档位真机/模拟器，逐档位截图对比。 | device（各算力档位设备上的可观察结果，分别记录设备型号与系统版本） |
| PV-002 | high | module.json5 配置 disable 后，组件级 systemMaterial 设置的实际运行结果（DOC-001 真值仲裁）。 | 文档内部互斥表述需以运行为准；API 参考倾向'全局禁用'，但需构建验证排除文档遗漏的条件分支。 | build + device（API 26 工程配置 disable 后设置组件级材质，观察是否生效） |
| PV-003 | medium | DEFAULT 模式下从 API 26 之前升级的应用，各组件（含 Navigation 标题栏、Tabs）默认开启沉浸光感的实际清单（DOC-003）。 | 指南与 API 参考的范围表述不一致，需按组件逐一真机核验。 | device（DEFAULT 模式下逐组件观察默认材质表现） |
| PV-004 | medium | Slider 组件 systemMaterial 传入 undefined 在 ENABLE 与 DEFAULT 模式下的实际行为（DOC-005）。 | 通用规则与组件细则表述相反，需真机验证两种模式下的结果。 | device（ENABLE/DEFAULT 两种模式下 Slider 设置 undefined 的观察结果） |

## 证据索引

| ID | 类型 | 来源 | 定位 | 版本 | 抓取/验证时间 |
|---|---|---|---|---|---|
| EVID-001 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-enable.md` | 沉浸光感开启方式对比，行 43 | — | — |
| EVID-002 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-enable.md` | 关闭沉浸光感，行 52 | — | — |
| EVID-003 | internal | `D:\HW\testproject\docs\harmonyos-references\arkts-apis-uimaterial.md` | MaterialState 枚举 DISABLE 行，行 117 | 26.0.0 | — |
| EVID-004 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) | MaterialState 枚举 DISABLE 行；本地存档 evidence/official-api-uimaterial-2026-09-08.json | 26.0.0 | 2026-09-08T13:31:12.245Z |
| EVID-005 | official_guide | [https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) | 沉浸光感开启方式对比/关闭沉浸光感；本地存档 evidence/official-guide-enable-2026-09-08.json | 26.0.0 | 2026-09-08T13:30:54.462Z |
| EVID-006 | internal | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-common-capability.md` | 为沉浸式系统材质赋色，行 85 | — | — |
| EVID-007 | internal | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-faq.md` | materialColor传入不透明颜色后材质效果消失，行 201-227 | — | — |
| EVID-008 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) | ImmersiveOptions.materialColor 行；本地存档 evidence/official-api-uimaterial-2026-09-08.json | 26.0.0 | 2026-09-08T13:31:12.245Z |
| EVID-009 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sample.md` | 内容区标题栏开启沉浸光感，行 287-290 | — | — |
| EVID-010 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sample.md` | 搜索框标题栏效果行 131-134、内容区标题栏行 234-237 | — | — |
| EVID-011 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-enable.md` | 沉浸光感开启方式对比，行 19 | — | — |
| EVID-012 | internal | `D:\HW\testproject\docs\harmonyos-references\arkts-apis-uimaterial.md` | MaterialState 枚举 DEFAULT 行，行 115 | 26.0.0 | — |
| EVID-013 | internal | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-component-adaptation.md` | Navigation标题栏，行 21 | — | — |
| EVID-014 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-faq.md` | 背景色或背景模糊遮挡材质效果，行 148 | — | — |
| EVID-015 | internal | `D:\HW\testproject\docs\harmonyos-references\arkts-apis-uimaterial.md` | ImmersiveMaterial 说明，行 27 | 26.0.0 | — |
| EVID-016 | internal | `D:\HW\testproject\docs\harmonyos-references\arkts-apis-uimaterial.md` | 示例5（查询材质等级与是否支持沉浸式材质），行 717-747 | 26.0.0 | — |
| EVID-017 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-component-adaptation.md` | 滑动条（Slider），行 158 | — | — |
| EVID-018 | internal | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-enable.md` | 关闭沉浸光感，行 56 | — | — |
| EVID-019 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-common-capability.md` | 设置沉浸式系统材质交互效果，行 145 | — | — |
| EVID-020 | internal | `D:\HW\testproject\docs\harmonyos-references\arkts-apis-uimaterial.md` | ImmersiveOptions.lightEffect 行，行 269 | 26.0.0 | — |
| EVID-021 | internal | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-faq.md` | 通过通用属性systemMaterial设置沉浸式系统材质后组件样式显示异常，行 301 | — | — |
| EVID-022 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-common-capability.md` | 设置沉浸式系统材质阴影效果示例，行 222-227 | — | — |
| EVID-023 | target | `D:\HW\testproject\docs\harmonyos-references\ui-design-hdstabs.md` | 示例（悬浮页签），行 1395-1398 | 6.1.0(23) | — |
| EVID-024 | internal | `D:\HW\testproject\docs\harmonyos-references\ui-design-hdstabs.md` | SystemMaterialParams 设备行为差异，行 611 | 6.1.0(23) | — |
| EVID-025 | internal | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-enable.md` | 关闭沉浸光感，行 50 与 56 | — | — |
| EVID-026 | target | `D:\HW\testproject\docs\harmonyos-references\arkts-apis-uimaterial.md` | empty，行 69 | 26.0.0 | — |
| EVID-027 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sample.md` | 四个代码块（行 13-83、91-201、211-251、255-364） | — | — |
| EVID-028 | target | `D:\HW\testproject\docs\README.md` | 注意，行 43 | — | — |
| EVID-029 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sample.md` | 搜索框标题栏效果，行 30 | — | — |
| EVID-030 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-component-adaptation.md` | 索引条（AlphabetIndexer），行 46-49 | — | — |
| EVID-031 | target | `D:\HW\testproject\docs\harmonyos-guides\arkts-immersive-light-sense-component-adaptation.md` | 索引条（AlphabetIndexer），行 51 | — | — |
| EVID-032 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-alphabet-indexer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-alphabet-indexer) | popupBackgroundBlurStyle12+ 条目 API 26 说明；本地存档 evidence/official-ref-alphabet-indexer-2026-09-10.json | 26.0.0 | 2026-09-10T06:50:15.582Z |
| EVID-033 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-alphabet-indexer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-alphabet-indexer) | 示例3（设置提示弹窗背景模糊材质）；本地存档 evidence/official-ref-alphabet-indexer-2026-09-10.json | — | 2026-09-10T06:50:15.582Z |
