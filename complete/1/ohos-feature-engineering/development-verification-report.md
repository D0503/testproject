# 代码开发验证报告

- 工程：D:\HW\testproject\complete\1
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 生成鸿蒙demo，实现底部页签和索引条的沉浸光感效果 | arkui-api26 | inconclusive |

## 生成鸿蒙demo，实现底部页签和索引条的沉浸光感效果

- 判据策略：fresh，冻结于 2026-09-10T11:24:23.031Z

- 总结果：`inconclusive`
- 能力：immersive-light
- 技术路线：arkui-api26

已执行的证据不足以区分规范预期或确认必需层。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：Demo
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- C21：Tabs 配置 barPosition 为 BarPosition.End、barOverlap(true)，不设置 vertical（保持默认 false），三条件同时满足后通过 barFloatingStyle 的 systemMaterial 生效悬浮材质
  - 官网冻结来源：component:35-35，片段 SHA-256：`94198e120262759abd622682ecf20554cf1cbd961db1c4d73c14186017ac3ca1`
- C22：TabContent 仅设置 tabBar 与内容区，不为 TabContent 设置任何沉浸光感属性
  - 官网冻结来源：component:39-39，片段 SHA-256：`3aea8ca96225929c02f3d464b151dcbec5eb14ef64170001e262d36fd9ab582b`
- C23：无实施对象：demo 不包含 Navigation 标题栏，不配置 NavigationTitleOptions.systemMaterial
  - 官网冻结来源：component:19-19，片段 SHA-256：`c3fb1c9b9e82ebb3128890ed13fef48522ee828453a36ce70ea6e1da39c64c2d`
- IL-F009：无实施对象：demo 不包含 Navigation 标题栏，不配置 NavigationTitleOptions.systemMaterial
  - 官网冻结来源：component:11-11，片段 SHA-256：`5250706190ec05e1b2643ffb6ff4b8bc75ce1461e9bd21b938d5759e8fddc6a1`
- IL-F010：底部页签通过 barFloatingStyle 中 FloatingTabBarStyle 的 systemMaterial 字段设置 THIN 沉浸材质（导航类组件使用较薄样式），并保持 maskColor 为透明；不设置 barBackgroundColor、barBackgroundBlurStyle 等栏背景，避免遮挡材质
  - 官网冻结来源：component:35-35，片段 SHA-256：`94198e120262759abd622682ecf20554cf1cbd961db1c4d73c14186017ac3ca1`
- IL-F011：索引条不设置 popupBackground 与 popupBackgroundBlurStyle（避免与沉浸光感互斥导致无效果），通过通用属性 systemMaterial 显式设置 THICK 材质的提示弹窗沉浸光感
  - 官网冻结来源：component:53-53，片段 SHA-256：`ff6ebf70eed3e2e47f2c833f6d1476c43c04a9a7b11370e8dc261fd4011b158f`

#### S01 · 已实施

实现底部页签悬浮样式与沉浸材质：Tabs 使用 barPosition End + barOverlap(true) + barFloatingStyle(FloatingTabBarStyle.systemMaterial THIN)，TabContent 仅设置 tabBar，不设置栏背景色或背景模糊

- 位置：`entry/src/main/ets/pages/Index.ets:1-23`（修改前；已对应 diff）
- 位置：`entry/src/main/ets/pages/Index.ets:1-176`（修改后；已对应 diff）
- 判据依据（fresh）：悬浮样式三条件 barOverlap=true、vertical=false、barPosition=BarPosition.End 需同时满足
  - C21：Tabs 悬浮样式仅在 barOverlap 为 true、vertical 为 false、barPosition 为 BarPosition.End 时生效，三个条件需同时满足，否则 systemMaterial 设置不生效。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：否则systemMaterial设置不生效 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：TabContent 不支持沉浸光感，仅保留 tabBar
  - C22：TabContent 不支持设置沉浸光感。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：TabContent不支持设置沉浸光感 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：材质经 FloatingTabBarStyle.systemMaterial 设置且不得被栏背景覆盖
  - IL-F010：Tabs 使用 FloatingTabBarStyle.systemMaterial，且材质会被栏背景色或背景模糊覆盖。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：三个条件需同时满足 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

#### S02 · 已实施

实现联系人页签：A-Z 分组 List 与 AlphabetIndexer 联动滚动，索引条不设置 popupBackground/popupBackgroundBlurStyle，通过 systemMaterial 显式设置 THICK 提示弹窗材质；联系人页 Stack 增加三色渐变背景以便观察材质通透效果

- 位置：`entry/src/main/ets/pages/Index.ets:120-159`（修改后；已对应 diff）
- 判据依据（fresh）：弹窗背景属性与沉浸光感互斥，须保持未设置并以 systemMaterial 显式开启
  - IL-F011：AlphabetIndexer 弹窗材质与 popupBackground、popupBackgroundBlurStyle 存在互斥覆盖关系。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：属性和沉浸光感能力互斥 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

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
| runtime | 是 | passed | devecocli run 安装并启动 EntryAbility 成功；辅以手工 hdc 验证：bm install 成功、aa start 成功、应用进程 com.example.app 存活无崩溃；首页/联系人页签切换正常，AlphabetIndexer 与分组 List 联动滚动正常，交互行为无回归。 |
| visual | 是 | inconclusive | 模型判图：用户确认本地模拟器暂不支持沉浸光感，材质滤镜渲染按官网设备能力分支不可观察（官网声明：不支持沉浸式材质的设备上可设置但无效果，可通过 isImmersiveMaterialSupported 判断）。结构与交互层已由组件树与运行观察核实：Tabs 悬浮 TabBar [334,2368]-[922,2564] 叠于内容之上（barOverlap 悬浮布局成立）、联系人页 AlphabetIndexer [1166,654]-[1256,2144] 与 A-Z 分组 List 联动正常、页签切换无回归。材质视觉结论待真机（isImmersiveMaterialSupported=true 设备）复核。 |

### 代码变化

#### entry/src/main/ets/pages/Index.ets

- 状态：modified
- before：`a4a245f63c440ecbf347b0e0409ec38684c43fd1ec4104df5f9405292231d328`
- after：`4c129e033f4042f3909894ecd24063660a4b03b4964913e2a94f2a64b13d985d`

```diff
--- a/entry/src/main/ets/pages/Index.ets
+++ b/entry/src/main/ets/pages/Index.ets
@@ -1,23 +1,176 @@
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
+class ContactGroup {
+  letter: string;
+  names: string[];
+
+  constructor(letter: string, names: string[]) {
+    this.letter = letter;
+    this.names = names;
+  }
+}
+
+class HomeCard {
+  title: string;
+  subtitle: string;
+  color: string;
+
+  constructor(title: string, subtitle: string, color: string) {
+    this.title = title;
+    this.subtitle = subtitle;
+    this.color = color;
+  }
+}
+
+@Entry
+@Component
+struct Index {
+  @State selectedIndex: number = 0;
+  private alphabets: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
+    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
+  private groups: ContactGroup[] = [
+    new ContactGroup('A', ['Alice', 'Alan', 'Amy']),
+    new ContactGroup('B', ['Bob', 'Bella', 'Bruce']),
+    new ContactGroup('C', ['Cathy', 'Carl', 'Cindy']),
+    new ContactGroup('D', ['David', 'Diana', 'Derek']),
+    new ContactGroup('E', ['Emma', 'Eric', 'Elena']),
+    new ContactGroup('F', ['Frank', 'Fiona', 'Felix']),
+    new ContactGroup('G', ['Grace', 'George', 'Gina']),
+    new ContactGroup('H', ['Henry', 'Helen', 'Hugo']),
+    new ContactGroup('I', ['Ivy', 'Ian', 'Isabel']),
+    new ContactGroup('J', ['Jack', 'Julia', 'Jason']),
+    new ContactGroup('K', ['Kevin', 'Karen', 'Keith']),
+    new ContactGroup('L', ['Lily', 'Leo', 'Lucy']),
+    new ContactGroup('M', ['Michael', 'Mary', 'Mark']),
+    new ContactGroup('N', ['Nancy', 'Nick', 'Nora']),
+    new ContactGroup('O', ['Oliver', 'Olive', 'Oscar']),
+    new ContactGroup('P', ['Peter', 'Paula', 'Philip']),
+    new ContactGroup('Q', ['Queenie', 'Quentin', 'Quinn']),
+    new ContactGroup('R', ['Rose', 'Robert', 'Rachel']),
+    new ContactGroup('S', ['Sam', 'Susan', 'Steve']),
+    new ContactGroup('T', ['Tom', 'Tina', 'Tony']),
+    new ContactGroup('U', ['Uma', 'Victor', 'Ursula']),
+    new ContactGroup('V', ['Vera', 'Vincent', 'Vivian']),
+    new ContactGroup('W', ['Wendy', 'William', 'Walter']),
+    new ContactGroup('X', ['Xavier', 'Xenia', 'Xander']),
+    new ContactGroup('Y', ['Yvonne', 'York', 'Yetta']),
+    new ContactGroup('Z', ['Zoe', 'Zack', 'Zara'])
+  ];
+  private homeCards: HomeCard[] = [
+    new HomeCard('红色卡片', '内容透过底部页签材质自然渗透', '#FFE84026'),
+    new HomeCard('蓝色卡片', '悬浮页签呈现轻盈的分层效果', '#FF0A59F7'),
+    new HomeCard('绿色卡片', '导航区域与内容建立视觉层次', '#FF64BB5C'),
+    new HomeCard('紫色卡片', '材质随内容颜色呈现折射与高光', '#FF7B61FF'),
+    new HomeCard('黄色卡片', '底部页签沉浸光感演示', '#FFED9B27'),
+    new HomeCard('青色卡片', 'THIN 薄材质通透样式', '#FF26A69A'),
+    new HomeCard('橙色卡片', '彩色内容便于观察材质滤镜', '#FF8B4A2D'),
+    new HomeCard('粉色卡片', '滑动列表观察页签悬浮效果', '#FFE86FB7')
+  ];
+  private scroller: ListScroller = new ListScroller();
+
+  @Builder
+  groupHeader(letter: string) {
+    Text(letter)
+      .fontSize(16)
+      .fontWeight(FontWeight.Bold)
+      .fontColor($r('sys.color.font_on_primary'))
+      .width('100%')
+      .padding({ left: 16, top: 10, bottom: 6 })
+  }
+
+  build() {
+    Tabs({ barPosition: BarPosition.End }) {
+      TabContent() {
+        Column({ space: 12 }) {
+          Text('沉浸光感 · 底部页签')
+            .fontSize(24)
+            .fontWeight(FontWeight.Bold)
+            .fontColor($r('sys.color.font_primary'))
+            .width('100%')
+            .margin({ top: 12 })
+          ForEach(this.homeCards, (card: HomeCard) => {
+            Column() {
+              Text(card.title)
+                .fontSize(20)
+                .fontWeight(FontWeight.Medium)
+                .fontColor($r('sys.color.font_on_primary'))
+              Text(card.subtitle)
+                .fontSize(14)
+                .fontColor($r('sys.color.font_on_primary'))
+                .margin({ top: 6 })
+            }
+            .width('100%')
+            .height(110)
+            .borderRadius(16)
+            .backgroundColor(card.color)
+            .padding(16)
+            .alignItems(HorizontalAlign.Start)
+            .justifyContent(FlexAlign.Center)
+          }, (card: HomeCard) => card.title)
+        }
+        .width('100%')
+        .height('100%')
+        .padding({ left: 16, right: 16, bottom: 96 })
+      }
+      .tabBar(new BottomTabBarStyle($r('sys.media.ohos_icon_mask_svg'), '首页')
+        .labelStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
+        .iconStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
+      )
+
+      TabContent() {
+        Stack({ alignContent: Alignment.End }) {
+          List({ scroller: this.scroller }) {
+            ForEach(this.groups, (group: ContactGroup, groupIndex: number) => {
+              ListItemGroup({ header: this.groupHeader(group.letter) }) {
+                ForEach(group.names, (name: string) => {
+                  ListItem() {
+                    Text(name)
+                      .fontSize(18)
+                      .fontColor($r('sys.color.font_on_primary'))
+                      .width('100%')
+                      .height(52)
+                      .padding({ left: 16 })
+                  }
+                }, (name: string) => `${groupIndex}-${name}`)
+              }
+            }, (group: ContactGroup) => group.letter)
+          }
+          .width('100%')
+          .height('100%')
+
+          AlphabetIndexer({ arrayValue: this.alphabets, selected: this.selectedIndex })
+            .selected(this.selectedIndex)
+            .color($r('sys.color.font_on_primary'))
+            .selectedColor($r('sys.color.font_on_primary'))
+            .onSelect((index: number) => {
+              this.selectedIndex = index;
+              this.scroller.scrollToIndex(index, false);
+            })
+            .systemMaterial(new uiMaterial.ImmersiveMaterial({
+              style: uiMaterial.ImmersiveStyle.THICK
+            }))
+        }
+        .width('100%')
+        .height('100%')
+        .linearGradient({
+          angle: 180,
+          colors: [['#FF0A59F7', 0], ['#FF7B61FF', 0.5], ['#FFE86FB7', 1]]
+        })
+      }
+      .tabBar(new BottomTabBarStyle($r('sys.media.ohos_icon_mask_svg'), '联系人')
+        .labelStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
+        .iconStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
+      )
+    }
+    .barFloatingStyle({
+      systemMaterial: new uiMaterial.ImmersiveMaterial({
+        style: uiMaterial.ImmersiveStyle.THIN
+      }),
+      maskColor: Color.Transparent
+    })
+    .barOverlap(true)
+    .width('100%')
+    .height('100%')
+  }
+}
+
```

### 待验证

- PENDING-001 [visual] 模型判图：用户确认本地模拟器暂不支持沉浸光感，材质滤镜渲染按官网设备能力分支不可观察（官网声明：不支持沉浸式材质的设备上可设置但无效果，可通过 isImmersiveMaterialSupported 判断）。结构与交互层已由组件树与运行观察核实：Tabs 悬浮 TabBar [334,2368]-[922,2564] 叠于内容之上（barOverlap 悬浮布局成立）、联系人页 AlphabetIndexer [1166,654]-[1256,2144] 与 A-Z 分组 List 联动正常、页签切换无回归。材质视觉结论待真机（isImmersiveMaterialSupported=true 设备）复核。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\6f7228ff-8a1a-4508-aa55-78dde1f52835\build.log
- EVID-005 [device_log] devecocli run 安装并拉起成功 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\6f7228ff-8a1a-4508-aa55-78dde1f52835\device-run.log
- EVID-006 [screenshot] 设备屏幕截图（devecocli ui screenshot）。 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\images\9ca7fd3aea86b14fda3980445ed2e1cd59d3d596686c8c2c6e80d0b9c4f14efa.png

![设备屏幕截图（devecocli ui screenshot）。](<evidence/images/9ca7fd3aea86b14fda3980445ed2e1cd59d3d596686c8c2c6e80d0b9c4f14efa.png>)

- EVID-007 [component_tree] 完整组件树（devecocli ui layout --mode full）。 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\6f7228ff-8a1a-4508-aa55-78dde1f52835\device-layout.json
- EVID-008 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\images\4dcdb035554304e20c8ea5705f8bbcfc5e846355149116f621dfbb64fdf73626.jpeg

![判图引用的截图。](<evidence/images/4dcdb035554304e20c8ea5705f8bbcfc5e846355149116f621dfbb64fdf73626.jpeg>)

- EVID-009 [screenshot] 判图引用的截图。 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\images\5ace0a208185b221a08d998f06e87344604c43b1909a9151e7ad0d7cf31b15b0.jpeg

![判图引用的截图。](<evidence/images/5ace0a208185b221a08d998f06e87344604c43b1909a9151e7ad0d7cf31b15b0.jpeg>)

- EVID-010 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\il-s003-layout-home.json
- EVID-011 [component_tree] 判图引用的组件树。 — D:\HW\testproject\complete\1\ohos-feature-engineering\evidence\il-s003-layout-contacts.json
- EVID-012 [visual_judgment] 用户确认本地模拟器暂不支持沉浸光感，材质滤镜渲染按官网设备能力分支不可观察（官网声明：不支持沉浸式材质的设备上可设置但无效果，可通过 isImmersiveMaterialSupported 判断）。结构与交互层已由组件树与运行观察核实：Tabs 悬浮 TabBar [334,2368]-[922,2564] 叠于内容之上（barOverlap 悬浮布局成立）、联系人页 AlphabetIndexer [1166,654]-[1256,2144] 与 A-Z 分组 List 联动正常、页签切换无回归。材质视觉结论待真机（isImmersiveMaterialSupported=true 设备）复核。
