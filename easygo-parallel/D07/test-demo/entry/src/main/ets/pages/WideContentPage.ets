interface DemoItem {
  id: number
  name: string
  desc: string
}



@Component
export struct WideContentPage {
  @State item: DemoItem = { id: 0, name: '固定宽内容', desc: '' }

  build() {
    NavDestination() {
      Column({ space: 16 }) {
        Text(this.item.name)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
        Text('下方色块固定宽 600lpx：虚拟容器关闭时按原始窗口尺寸计算，分栏内可能被截断；开启后按右侧页面尺寸计算，可完整显示。')
          .fontSize(13)
          .fontColor('#CCFFFFFF')
        Row() {
          Text('| 0')
            .fontSize(12)
            .fontColor('#FFFFFFFF')
            .fontWeight(FontWeight.Bold)
          Blank()
          Text('600lpx |')
            .fontSize(12)
            .fontColor('#FFFFFFFF')
            .fontWeight(FontWeight.Bold)
        }
        .width('600lpx')
        Row() {
          Text('')
        }
        .width('600lpx')
        .height(80)
        .linearGradient({
          angle: 90,
          colors: [['#FF3D71', 0.0], ['#FF8F3D', 0.5], ['#FFD23D', 1.0]]
        })
        .borderRadius(4)
        Row() {
          Text('左边界标尺')
            .fontSize(12)
            .fontColor('#FFFFFFFF')
          Blank()
          Text('右边界标尺')
            .fontSize(12)
            .fontColor('#FFFFFFFF')
        }
        .width('600lpx')
      }
      .width('100%')
      .height('100%')
      .padding(24)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.Center)
      .backgroundImage($r('app.media.background'))
      .backgroundImageSize(ImageSize.Cover)
      .backgroundImagePosition(Alignment.Center)
    }
    .title('固定宽内容页')
    .onReady((context: NavDestinationContext) => {
      this.item = context.pathInfo.param as DemoItem
    })
    .width('100%')
    .height('100%')
  }
}
