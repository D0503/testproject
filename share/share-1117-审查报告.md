# HarmonyOS 文档质量审查报告

## 实际审查范围

已纳入 12 篇：[碰一碰文件分享](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share)、[概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-overview)、[harmonyShare（华为分享）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share)、[目标设备接收分享数据一步直达体验](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-access-one-step)、[systemShare（分享）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share)、[分享内容直达应用界面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-sandbox)、[手机与PC/2in1、手机与Tablet间相互分享](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-mutually)、[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-error-code)、[内容分享](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-between-phones-content)、[碰一碰](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581)、[分享数据类型不支持](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-faq-2)、[分享时提示“您选择的文件不支持分享”](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-faq-3)。

## Findings

以下问题按严重度从高到低排列；同一严重度保持原始顺序。

### DOC-001 · 《碰一碰文件分享》称on('dataReceive')仅在2in1可用且其他设备返回801，未随6.1.0(23)新增Tablet支持版本化

- 验证方式：文档审视
- 发现日期：2026-11-16
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`confirmed` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) · 开发步骤 > 接收文件:196
- 原文：[harmonyShare（华为分享）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share)模块提供了harmonyShare.on('dataReceive')方法，用于实现应用沙箱接收文件的事件监听。请注意当前接口仅在2in1设备类型可以正常调用，其他设备类型会返回801错误码。
- 被检验主张：API23起支持Tablet，其他设备无响应；实践页仍无条件写仅2in1、其他801。

官方文档给出版本化范围：《分享内容直达应用界面》行5声明沙箱接收能力从6.1.0(23)新增支持Tablet设备；API参考share-harmony-share.md行919设备行为差异写明“对于6.0.2(22)及之前的版本，该接口在PC/2in1中可正常调用，在其他设备类型中返回801错误码。从6.1.0(23)开始，该接口在PC/2in1、Tablet中均可正常使用，在其他设备类型中无响应”。《碰一碰文件分享》该句未限定版本，与两处版本化表述不一致，且“其他设备返回801”仅对6.0.2(22)及之前成立。因《碰一碰文件分享》原文未给出版本限定、无法与版本化表述逐轴对齐作用域

影响：面向Tablet或6.1.0(23)及以上系统的开发者会误判该接口不可用或误写801错误处理分支；实际行为是Tablet可正常调用、其他设备无响应，影响设备范围决策与错误处理代码。

建议：将该句改为带版本限定的说明，与API参考一致，例如：“6.0.2(22)及之前版本该接口仅在PC/2in1可正常调用，其他设备类型返回801错误码；从6.1.0(23)开始，该接口在PC/2in1、Tablet中均可正常使用，在其他设备类型中无响应。”

### DOC-002 · off后tipsStatus仍为true，阻止再次注册

- 验证方式：文档审视
- 发现日期：2026-11-18
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`confirmed` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share) · off('knockShare'):681
- 原文：harmonyShare.off('knockShare', this.sendOnlyCallback);
  this.tipsStatus = true;
- 被检验主张：应在取消成功后复位false。原始示例局部复现：on一次、off一次、再次注册只弹提示。

原始on示例以!tipsStatus注册后置true，off后仍置true。直接抽取这两个原始方法做局部状态复现，注册→取消→再次注册仅调用on一次，最后一次进入提示。应在off成功后复位false。 

影响：开发者照抄示例对实现『关闭监听后重新打开』时，取消监听后状态标志未复位，再次调用注册方法会直接进入提示分支而无法重新注册，功能失效；因属应用侧状态标志而非 API 契约，发现问题后修正成本低。

建议：将 off('knockShare') 示例中 this.tipsStatus = true 改为 this.tipsStatus = false，与同文档其余 off 示例的状态复位模式保持一致。

### DOC-003 · 沙箱目录属性写成content.fileDir

- 验证方式：文档审视
- 发现日期：2026-11-16
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) · 开发步骤 > 发起分享 > 分享数据构建:37
- 原文：> * uri是指要分享的文件URI，而非文件路径，例如沙箱路径content.fileDir，应通过[fileUri.getUriFromPath()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fileuri#fileurigeturifrompath)获取其URI。
- 被检验主张：应为context.filesDir；只确认说明中的拼写错误。

Context 的属性名为 filesDir（指南与 API 示例均为 this.context.filesDir / contextFaker.filesDir），'content.fileDir' 两处拼写均误（content→context、fileDir→filesDir），按原文输入无法获得正确路径，属于对象/属性名笔误。 

影响：按行39举例拼写content.fileDir的开发者会遇到未定义标识符或属性不存在的编译错误；虽同篇示例可纠正，但说明文字与示例不一致增加理解与排错成本。

建议：将行39改为“例如沙箱路径context.filesDir”，与同篇示例、关联文档示例及SDK声明保持一致。

### DOC-004 · appLink说明引用不存在的ReadingExtendedData类型名

- 验证方式：文档审视
- 发现日期：2026-11-18
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share) · ReadingExtendedShareRecordData:192
- 原文：| appLink | string | 否 | 否 | 文章appLink（https链接格式）。 当ReadingExtendedData不为空时，此值必填。 长度限制：appLink与appLinkExtraInfo拼接后的总长度不得超过512个字符。 |
- 被检验主张：应改用ReadingExtendedShareRecordData或明确revisitShareRecordData。

SDK声明中appLink为非可选string（ReadingExtendedShareRecordData类型内必填），与表格“可选=否”一致；本类型整体在utd为TEXT且revisitShareRecordType为READING_SHARE时生效（行181）。字段表已标注必填，说明文字又引入带简称的条件句，条件主体需读者自行推断，简称也无法在本页检索到对应类型。

影响：开发者需推断“ReadingExtendedData”所指，可能误解为存在另一个独立字段或类型。

建议：将说明改为“当SharedRecord.revisitShareRecordData传入ReadingExtendedShareRecordData时，此值必填”，或依据表格必填标注直接删除该条件句。

### DOC-005 · 精准分享步骤3文本称在onDataReceived()回调中调用getInfo()，与同篇示例的调用位置矛盾

- 验证方式：文档审视
- 发现日期：2026-11-17
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：清晰性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) · 碰一碰精准分享／业务逻辑分支处理:352
- 原文：* 接收端：在onDataReceived()回调中，使用[getInfo()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share#getinfo-1)接口获取触碰点位置，根据触发点位置执行指定位置插入或列表末尾追加逻辑；
- 被检验主张：文字位于onDataReceived；代码在receive前。应统一教学时序，不断言任何一侧调用非法。

（完整句为“* 接收端：在onDataReceived()回调中，使用getInfo()接口获取触碰点位置，根据触发点位置执行指定位置插入或列表末尾追加逻辑；”，原文getInfo()带指向API参考的链接标记，quote为渲染文本原子主张）将getInfo()调用归入onDataReceived()回调；但同篇两处示例（接收文件示例、精准分享步骤3代码块，getInfo()调用位于均在dataReceive()回调内、receive()调用之前调用receiveTarget.getInfo()，onDataReceived()回调仅遍历分享记录处理数据，不含getInfo()调用；mutually示例同样在dataReceive回调内调用getInfo()。两侧描述同一接收流程中getInfo()的调用位置，结果互斥。本结论仅确认两处表述存在冲突。

影响：开发者按行354文本在onDataReceived内调用getInfo()，与同篇示例及实际调用时序不一致，可能取不到坐标或取值时机错误，导致精准插入逻辑混乱。

建议：将行354改为“接收端：在dataReceive()回调内调用getInfo()接口获取触碰点位置，根据触发点位置执行指定位置插入或列表末尾追加逻辑”，与同篇示例及时序保持一致。

### DOC-006 · 链接卡片布局选择条件漏掉宽高比等于1:1

- 验证方式：文档审视
- 发现日期：2026-11-13
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：完整性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-between-phones-content](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-between-phones-content) · 设置配套的卡片样式:36
- 原文：| 沉浸式大卡布局 | 沉浸式大卡布局包括预览图、标题、描述、应用图标。 当分享数据为链接类型时，需要向用户传递链接的内容，推荐使用此卡片模板。 使用方法 需同时满足以下2个条件： 1. 构造分享数据时，需同时传入标题（title）、描述（description）字段和预览图（thumbnailUri）字段。 2. 预览图宽高比小于1:1。 布局要求 1. 预览图：支持最小宽高比1:4，超出部分将被裁剪。 2. 标题：最大可显示2行，当文本超过2行时，未能正常在屏幕显示的文本用省略号代替。如果标题末尾有重要信息显示，需应用自行控制字数约20个中文左右。 3. 描述：仅可显示1行，文本超过1行时，未能正常在屏幕上显示的文本用省略号代替。 4. 应用图标：无需配置，系统将默认获取应用图标用于显示在卡片底部。 | 
- 被检验主张：两个带标题/描述的布局分别限定<1与>1，未覆盖推荐的正方形输入。应补充=1的选择规则，不能替官方猜归属。

链接数据同时含标题、描述、预览图时，两类模板选择条件分别为宽高比<1与>1，未交代=1。两种链接类模板的触发条件以严格不等式划分，1:1 边界值落入空档；碰一碰分享设计指南明确建议链接类预览图采用 4:3、1:1、16:9 三种最佳比例，即官方推荐输入恰好落在开发指南模板条件的空档上，文档未说明此时的回退模板或裁剪行为。

影响：开发者按设计指南建议传入宽高比恰为 1:1 的预览图（如正方形图）时，无法从开发指南预知将渲染沉浸式大卡还是白卡上下布局（或两者皆不匹配），卡片样式预期不确定。

建议：请维护方确认并补充宽高比等于1:1时的布局选择规则，必要时同步调整条件。

### DOC-007 · textFragement术语拼写错误

- 验证方式：文档审视
- 发现日期：2026-11-18
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：规范性
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share) · ReadingExtendedShareRecordData:195
- 原文：| appLinkExtraInfo | string | 否 | 是 | appLink补充信息，拼接到appLink后参与二维码生成。 web文本选中分享场景，建议携带textFragement信息(#:~:text=[prefix-,]textStart[,textEnd][,-suffix])，以便支持高亮突出显示； 其他场景，应用可携带自定义参数，用于应用直达后的内部逻辑处理。 |
- 被检验主张：应为textFragment；不是新的API字段，不影响#:~:text=语法。

textFragement为拼写错误；应为textFragment/Text Fragments。不是需修改的API字段名，#:~:text=语法不因这个说明拼写而失效。 

影响：开发者按『textFragement』检索 SDK 注释或 Text Fragments 标准无法命中，轻微增加理解成本；不影响示例语法的可用性，无工程失败路径。

建议：将『textFragement』更正为『textFragment』，与 SDK 注释及 Text Fragments 标准术语一致。

### DOC-008 · 错误码1003702001错误信息含未渲染的JSDoc链接标记“{ @link UDMF.File }”且语句语法不通

- 验证方式：文档审视
- 发现日期：2026-11-16
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：规范性
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-error-code](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-error-code) · 1003702001 数据记录格式非法/类型不支持:29
- 原文：Record types are not support.(The batch and multiple selection modes support { @link UDMF.File } type records only.)
- 被检验主张：原始错误消息包含{ @link UDMF.File }残留及are not support语法问题。确认展示文字需清理；消息可能是稳定运行错误串，改文前宜核对实际字符串，不影响错误码含义。

原始错误消息包含{ @link UDMF.File }残留及are not support语法问题。确认展示文字需清理；消息可能是稳定运行错误串，改文前宜核对实际字符串，不影响错误码含义。 

影响：开发者遇到 1003702001 时无法点击或定位 UDMF.File 类型说明，需自行搜索；语法问题降低对文档严谨性的信任，但不影响接入成败。

建议：将 `{ @link UDMF.File }` 渲染为指向 uniformTypeDescriptor/UDMF 文档的正式链接（或改写为文字『UDMF.File 类型』并附链接），并核对运行期错误串后修正 "not support" 为 "not supported"；share-system-share.md show 错误码表同步修订。

### DOC-009 · off('dataReceive')小节参数表前缺少“参数：”小节标签

- 验证方式：文档审视
- 发现日期：2026-11-16
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：规范性
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share) · off('dataReceive'):984
- 原文：## off('dataReceive')
      off(event: 'dataReceive', capability: RecvCapabilityRegistry, callback?: Callback<ReceivableTarget>): void
- 被检验主张：原始HTML确实缺“参数：”标签，但完整参数表仍在，只是同页结构不统一。

原始HTML确实缺“参数：”标签，但完整参数表仍在，只是同页结构不统一。Suggestion即可。 

影响：轻微影响可读性与页内结构一致性，不影响参数内容本身的正确性。

建议：在 off('dataReceive') 的“起始版本： 6.0.0(20)”之后、参数表之前补齐“参数：”标签，与其他小节保持一致。

### DOC-010 · App Linking/Deep Linking 术语拼写跨文档不一致

- 验证方式：文档审视
- 发现日期：2026-11-16
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：规范性
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-access-one-step](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-access-one-step) · 目标设备接收分享数据一步直达体验:8
- 原文：| 一步直达 | 链接类型， Applinking | 不涉及 | 直达对应的应用。如应用未安装，拉起浏览器或应用市场（以AppLinking配置为准）。 |
- 被检验主张：同表Applinking/AppLinking及文档App Linking/Deep Linking拼写不统一，可统一术语；不算技术行为错误。

同表Applinking/AppLinking及文档App Linking/Deep Linking拼写不统一，可统一术语；不算技术行为错误。 

影响：拼写不统一影响开发者按术语检索关联文档（App Linking Kit 等）时的命中率，并降低表格可读性；不影响技术行为。

建议：将该表数据类型列统一为 App Linking 与 Deep Linking（与预览方式列及《内容分享》小节标题一致）。

### DOC-011 · 同一短语“同开发者账号(developerId相同)”括号样式前后不一致

- 验证方式：文档审视
- 发现日期：2026-11-16
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：规范性
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-access-one-step](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-access-one-step) · 指定应用直达:26
- 原文：同开发者账号(developerId相同)下的应用可通过[module.json5配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)配置实现优先拉起指定应用。
- 被检验主张：同篇同一developerId括注混用全角与半角，规范建议可保留，不影响功能。

同篇同一developerId括注混用全角与半角，规范建议可保留，不影响功能。 

影响：纯样式问题，轻微影响阅读一致性，不影响技术行为。

建议：统一为全角括号（与文档其余部分一致）。

### DOC-012 · 中文备注使用半角括号和冒号

- 验证方式：文档审视
- 发现日期：2026-11-17
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：规范性
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581) · 卡片模板:25
- 原文：根据不同的分享内容和业务诉求，按照接入内容不同提供 5 类模板，应用可根据不同需求选择不同模板。(备注:当前名片类模板仅对系统联系人应用开放)
- 被检验主张：中文备注中半角括号、冒号可统一中文标点；仅Suggestion，不作为技术或接入缺陷。

中文备注中半角括号、冒号可统一中文标点；仅Suggestion，不作为技术或接入缺陷。 

影响：主要影响中文排版一致性，不影响接口语义或构建。

建议：将该备注统一为中文括号和中文冒号。
