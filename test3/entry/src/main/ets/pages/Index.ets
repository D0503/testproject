import { uiMaterial } from '@kit.ArkUI';
import { ImmersiveMaterialFactory } from '../materials/ImmersiveMaterialFactory';

@Entry
@Component
struct Index {
  @State searchText: string = '';
  @State lastSubmit: string = '';

  // 判据 IL-F009：Navigation 标题栏通过 NavigationTitleOptions.systemMaterial 配置沉浸光感；
  // 快照 component.md L23：建议 barStyle 使用 STACK，使内容区延伸至标题栏区域。
  // 不在此设置 backgroundColor/backgroundBlurStyle，避免普通背景覆盖材质。
  private titleOptions: NavigationTitleOptions = {
    barStyle: BarStyle.STACK,
    systemMaterial: ImmersiveMaterialFactory.create(uiMaterial.ImmersiveStyle.ULTRA_THIN)
  };

  // 快照 component.md L19：沉浸光感针对标题栏生效的范围是返回键、非自定义 Menu。
  private menuItems: Array<NavigationMenuItem> = [
    { value: '扫一扫', icon: 'resources/base/media/startIcon.png', action: () => {
      this.getUIContext().getPromptAction().showToast({ message: '扫一扫' });
    } },
    { value: '消息', icon: 'resources/base/media/startIcon.png', action: () => {
      this.getUIContext().getPromptAction().showToast({ message: '消息' });
    } }
  ];

  private readonly demoColors: Array<string> = [
    '#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C', '#38D9A9',
    '#4DABF7', '#748FFC', '#9775FA', '#DA77F2', '#F783AC'
  ];

  @Builder
  SearchTitle() {
    Row() {
      Search({ value: this.searchText, placeholder: '搜索 Demo 内容' })
        .height(40)
        .layoutWeight(1)
        .onChange((value: string) => {
          this.searchText = value;
        })
        .onSubmit((value: string) => {
          this.lastSubmit = value;
        })
    }
    .width('100%')
    .padding({ left: 16, right: 16 })
  }

  @Builder
  ContentList() {
    List({ space: 12 }) {
      ListItem() {
        Column() {
          Text('搜索框标题栏沉浸光感 Demo')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
          Text(`设备材质支持：${ImmersiveMaterialFactory.supported() ? '支持' : '不支持'}`)
            .fontSize(14)
            .margin({ top: 8 })
          Text(this.lastSubmit ? `最近搜索：${this.lastSubmit}` : '滚动列表，内容将透过标题栏材质呈现')
            .fontSize(14)
            .margin({ top: 8 })
        }
        .alignItems(HorizontalAlign.Start)
        .width('100%')
        .padding(16)
      }

      ForEach(this.demoColors.concat(this.demoColors).concat(this.demoColors), (color: string, index: number) => {
        ListItem() {
          Row() {
            Text(`列表条目 ${index + 1}`)
              .fontSize(16)
              .fontColor(Color.White)
          }
          .width('100%')
          .height(72)
          .padding({ left: 16 })
          .borderRadius(12)
          .backgroundColor(color)
        }
      }, (color: string, index: number) => `${color}-${index}`)
    }
    .width('100%')
    .height('100%')
    .padding({ left: 16, right: 16 })
    .scrollBar(BarState.Off)
  }

  build() {
    Navigation() {
      this.ContentList()
    }
    .title(this.SearchTitle, this.titleOptions)
    .menus(this.menuItems)
    .titleMode(NavigationTitleMode.Mini)
    .hideBackButton(true)
    .width('100%')
    .height('100%')
  }
}
