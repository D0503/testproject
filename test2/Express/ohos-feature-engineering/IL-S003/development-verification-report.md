# 代码开发验证报告

- 总结果：`passed`
- 能力：immersive-light
- 技术路线：arkui-api26
- 场景：IL-S003（判据策略：reuse，冻结于 2026-09-08T07:21:20.588Z）
- 工程：D:\HW\testproject\test2\Express
- 目标：Tabs 底部页签接入沉浸光感：FloatingTabBarStyle systemMaterial 悬浮样式

所有必需验证层均有通过证据。

## 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：基线缺失，无法确认本次代码变化

### S003-1 · 部分实施

MainEntryVM 新增 tabBarFloatingStyle 计算属性：竖排页签（LG/XL 断点）、API 26 以下或不支持沉浸材质的设备返回 undefined（回退普通样式），否则构造 FloatingTabBarStyle 并以 ImmersiveMaterial(THIN) 设置 systemMaterial。

- 位置：`products/entry/src/main/ets/viewmodels/MainEntryVM.ets:1-5`（修改后；未确认变更）
- 位置：`products/entry/src/main/ets/viewmodels/MainEntryVM.ets:75-95`（修改后；未确认变更）
- 判据依据（fresh）：Tabs 使用 FloatingTabBarStyle.systemMaterial 设置 TabBar 背板的沉浸光感效果。
  - IL-F010：Tabs 使用 FloatingTabBarStyle.systemMaterial，且材质会被栏背景色或背景模糊覆盖。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：三个条件需同时满足 · SHA-256：`f04667da8de437b3ba849d490c5fea9bdb3c98785b8fe8a19603b28817b8992f`
- 工程配套选择：compatibleSdkVersion 保持 6.0.0(20)，运行时以 deviceInfo.sdkApiVersion>=26 且 isImmersiveMaterialSupported() 双重守卫，低版本设备不构造新 API 对象。
- 待确认：products/entry/src/main/ets/viewmodels/MainEntryVM.ets:1-5 无可对应的基线差异，实施情况待确认。
- 待确认：products/entry/src/main/ets/viewmodels/MainEntryVM.ets:75-95 无可对应的基线差异，实施情况待确认。

### S003-2 · 部分实施

MainEntry.ets 新增 ImmersiveTabBarModifier（AttributeModifier<TabsAttribute>），仅在 floatingStyle 有效时才调用 barOverlap(true) 与 barFloatingStyle；Tabs 通过 attributeModifier 挂载，未支持设备上不触发任何 API 26 新增接口调用。

- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:18-37`（修改后；未确认变更）
- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:141-141`（修改后；未确认变更）
- 判据依据（fresh）：悬浮样式仅在 barOverlap=true、vertical=false、barPosition=BarPosition.End 同时满足时生效；设置悬浮材质后不再为 TabBar 设置背景色或背景模糊。
  - IL-F010：Tabs 使用 FloatingTabBarStyle.systemMaterial，且材质会被栏背景色或背景模糊覆盖。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：三个条件需同时满足 · SHA-256：`f04667da8de437b3ba849d490c5fea9bdb3c98785b8fe8a19603b28817b8992f`
- 工程配套选择：用 AttributeModifier 包裹 API 26 新增属性调用，避免 compatibleSdkVersion 20 的老设备在运行时装配不存在的接口。
- 待确认：products/entry/src/main/ets/pages/MainEntry.ets:18-37 无可对应的基线差异，实施情况待确认。
- 待确认：products/entry/src/main/ets/pages/MainEntry.ets:141-141 无可对应的基线差异，实施情况待确认。

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
| runtime | 是 | passed | 应用安装拉起成功，Tabs 首页正常渲染，底部悬浮 TabBar 可见且选中态（首页）高亮正常。 |
| visual | 是 | passed | 模型判图：模拟器截图显示底部页签为悬浮圆角样式并呈现半透明沉浸材质（栏背板透出底层内容），barOverlap=true、vertical=false、barPosition=End 三条件满足，FloatingTabBarStyle.systemMaterial 生效；TabBar 无普通背景色/背景模糊覆盖，布局与选中态正常。 |

## 代码变化

未记录触及文件。
## 待验证

无。

## 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S003\evidence\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S003\evidence\device-run.log
- EVID-006 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S003\evidence\device-visual.png
- EVID-007 [screenshot] 判图引用的截图。 — D:\HW\testproject\test2\Express\ohos-feature-engineering\IL-S001\evidence\main-entry.jpeg
- EVID-008 [visual_judgment] 模拟器截图显示底部页签为悬浮圆角样式并呈现半透明沉浸材质（栏背板透出底层内容），barOverlap=true、vertical=false、barPosition=End 三条件满足，FloatingTabBarStyle.systemMaterial 生效；TabBar 无普通背景色/背景模糊覆盖，布局与选中态正常。
