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
    Navigation(this.exploreStack, {name: 'explore'})
      .hideTitleBar(true)
      .expandSafeArea([SafeAreaType.SYSTEM])
  }

  @Builder
  tabGameContent() {
    // 通过系统路由表的方式配置对应的页面跳转
    Navigation(this.gameStack, {name: 'game'})
      .hideTitleBar(true)
      .expandSafeArea([SafeAreaType.SYSTEM])
  }

  build() {
    Tabs({ index: this.currentTab }) {
      TabContent() {
        ExploreHomePage()
      }.tabBar(this.BottomTabBarItem('探索', $r('sys.symbol.compass'), 0))
      // 内容区延伸到状态栏区域，形成整体的交互体验
      .expandSafeArea([SafeAreaType.SYSTEM])

      TabContent() {
        this.tabGameContent()
      }.tabBar(this.BottomTabBarItem('游戏', $r('sys.symbol.gamecontroller'), 1))
      .expandSafeArea([SafeAreaType.SYSTEM])

      TabContent() {
      }.tabBar(this.BottomTabBarItem('应用', $r('sys.symbol.grid'), 2))

      TabContent() {
      }.tabBar(this.BottomTabBarItem('元服务', $r('sys.symbol.gearshape'), 3))
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


interface ListItemData {
  name: string;
  icon: Resource;
  id: string;
}

@ComponentV2
struct ExploreHomePage {
  @Local currentIndex: number = 0
  @Local searchOpacity: number = 1
  @Local classifyType: Array<string> = [
    '策略', '动作', '竞技', '射击', '卡牌', '体育', '休闲', '音乐'
  ]
  listItems: Array<ListItemData> = [
    { name: '星穹远征', icon: $r('sys.symbol.star_fill'), id: '1' },
    { name: '罗盘物语', icon: $r('sys.symbol.compass'), id: '2' },
    { name: '云端竞速', icon: $r('sys.symbol.gamecontroller'), id: '3' },
    { name: '方阵迷局', icon: $r('sys.symbol.grid'), id: '4' },
    { name: '齿轮传说', icon: $r('sys.symbol.gearshape'), id: '5' },
    { name: '星海拾贝', icon: $r('sys.symbol.star_fill'), id: '6' },
    { name: '远航纪元', icon: $r('sys.symbol.compass'), id: '7' },
    { name: '斗技场', icon: $r('sys.symbol.gamecontroller'), id: '8' },
    { name: '齿轮传说', icon: $r('sys.symbol.gearshape'), id: '9' },
    { name: '星海拾贝', icon: $r('sys.symbol.star_fill'), id: '10' },
    { name: '远航纪元', icon: $r('sys.symbol.compass'), id: '11' },
    { name: '斗技场', icon: $r('sys.symbol.gamecontroller'), id: '12' }
  ];
  titleHeight:number = 150
  @Local scrollOffset: number = 0
  @Local titleOffset: number = 0
  @Builder
  exploreTitleBar() {
    Column() {
      Row() {
        Text('探索').fontSize(28).fontWeight(FontWeight.Bold).fontColor('#1A1A1A')
        Blank()
        Search({ placeholder: '探索探索' })
          .searchButton('搜索')
          .height(40)
          .width(220)
          .systemMaterial(new uiMaterial.ImmersiveMaterial({}))
      }.expandSafeArea([SafeAreaType.SYSTEM])
      .width('100%')
      .opacity(this.searchOpacity)
      .height(50)

      List({space: 12}) {
        ForEach(this.classifyType, (item: string, index: number) => {
          ListItem() {
            Row() {
              SymbolGlyph($r('sys.symbol.star_fill'))
                .fontSize(20)
                .fontColor(['#d3d3d3'])
                .margin({left: 16})
              Text(item)
                .fontSize(16)
                .fontColor(this.currentIndex === index ? Color.White : '#666666')
                .padding({ left: 4, right: 12, top: 6, bottom: 6})
            }.borderRadius(16)
            .systemMaterial(new uiMaterial.ImmersiveMaterial({
              materialColor: this.currentIndex === index ? '#333333' : undefined,
              lightEffect: {color: Color.White}
            }))
          }
        })
      }.listDirection(Axis.Horizontal)
      .width('100%')
      .scrollBar(BarState.Off)
      .margin(5)
    }.expandSafeArea([SafeAreaType.SYSTEM])
    .width('100%')
    .height(this.titleHeight)
    .padding({ left: 20, right: 20})
    .position({x: 0, y: -this.titleOffset})
    // 设置Column组件开启沉浸光感
    .systemMaterial(new uiMaterial.ImmersiveMaterial({
      style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
    }))
  }

  build() {
    NavDestination() {
      Scroll() {
        // 滑动区域的具体内容
        Column() {
          Image($r('app.media.startIcon')).width('100%').height(180)
            .borderRadius(12)
            .backgroundColor('#e0e0e0')
            .objectFit(ImageFit.Cover)

          List() {
            // 开发者需要自定义参数listItems, 示例中的数据结构为 interface ListItemData { name: string; image: Resource; id: string}
            ForEach(this.listItems, (item: ListItemData) => {
              ListItem() {
                Row() {
                  SymbolGlyph(item.icon).fontSize(36)
                    .fontColor(['#007dff'])
                    .margin({ right: 16})
                  Text(item.name).fontSize(16)
                    .fontColor('#333333')
                }.width('100%')
                .padding({ left: 20, right: 20, top: 14, bottom: 14 })
              }
            }, (item: ListItemData) => item.id)
          }
        }
      }
      // 避让标题栏显示区域
      .contentStartOffset(this.titleHeight)
      .scrollable(ScrollDirection.Vertical)
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
      .width('100%')
      .height('100%')
      .onDidScroll((xOffset: number, yOffset: number, state: ScrollState) => {
        this.scrollOffset += yOffset
        // 搜索框大小范围内
        if (this.scrollOffset <= 50) {
          this.titleOffset = this.scrollOffset;
          this.searchOpacity = 1 - this.titleOffset / 50
        }
      })
    }.title(
      { builder: this.exploreTitleBar, height: this.titleHeight },
      { barStyle: BarStyle.STACK,
        systemMaterial: new uiMaterial.ImmersiveMaterial({})
      }
    ).hideBackButton(true)
    .expandSafeArea([SafeAreaType.SYSTEM])
  }
}