import { uiMaterial } from '@kit.ArkUI'

@Entry
@ComponentV2
struct BestPractise {
  @Local currentTab: number = 0
  exploreStack: NavPathStack = new NavPathStack()
  gameStack: NavPathStack = new NavPathStack()

  @Builder
  BottomTabBarItem(title: string, icon: Resource, index: number) {
    Column() {
      SymbolGlyph(icon)
        .fontSize(22)
        .fontColor(this.currentTab === index ? ['#007dff'] : ['#999999'])
      Text(title)
        .fontSize(10)
        .fontColor(this.currentTab === index ? '#007dff' : '#999999')
        .margin({ top: 2 })
    }.justifyContent(FlexAlign.Center)
    .width('100%')
    .height('100%')
  }

  @Builder
  tabExploreContent() {
    // 通过系统路由表的方式配置对应的页面跳转
    Navigation(this.exploreStack, { name: 'explore' })
      .hideTitleBar(true)
      .expandSafeArea([SafeAreaType.SYSTEM])
  }

  @Builder
  tabGameContent() {
    // 通过系统路由表的方式配置对应的页面跳转
    Navigation(this.gameStack, { name: 'game' })
      .hideTitleBar(true)
      .expandSafeArea([SafeAreaType.SYSTEM])
  }

  build() {
    Tabs({ index: this.currentTab }) {
      TabContent() {
        this.tabExploreContent()
      }.tabBar(this.BottomTabBarItem('探索', $r('sys.symbol.compass'), 0))
      // 内容区延伸到状态栏区域，形成整体的交互体验
      .expandSafeArea([SafeAreaType.SYSTEM])

      TabContent() {
        this.tabGameContent()
      }.tabBar(this.BottomTabBarItem('游戏', $r('sys.symbol.gamecontroller'), 1))
      .expandSafeArea([SafeAreaType.SYSTEM])
    }
    .barPosition(BarPosition.End)
    .barMode(BarMode.Fixed)
    .barOverlap(true)
    .barHeight(56)
    .barFloatingStyle({ barBottomMargin: 8, systemMaterial: new uiMaterial.ImmersiveMaterial({}) })
    .scrollable(true)
    .expandSafeArea([SafeAreaType.SYSTEM])
    .onChange((index: number) => {
      this.currentTab = index
    })
  }
}
