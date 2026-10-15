import { DetailPage } from './DetailPage'

interface GoodsItem {
  id: number
  name: string
  price: string
}

const GOODS: GoodsItem[] = [
  { id: 1, name: '商品 Alpha', price: '¥199.00' },
  { id: 2, name: '商品 Beta', price: '¥299.00' },
  { id: 3, name: '商品 Gamma', price: '¥399.00' },
  { id: 4, name: '商品 Delta', price: '¥499.00' }
]

@Entry
@Component
struct Index {
  @State pageStack: NavPathStack = new NavPathStack()

  @Builder
  PageMap(name: string) {
    if (name === 'DetailPage') {
      DetailPage()
    }
  }

  build() {
    Navigation(this.pageStack) {
      Column({ space: 12 }) {
        Text('EP-S008 窗口分屏中保持平行视界')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
          .padding(12)
        List({ space: 8 }) {
          ForEach(GOODS, (item: GoodsItem) => {
            ListItem() {
              Row() {
                Text(item.name)
                  .fontSize(16)
                  .fontColor('#FFFFFFFF')
                  .layoutWeight(1)
                Text(item.price)
                  .fontSize(14)
                  .fontColor('#CCFFFFFF')
              }
              .width('100%')
              .padding(16)
              .backgroundColor('#33000000')
              .borderRadius(8)
            }
            .onClick(() => {
              this.pageStack.pushPath({ name: 'DetailPage', param: item })
            })
          }, (item: GoodsItem) => item.id.toString())
        }
        .layoutWeight(1)
        .padding({ left: 16, right: 16 })
      }
      .width('100%')
      .height('100%')
    }
    .navDestination(this.PageMap)
    .hideTitleBar(true)
    .mode(NavigationMode.Stack)
    .width('100%')
    .height('100%')
    .backgroundImage($r('app.media.background'))
    .backgroundImageSize(ImageSize.Cover)
    .backgroundImagePosition(Alignment.Center)
  }
}
