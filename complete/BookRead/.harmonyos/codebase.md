# BookRead 工程结构研究结论

日期：2026-09-11 | 范围：只读研究，未修改任何业务文件

## 1. BookShelfPage（书架页）

- 文件：`feature/book_shelf/src/main/ets/views/BookShelfPage.ets`（注意目录是 views 不是 pages）
- Builder：`BookShelfPageBuilder()`（L32-35），仅调用 `BookShelfPage()` 组件；组件为 `@ComponentV2`（L37-38）
- 顶部标题栏：使用公共自定义组件 `NavHeaderBar`（L981-1000，参数 isShelf/isMainPage 等），非系统标题栏
  - NavHeaderBar 实现：`commons/common/src/main/ets/ui/CommonUI.ets` L156-472
  - 结构：`Column > Row`（build 在 L356-471），高度 `56 + windowTopHeight`（状态栏高度取自 AppStorage 'windowTopHeight'，默认 38.77）
  - isShelf 时右侧有搜索图标按钮（跳 SEARCH_ROUTE，L404-415）与"更多"按钮（bindContextMenu 弹 Menu，L416-431、selectMenu L316-354）
- 根容器：`Stack({ alignContent: Alignment.BottomStart })`（L979），内层 `Column`（L980）放 NavHeaderBar + 内容
- 内容区：阅读信息/签到卡片 Row（L1003-1011）→ `Scroll() > Column`（L1013-1021）内按 isGrid 切换 `bookShelfGrid()`（Grid，L354-447）或 `bookShelfList()`（Scroll+ForEach，L873-976）
- Scroller：有。`scroller: Scroller = new Scroller()`（L61），被 Grid（L357、L676）与列表模式 Scroll（L875）复用
- 页面本身不是 NavDestination，是 Tabs 内 TabContent 的内容

## 2. BookListPage（书城/首页）

- 文件：`feature/book_home/src/main/ets/views/BookListPage.ets`（views 目录）
- Builder：`BookListPageBuilder()`（L20-23）；组件 `@ComponentV2`（L26-27）
- 顶部标题栏：完全自定义 Row，不用 NavHeaderBar、不用系统标题栏：
  - 状态栏占位 Row（L180-184，高 windowTopHeight，模糊背景）
  - 标题 Row（L185-199）：Text "首页/书城"，`.position({ y: headerPosition })` + `.zIndex(10)` 随滚动悬浮吸顶
  - 搜索按钮（L246-263）：Stack 右上角圆形 SymbolGlyph（magnifyingglass），onClick `TCRouter.push(Constants.SEARCH_ROUTE)`
- 根容器：`Stack({ alignContent: Alignment.TopEnd })`（L178）
- 内容：`List({ scroller: this.scroller })`（L201），`ListItemGroup({ header: this.categoryTab() })` sticky 吸顶（L208、L228），nestedScroll（L232-235），onDidScroll 联动 headerPosition（L236-240）
- Scroller：有。`scroller`（L42，List 主滚动）、`rowScroller`（L43，横向分类 tab Scroll，L119）

## 3. book_sort / book_person 根容器（简要）

- `feature/book_sort/src/main/ets/pages/BookSortPage.ets`：根容器 `Column()`（L170-196），顶部 NavHeaderBar（L172，isMainPage 无返回键），中间横向分类 Scroll，下方双 List 二级分类联动（L98-168，navTitleScroller/bookListScroller L28-29）
- `feature/book_person/src/main/ets/views/PersonPage.ets`：根容器 `Stack({ alignContent: Alignment.TopStart })`（L31；L30 有被注释掉的 NavDestination），内层 Column > headBarView（自定义 @Builder 标题，L74+）+ Scroll > Column（L34-57）

## 4. Tabs( / Navigation( 使用位置

Tabs(：
- `entry/src/main/ets/pages/BookHomePage.ets` L67（主页底部/侧边 Tab 导航，位于 NavDestination 内，平板时 vertical）
- `feature/book_person/src/main/ets/views/LibraryPage.ets` L37

Navigation(：
- `entry/src/main/ets/pages/Index.ets` L152（`Navigation(TCRouter.getStack())`，hideNavBar+hideTitleBar，Stack 模式，navDestination=routerMap 分发 Builder）
- `components/membership/src/main/ets/util/MemberSheetUtils.ets` L24（`Navigation(this.sheetStack)`，Sheet 内独立导航栈）

路由架构：Index.ets（Navigation 根）→ BookHomePage（NavDestination + Tabs）→ 各 Tab 页（BookShelfPage/BookListPage/BookSortPage/PersonPage）；二级页通过 TCRouter push 到 Navigation 栈。

## 5. TCRouter（commons/common）

- 文件：`commons/common/src/main/ets/comp/TCRouter.ets`
- 静态类持有全局唯一 `private static pathStack: NavPathStack`（L4）；`init()` 中 `new NavPathStack()`（L6-8）
- `getStack(): NavPathStack` 直接返回该静态栈（L32-34）
- 其余 API：push（L10）、pushByLogin（L14，未登录跳 LOGIN_ROUTE）、pop（L24）、replace（L28）、getParams（L36，取 getParamByName 最后一个）

## 6. @kit.UIDesignKit 使用情况

- 工程 .ets 源代码中无任何使用
- 仅出现在 `ohos-feature-engineering/` 文档目录中（frozen/snapshots/hds-tabs-api.md、hds-navigation-api.md、hds-material-api.md、hds-component-material-guide.md、criteria-IL-S011.json），为 HDS 组件 API 快照/规范文档，非实际代码

## 7. entry module.json5 metadata

- 文件：`entry/src/main/module.json5` L55-66
- metadata 仅两项：`client_id`（QQ 互联 AppId，值已脱敏 ******）、`minors_mode`（"1"）
- 无 `ohos.arkui.UIMaterial.state` 配置；extensionAbilities 的 backup metadata 也与 UI 无关（L74-80）
