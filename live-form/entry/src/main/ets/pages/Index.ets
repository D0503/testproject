@Entry
@Component
struct Index {
  build() {
    Column({ space: 16 }) {
      Text('互动卡片 Demo')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 32 })
      Text('在桌面长按应用图标可添加卡片：场景动效卡片（widget）、趣味小游戏（FunInteractionCard）')
        .fontSize(12)
        .fontColor('#646166')
        .margin({ left: 24, right: 24, top: 24 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
