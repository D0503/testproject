import { WideContentPage } from './WideContentPage'

interface DemoItem {
  id: number
  name: string
  desc: string
}

const ITEMS: DemoItem[] = [
  { id: 1, name: '固定宽内容样例 A', desc: '虚拟容器开关影响横向布局宽度' },
  { id: 2, name: '固定宽内容样例 B', desc: '关闭时按原始尺寸计算，易截断' },
  { id: 3, name: '固定宽内容样例 C', desc: '开启时按右侧页面尺寸计算' }
]

@Entry
@Component
struct Index {
  @State pageStack: NavPathStack = new NavPathStack()

  @Builder
  PageMap(name: string) {
    if (name === 'WideContentPage') {
      WideContentPage()
    }
  }

  build() {
    Navigation(this.pageStack) {
      Column({ space: 12 }) {
        Text('EP-S007 虚拟容器与页面尺寸适配')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
          .padding(12)
        List({ space: 8 }) {
          ForEach(ITEMS, (item: DemoItem) => {
            ListItem() {
              Column({ space: 4 }) {
                Text(item.name)
                  .fontSize(16)
                  .fontColor('#FFFFFFFF')
                Text(item.desc)
                  .fontSize(13)
                  .fontColor('#CCFFFFFF')
              }
              .width('100%')
              .alignItems(HorizontalAlign.Start)
              .padding(16)
              .backgroundColor('#33000000')
              .borderRadius(8)
            }
            .onClick(() => {
              this.pageStack.pushPath({ name: 'WideContentPage', param: item })
            })
          }, (item: DemoItem) => item.id.toString())
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
