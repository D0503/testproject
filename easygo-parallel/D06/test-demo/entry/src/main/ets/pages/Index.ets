import { VideoPage } from './VideoPage'

interface VideoItem {
  id: number
  title: string
  duration: string
}

const VIDEOS: VideoItem[] = [
  { id: 1, title: '视频 Alpha', duration: '03:25' },
  { id: 2, title: '视频 Beta', duration: '05:12' },
  { id: 3, title: '视频 Gamma', duration: '08:47' },
  { id: 4, title: '视频 Delta', duration: '12:03' },
  { id: 5, title: '视频 Epsilon', duration: '21:56' }
]

@Entry
@Component
struct Index {
  @State pageStack: NavPathStack = new NavPathStack()

  @Builder
  PageMap(name: string) {
    if (name === 'VideoPage') {
      VideoPage()
    }
  }

  build() {
    Navigation(this.pageStack) {
      Column({ space: 12 }) {
        Text('EP-S006 主动横屏全屏策略：Navigation 分栏')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
          .padding(12)
        List({ space: 8 }) {
          ForEach(VIDEOS, (item: VideoItem) => {
            ListItem() {
              Row() {
                Text(item.title)
                  .fontSize(16)
                  .fontColor('#FFFFFFFF')
                  .layoutWeight(1)
                Text(item.duration)
                  .fontSize(14)
                  .fontColor('#CCFFFFFF')
              }
              .width('100%')
              .padding(16)
              .backgroundColor('#33000000')
              .borderRadius(8)
            }
            .onClick(() => {
              this.pageStack.pushPath({ name: 'VideoPage', param: item })
            })
          }, (item: VideoItem) => item.id.toString())
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
