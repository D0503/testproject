# HarmonyOS 文档质量审查报告

- 结论：不合格
- 总分：79
- 接入门禁：`blocked`
- 输入：`D:\HW\testproject\evidence\source-snapshot`
- 审查来源数：8

沉浸光感资料集（8 页）整体结构清晰、跨页生效范围表述高度一致、示例与 FAQ 排障路径丰富，核心 API（ImmersiveMaterial/ImmersiveOptions/MaterialState 等）与 API 参考核对基本一致。但『开启沉浸光感』页对应用级 disable 的作用范围在同页给出两个互斥描述（全局禁用 vs 只针对应用级开启的组件），API 参考 MaterialState.DISABLE 支持全局禁用一侧，构成已确认的影响接入决策的内部矛盾；另有 default 模式默认开启表述过宽（API 证据确认）、empty/undefined/lightEffect 的语义边界与 API 参考存在三处差异或冲突，需修订后方可作为可信接入依据。

## 源完整性

状态：`verified`；使用内部快照索引：是。

- 另有 96 个官方外链（API 参考、组件参考、UI Design Kit 等）不在本资料集快照内，仅对其中 2 个最高风险 API 参考页做了定向取证。

## 维度评分

| 维度 | 权重 | 得分 | 说明 |
|---|---:|---:|---|
| 技术正确性 | 25 | 74 | 与 API 参考逐项核对：ImmersiveStyle 五枚举、MaterialLevel 三枚举、materialColor 低算力降级为 backgroundColor、applyShadow 优先级、生效区域条款均一致。扣分项：disable 作用范围同页矛盾（DOC-001，API 证据支持全局禁用侧）；default 模式默认开启表述过宽（DOC-002）；lightEffect undefined 语义与 API 参考不一致（DOC-005）。 |
| 版本兼容性 | 12 | 80 | 版本声明一致（API 26.0.0，overview:5 与 enable:7 对应）；enable 页给出 targetSdkVersion≥26.0.0 前置与低版本兼容保护外链。扣分项：empty 关闭能力的适用模式（仅 API 参考明确 ENABLE）与组件级接口前提未在指南限定（DOC-003），DEFAULT 模式下行为待验证（PV-001）。 |
| 完整性 | 10 | 78 | 开启方式、组件适配、视效定制、功耗、FAQ 覆盖完整。缺口：isImmersiveMaterialSupported 设备支持判断未在指南任何页面出现（DOC-006）；ChipGroup/SegmentButton 生效区域未定义（DOC-008）；default 模式默认开启组件清单依赖外链 MaterialState（enable:31）。 |
| 一致性 | 10 | 75 | 跨页一致性良好：生效范围条款在 overview/enable/constraints/faq 四处逐字一致；FAQ 与 common-capability 对 materialColor、applyShadow 的描述一致。扣分项：enable 页内部 disable 作用范围两处直接互斥（DOC-001）；enable:37 与 component-adaptation:23 对 DEFAULT 模式标题栏的表述需读者自行调和（DOC-002 关联）。 |
| 上下文清晰与歧义 | 10 | 78 | 整体语境清晰，组件适配页按导航/弹窗/按钮选择/其余组件分类得当。歧义点：systemMaterial 传 undefined 的语义在指南与通用属性 API 参考两处官方文本字面不一致（DOC-004）；『索引条默认开启沉浸光感』实指其提示弹窗，需读至同节下文方能澄清。 |
| 行文逻辑与信息架构 | 10 | 85 | 简介→开启→组件适配→视效→功耗→FAQ 的信息架构合理，交叉引用方向正确（简介指向开启与适配，开启指向功耗与FAQ，适配引用FAQ排障）。两级导航页职责明确。轻微问题：导出标题层级跳变（h1 直接接 h4）与字面 [h2] 前缀降低结构可读性（DOC-009）。 |
| 开发者易用性与可复现性 | 15 | 80 | 前置条件、成功判据、失败排查（FAQ 12 问）、恢复路径（empty 关闭、backgroundColor 替代）齐备；正例/反例对照的写法值得肯定。扣分项：多个代码片段无 import 或组件上下文（DOC-007）、代码围栏无语言标注、FAQ 示例存在未使用的导入与字段、术语大小写不统一与循环表述（DOC-010）。 |
| 链接资源 | 5 | 90 | 全部官方域内链接，锚点规范（含中文锚点编码），同特性互链已改写为本地相对链接。96 个外部引用未逐一验证可达性（超出本次预算），抽样 2 个 API 参考页均可达且内容匹配。 |
| 安全合规 | 3 | 95 | 无权限、隐私或安全敏感内容；module.json5 metadata 配置项说明与字段约定明确；示例无凭据泄露风险。 |

## Findings

以下问题按严重度从高到低排列；同一严重度保持原始顺序。

### DOC-001 · 应用级disable的作用范围同页自相矛盾

- 维度：`consistency`
- 状态 / 严重度 / 置信度：`confirmed` / `High` / `certain`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` · 沉浸光感开启方式对比:77
- 原文：应用级开关设置为disable时，会全局禁用沉浸光感，应用级或组件级开启的设置均不生效。
- 被检验主张：同一页面（开启沉浸光感）对应用级开关disable的作用范围给出两种互斥描述：全局禁用（应用级与组件级均不生效）与只针对应用级开启的组件。
- 证据：`EVID-001`、`EVID-002`、`EVID-013`

两处原文的六个作用域轴完全对齐：均为应用级开关disable状态（mode 轴相同），均未限定版本、组件、条件、环境与生命周期（其余轴两侧均为 null）。左侧（第77行）明确『应用级或组件级开启的设置均不生效』，右侧（第89行）明确『只针对应用级开启的组件』，对『组件级开启的设置在 disable 下是否生效』给出不能同时成立的结论。API 参考 MaterialState.DISABLE 的定义（『所有组件禁止开启沉浸式系统材质，即使主动为组件设置沉浸式系统材质参数也不会生效』）与第77行一致，第89行与同页第77行及 API 参考均冲突。

影响：开发者依据第89行选择『设disable以仅关闭应用级效果、保留组件级效果』时，按 API 参考与第77行的实际行为组件级设置也会全部失效，开关策略与上线效果不符；反向读者也会对 disable 的语义产生摇摆，无法据此设计可靠的降级方案。

建议：以 API 参考 MaterialState.DISABLE 为准统一两处表述：明确 disable 为全局禁用，应用级与组件级开启的设置均不生效；如需保留组件级效果，不应使用 disable，而应在 enable/default 模式下按组件用 uiMaterial.Material.empty 关闭。
- 内部冲突主题：应用级开关disable对组件级开启的沉浸光感设置的影响
- 原子命题 A（EVID-001）：应用级开关设置为disable时，会全局禁用沉浸光感，应用级或组件级开启的设置均不生效。 → 组件级开启的设置不生效（全局禁用）
- 原子命题 B（EVID-002）：应用级关闭：应用级开关设置为disable，只针对应用级开启的组件。 → disable只作用于应用级开启的组件，组件级开启的设置不受影响
- 共同作用域：版本=未限定；模式=应用级开关disable；组件=未限定；条件=未限定；环境=未限定；生命周期=未限定
- 互斥原因：在同一应用级开关disable状态下，组件级开启的设置是否生效两个结论不能同时成立

建议改写：应用级关闭：应用级开关设置为disable时会全局禁用沉浸光感，应用级或组件级开启的设置均不生效；该方式作用于全部组件，无法仅关闭应用级效果而保留组件级效果。

### DOC-002 · default模式“组件默认开启沉浸光感”表述过宽

- 维度：`technical_correctness`
- 状态 / 严重度 / 置信度：`confirmed` / `Medium` / `high`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` · 沉浸光感开启方式对比:37
- 原文：module.json5未配置该字段时即为default模式，开发者的应用从API版本26.0.0之前升级至API版本26.0.0及以上，在未主动设置沉浸光感的情况下，组件默认开启沉浸光感，无需任何配置。
- 被检验主张：default（未配置）模式下，应用升级到 API 26.0.0 及以上且未主动设置时，组件（无限定）默认开启沉浸光感。
- 证据：`EVID-003`、`EVID-014`、`EVID-008`、`EVID-009`

API 参考 MaterialState.DEFAULT 的定义为：仅 Dialog、Toast、AlphabetIndexer 在组件未设置背景颜色、模糊参数和阴影参数时默认开启，Text 设置 copyOption 触发的文本菜单默认开启，『其他组件由应用主动设置』。指南的『组件默认开启沉浸光感』未限定组件清单与前置条件，覆盖面明显宽于 API 定义；同资料集 component-adaptation.md 第23行亦明确 DEFAULT 时标题栏无材质效果，faq.md 第341行给出了与 API 一致的精确清单。三处对照表明第37行是过宽表述而非另一套口径。

影响：开发者升级 targetSdkVersion 后可能预期所有支持组件（含 Navigation 标题栏、Tabs 等）默认获得沉浸光感，实际仅弹窗类少数组件默认开启，产生『升级后无效果』的误判与排障成本。

建议：在第37行补充组件清单限定并链接 MaterialState：明确 default 模式下默认开启的组件范围（Dialog、Toast、AlphabetIndexer、Text 文本菜单，且需未主动设置背景/模糊/阴影），其他组件仍需应用主动设置。

建议改写：module.json5未配置该字段时即为default模式，开发者的应用从API版本26.0.0之前升级至API版本26.0.0及以上，在未主动设置沉浸光感的情况下，Dialog、Toast、AlphabetIndexer及Text文本菜单等组件默认开启沉浸光感（详见MaterialState组件清单），其余组件仍需应用主动设置。

### DOC-003 · uiMaterial.Material.empty关闭能力的适用模式与前提未限定

- 维度：`version_compatibility`
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `medium`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` · 关闭沉浸光感:86
- 原文：组件级关闭：组件级设置uiMaterial.Material.empty。应用级开启和组件级开启两种接入方式均可通过该操作关闭。
- 被检验主张：无论应用以应用级还是组件级方式接入，任意组件都可通过设置 uiMaterial.Material.empty 关闭沉浸光感。
- 证据：`EVID-004`、`EVID-005`、`EVID-015`

API 参考 Material.empty 的说明为『在ENABLE使能模式下，可通过设置systemMaterial(uiMaterial.Material.empty)来单独关闭某个组件的沉浸式系统材质效果。如果组件未支持组件级沉浸式系统材质接口，则无法通过此方法关闭材质效果』，即明确限定了 ENABLE 模式与『组件须支持组件级接口』两个前提。指南将适用范围推广为『两种接入方式均可』，未提及组件级接口前提；且第93行进一步建议用 empty 关闭『默认开启沉浸光感的组件』（对应 DEFAULT 模式下的默认开启组件），而 API 参考未说明 DEFAULT 模式下 empty 是否有效。两侧作用域（mode 轴：null vs ENABLE）未对齐，不能判定哪一侧覆盖真实行为，需要进一步证据。

影响：开发者在 DEFAULT 模式（未配置 module.json5）下按指南用 empty 关闭默认开启的 Toast/Dialog，若该模式下 empty 不生效或组件不支持组件级接口，将无法关闭且缺乏排查线索。

建议：在指南中补充 empty 的两个前提：API 参考明确的有效模式（ENABLE）与组件须支持组件级沉浸式系统材质接口；对 DEFAULT 模式下关闭默认开启组件的可行路径给出明确结论或替代方案。

### DOC-004 · systemMaterial设置为undefined的语义两处官方表述不一致

- 维度：`context_clarity`
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `medium`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` · 关闭沉浸光感:93
- 原文：undefined表示恢复为组件默认的沉浸光感效果
- 被检验主张：systemMaterial 属性传入 undefined 表示恢复为组件默认的沉浸光感效果。
- 证据：`EVID-005`、`EVID-016`

通用属性 API 参考 systemMaterial 参数说明为『设置为undefined时恢复为无材质的效果，若同时设置了材质对象影响的通用属性，会恢复至对应通用属性设置的值』。对默认开启组件（如 DEFAULT 模式的 Toast），『恢复为组件默认的沉浸光感效果』与『恢复为无材质的效果』字面互斥：前者呈现默认材质，后者无材质。两句均来自官方文档，无法在不引入运行时证据的情况下裁决哪一种是行为真值；两种读法还会直接影响第93行『关闭默认开启组件应使用 empty 而非 undefined』这一建议的成立基础。

影响：开发者清空 systemMaterial 后无法预期默认开启组件的视觉结果（回到默认材质还是完全无材质），在动态开关材质的界面中产生与设计稿不符的风险。

建议：与 API 参考统一 undefined 的表述，并区分两种场景：非默认开启组件清空后无材质、恢复通用属性；默认开启组件清空后是否回落到默认材质需官方明确（可先在 API 参考参数说明中补充），指南再据此改写第93行。

### DOC-005 · lightEffect传入undefined的行为与API参考不一致

- 维度：`technical_correctness`
- 状态 / 严重度 / 置信度：`confirmed` / `Low` / `high`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-common-capability.md` · 设置沉浸式系统材质交互效果:142
- 原文：lightEffect传入有效对象即启用，传入null或undefined则不启用
- 被检验主张：lightEffect 参数传入 null 或 undefined 均不启用点光源效果。
- 证据：`EVID-007`、`EVID-017`、`EVID-006`

API 参考 ImmersiveOptions.lightEffect 的定义为『传入LightEffectOptions对象时启用光感交互反馈；传入null时显式禁用光感交互反馈效果；不传入时默认为undefined，取决于组件是否默认有交互光感效果』，即 undefined 的行为取决于组件默认值而非一律不启用。同资料集 component-adaptation.md 第137行给出内部佐证：Select 在 ENABLE 模式下『默认开启交互形变（interactive）与光感交互反馈（lightEffect）』，证明存在自带默认光感的组件。指南将 undefined 与 null 等同为『不启用』，与 API 参考及组件默认行为冲突。

影响：开发者省略 lightEffect（即传 undefined）以关闭点光源时，对自带默认光感的组件（如 ENABLE 模式下的 Select）实际仍会呈现光感反馈，与预期不符。

建议：改写为三态表述：传入有效对象启用并可用 color 自定义；传入 null 显式禁用；不传（undefined）时取决于组件是否默认有交互光感效果，需要确定关闭时应显式传 null。

### DOC-006 · 指南未介绍设备支持判断isImmersiveMaterialSupported

- 维度：`completeness`
- 状态 / 严重度 / 置信度：`likely` / `Low` / `high`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-overview.md` · 沉浸光感简介:11
- 原文：其中算力档位由设备定义且固定，可通过获取材质等级接口（uiMaterial.getGlobalMaterialLevel）查询
- 被检验主张：指南全集（8页）只提供算力等级查询（getGlobalMaterialLevel），未提供判断设备是否支持沉浸式系统材质的方法（isImmersiveMaterialSupported），也未提及不支持设备上『可设置但无效果』的行为。
- 证据：`EVID-019`、`EVID-018`

API 参考 providing isImmersiveMaterialSupported（判断当前设备是否支持沉浸式系统材质，配置由设备定义不可修改），且通用属性 systemMaterial 的说明两次强调『ImmersiveMaterial只有在支持沉浸式材质的设备上设置才有效果，在不支持沉浸式材质的设备上可设置但无效果，可通过isImmersiveMaterialSupported判断』。指南简介页只覆盖算力分档维度；FAQ 的『低算力设备差异』也只覆盖算力降级，均未覆盖设备整体不支持的排查场景。

影响：在不支持沉浸式材质的设备上，开发者设置 systemMaterial 后无任何效果且无日志线索，指南内缺少该场景的排查入口，需自行翻阅 API 参考才能定位。

建议：在简介或 FAQ 中补充：沉浸光感依赖设备支持，不支持的设备上设置无效果且不报错，可用 uiMaterial.isImmersiveMaterialSupported() 预判并准备降级样式。

### DOC-007 · 多个代码片段缺少import与组件上下文

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `certain`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-constraints.md` · 避免材质嵌套:65
- 原文：// 正例：仅在最外层设置一次沉浸式系统材质
- 被检验主张：功耗优化页与 FAQ 页共 9 个代码片段使用 uiMaterial 命名空间但块内无 import；个别片段引用未定义的组件成员或包含未使用的符号。
- 证据：`EVID-011`、`EVID-012`

结构化预检标记 constraints.md 第65/94/151/172/201/218 行、faq.md 第164/223/295/319/375/421 行的代码块缺少 import 上下文（同页首个示例有 import，后续片段省略）。此外 faq.md 第57行导入 TitleBarType 未使用、第62行定义 arr 未使用；constraints.md 第206-211行反例引用 this.materialColor 与 this.nextColor() 而无所属组件。片段语义仍可读懂，但直接复制无法编译，与『代码是否可复制使用』的必检项不符。

影响：开发者复制片段到工程后需自行补 import、清理未用符号或补组件骨架，增加出错面与调试时间。

建议：为每个含 uiMaterial 的独立代码块补 import { uiMaterial } from '@kit.ArkUI'（或在块首注明依赖前文 import）；删除未使用的 TitleBarType 与 arr；为 setInterval 反例补充最小组件上下文。

### DOC-008 · ChipGroup/SegmentButton的生效区域未说明

- 维度：`completeness`
- 状态 / 严重度 / 置信度：`ambiguous` / `Low` / `medium`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` · 开启沉浸光感:10
- 原文：以及按钮与选择类组件（Slider、Toggle、Select）可在页面内全部区域生效
- 被检验主张：生效范围条款将『按钮与选择类组件』的全区域生效清单限定为 Slider、Toggle、Select；同资料集把 ChipGroup、SegmentButton 也归入按钮与选择类场景，但未在任何页面说明这两个（组）组件的生效区域。
- 证据：`EVID-010`、`EVID-020`

enable/overview/faq 四处一致的生效范围条款中，全区域生效清单不含 ChipGroup、Chip、SegmentButton、SegmentButtonV2；component-adaptation.md 将它们归入『按钮与选择类组件』场景并说明 ENABLE 模式默认开启（如第181行），但该页同样未给出其生效区域；『其余组件』条款（component-adaptation.md:209）又只针对通用属性 systemMaterial 的组件。ChipGroup 等通过 backgroundSystemMaterial 等专属字段设置，介于两组条款之间，区域归属无原文可依。

影响：开发者在页面中部（非标题栏/底部TabBar区域）为 ChipGroup/SegmentButton 设置材质时，无法从资料集预判是否生效，只能真机试错。

建议：在生效范围条款或组件适配页明确 ChipGroup、Chip、SegmentButton、SegmentButtonV2 的生效区域（全区域或仅标题栏/底部TabBar），与 MaterialState 默认开启清单对齐。

### DOC-009 · Markdown导出格式问题：标题字面[h2]、表格碎行、代码围栏无语言

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `certain`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-overview.md` · 关键技术:15
- 原文：#### [h2]沉浸式系统材质
- 被检验主张：正文二级标题以『#### [h2]标题名』形式导出（层级跳变且含字面前缀），表格被导出为竖排碎行，全部代码围栏未声明语言。
- 证据：`EVID-021`

该形态源于官网内容接口的 Markdown 导出（快照派生特征），官网渲染页面可能正常显示；但作为可复制分发的资料形态，标题层级 h1→h4 跳变、字面 [h2] 前缀、表格竖排碎行（如 overview.md:21-67 样式表、enable.md:20-54 对比表）都会降低可读性与再加工质量。代码围栏无一标注 ets/ArkTS 语言（预检 PRE-003/004/006/008/009/011/013/015/017/018/020/022/024/026/028/030/031/032/033/034），影响语法高亮与工具识别。constraints.md 第7行还存在中英文引号嵌套（"稀缺"）的标点混用。

影响：主要影响阅读、复制与二次分发体验，不影响技术语义。

建议：导出链路修复标题层级与 [h2] 字面前缀、表格结构；代码围栏统一标注 ets；统一中文引号规范。

### DOC-010 · 术语大小写不统一与循环表述

- 维度：`developer_usability`
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：`D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` · 开启沉浸光感:7
- 原文：要确保应用的targetSDKVersion不低于26.0.0
- 被检验主张：版本字段写作 targetSDKVersion（与 build-profile.json5 的 targetSdkVersion 字段名大小写不一致）；组件级开启的『支持的组件』以『支持设置沉浸式系统材质的组件』循环表述。
- 证据：`EVID-023`、`EVID-022`

targetSDKVersion 的拼写与工程配置文件字段 targetSdkVersion 不一致，跨文档检索时容易漏配；enable.md 第43行『支持的组件：支持设置沉浸式系统材质的组件』没有给出可操作的清单或链接，信息量低（实际清单在组件适配页）。均为表达层问题，不涉及技术事实错误。

影响：降低检索效率与首读可理解性。

建议：统一使用 targetSdkVersion（或与所链发布说明页保持一致）；第43行改为指向组件适配页的具体分类或 MaterialState 清单的明确表述。

## 待确认项

| ID | 优先级 | 主张 | 原因 | 所需证据 |
|---|---|---|---|---|
| PV-001 | medium | DEFAULT 模式下设置 systemMaterial(uiMaterial.Material.empty) 能否关闭默认开启组件（Toast/Dialog/AlphabetIndexer）的沉浸式系统材质。 | API 参考仅明确 ENABLE 模式下 empty 的关闭行为，指南推广到两种接入方式且建议用于关闭默认开启组件，DEFAULT 模式的有效性无独立证据。 | 组件参考页（ShowToastOptions/CustomDialogControllerOptions 等 systemMaterial 字段说明）或 API 26 模拟器/真机在 DEFAULT 模式下的验证结果。 |
| PV-002 | medium | systemMaterial 传入 undefined 后，默认开启组件的实际视觉是恢复默认材质还是无材质。 | 指南（恢复组件默认沉浸光感效果）与通用属性 API 参考（恢复为无材质的效果）两处官方文本字面互斥，无运行时证据裁决。 | API 26 模拟器/真机在 DEFAULT 模式默认开启组件上清空 systemMaterial 的观察结果，或官方对两处表述的统一澄清。 |
| PV-003 | low | 组件适配页声称的各组件 ENABLE 模式默认样式值（Toast THICK、Dialog ULTRA_THICK、索引条 THICK、Select ULTRA_THIN、ChipGroup ULTRA_THIN、SegmentButton THIN 等）与组件参考一致。 | 本次仅定向取证 uiMaterial 与通用属性两个 API 参考页，未逐一核对各组件参考页的默认值声明，证据预算保留。 | 对应组件参考页（ts-container-tabs、ts-basic-components-select、ohos-arkui-advanced-chipgroup 等）中 systemMaterial/backgroundSystemMaterial 字段的默认值说明。 |
| PV-004 | low | FAQ 引用的日志文本『Material inactive: out of scope. Use component in navigation title bar or Tabbar.』在真机上的真实性。 | 日志文本仅见于 FAQ 单处，无其他官方页面或日志文档佐证。 | API 26 真机在生效范围外设置 systemMaterial 的 hilog 输出。 |

## 证据索引

| ID | 类型 | 来源 | 定位 | 版本 | 抓取/验证时间 |
|---|---|---|---|---|---|
| EVID-001 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第77行，『沉浸光感开启方式对比』节末尾列表项 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
| EVID-002 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第89行，『关闭沉浸光感』节 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
| EVID-003 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第37行，开启方式对比表『应用级开启』行说明第2条 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
| EVID-004 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第86行，『关闭沉浸光感』节列表项 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
| EVID-005 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第93行，『关闭沉浸光感』节末段 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
| EVID-006 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-component-adaptation.md` | 第137行，『下拉按钮（Select）』节 | API 26.0.0 | 2026-09-08T06:57:44.613Z |
| EVID-007 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-common-capability.md` | 第142行，『设置沉浸式系统材质交互效果』节 | API 26.0.0 | 2026-09-08T06:57:45.048Z |
| EVID-008 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-component-adaptation.md` | 第23行，『Navigation标题栏』节 | API 26.0.0 | 2026-09-08T06:57:44.613Z |
| EVID-009 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-faq.md` | 第341行，『Dialog或Toast组件默认没有材质效果』节 | API 26.0.0 | 2026-09-08T06:57:43.776Z |
| EVID-010 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第10行，『开启沉浸光感』节生效范围列表项 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
| EVID-011 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-constraints.md` | 第65-88行代码块（『避免材质嵌套』节，块内使用 uiMaterial.ImmersiveMaterial 但无 import） | API 26.0.0 | 2026-09-08T06:57:43.393Z |
| EVID-012 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-faq.md` | 第57-62行（MaterialScopeAdaptExample 导入 TitleBarType 未使用、定义 arr 未使用） | API 26.0.0 | 2026-09-08T06:57:43.776Z |
| EVID-013 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) | MaterialState 枚举 DISABLE 值说明（本地取证 D:\HW\testproject\evidence\external\arkts-apis-uimaterial.md 第179行） | API 26.0.0 | 2026-09-08T07:00:15.645Z |
| EVID-014 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) | MaterialState 枚举 DEFAULT 值说明（本地取证 D:\HW\testproject\evidence\external\arkts-apis-uimaterial.md 第163行） | API 26.0.0 | 2026-09-08T07:00:15.645Z |
| EVID-015 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) | Material.empty 说明（本地取证 D:\HW\testproject\evidence\external\arkts-apis-uimaterial.md 第86行） | API 26.0.0 | 2026-09-08T07:00:15.645Z |
| EVID-016 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect) | systemMaterial 参数说明（本地取证 D:\HW\testproject\evidence\external\ts-universal-attributes-image-effect.md 第1813行） | API 26.0.0 | 2026-09-08T07:00:16.253Z |
| EVID-017 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) | ImmersiveOptions.lightEffect 参数说明（本地取证 D:\HW\testproject\evidence\external\arkts-apis-uimaterial.md 第583行） | API 26.0.0 | 2026-09-08T07:00:15.645Z |
| EVID-018 | official_api | [https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) | uiMaterial.isImmersiveMaterialSupported 说明（本地取证 D:\HW\testproject\evidence\external\arkts-apis-uimaterial.md 第392-415行） | API 26.0.0 | 2026-09-08T07:00:15.645Z |
| EVID-019 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-overview.md` | 第11行，简介页算力与设置说明段 | API 26.0.0 | 2026-09-08T06:57:42.508Z |
| EVID-020 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-component-adaptation.md` | 第183行，『子页签（ChipGroup）』节应用级开启说明 | API 26.0.0 | 2026-09-08T06:57:44.613Z |
| EVID-021 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-overview.md` | 第15行，『关键技术』节下标题 | API 26.0.0 | 2026-09-08T06:57:42.508Z |
| EVID-022 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第43行，开启方式对比表『组件级开启』行 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
| EVID-023 | target | `D:\HW\testproject\evidence\source-snapshot\arkts-immersive-light-sense-enable.md` | 第7行，版本前置条件列表项 | API 26.0.0 | 2026-09-08T06:57:44.193Z |
