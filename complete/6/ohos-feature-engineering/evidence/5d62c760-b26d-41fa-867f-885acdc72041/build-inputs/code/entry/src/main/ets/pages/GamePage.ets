import { uiMaterial } from '@kit.ArkUI'
import { ClassifyComponent } from '../components/ClassifyComponent'
import { ListItemData, getListItems } from '../model/ListData'

@ComponentV2
struct GamePage {
  @Local titleHeight: number = 60
  @Local showTitle: boolean = false
  @Local titleOpacity: number = 1
  @Local contentOffset: number = 0
  totalOffset: number = 0
  titleEnd: number = 0
  titleStart: number = 0
  @Local listVisible: Visibility = Visibility.Visible
  listItems: Array<ListItemData> = getListItems()

  @Builder
  gameTitleBar() {
    Row() {
      if (this.showTitle) {
        ClassifyComponent()
      } else {
        Text('游戏')
          .fontSize(28)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A')
          .opacity(this.titleOpacity)
          .id('text')
        Blank()
      }
      Button() {
        SymbolGlyph($r('sys.symbol.AI_search')).fontSize(20)
      }.borderRadius(180).width(40).height(40)
      .backgroundColor(Color.Transparent)
      .systemMaterial(new uiMaterial.ImmersiveMaterial({
          lightEffect: { color: Color.White },
          materialColor: '#d3d3d3'
        }))
    }.expandSafeArea([SafeAreaType.SYSTEM])
    .width('100%')
    .height('100%')
    .padding({ left: 20, right: 20 })
    .alignItems(VerticalAlign.Center)
  }

  build() {
    NavDestination() {
      Scroll() {
        Column() {
          Image($r('app.media.startIcon'))
            .width('100%')
            .height(180)
            .borderRadius(12)
            .backgroundColor('#fff3e0')
            .objectFit(ImageFit.Cover)
          ClassifyComponent().id('content').visibility(this.showTitle ? Visibility.Hidden : Visibility.Visible)
          List() {
            ForEach(this.listItems, (item: ListItemData) => {
              ListItem() {
                Row() {
                  SymbolGlyph(item.image).fontSize(36).fontColor(['#ff6d00']).margin({ right: 16 })
                  Text(item.name).fontSize(16).fontColor('#333333')
                }.width('100%')
                .padding({ left: 20, right: 20, top: 14, bottom: 14 })
              }
            }, (item: ListItemData) => item.id.toString())
          }.width('100%')
          .margin({ top: 8 })
          .nestedScroll({ scrollForward: NestedScrollMode.PARENT_FIRST, scrollBackward: NestedScrollMode.SELF_FIRST })
          .divider({ strokeWidth: 5, color: '#e0e0e0', startMargin: 72, endMargin: 20 })
        }.padding({ left: 16, right: 16, top: 8, bottom: 16 })
      }
      .contentStartOffset(this.titleHeight)
      .scrollable(ScrollDirection.Vertical)
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
      .width('100%')
      .height('100%')
      .onDidScroll((xOffset: number, yOffset: number) => {
        this.totalOffset += yOffset
        let curOffset = this.contentOffset - this.totalOffset
        if (curOffset > this.titleEnd) {
          this.showTitle = false;
          this.listVisible = Visibility.Hidden
          return
        }
        if (curOffset < this.titleEnd) {
          this.showTitle = true;
          this.listVisible = Visibility.Visible
          return
        }
        this.titleHeight = (curOffset - this.titleEnd) / (this.titleHeight - this.titleEnd)
      })
    }.onShown(() => {
      let titleInfo = this.getUIContext().getComponentUtils().getRectangleById('text');
      this.titleStart = this.getUIContext().px2vp(titleInfo.windowOffset.y)
      this.titleEnd = this.getUIContext().px2vp(titleInfo.size.height)
      this.contentOffset = this.getUIContext().px2vp(this.getUIContext().getComponentUtils().getRectangleById('content').windowOffset.y)
    })
    .expandSafeArea([SafeAreaType.SYSTEM])
    .hideBackButton(true)
    .title({ builder: this.gameTitleBar, height: this.titleHeight }, {
      barStyle: BarStyle.STACK,
      scrollEffectOptions: {
        scrollEffectType: ScrollEffectType.GRADUAL_BLUR
      }
    })
  }
}

@Builder
export function GamePageBuilder() {
  GamePage()
}
