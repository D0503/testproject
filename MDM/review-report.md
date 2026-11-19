# HarmonyOS 企业设备管理文档问题复核汇总报告

## Findings

### DOC-001 · Wi-Fi EAP支持范围声明与同页EAP-TTLS/EAP-SIM示例矛盾

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager) · wifiManager.EapMethod / 枚举说明:1240
- 原文：当前仅支持使用EAP_PEAP、EAP_TLS两种认证方式，其他暂不支持。
- 被检验主张：EapMethod当前仅EAP_PEAP/EAP_TLS可用

同一页面在setWifiProfileSync示例中提供EAP-TTLS与EAP-SIM完整配置（使用EAP_TTLS/EAP_SIM枚举值）；声明“其他暂不支持”与示例可用性相互矛盾。SDK同位置注释亦为“only EAP_PEAP and EAP_TLS”，示例超出声明范围。

影响：企业EAP-TTLS/EAP-SIM网络的配置开发者无法判断示例是否可用，配置下发后可能在真机失败。

建议：若TTLS/SIM已支持，更新枚举说明与SDK注解；否则删除两段示例并注明不支持。

### DOC-002 · updateApn参数键名“APN”与addApn/示例的小写“apn”矛盾

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-networkmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-networkmanager) · networkManager.updateApn20+ / 参数:1375
- 原文：APN：接入点名称，可选。
- 被检验主张：updateApn的APN配置Record键名为大写APN

addApn参数说明与两处示例均使用小写apn键；updateApn参数说明声明大写APN而其示例仍用小写apn，Record键名大小写敏感，照抄参数说明将导致更新不生效。SDK同位置注释同样写APN。

影响：按updateApn参数说明使用大写APN键的调用将无法更新APN字段且无明确报错指引。

建议：统一键名为小写apn（与示例一致）并同步修正SDK注释；如系统确接受两种键名则显式说明。


### DOC-003 · 废弃setDisallowedPolicy错误码表缺9200010，与自身正文及姊妹接口不一致

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：完整性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions) · restrictions.setDisallowedPolicy(deprecated) / 错误码:203
- 原文：| 9200013 | |
- 被检验主张：废弃setDisallowedPolicy的错误码集合不含9200010

本节正文（表1 usb“会报策略冲突”、notification“会抛出错误码9200010”）明确声明该接口存在策略冲突错误，但错误码表仅列9200001/9200002/9200013/201；姊妹接口setDisallowedPolicyForAccount(deprecated)错误码表含9200010，新接口错误码表亦含9200010，唯本表缺失（SDK该节@throws同缺，两侧一致地缺失）。

影响：开发者在该接口收到9200010时无法从错误码表归因，策略冲突排障成本升高。

建议：在错误码表中补充9200010及冲突场景说明（与ForAccount节对齐）。

### DOC-004 · getDisallowedBluetoothProtocols(26.0.0)缺失null查询语义说明

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：完整性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-bluetoothmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-bluetoothmanager) · bluetoothManager.getDisallowedBluetoothProtocols(26.0.0重载) / admin参数:1058
- 原文：当设备存在多个MDM应用时
- 被检验主张：26.0.0查询重载统一说明null=查询实际生效策略

本重载公开接受Want或null，参数说明却只解释Want。同文档其他重载（L281、L525-529）及SDK（L510-513）均含“传入Want查询对应策略/传入null查询实际生效策略”标准句，本节缺失，null行为未定义。SDK同一重载明确null查询实际生效策略，这是有具体对象和依据的参数语义遗漏，建议补齐null含义。

影响：多MDM场景查询口径不明，可能误用null引发歧义结果。

建议：补充标准null语义句（与SDK注解对齐）。

### DOC-005 · removeFirewallRule/removeDomainFilterRule示例注释与参数说明矛盾（IPv4 vs 全部）

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-networkmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-networkmanager) · networkManager.removeFirewallRule / 示例:813
- 原文：// 清空IP协议版本为IPv4的所有规则
- 被检验主张：规则参数为空时清除所有防火墙规则

参数说明（L763/L990）为“值为空时，清空所有的防火墙/域名规则”，示例注释却限定IPv4；SDK英文注解为“all firewall rules will be removed”，支持参数说明，示例注释疑过时残留。

影响：开发者可能误以为清空仅作用于IPv4而漏配IPv6规则清理。

建议：删除或修正示例注释中“IP协议版本为IPv4”的限定。

### DOC-006 · ApplicationInfo.appDistributionType说明误指向appProvisionType字段（SDK同错）

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-bundlemanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-bundlemanager) · bundleManager.ApplicationInfo20+ / appDistributionType:1848
- 原文：应用程序签名证书的分发类型，详细信息请参考[ApplicationInfo]……的appProvisionType字段
- 被检验主张：分发类型说明指向appProvisionType字段

分发类型（enterprise_mdm/enterprise_normal等）与appProvisionType（debug/release签名类型）是两个不同概念；本页AppDistributionType枚举正确写appDistributionType属性，前后矛盾；SDK L517-518同误（文档复制SDK注释缺陷）。

影响：开发者按指引查看appProvisionType无法得到分发类型取值，企业分发校验逻辑写错字段。

建议：修正指向appDistributionType并同步SDK注解

### DOC-007 · queryBundleStatsInfos返回值“毫秒级时间戳”措辞错误

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager) · applicationManager.queryBundleStatsInfos / 接口说明:3767
- 原文：其对应时间段内的前台使用时长（毫秒级时间戳）
- 被检验主张：abilityInFgTotalTime为时长而非时间戳

前台累计使用时长是duration，单位毫秒；正文称其毫秒级时间戳，和同页字段表不一致。属于准确性措辞问题，不是返回类型或接口实现错误。

影响：限于上述已证明的文档说明或示例问题；未经构建、真机验证的运行后果不作确定结论。

建议：改为“前台使用时长（单位：毫秒）”。

### DOC-008 · 流量/使用统计示例的日期注释与月份从0起始自相矛盾

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager) · applicationManager.queryTrafficStats / 示例注释:3548
- 原文：// 查询2026/4/15 00:00:00.000 ~ 2026/4/16 00:00:00.000的数据（月份从0开始计算）
- 被检验主张：示例注释与代码语义一致

月份从0起则new Date(2026, 4, 15)是5月15日，注释字面“4/15”与括注矛盾；queryBundleStatsInfos示例（L3820-3822）同病。

影响：统计口径偏差一个月，用量统计对账出错。

建议：注释改为“查询2026/5/15~5/16的数据（月份从0开始，4即5月）”。

### DOC-009 · 附录/common的complexityRegex示例“.{8},$”疑为“.{8,}$”笔误

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-appendix](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-appendix) · 附录 > 策略变更上报示例:301
- 原文："complexityRegex":"^(?=.*[a-zA-Z])(?=.*\\d).{8},$"
- 被检验主张：口令复杂度正则与“至少8个字符”语义一致

原始JSON确实是.{8},$，要求8字符后再出现字面逗号。局部RegExp检查中abc12345失败而abc12345,成功；与至少8位含字母数字的通常表意不符。保留样例笔误，修正为.{8,}$前明确需求；不是设备密码设置实测。

影响：照抄该正则的口令策略将要求口令以逗号结尾，全部用户设置口令失败。

建议：修正为“.{8,}$”并同步common文档与SDK注解。

### DOC-010 · getPermissionManagedState 示例将管理权限误用为被查询权限

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager) · securityManager.getPermissionManagedState / 示例:1641
- 原文：let permissionTemp: string = 'ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION';
- 被检验主张：示例符合“仅支持user_grant权限”约束

接口明确仅支持查询 user_grant 权限的管理状态，但示例将 permissionTemp 设置为 ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION。该权限属于 system_grant，用于赋予调用者管理权限的资格，不属于本接口支持查询的目标权限。示例混淆了调用者所需权限与被查询权限，参数取值不符合接口约束。

影响：开发者照抄示例时会传入不受支持的目标权限，可能导致查询失败或增加排障成本。尚未进行运行验证，不确定具体错误码及失败表现。

建议：示例权限改为CAMERA等user_grant权限。

### DOC-011 · addAutoStartApps(20+)错误码表缺401，与正文及12版接口不一致

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：完整性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager) · applicationManager.addAutoStartApps20+ / 参数与错误码:971
- 原文：该应用未接入状态栏，则抛出401异常
- 被检验主张：isHiddenStart失败抛401的错误码在错误码表中可查

正文明确抛401，本接口错误码表（L985-991）仅9200001/9200002/201；同名12版接口表（L627）含401（SDK 20+重载@throws同缺401，文档忠实复制了SDK的自相矛盾）。

影响：isHiddenStart设置失败时无法从错误码表归因到401。

建议：补充401行（并与SDK同步）。

### DOC-012 · Descriptor14+枚举说明误写为“USB存储设备访问策略的枚举”

- 验证方式：文档审视
- 发现日期：2026-11-09
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-usbmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-usbmanager) · usbManager.Descriptor14+:1533
- 原文：USB存储设备访问策略的枚举。
- 被检验主张：Descriptor枚举说明与其成员（INTERFACE/DEVICE）一致

成员为USB描述符类型，Descriptor成员是INTERFACE等USB描述符类型，说明却称USB存储访问策略枚举，确属定义对象写错，与UsbPolicy（L1016“访问策略枚举”）说明混淆；SDK英文为“Enumerates USB descriptors.”，属翻译复制错误。

影响：开发者误解Descriptor语义，配置错枚举。

建议：改为“USB描述符类型的枚举”。

### DOC-013 · common.isFeatureSupported示例以双参数调用setLocalHotaDomain，与其单参数签名矛盾

- 验证方式：文档审视
- 发现日期：2026-11-12
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common) · common.isFeatureSupported / 示例:272
- 原文：setLocalHotaDomain(wantTemp, domain)
- 被检验主张：isFeatureSupported示例调用与setLocalHotaDomain签名一致

common原始示例确用systemManager.setLocalHotaDomain(wantTemp,domain)，对应接口公开签名只有domain:string一个参数。可确认按所刊签名调用参数个数不符；common示例却以(wantTemp, domain)两个参数调用，照抄编译失败，且误导保留旧式admin传参。

影响：照抄示例编译失败；误以为需传admin Want。

建议：示例改为setLocalHotaDomain(domain)。

### DOC-014 · publishFormToDesktop四个错误码（9201047/9201049/9201050/9201051）在错误码总表无条目

- 验证方式：文档审视
- 发现日期：2026-11-12
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：完整性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager) · publishFormToDesktop / 错误码:4146
- 原文：| 9201047 | | Form count limit reached or insufficient home screen space to add forms. |
- 被检验主张：模块错误码可在企业设备管理错误码总表查到详细介绍

接口错误码表列出了 9201047、9201049、9201050、9201051，并引导读者查阅企业设备管理错误码文档了解详细信息，但对应总表未收录这四个错误码，接口页与总表的收录范围未同步。接口页已有错误消息，且正文解释了其中部分触发条件；本项仅确认错误码索引及详细说明入口不完整。

影响：开发者按接口页引用进入总表后，无法查到这四个错误码的对应说明，排障时仍需返回接口页，或另行查找解决方法。

建议：在总表补充对应条目、可能原因及处理建议；若统一由接口页承载说明，应明确引用范围，避免使读者预期总表包含这些错误码。
       
### DOC-015 · requestExemptionResource/releaseExemptionResource错误码9201002与信息“应用未安装”配对错误

- 验证方式：文档审视
- 发现日期：2026-11-12
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager) · requestExemptionResource / 错误码:4267
- 原文：9201002 | The application is not installed.
- 被检验主张：9201002在本接口表示应用未安装

两个接口均将 9201002 解释为“应用未安装”，但企业设备管理错误码总表将 9201002 定义为“应用安装失败”，将“应用未安装”对应为 9201015。同一错误码的含义在接口页与总表中不一致，无法仅凭现有文档确定这两个接口的实际错误码契约。

影响：开发者依据接口页编写错误处理、再按总表排障时，会得到不同解释，可能误判失败原因。

建议：核对两个接口的实际错误码契约，统一接口表与总表中的编码、错误消息及处理建议。

### DOC-016 · 附录为用户级指纹策略写错了枚举类型

- 验证方式：文档审视
- 发现日期：2026-11-18
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：准确性
- 状态 / 严重度 / 置信度：`editorial` / `Medium` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-appendix](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-appendix) · 可委托策略列表／fingerprint_auth:27
- 原文：[restrictions.setDisallowedPolicyForAccount]
- 被检验主张：被检验主张：附录为 setDisallowedPolicyForAccount、getDisallowedPolicyForAccount 指引的指纹枚举符合这两个用户级接口的参数要求。

附录在上述两个用户级接口的使用说明中写为 FeatureForDevice.FINGERPRINT，但对应接口要求使用 FeatureForAccount 枚举，正确指纹项为 FeatureForAccount.FINGERPRINT。设备级与用户级指纹枚举的值分别为 14 和 3，不能互换。官网接口签名及本机同版本 SDK 声明均支持这一差异，因此可确认附录的枚举指引错误。

影响：开发者照附录传入设备级枚举，会使用错误的参数类型或数值，无法据此可靠设置、查询指定用户的指纹策略；具体编译诊断和设备返回码未实测。

建议：仅将 fingerprint_auth 行中 setDisallowedPolicyForAccount、getDisallowedPolicyForAccount 两处改为 FeatureForAccount.FINGERPRINT，并链接用户级枚举；保留另外两个设备级接口的 FeatureForDevice.FINGERPRINT。

### DOC-017 · 公共模块概述仍称仅导出类型，未反映新增的查询函数

- 验证方式：文档审视
- 发现日期：2026-11-18
- 官网修复状态：未修复
- 状态记录日期：2026-11-18
- 维度：清晰性
- 状态 / 严重度 / 置信度：`editorial` / `Low` / `high`
- 位置：[https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common) · 模块概述:3
- 原文：本模块仅导出类型声明，不包含具体实现逻辑或可执行代码。
- 被检验主张：概述对模块职责的排他表述没有覆盖同页26.0.1新增的 common.isFeatureSupported。

模块概述称其“仅导出类型声明”，但同页已列出从 26.0.1 起支持的 common.isFeatureSupported 查询函数，并提供函数签名、返回值说明和调用示例。因此，“仅导出类型声明”的排他性描述未覆盖当前模块提供的功能，应随新增接口更新。本项仅涉及模块职责描述，不判断其底层实现位置。

影响： 读者可能误认为 common 只能用于类型引用，忽略其提供的管控特性支持查询功能。同页已有完整接口章节，影响限于功能发现与理解。

建议：概述改为提供公共类型、枚举及管控特性支持查询，并明确查询函数从26.0.1起支持。
