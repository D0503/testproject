# 代码开发验证报告

- 工程：D:\HW\testproject\complete\Express
- 开发目标数：1

## 验证结果总览

| 开发目标 | 技术路线 | 结果 |
|---|---|---|
| 标题栏和导航tab沉浸光感（targetSdk 26 兼容写法，不执行视觉验证） | arkui-api26 | build_passed_runtime_pending |

## 标题栏和导航tab沉浸光感（targetSdk 26 兼容写法，不执行视觉验证）

- 判据策略：reuse，冻结于 2026-09-10T13:20:57.988Z

- 总结果：`build_passed_runtime_pending`
- 能力：immersive-light
- 技术路线：arkui-api26

静态、SDK 和构建已通过，仍缺少必需设备运行或视觉证据。

### 代码实现步骤与依据

- 实施记录：已记录
- 基线对照：已提供

- 开发模式：现有工程
- 依据校验检查来源和记录覆盖；语义对照与运行效果分别验证。

- IL-F009：MainEntry 的 NavDestination 打开自定义标题栏 title(builder, options)，options 使用 NavigationTitleOptions 并按官网建议设置 barStyle 为 STACK 使内容区延伸至标题栏区域；标题内容放入 title builder 内并对其容器节点设置通用属性 systemMaterial（官网示例4/5 与功耗优化正例路径，材质 ULTRA_THIN）。NavigationTitleOptions.systemMaterial 本身的生效范围仅返回键与非自定义 Menu（见 C23），MainEntry 主页无返回键与 Menu，故不在 options 中额外配置该字段
  - 官网冻结来源：component:11-25，片段 SHA-256：`f7a3be8629930ef3267827a8dcab0fe61810e73dfe4afcd774dcf6215618dcbd`
  - 官网冻结来源：enable:39-51，片段 SHA-256：`eac1248209808882e11d9a1ae5f9ae25489575f8778998e7a36b7d2ea40a6b95`
- IL-F010：主导航 Tabs 通过 barFloatingStyle 属性的 FloatingTabBarStyle.systemMaterial 字段设置 TabBar 背板沉浸光感（THIN）；现有 Tabs 未设置 barBackgroundColor/barBackgroundBlurStyle，保持不设置以避免覆盖材质
  - 官网冻结来源：component:27-41，片段 SHA-256：`dc1f365f70ed7a23f1294f2e80e319836bbeb030321dd4a664b8d9d6a1ed791a`
- IL-F011：不实施：工程无 AlphabetIndexer 索引条组件，本判据无落点
  - 官网冻结来源：component:43-55，片段 SHA-256：`075067ec40fa2f4fca1cccc455648faac2ee1b7246c669744ed50a62e8f51f4e`
- C21：悬浮样式三条件按断点处理：手机模式（SM/MD）vertical=false、barPosition=BarPosition.End、barOverlap 置 true，三条件同时满足，材质生效；大屏侧栏模式（LG/XL）vertical=true、barPosition=Start，barOverlap 置 false，条件不满足时 systemMaterial 不生效，TabBar 回退普通占位样式
  - 官网冻结来源：component:27-41，片段 SHA-256：`dc1f365f70ed7a23f1294f2e80e319836bbeb030321dd4a664b8d9d6a1ed791a`
- C22：不给任何 TabContent 设置沉浸光感；四个 TabContent 保持原有 opacity/tabBar 配置不变
  - 官网冻结来源：component:27-41，片段 SHA-256：`dc1f365f70ed7a23f1294f2e80e319836bbeb030321dd4a664b8d9d6a1ed791a`
- C23：标题栏生效范围限定为返回键与非自定义 Menu，MainEntry 主页无返回键与非自定义 Menu，因此不依赖 NavigationTitleOptions.systemMaterial 呈现标题栏材质；自定义标题内容按官方示例采用 title builder 内节点通用属性 systemMaterial 在标题栏区域生效
  - 官网冻结来源：component:11-25，片段 SHA-256：`f7a3be8629930ef3267827a8dcab0fe61810e73dfe4afcd774dcf6215618dcbd`

#### S01 · 已实施

build-profile.json5 仅将 targetSdkVersion 升级为 26.0.0，compatibleSdkVersion 保持 6.0.0(20)（用户确认的兼容策略）

- 位置：`build-profile.json5:8-14`（修改前；已对应 diff）
- 位置：`build-profile.json5:8-14`（修改后；已对应 diff）
- 判据依据（fresh）：开启沉浸光感需 targetSDKVersion 不低于 26.0.0
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 工程配套选择：用户明确选择只升级 target 并采用兼容写法；低版本设备运行需 API 兼容保护

#### S02 · 已实施

新建 products/entry 的 ImmersiveCompat.ets：静态依赖 @kit.ArkUI uiMaterial 的 API26 专用模块，仅被动态 import；导出标题栏/页签 AttributeModifier 与创建函数，内部做 deviceInfo.sdkApiVersion>=26 与 isImmersiveMaterialSupported 双重守卫，材质对象一次性创建（ULTRA_THIN/THIN）保持稳定

- 位置：`products/entry/src/main/ets/utils/ImmersiveCompat.ets:1-57`（修改后；已对应 diff）
- 判据依据（fresh）：标题栏通用属性 systemMaterial 设置沉浸光感
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：Tabs 使用 FloatingTabBarStyle.systemMaterial 设置背板材质
  - IL-F010：Tabs 使用 FloatingTabBarStyle.systemMaterial，且材质会被栏背景色或背景模糊覆盖。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：三个条件需同时满足 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 工程配套选择：官网示例5的 isImmersiveMaterialSupported 守卫写法依赖静态 import uiMaterial，compatible 20 设备缺少 @ohos.arkui.uiMaterial 模块会导致页面加载失败

#### S03 · 已实施

MainEntryVM 增加 immersiveModifierHolder 状态与 initImmersiveMaterial：deviceInfo.sdkApiVersion>=26 时动态 import ImmersiveCompat 并创建 modifier 持有对象

- 位置：`products/entry/src/main/ets/viewmodels/MainEntryVM.ets:1-69`（修改前；已对应 diff）
- 位置：`products/entry/src/main/ets/viewmodels/MainEntryVM.ets:1-86`（修改后；已对应 diff）
- 判据依据（fresh）：运行时按设备支持情况决定材质设置
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 工程配套选择：VM 不静态依赖 uiMaterial，保证低版本设备主页面模块可加载

#### S04 · 已实施

MainEntry：NavDestination 以 title(mainTitleBuilder(), { barStyle: BarStyle.STACK }) 打开自定义标题栏（CommonTitle 渲染当前页签名），标题容器 attributeModifier 应用 systemMaterial(ULTRA_THIN)；Tabs 增加 barOverlap(!isTabVertical) 与 attributeModifier 应用 barFloatingStyle({systemMaterial: THIN})

- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:2-147`（修改前；已对应 diff）
- 位置：`products/entry/src/main/ets/pages/MainEntry.ets:2-165`（修改后；已对应 diff）
- 判据依据（fresh）：title 使用 NavigationTitleOptions STACK 样式使内容延伸至标题栏区域
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：自定义标题内容不依赖 NavigationTitleOptions.systemMaterial，用通用属性在标题栏区域生效
  - C23：沉浸光感针对 Navigation 标题栏生效的范围是返回键、非自定义 Menu。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：返回键、非自定义Menu · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：barFloatingStyle 设置 FloatingTabBarStyle.systemMaterial
  - IL-F010：Tabs 使用 FloatingTabBarStyle.systemMaterial，且材质会被栏背景色或背景模糊覆盖。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：三个条件需同时满足 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：手机模式三条件同时满足，大屏侧栏模式不满足时材质不生效
  - C21：Tabs 悬浮样式仅在 barOverlap 为 true、vertical 为 false、barPosition 为 BarPosition.End 时生效，三个条件需同时满足，否则 systemMaterial 设置不生效。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：否则systemMaterial设置不生效 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`

#### S05 · 部分实施

四个 tab 页移除页内标题栏并做避让：HomePage 删除 titleBuilder 与滚动渐变逻辑；OrderPage/MinePage 删除 CommonTitle；BenefitPage 仅在非 tab 复用场景（isTabPage=false）保留 CommonTitle；内容顶部按 windowTopPadding+56 避让 STACK 标题栏，手机模式内容底部按页签高度 48 避让悬浮 TabBar；QueryPageVM/MinePageVM 补充 isTabVertical 断点计算

- 位置：`features/business_home/src/main/ets/pages/HomePage.ets:15-128`（修改前；已对应 diff）
- 位置：`features/business_home/src/main/ets/pages/HomePage.ets:15-95`（修改后；已对应 diff）
- 位置：`features/business_order/src/main/ets/pages/OrderPage.ets:1-64`（修改前；已对应 diff）
- 位置：`features/business_order/src/main/ets/pages/OrderPage.ets:1-61`（修改后；已对应 diff）
- 位置：`features/business_benefits/src/main/ets/pages/BenefitPage.ets:2-187`（修改前；已对应 diff）
- 位置：`features/business_benefits/src/main/ets/pages/BenefitPage.ets:2-198`（修改后；已对应 diff）
- 位置：`features/business_mine/src/main/ets/pages/MinePage.ets:1-29`（修改前；已对应 diff）
- 位置：`features/business_mine/src/main/ets/pages/MinePage.ets:1-25`（修改后；已对应 diff）
- 位置：`features/business_order/src/main/ets/viewModels/QueryPageVM.ets:16-21`（修改前；未确认变更）
- 位置：`features/business_order/src/main/ets/viewModels/QueryPageVM.ets:16-29`（修改后；已对应 diff）
- 位置：`features/business_mine/src/main/ets/viewModels/MinePageVM.ets:1-14`（修改前；已对应 diff）
- 位置：`features/business_mine/src/main/ets/viewModels/MinePageVM.ets:1-22`（修改后；已对应 diff）
- 判据依据（fresh）：标题栏统一由 NavDestination title 承载，避免双重标题
  - IL-F009：Navigation 标题栏可通过 NavigationTitleOptions.systemMaterial 配置；默认材质受应用状态影响。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：Navigation标题栏支持通过应用级开启 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 判据依据（fresh）：TabContent 自身不设置沉浸光感，仅做布局避让
  - C22：TabContent 不支持设置沉浸光感。
    - [组件适配沉浸光感](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-immersive-light-sense-component-adaptation) · 锚点：TabContent不支持设置沉浸光感 · SHA-256：`93703579547848f36423aa6055e5021b37eea66e5f1036723e5cc901c08e39a5`
- 工程配套选择：barOverlap(true) 使内容延伸至悬浮页签下方，滚动内容需底部避让保证最后一项可见
- 待确认：features/business_order/src/main/ets/viewModels/QueryPageVM.ets:16-21 无可对应的基线差异，实施情况待确认。

以上判据来自本次冻结快照（官网现网页）；SDK、构建和设备结果见分层验证证据。

### 兼容性

状态：`supported`。无阻塞原因。

### 分层检查

| 层级 | 必需 | 状态 | 结论 |
|---|---:|---|---|
| static | 是 | passed | 场景静态规则通过。 |
| sdk | 是 | passed | ArkUI 沉浸光感 API 26：SDK API 26，必需符号已找到 |
| build | 是 | passed | 真实 debug 构建通过。 |
| install | 是 | not_run | 未请求运行验证。 |
| runtime | 是 | not_run | 未请求运行验证。 |
| visual | 是 | not_run | 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。 |

### 代码变化

#### build-profile.json5

- 状态：modified
- before：`fd014ca0f238eb652d4e6e39c1dc08f912d87bd82910ea36a5e769706bc7f314`
- after：`00f70f97c67528db797b09d6d3109152d0d836f5679dbccc046fe62ea71bc441`

```diff
--- a/build-profile.json5
+++ b/build-profile.json5
@@ -8,7 +8,7 @@
       {
         "name": "default",
         "signingConfig": "default",
-        "targetSdkVersion": "6.0.2(22)",
+        "targetSdkVersion": "26.0.0",
         "compatibleSdkVersion": "6.0.0(20)",
         "runtimeOS": "HarmonyOS",
         "buildOption": {
```

#### products/entry/src/main/ets/pages/MainEntry.ets

- 状态：modified
- before：`f89e50e69370e616ea20747028337773a47d1ec7260ad8d0f627017cb9c71857`
- after：`f738482a9015019f8a9e59be12e9a146d4cf94e0efba220749cc2aa93fd99d54`

```diff
--- a/products/entry/src/main/ets/pages/MainEntry.ets
+++ b/products/entry/src/main/ets/pages/MainEntry.ets
@@ -2,146 +2,164 @@
 import { OrderPage } from 'business_order';
 import { BenefitPage } from 'business_benefits';
 import { MinePage } from 'business_mine';
-import { ControllerModule, RouterMap, RouterModule } from 'lib_foundation';
-import { TabListItem } from '../types';
-import { MainEntryVM } from '../viewmodels/MainEntryVM';
-import { WantUtils } from '../utils/WantUtils';
-import { WidgetCardVM } from '../viewmodels/WidgetCardVM';
-
-
-@Builder
-export function MainEntryBuilder() {
-  MainEntry()
-}
-
-@ComponentV2
-struct MainEntry {
-  vm: MainEntryVM = new MainEntryVM();
-  formCardVM: WidgetCardVM = WidgetCardVM.instance;
-  @Local opacityList: number[] = [1.0, 0, 0, 0];
-  private controller: TabsController = new TabsController();
-  // tab切换动画淡入淡出
-  private customContentTransition: (from: number, to: number) => TabContentAnimatedTransition =
-    (from: number, to: number) => {
-      let tabContentAnimatedTransition = {
-        timeout: 1200,
-        transition: (proxy: TabContentTransitionProxy) => {
-          this.opacityList[from] = 1.0;
-          this.opacityList[to] = 0.1;
-          this.getUIContext()?.animateTo({
-            duration: 200,
-            onFinish: () => {
-              proxy.finishTransition();
-            },
-          }, () => {
-            this.opacityList[from] = 0.1;
-            this.opacityList[to] = 1.0;
-          });
-        },
-      } as TabContentAnimatedTransition;
-      return tabContentAnimatedTransition;
-    };
-
-  // 桌面快捷方式
-  @Monitor('vm.pageRouter.shortcutId')
-  shortcutsChange() {
-    if (this.vm.pageRouter.shortcutId) {
-      WantUtils.jumpToShortcutsPage(this.vm.userInfoModel.isLogin);
-    }
-  }
-
-  // 服务卡片
-  @Monitor('vm.pageRouter.formCardId')
-  formCardChange() {
-    if (this.vm.pageRouter.formCardId) {
-      WantUtils.jumpToFormCardPage();
-    }
-  }
-
-  @Monitor('vm.userInfoModel.isLogin')
-  onLoginChange() {
-    this.formCardVM.updateFormCardData(true);
-  }
-
-  aboutToAppear() {
-    // tabs控制器存起来使用
-    ControllerModule.set(this.controller);
-    // 更新服务卡片
-    this.formCardVM.updateFormCardData();
-    // 开启轮询
-    this.formCardVM.startPolling();
-    // 服务卡片
-    if (this.vm.pageRouter.formCardId) {
-      WantUtils.jumpToFormCardPage();
-    }
-    // 桌面图标
-    if (this.vm.pageRouter.shortcutId) {
-      WantUtils.jumpToShortcutsPage(this.vm.userInfoModel.isLogin);
-    }
-  }
-
-  build() {
-    NavDestination() {
-      Column() {
-        Tabs({ barPosition: BarPosition.End, index: this.vm.curIndex, controller: this.controller }) {
-          TabContent() {
-            HomePage()
-          }
-          .opacity(this.opacityList[0])
-          .tabBar(this.tabBarBuilder(0, this.vm.tabList[0]))
-
-          TabContent() {
-            OrderPage({
-              currentTabIndex: this.vm.curIndex
-            })
-          }
-          .opacity(this.opacityList[1])
-          .tabBar(this.tabBarBuilder(1, this.vm.tabList[1]))
-
-          TabContent() {
-            BenefitPage()
-          }
-          .opacity(this.opacityList[2])
-          .tabBar(this.tabBarBuilder(2, this.vm.tabList[2]))
-
-          TabContent() {
-            MinePage()
-          }
-          .opacity(this.opacityList[3])
-          .tabBar(this.tabBarBuilder(3, this.vm.tabList[3]))
-        }
-        .width('100%')
-        .height('100%')
-        .scrollable(false)
-        .vertical(this.vm.isTabVertical)
-        .barPosition(this.vm.barPosition)
-        .barWidth(this.vm.tabWidth)
-        .barHeight(this.vm.tabHeight)
-        .customContentTransition(this.customContentTransition)
-        .onContentWillChange((currentIndex: number, comingIndex: number) => {
-          if ((comingIndex === 1 || comingIndex === 2) && !this.vm.userInfoModel.isLogin) {
-            RouterModule.push({ url: RouterMap.QUICK_LOGIN_PAGE }, () => {
-              this.controller.changeIndex(comingIndex);
-            })
-            return false;
-          }
-          return true;
-        })
-        .onChange((index: number) => {
-          this.vm.curIndex = index;
-        })
-      }
-      .width('100%')
-      .padding({
-        bottom: this.vm.windowModel.windowBottomPadding
-      })
-      .backgroundColor(Color.White)
-    }
-    .hideTitleBar(true)
-    .hideToolBar(true)
-    .onBackPressed(() => {
-      return this.vm.onBackPressed();
-    })
+import { CommonTitle, ControllerModule, RouterMap, RouterModule } from 'lib_foundation';
+import { TabListItem } from '../types';
+import { MainEntryVM } from '../viewmodels/MainEntryVM';
+import { WantUtils } from '../utils/WantUtils';
+import { WidgetCardVM } from '../viewmodels/WidgetCardVM';
+
+
+@Builder
+export function MainEntryBuilder() {
+  MainEntry()
+}
+
+@ComponentV2
+struct MainEntry {
+  vm: MainEntryVM = new MainEntryVM();
+  formCardVM: WidgetCardVM = WidgetCardVM.instance;
+  @Local opacityList: number[] = [1.0, 0, 0, 0];
+  private controller: TabsController = new TabsController();
+  // tab切换动画淡入淡出
+  private customContentTransition: (from: number, to: number) => TabContentAnimatedTransition =
+    (from: number, to: number) => {
+      let tabContentAnimatedTransition = {
+        timeout: 1200,
+        transition: (proxy: TabContentTransitionProxy) => {
+          this.opacityList[from] = 1.0;
+          this.opacityList[to] = 0.1;
+          this.getUIContext()?.animateTo({
+            duration: 200,
+            onFinish: () => {
+              proxy.finishTransition();
+            },
+          }, () => {
+            this.opacityList[from] = 0.1;
+            this.opacityList[to] = 1.0;
+          });
+        },
+      } as TabContentAnimatedTransition;
+      return tabContentAnimatedTransition;
+    };
+
+  // 桌面快捷方式
+  @Monitor('vm.pageRouter.shortcutId')
+  shortcutsChange() {
+    if (this.vm.pageRouter.shortcutId) {
+      WantUtils.jumpToShortcutsPage(this.vm.userInfoModel.isLogin);
+    }
+  }
+
+  // 服务卡片
+  @Monitor('vm.pageRouter.formCardId')
+  formCardChange() {
+    if (this.vm.pageRouter.formCardId) {
+      WantUtils.jumpToFormCardPage();
+    }
+  }
+
+  @Monitor('vm.userInfoModel.isLogin')
+  onLoginChange() {
+    this.formCardVM.updateFormCardData(true);
+  }
+
+  aboutToAppear() {
+    // tabs控制器存起来使用
+    ControllerModule.set(this.controller);
+    // 初始化沉浸光感（按设备能力与系统版本决定是否启用）
+    this.vm.initImmersiveMaterial();
+    // 更新服务卡片
+    this.formCardVM.updateFormCardData();
+    // 开启轮询
+    this.formCardVM.startPolling();
+    // 服务卡片
+    if (this.vm.pageRouter.formCardId) {
+      WantUtils.jumpToFormCardPage();
+    }
+    // 桌面图标
+    if (this.vm.pageRouter.shortcutId) {
+      WantUtils.jumpToShortcutsPage(this.vm.userInfoModel.isLogin);
+    }
+  }
+
+  build() {
+    NavDestination() {
+      Column() {
+        Tabs({ barPosition: BarPosition.End, index: this.vm.curIndex, controller: this.controller }) {
+          TabContent() {
+            HomePage()
+          }
+          .opacity(this.opacityList[0])
+          .tabBar(this.tabBarBuilder(0, this.vm.tabList[0]))
+
+          TabContent() {
+            OrderPage({
+              currentTabIndex: this.vm.curIndex
+            })
+          }
+          .opacity(this.opacityList[1])
+          .tabBar(this.tabBarBuilder(1, this.vm.tabList[1]))
+
+          TabContent() {
+            BenefitPage()
+          }
+          .opacity(this.opacityList[2])
+          .tabBar(this.tabBarBuilder(2, this.vm.tabList[2]))
+
+          TabContent() {
+            MinePage()
+          }
+          .opacity(this.opacityList[3])
+          .tabBar(this.tabBarBuilder(3, this.vm.tabList[3]))
+        }
+        .width('100%')
+        .height('100%')
+        .scrollable(false)
+        .vertical(this.vm.isTabVertical)
+        .barPosition(this.vm.barPosition)
+        .barWidth(this.vm.tabWidth)
+        .barHeight(this.vm.tabHeight)
+        // 手机模式页签栏悬浮于内容之上，配合悬浮材质生效；大屏侧栏模式恢复占位
+        .barOverlap(!this.vm.isTabVertical)
+        .attributeModifier(this.vm.immersiveModifierHolder?.tabBar)
+        .customContentTransition(this.customContentTransition)
+        .onContentWillChange((currentIndex: number, comingIndex: number) => {
+          if ((comingIndex === 1 || comingIndex === 2) && !this.vm.userInfoModel.isLogin) {
+            RouterModule.push({ url: RouterMap.QUICK_LOGIN_PAGE }, () => {
+              this.controller.changeIndex(comingIndex);
+            })
+            return false;
+          }
+          return true;
+        })
+        .onChange((index: number) => {
+          this.vm.curIndex = index;
+        })
+      }
+      .width('100%')
+      .padding({
+        bottom: this.vm.windowModel.windowBottomPadding
+      })
+      .backgroundColor(Color.White)
+    }
+    .title(this.mainTitleBuilder(), { barStyle: BarStyle.STACK })
+    .hideToolBar(true)
+    .onBackPressed(() => {
+      return this.vm.onBackPressed();
+    })
+  }
+
+  // 标题栏：STACK 样式覆盖内容区，容器节点设置沉浸光感材质
+  @Builder
+  mainTitleBuilder() {
+    Column() {
+      CommonTitle({
+        title: this.vm.tabList[this.vm.curIndex].label,
+        fontSize: 26,
+        showBackBtn: false,
+      })
+    }
+    .attributeModifier(this.vm.immersiveModifierHolder?.titleBar)
     .title(this.mainTitleBuilder(), { barStyle: BarStyle.STACK })
     .hideToolBar(true)
     .onBackPressed(() => {
```

#### products/entry/src/main/ets/viewmodels/MainEntryVM.ets

- 状态：modified
- before：`8a5f776725b13d6ea9e504099dbe5fc542d36c15120ceedbfc0b31bd5f25770a`
- after：`9f541d674d2669672e877ccd32cd9fe1f548303cad1e9ff15b71a571887bfc17`

```diff
--- a/products/entry/src/main/ets/viewmodels/MainEntryVM.ets
+++ b/products/entry/src/main/ets/viewmodels/MainEntryVM.ets
@@ -1,69 +1,86 @@
 import { AppStorageV2 } from '@kit.ArkUI';
-import { BaseViewModel, BreakpointNameEnum, ContextUtil, RouterModule } from 'lib_foundation';
-import { PageRouterModel, TabListItem } from '../types';
-
-
-@ObservedV2
-export class MainEntryVM extends BaseViewModel {
-  // 路由栈实例
-  @Trace navStack: NavPathStack = RouterModule.stack;
-  @Trace pageRouter: PageRouterModel = AppStorageV2.connect(PageRouterModel, () => new PageRouterModel())!;
-  // 当前页签
-  @Trace curIndex: number = 0;
-  @Trace firstBackTime: number = 0;
-  tabList: TabListItem[] = [
-    {
-      label: '首页',
-      icon: $r('app.media.ic_home'),
-      iconChecked: $r('app.media.ic_home_selected'),
-    },
-    {
-      label: '查快递',
-      icon: $r('app.media.ic_express'),
-      iconChecked: $r('app.media.ic_express_selected'),
-    },
-    {
-      label: '福利',
-      icon: $r('app.media.ic_gift'),
-      iconChecked: $r('app.media.ic_gift_selected'),
-    },
-    {
-      label: '我的',
-      icon: $r('app.media.ic_mine'),
-      iconChecked: $r('app.media.ic_mine_selected'),
-    }
-  ]
-
-  @Computed
-  get isTabVertical() {
-    return [
-      BreakpointNameEnum.LG,
-      BreakpointNameEnum.XL,
-    ].includes(this.breakPointModel.currentBreakpoint);
-  }
-
-  @Computed
-  get barPosition() {
-    if (this.isTabVertical) {
-      return BarPosition.Start;
-    }
-    return BarPosition.End;
-  }
-
-  @Computed
-  get tabWidth(): Length {
-    if (this.isTabVertical) {
-      return 96;
-    }
-    return '100%';
-  }
-
-  @Computed
-  get tabHeight(): Length {
-    if (this.isTabVertical) {
-      return 400;
-    }
-    return 48;
+import { deviceInfo } from '@kit.BasicServicesKit';
+import { BaseViewModel, BreakpointNameEnum, ContextUtil, RouterModule } from 'lib_foundation';
+import { PageRouterModel, TabListItem } from '../types';
+import type { ImmersiveModifierHolder } from '../utils/ImmersiveCompat';
+
+
+@ObservedV2
+export class MainEntryVM extends BaseViewModel {
+  // 路由栈实例
+  @Trace navStack: NavPathStack = RouterModule.stack;
+  @Trace pageRouter: PageRouterModel = AppStorageV2.connect(PageRouterModel, () => new PageRouterModel())!;
+  // 当前页签
+  @Trace curIndex: number = 0;
+  @Trace firstBackTime: number = 0;
+  // 沉浸光感修饰器（API 26 且设备支持时创建）
+  @Trace immersiveModifierHolder: ImmersiveModifierHolder | undefined = undefined;
+  tabList: TabListItem[] = [
+    {
+      label: '首页',
+      icon: $r('app.media.ic_home'),
+      iconChecked: $r('app.media.ic_home_selected'),
+    },
+    {
+      label: '查快递',
+      icon: $r('app.media.ic_express'),
+      iconChecked: $r('app.media.ic_express_selected'),
+    },
+    {
+      label: '福利',
+      icon: $r('app.media.ic_gift'),
+      iconChecked: $r('app.media.ic_gift_selected'),
+    },
+    {
+      label: '我的',
+      icon: $r('app.media.ic_mine'),
+      iconChecked: $r('app.media.ic_mine_selected'),
+    }
+  ]
+
+  @Computed
+  get isTabVertical() {
+    return [
+      BreakpointNameEnum.LG,
+      BreakpointNameEnum.XL,
+    ].includes(this.breakPointModel.currentBreakpoint);
+  }
+
+  @Computed
+  get barPosition() {
+    if (this.isTabVertical) {
+      return BarPosition.Start;
+    }
+    return BarPosition.End;
+  }
+
+  @Computed
+  get tabWidth(): Length {
+    if (this.isTabVertical) {
+      return 96;
+    }
+    return '100%';
+  }
+
+  @Computed
+  get tabHeight(): Length {
+    if (this.isTabVertical) {
+      return 400;
+    }
+    return 48;
+  }
+
+  // 初始化沉浸光感：仅 API 26 及以上动态加载材质模块，低版本设备保持普通样式
+  async initImmersiveMaterial(): Promise<void> {
+    if (deviceInfo.sdkApiVersion < 26) {
+      return;
+    }
+    try {
+      const compat = await import('../utils/ImmersiveCompat');
+      this.immersiveModifierHolder = compat.createImmersiveModifiers();
+    } catch (err) {
+      this.immersiveModifierHolder = undefined;
+    }
     if (this.isTabVertical) {
       return 400;
     }
```

#### products/entry/src/main/ets/utils/ImmersiveCompat.ets

- 状态：added
- before：`—`
- after：`d88776d8cf64838babab3eb77513fcedd9c11971aa3a6b8c13709e294bc36c00`

```diff
--- a/products/entry/src/main/ets/utils/ImmersiveCompat.ets
+++ b/products/entry/src/main/ets/utils/ImmersiveCompat.ets
@@ -1,1 +1,57 @@
+import { uiMaterial } from '@kit.ArkUI';
+import { deviceInfo } from '@kit.BasicServicesKit';
+
+/**
+ * 沉浸光感 AttributeModifier 持有对象。
+ * 该模块依赖 API 26 的 @ohos.arkui.uiMaterial，只能通过动态 import 加载，
+ * 保证 compatibleSdkVersion 低于 26 的设备不加载本模块、回退普通样式。
+ */
+export interface ImmersiveModifierHolder {
+  titleBar: AttributeModifier<ColumnAttribute>;
+  tabBar: AttributeModifier<TabsAttribute>;
+}
+
+class TitleBarMaterialModifier implements AttributeModifier<ColumnAttribute> {
+  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;
+
+  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
+    this.material = material;
+  }
+
+  applyNormalAttribute(instance: ColumnAttribute): void {
+    instance.systemMaterial(this.material);
+  }
+}
+
+class TabBarMaterialModifier implements AttributeModifier<TabsAttribute> {
+  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;
+
+  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
+    this.material = material;
+  }
+
+  applyNormalAttribute(instance: TabsAttribute): void {
+    instance.barFloatingStyle({ systemMaterial: this.material });
+  }
+}
+
+export function createImmersiveModifiers(): ImmersiveModifierHolder | undefined {
+  let supported = false;
+  try {
+    supported = deviceInfo.sdkApiVersion >= 26 && uiMaterial.isImmersiveMaterialSupported();
+  } catch (err) {
+    supported = false;
+  }
+  if (!supported) {
+    return undefined;
+  }
+  return {
+    titleBar: new TitleBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
+      style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
+    })),
+    tabBar: new TabBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
+      style: uiMaterial.ImmersiveStyle.THIN,
+    })),
+  };
+}
 import { uiMaterial } from '@kit.ArkUI';
```

#### features/business_home/src/main/ets/pages/HomePage.ets

- 状态：modified
- before：`b2400524450b1b7c0fc50a73b7086a3e8ef3216ba8a25d2f54d737d2ba7ea5b1`
- after：`5e73619c03417855d1aeea100a15f761c2cc93dd17ebe30563a32a673755d0d4`

```diff
--- a/features/business_home/src/main/ets/pages/HomePage.ets
+++ b/features/business_home/src/main/ets/pages/HomePage.ets
@@ -15,114 +15,81 @@
 
 @ComponentV2
 export struct HomePage {
-  @Local titleBgOpacity: number = 0;
-  @Local loading: boolean = false;
-  @Local banner: ResourceStr = '';
-  vm: HomePageVM = HomePageVM.instance;
-  scroller: Scroller = new Scroller();
-
-  async aboutToAppear() {
-    this.loading = true
-    this.vm.queryMemberStatus();
-    // mock
-    await new Promise<void>((resolve) => {
-      setTimeout(() => {
-        this.banner = $r('app.media.banner');
-        this.loading = false;
-        resolve()
-      }, 800)
-    })
-
-    // push通知
-    PermissionUtil.requestNotificationPermission();
-  }
-
-  build() {
-    Stack({ alignContent: Alignment.Top }) {
-      Scroll(this.scroller) {
-        Stack({ alignContent: Alignment.Top }) {
-          Image(this.banner)
-            .height(240)
-            .width('100%')
-            .draggable(false)
-
-          Column() {
-            // 第一个内容
-            this.firstContentCard()
-            // 会员和实名认证
-            EventCard({ loading: this.loading })
-            if (this.vm.isTabVertical) {
-              Flex({ space: { main: LengthMetrics.vp(12) }}) {
-                Column() {
-                  // 寄快递和发物流
-                  MainService({ loading: this.loading })
-                  // 广告
-                  this.adViewCard()
-                }
-                .flexGrow(1)
-
-                // 服务
-                ServiceCard({ loading: this.loading }).flexGrow(1)
-              }
-            } else {
-              // 寄快递和发物流
-              MainService({ loading: this.loading })
-              // 服务
-              ServiceCard({ loading: this.loading })
-              // 广告
-              this.adViewCard()
-            }
-          }
-          .width('100%')
-          .padding({
-            left: this.vm.breakPointModel.pagePadding,
-            right: this.vm.breakPointModel.pagePadding,
-            top: this.vm.windowModel.windowTopPadding
-          })
-        }
-      }
-      .width('100%')
-      .height('100%')
-      .align(Alignment.Top)
-      .scrollBar(BarState.Off)
-      .edgeEffect(EdgeEffect.Spring, { alwaysEnabled: true })
-      .onDidScroll(() => {
-        this.titleBgOpacity = this.scroller.currentOffset().yOffset / 56;
-      })
-
-      this.titleBuilder()
-    }
-    .width('100%')
-    .height('100%')
-    .backgroundColor($r('sys.color.background_secondary'))
-  }
-
-  @Builder
-  titleBuilder() {
-    Stack() {
-      Row() {
-        Column().height(56)
-      }
-      .width('100%')
-      .padding({ top: this.vm.windowModel.windowTopPadding })
-      .backgroundColor(Color.White)
-      .opacity(this.titleBgOpacity)
-      .alignSelf(ItemAlign.Stretch)
-
-      Row() {
-        Column() {
-          UISkeleton({ options: [{ type: SkeletonType.TEXT, width: 80, height: 35 }], loading: this.loading }) {
-            Text('首页').fontSize(26).fontWeight(700).height(56)
-          }
-        }
-        .width('100%')
-        .height(56)
-        .padding({ left: 16 })
-        .alignItems(HorizontalAlign.Start)
-      }
-      .width('100%')
-      .padding({ top: this.vm.windowModel.windowTopPadding })
-    }
+  @Local loading: boolean = false;
+  @Local banner: ResourceStr = '';
+  vm: HomePageVM = HomePageVM.instance;
+  scroller: Scroller = new Scroller();
+
+  async aboutToAppear() {
+    this.loading = true
+    this.vm.queryMemberStatus();
+    // mock
+    await new Promise<void>((resolve) => {
+      setTimeout(() => {
+        this.banner = $r('app.media.banner');
+        this.loading = false;
+        resolve()
+      }, 800)
+    })
+
+    // push通知
+    PermissionUtil.requestNotificationPermission();
+  }
+
+  build() {
+    Stack({ alignContent: Alignment.Top }) {
+      Scroll(this.scroller) {
+        Stack({ alignContent: Alignment.Top }) {
+          Image(this.banner)
+            .height(240)
+            .width('100%')
+            .draggable(false)
+
+          Column() {
+            // 第一个内容
+            this.firstContentCard()
+            // 会员和实名认证
+            EventCard({ loading: this.loading })
+            if (this.vm.isTabVertical) {
+              Flex({ space: { main: LengthMetrics.vp(12) }}) {
+                Column() {
+                  // 寄快递和发物流
+                  MainService({ loading: this.loading })
+                  // 广告
+                  this.adViewCard()
+                }
+                .flexGrow(1)
+
+                // 服务
+                ServiceCard({ loading: this.loading }).flexGrow(1)
+              }
+            } else {
+              // 寄快递和发物流
+              MainService({ loading: this.loading })
+              // 服务
+              ServiceCard({ loading: this.loading })
+              // 广告
+              this.adViewCard()
+            }
+          }
+          .width('100%')
+          .padding({
+            left: this.vm.breakPointModel.pagePadding,
+            right: this.vm.breakPointModel.pagePadding,
+            top: this.vm.windowModel.windowTopPadding,
+            bottom: this.vm.isTabVertical ? 0 : 48
+          })
+        }
+      }
+      .width('100%')
+      .height('100%')
+      .align(Alignment.Top)
+      .scrollBar(BarState.Off)
+      .edgeEffect(EdgeEffect.Spring, { alwaysEnabled: true })
+    }
+    .width('100%')
+    .height('100%')
+    .backgroundColor($r('sys.color.background_secondary'))
   }
 
   @Builder
```

#### features/business_order/src/main/ets/pages/OrderPage.ets

- 状态：modified
- before：`0a7c6da79e028d952ca779d796b3b4d0bd905412b4690eab683943f0d02ab3c1`
- after：`1666634fd6b2ae86e86d1c044236a7b5fb46f5e8c5b586654d3d3bd4a07d9c54`

```diff
--- a/features/business_order/src/main/ets/pages/OrderPage.ets
+++ b/features/business_order/src/main/ets/pages/OrderPage.ets
@@ -1,64 +1,61 @@
-import { CommonTitle, CommonUtil, EmitterUtils, ScanUtil } from 'lib_foundation'
-import { OrderListView } from '../components/OrderListView'
-import { StateBar } from '../components/StateBar'
-import { QueryPageVM } from '../viewModels/QueryPageVM'
-
-@ComponentV2
-export struct OrderPage {
-  @Param currentTabIndex: number = 0;
-  @Local queryDelay: number = 0;
-  vm: QueryPageVM = QueryPageVM.instance;
-  controller: TextInputController = new TextInputController();
-  tabController: TabsController = new TabsController();
-  private debouncedQuery = CommonUtil.debounce(() => {
-    // 刷新列表
-    this.vm.isRefreshing = true;
-  });
-
-  @Monitor('currentTabIndex')
-  onChangeTabIndex() {
-    const delay = Date.now();
-    const canQuery = delay - this.queryDelay > 1000;
-    if (this.currentTabIndex === 1 && canQuery) {
-      // 刷新列表
-      this.vm.isRefreshing = true;
-    } else {
-      this.queryDelay = Date.now();
-    }
-  }
-
-  aboutToAppear(): void {
-    this.queryDelay = Date.now();
-    this.vm.queryOrderList(false);
-
-    // 开启监听
-    EmitterUtils.on('refreshOrderList', () => {
-      // 刷新列表
-      this.vm.isRefreshing = true;
-    })
-  }
-
-  aboutToDisappear(): void {
-    EmitterUtils.off('refreshOrderList');
-  }
-
-  build() {
-    Column() {
-      CommonTitle({
-        title: '查快递',
-        fontSize: 26,
-        showBackBtn: false,
-      })
-      Column() {
-        this.searchBtnView()
-        StateBar()
-        this.listContentView()
-      }
-      .width('100%')
-      .layoutWeight(1)
-      .padding({
-        left: this.vm.breakPointModel.pagePadding,
-        right: this.vm.breakPointModel.pagePadding,
+import { CommonUtil, EmitterUtils, ScanUtil } from 'lib_foundation'
+import { OrderListView } from '../components/OrderListView'
+import { StateBar } from '../components/StateBar'
+import { QueryPageVM } from '../viewModels/QueryPageVM'
+
+@ComponentV2
+export struct OrderPage {
+  @Param currentTabIndex: number = 0;
+  @Local queryDelay: number = 0;
+  vm: QueryPageVM = QueryPageVM.instance;
+  controller: TextInputController = new TextInputController();
+  tabController: TabsController = new TabsController();
+  private debouncedQuery = CommonUtil.debounce(() => {
+    // 刷新列表
+    this.vm.isRefreshing = true;
+  });
+
+  @Monitor('currentTabIndex')
+  onChangeTabIndex() {
+    const delay = Date.now();
+    const canQuery = delay - this.queryDelay > 1000;
+    if (this.currentTabIndex === 1 && canQuery) {
+      // 刷新列表
+      this.vm.isRefreshing = true;
+    } else {
+      this.queryDelay = Date.now();
+    }
+  }
+
+  aboutToAppear(): void {
+    this.queryDelay = Date.now();
+    this.vm.queryOrderList(false);
+
+    // 开启监听
+    EmitterUtils.on('refreshOrderList', () => {
+      // 刷新列表
+      this.vm.isRefreshing = true;
+    })
+  }
+
+  aboutToDisappear(): void {
+    EmitterUtils.off('refreshOrderList');
+  }
+
+  build() {
+    Column() {
+      Column() {
+        this.searchBtnView()
+        StateBar()
+        this.listContentView()
+      }
+      .width('100%')
+      .layoutWeight(1)
+      .padding({
+        left: this.vm.breakPointModel.pagePadding,
+        right: this.vm.breakPointModel.pagePadding,
+        top: this.vm.windowModel.windowTopPadding + 56,
+        bottom: this.vm.isTabVertical ? 0 : 48
       })
     }
     .width('100%')
```

#### features/business_benefits/src/main/ets/pages/BenefitPage.ets

- 状态：modified
- before：`9d7c35525ba58a59fe509ad035ddee722ee5d12b0c50d3a8913634fa893be34a`
- after：`b371d6590467764ec811c1edfa19df3c9d78d6691ce2f7937cd2bff6549b26e8`

```diff
--- a/features/business_benefits/src/main/ets/pages/BenefitPage.ets
+++ b/features/business_benefits/src/main/ets/pages/BenefitPage.ets
@@ -2,186 +2,197 @@
 import { common } from '@kit.AbilityKit';
 import {
   BreakpointModel,
-  CommonTitle,
-  CommonUtil,
-  HttpApi,
-  Logger,
-  PageStatus,
-  RouterMap,
-  RouterModule,
-  ToastLoading,
-  UserInfoModel,
-  WindowInfo,
-} from 'lib_foundation';
-import { SignStatus } from '../commons/Enum';
-import { CouponListSection } from '../components/CouponListSection';
-import { TaskListSection } from '../components/TaskListSection';
-
-
-@ComponentV2
-export struct BenefitPage {
-  @Param isTabPage: boolean = true;
-  @Local userInfoModel: UserInfoModel = PersistenceV2.connect(UserInfoModel, () => new UserInfoModel())!;
-  @Local windowModel: WindowInfo = AppStorageV2.connect(WindowInfo, () => new WindowInfo())!;
-  @Local breakPointModel: BreakpointModel = AppStorageV2.connect(BreakpointModel, () => new BreakpointModel())!;
-  @Local signMask: number = 0;
-  @Local todayIdx: number = 0;
-  @Local rewards: number[] = [5, 5, 5, 5, 5, 5, 10];
-  // 页面状态
-  @Local pageStatus: PageStatus = PageStatus.IDLE;
-  @Local curTabBtnIndex: number = 0;
-  // scroll方向
-  @Local scrollDir: ScrollDirection = ScrollDirection.None;
-
-  context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
-
-  @Computed
-  get countSigned() {
-    return this.signMask.toString(2).split('1').length - 1;
-  }
-
-  @Computed
-  get isTodaySigned() {
-    return (this.signMask & (1 << this.todayIdx)) !== 0;
-  }
-
-  aboutToAppear(): void {
-    this.pageStatus = PageStatus.LOADING;
-    ToastLoading.open();
-    this.todayIdx = (new Date().getDay() || 7) - 1;
-    this.loadData();
-    this.handleSplitScreen();
-  }
-
-  async loadData() {
-    const monday = CommonUtil.getMondayTimestamp();
-    const data = await HttpApi.queryWeeklyData(this.userInfoModel.id, monday);
-    this.signMask = Number(data.signMask);
-    this.pageStatus = PageStatus.SUCCESS;
-    ToastLoading.close();
-  }
-
-  handleSplitScreen() {
-    const windowStage = AppStorage.get('windowStage') as window.WindowStage;
-    try {
-      const windowClass = windowStage.getMainWindowSync();
-      let customerWindowStatusType: WindowStatusType = windowClass.getWindowStatus();
-      if (customerWindowStatusType === 5) {
-        this.scrollDir = ScrollDirection.Vertical;
-      } else {
-        this.scrollDir = ScrollDirection.None;
-      }
-      windowClass.on('windowStatusChange', (windowStatusType) => {
-        if (windowStatusType === 5) {
-          this.scrollDir = ScrollDirection.Vertical;
-        } else {
-          this.scrollDir = ScrollDirection.None;
-        }
-      });
-    } catch (error) {
-      Logger.error(`handleSplitScreen failed. error: ${JSON.stringify(error)}`)
-    }
-  }
-
-  getSignBg(index: number) {
-    if ((this.signMask & (1 << index)) !== 0) {
-      return $r('app.media.ic_checked');
-    }
-    if (index < this.todayIdx) {
-      return $r('app.media.ic_expired');
-    }
-    return $r('app.media.ic_no_checked');
-  }
-
-  // 判断状态：已签到、已过期、普通
-  signStatus(index: number) {
-    if ((this.signMask & (1 << index)) !== 0) {
-      return SignStatus.SIGNED
-    }
-    if (index < this.todayIdx) {
-      return SignStatus.EXPIRED;
-    }
-    return SignStatus.NORMAL;
-  }
-
-  // 签到
-  async handleSign() {
-    ToastLoading.open();
-    const monday = CommonUtil.getMondayTimestamp();
-    const userId = this.userInfoModel.id;
-    const points = this.rewards[this.todayIdx]
-    const success = await HttpApi.doSign(userId, this.todayIdx, points, monday);
-
-    if (success) {
-      this.loadData();
-      // 查询用户积分
-      this.getUserPoints();
-    }
-  }
-
-  // 查询用户积分
-  getUserPoints() {
-    HttpApi.queryUserInfo(this.userInfoModel.phone).then((resp) => {
-      if (resp) {
-        this.userInfoModel.points = resp.points;
-      }
-    })
-  }
-
-  build() {
-    Column() {
-      CommonTitle({
-        title: '福利',
-        showBackBtn: !this.isTabPage,
-        fontSize: this.isTabPage ? 26 : 20
-      })
-
-      if (this.pageStatus === PageStatus.SUCCESS) {
-        Scroll() {
-          Column() {
-            // 积分总览
-            this.pointsOverview()
-
-            Text(this.isTodaySigned ? '今日积分已领取，每100积分可抵扣快递费5元' :
-              '今天还没有签到，快点击签到领取积分吧~')
-              .fontSize(12)
-              .fontColor($r('sys.color.font_primary'))
-              .fontWeight(FontWeight.Regular)
-              .lineHeight(16)
-              .margin({ top: 2 })
-
-            // 签到
-            this.signCardView()
-
-            // 优惠券和日常任务tab
-            this.tabBtnBuilder()
-
-            // 内容区域
-            Tabs({ barPosition: BarPosition.Start, index: this.curTabBtnIndex }) {
-              TabContent() {
-                // 优惠券列表组件
-                CouponListSection()
-              }
-              TabContent() {
-                // 日常任务列表组件
-                TaskListSection()
-              }
-            }
-            .width('100%')
-            .layoutWeight(this.scrollDir === ScrollDirection.None ? 1 : 0)
-            .height(this.scrollDir === ScrollDirection.None ? 'auto' : '100%')
-            .margin({ top: 12 })
-            .barHeight(0)
-            .scrollable(false)
-            .onChange((index: number) => {
-              this.curTabBtnIndex = index;
-            })
-          }
-          .width('100%')
-          .padding({
-            left: this.breakPointModel.pagePadding,
-            right: this.breakPointModel.pagePadding,
-            top: 12,
+  BreakpointNameEnum,
+  CommonTitle,
+  CommonUtil,
+  HttpApi,
+  Logger,
+  PageStatus,
+  RouterMap,
+  RouterModule,
+  ToastLoading,
+  UserInfoModel,
+  WindowInfo,
+} from 'lib_foundation';
+import { SignStatus } from '../commons/Enum';
+import { CouponListSection } from '../components/CouponListSection';
+import { TaskListSection } from '../components/TaskListSection';
+
+
+@ComponentV2
+export struct BenefitPage {
+  @Param isTabPage: boolean = true;
+  @Local userInfoModel: UserInfoModel = PersistenceV2.connect(UserInfoModel, () => new UserInfoModel())!;
+  @Local windowModel: WindowInfo = AppStorageV2.connect(WindowInfo, () => new WindowInfo())!;
+  @Local breakPointModel: BreakpointModel = AppStorageV2.connect(BreakpointModel, () => new BreakpointModel())!;
+  @Local signMask: number = 0;
+  @Local todayIdx: number = 0;
+  @Local rewards: number[] = [5, 5, 5, 5, 5, 5, 10];
+  // 页面状态
+  @Local pageStatus: PageStatus = PageStatus.IDLE;
+  @Local curTabBtnIndex: number = 0;
+  // scroll方向
+  @Local scrollDir: ScrollDirection = ScrollDirection.None;
+
+  context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
+
+  @Computed
+  get countSigned() {
+    return this.signMask.toString(2).split('1').length - 1;
+  }
+
+  @Computed
+  get isTodaySigned() {
+    return (this.signMask & (1 << this.todayIdx)) !== 0;
+  }
+
+  @Computed
+  get isTabVertical() {
+    return [
+      BreakpointNameEnum.LG,
+      BreakpointNameEnum.XL,
+    ].includes(this.breakPointModel.currentBreakpoint);
+  }
+
+  aboutToAppear(): void {
+    this.pageStatus = PageStatus.LOADING;
+    ToastLoading.open();
+    this.todayIdx = (new Date().getDay() || 7) - 1;
+    this.loadData();
+    this.handleSplitScreen();
+  }
+
+  async loadData() {
+    const monday = CommonUtil.getMondayTimestamp();
+    const data = await HttpApi.queryWeeklyData(this.userInfoModel.id, monday);
+    this.signMask = Number(data.signMask);
+    this.pageStatus = PageStatus.SUCCESS;
+    ToastLoading.close();
+  }
+
+  handleSplitScreen() {
+    const windowStage = AppStorage.get('windowStage') as window.WindowStage;
+    try {
+      const windowClass = windowStage.getMainWindowSync();
+      let customerWindowStatusType: WindowStatusType = windowClass.getWindowStatus();
+      if (customerWindowStatusType === 5) {
+        this.scrollDir = ScrollDirection.Vertical;
+      } else {
+        this.scrollDir = ScrollDirection.None;
+      }
+      windowClass.on('windowStatusChange', (windowStatusType) => {
+        if (windowStatusType === 5) {
+          this.scrollDir = ScrollDirection.Vertical;
+        } else {
+          this.scrollDir = ScrollDirection.None;
+        }
+      });
+    } catch (error) {
+      Logger.error(`handleSplitScreen failed. error: ${JSON.stringify(error)}`)
+    }
+  }
+
+  getSignBg(index: number) {
+    if ((this.signMask & (1 << index)) !== 0) {
+      return $r('app.media.ic_checked');
+    }
+    if (index < this.todayIdx) {
+      return $r('app.media.ic_expired');
+    }
+    return $r('app.media.ic_no_checked');
+  }
+
+  // 判断状态：已签到、已过期、普通
+  signStatus(index: number) {
+    if ((this.signMask & (1 << index)) !== 0) {
+      return SignStatus.SIGNED
+    }
+    if (index < this.todayIdx) {
+      return SignStatus.EXPIRED;
+    }
+    return SignStatus.NORMAL;
+  }
+
+  // 签到
+  async handleSign() {
+    ToastLoading.open();
+    const monday = CommonUtil.getMondayTimestamp();
+    const userId = this.userInfoModel.id;
+    const points = this.rewards[this.todayIdx]
+    const success = await HttpApi.doSign(userId, this.todayIdx, points, monday);
+
+    if (success) {
+      this.loadData();
+      // 查询用户积分
+      this.getUserPoints();
+    }
+  }
+
+  // 查询用户积分
+  getUserPoints() {
+    HttpApi.queryUserInfo(this.userInfoModel.phone).then((resp) => {
+      if (resp) {
+        this.userInfoModel.points = resp.points;
+      }
+    })
+  }
+
+  build() {
+    Column() {
+      if (!this.isTabPage) {
+        CommonTitle({
+          title: '福利',
+          showBackBtn: true,
+          fontSize: 20
+        })
+      }
+      if (this.pageStatus === PageStatus.SUCCESS) {
+        Scroll() {
+          Column() {
+            // 积分总览
+            this.pointsOverview()
+
+            Text(this.isTodaySigned ? '今日积分已领取，每100积分可抵扣快递费5元' :
+              '今天还没有签到，快点击签到领取积分吧~')
+              .fontSize(12)
+              .fontColor($r('sys.color.font_primary'))
+              .fontWeight(FontWeight.Regular)
+              .lineHeight(16)
+              .margin({ top: 2 })
+
+            // 签到
+            this.signCardView()
+
+            // 优惠券和日常任务tab
+            this.tabBtnBuilder()
+
+            // 内容区域
+            Tabs({ barPosition: BarPosition.Start, index: this.curTabBtnIndex }) {
+              TabContent() {
+                // 优惠券列表组件
+                CouponListSection()
+              }
+              TabContent() {
+                // 日常任务列表组件
+                TaskListSection()
+              }
+            }
+            .width('100%')
+            .layoutWeight(this.scrollDir === ScrollDirection.None ? 1 : 0)
+            .height(this.scrollDir === ScrollDirection.None ? 'auto' : '100%')
+            .margin({ top: 12 })
+            .barHeight(0)
+            .scrollable(false)
+            .onChange((index: number) => {
+              this.curTabBtnIndex = index;
+            })
+          }
+          .width('100%')
+          .padding({
+            left: this.breakPointModel.pagePadding,
+            right: this.breakPointModel.pagePadding,
+            top: this.isTabPage ? this.windowModel.windowTopPadding + 56 + 12 : 12,
+            bottom: this.isTabPage && !this.isTabVertical ? 48 : 0
             .scrollable(false)
             .onChange((index: number) => {
               this.curTabBtnIndex = index;
```

#### features/business_mine/src/main/ets/pages/MinePage.ets

- 状态：modified
- before：`0fa69b52c571e4c83feb45c767c23831302b5805b0009496f5bb08f1e71323e4`
- after：`767d9f0a23808514da7b042442a637b271d5ac417c0f3a79a1501c1ca05860b0`

```diff
--- a/features/business_mine/src/main/ets/pages/MinePage.ets
+++ b/features/business_mine/src/main/ets/pages/MinePage.ets
@@ -1,29 +1,25 @@
-import { CommonTitle } from 'lib_foundation';
-import { CommonServiceView } from '../components/CommonServiceView';
-import { LoginAvatarCard } from '../components/LoginAvatarCard';
-import { MainService } from '../components/MainService';
-import { MinePageVM } from '../viewModels/MinePageVM';
-
-@ComponentV2
-export struct MinePage {
-  vm: MinePageVM = MinePageVM.instance;
-
-  build() {
-    Column() {
-      CommonTitle({
-        title: '我的',
-        showBackBtn: false,
-        fontSize: 26
-      })
-      Scroll() {
-        Column({ space: 12 }) {
-          LoginAvatarCard()
-          MainService()
-          CommonServiceView()
-        }
-        .padding({
-          left: this.vm.breakPointModel.pagePadding,
-          right: this.vm.breakPointModel.pagePadding,
+import { CommonServiceView } from '../components/CommonServiceView';
+import { LoginAvatarCard } from '../components/LoginAvatarCard';
+import { MainService } from '../components/MainService';
+import { MinePageVM } from '../viewModels/MinePageVM';
+
+@ComponentV2
+export struct MinePage {
+  vm: MinePageVM = MinePageVM.instance;
+
+  build() {
+    Column() {
+      Scroll() {
+        Column({ space: 12 }) {
+          LoginAvatarCard()
+          MainService()
+          CommonServiceView()
+        }
+        .padding({
+          left: this.vm.breakPointModel.pagePadding,
+          right: this.vm.breakPointModel.pagePadding,
+          top: this.vm.windowModel.windowTopPadding + 56,
+          bottom: this.vm.isTabVertical ? 0 : 48
         })
       }
       .width('100%')
```

#### features/business_order/src/main/ets/viewModels/QueryPageVM.ets

- 状态：modified
- before：`9c3f0377f3f7a6a56e945d3ff1b06c2da54e1d6c2071bb23fff24c65994367af`
- after：`07e72587ae0b17d2d0c5383d58226052ce14aec3a08074cc4dafc5cc010ae0be`

```diff
--- a/features/business_order/src/main/ets/viewModels/QueryPageVM.ets
+++ b/features/business_order/src/main/ets/viewModels/QueryPageVM.ets
@@ -16,6 +16,14 @@
 export class QueryPageVM extends BaseViewModel {
   private static _instance: QueryPageVM;
 
+  @Computed
+  get isTabVertical() {
+    return [
+      BreakpointNameEnum.LG,
+      BreakpointNameEnum.XL,
+    ].includes(this.breakPointModel.currentBreakpoint);
+  }
+
   @Computed
   get isTabVertical() {
     return [
```

#### features/business_mine/src/main/ets/viewModels/MinePageVM.ets

- 状态：modified
- before：`bf3c22ac2a2d39df011e2e6c9a6b073ec059ae47b2efe1e521c2111771ed34e0`
- after：`872671d266c98df09b0442639ac5943dd09d570775563e86469926589804352a`

```diff
--- a/features/business_mine/src/main/ets/viewModels/MinePageVM.ets
+++ b/features/business_mine/src/main/ets/viewModels/MinePageVM.ets
@@ -1,14 +1,22 @@
-import { BaseViewModel } from 'lib_foundation'
-
-@ObservedV2
-export class MinePageVM extends BaseViewModel {
-  private static _instance: MinePageVM;
-
-  public static get instance() {
-    if (!MinePageVM._instance) {
-      MinePageVM._instance = new MinePageVM();
-    }
-    return MinePageVM._instance;
+import { BaseViewModel, BreakpointNameEnum } from 'lib_foundation'
+
+@ObservedV2
+export class MinePageVM extends BaseViewModel {
+  private static _instance: MinePageVM;
+
+  public static get instance() {
+    if (!MinePageVM._instance) {
+      MinePageVM._instance = new MinePageVM();
+    }
+    return MinePageVM._instance;
+  }
+
+  @Computed
+  get isTabVertical() {
+    return [
+      BreakpointNameEnum.LG,
+      BreakpointNameEnum.XL,
+    ].includes(this.breakPointModel.currentBreakpoint);
   }
 
   @Computed
```

### 待验证

- PENDING-001 [install] 未请求运行验证。
- PENDING-002 [runtime] 未请求运行验证。
- PENDING-003 [visual] 没有截图、录屏、模型判定或用户明确观察，不能判定视觉成功。

### 证据

- EVID-001 [static] 场景静态规则：passed
- EVID-002 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/api/@ohos.arkui.uiMaterial.d.ts
- EVID-003 [sdk_declaration] 本机 SDK 声明文件 — E:/DevEco Studio/sdk/default/openharmony/ets/component/common.d.ts
- EVID-004 [build_log] devecocli build 成功 — D:\HW\testproject\complete\Express\ohos-feature-engineering\evidence\a810d9a6-0bbf-48f0-9850-4ab2bc5d9a5a\build.log
