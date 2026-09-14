import { uiMaterial } from '@kit.ArkUI';

class ContactGroup {
  letter: string;
  names: string[];

  constructor(letter: string, names: string[]) {
    this.letter = letter;
    this.names = names;
  }
}

class HomeCard {
  title: string;
  subtitle: string;
  color: string;

  constructor(title: string, subtitle: string, color: string) {
    this.title = title;
    this.subtitle = subtitle;
    this.color = color;
  }
}

@Entry
@Component
struct Index {
  @State selectedIndex: number = 0;
  private alphabets: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  private groups: ContactGroup[] = [
    new ContactGroup('A', ['Alice', 'Alan', 'Amy']),
    new ContactGroup('B', ['Bob', 'Bella', 'Bruce']),
    new ContactGroup('C', ['Cathy', 'Carl', 'Cindy']),
    new ContactGroup('D', ['David', 'Diana', 'Derek']),
    new ContactGroup('E', ['Emma', 'Eric', 'Elena']),
    new ContactGroup('F', ['Frank', 'Fiona', 'Felix']),
    new ContactGroup('G', ['Grace', 'George', 'Gina']),
    new ContactGroup('H', ['Henry', 'Helen', 'Hugo']),
    new ContactGroup('I', ['Ivy', 'Ian', 'Isabel']),
    new ContactGroup('J', ['Jack', 'Julia', 'Jason']),
    new ContactGroup('K', ['Kevin', 'Karen', 'Keith']),
    new ContactGroup('L', ['Lily', 'Leo', 'Lucy']),
    new ContactGroup('M', ['Michael', 'Mary', 'Mark']),
    new ContactGroup('N', ['Nancy', 'Nick', 'Nora']),
    new ContactGroup('O', ['Oliver', 'Olive', 'Oscar']),
    new ContactGroup('P', ['Peter', 'Paula', 'Philip']),
    new ContactGroup('Q', ['Queenie', 'Quentin', 'Quinn']),
    new ContactGroup('R', ['Rose', 'Robert', 'Rachel']),
    new ContactGroup('S', ['Sam', 'Susan', 'Steve']),
    new ContactGroup('T', ['Tom', 'Tina', 'Tony']),
    new ContactGroup('U', ['Uma', 'Victor', 'Ursula']),
    new ContactGroup('V', ['Vera', 'Vincent', 'Vivian']),
    new ContactGroup('W', ['Wendy', 'William', 'Walter']),
    new ContactGroup('X', ['Xavier', 'Xenia', 'Xander']),
    new ContactGroup('Y', ['Yvonne', 'York', 'Yetta']),
    new ContactGroup('Z', ['Zoe', 'Zack', 'Zara'])
  ];
  private homeCards: HomeCard[] = [
    new HomeCard('红色卡片', '内容透过底部页签材质自然渗透', '#FFE84026'),
    new HomeCard('蓝色卡片', '悬浮页签呈现轻盈的分层效果', '#FF0A59F7'),
    new HomeCard('绿色卡片', '导航区域与内容建立视觉层次', '#FF64BB5C'),
    new HomeCard('紫色卡片', '材质随内容颜色呈现折射与高光', '#FF7B61FF'),
    new HomeCard('黄色卡片', '底部页签沉浸光感演示', '#FFED9B27'),
    new HomeCard('青色卡片', 'THIN 薄材质通透样式', '#FF26A69A'),
    new HomeCard('橙色卡片', '彩色内容便于观察材质滤镜', '#FF8B4A2D'),
    new HomeCard('粉色卡片', '滑动列表观察页签悬浮效果', '#FFE86FB7')
  ];
  private scroller: ListScroller = new ListScroller();

  @Builder
  groupHeader(letter: string) {
    Text(letter)
      .fontSize(16)
      .fontWeight(FontWeight.Bold)
      .fontColor($r('sys.color.font_on_primary'))
      .width('100%')
      .padding({ left: 16, top: 10, bottom: 6 })
  }


  build() {
    Tabs({ barPosition: BarPosition.End }) {
      TabContent() {
        Column({ space: 12 }) {
          Text('沉浸光感 · 底部页签')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor($r('sys.color.font_primary'))
            .width('100%')
            .margin({ top: 12 })
          List() {
            ForEach(this.homeCards, (card: HomeCard) => {
              ListItem() {
                Column() {
                  Text(card.title)
                    .fontSize(20)
                    .fontWeight(FontWeight.Medium)
                    .fontColor($r('sys.color.font_on_primary'))
                  Text(card.subtitle)
                    .fontSize(14)
                    .fontColor($r('sys.color.font_on_primary'))
                    .margin({ top: 6 })
                }
                .width('100%')
                .height(110)
                .borderRadius(16)
                .margin({ bottom: 8 })
                .backgroundColor(card.color)
                .alignItems(HorizontalAlign.Start)
                .justifyContent(FlexAlign.Center)
              }
            }, (card: HomeCard) => card.title)
          }
        }
        .width('100%')
        .height('100%')
        .padding({ left: 16, right: 16  })
      }
      .tabBar(new BottomTabBarStyle($r('sys.media.ohos_icon_mask_svg'), '首页')
        .labelStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
        .iconStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
      )

      TabContent() {
        Stack({ alignContent: Alignment.End }) {
          List({ scroller: this.scroller }) {
            ForEach(this.groups, (group: ContactGroup, groupIndex: number) => {
              ListItemGroup({ header: this.groupHeader(group.letter) }) {
                ForEach(group.names, (name: string) => {
                  ListItem() {
                    Text(name)
                      .fontSize(18)
                      .fontColor($r('sys.color.font_on_primary'))
                      .width('100%')
                      .height(52)
                      .padding({ left: 16 })
                  }
                }, (name: string) => `${groupIndex}-${name}`)
              }
            }, (group: ContactGroup) => group.letter)
          }
          .width('100%')
          .height('100%')

          AlphabetIndexer({ arrayValue: this.alphabets, selected: this.selectedIndex })
            .selected(this.selectedIndex)
            .usingPopup(true)
            .popupBackgroundBlurStyle(BlurStyle.NONE)
            .onSelect((index: number) => {
              this.selectedIndex = index;
              this.scroller.scrollToIndex(index, false);
            })
            .onRequestPopupData((index: number) => {
              // 当选中A时，提示弹窗里面的二级索引文本列表显示A对应的列表arrayA，选中B、C、L时也同样
              // 选中其余索引项时，提示弹窗二级索引文本列表为空，提示弹窗会只显示一级索引项
              if (this.alphabets[index] == 'A') {
                return ['Alice', 'Alan', 'Amy'];
              } else {
                return [];
              }
            })
          // .systemMaterial(new uiMaterial.ImmersiveMaterial({
          //   style: uiMaterial.ImmersiveStyle.ULTRA_THIN
          // }))
        }
        .width('100%')
        .height('100%')
        .backgroundImage($r('app.media.backimg'))
      }
      .tabBar(new BottomTabBarStyle($r('sys.media.ohos_icon_mask_svg'), '联系人')
        .labelStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
        .iconStyle({ selectedColor: $r('sys.color.brand'), unselectedColor: $r('sys.color.font_primary') })
      )
    }
    .barFloatingStyle({
      systemMaterial: new uiMaterial.ImmersiveMaterial({
        style: uiMaterial.ImmersiveStyle.THIN
      }),
      maskColor: Color.Transparent
    })
    .barOverlap(true)
    .width('100%')
    .height('100%')
  }
}
