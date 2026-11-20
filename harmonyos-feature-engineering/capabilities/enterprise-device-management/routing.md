# 企业设备管理（MDM Kit）专属路由

## 特性定位

- 能力载体：`import { adminManager, restrictions, applicationManager, bundleManager, ... } from '@kit.MDMKit'`；Stage 模型；系统能力 SystemCapability.Customization.EnterpriseDeviceManager。
- 所有管控接口仅对已激活的设备管理应用开放；MDM 权限须在申请企业MDM发布证书/Profile 时同步声明，否则运行期不可获取。
- 本能力包为管理类 API 特性，无固定视觉衬底：场景默认不配置 backgroundResource，visual 层仅当任务存在真实视觉呈现（如水印、Kiosk 锁屏）时评估。

## 路线 → 场景速查

| 路线 ID | 名称 | 场景 | 典型关键词 |
|---|---|---|---|
| mdm-onboarding | 资质证书接入（默认路线） | EDM-S001 | MDM资质、发布证书、发布Profile、受限ACL、受邀名单 |
| admin-extension | 管理组件与激活 | EDM-S002、EDM-S003 | EnterpriseAdminExtensionAbility、adminManager、startAdminProvision、enableDeviceAdmin、事件订阅 |
| app-policy | 应用与分发管控 | EDM-S004~S007 | applicationManager、bundleManager、install、Kiosk、浏览器策略 |
| device-policy | 设备限制与设置 | EDM-S008~S011 | restrictions、setDisallowedPolicy、deviceSettings、operateDevice、getDeviceInfo、locationManager、accountManager |
| connectivity-policy | 网络连接管控 | EDM-S012~S016 | networkManager、wifiManager、bluetoothManager、usbManager、telephonyManager、防火墙、APN |
| security-system | 安全与系统管控 | EDM-S017~S018 | securityManager、systemManager、口令策略、水印、证书、OTA、按键策略、日志收集 |
| debug-ops | 调试部署排障 | EDM-S019~S020 | edm enable-admin/disable-admin、9568266、9568289、920xxxx 错误码、MDM测试 |
| multi-mdm-governance | 多应用治理 | EDM-S021 | 多MDM、从严管控、独占、配置、合并、DA/BDA/SDA |

路由规则：用户显式点名某路线或 Kit 关键词时，仅在该路线（及 crossRoute 场景）内匹配；未命中显式路线时按场景 intentPatterns/intentGroups 常规打分，歧义列出候选不取首个。

## 公共前置（进入任一策略场景前核对，具体以本轮冻结正文为准）

1. 已创建并注册 EnterpriseAdminExtensionAbility（module.json5 中 extensionAbilities.type="enterpriseAdmin"）。
2. 设备管理应用已激活：调试用 `hdc shell edm enable-admin -n 包名 -a 扩展类名`（-t byod/da 适用范围以冻结正文为准）；商用走 HEM 部署。
3. 应用安装在首用户（账户ID 100）；同设备仅可激活一个超级设备管理应用。
4. admin 参数 Want 须同时含应用 bundleName 与企业设备管理扩展 abilityName。
5. 多 MDM 共存场景遵循从严管控/独占/配置/合并四条规则，不支持自定义冲突处理。
6. 设备形态差异（Phone/Tablet 与 PC/2in1 互斥、不支持返回 801）与各名单数量上限逐接口核对，不跨场景类推。

## 验证约束

- 基线检查层为 static + build；runtime/install 仅在用户明确要求且选定唯一真机时执行，执行前必须先完成激活（hdc 或 HEM），未激活时所有 MDM 接口报 9200001/9200002 属预期负例而非缺陷。
- 调试 Profile 未勾选受限 ACL 权限时安装失败（9568266/9568289）按调试排障场景处理，不视为构建失败。
- 破坏性操作（恢复出厂、磁盘擦除、锁定设备）禁止在验证中默认执行，仅静态核对调用形态与安全设计（逃生通道、防攻击）。构建与设备效果在本能力包生成阶段尚未实测，不得描述为已通过。
- 规范事实不预存：每轮开发从冻结的官网快照现提判据并锚定；错误码以 errorcode-enterprisedevicemanager 为准，多MDM规则以 mdm-kit-multi-mdm 为准。
