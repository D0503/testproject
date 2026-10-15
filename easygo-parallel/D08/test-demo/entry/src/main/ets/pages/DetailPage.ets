import { window } from '@kit.ArkUI'
import { common, AbilityConstant } from '@kit.AbilityKit'
import { BusinessError } from '@kit.BasicServicesKit'

interface GoodsItem {
  id: number
  name: string
  price: string
}

@Component
export struct DetailPage {
  @State item: GoodsItem = { id: 0, name: '商品详情', price: '' }
  @State isEasySplit: boolean = false
  @State windowStatusType: window.WindowStatusType = window.WindowStatusType.UNDEFINED

  private async refreshWindowState(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext
      const mainWindow = await window.getLastWindow(context)
      this.windowStatusType = mainWindow.getWindowStatus()
      this.isEasySplit = this.getUIContext().isEasySplit()
    } catch (error) {
      const err = error as BusinessError
      console.error(`Failed to query window state. Code: ${err.code}, message: ${err.message}`)
    }
  }

  private startSplitScreen(): void {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext
      context.startAbility({
        bundleName: context.abilityInfo.bundleName,
        abilityName: 'EntryAbility'
      }, {
        windowMode: AbilityConstant.WindowMode.WINDOW_MODE_SPLIT_PRIMARY,
        splitRatio: window.SplitRatioPreference.PRIMARY_DOMINANT
      }).then(() => {
        console.info('Succeeded in starting split screen mode.')
      }).catch((err: BusinessError) => {
        console.error(`Failed to start split screen mode. Code: ${err.code}, message: ${err.message}`)
      })
    } catch (error) {
      const err = error as BusinessError
      console.error(`Failed to start split screen mode. Code: ${err.code}, message: ${err.message}`)
    }
  }

  aboutToAppear(): void {
    this.refreshWindowState()
  }

  build() {
    NavDestination() {
      Column({ space: 12 }) {
        Text('商品详情页（右侧分栏）')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFFFF')
        Text(this.item.name)
          .fontSize(16)
          .fontColor('#FFFFFFFF')
        Text(this.item.price)
          .fontSize(16)
          .fontColor('#CCFFFFFF')
        Row() {
          Text('⇱ 分屏比价')
            .fontSize(16)
            .fontColor('#FFFFFFFF')
            .padding(12)
        }
        .backgroundColor('#330000FF')
        .borderRadius(8)
        .onClick(() => {
          this.startSplitScreen()
        })
        .visibility(this.windowStatusType !== window.WindowStatusType.SPLIT_SCREEN &&
          this.isEasySplit ? Visibility.Visible : Visibility.None)
        Text(`isEasySplit=${this.isEasySplit} windowStatusType=${this.windowStatusType}`)
          .fontSize(12)
          .fontColor('#99FFFFFF')
        Button('刷新窗口状态')
          .fontSize(14)
          .onClick(() => {
            this.refreshWindowState()
          })
        Text('enableInSplitScreen=true 时，分屏窗口宽高满足条件则继续保持平行视界分栏')
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
    .title('商品详情')
    .onReady((context: NavDestinationContext) => {
      this.item = context.pathInfo.param as GoodsItem
    })
    .onShown(() => {
      this.refreshWindowState()
    })
    .width('100%')
    .height('100%')
  }
}
