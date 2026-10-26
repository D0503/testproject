@Entry
@Component
struct FloatViewPage {
  build() {
    Column() {
      Text('闪控窗内容页 CUSTOM-S001')
        .fontSize(16)
        .fontColor('#FFFFFF')
      Text('绑定态：点击标题栏缩小按钮收起为闪控球')
        .fontSize(12)
        .fontColor('#E5FFFFFF')
        .margin({ top: 8 })
      Text('解绑态：点击最小化按钮应收起到侧边栏（观察项）')
        .fontSize(12)
        .fontColor('#E5FFFFFF')
        .margin({ top: 4 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor('#0A59F7')
  }
}
