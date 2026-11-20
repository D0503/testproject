# 企业设备管理审查报告逐项复核

复核对象：[原报告](/Users/ming/enterprise-device-management/review-report.md)；日期：2026-11-18。

报告确实包含应修正文档问题，但73项不能等量认定为现存缺陷。没有足够证据维持现有High集合，blocked及67分应撤回到重新核定，不能反向据此宣布整体文档或接入通过。

复核覆盖全部73项。结论分布：需澄清、重写 1项；剔除 29项；移出当前缺陷 2项；仅建议 11项；转待核 15项；保留 15项。

本次判断针对“该问题及其严重度是否已被证明”，不把待核事实当作已证实错误。报告使用的11月12日完整快照已不可用，本次以报告引文和11月18日冻结的官网原始响应比对，不能替代历史状态审计。没有进行26.0.1构建或设备实测。

## 可以保留的15项

| 编号 | 问题 | 建议级别 | 复核结论 |
|---|---|---|---|
| DOC-009 | Wi-Fi EAP支持范围声明与同页EAP-TTLS/EAP-SIM示例矛盾 | Medium | 同页明确暂仅支持PEAP/TLS，却给出TTLS/SIM调用配置示例，且未标注不同版本或不支持示例。这是真正的支持范围与教学示例不一致；需维护方确定应改范围还是删/限示例，不能直接断言TTLS/SIM设备上必失败。 |
| DOC-010 | updateApn参数键名“APN”与addApn/示例的小写“apn”矛盾 | Low | updateApn参数表写APN，自己及相邻API示例使用apn，键名口径确实不一致。保留参数说明/示例未统一的问题；未验证是否支持别名，不应断言大写一定导致更新不生效。 |
| DOC-016 | 废弃setDisallowedPolicy错误码表缺9200010，与自身正文及姊妹接口不一致 | Low | 同一接口正文明确写notification冲突抛9200010，但本节错误码表未收录。可确认正文与表未同步；代码已在正文出现，不应夸大为完全无排障依据。 |
| DOC-026 | getDisallowedBluetoothProtocols(26.0.0)缺失null查询语义说明 | Low | 本重载公开接受Want或null，参数说明却只解释Want。SDK同一重载明确null查询实际生效策略，这是有具体对象和依据的参数语义遗漏，建议补齐null含义。 |
| DOC-028 | removeFirewallRule/removeDomainFilterRule示例注释与参数说明矛盾（IPv4 vs 全部） | Low | 两个不传过滤规则参数的示例注释限定IPv4，参数说明则称清空所有规则，且API22起支持IPv6。可确认范围说明未统一；不据此裁定底层实际删除范围。 |
| DOC-030 | ApplicationInfo.appDistributionType说明误指向appProvisionType字段（SDK同错） | Low | appDistributionType字段说明错误地引向appProvisionType；同表后者明确是debug/release，前者为分发类型。可直接确认引用字段错误；部分位置改好不代表这处已修复。 |
| DOC-031 | queryBundleStatsInfos返回值“毫秒级时间戳”措辞错误 | Low | 前台累计使用时长是duration，单位毫秒；正文称其毫秒级时间戳，和同页字段表不一致。属于准确性措辞问题，不是返回类型或接口实现错误。 |
| DOC-032 | 流量/使用统计示例的日期注释与月份从0起始自相矛盾 | Low | 原始代码两处new Date(2026,4,15)实际是2026年5月15日，注释却说4月15日。局部Date表达式检查已确认，可改月份实参为3或把注释改为5月。 |
| DOC-034 | 附录/common的complexityRegex示例“.{8},$”疑为“.{8,}$”笔误 | Low | 原始JSON确实是.{8},$，要求8字符后再出现字面逗号。局部RegExp检查中abc12345失败而abc12345,成功；与至少8位含字母数字的通常表意不符。保留样例笔误，修正为.{8,}$前明确需求；不是设备密码设置实测。 |
| DOC-037 | getPermissionManagedState示例使用系统授权的管理权限，违反user_grant约束 | Medium | 示例查询的是user_grant策略，却传入system_grant管理权限ENTERPRISE_MANAGE_USER_GRANT_PERMISSION。调用者所需权限与被查询权限被混淆；应选真实user_grant权限作为示例。 |
| DOC-039 | addAutoStartApps(20+)错误码表缺401，与正文及12版接口不一致 | Low | 同一20+重载正文明确写特定条件抛401，而自身错误码表没有401。可确认表与正文不同步；比仅对照另一个重载猜漏码更有依据。 |
| DOC-052 | Descriptor14+枚举说明误写为“USB存储设备访问策略的枚举” | Low | Descriptor成员是INTERFACE等USB描述符类型，说明却称USB存储访问策略枚举，确属定义对象写错；应与UsbPolicy区分。 |
| DOC-062 | common.isFeatureSupported示例以双参数调用setLocalHotaDomain，与其单参数签名矛盾 | Medium | common原始示例确用systemManager.setLocalHotaDomain(wantTemp,domain)，对应接口公开签名只有domain:string一个参数。可确认按所刊签名调用参数个数不符；尚未执行26.0.1完整工程构建，不把静态结论写成已实测编译失败。 |
| DOC-063 | publishFormToDesktop四个错误码（9201047/9201049/9201050/9201051）在错误码总表无条目 | Low | 应用接口表列出9201047/9201049/9201050/9201051，而所引用的企业设备管理错误码总表确未收录。可以作为错误码索引不完整的Low问题；目标页面可达，不应称为链接断链，触发原因在API页也并非完全没有。 |
| DOC-064 | requestExemptionResource/releaseExemptionResource错误码9201002与信息“应用未安装”配对错误 | Medium | request/releaseExemptionResource把9201002配成应用未安装；错误码总表把9201002定义为安装失败，把应用未安装配为9201015。可确认码与信息的跨文档映射未统一，需核实实际应改码还是改消息。 |

其中DOC-009、DOC-010、DOC-028、DOC-064只确认文档口径或映射不统一，尚不裁定系统实际行为及哪侧为真。DOC-034的正则与DOC-032的日期仅做局部表达式验证。DOC-062按文档公开签名核对参数个数，没有冒充完整工程构建。

## 应重点纠正的严重结论

- DOC-001：改为配置规则与具体接口例外关系需要澄清；不能直接确认安全策略在设备上异常清除。
- DOC-002：没有“错过申请时点就永久不能获取”的原文承诺；重建Profile恢复路径不与权限需纳入Profile冲突。
- DOC-004：指南已链接逐个API及订阅前置；补一句提示即可，不支持High或“回调永不触发”。
- DOC-061：名称不能单独决定回调契约，未挂载设备插入后上报与拦截挂载流程能够自洽；不能凭命名要求更改API。
- DOC-003、DOC-017：报告已注明修复，应移出当前缺陷、当前扣分和阻断依据。
- DOC-027：官网实际锚点与报告假设相反，五处链接都能在原始HTML找到对应新版重载锚点。此项应剔除。

## 全部73项处理意见

| 编号 | 原问题 | 处理意见 | 原因 |
|---|---|---|---|
| DOC-001 | 口令策略“取消激活即清除”与多应用管控配置规则“保留”直接矛盾 | 需澄清、重写 | 原文确有“配置保留”与“口令策略清除”两种口径，但通用规则与具体接口例外、策略记录与最终配置是否同一对象尚未排除。可保留规则适用关系不清的说明问题；撤掉confirmed/High及已证明合规中断的说法。 |
| DOC-002 | MDM权限申请时机：指南绝对化表述与Profile/FAQ后补恢复路径冲突 | 剔除 | 把“当前证书/Profile未获批权限就不能获取”解释成“永久不能补申请”是报告新增的限制。补申请后重建Profile完全可以满足原要求。FAQ把权限申请关联到证书的表述可以另行核实，不能据此维持流程冲突或High。 |
| DOC-003 | startAdminProvision说明误入credential参数与“仅企业设备生效”约束（复制自enableSelfDeviceAdmin） | 移出当前缺陷 | 报告自己标注已修复；11月18日正文中亦未见所述旧错。可保留历史记录，不应继续计入现存缺陷或阻断门禁。无法复原11月9日首次发现时的全部快照。 |
| DOC-004 | EnterpriseAdminExtensionAbility指南示例回调缺少subscribeManagedEventSync订阅前提 | 仅建议 | 指南展示回调组件写法，并明确逐个链接到API参考；安装/卸载回调的订阅要求能从这些链接取得。可在指南增加一句订阅提醒，但不能说实现指南片段后回调必然永不触发，也不足以判High。 |
| DOC-005 | operateDevice操作集（lockDevice/unlockDevice）与addition语义和SDK声明不一致 | 转待核 | 报告确实找到了官网与本机SDK注释范围的差异，但使用的是OpenHarmony 26.0.0声明，其注释不等于商用HarmonyOS完整运行能力；字符串参数也没有在类型上排除新增值。保留具体差异，等待同系统/版本约束或实测，不把未知真值登记成已确认的官网错误。 |
| DOC-006 | BDA可设特性清单与SDK声明不一致（11项 vs 7项） | 转待核 | 报告确实找到了官网与本机SDK注释范围的差异，但使用的是OpenHarmony 26.0.0声明，其注释不等于商用HarmonyOS完整运行能力；字符串参数也没有在类型上排除新增值。保留具体差异，等待同系统/版本约束或实测，不把未知真值登记成已确认的官网错误。 |
| DOC-007 | systemManager两接口“从严管控”合成方向与规则1定义相反 | 剔除 | 规则1原文用“一般表现为”，并非声明所有布尔API统一按禁用OR合成。接口已明确自身是开启OR；不能把通用示例替换成所有接口的强制真值表。可建议解释“从严”的具体含义，不能确认算法矛盾。 |
| DOC-008 | 附录声称水印接口仅PC/2in1可用，与模块页/SDK无形态约束冲突 | 转待核 | 模块页/SDK未写设备限制，不等于明确支持全部设备。附录的PC限制可能是补充约束，缺801也不能反证无限制；需同版本支持矩阵或设备证据。 |
| DOC-009 | Wi-Fi EAP支持范围声明与同页EAP-TTLS/EAP-SIM示例矛盾 | 保留 | 同页明确暂仅支持PEAP/TLS，却给出TTLS/SIM调用配置示例，且未标注不同版本或不支持示例。这是真正的支持范围与教学示例不一致；需维护方确定应改范围还是删/限示例，不能直接断言TTLS/SIM设备上必失败。 |
| DOC-010 | updateApn参数键名“APN”与addApn/示例的小写“apn”矛盾 | 保留 | updateApn参数表写APN，自己及相邻API示例使用apn，键名口径确实不一致。保留参数说明/示例未统一的问题；未验证是否支持别名，不应断言大写一定导致更新不生效。 |
| DOC-011 | getSecurityStatus的item取值root/fastboot超出SDK声明 | 转待核 | 报告确实找到了官网与本机SDK注释范围的差异，但使用的是OpenHarmony 26.0.0声明，其注释不等于商用HarmonyOS完整运行能力；字符串参数也没有在类型上排除新增值。保留具体差异，等待同系统/版本约束或实测，不把未知真值登记成已确认的官网错误。 |
| DOC-012 | restrictions新接口对网络类特性（蜂窝数据/飞行模式）的权限要求未说明 | 剔除 | 新旧重载允许具有不同权限契约。新接口已明确所需权限；不能因为旧接口某些特性需要NETWORK，就自行要求新接口再申请同一权限。 |
| DOC-013 | mtpServer的BDA管控能力仅在26.0.0废弃的旧接口新增，替代接口不覆盖 | 转待核 | 废弃不等于删除，BDA仍可能使用旧接口。替代重载是否完整覆盖旧能力需核对迁移规则；“迁移必然丢能力”没有实测依据，不能直接作为技术缺陷扣分。 |
| DOC-014 | addUserNonStopApps(PC/2in1自API24)与addFreezeExemptedApps(PC/2in1自26.0.0)扩展点不对称且SDK均无记载 | 剔除 | 两个不同API在不同版本扩展PC支持是正常演进；互相推荐不构成同版本开放承诺，SDK未提形态也不使两个版本声明互相矛盾。 |
| DOC-015 | addKeepAliveApps(20+)准入条件文档含SDK未声明的“或普通用户+状态栏”分支 | 转待核 | 报告确实找到了官网与本机SDK注释范围的差异，但使用的是OpenHarmony 26.0.0声明，其注释不等于商用HarmonyOS完整运行能力；字符串参数也没有在类型上排除新增值。保留具体差异，等待同系统/版本约束或实测，不把未知真值登记成已确认的官网错误。 |
| DOC-016 | 废弃setDisallowedPolicy错误码表缺9200010，与自身正文及姊妹接口不一致 | 保留 | 同一接口正文明确写notification冲突抛9200010，但本节错误码表未收录。可确认正文与表未同步；代码已在正文出现，不应夸大为完全无排障依据。 |
| DOC-017 | USB策略冲突“以下四种情况”实际列举五项 | 移出当前缺陷 | 报告自己标注已修复；11月18日正文中亦未见所述旧错。可保留历史记录，不应继续计入现存缺陷或阻断门禁。无法复原11月9日首次发现时的全部快照。 |
| DOC-018 | getDeviceInfo的disk/memory标签与SDK声明不一致 | 转待核 | 报告确实找到了官网与本机SDK注释范围的差异，但使用的是OpenHarmony 26.0.0声明，其注释不等于商用HarmonyOS完整运行能力；字符串参数也没有在类型上排除新增值。保留具体差异，等待同系统/版本约束或实测，不把未知真值登记成已确认的官网错误。 |
| DOC-019 | 证书文档两个安装方式链接指向同一锚点 | 剔除 | “两个操作共用同一链接/锚点”或“同一操作链接不同帮助页”都不能推出至少一处错误。目标章节可能覆盖多个操作，两个入口也可能都有效；报告没有验证目标内容不匹配。 |
| DOC-020 | 开发指南分发部署仅覆盖HEM渠道，未提上架禁令与另两种官方渠道 | 剔除 | 开发指南可以聚焦HEM部署，并通过资格/证书页承接其他分发限制。文档集合已经给出渠道与禁令，缺少在每篇重复的覆盖义务。 |
| DOC-021 | 指南调试说明未交代调试证书/Profile与发布证书的关系，未链接FAQ | 仅建议 | 可以增强调试章节到FAQ及签名指导的直达链接，但现有资质申请链接已覆盖签名前置，不足以确认流程不可执行或关键缺文。 |
| DOC-022 | FAQ的hdc激活命令不完整且不对称，未覆盖-t参数与适用形态 | 仅建议 | FAQ的enable-admin写法可视作命令名指引，完整参数及-t场景已在指南。建议直接链完整命令；没有覆盖所有激活类型本身不是FAQ缺陷，不能按不完整可运行命令夸大影响。 |
| DOC-023 | printer/developerMode/diskRecoveryKey等特性新旧接口形态约束不一致 | 转待核 | 不同重载及不同版本可以拥有不同设备约束；一处省略限制不能解释为支持所有设备。需要同版本明确的互斥支持声明或运行证据，原报告未证明。 |
| DOC-024 | restrictions新接口set/getDisallowedPolicy24+缺少“起始版本”字段行 | 剔除 | 标题已经明确24+，SDK也是since24。再增加一行起始版本属于模板偏好，不是版本信息缺失。 |
| DOC-025 | setSwitchStatus(26.0.0)与restrictions联动仅指向同期已废弃接口 | 剔除 | deprecated接口仍是公开且可调用的接口；引用它不自动构成错误。可更新链接，但“新重载会不会冲突”不能仅凭链接旧而判为事实缺陷。 |
| DOC-026 | getDisallowedBluetoothProtocols(26.0.0)缺失null查询语义说明 | 保留 | 本重载公开接受Want或null，参数说明却只解释Want。SDK同一重载明确null查询实际生效策略，这是有具体对象和依据的参数语义遗漏，建议补齐null含义。 |
| DOC-027 | 五处“请使用…接口”跳转锚点自指未加-1后缀 | 剔除 | 已查原始HTML：旧Wi-Fi节锚点带19，新节实际id是不带版本/不带-1的wifimanagergetallowedwifilist；其余所列Wi-Fi、蓝牙和USB目标同样存在并落到新版节。报告把转换Markdown重复标题的锚点规则套到官网，这是明确误报。 |
| DOC-028 | removeFirewallRule/removeDomainFilterRule示例注释与参数说明矛盾（IPv4 vs 全部） | 保留 | 两个不传过滤规则参数的示例注释限定IPv4，参数说明则称清空所有规则，且API22起支持IPv6。可确认范围说明未统一；不据此裁定底层实际删除范围。 |
| DOC-029 | installForResult错误码表缺401（与install不对称） | 剔除 | install与installForResult是不同接口且错误码体系不同；没有证据证明后者也返回401。用姊妹接口推导错误码属于猜测。 |
| DOC-030 | ApplicationInfo.appDistributionType说明误指向appProvisionType字段（SDK同错） | 保留 | appDistributionType字段说明错误地引向appProvisionType；同表后者明确是debug/release，前者为分发类型。可直接确认引用字段错误；部分位置改好不代表这处已修复。 |
| DOC-031 | queryBundleStatsInfos返回值“毫秒级时间戳”措辞错误 | 保留 | 前台累计使用时长是duration，单位毫秒；正文称其毫秒级时间戳，和同页字段表不一致。属于准确性措辞问题，不是返回类型或接口实现错误。 |
| DOC-032 | 流量/使用统计示例的日期注释与月份从0起始自相矛盾 | 保留 | 原始代码两处new Date(2026,4,15)实际是2026年5月15日，注释却说4月15日。局部Date表达式检查已确认，可改月份实参为3或把注释改为5月。 |
| DOC-033 | getAutoStartApps示例日志文案为“adding”复制残留 | 仅建议 | 查询成功日志写adding确是文案复制残留，但不影响查询结果；按日志编辑建议处理，不纳入技术阻断。 |
| DOC-034 | 附录/common的complexityRegex示例“.{8},$”疑为“.{8,}$”笔误 | 保留 | 原始JSON确实是.{8},$，要求8字符后再出现字面逗号。局部RegExp检查中abc12345失败而abc12345,成功；与至少8位含字母数字的通常表意不符。保留样例笔误，修正为.{8,}$前明确需求；不是设备密码设置实测。 |
| DOC-035 | setOtaUpdatePolicy错误码表缺9200010（独占规则冲突） | 转待核 | 遵循独占规则可说明会有冲突，但不能由另一个接口推定本接口必返回9200010。可要求完善冲突反馈说明；具体漏码需本接口同版本证据。 |
| DOC-036 | isOtaUpdateNonceEnable与配对set接口形态约束披露不对称 | 转待核 | set/add/remove受设备限制不代表query也必须受同一限制；getter可能跨设备返回默认值或空集。没有明确对立声明，不能用不对称自动判漏写或判错。 |
| DOC-037 | getPermissionManagedState示例使用系统授权的管理权限，违反user_grant约束 | 保留 | 示例查询的是user_grant策略，却传入system_grant管理权限ENTERPRISE_MANAGE_USER_GRANT_PERMISSION。调用者所需权限与被查询权限被混淆；应选真实user_grant权限作为示例。 |
| DOC-038 | addAllowedNotificationBundles冲突说明锚点指向deprecated接口且口径不一 | 剔除 | deprecated接口仍是公开且可调用的接口；引用它不自动构成错误。可更新链接，但“新重载会不会冲突”不能仅凭链接旧而判为事实缺陷。 |
| DOC-039 | addAutoStartApps(20+)错误码表缺401，与正文及12版接口不一致 | 保留 | 同一20+重载正文明确写特定条件抛401，而自身错误码表没有401。可确认表与正文不同步；比仅对照另一个重载猜漏码更有依据。 |
| DOC-040 | addOsAccountAsync错误码表缺9200016（服务超时） | 剔除 | 创建账号耗时较长不等于必须使用与删除/切换相同的超时码。报告缺乏addOsAccountAsync自身会抛9200016的依据。 |
| DOC-041 | operateDevice的resetFactory被禁用后调用行为无错误码 | 转待核 | 文档已给出需要先解除禁用的前置条件。违反此前置时到底返回203、9200010还是其他结果，需要本接口证据；不能借另一API补写错误码。 |
| DOC-042 | 证书配额（每账号1个）位置不显眼且失效后配额是否释放未说明 | 剔除 | 配额已明确写出，位于步骤中不构成信息缺失。吊销后配额释放规则可向官方询问，但尚未证明现有重申请流程不可执行。 |
| DOC-043 | “权限2和3”指代歧义 | 剔除 | “权限2和3”前有可定位的编号列表，读者能确定所指；这里也可理解为管理审批权限，而非API权限。可优化措辞，证据不足以形成独立歧义缺陷。 |
| DOC-044 | 证书-包名绑定表述与“每账号1证书”组合后语义不明 | 转待核 | 不同证书等于不同应用版本的表述确实值得核实，但不能和每账号1个证书推出每账号只能有一个包名。应区分换证、换密钥、续期和MDM分发约束，尚不能确认应改成哪条规则。 |
| DOC-045 | SET_WIFI/MANAGE_WIFI、SET_NETWORK/MANAGE_NETWORK等并存权限职责无区分 | 剔除 | 历史SET与MANAGE权限可以并存；具体接口的需要权限字段就是选用依据。权限说明相近不能证明授权职责冲突或必须合并。 |
| DOC-046 | 早期权限条目缺“支持设备”字段，覆盖不一致 | 剔除 | 字段披露不统一不是设备支持错误的证据；早期权限的应用场景也可能由使用它的API说明限定。没有具体错误使用路径，不宜按缺字段批量扣分。 |
| DOC-047 | 篇首“仅对MDM应用开放”无版本限定，与DLP_FILE的API20历史冲突 | 剔除 | 条目已经明确API20与API21起的变更边界。当前总述与显式历史说明可以并存，不应因没有在篇首再次复制版本史就称矛盾。 |
| DOC-048 | BYOD术语在术语页与指南中定义不一致 | 剔除 | 术语页列举平板或手机等设备，等字说明非穷举；指南再列笔记本不与它矛盾，业务措辞不同也不等于定义不一致。 |
| DOC-049 | “需要为单个应用包体”语义不明 | 仅建议 | 结合多HAP/HSP须打为.app的上下文，单个包体可以理解为一个最终交付包，并不必然指单HAP。可改得更明确，但不应推断其禁止多模块。 |
| DOC-050 | “创建应用”在指南与Profile文档指向两个不同帮助文档 | 剔除 | “两个操作共用同一链接/锚点”或“同一操作链接不同帮助页”都不能推出至少一处错误。目标章节可能覆盖多个操作，两个入口也可能都有效；报告没有验证目标内容不匹配。 |
| DOC-051 | “访问发布类证书/Profile”两个不同账号权限链接同锚点 | 剔除 | “两个操作共用同一链接/锚点”或“同一操作链接不同帮助页”都不能推出至少一处错误。目标章节可能覆盖多个操作，两个入口也可能都有效；报告没有验证目标内容不匹配。 |
| DOC-052 | Descriptor14+枚举说明误写为“USB存储设备访问策略的枚举” | 保留 | Descriptor成员是INTERFACE等USB描述符类型，说明却称USB存储访问策略枚举，确属定义对象写错；应与UsbPolicy区分。 |
| DOC-053 | ManagedPolicy.DISALLOW/FORCE_OPEN说明丢失“外部来源扩展”限定 | 剔除 | common.ManagedPolicy是公共策略枚举，禁用/强制开启的作用对象由消费接口决定；不能把SDK某个用途的狭窄注释强加为公共枚举唯一语义。 |
| DOC-054 | onMarketAppInstallResult示例以模板字符串直接拼接结果对象 | 仅建议 | 直接拼接对象通常只能输出[object Object]，改为JSON.stringify或输出result.result/message更便于排障；但示例目标是演示回调，不等于回调失效或数据错误。 |
| DOC-055 | enableSelfDeviceAdmin等26.0.0接口版本标注方式与同页不一致 | 仅建议 | 起始版本已经在正文写出；标题上角标是否缺失还受网站前端渲染影响，不能仅由抓取Markdown认定。即使原站缺上标，也只按展示一致性建议，不算版本事实错误。 |
| DOC-056 | 多应用管控规则含“一般”“可能”非规范措辞 | 剔除 | 通用规则允许不同接口具有不同合并实现，正文用一般/可能并配NTP与Wi-Fi实例是在表达这种范围。不能仅因含限定词就认定不规范；应在具体接口确有不确定行为时提具体问题。 |
| DOC-057 | guides版开发指南存在[h2]标记残留与代码围栏无语言等格式漂移 | 仅建议 | 原始HTML正文确实含[h2]字面串，不是Markdown凭空生成；可合并成格式清理建议。最终网页显示未完成视觉确认。无语言代码围栏、列表降级等说法不成立：原始HTML保留pre的语言class和ol列表；版本/系统能力重复也不构成技术缺陷。 |
| DOC-058 | 示例中连续重复的“参数需根据实际情况进行替换”注释行 | 仅建议 | 重复注释可清理，但不影响理解、签名或执行；仅作Suggestion，避免按重复次数计多个问题。 |
| DOC-059 | 导出说明（仅enterPriseAdmin可调用）在adminManager页缺少模块级总述 | 剔除 | 各接口已披露Stage约束，未在模块级再复述不构成约束缺失。标题所称enterPriseAdmin限制与正文论证Stage约束还不是同一主题，原问题本身应删除或重写。 |
| DOC-061 | 26.0.1新回调onUnmountExternalStorageDevice名实矛盾：名为卸载、正文描述插入上报 | 剔除 | 不能用英文名称Unmount独立推导回调必须表示拔出/卸载；本功能是在拦截自动挂载后上报插入且未挂载设备。正文与usbManager使用流程一致。“名称或正文必有一错”“必然做错一侧”均未证明，不能据此要求重命名公开API或判High。 |
| DOC-062 | common.isFeatureSupported示例以双参数调用setLocalHotaDomain，与其单参数签名矛盾 | 保留 | common原始示例确用systemManager.setLocalHotaDomain(wantTemp,domain)，对应接口公开签名只有domain:string一个参数。可确认按所刊签名调用参数个数不符；尚未执行26.0.1完整工程构建，不把静态结论写成已实测编译失败。 |
| DOC-063 | publishFormToDesktop四个错误码（9201047/9201049/9201050/9201051）在错误码总表无条目 | 保留 | 应用接口表列出9201047/9201049/9201050/9201051，而所引用的企业设备管理错误码总表确未收录。可以作为错误码索引不完整的Low问题；目标页面可达，不应称为链接断链，触发原因在API页也并非完全没有。 |
| DOC-064 | requestExemptionResource/releaseExemptionResource错误码9201002与信息“应用未安装”配对错误 | 保留 | request/releaseExemptionResource把9201002配成应用未安装；错误码总表把9201002定义为安装失败，把应用未安装配为9201015。可确认码与信息的跨文档映射未统一，需核实实际应改码还是改消息。 |
| DOC-065 | 26.0.1新增接口标题上角标版本标记系统性缺失（9篇约40处） | 仅建议 | 起始版本已经在正文写出；标题上角标是否缺失还受网站前端渲染影响，不能仅由抓取Markdown认定。即使原站缺上标，也只按展示一致性建议，不算版本事实错误。 |
| DOC-066 | isSelfSuperAdmin缺错误码表 | 剔除 | 布尔查询函数可能不抛业务异常，try/catch只是防御写法；相邻接口有错误码也不证明本接口漏表。 |
| DOC-067 | ExactTimerConfig子节出现[h2]属性/[h2]callback占位符且字段重复 | 仅建议 | 原始HTML正文确实含[h2]字面串，不是Markdown凭空生成；可合并成格式清理建议。最终网页显示未完成视觉确认。无语言代码围栏、列表降级等说法不成立：原始HTML保留pre的语言class和ol列表；版本/系统能力重复也不构成技术缺陷。 |
| DOC-068 | getAllowedOpticalDiscDriveBurnUsbDevices形态约束缺失，与同族add/remove不一致 | 转待核 | set/add/remove受设备限制不代表query也必须受同一限制；getter可能跨设备返回默认值或空集。没有明确对立声明，不能用不对称自动判漏写或判错。 |
| DOC-069 | 两个26.0.1新权限（ENTERPRISE_EXTERNAL_READ/ENTERPRISE_ENCRYPT_BLOCK_DEVICE）无消费方接口 | 剔除 | 权限可能授权文件访问、系统服务或特定阶段能力，不一定对应某个MDM专用API。没有消费方API名称不证明权限无效或遗漏接口。 |
| DOC-070 | operateDevice枚举版与字符串版迁移关系未说明，LOCK_DEVICE形态信息丢失 | 转待核 | 两个重载可以并存，未标deprecated就没有必须迁移的前提；新版也不必机械重复旧版历史形态说明。设备支持边界可定向核实，但不能由未写迁移段落判接口有错。 |
| DOC-071 | onUnmountExternalStorageDevice与ManagedEvent订阅模式的配对关系未说明 | 剔除 | 回调说明已经给出触发前置：开启外置存储设备拦截后插入即上报。不同回调有不同注册机制，无ManagedEvent成员并不意味着缺订阅；额外说明无需订阅只是可选增强。 |
| DOC-072 | 801错误信息两种文本并存（新节3-cause变体） | 剔除 | 同一801码采用不同详略的说明文本不等于语义矛盾；两种文本都表示能力不支持，不能要求所有版本/接口错误message逐字恒等。 |
| DOC-073 | 9201052错误信息限定“USB key session time out”与描述的通用会话超期不匹配 | 转待核 | USB key字样比会话超期描述窄，但报告未证明非USB凭据也会返回此码，或该版本已支持哪些凭据载体。可待官方说明扩大消息范围，不直接登记确定错误。 |
| DOC-074 | 26.0.1新内容编辑问题集合（术语/参数说明混入/示例数字入约束） | 剔除 | 光驱与CD/DVD不是互斥概念；参数栏重复解释返回值不改变语义；100条上限后用60+40举例也没有声称所有设备预置60条。三项均不足以形成实质问题，可按普通编辑偏好另行处理。 |

## 关键证据与实际限制

| 复核点 | 本次观察 | 来源 |
|---|---|---|
| DOC-062 | common示例传wantTemp、domain两个参数；systemManager签名只收domain | [common](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common)、[systemManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-systemmanager) |
| DOC-037 | 示例把system_grant管理权限作为user_grant策略的查询对象 | [securityManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager)、[MDM权限](https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps) |
| DOC-009 | 正文限定PEAP/TLS，示例含TTLS/SIM | [wifiManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager) |
| DOC-064 | 9201002在两处资源豁免表为应用未安装，总表为安装失败；未安装另有9201015 | [applicationManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager)、[错误码总表](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager) |
| DOC-027 | 原始HTML明确存在wifimanagergetallowedwifilist19旧节及不带-1的新节，其他四处同样有新版id/name | [wifiManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager)、[bluetoothManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-bluetoothmanager)、[usbManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-usbmanager) |
| DOC-026 | 本重载SDK注释明确null返回实际生效策略，官网参数栏未解释null | [本机26.0.0声明](/Users/ming/Library/OpenHarmony/Sdk/26.0.0/ets/api/@ohos.enterprise.bluetoothManager.d.ts:510) |
| DOC-032 | new Date(2026,4,15)局部执行结果为2026年5月15日；原注释为4月15日 | [applicationManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager) |
| DOC-034 | 原始JSON解码后正则要求8字符后跟逗号；abc12345失败，abc12345,成功 | [common](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common) |

原始报告未被修改。上述官网原始响应的抓取时间与SHA-256，以及逐项处理意见，保存在[复核JSON](report-recheck.json)。SDK注释差异仅作待核，不作为商用系统真实行为的证明。
