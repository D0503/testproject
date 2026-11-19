# MDM 应用调试激活与排障（EDM-S019）

> 依据：《如何开展MDM应用测试》《MDM Kit开发指南》调试章节、《企业设备管理错误码》。

## 前置

1. 先申请企业 MDM 应用发布证书（调试证书申请流程与普通 APP 一致，但发布证书须先于调试证书申请）。
2. 发布 Profile 勾选受限 ACL 权限；调试 Profile 同样勾选。
3. 应用必须安装在首用户（账户 ID 100）；同一设备只能激活一个超级设备管理应用。

## 激活与解除激活命令

```bash
# 激活为超级设备管理应用
hdc shell edm enable-admin -n com.example.edmvalidationdemo -a EnterpriseAdminExtAbility

# 激活为 BYOD 设备管理应用
hdc shell edm enable-admin -n com.example.edmvalidationdemo -a EnterpriseAdminExtAbility -t byod

# 激活为 DA（自 API 23 起，仅 PC/2in1 可用，其他形态报错）
hdc shell edm enable-admin -n com.example.edmvalidationdemo -a EnterpriseAdminExtAbility -t da

# 解除激活
hdc shell edm disable-admin -n com.example.edmvalidationdemo
```

## 安装报错处理

- `code:9568266 install permission denied`：Profile 未包含声明的 MDM 权限——在发布 Profile 中勾选受限 ACL 权限（及对应 MDM 权限）后重新签名安装。
- `code:9568289`：申请 ACL 权限后未重建 Profile——重建 Profile 并勾选新获权限后重新安装。

## 多 MDM 冲突规则

- 限制类策略遵循从严管控：任一 MDM 应用要求“禁用”，则最终策略为禁用。
- 名单类策略遵循合并：多个 MDM 应用设置的名单取并集。
- 设置类策略遵循配置：最新下发的配置生效。
- 位置类等策略遵循独占：仅一个 MDM 应用可设置。
- MANAGED_EVENT_POLICIES_CHANGED（26.0.0 起）仅超级设备管理应用可订阅，其他类型订阅返回 9200002。

## 安全设计规格

- 开启或关闭开发者模式会使通过 hdc 激活的 MDM 权限失效，需重新激活；HEM 商用部署的 MDM 应用不受开发者模式影响。
- 首个 MDM 应用通过接口激活后，其他应用须由首个 MDM 应用发包授予权限才能激活，不能再直接用 hdc 激活。
- HEM/EMM 控制台“设备型号”须填型号代码（如 ALN-AL00），否则设备重置后不自动部署。
- enableWorkspace 需打 Release 包并使用企业 MDM 发布证书才能调用成功。
- MDM 应用更新使用 bundleManager.install 接口。
