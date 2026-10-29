let storageUpdateFun = new LocalStorage();

@Entry(storageUpdateFun)
@Component
struct FunInteractionCard {
  @LocalStorageProp('formId') formId: string = '';

  build() {
    Row() {
      Column() {
        Text($r('app.string.fun_interaction_card_display_name'))
          .fontSize($r('app.float.font_size'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('sys.color.font_primary'))
        Text($r('app.string.fun_interaction_hint'))
          .fontSize(12)
          .fontColor($r('sys.color.font_secondary'))
          .margin({ top: 4 })
      }
      .width('100%')
    }
    .height('100%')
  }
}
