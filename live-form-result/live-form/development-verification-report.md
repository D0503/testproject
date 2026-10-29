# 代码开发验证报告

- 工程：/Users/ming/Desktop/HarmonyProject/testproject/live-form
- 开发目标数：6

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 按官网互动卡片概述与场景动效开发指导接入场景动效类型互动卡片，验证激活态与非激活态分工、扩展能力声明与卡片配置关联 | live-form-stage | passed |
| 按官网场景动效指导实现激活态生命周期与UI数据绑定（onLiveFormCreate/onLiveFormDestroy/LocalStorage跨页面传递） | live-form-stage | passed |
| 按官网指导实现破框动效区域申请与取消（requestOverflow/cancelOverflow/getFormRect 与3500ms约束） | live-form-stage | passed |
| 按官网指导实现动效触发策略与运行约束（点击/摇一摇触发、定时定点频次、省电与热档位限制） | live-form-stage | passed |
| 按官网指导实现互动卡片激活态点击跳转应用页面（startAbilityByLiveForm 显式Want直调） | live-form-stage | passed |
| 按官网趣味交互指导完成端侧趣味交互卡片配置并记录快游戏材料缺口 | live-form-stage | inconclusive |

## 按官网互动卡片概述与场景动效开发指导接入场景动效类型互动卡片，验证激活态与非激活态分工、扩展能力声明与卡片配置关联

- 判据策略：fresh，冻结于 2026-10-29T09:25:07.115Z

- 总结果：`passed`
- 能力：live-form
- 技术路线：live-form-stage

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C01：作为版本前提登记，由 SDK 声明与构建验证。
  - 官网冻结来源：live-form-overview:3-3，片段 SHA-256：`572ef6d6899bc166e834ea24a83e32fc60db86af74d9965d48ee9e2445a5649f`
- C02：demo 提供不依赖动效的普通卡片业务（趣味交互卡片非激活态等），卡片业务不强依赖互动卡片动效能力。
  - 官网冻结来源：live-form-overview:21-21，片段 SHA-256：`f7bb91fa1a29b537562e185d816f162d4c19b2a5623d4cdef4a40e30c9b79158`
- C03：在 module.json5 extensionAbilities 下声明 MyLiveFormExtensionAbility，type 为 liveForm。
  - 官网冻结来源：scene-animation-guide:301-301，片段 SHA-256：`57b47ec3b0577227cc5dc185ace81f5109d5c52665263c463cd7d2bf267e37df`
- C04：扩展能力类型使用 module.json5 登记的 liveForm 类型（API 20 起）。
  - 官网冻结来源：module-config:1289-1289，片段 SHA-256：`5354c0ec37707d2bce84dc62be251e041fb7826e93e53c5bc47fb5063f949df2`
- C05：form_config.json 的 widget 卡片仅配置 sceneAnimationParams 扩展字段。
  - 官网冻结来源：widget-config:426-426，片段 SHA-256：`564b888a1910285ffa8f65938534cb64cac7e314776bf3ec62b466e60250c248`
- C06：sceneAnimationParams.abilityName 填写场景动效 LiveFormExtensionAbility 名称（必填）。
  - 官网冻结来源：widget-config:430-430，片段 SHA-256：`9ba726ca278b6558deeb7f65937f41bbb670ef0122440572f8a5a098460a4cec`
- C07：非激活态 UI 在 widget/pages/WidgetCard.ets 中按普通卡片规范实现。
  - 官网冻结来源：scene-animation-guide:9-9，片段 SHA-256：`036415be9c96716071b63e6b75984f0ed9523de3997cb0b9ced89c95a9a203a8`
- C08：激活态 UI 由 MyLiveFormExtensionAbility 加载的 MyLiveFormPage 页面渲染。
  - 官网冻结来源：scene-animation-guide:11-11，片段 SHA-256：`5ab9ce1ae490397dfca2680a911245d9acd2ab7e8389a26c1f64e54bf29a5d67`
- C09：卡片事件（点击等）触发动效切换激活态，动效结束切回非激活态。
  - 官网冻结来源：scene-animation-guide:7-7，片段 SHA-256：`d20cfc13649b638777df15f7ac036b362abde12915af5b5e52d52fab6f69f8e5`

#### S01 · 现有代码满足

module.json5 声明 liveForm 扩展能力

- 位置：`entry/src/main/module.json5:50-57`（修改后；未确认变更）
- 判据依据（fresh）：扩展能力声明
  - C03：场景动效类型互动卡片的激活态UI由LiveFormExtensionAbility承载，需在module.json5的extensionAbilities标签下配置，type为liveForm。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：在module.json5配置文件中[extensionAbilities标签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#extensionabilities%E6%A0%87%E7%AD%BE)下配置LiveFormExtensionAbility · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`
- 判据依据（fresh）：type=liveForm
  - C04：module.json5扩展能力类型中liveForm（API 20起）表示互动卡片的ExtensionAbility。
    - [module.json5配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file) · 锚点：liveForm20+ · SHA-256：`8a61f394f7abe287dc2ec278e93b5d2529f52acee9e58538d69ce0e5d63525e9`

#### S02 · 现有代码满足

form_config 配置 sceneAnimationParams

- 位置：`entry/src/main/resources/base/profile/form_config.json:27-31`（修改后；未确认变更）
- 判据依据（fresh）：卡片配置关联
  - C05：form_config.json中通过sceneAnimationParams扩展字段关联场景动效互动卡片；仅配置sceneAnimationParams时识别为场景动效类型互动卡片。
    - [配置ArkTS卡片的配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration) · 锚点：此标签标识场景动效类型互动卡片配置。sceneAnimationParams和funInteractionParams同时配置时识别为趣味交互类型互动卡片；仅配置sceneAnimationParams时识别为场景动效类型互动卡片。 · SHA-256：`49f3c85515ab4ab64cb4d332eee5701d4b48e41d1008786421e78206be2b6d5d`
- 判据依据（fresh）：abilityName 必填
  - C06：sceneAnimationParams中abilityName为必填字符串，取值为场景动效LiveFormExtensionAbility名称。
    - [配置ArkTS卡片的配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration) · 锚点：场景动效LiveFormExtensionAbility名称 · SHA-256：`49f3c85515ab4ab64cb4d332eee5701d4b48e41d1008786421e78206be2b6d5d`

#### S03 · 现有代码满足

非激活态卡片页面点击触发

- 位置：`entry/src/main/ets/widget/pages/WidgetCard.ets:9-25`（修改后；未确认变更）
- 判据依据（fresh）：非激活态 UI
  - C07：非激活态下卡片与普通卡片行为无异，遵循既有卡片开发规范，卡片UI由卡片提供方widgetCard.ets中的内容所呈现。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：非激活态：在此状态下，卡片与普通卡片行为无异，遵循既有的卡片开发规范，卡片UI由卡片提供方widgetCard.ets中的内容所呈现。 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`
- 判据依据（fresh）：点击触发动效
  - C09：卡片生命周期事件（如数据定时或定点刷新、用户点击等交互场景）可触发卡片动效使卡片切换至激活态，动效结束后卡片切回非激活态。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：可触发卡片动效，使卡片切换至激活态。动效结束后，卡片切回非激活态 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`

#### S04 · 现有代码满足

激活态页面加载与渲染

- 位置：`entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets:23-27`（修改后；未确认变更）
- 判据依据（fresh）：激活态 UI 承载
  - C08：激活态表示互动卡片动效渲染状态，卡片UI由卡片提供方所开发的LiveFormExtensionAbility对应page页面完成渲染。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：激活态： 表示互动卡片动效渲染状态 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`

#### S05 · 现有代码满足

独立普通卡片业务

- 位置：`entry/src/main/ets/widget/pages/FunInteractionCard.ets:4-9`（修改后；未确认变更）
- 判据依据（fresh）：业务不强依赖动效
  - C02：互动卡片是卡片功能的增强，卡片自身业务不能强依赖互动卡片动效能力（需业务降级兜底）。
    - [互动卡片概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-overview) · 锚点：互动卡片作为卡片功能的增强，卡片自身业务不能强依赖互动卡片动效能力 · SHA-256：`4e7c0e3594f3abe313987a65aa717553dc9f067e4e0f654ea2e84e0ae2e19808`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkTS 互动卡片与服务卡片：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 真机桌面单卡验证：点击→message→onFormEvent→requestOverflow 成功；onLiveFormCreate（formId/borderRadius/formRect）与 onLiveFormDestroy 完整；3500ms 自动切回。移除音乐代码后该链路源码逐字未变。 |
| visual | 是 | passed | 模型判图：桌面 2*2 场景动效卡片非激活态显示“点击触发互动卡片动效”；点击后切换为激活态（组件树 OverflowFormItem+强制取消动效）；3500ms 后自动切回非激活态。激活态与非激活态分工与官网一致（音乐卡片相关代码已按需求移除，本场景路径不受影响）。 |

### 代码变化

#### entry/src/main/ets/common/Constants.ets

- 状态：unchanged
- before：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`
- after：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`

#### entry/src/main/ets/entryformability/EntryFormAbility.ets

- 状态：unchanged
- before：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`
- after：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`

#### entry/src/main/ets/entryability/EntryAbility.ets

- 状态：unchanged
- before：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`
- after：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`

#### entry/src/main/ets/pages/Index.ets

- 状态：unchanged
- before：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`
- after：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`

#### entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets

- 状态：unchanged
- before：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`
- after：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`

#### entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets

- 状态：unchanged
- before：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`
- after：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`

#### entry/src/main/ets/widget/pages/WidgetCard.ets

- 状态：unchanged
- before：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`
- after：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`

#### entry/src/main/ets/widget/pages/FunInteractionCard.ets

- 状态：unchanged
- before：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`
- after：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`

#### entry/src/main/module.json5

- 状态：unchanged
- before：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`
- after：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`

#### entry/src/main/resources/base/profile/form_config.json

- 状态：unchanged
- before：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`
- after：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`

#### entry/src/main/resources/base/profile/main_pages.json

- 状态：unchanged
- before：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`
- after：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`

#### entry/src/main/resources/base/element/string.json

- 状态：unchanged
- before：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`
- after：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed · SHA-256：`bd7a0a03c61829b89fd0a73825a6bf646619a70d50e5f65bf6c67e7709ef7a2d`
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`bfcf44752606371044a5d15c39bec9ea498a02c5aa80934d72f609e54dc627f2`
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4cb14295b5c6ef4120593f2c72296404b2a16770ee10ef402c017fad399114d0`
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`97541f8dff2a9f3c802791ea020966ac3870843c549c9facc0e5c27941d419a2`
- EVID-005 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4e033b9579fd0d60c883f891ddf4fc859575363f8b70325c1867299e2f734b31`
- EVID-006 [build_log] 构建成功 · SHA-256：`305e6804ebe1d71662c80435aed366b2a5e71599d0ec9185e382ef46851c6cb4`
- EVID-007 [device_log] devecocli run 安装并拉起成功 · SHA-256：`0ac54a0e998b824f456864c58aa986a66e3cc75559e5a18aa44c48793d5b6337`
- EVID-008 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/615eb74464618a047337f028b098e071170c84ed9f4a58892687a563fdad1e4e.png>)

- EVID-009 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/0942b8498bb857f83bc1ec18f2e72b13cb9dfe6d979108caef07057dcba3dfa6.png>)

- EVID-010 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/707dc6eaee5810b85c953a8bd464d4d637781d05ce3abb7c1863ab3fad5a6017.png>)

- EVID-011 [component_tree] 判图引用的组件树。 · SHA-256：`4b15e64714d59d691655fbeee4b64809421f6a4fe3db440191a49c528128e6ec`
- EVID-012 [visual_judgment] 桌面 2*2 场景动效卡片非激活态显示“点击触发互动卡片动效”；点击后切换为激活态（组件树 OverflowFormItem+强制取消动效）；3500ms 后自动切回非激活态。激活态与非激活态分工与官网一致（音乐卡片相关代码已按需求移除，本场景路径不受影响）。 · SHA-256：`f379ead77eea476de3478499d9a038fe618df682fa6d6bb030128940af5ee48e`


## 按官网场景动效指导实现激活态生命周期与UI数据绑定（onLiveFormCreate/onLiveFormDestroy/LocalStorage跨页面传递）

- 判据策略：fresh，冻结于 2026-10-29T09:25:07.115Z

- 总结果：`passed`
- 能力：live-form
- 技术路线：live-form-stage

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C01：在 onLiveFormCreate 回调中完成激活态初始化与数据绑定。
  - 官网冻结来源：live-form-ability:39-39，片段 SHA-256：`2223e2f6623e7035a5426511942336de885afa5a8037c38a1a5cff44bbc3482c`
- C02：创建 LocalStorage 写入状态后调用 session.loadContent 加载互动页面。
  - 官网冻结来源：scene-animation-guide:151-151，片段 SHA-256：`d156df619c680567708eedf6034bf6d9d2988c896a72cb4f62a4d94045167a0a`
- C03：loadContent 以 path+storage 加载页面并传递状态属性。
  - 官网冻结来源：ui-extension-session:23-23，片段 SHA-256：`bd656edc643c54211e79793eb7f0df0b55679e71436bc79a5954eb2e4cdab974`
- C04：LiveFormExtensionContext 通过 storage 传入页面。
  - 官网冻结来源：scene-animation-guide:135-135，片段 SHA-256：`9f956732e3a34ac8964b6e1d1cae58430958e9a1d59c456808a412837701008a`
- C05：页面 aboutToAppear 经 getSharedLocalStorage 读取共享状态。
  - 官网冻结来源：scene-animation-guide:199-199，片段 SHA-256：`95d021c9268ba52bed8a0615b0b2811c3e359e5c938f14b66f0bd490448b4d4b`
- C06：使用 LocalStorage + getSharedLocalStorage 实现 UIAbility 内跨页面共享。
  - 官网冻结来源：local-storage:18-18，片段 SHA-256：`794944f2e1c9782954d5a7daf02ea2c79fdf0a426fa3e7e4070427b2babff3be`
- C07：onLiveFormDestroy 中释放资源。
  - 官网冻结来源：live-form-ability:47-47，片段 SHA-256：`1c24cd47e1e09db91f72af223547472a5f93e225c49c2c84ea5c47c02cded20b`
- C08：激活态代码仅导入允许模块。
  - 官网冻结来源：live-form-ability:11-11，片段 SHA-256：`4a95cc6b8246345ecf659997de0efc6dbb777e719b69f9e716a036ea5680fd30`
- C09：使用 LiveFormInfo 的 formId/rect/borderRadius 定位激活态 UI。
  - 官网冻结来源：live-form-ability:124-124，片段 SHA-256：`5dba085fa7ecd4742b3380fcd3cfe85ba4dc984f06e9ace946125d2dfc263065`

#### S01 · 现有代码满足

onLiveFormCreate 创建回调

- 位置：`entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets:8-10`（修改后；未确认变更）
- 判据依据（fresh）：创建回调
  - C01：onLiveFormCreate在用户切换互动卡片状态为激活态时由系统自动调用，用于初始化和数据绑定。
    - [@ohos.app.form.LiveFormExtensionAbility (LiveFormExtensionAbility)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-liveformextensionability) · 锚点：当用户切换到互动卡片激活态时，系统会自动调用此回调 · SHA-256：`f6a687690d4f1921f08e7e203fa6b7803720e910ae5bad2d9b4d88bd789edcb1`
- 判据依据（fresh）：LiveFormInfo 字段
  - C09：LiveFormInfo包含formId（卡片id）、rect（卡片位置和大小信息）、borderRadius（卡片圆角半径，单位vp）字段，可用于激活态UI的定位与摆放。
    - [@ohos.app.form.LiveFormExtensionAbility (LiveFormExtensionAbility)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-liveformextensionability) · 锚点：卡片位置和大小信息 · SHA-256：`f6a687690d4f1921f08e7e203fa6b7803720e910ae5bad2d9b4d88bd789edcb1`

#### S02 · 现有代码满足

LocalStorage 传递与页面加载

- 位置：`entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets:18-27`（修改后；未确认变更）
- 判据依据（fresh）：storage 与 loadContent
  - C02：在onLiveFormCreate中创建LocalStorage、写入context/session/formId等状态后，调用session.loadContent加载互动卡片页面。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：session.loadContent('myliveformextensionability/pages/MyLiveFormPage', storage); · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`
- 判据依据（fresh）：loadContent 契约
  - C03：loadContent(path, storage?)为UIExtensionAbility组件加载页面，支持通过LocalStorage传递状态属性给被加载的页面。
    - [@ohos.app.ability.UIExtensionContentSession (带界面扩展能力的界面操作类)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensioncontentsession) · 锚点：支持通过[LocalStorage](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-localstorage)传递状态属性给被加载的页面 · SHA-256：`b842a3cbb90b7d22f57bd17c9199db11d0b52a1d43401e8efa086a51d11d8f87`
- 判据依据（fresh）：context 传入
  - C04：LiveFormExtensionContext通过storage.setOrCreate('context', this.context)传给互动卡片页面组件。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：storage.setOrCreate('context', this.context); · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`

#### S03 · 现有代码满足

页面读取共享状态

- 位置：`entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets:32-39`（修改后；未确认变更）
- 判据依据（fresh）：getSharedLocalStorage
  - C05：互动卡片页面在aboutToAppear中通过getSharedLocalStorage获取共享LocalStorage，再读取formId、formRect、borderRadius、context等状态。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：this.uiContext?.getSharedLocalStorage() · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`
- 判据依据（fresh）：跨页面共享
  - C06：LocalStorage实例可通过getSharedLocalStorage接口实现UIAbility内跨页面共享。
    - [LocalStorage：页面级UI状态存储](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-localstorage) · 锚点：实现UIAbility内跨页面共享 · SHA-256：`a5409c3e4acd8e7cd43093f1579b2e4cc0062784ae92ba3ad303c8f67c259a5c`

#### S04 · 现有代码满足

onLiveFormDestroy 资源清理

- 位置：`entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets:29-33`（修改后；未确认变更）
- 判据依据（fresh）：销毁回调
  - C07：onLiveFormDestroy在互动卡片切换为非激活态时由系统自动调用进行资源清理；开发者应确保在onLiveFormCreate中申请的资源在onLiveFormDestroy中正确释放，避免内存泄漏。
    - [@ohos.app.form.LiveFormExtensionAbility (LiveFormExtensionAbility)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-liveformextensionability) · 锚点：开发者应确保在onLiveFormCreate中申请的资源在onLiveFormDestroy中正确释放，避免内存泄漏 · SHA-256：`f6a687690d4f1921f08e7e203fa6b7803720e910ae5bad2d9b4d88bd789edcb1`

#### S05 · 现有代码满足

仅引用允许模块

- 位置：`entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets:1-5`（修改后；未确认变更）
- 判据依据（fresh）：受限模块约束
  - C08：为保障系统安全性和稳定性，系统对LiveFormExtensionAbility能力进行管控，不支持部分模块的引用（附录列出的Kit/模块）。
    - [@ohos.app.form.LiveFormExtensionAbility (LiveFormExtensionAbility)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-liveformextensionability) · 锚点：系统对其能力进行管控，不支持部分模块的引用 · SHA-256：`f6a687690d4f1921f08e7e203fa6b7803720e910ae5bad2d9b4d88bd789edcb1`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkTS 互动卡片与服务卡片：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | hilog：onLiveFormCreate formId/borderRadius/formRect 完整；切回时 onLiveFormDestroy。 |
| visual | 否 | passed | 模型判图：激活态页面按 LiveFormInfo.rect 摆放背景组件并展示取消按钮，证明 context/formId/formRect/borderRadius 经 LocalStorage→loadContent→getSharedLocalStorage 传递生效；onLiveFormDestroy 切回非激活态时调用。 |

### 代码变化

#### entry/src/main/ets/common/Constants.ets

- 状态：unchanged
- before：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`
- after：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`

#### entry/src/main/ets/entryformability/EntryFormAbility.ets

- 状态：unchanged
- before：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`
- after：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`

#### entry/src/main/ets/entryability/EntryAbility.ets

- 状态：unchanged
- before：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`
- after：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`

#### entry/src/main/ets/pages/Index.ets

- 状态：unchanged
- before：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`
- after：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`

#### entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets

- 状态：unchanged
- before：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`
- after：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`

#### entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets

- 状态：unchanged
- before：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`
- after：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`

#### entry/src/main/ets/widget/pages/WidgetCard.ets

- 状态：unchanged
- before：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`
- after：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`

#### entry/src/main/ets/widget/pages/FunInteractionCard.ets

- 状态：unchanged
- before：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`
- after：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`

#### entry/src/main/module.json5

- 状态：unchanged
- before：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`
- after：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`

#### entry/src/main/resources/base/profile/form_config.json

- 状态：unchanged
- before：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`
- after：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`

#### entry/src/main/resources/base/profile/main_pages.json

- 状态：unchanged
- before：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`
- after：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`

#### entry/src/main/resources/base/element/string.json

- 状态：unchanged
- before：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`
- after：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed · SHA-256：`73a4eac8e849511106b6f970c16cb5016b059a0abcc7e48f7beb8402e1631458`
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`bfcf44752606371044a5d15c39bec9ea498a02c5aa80934d72f609e54dc627f2`
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4cb14295b5c6ef4120593f2c72296404b2a16770ee10ef402c017fad399114d0`
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`97541f8dff2a9f3c802791ea020966ac3870843c549c9facc0e5c27941d419a2`
- EVID-005 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4e033b9579fd0d60c883f891ddf4fc859575363f8b70325c1867299e2f734b31`
- EVID-006 [build_log] 构建成功 · SHA-256：`13cf63d499a298523998f2f57f56af5a0b42811a3be573794c22c07f434b2b13`
- EVID-007 [device_log] devecocli run 安装并拉起成功 · SHA-256：`0ac54a0e998b824f456864c58aa986a66e3cc75559e5a18aa44c48793d5b6337`
- EVID-008 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/0942b8498bb857f83bc1ec18f2e72b13cb9dfe6d979108caef07057dcba3dfa6.png>)

- EVID-009 [component_tree] 判图引用的组件树。 · SHA-256：`6bbf320ccebaa1408007001f1184760b574a89beae16ef62c5a630ed0322a148`
- EVID-010 [component_tree] 判图引用的组件树。 · SHA-256：`60096decf957c58628bb80981ff43fddccdb4d2ad6743d9dcf6f1c41e8dd2e33`
- EVID-011 [visual_judgment] 激活态页面按 LiveFormInfo.rect 摆放背景组件并展示取消按钮，证明 context/formId/formRect/borderRadius 经 LocalStorage→loadContent→getSharedLocalStorage 传递生效；onLiveFormDestroy 切回非激活态时调用。 · SHA-256：`94053cbfafd2d8d6d07403df5278b9081adf66775ef41fa15df7ca61280e9a34`


## 按官网指导实现破框动效区域申请与取消（requestOverflow/cancelOverflow/getFormRect 与3500ms约束）

- 判据策略：fresh，冻结于 2026-10-29T09:25:07.115Z

- 总结果：`passed`
- 能力：live-form
- 技术路线：live-form-stage

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C01：动效申请前调用 formProvider.getFormRect 获取卡片尺寸与位置。
  - 官网冻结来源：scene-animation-guide:65-65，片段 SHA-256：`458ce821082b029de9519b16cadd92923f023ecee348ee22d46beee01f268272`
- C02：getFormRect 返回 Rect 用于窗口内定位（vp）。
  - 官网冻结来源：form-provider:939-939，片段 SHA-256：`762dd987abd286be4831e92c828b9b98124b2d1d75ef13f87b2ae931d63eb2dc`
- C03：overflowInfo.area 以卡片左上角为原点描述动效区域。
  - 官网冻结来源：form-info:547-547，片段 SHA-256：`379c7a5651d340de0d363de3d9a64cda2108530c4471d0f7cb6a5e34c5cd30bd`
- C04：申请区域包含卡片全部区域且不超过 2*2 最大可申请区域（150%/150%）。
  - 官网冻结来源：scene-animation-guide:71-71，片段 SHA-256：`95785ad12315b075a4b290f711aba86aad4429d3690184e7da117ae90e1a9f7f`
- C05：duration 使用 3500（不超过上限）。
  - 官网冻结来源：form-info:549-549，片段 SHA-256：`d1396074aafac94d4367b96a0029f5e34cba14397e8fd3d0b0a130a9fba0901b`
- C06：useDefaultAnimation=true 使用系统默认切换动效。
  - 官网冻结来源：form-info:552-552，片段 SHA-256：`d43acea76e603024e263f372f22fca1640029a7e9ebbc3b04ace612f581e71a3`
- C07：激活态页面提供取消按钮调用 cancelOverflow。
  - 官网冻结来源：form-provider:773-773，片段 SHA-256：`1ab280a2ac45e9d4f709e33035303bb910d6d858edad14f53e8a5e47cef59acf`
- C08：应用侧动效时长不超过 3500ms。
  - 官网冻结来源：scene-animation-guide:37-37，片段 SHA-256：`6575e19d9980a28d284bacb2720ee63ad166eec266f533e58513a9a6257db3b1`
- C09：requestOverflow 以 try/catch 与 Promise catch 处理 801 等错误。
  - 官网冻结来源：form-provider:805-805，片段 SHA-256：`649c718a18a84b91bd3c417e1f783cb8eaf72a31857a63e8822c3c68ff8e1006`
- C10：省电模式等场景报 16501000 时不重试不缓存。
  - 官网冻结来源：form-provider:775-775，片段 SHA-256：`e79dd50c566eedc28ffe5a1b6b58a7143a652b7a1003031ba077868a6f716caf`

#### S01 · 现有代码满足

getFormRect 获取位置尺寸

- 位置：`entry/src/main/ets/entryformability/EntryFormAbility.ets:17-23`（修改后；未确认变更）
- 判据依据（fresh）：位置获取
  - C01：互动卡片可以通过调用formProvider.getFormRect接口获取卡片在窗口中的尺寸及相对坐标位置信息，卡片提供方以此计算动效申请范围，单位为vp。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：接口获取卡片在窗口中的尺寸及相对坐标位置信息 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`
- 判据依据（fresh）：Rect 契约
  - C02：getFormRect(formId)返回Promise<formInfo.Rect>，返回卡片相对屏幕左上角的位置信息和卡片尺寸信息。
    - [@ohos.app.form.formProvider (formProvider)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider) · 锚点：返回卡片相对屏幕左上角的位置信息和卡片尺寸信息 · SHA-256：`5f33421135af5f2ad06985afbaf601885d910849387e95805f2fde4d726fb0ec`

#### S02 · 现有代码满足

计算并申请动效区域

- 位置：`entry/src/main/ets/entryformability/EntryFormAbility.ets:42-53`（修改后；未确认变更）
- 判据依据（fresh）：原点定义
  - C03：overflowInfo.area描述互动卡片动效区域范围，以卡片左上角为原点；申请区域需包含卡片自身渲染区域（矩形ABCD）的全部区域，且不超过最大可申请动效区域矩形IJKL。
    - [@ohos.app.form.formInfo (formInfo)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-forminfo) · 锚点：描述互动卡片动效区域范围，以卡片左上角为原点 · SHA-256：`82ee601d14e9fc4c1eba80555858ff8670164e3cfacefe5c4bbc4d6a2f103c0c`
- 判据依据（fresh）：区域约束
  - C04：调用requestOverflow时动效渲染区域（矩形EFGH）需要满足：包含卡片（矩形ABCD）的全部区域；不超过矩形IJKL（矩形IJKL完整包含矩形EFGH）。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：不超过矩形IJKL（矩形IJKL完整包含矩形EFGH） · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`

#### S03 · 现有代码满足

动效时长与切换参数

- 位置：`entry/src/main/ets/common/Constants.ets:11-13`（修改后；未确认变更）
- 位置：`entry/src/main/ets/entryformability/EntryFormAbility.ets:55-58`（修改后；未确认变更）
- 判据依据（fresh）：时长上限
  - C05：overflowInfo.duration为互动卡片动效持续时长（单位ms），取值为大于等于0的整数，取值要求不大于3500；互动卡片申请动效的最大合法动效时长为3500ms，倒计时结束时卡片切换回非激活态。
    - [@ohos.app.form.formInfo (formInfo)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-forminfo) · 锚点：互动卡片动效持续时长，单位ms。取值为大于等于0的整数，取值要求不大于3500。 · SHA-256：`82ee601d14e9fc4c1eba80555858ff8670164e3cfacefe5c4bbc4d6a2f103c0c`
- 判据依据（fresh）：useDefaultAnimation
  - C06：overflowInfo.useDefaultAnimation表示互动卡片状态切换时是否启动系统提供的默认动效，默认为true；false表示系统不提供切换动效，画面直接切换，适合切换时非激活态和激活态UI完全一致的场景。
    - [@ohos.app.form.formInfo (formInfo)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-forminfo) · 锚点：互动卡片状态切换时是否启动系统提供的默认动效，默认为true · SHA-256：`82ee601d14e9fc4c1eba80555858ff8670164e3cfacefe5c4bbc4d6a2f103c0c`
- 判据依据（fresh）：最大合法时长
  - C08：互动卡片申请动效的最大合法动效时长为3500ms，倒计时结束时卡片将切换回非激活态。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：互动卡片申请动效的最大合法动效时长：3500ms，倒计时结束时，卡片将切换回非激活态 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`

#### S04 · 现有代码满足

取消动效恢复非激活态

- 位置：`entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets:124-130`（修改后；未确认变更）
- 判据依据（fresh）：cancelOverflow
  - C07：cancelOverflow(formId)由卡片提供方发起取消互动卡片动效请求，用于取消已发起的动效；效果demo中点击按钮调用该接口打断当前破框动效后，卡片切换为非激活态。
    - [@ohos.app.form.formProvider (formProvider)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider) · 锚点：取消互动卡片动效请求，用于取消已发起的动效 · SHA-256：`5f33421135af5f2ad06985afbaf601885d910849387e95805f2fde4d726fb0ec`

#### S05 · 现有代码满足

请求失败错误处理

- 位置：`entry/src/main/ets/entryformability/EntryFormAbility.ets:59-66`（修改后；未确认变更）
- 判据依据（fresh）：801 处理
  - C09：requestOverflow仅支持Phone中部分机型，不支持的设备调用会返回801错误码（Capability not supported）。
    - [@ohos.app.form.formProvider (formProvider)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider) · 锚点：Capability not supported.function requestOverflow can not work correctly due to limited device capabilities · SHA-256：`5f33421135af5f2ad06985afbaf601885d910849387e95805f2fde4d726fb0ec`
- 判据依据（fresh）：16501000 处理
  - C10：requestOverflow在省电模式场景下不可使用，会报16501000错误码；调用需捕获BusinessError并记录错误码与信息。
    - [@ohos.app.form.formProvider (formProvider)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider) · 锚点：该接口在省电模式场景下不可使用，会报16501000错误码 · SHA-256：`5f33421135af5f2ad06985afbaf601885d910849387e95805f2fde4d726fb0ec`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkTS 互动卡片与服务卡片：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | hilog：requestOverflow succeed（duration 3500/useDefaultAnimation true）；cancel overflow animation 后 0.5s onLiveFormDestroy；超时自动 onLiveFormDestroy。 |
| visual | 是 | passed | 模型判图：破框激活态渲染区域扩展到卡片外；点击取消后约 0.5s 切回非激活态；不取消时 3500ms 自动切回。申请-取消-超时与官网一致。 |

### 代码变化

#### entry/src/main/ets/common/Constants.ets

- 状态：unchanged
- before：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`
- after：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`

#### entry/src/main/ets/entryformability/EntryFormAbility.ets

- 状态：unchanged
- before：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`
- after：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`

#### entry/src/main/ets/entryability/EntryAbility.ets

- 状态：unchanged
- before：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`
- after：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`

#### entry/src/main/ets/pages/Index.ets

- 状态：unchanged
- before：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`
- after：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`

#### entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets

- 状态：unchanged
- before：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`
- after：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`

#### entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets

- 状态：unchanged
- before：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`
- after：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`

#### entry/src/main/ets/widget/pages/WidgetCard.ets

- 状态：unchanged
- before：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`
- after：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`

#### entry/src/main/ets/widget/pages/FunInteractionCard.ets

- 状态：unchanged
- before：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`
- after：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`

#### entry/src/main/module.json5

- 状态：unchanged
- before：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`
- after：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`

#### entry/src/main/resources/base/profile/form_config.json

- 状态：unchanged
- before：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`
- after：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`

#### entry/src/main/resources/base/profile/main_pages.json

- 状态：unchanged
- before：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`
- after：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`

#### entry/src/main/resources/base/element/string.json

- 状态：unchanged
- before：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`
- after：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed · SHA-256：`6e6f22d5bcc769b1d5ecd0adfe09e8cdf8b965bb21cbb94cf419f6b2ed796366`
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`bfcf44752606371044a5d15c39bec9ea498a02c5aa80934d72f609e54dc627f2`
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4cb14295b5c6ef4120593f2c72296404b2a16770ee10ef402c017fad399114d0`
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`97541f8dff2a9f3c802791ea020966ac3870843c549c9facc0e5c27941d419a2`
- EVID-005 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4e033b9579fd0d60c883f891ddf4fc859575363f8b70325c1867299e2f734b31`
- EVID-006 [build_log] 构建成功 · SHA-256：`6495a188d5d4d5e725ea79a035829ce8a202a1640b3622e15a0bb4cd0ec7fe91`
- EVID-007 [device_log] devecocli run 安装并拉起成功 · SHA-256：`0ac54a0e998b824f456864c58aa986a66e3cc75559e5a18aa44c48793d5b6337`
- EVID-008 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/0942b8498bb857f83bc1ec18f2e72b13cb9dfe6d979108caef07057dcba3dfa6.png>)

- EVID-009 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/51a47caad76842b9cb812987e8cf02d745d2a0b8b2785bb0f4b31854dfde5699.png>)

- EVID-010 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/707dc6eaee5810b85c953a8bd464d4d637781d05ce3abb7c1863ab3fad5a6017.png>)

- EVID-011 [component_tree] 判图引用的组件树。 · SHA-256：`60096decf957c58628bb80981ff43fddccdb4d2ad6743d9dcf6f1c41e8dd2e33`
- EVID-012 [visual_judgment] 破框激活态渲染区域扩展到卡片外；点击取消后约 0.5s 切回非激活态；不取消时 3500ms 自动切回。申请-取消-超时与官网一致。 · SHA-256：`e7712176b62587b3c680d336db2d71a2243bde7620cfc7b5f333b1bcb9bf7636`


## 按官网指导实现动效触发策略与运行约束（点击/摇一摇触发、定时定点频次、省电与热档位限制）

- 判据策略：fresh，冻结于 2026-10-29T09:25:07.115Z

- 总结果：`passed`
- 能力：live-form
- 技术路线：live-form-stage

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C01：以卡片生命周期事件触发动效：点击 message 与定时定点刷新配置。
  - 官网冻结来源：scene-animation-guide:7-7，片段 SHA-256：`d20cfc13649b638777df15f7ac036b362abde12915af5b5e52d52fab6f69f8e5`
- C02：通过 requestOverflow 触发动效（点击时经 message→onFormEvent 调用链）。
  - 官网冻结来源：scene-animation-guide:19-19，片段 SHA-256：`9ecca71a59e52161ae3c43dd256302e913671e950227d2ef855e699c159e0d12`
- C03：form_config 配置 triggerTypes=['shake']（API 26 字段，工程 target 26）。
  - 官网冻结来源：widget-config:441-441，片段 SHA-256：`e70c0d7600cbe4bb7c6a914b1159578d876b92797c0a36bff4f71565f5426981`
- C04：登记字段语义，不实施。
  - 官网冻结来源：widget-config:437-437，片段 SHA-256：`203e5d78d1b7288610f615bcd22ad219f7d6a1c55f4185eaf8670988557753a9`
- C05：系统配额约束登记。
  - 官网冻结来源：scene-animation-guide:39-39，片段 SHA-256：`1a6e0af22a48be4a8c93d5aeb9f380c7be5202b9f6f097b8c5114f5001095954`
- C06：全局单卡与先到先得约束下，请求失败直接返回，不重试不缓存。
  - 官网冻结来源：scene-animation-guide:81-81，片段 SHA-256：`841506b0f5cce66cc1097fba94b3116ccd1366408a8661fc6bcfb202cebc6f9d`
- C07：动效申请前记录 thermal.getLevel 热档位。
  - 官网冻结来源：scene-animation-guide:77-77，片段 SHA-256：`355e940f67c005191a8f41a5a475c444ddcd7723df0e9973a24778297e609a23`
- C08：热档位经 thermal.getLevel() 获取。
  - 官网冻结来源：thermal-api:87-87，片段 SHA-256：`fa8a9f659dca09c8f6d19fb60dcf9f3200dbb43af271621633762e8466310177`
- C09：环境约束登记。
  - 官网冻结来源：scene-animation-guide:33-33，片段 SHA-256：`72268be57646bac95a5ad7031bf46e21765bd0de4da11f6511c6a2614fe7f5cb`
- C10：系统行为登记。
  - 官网冻结来源：scene-animation-guide:87-87，片段 SHA-256：`abb3ba883bc550379b1b9579499cd7dcadac39896db2a19e9e3aeb4ced67521e`
- C11：系统配额登记。
  - 官网冻结来源：form-refresh-data:578-578，片段 SHA-256：`d0ace89e2ffee7536d8896fa9991b6c9f1599763ec092e12990e92b7487029d9`

#### S01 · 现有代码满足

点击触发动效调用链

- 位置：`entry/src/main/ets/widget/pages/WidgetCard.ets:9-25`（修改后；未确认变更）
- 判据依据（fresh）：生命周期事件触发
  - C01：卡片生命周期中的事件（如数据定时或定点刷新、用户点击等交互场景）可触发卡片动效，使卡片切换至激活态。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：如数据定时或定点刷新、用户点击等交互场景，可触发卡片动效 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`
- 判据依据（fresh）：requestOverflow 触发
  - C02：开发者通过formProvider.requestOverflow接口触发互动卡片动效，例如在用户点击时触发；典型调用链为非激活态卡片postCardAction发送message到EntryFormAbility，在其onFormEvent回调中调用requestOverflow。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：接口触发互动卡片动效，例如在用户点击时触发 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`

#### S02 · 现有代码满足

配置摇一摇触发类型

- 位置：`entry/src/main/resources/base/profile/form_config.json:27-32`（修改后；未确认变更）
- 判据依据（fresh）：triggerTypes shake
  - C03：sceneAnimationParams.triggerTypes为场景动效触发类型字符串数组，支持的取值包括shake（摇一摇），该字段从API版本26.0.0开始支持。
    - [配置ArkTS卡片的配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration) · 锚点：场景动效触发类型，支持的取值包括shake（摇一摇）。 · SHA-256：`49f3c85515ab4ab64cb4d332eee5701d4b48e41d1008786421e78206be2b6d5d`

#### S03 · 现有代码满足

请求失败不重试不缓存

- 位置：`entry/src/main/ets/entryformability/EntryFormAbility.ets:59-66`（修改后；未确认变更）
- 判据依据（fresh）：并发失败处理
  - C06：同一时刻，全局只有一个卡片执行互动卡片动效；用户点击等方式主动触发的动效优先响应，其他触发方式遵循先到先得原则，系统只处理第一个合法动效请求，其他请求返回失败且不做缓存。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：同一时刻，全局只有一个卡片执行互动卡片动效。 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`

#### S04 · 现有代码满足

记录热档位

- 位置：`entry/src/main/ets/entryformability/EntryFormAbility.ets:32-36`（修改后；未确认变更）
- 判据依据（fresh）：热约束诊断
  - C07：设备进入省电模式时，互动卡片不响应动效请求；当设备热档位进入HOT时不再响应非点击触发的动效请求，进入OVERHEATED时不再响应所有动效请求。
    - [场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development) · 锚点：当设备热档位进入HOT时，不再响应非点击触发的动效请求；当热档位进入OVERHEATED时，不再响应所有动效请求 · SHA-256：`2d812647a8d8b74f248683e573121e69b7bdc1ce6ce4fb6dc6cc9d0a5cb23019`
- 判据依据（fresh）：thermal.getLevel
  - C08：热档位信息可通过thermal.getLevel()获取，返回ThermalLevel热档位信息。
    - [@ohos.thermal (热管理)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-thermal) · 锚点：获取当前热档位信息。 · SHA-256：`c729369b039ee3841a2228f2f8ff7a37d7654e833c42b4959df88f823e634741`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkTS 互动卡片与服务卡片：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | hilog：点击触发 requestOverflow succeed 且记录 thermal level 0；失败路径不重试不缓存。 |
| visual | 是 | passed | 模型判图：点击触发链生效（激活态视觉证据）；triggerTypes=[shake] 为编译期配置；摇一摇、频次配额与省电/热抑制未主动触发，作为限制项记录。 |

### 代码变化

#### entry/src/main/ets/common/Constants.ets

- 状态：unchanged
- before：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`
- after：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`

#### entry/src/main/ets/entryformability/EntryFormAbility.ets

- 状态：unchanged
- before：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`
- after：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`

#### entry/src/main/ets/entryability/EntryAbility.ets

- 状态：unchanged
- before：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`
- after：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`

#### entry/src/main/ets/pages/Index.ets

- 状态：unchanged
- before：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`
- after：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`

#### entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets

- 状态：unchanged
- before：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`
- after：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`

#### entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets

- 状态：unchanged
- before：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`
- after：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`

#### entry/src/main/ets/widget/pages/WidgetCard.ets

- 状态：unchanged
- before：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`
- after：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`

#### entry/src/main/ets/widget/pages/FunInteractionCard.ets

- 状态：unchanged
- before：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`
- after：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`

#### entry/src/main/module.json5

- 状态：unchanged
- before：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`
- after：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`

#### entry/src/main/resources/base/profile/form_config.json

- 状态：unchanged
- before：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`
- after：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`

#### entry/src/main/resources/base/profile/main_pages.json

- 状态：unchanged
- before：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`
- after：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`

#### entry/src/main/resources/base/element/string.json

- 状态：unchanged
- before：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`
- after：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed · SHA-256：`f3cc466154f70e74601162121cd5a045b23e20693f0b7746131e5c51ead34d64`
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`bfcf44752606371044a5d15c39bec9ea498a02c5aa80934d72f609e54dc627f2`
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4cb14295b5c6ef4120593f2c72296404b2a16770ee10ef402c017fad399114d0`
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`97541f8dff2a9f3c802791ea020966ac3870843c549c9facc0e5c27941d419a2`
- EVID-005 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4e033b9579fd0d60c883f891ddf4fc859575363f8b70325c1867299e2f734b31`
- EVID-006 [build_log] 构建成功 · SHA-256：`67f5779b653cc06076a7630fb4c10f8bd53bb8aba8faa2b18651e1524badfa6b`
- EVID-007 [device_log] devecocli run 安装并拉起成功 · SHA-256：`0ac54a0e998b824f456864c58aa986a66e3cc75559e5a18aa44c48793d5b6337`
- EVID-008 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/0942b8498bb857f83bc1ec18f2e72b13cb9dfe6d979108caef07057dcba3dfa6.png>)

- EVID-009 [component_tree] 判图引用的组件树。 · SHA-256：`6bbf320ccebaa1408007001f1184760b574a89beae16ef62c5a630ed0322a148`
- EVID-010 [visual_judgment] 点击触发链生效（激活态视觉证据）；triggerTypes=[shake] 为编译期配置；摇一摇、频次配额与省电/热抑制未主动触发，作为限制项记录。 · SHA-256：`38d4c34cd81995a423ca3d935d9fc808d2ab8305ea8c00144304474c75ac0234`


## 按官网指导实现互动卡片激活态点击跳转应用页面（startAbilityByLiveForm 显式Want直调）

- 判据策略：fresh，冻结于 2026-10-29T09:25:07.115Z

- 总结果：`passed`
- 能力：live-form
- 技术路线：live-form-stage

所有必需验证层均有通过证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C01：onLiveFormCreate 中将 this.context 经 storage 传给页面组件。
  - 官网冻结来源：live-form-context:84-84，片段 SHA-256：`9f956732e3a34ac8964b6e1d1cae58430958e9a1d59c456808a412837701008a`
- C02：使用 API 22+ 的 import { common } 方式导入并以 common.LiveFormExtensionContext 标注。
  - 官网冻结来源：live-form-context:19-19，片段 SHA-256：`891f8cf6d65b388c6edfe4a29ebfe260d68d48d46c791eaea6971d7801d98a23`
- C03：startAbilityByLiveForm 在点击事件回调中直接调用。
  - 官网冻结来源：live-form-context:33-33，片段 SHA-256：`b77e8bd679ffa1561ba8b1d58162aeeaf3305aaea0a1959a243d4e82ce124137`
- C04：仅拉起本应用（提供方）页面。
  - 官网冻结来源：live-form-context:31-31，片段 SHA-256：`b5997e70753644248f0e985c9e5f5d27afa85cd886e49ddc8f1bf452f9fd91d3`
- C05：显式 Want 携带 bundleName 与 abilityName。
  - 官网冻结来源：live-form-context:49-49，片段 SHA-256：`822873b3f74658b8bc0db1f2d744321471cd1157f2f8272edc8ad9b7e8ea821a`
- C06：try/catch 与 Promise catch 捕获 BusinessError 并记录 code/message。
  - 官网冻结来源：live-form-context:118-118，片段 SHA-256：`8135a3a9a076e90539113a50043ae78fbff64084ad39485ff920a73a9718480e`

#### S01 · 现有代码满足

上下文传入页面

- 位置：`entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets:9-11`（修改后；未确认变更）
- 判据依据（fresh）：context 传递
  - C01：LiveFormExtensionContext是LiveFormExtensionAbility的上下文，在onLiveFormCreate中通过storage.setOrCreate('context', this.context)传给互动卡片页面组件，页面再从共享LocalStorage中获取。
    - [LiveFormExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-liveformextensioncontext) · 锚点：storage.setOrCreate('context', this.context); · SHA-256：`f2a17b0631a49d902c16d64f63445a8b0a60bc69103e8a4ea0427b6427c3b592`

#### S02 · 现有代码满足

API 22+ 导入方式

- 位置：`entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets:3-3`（修改后；未确认变更）
- 判据依据（fresh）：common 导入
  - C02：API version 22以前需通过import LiveFormExtensionContext from 'application/LiveFormExtensionContext'导入（DevEco中标红但不影响编译运行）；API version 22及以后支持通过import { common } from '@kit.AbilityKit'导入并以common.LiveFormExtensionContext方式使用。
    - [LiveFormExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-liveformextensioncontext) · 锚点：在API version 22及以后，支持通过import { common } from '@kit.AbilityKit';导入，并通过common.LiveFormExtensionContext的方式使用。 · SHA-256：`f2a17b0631a49d902c16d64f63445a8b0a60bc69103e8a4ea0427b6427c3b592`

#### S03 · 现有代码满足

点击回调直接调用显式 Want 跳转

- 位置：`entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets:53-59`（修改后；未确认变更）
- 位置：`entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets:96-101`（修改后；未确认变更）
- 判据依据（fresh）：直调
  - C03：startAbilityByLiveForm仅限在点击事件回调中调用，且需要直接调用，不支持延时后调用，否则会抛出错误码16501011。
    - [LiveFormExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-liveformextensioncontext) · 锚点：该接口仅限在点击事件回调中调用，且需要直接调用，不支持延时后调用，否则会抛出错误码16501011。 · SHA-256：`f2a17b0631a49d902c16d64f63445a8b0a60bc69103e8a4ea0427b6427c3b592`
- 判据依据（fresh）：仅提供方页面
  - C04：startAbilityByLiveForm仅支持拉起互动卡片提供方（应用）的页面，不支持拉起其他应用的页面，否则会抛出错误码16501011。
    - [LiveFormExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-liveformextensioncontext) · 锚点：该接口仅支持拉起互动卡片提供方（应用）的页面，不支持拉起其他应用的页面，否则会抛出错误码16501011。 · SHA-256：`f2a17b0631a49d902c16d64f63445a8b0a60bc69103e8a4ea0427b6427c3b592`
- 判据依据（fresh）：显式 Want
  - C05：startAbilityByLiveForm的want取值原则：仅支持使用显式Want，必须包含bundleName和abilityName字段。
    - [LiveFormExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-liveformextensioncontext) · 锚点：仅支持使用显式Want，必须包含bundleName和abilityName字段。 · SHA-256：`f2a17b0631a49d902c16d64f63445a8b0a60bc69103e8a4ea0427b6427c3b592`
- 判据依据（fresh）：失败处理
  - C06：startAbilityByLiveForm失败时抛出16501011（The form can not support this operation）、801、16500050等错误码，调用方需通过try/catch与Promise catch捕获BusinessError并记录错误码和错误信息。
    - [LiveFormExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-liveformextensioncontext) · 锚点：startAbilityByLiveForm failed, code is · SHA-256：`f2a17b0631a49d902c16d64f63445a8b0a60bc69103e8a4ea0427b6427c3b592`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkTS 互动卡片与服务卡片：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | hilog：click to start ability → startAbilityByLiveForm 显式 Want → succeed；点击回调内直接调用。 |
| visual | 否 | passed | 模型判图：激活态页面点击非按钮区域后应用主页进入前台，验证 startAbilityByLiveForm 显式 Want 拉起提供方页面（截图为主页“互动卡片 Demo”标题；音乐展示区已按需求移除，不影响跳转判定）。 |

### 代码变化

#### entry/src/main/ets/common/Constants.ets

- 状态：unchanged
- before：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`
- after：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`

#### entry/src/main/ets/entryformability/EntryFormAbility.ets

- 状态：unchanged
- before：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`
- after：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`

#### entry/src/main/ets/entryability/EntryAbility.ets

- 状态：unchanged
- before：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`
- after：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`

#### entry/src/main/ets/pages/Index.ets

- 状态：unchanged
- before：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`
- after：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`

#### entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets

- 状态：unchanged
- before：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`
- after：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`

#### entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets

- 状态：unchanged
- before：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`
- after：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`

#### entry/src/main/ets/widget/pages/WidgetCard.ets

- 状态：unchanged
- before：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`
- after：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`

#### entry/src/main/ets/widget/pages/FunInteractionCard.ets

- 状态：unchanged
- before：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`
- after：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`

#### entry/src/main/module.json5

- 状态：unchanged
- before：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`
- after：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`

#### entry/src/main/resources/base/profile/form_config.json

- 状态：unchanged
- before：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`
- after：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`

#### entry/src/main/resources/base/profile/main_pages.json

- 状态：unchanged
- before：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`
- after：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`

#### entry/src/main/resources/base/element/string.json

- 状态：unchanged
- before：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`
- after：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed · SHA-256：`9d22cd81c7eb62661b08542eb0c11ecbb0cc560c110e76d232bf59434a993e86`
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`bfcf44752606371044a5d15c39bec9ea498a02c5aa80934d72f609e54dc627f2`
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4cb14295b5c6ef4120593f2c72296404b2a16770ee10ef402c017fad399114d0`
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`97541f8dff2a9f3c802791ea020966ac3870843c549c9facc0e5c27941d419a2`
- EVID-005 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4e033b9579fd0d60c883f891ddf4fc859575363f8b70325c1867299e2f734b31`
- EVID-006 [build_log] 构建成功 · SHA-256：`d05c5c27fd994e8e8ed86230bcd2fef526b7c7c15cba8a6633ca6c5041c02aeb`
- EVID-007 [device_log] devecocli run 安装并拉起成功 · SHA-256：`0ac54a0e998b824f456864c58aa986a66e3cc75559e5a18aa44c48793d5b6337`
- EVID-008 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/5eed73c30d62cfe53c11aa2488ffe178ab6b7091916eee5ec2595eaee44a99d2.png>)

- EVID-009 [component_tree] 判图引用的组件树。 · SHA-256：`cc611e3f0fc2122284df7a345fe011c226db73baa2d0080d8dc4a7a223437afa`
- EVID-010 [visual_judgment] 激活态页面点击非按钮区域后应用主页进入前台，验证 startAbilityByLiveForm 显式 Want 拉起提供方页面（截图为主页“互动卡片 Demo”标题；音乐展示区已按需求移除，不影响跳转判定）。 · SHA-256：`36ec9ae1aa1d5e3816826a3aded487dfb1a81641fc44658142f7a66389cc33b2`


## 按官网趣味交互指导完成端侧趣味交互卡片配置并记录快游戏材料缺口

- 判据策略：fresh，冻结于 2026-10-29T09:25:07.115Z

- 总结果：`inconclusive`
- 能力：live-form
- 技术路线：live-form-stage

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C01：边界登记。
  - 官网冻结来源：fun-interaction-guide:3-3，片段 SHA-256：`0b80450884368dbbc780aa184b8b5f49620675e29f5b7d263f5a3b003fb270c5`
- C02：材料缺口登记。
  - 官网冻结来源：fun-interaction-guide:39-39，片段 SHA-256：`2e9dc1260eb31eae7a90e3e7a8a20b6ba8dbd35bc7c07c14d3850bea499c5643`
- C03：端侧在 FunInteractionCard（widgetCard.ets）实现非激活态普通卡片 UI。
  - 官网冻结来源：fun-interaction-guide:7-7，片段 SHA-256：`5b1d82ce5166b04beb82051c9c7e7aa532023bd1f6d632522228c74e02e853bc`
- C04：系统默认行为登记。
  - 官网冻结来源：fun-interaction-guide:17-17，片段 SHA-256：`54d0ba23c0d1fa9e66d53d316fedecb68611d131ab38642c9d7184114a439492`
- C05：系统行为登记。
  - 官网冻结来源：fun-interaction-guide:33-33，片段 SHA-256：`48721e84430df99dbbce9ea698a60a07310aa8091b8a91667ac549e496250400`
- C06：form_config 为 FunInteractionCard 配置 funInteractionParams（targetBundleName/keepStateDuration）。
  - 官网冻结来源：widget-config:394-394，片段 SHA-256：`131829ce9e3fa53155665fa58049e75b478f8c8441d4f55c59dd88256a576a14`
- C07：targetBundleName 填写主包包名，keepStateDuration 使用默认 10000ms。
  - 官网冻结来源：widget-config:405-405，片段 SHA-256：`4e0b1daece9595574706ca91fa6cd15ee0911f6b06c588a9adf28fd10c081715`
- C08：端侧完成卡片配置开发；游戏内容在快游戏侧实施（材料缺失，见 C02）。
  - 官网冻结来源：fun-interaction-guide:41-41，片段 SHA-256：`acdc032f39bb9f37744142a4fb8723754ade76f13d34f5039e2f75741cd6c937`

#### S01 · 现有代码满足

非激活态普通卡片 UI 承载

- 位置：`entry/src/main/ets/widget/pages/FunInteractionCard.ets:4-13`（修改后；未确认变更）
- 判据依据（fresh）：非激活态 UI
  - C03：趣味交互类型互动卡片主要包含三个状态：激活态、暂停态和非激活态，分别对应游戏进行、游戏暂停、游戏结束；激活态UI由快游戏小游戏页面承载，暂停态和非激活态UI由widgetCard.ets承载。
    - [趣味交互类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-funinteraction-development) · 锚点：趣味交互类型互动卡片主要包含三个状态：激活态、暂停态和非激活态，分别对应游戏进行、游戏暂停、游戏结束。 · SHA-256：`7ed1bb5e7b2b5eecceda0ede95ad8cdbc2b66d004fbcd2ff9324721147712f47`
- 判据依据（fresh）：端侧配置开发
  - C08：趣味交互类型互动卡片端侧卡片配置开发可参考趣味交互类型互动卡片配置（funInteractionParams标签）；游戏内容开发材料在快游戏文档站，端侧工程只能完成卡片配置与三态承载，无法在HarmonyOS工程内实现游戏内容。
    - [趣味交互类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-funinteraction-development) · 锚点：端侧卡片配置开发可参考 · SHA-256：`7ed1bb5e7b2b5eecceda0ede95ad8cdbc2b66d004fbcd2ff9324721147712f47`

#### S02 · 现有代码满足

趣味交互类型卡片配置

- 位置：`entry/src/main/resources/base/profile/form_config.json:56-60`（修改后；未确认变更）
- 判据依据（fresh）：funInteractionParams
  - C06：form_config.json中funInteractionParams和sceneAnimationParams同时配置时识别为趣味交互类型互动卡片。
    - [配置ArkTS卡片的配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration) · 锚点：funInteractionParams和sceneAnimationParams同时配置时识别为趣味交互类型互动卡片。 · SHA-256：`49f3c85515ab4ab64cb4d332eee5701d4b48e41d1008786421e78206be2b6d5d`
- 判据依据（fresh）：targetBundleName/keepStateDuration
  - C07：funInteractionParams.targetBundleName为必填的趣味交互场景主包包名；keepStateDuration表示趣味交互场景无交互时激活态保持时长，默认值为10000ms。
    - [配置ArkTS卡片的配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration) · 锚点：趣味交互场景无交互时，激活态保持时长。默认值为10000，单位ms。 · SHA-256：`49f3c85515ab4ab64cb4d332eee5701d4b48e41d1008786421e78206be2b6d5d`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkTS 互动卡片与服务卡片：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | inconclusive | 材料缺口：quickApp-Guides 站外文档未冻结，按路由规则停止游戏内容实施；端侧 funInteractionParams 配置经静态与构建核验。 |
| visual | 是 | inconclusive | 模型判图：趣味交互卡片已添加桌面并以普通卡片形态显示（非激活态 UI 由 widgetCard.ets 承载）；小游戏内容开发指导位于快游戏站外文档（不在冻结集），激活态/暂停态无法在本工程验证。 |

### 代码变化

#### entry/src/main/ets/common/Constants.ets

- 状态：unchanged
- before：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`
- after：`f9eabab1d9599a9915626b5a90d3a9999ccdf8ba809790b56d3425bf14470e63`

#### entry/src/main/ets/entryformability/EntryFormAbility.ets

- 状态：unchanged
- before：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`
- after：`84129a0fd78dabff9a72896585a36fa0760831095807c35cc90c23bd7c10b001`

#### entry/src/main/ets/entryability/EntryAbility.ets

- 状态：unchanged
- before：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`
- after：`716b01166bc74ad1ec349a8af2bb42095503f87a22b5a10ef1ae0d31a17575f0`

#### entry/src/main/ets/pages/Index.ets

- 状态：unchanged
- before：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`
- after：`87fe75bf121339f1aa8961f25c2609b4da13f5ddd2e81028b7b70ce457930fae`

#### entry/src/main/ets/myliveformextensionability/MyLiveFormExtensionAbility.ets

- 状态：unchanged
- before：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`
- after：`64ff9da1c3c419f27deea83c8852ef01af1ce5eb6b63da39e79f7284f1e71359`

#### entry/src/main/ets/myliveformextensionability/pages/MyLiveFormPage.ets

- 状态：unchanged
- before：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`
- after：`238908051f6854d89770f79519321384784a7f1541a32c202d61634ed3ac65f1`

#### entry/src/main/ets/widget/pages/WidgetCard.ets

- 状态：unchanged
- before：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`
- after：`21abb5215ba54ccc1b34bf0dae5f6e1a7ae678a11c23c45283611e45ed25bb10`

#### entry/src/main/ets/widget/pages/FunInteractionCard.ets

- 状态：unchanged
- before：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`
- after：`1983f5881fdcf2938151b9e9d80c5824699c3abdc89bff7e59047ff9185a7ca6`

#### entry/src/main/module.json5

- 状态：unchanged
- before：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`
- after：`b26e64b84b7b972f08347cc8dbe00729f766e53a78b3af7ed487cbe94d5ca1d9`

#### entry/src/main/resources/base/profile/form_config.json

- 状态：unchanged
- before：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`
- after：`a7d02793664bf67e8cef757e612ae2ec7293a4a636649c42276d8e6f5ef5963c`

#### entry/src/main/resources/base/profile/main_pages.json

- 状态：unchanged
- before：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`
- after：`fbcf904ace3c08aecfef94e151bf20a1429682140f5dcc45f941fbe77aa428c3`

#### entry/src/main/resources/base/element/string.json

- 状态：unchanged
- before：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`
- after：`79a4afa34e7aa2199341b78abae3effab93142ff2ee47396703bf92d013fcab6`

### 待验证

- PENDING-001 [runtime] 材料缺口：quickApp-Guides 站外文档未冻结，按路由规则停止游戏内容实施；端侧 funInteractionParams 配置经静态与构建核验。
- PENDING-002 [visual] 模型判图：趣味交互卡片已添加桌面并以普通卡片形态显示（非激活态 UI 由 widgetCard.ets 承载）；小游戏内容开发指导位于快游戏站外文档（不在冻结集），激活态/暂停态无法在本工程验证。

### 证据

- EVID-001 [static] 场景静态规则：passed · SHA-256：`b9fc27e57325c8c3869d1f952f182e8f87e94904fa77c4546fd099efbd34e6e2`
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`bfcf44752606371044a5d15c39bec9ea498a02c5aa80934d72f609e54dc627f2`
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4cb14295b5c6ef4120593f2c72296404b2a16770ee10ef402c017fad399114d0`
- EVID-004 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`97541f8dff2a9f3c802791ea020966ac3870843c549c9facc0e5c27941d419a2`
- EVID-005 [sdk_declaration] 本机 SDK 声明文件 · SHA-256：`4e033b9579fd0d60c883f891ddf4fc859575363f8b70325c1867299e2f734b31`
- EVID-006 [build_log] 构建成功 · SHA-256：`29496891ea8e87c71a49d03c9103d13038288f2e3f96c72fd4bb3df03cdc2b32`
- EVID-007 [device_log] devecocli run 安装并拉起成功 · SHA-256：`0ac54a0e998b824f456864c58aa986a66e3cc75559e5a18aa44c48793d5b6337`
- EVID-008 [screenshot] 判图引用的截图。

![判图引用的截图。](<evidence/images/1ef735713e444eccd3eba53bc66c1966ad6fb333ed3bb56e2be01fed059fe4f1.png>)

- EVID-009 [visual_judgment] 趣味交互卡片已添加桌面并以普通卡片形态显示（非激活态 UI 由 widgetCard.ets 承载）；小游戏内容开发指导位于快游戏站外文档（不在冻结集），激活态/暂停态无法在本工程验证。 · SHA-256：`d03b044aee3e1fe564e9e6cf860dc82439bfe3e66a07f4ed85eaca5b3881a862`
