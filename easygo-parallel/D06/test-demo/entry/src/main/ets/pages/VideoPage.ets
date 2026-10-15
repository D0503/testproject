import { window } from '@kit.ArkUI'
import { common } from '@kit.AbilityKit'
import { BusinessError } from '@kit.BasicServicesKit'

interface VideoItem {
  id: number
  title: string
  duration: string
}

@Component
export struct VideoPage {
  @State item: VideoItem = { id: 0, title: '视频播放', duration: '' }
  @State playing: boolean = false

  private async setOrientation(orientation: window.Orientation) {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext
      const windowClass = await window.getLastWindow(context)
      await windowClass.setPreferredOrientation(orientation)
    } catch (error) {
      const err = error as BusinessError
      console.error(`Failed to set orientation. Cause code: ${err.code}, message: ${err.message}`)
    }
  }

  aboutToDisappear(): void {
    this.setOrientation(window.Orientation.UNSPECIFIED)
  }

  build() {
    NavDestination() {
      Column({ space: 12 }) {
        Text('视频播放模拟页（右侧分栏）')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
        Text(this.item.title)
          .fontSize(16)
          .fontColor('#FFFFFFFF')
        Text(this.item.duration)
          .fontSize(16)
          .fontColor('#CCFFFFFF')
        Button(this.playing ? '暂停播放' : '开始播放')
          .fontSize(16)
          .onClick(() => {
            this.playing = !this.playing
          })
        Button('请求横屏')
          .fontSize(16)
          .onClick(() => {
            this.setOrientation(window.Orientation.LANDSCAPE)
          })
        Text('supportLandscapeFullscreen=true 时主动横屏退出分栏全屏显示；离开本页恢复 UNSPECIFIED')
          .fontSize(12)
          .fontColor('#99FFFFFF')
          .textAlign(TextAlign.Center)
      }
      .width('100%')
      .height('100%')
      .padding(24)
      .justifyContent(FlexAlign.Center)
      .backgroundImage($r('app.media.background'))
      .backgroundImageSize(ImageSize.Cover)
      .backgroundImagePosition(Alignment.Center)
    }
    .title('视频播放')
    .onReady((context: NavDestinationContext) => {
      this.item = context.pathInfo.param as VideoItem
    })
    .width('100%')
    .height('100%')
  }
}
