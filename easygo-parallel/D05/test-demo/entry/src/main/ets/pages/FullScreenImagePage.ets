interface GoodsItem {
  id: number
  name: string
  price: string
}

@Component
export struct FullScreenImagePage {
  @State item: GoodsItem = { id: 0, name: '商品大图', price: '' }
  private navStack: NavPathStack | undefined = undefined

  build() {
    NavDestination() {
      Stack() {
        Image($r('app.media.background'))
          .width('100%')
          .height('100%')
          .objectFit(ImageFit.Cover)
        Column({ space: 12 }) {
          Text('全屏图片页（已退出分栏）')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFFFF')
          Text(this.item.name)
            .fontSize(16)
            .fontColor('#FFFFFFFF')
          Button('返回分栏')
            .fontSize(16)
            .margin({ top: 16 })
            .onClick(() => {
              this.navStack?.pop()
            })
        }
        .width('100%')
        .height('100%')
        .padding(24)
        .justifyContent(FlexAlign.Center)
      }
      .width('100%')
      .height('100%')
      .backgroundImage($r('app.media.background'))
      .backgroundImageSize(ImageSize.Cover)
      .backgroundImagePosition(Alignment.Center)
    }
    .title('全屏图片')
    .hideTitleBar(true)
    .onReady((context: NavDestinationContext) => {
      this.item = context.pathInfo.param as GoodsItem
      this.navStack = context.pathStack
    })
    .width('100%')
    .height('100%')
  }
}
