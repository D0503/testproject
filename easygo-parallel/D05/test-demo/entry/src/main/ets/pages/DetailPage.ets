interface GoodsItem {
  id: number
  name: string
  price: string
}

@Component
export struct DetailPage {
  @State item: GoodsItem = { id: 0, name: '商品详情', price: '' }
  private navStack: NavPathStack | undefined = undefined

  build() {
    NavDestination() {
      Column({ space: 12 }) {
        Text('详情页（右侧分栏）')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
        Text(this.item.name)
          .fontSize(16)
          .fontColor('#FFFFFFFF')
        Text(this.item.price)
          .fontSize(16)
          .fontColor('#CCFFFFFF')
        Button('查看大图')
          .fontSize(16)
          .margin({ top: 16 })
          .onClick(() => {
            this.navStack?.pushPath({ name: 'FullScreenImagePage', param: this.item })
          })
      }
      .width('100%')
      .height('100%')
      .padding(24)
      .justifyContent(FlexAlign.Center)
      .backgroundImage($r('app.media.background'))
      .backgroundImageSize(ImageSize.Cover)
      .backgroundImagePosition(Alignment.Center)
    }
    .title('商品详情')
    .onReady((context: NavDestinationContext) => {
      this.item = context.pathInfo.param as GoodsItem
      this.navStack = context.pathStack
    })
    .width('100%')
    .height('100%')
  }
}
