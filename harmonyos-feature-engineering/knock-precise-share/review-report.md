# HarmonyOS 文档质量审查报告

- 结论：基本合格但需修改
- 总分：88
- 接入门禁：`pass_with_warnings`
- 审查来源数：12

2026-11-17 已审阅碰一碰精准分享全部 12 篇登记官网正文，并结合静态图及 HMS ETS 26.0.0.105 声明核对关键接口。保留 5 项问题：3 项 Medium（设备版本说明、链接预览图裁剪歧义、空列表接收边界），1 项 Low（坐标采集时序描述），1 项 Suggestion（中文备注标点）。其中空列表问题基于静态阅读与局部 JavaScript 表达式复现，未确认完整示例状态可达性；未执行构建、安装或双设备验证。整体接入门禁为 pass_with_warnings，相关坐标转换、路径兼容、业务边界与动效仍待核，报告不代表全文每项技术主张均已验证。

## 实际审查范围

已纳入 12 篇：[碰一碰文件分享](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share)、[概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-overview)、[harmonyShare（华为分享）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share)、[目标设备接收分享数据一步直达体验](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-access-one-step)、[systemShare（分享）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share)、[分享内容直达应用界面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-sandbox)、[手机与PC/2in1、手机与Tablet间相互分享](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-mutually)、[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-error-code)、[内容分享](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-between-phones-content)、[碰一碰](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581)、[分享数据类型不支持](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-faq-2)、[分享时提示“您选择的文件不支持分享”](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-faq-3)。

## 文档框架与结构审查

12 篇已登记正文，按实践/指南、API、设计、FAQ 职责随文对照。API 中面板、复访与隔空传送作为背景阅读，不扩展本特性运行验证。

随文检查覆盖记录；已检查不表示无问题或穷尽覆盖。

| 检查类 | 处理情况 | 结论或限制 | 关联项 |
|---|---|---|---|
| 章节职责一致性 | 已检查 | 各文档职责可辨；接收坐标时序差异见 DOC-004。 | DOC-004 |
| 标题命名一致性 | 已检查 | 同类接入/概述/错误码标题可对应，未证明命名差异造成使用问题。 |  |
| 内容汇总完整性 | 已检查 | 已对照设备版本和设计裁剪规则，分散信息不自动作为缺失，具体问题见 DOC-001/002。 | DOC-001、DOC-002 |

## 维度评分

| 维度 | 权重 | 得分 | 说明 |
|---|---:|---:|---|
| 技术正确性 | 25 | 84 | DOC-003：接收示例的空列表边界缺少保护；其后果仅作局部表达式复现。其余未证实疑问不扣分。 |
| 版本兼容性 | 12 | 82 | DOC-001：当前设备支持及错误行为未按 API 23 分段。 |
| 完整性 | 10 | 95 | 注册、数据构造、接收、拒绝和 FAQ 已由各篇职责覆盖；未将局部片段缺 import/工具类判为缺陷。 |
| 一致性 | 10 | 80 | DOC-002：链接预览图的推荐与裁剪区间有歧义。 |
| 上下文清晰与歧义 | 10 | 90 | DOC-004：接收坐标采集时序的文字与展开代码不同。 |
| 行文逻辑与信息架构 | 10 | 95 | 实践、指南、API、设计与 FAQ 分工可辨，未要求统一模板。 |
| 开发者易用性与可复现性 | 15 | 88 | DOC-004/005：时序表述和中文备注规范需统一；不按转换生成的格式候选扣分。 |
| 链接资源 | 5 | 95 | 已登记正文均取得；相对链接候选已证实为路径/解析问题，未作为官网断链扣分。 |
| 安全合规 | 3 | 95 | 已读账号条件与临时目录授权说明，未确认安全缺陷；真实授权行为未实测。 |

## Findings

以下问题按严重度从高到低排列；同一严重度保持原始顺序。

### DOC-001 · dataReceive 的设备支持与错误行为说明未区分版本

- 验证方式：文档审视
- 发现日期：2026-11-17
- 官网修复状态：未修复
- 状态记录日期：2026-11-17
- 维度：准确性
- 状态 / 严重度 / 置信度：`confirmed` / `Medium` / `certain`
- 位置：[https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) · 开发步骤／接收文件:196
- 原文：请注意当前接口仅在2in1设备类型可以正常调用，其他设备类型会返回801错误码。
- 被检验主张：该当前适用范围说明没有覆盖 API 23 起新增的 Tablet 支持和其他设备无响应行为。
- 证据：`EVID-001`、`EVID-002`、`EVID-003`

当前独立 API 参考对两个版本段分别定义行为；沙箱接收指南同样明确 API 23 支持 Tablet。实践文档含 API 26 精准分享分支，且这句话无旧版本限定，不能以只讲 API 22 解释。

影响：读者据此排除 Tablet 接入，或在 API 23 及以后错误依赖 801 判断不支持，造成能力遗漏和排障偏差。

建议：按 API 22 及之前、API 23 起两个版本段重写，引用当前 API 的设备差异说明。

### DOC-002 · 链接预览图裁剪区间与 1:1 推荐之间存在歧义

- 验证方式：文档审视
- 发现日期：2026-11-17
- 官网修复状态：未修复
- 状态记录日期：2026-11-17
- 维度：准确性
- 状态 / 严重度 / 置信度：`ambiguous` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581) · 链接类卡片模板:81
- 原文：应用传入的预览图尽量保持在 4:3、1:1、16:9 三种比例，以此可保障画面不被裁剪。
- 被检验主张：同节对 1:1 链接预览图同时给出不裁剪承诺和区间外裁剪规则。
- 证据：`EVID-004`、`EVID-005`

同节推荐 1:1 并承诺免裁剪，却又说超出 4:3～16:9 居中裁剪；按数值理解，1:1 不在区间中。已对照原始响应和图例 IMG-36，图例同样列出 1:1。原文未解释比例轴方向或特殊比例例外，存在影响选图的两种解读。这些说明未区分例外条件，现有证据只能确认文档歧义，不能确定系统实际裁剪规则。

影响：设计者无法依据正文判断正方形预览图能否无裁剪展示，可能错误安排主体与底部信息。

建议：由文档维护方核实比例轴向、有效区间和 1:1 的实际处理，再统一文字与图例；不在证据不足时指定新的数值。

### DOC-003 · 接收回调在空展示列表上直接读取首项缩略图

- 验证方式：文档审视
- 发现日期：2026-11-17
- 官网修复状态：未修复
- 状态记录日期：2026-11-17
- 维度：准确性
- 状态 / 严重度 / 置信度：`likely` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) · 开发步骤／接收文件:253
- 原文：let thumbPath: string = videoDataList[0].thumbnail;
- 被检验主张：该接收分支未处理展示列表为空的情况。
- 证据：`EVID-006`、`EVID-007`、`EVID-008`

本篇承诺无命中时追加文件，却在追加前读取旧列表首项；全文未说明非空前置条件或补入占位项。对原文表达式的局部复现确认空数组下抛 TypeError，且发生在图片类型分支之前。尚未读取下载工程的初始化约束，故不宣称示例的实际启动状态一定为空，也不宣称已复现目标设备失败。

影响：若用户清空列表后接收新文件，回调可能在插入前中断，无法呈现已接收文件；具体工程是否允许该状态仍待确认。

建议：为空列表提供独立的缩略图回退资源，并在读取首项前判断是否存在；同时核对示例是否承诺非空不变量。

### DOC-004 · 接收端取坐标的文字时序与展开示例不同

- 验证方式：文档审视
- 发现日期：2026-11-17
- 官网修复状态：未修复
- 状态记录日期：2026-11-17
- 维度：清晰性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) · 碰一碰精准分享／业务逻辑分支处理:352
- 原文：在onDataReceived()回调中，使用
- 被检验主张：文字把获取坐标安排在接收完成回调内，而展开示例在启动接收前计算命中位置。
- 证据：`EVID-009`、`EVID-010`

本篇完整接收片段先取 getInfo 并计算 hitIndex，再调用 receive；onDataReceived 只处理文件。这里只确认教学时序不一致，不判断回调内调用 getInfo 是否非法。

影响：读者难以确定应在触碰时还是传输完成时确定插入位置，窗口内容变化时两种实现可能采用不同快照。

建议：按维护方期望的时序统一步骤与示例，明确触碰坐标和命中位置的采集时点。

### DOC-005 · 中文备注使用半角括号和冒号

- 验证方式：文档审视
- 发现日期：2026-11-17
- 官网修复状态：未修复
- 状态记录日期：2026-11-17
- 维度：规范性
- 状态 / 严重度 / 置信度：`editorial` / `Suggestion` / `certain`
- 位置：[https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581) · 卡片模板:25
- 原文：(备注:当前名片类模板仅对系统联系人应用开放)
- 被检验主张：该中文备注的标点与正文主要中文标点风格不一致。
- 证据：`EVID-011`

该文字在原始响应中存在，括号内容为中文叙述而非 API、版本或公式；可统一中文括号与冒号。API 参考中标签后的空格以及表格换行产生的间隔不合并为此问题。

影响：主要影响中文排版一致性，不影响接口语义或构建。

建议：将该备注统一为中文括号和中文冒号。

## 待确认项

| ID | 优先级 | 主张 | 原因 | 所需证据 |
|---|---|---|---|---|
| PV-001 | medium | 精准分享中组件位置与 screenX/screenY 的原点和单位转换是否一致。 | 官网与 SDK 支持屏幕坐标接口和版本；实践正文把坐标传给 KnockRectUtil，但未展开其实现。不能仅凭签名认定命中计算正确。 | 读取官方完整示例的 KnockRectUtil、窗口偏移/缩放转换，并在移动窗口及不同缩放下实测。 |
| PV-002 | medium | ReceivableTarget.receive 是否接受未经 fileUri 转换的 filesDir 路径。 | API 接口说明为目录 uri，但该页和沙箱指南均有直接 filesDir 示例，另有 getUriFromPath 示例。尚不能排除兼容普通路径，不据此判错或改写为唯一合法形式。 | 同版本参数兼容约束、实现或隔离设备对照普通路径与 file URI。 |
| PV-003 | medium | 无文件时的终止反馈、多文件命中插入顺序以及空列表在完整示例中的可达性。 | 正文有直接 return、固定 hitIndex 插入及首项缩略图读取。空列表条件缺陷已列 DOC-003；默认初始化、业务顺序要求和 return 后系统行为仍未查明，不据这些未知项额外扣分。 | 完整官方示例的初始化与状态控制，明确多文件顺序要求，并验证 clarify/reject/直接 return 的用户反馈。 |
| PV-004 | medium | 双设备真实传输、点击坐标插入及动图呈现是否符合说明。 | 未执行构建、安装和双设备碰触。6 张唯一 GIF 未由快照工具冻结；静态图不能证明动画与运行行为。 | 两台支持设备、明确系统版本及账号条件，执行发送、沙箱接收、命中与未命中、取消和不同文件组合。 |
| PV-005 | medium | 设计页所述链接预览图比例与现网实际裁剪规则。 | DOC-002 只确认文字互斥，未确定正确端点与比例轴方向。 | 维护方澄清及同版本对 4:3、1:1、16:9 和区间外图片的对照验证。 |

## 证据索引

列出问题引用的证据；完整证据记录、版本及抓取时间见 review-report.json 的 evidence。

| ID | 来源 | 定位 |
|---|---|---|
| EVID-001 | [碰一碰文件分享](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) | 原始响应；正文第196行；请注意当前接口仅在2in1设备类型可以正常调用 |
| EVID-002 | [harmonyShare（华为分享）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share) | 原始响应；正文第917行；设备行为差异： 对于6.0.2(22)及之前的版本 |
| EVID-003 | [分享内容直达应用界面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-sandbox) | 原始响应；正文第3行；从6.0.0(20)版本开始 |
| EVID-004 | [碰一碰](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581) | 原始响应；正文第81行；应用传入的预览图尽量保持在 4:3、1:1、16:9 三种比例，以此可保障画面不被裁剪。 |
| EVID-005 | [碰一碰](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581) | 原始响应；正文第67行；超出 4:3 ～ 16:9 的比例图片居中裁剪。 |
| EVID-006 | [碰一碰文件分享](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) | 原始响应；正文第253行；let thumbPath: string = videoDataList[0].thumbnail; |
| EVID-007 | [harmonyShare（华为分享）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share) | 正文第546行；用于接收已保存至沙箱路径下的文件列表 |
| EVID-008 | `Node.js v24.14.1，本地局部表达式复现` | 空列表 + videoDataList[0].thumbnail |
| EVID-009 | [碰一碰文件分享](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) | 原始响应；正文第352行；在onDataReceived()回调中，使用 |
| EVID-010 | [碰一碰文件分享](https://developer.huawei.com/consumer/cn/doc/doccenter-advanced-features/bpta-application-knock-file-share) | 原始响应；正文第234行；let info = receiveTarget.getInfo(); |
| EVID-011 | [碰一碰](https://developer.huawei.com/consumer/cn/doc/design-guides/onehop-0000002354602581) | 原始响应；正文第25行；(备注:当前名片类模板仅对系统联系人应用开放) |
