import { ChipGroup, ChipGroupItemOptions, SymbolGlyphModifier, uiMaterial } from '@kit.ArkUI'

@ComponentV2
export struct ClassifyComponent {
  @Local selectedIndexes: Array<number> = [0]
  info: Array<ChipGroupItemOptions> = []

  aboutToAppear(): void {
    let classifyType: string[] = ['策略', '动作', '竞技', '射击', '卡牌', '体育', '休闲', '音乐']

    for (let index: number = 0; index < classifyType.length; index++) {
      this.info.push({
        label: { text: classifyType[index] },
        prefixSymbol: {
          activated: new SymbolGlyphModifier($r('sys.symbol.star_fill')).fontSize(20).fontColor(['#d3d3d3']),
          normal: new SymbolGlyphModifier($r('sys.symbol.star_fill')).fontSize(20).fontColor([Color.Black])
        }
      })
    }
  }

  build() {
    ChipGroup({
      items: this.info,
      itemStyle: {
        backgroundColor: Color.Transparent,
        selectedFontColor: '#d3d3d3'
      },
      backgroundSystemMaterial: new uiMaterial.ImmersiveMaterial({
        colorInvert: true,
        interactive: true
      }),
      selectedIndexes: this.selectedIndexes,
      onChange: (activeIndexes: Array<number>) => {
        this.selectedIndexes = activeIndexes
      }
    })
  }
}
