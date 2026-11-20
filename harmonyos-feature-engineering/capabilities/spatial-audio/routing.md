# 空间音频（spatial-audio）专属路由

## 路线与场景判定

| 路线 | 触发词（intentPatterns） | 覆盖场景 |
| --- | --- | --- |
| route-native-audiosuite｜C/C++ OHAudioSuite 空间渲染（默认路线） | 空间音频渲染、空间渲染、OHAudioSuite、SpaceRender、HOA | SA-S001 管线构建与实时预览；SA-S002 三模式参数配置；SA-S003 HOA 节点约束 |
| route-arkts-spatialization｜ArkTS 空间音频管理与状态订阅 | 空间音频查询、空间音频开关、空间音频订阅、AudioSpatializationManager、spatializationSupported | SA-S004 能力查询与开关状态订阅 |

- 命中任一路线触发词时，只考虑该路线场景（crossRoute 场景除外），不得仅凭共用枚举值跨路线认定。
- 无显式路线词时保留歧义：先比较场景 intentGroups 优先级（intentPriority），再比较普通匹配分，同级同分不裁决，列出候选交由用户选择。泛词「空间音频」单独出现不足以认定路线，需结合语言（C/C++ vs ArkTS）、API 名等上下文进一步判断。
- 默认路线 route-native-audiosuite 仅在完全无路线信号时兜底，不得用它压制更明确的 ArkTS 查询/订阅意图。
- 用户明确选择场景 ID 时按该场景所属路线执行，不跨 Kit 切换路线。

## 版本门槛（以每轮冻结的华为开发者官网快照为准）

- C/C++ 空间渲染：引擎/管线基础接口起始 API 22；EFFECT_NODE_TYPE_SPACE_RENDER 节点与固定摆位/旋转/扩展三模式参数接口起始 API 23；EFFECT_NODE_TYPE_HOA_SPACE_RENDER 节点起始 26.0.0；REALTIME 模式在 API 23 前仅支持均衡器效果节点。需 CMake 链接 libohaudio.so 与 libohaudiosuite.so，头文件 ohaudiosuite/native_audio_suite_base.h、native_audio_suite_engine.h 及 ohaudio 相关头。
- ArkTS 管理查询订阅：getSpatializationManager 与 AudioSpatializationManager 查询/订阅接口均起始 API 18，实例唯一获取入口为 audioManager.getSpatializationManager()。
- 不得仅凭能力名称推断兼容版本，各接口起始版本每轮现提核对。

## 验证约束

- 空间音频渲染效果依赖真机 + 耳机双耳重放，构建通过不代表渲染效果通过；runtime/visual 层未实际观察时不得判为通过。
- isSpatializationEnabledForCurrentDevice 返回的仅是开关状态，开关开启不等于渲染实际生效，实际生效还依赖设备支持空间音频渲染（AudioDeviceDescriptor.spatializationSupported）。
- 官方指南示例代码未含返回值校验，实施必须补齐错误处理后才能进入验证。
- 管线/节点数量限制与销毁前置条件（如 DestroyNode 须管线 STOPPED、引擎销毁级联销毁管线）属于运行约束，构建期无法证实，需按运行检查确认。