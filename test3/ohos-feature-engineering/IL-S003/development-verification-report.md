# 代码开发验证报告

- 总结果：`build_passed_runtime_pending`
- 能力：immersive-light
- 技术路线：arkui-api26
- 场景：IL-S003（判据策略：reuse，冻结于 2026-09-08T08:25:41.888Z）
- 工程：D:\HW\testproject\test3
- 目标：搜索框标题栏具有沉浸光感效果

静态、SDK 和构建已通过，仍缺少必需设备运行或视觉证据。

## 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：基线缺失，无法确认本次代码变化

### STEP-1 · 部分实施

Navigation 搜索框标题栏通过 NavigationTitleOptions.systemMaterial 组件级开启沉浸光感，材质样式 ULTRA_THIN（导航类组件薄材质），经 ImmersiveMaterialFactory 能力守卫创建。

- 位置：`entry/src/main/ets/pages/Index.ets:13-16`（修改后；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:103-103`（修改后；未确认变更）
- 判据依据（fresh）：Navigation 标题栏支持通过 NavigationTitleOptions 中的 systemMaterial 字段设置沉浸光感效果（快照 component.md L11-L15）。
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`f04667da8de437b3ba849d490c5fea9bdb3c98785b8fe8a19603b28817b8992f`
- 待确认：entry/src/main/ets/pages/Index.ets:13-16 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:103-103 无可对应的基线差异，实施情况待确认。

### STEP-2 · 部分实施

标题栏使用 barStyle STACK 使内容区延伸至标题栏区域，且不设置 NavigationTitleOptions.backgroundColor/backgroundBlurStyle，避免普通背景覆盖材质。

- 位置：`entry/src/main/ets/pages/Index.ets:12-14`（修改后；未确认变更）
- 判据依据（fresh）：官网建议设置沉浸光感时使用 STACK 样式获得最佳体验（快照 component.md L23）。
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`f04667da8de437b3ba849d490c5fea9bdb3c98785b8fe8a19603b28817b8992f`
- 判据依据（fresh）：普通背景色或背景模糊会覆盖材质效果（快照 component.md L37），标题栏同层不配置普通背景。
  - IL-F010：Tabs 使用 FloatingTabBarStyle.systemMaterial，且材质会被栏背景色或背景模糊覆盖。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：三个条件需同时满足 · SHA-256：`f04667da8de437b3ba849d490c5fea9bdb3c98785b8fe8a19603b28817b8992f`
- 待确认：entry/src/main/ets/pages/Index.ets:12-14 无可对应的基线差异，实施情况待确认。

### STEP-3 · 部分实施

提供非自定义 Menu（菜单项数组）用于展示标题栏沉浸光感生效范围（返回键、非自定义 Menu）。

- 位置：`entry/src/main/ets/pages/Index.ets:18-26`（修改后；未确认变更）
- 位置：`entry/src/main/ets/pages/Index.ets:104-104`（修改后；未确认变更）
- 判据依据（fresh）：沉浸光感针对标题栏生效的范围是返回键、非自定义 Menu（快照 component.md L19）。
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`f04667da8de437b3ba849d490c5fea9bdb3c98785b8fe8a19603b28817b8992f`
- 待确认：entry/src/main/ets/pages/Index.ets:18-26 无可对应的基线差异，实施情况待确认。
- 待确认：entry/src/main/ets/pages/Index.ets:104-104 无可对应的基线差异，实施情况待确认。

### STEP-4 · 部分实施

复制能力包资产 ImmersiveMaterialFactory.ets（derived-implementation），封装 isImmersiveMaterialSupported 能力查询与 ImmersiveMaterial 构造，设备不支持时回退 undefined。

- 位置：`entry/src/main/ets/materials/ImmersiveMaterialFactory.ets:1-35`（修改后；未确认变更）
- 工程配套选择：能力包资产（derived-implementation）封装官网 ImmersiveMaterial 构造与设备能力守卫；本场景判据集不含 IL-F008，能力查询作为工程防护实践引入。
- 待确认：entry/src/main/ets/materials/ImmersiveMaterialFactory.ets:1-35 无可对应的基线差异，实施情况待确认。

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

## 兼容性

状态：`supported`。无阻塞原因。

## 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | not_run | 未请求运行验证。 |
| runtime | 是 | not_run | 未请求运行验证。 |
| visual | 是 | not_run | 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。 |

## 代码变化

未记录触及文件。
## 待验证

- PENDING-001 [install] 未请求运行验证。
- PENDING-002 [runtime] 未请求运行验证。
- PENDING-003 [visual] 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。

## 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\test3\ohos-feature-engineering\IL-S003\evidence\build.log
