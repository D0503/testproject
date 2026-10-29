@Entry
@Component
struct WidgetCard {
  build() {
    Row() {
      Column() {
        Text($r('app.string.liveform_click1'))
          .fontSize($r('app.float.font_size'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('sys.color.font_primary'))
      }
      .width('100%')
    }
    .height('100%')
    .onClick(() => {
      // 点击卡片时，向EntryFormAbility发送message，并在其onFormEvent回调中调用formProvider.requestOverflow请求卡片动效
      postCardAction(this, {
        action: 'message',
        abilityName: 'EntryFormAbility',
        params: {
          message: 'requestOverflow'
        }
      });
    })
  }
}
