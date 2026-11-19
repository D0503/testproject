/**
 * MDM 应用调试激活与排障（EDM-S019 调试指南）
 * 依据：《如何开展MDM应用测试》《MDM Kit开发指南》调试章节、《企业设备管理错误码》。
 * 同内容副本：entry/debug/edm-debug.md
 */

export const EDM_DEBUG_GUIDE = `
前置：
1. 先申请企业 MDM 应用发布证书（调试证书申请流程和普通 APP 一致，但须先取得发布证书与勾选受限 ACL 的发布 Profile）。
2. 发布/调试 Profile 勾选受限 ACL 权限；应用安装在首用户（账户 ID 100）；同一设备只能激活一个超级设备管理应用。

激活与解除激活命令：
  hdc shell edm enable-admin -n com.huaagcwei.mdm.hm -a EnterpriseAdminExtAbility
  hdc shell edm enable-admin -n com.huaagcwei.mdm.hm -a EnterpriseAdminExtAbility -t byod
  hdc shell edm enable-admin -n com.huaagcwei.mdm.hm -a EnterpriseAdminExtAbility -t da
  hdc shell edm disable-admin -n com.huaagcwei.mdm.hm
说明：-t da 自 API 23 起仅 PC/2in1 可用，其他形态报错；-t byod 用于 BYOD 激活。

安装报错处理：
- code:9568266 install permission denied：Profile 未包含声明的 MDM 权限，在发布 Profile 勾选受限 ACL 权限（及对应 MDM 权限）后重新签名安装。
- code:9568289：申请 ACL 权限后未重建 Profile，重建 Profile 并勾选新获权限后重新安装。

多 MDM 冲突规则：
- 限制类策略从严管控（任一要求禁用则最终禁用）；名单类策略合并；设置类策略配置（最新生效）；位置类等策略独占。
- MANAGED_EVENT_POLICIES_CHANGED（26.0.0 起）仅超级设备管理应用可订阅，其他类型订阅返回 9200002。

安全设计规格：
- 开启或关闭开发者模式会使 hdc 激活的 MDM 权限失效，需重新激活；HEM 商用部署不受影响。
- 首个 MDM 应用通过接口激活后，其他应用须由首个 MDM 应用发包授予权限才能激活。
- EMM 控制台“设备型号”须填型号代码（如 ALN-AL00）；商用部署需勾选 MDM 应用部署。
- enableWorkspace 需 Release 包并使用企业 MDM 发布证书。
- MDM 应用更新使用 bundleManager.install（设备须通过 HEM 商用部署，仅可安装 enterprise_mdm/enterprise_normal 分发类型应用）。
`;
