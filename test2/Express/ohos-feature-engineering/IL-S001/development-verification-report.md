# 代码开发验证报告

- 总结果：`passed_with_spec_conflict`
- 能力：immersive-light
- 技术路线：arkui-api26
- 场景：IL-S001（判据策略：reuse，冻结于 2026-09-08T07:21:10.224Z）
- 工程：D:\HW\testproject\test2\Express
- 目标：应用级全局开启沉浸光感：entry 模块 metadata ohos.arkui.UIMaterial.state 配置 enable

实现与运行验证成功，但实际行为只匹配冲突规范中的一个预期。

## 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：基线缺失，无法确认本次代码变化

### S001-1 · 部分实施

build-profile.json5 的 targetSdkVersion 由 6.0.2(22) 升级为 26.0.0；compatibleSdkVersion 保持 6.0.0(20) 不变。

- 位置：`build-profile.json5:11-11`（修改后；未确认变更）
- 判据依据（fresh）：官网要求开启沉浸光感时应用 targetSDKVersion 不低于 26.0.0；ArkUI 沉浸光感接口从 API 26 起提供。
  - IL-F001：ArkUI 沉浸光感接口从 API 26 起提供；官网要求开启沉浸光感时应用 targetSDKVersion 不低于 26.0.0。
    - [沉浸光感简介](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-overview) · 锚点：从API版本26.0.0开始 · SHA-256：`17101cc0c8c72295cf7fdc84405ab291c1cb9c2a62889c25d302ac68ce723e15`
- 待确认：build-profile.json5:11-11 无可对应的基线差异，实施情况待确认。

### S001-2 · 部分实施

在 entry 模块 module.json5 的 module.metadata 中增加 ohos.arkui.UIMaterial.state=enable，应用级全局开启沉浸光感。

- 位置：`products/entry/src/main/module.json5:20-23`（修改后；未确认变更）
- 判据依据（fresh）：应用级开关通过 entry 模块 metadata 名 ohos.arkui.UIMaterial.state 配置，value 为 enable 时开启；该配置仅在 entry 类型模块生效。
  - IL-F002：应用级开关通过 entry 模块 metadata 名 ohos.arkui.UIMaterial.state 配置，值为 default、enable 或 disable。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：ohos.arkui.UIMaterial.state · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`
- 待确认：products/entry/src/main/module.json5:20-23 无可对应的基线差异，实施情况待确认。

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

## 兼容性

状态：`supported`。无阻塞原因。

## 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | enable 与 disable 两个构建均安装拉起成功，首页渲染正常；disable 对照变体仅用于实验，最终工程状态已恢复为 enable。 |
| visual | 是 | passed | 模型判图：对照实验：enable 构建截图（main-entry.jpeg）底部 TabBar 呈悬浮圆角半透明沉浸材质，应用级开启生效；同一代码仅改 metadata 为 disable 后（main-entry-disable.jpeg），显式组件级 ImmersiveMaterial(THIN) 的悬浮材质同样消失，TabBar 退化为贴底普通样式。实测应用级 disable 同时关闭了组件级显式开启的材质，行为匹配 IL-F006（全局禁用，应用级或组件级开启均不生效），不匹配 IL-F007。 |

## 代码变化

未记录触及文件。
## 待验证

无。

## 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S001\evidence\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S001\evidence\device-run.log
- EVID-006 [device_log] 截图采集失败。 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S001\evidence\screenshot-failed.log
- EVID-007 [screenshot] 判图引用的截图。 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S001\evidence\main-entry.jpeg
- EVID-008 [screenshot] 判图引用的截图。 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S001\evidence\main-entry-disable.jpeg
- EVID-009 [visual_judgment] 对照实验：enable 构建截图（main-entry.jpeg）底部 TabBar 呈悬浮圆角半透明沉浸材质，应用级开启生效；同一代码仅改 metadata 为 disable 后（main-entry-disable.jpeg），显式组件级 ImmersiveMaterial(THIN) 的悬浮材质同样消失，TabBar 退化为贴底普通样式。实测应用级 disable 同时关闭了组件级显式开启的材质，行为匹配 IL-F006（全局禁用，应用级或组件级开启均不生效），不匹配 IL-F007。

## 规范冲突披露

本次判据集保留冲突判据：IL-F006、IL-F007。本次匹配：IL-F006。
