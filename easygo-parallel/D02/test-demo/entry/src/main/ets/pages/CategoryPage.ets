const CATEGORIES: string[] = [
  '数码家电',
  '服饰鞋包',
  '美妆个护',
  '食品饮料',
  '母婴玩具',
  '图书文娱'
]

@Component
export struct CategoryPage {
  build() {
    NavDestination() {
      Column({ space: 12 }) {
        Text('商品分类（关联页）')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
        List({ space: 8 }) {
          ForEach(CATEGORIES, (name: string) => {
            ListItem() {
              Text(name)
                .fontSize(16)
                .fontColor('#FFFFFFFF')
                .width('100%')
                .padding(16)
                .backgroundColor('#33000000')
                .borderRadius(8)
            }
          }, (name: string) => name)
        }
        .layoutWeight(1)
      }
      .width('100%')
      .height('100%')
      .padding(24)
      .backgroundImage($r('app.media.background'))
      .backgroundImageSize(ImageSize.Cover)
      .backgroundImagePosition(Alignment.Center)
    }
    .title('商品分类')
    .width('100%')
    .height('100%')
  }
}
