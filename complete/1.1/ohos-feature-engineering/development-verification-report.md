# 代码开发验证报告

- 工程：D:\HW\testproject\complete\1.1
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 对索引条（AlphabetIndexer）开启提示弹窗并设置沉浸光感 | arkui-api26 | inconclusive |

## 对索引条（AlphabetIndexer）开启提示弹窗并设置沉浸光感

- 判据策略：fresh，冻结于 2026-09-14T02:46:30.107Z

- 总结果：`inconclusive`
- 能力：immersive-light
- 技术路线：arkui-api26

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：现有工程
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-F009：确认工程页面结构中无 Navigation/NavDestination 标题栏，不产生改动。
  - 官网冻结来源：component:11-15，片段 SHA-256：`e3a0c36fc96ca967aceadcc7624c47d2455edceac16a9f85b2dcdeb4e7e29106`
- IL-F010：保留现有 Tabs 悬浮页签材质配置，不产生改动。
  - 官网冻结来源：component:29-39，片段 SHA-256：`521fd8a635b3689f5a366c3d192ea7061211d64d34dce1b41d41b9bab5b6f78d`
- IL-F011：为 AlphabetIndexer 显式开启提示弹窗（usingPopup(true)），不设置 popupBackground/popupBackgroundBlurStyle，并通过通用属性 systemMaterial 主动设置沉浸光感，材质样式取 ImmersiveStyle.THICK（与官网索引条提示弹窗默认材质样式一致）。
  - 官网冻结来源：component:45-49，片段 SHA-256：`771cb4eac02069b187f72eb9ad88872cc53321b05c531353c555b82f1f42f3b1`
- IL-F011-mutex：保持提示弹窗不设置 popupBackground 与 popupBackgroundBlurStyle，避免与沉浸光感能力互斥导致无材质效果。
  - 官网冻结来源：component:51-53，片段 SHA-256：`4a31e8a1dcb671a38981344b071fea1fc29cb7139bd38d093b96aea0f01a4c74`
- IL-F011-device：材质样式采用 THICK，接受官网描述的算力分档表现：高/中算力设备显示沉浸光感 THICK 样式，低算力设备不显示沉浸光感而显示白色背景，代码不做设备分支。
  - 官网冻结来源：component:51-53，片段 SHA-256：`4a31e8a1dcb671a38981344b071fea1fc29cb7139bd38d093b96aea0f01a4c74`
- IL-F011-default-state：移除工程中错误放置于 EntryBackupAbility（extensionAbilities.metadata）的 ohos.arkui.UIMaterial.state=disable 配置；移除后工程未配置该字段，应用处于 DEFAULT 模式，AlphabetIndexer 在未设置背景颜色、模糊参数和阴影参数时默认开启沉浸式系统材质。
  - 官网冻结来源：ui-material-api:162-162，片段 SHA-256：`958536c27787f02ab6ccc59d60a00135b9ba49fce1c3f60895367e04c3422435`
- IL-COND-popup-area：AlphabetIndexer 弹窗属弹窗类组件，沉浸光感可在页面内全部区域生效；索引条保持现有页面位置（联系人页 Stack 右侧），不移入标题栏区域即可生效。
  - 官网冻结来源：constraints:13-15，片段 SHA-256：`d14a54c3d3a95783915329db8226a3b2be1a7fc5440b5c7b0c380cde29f7a308`
- IL-COND-nav-scope：确认工程无 Navigation 标题栏，不产生改动。
  - 官网冻结来源：component:19-19，片段 SHA-256：`c3fb1c9b9e82ebb3128890ed13fef48522ee828453a36ce70ea6e1da39c64c2d`
- IL-APP-metadata：删除挂在 extensionAbilities（EntryBackupAbility）metadata 下的 ohos.arkui.UIMaterial.state 配置条目（保留 ohos.extension.backup 条目）；不在 module 级新增该配置，应用保持 default 模式。
  - 官网冻结来源：enable:54-54，片段 SHA-256：`262b44203b74df76b0be17d678d9dee2a256f537ceaa97f0218ae0cdd965437b`
- IL-APP-disable：移除 disable 值的 UIMaterial.state 配置，避免应用级 disable 全局禁用沉浸光感、导致应用级或组件级开启均不生效，阻塞索引条提示弹窗材质目标。
  - 官网冻结来源：enable:75-75，片段 SHA-256：`419812d77f4fd5b9b52a0fea6382ffc5d4ef84dfba30d8121224bef94aee0337`
- IL-APP-priority：在 AlphabetIndexer 上通过组件级通用属性 systemMaterial 显式设置材质（组件级开启优先级高于应用级），确保提示弹窗稳定呈现指定沉浸光感效果。
  - 官网冻结来源：enable:77-77，片段 SHA-256：`a73256981c4512bbacc6941facabe02972ef65399c19b89a3f90c902b6a74dcd`

#### S01 · 已实施

module.json5：移除 EntryBackupAbility extensionAbilities.metadata 中错误放置的 ohos.arkui.UIMaterial.state=disable 条目，保留 ohos.extension.backup 条目，使应用回到 default 模式。

- 位置：`entry/src/main/module.json5:45-48`（修改前；已对应 diff）
- 判据依据（fresh）：该配置仅在 entry 类型的 module 生效，应位于 module 级 metadata；错误挂在 extensionAbility 下的 disable 条目须移除
  - IL-APP-metadata：应用级开关在 module.json5 中将 metadata 参数的 name 字段配置为 ohos.arkui.UIMaterial.state，value 字段为 default 或 enable 时开启、为 disable 时关闭，该配置仅在 entry 类型的 module 中生效。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：该配置仅在entry类型的module中生效 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`
- 判据依据（fresh）：disable 会全局禁用沉浸光感，应用级或组件级开启均不生效，与本次开启目标冲突
  - IL-APP-disable：应用级开关设置为 disable 时，会全局禁用沉浸光感，应用级或组件级开启的设置均不生效。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：会全局禁用沉浸光感 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`
- 判据依据（fresh）：移除后工程未配置该字段处于 DEFAULT 模式，AlphabetIndexer 未设置背景/模糊/阴影时默认开启沉浸式系统材质
  - IL-F011-default-state：MaterialState 为 DEFAULT（默认模式）时，AlphabetIndexer 在组件本身未设置背景颜色、模糊参数和阴影参数时默认开启沉浸式系统材质。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：在组件本身未设置背景颜色、模糊参数和阴影参数时默认开启沉浸式系统材质 · SHA-256：`c71328c4454386c2c14db515c6c6747b159df1e664c5fdf9e4496523f0031011`

#### S02 · 已实施

Index.ets：AlphabetIndexer 显式开启提示弹窗 usingPopup(true)，保持不设置 popupBackground/popupBackgroundBlurStyle，并新增通用属性 systemMaterial(ImmersiveMaterial(THICK)) 主动设置提示弹窗沉浸光感。

- 位置：`entry/src/main/ets/pages/Index.ets:147-155`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:147-156`（修改后；已对应 diff）
- 判据依据（fresh）：提示弹窗默认材质样式为 THICK，也可通过 systemMaterial 属性主动设置沉浸光感效果
  - IL-F011：索引条支持应用级开启、组件级开启方式开启沉浸光感；索引条参数 popupBackground 和 popupBackgroundBlurStyle 均未主动设置（或参数 value 传入 undefined）时，提示弹窗默认开启沉浸光感，默认材质样式为 THICK；也可通过 systemMaterial 属性主动设置沉浸光感效果。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：提示弹窗默认开启沉浸光感 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：popupBackground/popupBackgroundBlurStyle 与沉浸光感互斥，须保持未设置
  - IL-F011-mutex：popupBackground、popupBackgroundBlurStyle 属性和沉浸光感能力互斥，主动设置 popupBackground 或 popupBackgroundBlurStyle 后无沉浸光感效果。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：属性和沉浸光感能力互斥 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：THICK 在高/中算力设备显示沉浸光感样式，低算力设备显示白色背景，为官网描述的分档行为
  - IL-F011-device：索引条沉浸光感存在设备算力分档：高算力、中算力设备默认显示为沉浸光感 THICK 样式，低算力设备不显示沉浸光感效果，显示为白色背景。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：低算力设备不显示沉浸光感效果，显示为白色背景 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：AlphabetIndexer 弹窗属弹窗类组件，沉浸光感在页面内全部区域生效，现有页面位置无需调整
  - IL-COND-popup-area：AlphabetIndexer 弹窗属于弹窗类组件，沉浸光感开启后可在页面内全部区域生效；其他组件仅在 Navigation/NavDestination 标题栏或横向 Tab 中 barPosition 为 BarPosition.End 的底部 TabBar 中生效，在其他区域中设置沉浸光感效果不生效。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：可在页面内全部区域生效 · SHA-256：`684f5939625da0ffce7af96d19900da8f8982a8a50a5a2f9b25b5ef25a1e1d5c`
- 判据依据（fresh）：组件级 systemMaterial 显式设置优先级高于应用级开关，确保效果稳定
  - IL-APP-priority：组件级开启的优先级高于应用级开启，开发者通过组件的沉浸式系统材质接口可以直接覆盖应用级开关开启的组件效果。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：组件级开启的优先级高于应用级开启 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | inconclusive | 应用已拉起，但尚无可区分规范预期的运行观察。 |
| visual | 是 | not_run | 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。 |

### 代码变化

#### entry/src/main/module.json5

- 状态：modified
- before：`ab956fa84579579cb65974603369b3d4e0a50320ea3744b0c3cd1bf90d02dff9`
- after：`95045053098ced28f3f807767014815b5a26b0203f16de619b0c66eca93c42dc`

```diff
--- a/entry/src/main/module.json5
+++ b/entry/src/main/module.json5
@@ -42,10 +42,6 @@
           {
             "name": "ohos.extension.backup",
             "resource": "$profile:backup_config"
-          },
-          {
-            "name": "ohos.arkui.UIMaterial.state",
-            "value": "disable"
           }
         ],
       }
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`738aba8a34b3023d7b6622b96aabddedc68255c69b1a2615247e6ac0effa6585`
- after：`445f1704c641b366fa5caae0878b57677654a447c95eee700866ffb0a3323edf`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -144,15 +144,16 @@
 
           AlphabetIndexer({ arrayValue: this.alphabets, selected: this.selectedIndex })
             .selected(this.selectedIndex)
-            // .color($r('sys.color.font_on_primary'))
-            // .selectedColor($r('sys.color.font_on_primary'))
-            .onSelect((index: number) => {
-              this.selectedIndex = index;
-              this.scroller.scrollToIndex(index, false);
-            })
-            // .systemMaterial(new uiMaterial.ImmersiveMaterial({
-            //   style: uiMaterial.ImmersiveStyle.ULTRA_THIN
-            // }))
+            .usingPopup(true)
+            // .color($r('sys.color.font_on_primary'))
+            // .selectedColor($r('sys.color.font_on_primary'))
+            .onSelect((index: number) => {
+              this.selectedIndex = index;
+              this.scroller.scrollToIndex(index, false);
+            })
+            .systemMaterial(new uiMaterial.ImmersiveMaterial({
+              style: uiMaterial.ImmersiveStyle.THICK
+            }))
             }))
         }
         .width('100%')
```

### 待验证

- PENDING-001 [runtime] 应用已拉起，但尚无可区分规范预期的运行观察。
- PENDING-002 [visual] 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\1.1\ohos-feature-engineering\evidence\ba4d492d-9cdb-430b-9587-0dfdf4ff99da\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\1.1\ohos-feature-engineering\evidence\ba4d492d-9cdb-430b-9587-0dfdf4ff99da\device-run.log
- EVID-006 [device_log] 导航步骤 N1：坐标滑动。 — D:\HW\testproject\complete\1.1\ohos-feature-engineering\evidence\ba4d492d-9cdb-430b-9587-0dfdf4ff99da\nav-N1.log
- EVID-007 [device_log] 导航步骤 N3：坐标滑动。 — D:\HW\testproject\complete\1.1\ohos-feature-engineering\evidence\ba4d492d-9cdb-430b-9587-0dfdf4ff99da\nav-N3.log
- EVID-008 [device_log] 导航编排：passed
- EVID-009 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\1.1\ohos-feature-engineering\evidence\images\1ac383b9d38d8f1eea23c87f6cdf5f7fd8d198ae7465e565596a5f20da898e79.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/1ac383b9d38d8f1eea23c87f6cdf5f7fd8d198ae7465e565596a5f20da898e79.png>)
