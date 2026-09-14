# 代码开发验证报告

- 工程：D:\HW\testproject\test4
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 实现搜索框标题栏具有沉浸光感效果 | arkui-api26 | passed_with_spec_conflict |

## 实现搜索框标题栏具有沉浸光感效果

- 判据策略：fresh，冻结于 2026-09-09T03:08:47.457Z

- 总结果：`passed_with_spec_conflict`
- 能力：immersive-light
- 技术路线：arkui-api26

实现与运行验证成功，但实际行为只匹配冲突规范中的一个预期。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

#### impl-material-entry · 已实施

页面导入 @kit.ArkUI 的 uiMaterial，Search 组件通过通用属性 systemMaterial 设置沉浸式系统材质，Navigation 首页标题通过 NavigationTitleOptions 的 barStyle STACK 与 systemMaterial 为标题栏区域开启沉浸光感。

- 位置：`entry/src/main/ets/pages/Index.ets:1-1`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:38-43`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:133-138`（修改后；已对应 diff）
- 判据依据（fresh）：标题栏以及标题栏子组件开启沉浸光感，Search 通过 systemMaterial 接入。
  - IL-S013-C01：搜索框标题栏场景针对跳转的目标页面，通过 NavigationTitleOptions 为对应的页签页面标题栏区域开启沉浸光感；标题栏以及标题栏子组件开启沉浸光感，Search 组件通过通用属性 systemMaterial 设置沉浸式系统材质。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：标题栏以及标题栏子组件开启沉浸光感 · SHA-256：`dd5ad8cbe6e912fbec6a4b66f386ae16ed1161575eb6b1ab0ecb9bfbba452b39`
- 判据依据（fresh）：uiMaterial 由 @kit.ArkUI 导入，非弹窗组件仅在标题栏生效范围内设置。
  - IL-S013-C03：沉浸式材质通过 import { uiMaterial } from '@kit.ArkUI' 导入并由 ImmersiveMaterial 构造；除弹窗类与按钮选择类组件外，其他组件仅在 Navigation/NavDestination 标题栏或 barPosition 为 BarPosition.End 的底部 TabBar 中生效，在其他区域中设置不生效。
    - [@ohos.arkui.uiMaterial (系统材质)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uimaterial) · 锚点：其他组件仅在Navigation/NavDestination标题栏或横向Tab中barPosition为BarPosition.End的底部TabBar中生效，在其他区域中设置不生效 · SHA-256：`0cf9fdb28f14cd44c90984068f4910c3401f03e9f19f0d29376119ef39efe7e9`

#### impl-sdk-version · 已实施

工程 targetSdkVersion 与 compatibleSdkVersion 升级为 26.0.0，满足沉浸光感 API 26 起始版本要求。

- 位置：`build-profile.json5:8-9`（修改后；已对应 diff）
- 判据依据（fresh）：开启沉浸光感要确保 targetSDKVersion 不低于 26.0.0。
  - IL-S013-C02：开启沉浸光感要确保应用的 targetSDKVersion 不低于 26.0.0。
    - [开启沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-enable) · 锚点：不低于26.0.0 · SHA-256：`25a40e503b20d2cb3b864fad322d7abaa666a55206418de40a1bd33b6d81dbe7`

#### impl-scroll-linkage · 已实施

内容区 Scroll 在 onDidScroll 中累计偏移并以 0 为下限，搜索框大小范围内联动 titleOffset 与 searchOpacity，实现上滑隐藏搜索框、标题栏显示范围缩小、分类列表保留。

- 位置：`entry/src/main/ets/pages/Index.ets:124-130`（修改后；已对应 diff）
- 判据依据（fresh）：示例在搜索框大小范围内联动 titleOffset 与 searchOpacity；偏移与透明度限制在有效范围。
  - IL-S013-C04：用户上滑首页内容区后标题栏显示范围可随之缩小：上滑时搜索框隐藏，分类列表保留并突出显示，分类列表项开启沉浸光感；示例在 Scroll 的 onDidScroll 中累计偏移，在搜索框大小范围内（scrollOffset <= 50）联动 titleOffset 与 searchOpacity = 1 - titleOffset / 50。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：上滑时搜索框隐藏，分类列表保留并突出显示 · SHA-256：`dd5ad8cbe6e912fbec6a4b66f386ae16ed1161575eb6b1ab0ecb9bfbba452b39`

#### impl-stack-translucent-layout · 已实施

标题栏 BarStyle 设置为 STACK 模式实现内容区透底，内容区 Scroll 通过 contentStartOffset 避让标题栏，标题栏与 Navigation 均设置 expandSafeArea([SafeAreaType.SYSTEM]) 延伸至系统安全区。

- 位置：`entry/src/main/ets/pages/Index.ets:118-120`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:133-139`（修改后；已对应 diff）
- 判据依据（fresh）：STACK 模式使内容区显示在标题栏下方实现透底，contentStartOffset 避让标题栏显示区域。
  - IL-S013-C05：建议将 Navigation 组件的 BarStyle 设置为 STACK 模式，使内容区显示在标题栏下方，从而实现透底的效果；内容区 Scroll 通过 contentStartOffset 避让标题栏显示区域，并以 expandSafeArea([SafeAreaType.SYSTEM]) 将内容延伸至系统安全区。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：使内容区显示在标题栏下方，从而实现透底的效果 · SHA-256：`dd5ad8cbe6e912fbec6a4b66f386ae16ed1161575eb6b1ab0ecb9bfbba452b39`

#### impl-nested-material · 已实施

按典型场景示例为标题栏容器 Column、Search 与分类列表项多层设置沉浸式系统材质，分类列表项以 materialColor 选中赋色加 lightEffect 流光突出显示；该实现处于材质嵌套冲突监测组，保留功耗优化侧预期。

- 位置：`entry/src/main/ets/pages/Index.ets:62-68`（修改后；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:80-84`（修改后；已对应 diff）
- 判据依据（fresh）：典型场景示例为标题栏容器、Search 与分类列表项多层设置 systemMaterial，分类列表项开启沉浸光感提升交互体验。
  - IL-S013-C06：典型场景示例为标题栏（NavigationTitleOptions 的 systemMaterial）、标题栏容器 Column（注释标明设置 Column 组件开启沉浸光感）、Search 与分类列表项多层设置沉浸式系统材质，其中分类列表项开启沉浸光感以提升用户交互体验和内容曝光率（materialColor 选中赋色 + lightEffect 流光）。
    - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：分类列表项开启沉浸光感，提升用户交互体验和内容曝光率 · SHA-256：`dd5ad8cbe6e912fbec6a4b66f386ae16ed1161575eb6b1ab0ecb9bfbba452b39`
- 判据依据（fresh）：同一子树仅最外层设置一次材质的功耗优化预期与典型示例多层设置并存，结论 persists，按双预期成组保留。
  - IL-S013-C07：功耗优化要求：材质嵌套使用会导致效果被重复计算，既增加功耗，视觉上又相互干扰；同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置。
    - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置 · SHA-256：`13b8e311366df98466bbd59a54a9609c96d3a45a4c5af5f93a2bd17eea811f2c`

#### impl-app-level-enable · 已实施

entry 模块配置 metadata ohos.arkui.UIMaterial.state 为 enable，为支持沉浸光感的组件批量开启沉浸光感。

- 位置：`entry/src/main/module.json5:13-18`（修改后；已对应 diff）
- 工程配套选择：应用级 enable 由本次冻结的 enable 页配置契约支持，作为组件级显式设置的工程保障选择，不属于骨架判据。

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

冲突规范与待验证预期：

- IL-S013-C06（步骤引用）：典型场景示例为标题栏（NavigationTitleOptions 的 systemMaterial）、标题栏容器 Column（注释标明设置 Column 组件开启沉浸光感）、Search 与分类列表项多层设置沉浸式系统材质，其中分类列表项开启沉浸光感以提升用户交互体验和内容曝光率（materialColor 选中赋色 + lightEffect 流光）。
  - [沉浸光感典型场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sample) · 锚点：分类列表项开启沉浸光感，提升用户交互体验和内容曝光率 · SHA-256：`dd5ad8cbe6e912fbec6a4b66f386ae16ed1161575eb6b1ab0ecb9bfbba452b39`
- IL-S013-C07（步骤引用）：功耗优化要求：材质嵌套使用会导致效果被重复计算，既增加功耗，视觉上又相互干扰；同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置。
  - [沉浸光感功耗优化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-constraints) · 锚点：同一子树中只需在最外层设置一次沉浸式系统材质，内层节点不应再设置 · SHA-256：`13b8e311366df98466bbd59a54a9609c96d3a45a4c5af5f93a2bd17eea811f2c`

上述预期仍需逐项对照实际行为；步骤中的实施选择不裁决规范真值。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | passed | 应用安装并拉起。 |
| runtime | 是 | passed | 导航编排通过（探索、星穹远征断言命中）；用户实机确认上滑滚动联动：搜索框淡出隐藏、分类列表保留，下滑恢复，偏移与透明度在有效范围内。 |
| visual | 是 | passed | 模型判图：用户在 Pura 90 Pro 模拟器实机观察确认：顶部标题栏（探索标题、搜索框、分类胶囊）呈现半透明模糊沉浸光感材质，背景内容透底可见；上滑后搜索框淡出隐藏、分类列表保留突出。视觉行为匹配典型场景侧多层材质预期（IL-S013-C06），与功耗优化避免嵌套预期（IL-S013-C07）构成规范冲突组，按状态机裁决。 |

### 代码变化

#### build-profile.json5

- 状态：modified
- before：`12b986eeb2ae25ba52e34e23e5a0d1079fa1bce32216e64baf7164283077b56b`
- after：`810fc1e7293f5581220f36bc2383ed91a426f7697262b758d8e21ba3cce217bf`

```diff
--- a/build-profile.json5
+++ b/build-profile.json5
@@ -5,8 +5,8 @@
       {
         "name": "default",
         "signingConfig": "default",
-        "targetSdkVersion": "6.0.1(21)",
-        "compatibleSdkVersion": "6.0.1(21)",
+        "targetSdkVersion": "26.0.0",
+        "compatibleSdkVersion": "26.0.0",
         "runtimeOS": "HarmonyOS",
         "buildOption": {
           "strictMode": {
```

#### entry/src/main/module.json5

- 状态：modified
- before：`95045053098ced28f3f807767014815b5a26b0203f16de619b0c66eca93c42dc`
- after：`31094bb9452cfe29defad2d3d31181cc5913bbe7ae52c4e41f9d5e294d642c32`

```diff
--- a/entry/src/main/module.json5
+++ b/entry/src/main/module.json5
@@ -10,6 +10,12 @@
     "deliveryWithInstall": true,
     "installationFree": false,
     "pages": "$profile:main_pages",
+    "metadata": [
+      {
+        "name": "ohos.arkui.UIMaterial.state",
+        "value": "enable"
+      }
+    ],
     "metadata": [
       {
         "name": "ohos.arkui.UIMaterial.state",
```

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`2058c690fbfc73a8e4580ba8ddebc7980e0094a84766ff2e819d927bd5703fd7`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,142 @@
-@Entry
-@Component
-struct Index {
-  @State message: string = 'Hello World';
-
-  build() {
-    RelativeContainer() {
-      Text(this.message)
-        .id('HelloWorld')
-        .fontSize($r('app.float.page_text_font_size'))
-        .fontWeight(FontWeight.Bold)
-        .alignRules({
-          center: { anchor: '__container__', align: VerticalAlign.Center },
-          middle: { anchor: '__container__', align: HorizontalAlign.Center }
-        })
-        .onClick(() => {
-          this.message = 'Welcome';
-        })
-    }
-    .height('100%')
-    .width('100%')
-  }
-}
+import { uiMaterial } from '@kit.ArkUI';
+
+interface ListItemData {
+  name: string;
+  icon: Resource;
+  id: string;
+}
+
+@Entry
+@ComponentV2
+struct Index {
+  @Local currentIndex: number = 0;
+  @Local searchOpacity: number = 1;
+  @Local scrollOffset: number = 0;
+  @Local titleOffset: number = 0;
+  titleHeight: number = 150;
+  pathStack: NavPathStack = new NavPathStack();
+  @Local classifyType: Array<string> = ['策略', '动作', '竞技', '射击', '卡牌', '体育', '休闲', '音乐'];
+  listItems: Array<ListItemData> = [
+    { name: '星穹远征', icon: $r('sys.symbol.star_fill'), id: '1' },
+    { name: '罗盘物语', icon: $r('sys.symbol.compass'), id: '2' },
+    { name: '云端竞速', icon: $r('sys.symbol.gamecontroller'), id: '3' },
+    { name: '方阵迷局', icon: $r('sys.symbol.grid'), id: '4' },
+    { name: '齿轮传说', icon: $r('sys.symbol.gearshape'), id: '5' },
+    { name: '星海拾贝', icon: $r('sys.symbol.star_fill'), id: '6' },
+    { name: '远航纪元', icon: $r('sys.symbol.compass'), id: '7' },
+    { name: '斗技场', icon: $r('sys.symbol.gamecontroller'), id: '8' }
+  ];
+
+  @Builder
+  exploreTitleBar() {
+    Column() {
+      Row() {
+        Text('探索')
+          .fontSize(28)
+          .fontWeight(FontWeight.Bold)
+          .fontColor('#1A1A1A')
+        Blank()
+        Search({ placeholder: '探索探索' })
+          .searchButton('搜索')
+          .height(40)
+          .width(220)
+          .systemMaterial(new uiMaterial.ImmersiveMaterial({}))
+      }
+      .expandSafeArea([SafeAreaType.SYSTEM])
+      .width('100%')
+      .opacity(this.searchOpacity)
+      .height(50)
+
+      List({ space: 12 }) {
+        ForEach(this.classifyType, (item: string, index: number) => {
+          ListItem() {
+            Row() {
+              SymbolGlyph($r('sys.symbol.star_fill'))
+                .fontSize(20)
+                .fontColor(['#d3d3d3'])
+                .margin({ left: 16 })
+              Text(item)
+                .fontSize(16)
+                .fontColor(this.currentIndex === index ? Color.White : '#666666')
+                .padding({ left: 4, right: 12, top: 6, bottom: 6 })
+            }
+            .borderRadius(16)
+            .systemMaterial(new uiMaterial.ImmersiveMaterial({
+              materialColor: this.currentIndex === index ? '#333333' : undefined,
+              lightEffect: { color: Color.White }
+            }))
+            .onClick(() => {
+              this.currentIndex = index;
+            })
+          }
+        }, (item: string) => item)
+      }
+      .listDirection(Axis.Horizontal)
+      .width('100%')
+      .scrollBar(BarState.Off)
+      .margin(5)
+    }
+    .expandSafeArea([SafeAreaType.SYSTEM])
+    .width('100%')
+    .height(this.titleHeight)
+    .padding({ left: 20, right: 20 })
+    .position({ x: 0, y: -this.titleOffset })
+    .systemMaterial(new uiMaterial.ImmersiveMaterial({}))
+  }
+
+  build() {
+    Navigation(this.pathStack) {
+      Scroll() {
+        Column() {
+          Image($r('app.media.startIcon'))
+            .width('100%')
+            .height(180)
+            .borderRadius(12)
+            .backgroundColor('#e0e0e0')
+            .objectFit(ImageFit.Cover)
+
+          List() {
+            ForEach(this.listItems, (item: ListItemData) => {
+              ListItem() {
+                Row() {
+                  SymbolGlyph(item.icon)
+                    .fontSize(36)
+                    .fontColor(['#007dff'])
+                    .margin({ right: 16 })
+                  Text(item.name)
+                    .fontSize(16)
+                    .fontColor('#333333')
+                }
+                .width('100%')
+                .padding({ left: 20, right: 20, top: 14, bottom: 14 })
+              }
+            }, (item: ListItemData) => item.id)
+          }
+          .width('100%')
+        }
+      }
+      .contentStartOffset(this.titleHeight)
+      .scrollable(ScrollDirection.Vertical)
+      .scrollBar(BarState.Off)
+      .edgeEffect(EdgeEffect.Spring)
+      .width('100%')
+      .height('100%')
+      .onDidScroll((xOffset: number, yOffset: number, state: ScrollState) => {
+        this.scrollOffset = Math.max(0, this.scrollOffset + yOffset);
+        if (this.scrollOffset <= 50) {
+          this.titleOffset = this.scrollOffset;
+          this.searchOpacity = 1 - this.titleOffset / 50;
+        }
+      })
+    }
+    .title(
+      { builder: this.exploreTitleBar, height: this.titleHeight },
+      {
+        barStyle: BarStyle.STACK,
+        systemMaterial: new uiMaterial.ImmersiveMaterial({})
+      }
+    )
+    .expandSafeArea([SafeAreaType.SYSTEM])
+  }
+}
+
```

### 待验证

无。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\test4\ohos-feature-engineering\evidence\f2c9b98b-8724-4a81-bf90-bdab79aa047a\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\test4\ohos-feature-engineering\evidence\f2c9b98b-8724-4a81-bf90-bdab79aa047a\device-run.log
- EVID-006 [device_log] 导航步骤 swipe-up：向 up 滚动。 — D:\HW\testproject\test4\ohos-feature-engineering\evidence\f2c9b98b-8724-4a81-bf90-bdab79aa047a\nav-swipe-up.log
- EVID-007 [device_log] 导航编排：passed
- EVID-008 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\test4\ohos-feature-engineering\evidence\images\e9b1d369c61775ed38c8d00c8fc7b91945e37a965f3592299b84957b95981cab.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/e9b1d369c61775ed38c8d00c8fc7b91945e37a965f3592299b84957b95981cab.png>)

- EVID-009 [component_tree] 完整组件树（devecocli ui layout --mode full）。 — D:\HW\testproject\test4\ohos-feature-engineering\evidence\f2c9b98b-8724-4a81-bf90-bdab79aa047a\device-layout.json
- EVID-010 [screenshot] 判图引用的截图。 — D:\HW\testproject\test4\ohos-feature-engineering\evidence\images\4a7353b2a1fd900c847d754ec9229017915ca22da9d5bcd34faa5e45f9237521.png

![判图引用的截图。](<evidence/images/4a7353b2a1fd900c847d754ec9229017915ca22da9d5bcd34faa5e45f9237521.png>)

- EVID-011 [component_tree] 判图引用的组件树。 — D:\HW\testproject\test4\ohos-feature-engineering\evidence\9229d30e-500d-476c-ba19-65b35c834212\device-layout.json
- EVID-012 [visual_judgment] 用户在 Pura 90 Pro 模拟器实机观察确认：顶部标题栏（探索标题、搜索框、分类胶囊）呈现半透明模糊沉浸光感材质，背景内容透底可见；上滑后搜索框淡出隐藏、分类列表保留突出。视觉行为匹配典型场景侧多层材质预期（IL-S013-C06），与功耗优化避免嵌套预期（IL-S013-C07）构成规范冲突组，按状态机裁决。

### 规范冲突披露

本次判据集保留冲突判据：IL-S013-C06、IL-S013-C07。本次匹配：IL-S013-C06。
