import {
  uiMaterial,
  ChipGroup,
  ChipGroupItemOptions,
  IconGroupSuffix,
  SegmentButton,
  SegmentButtonOptions,
  SegmentButtonV2ItemOptions,
  SegmentButtonV2Items,
  CapsuleSegmentButtonV2
} from '@kit.ArkUI';

@Entry
@Component
struct Index {
  @State switchOn: boolean = true;
  @State toggleBtnOn: boolean = false;
  @State sliderValue: number = 40;
  @State segSelected: number[] = [0];
  @State segV2Selected: number = 0;

  private isMaterialSupported: boolean = uiMaterial.isImmersiveMaterialSupported();
  private materialLevel: uiMaterial.MaterialLevel = uiMaterial.getGlobalMaterialLevel();

  private buttonThemeMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
    interactive: true,
    lightEffect: {}
  });

  private buttonCustomLightMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.THIN,
    interactive: true,
    lightEffect: { color: '#80FFD6AA' }
  });

  private selectButtonMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
    interactive: true,
    lightEffect: {}
  });

  private selectMenuMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.THICK
  });

  private switchMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.THIN
  });

  private sliderMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
    interactive: true,
    lightEffect: {}
  });

  private chipNormalMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.ULTRA_THIN
  });

  private chipSelectedMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.THICK
  });

  private chipIconMaterial: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.THIN
  });

  private chipItems: ChipGroupItemOptions[] = [
    { label: { text: '推荐' } },
    { label: { text: '热榜' } },
    { label: { text: '关注' } },
    { label: { text: '视频' } }
  ];

  @State segOptions: SegmentButtonOptions = SegmentButtonOptions.capsule({
    buttons: [
      { text: '日' },
      { text: '周' },
      { text: '月' }
    ],
    multiply: false,
    fontColor: $r('sys.color.font_secondary'),
    selectedFontColor: $r('sys.color.font_primary'),
    backgroundSystemMaterial: new uiMaterial.ImmersiveMaterial({
      style: uiMaterial.ImmersiveStyle.THIN
    })
  });

  private segV2ItemOptions: SegmentButtonV2ItemOptions[] = [
    { text: '列表' },
    { text: '卡片' }
  ];

  private segV2Items: SegmentButtonV2Items = new SegmentButtonV2Items(this.segV2ItemOptions);

  private segV2Material: uiMaterial.Material = new uiMaterial.ImmersiveMaterial({
    style: uiMaterial.ImmersiveStyle.THIN
  });

  @Builder
  SectionTitle(title: string, subtitle: string) {
    Column({ space: 4 }) {
      Text(title)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.White)
      Text(subtitle)
        .fontSize(12)
        .fontColor('#B3FFFFFF')
    }
    .alignItems(HorizontalAlign.Start)
    .width('100%')
  }

  @Builder
  ChipGroupSuffix() {
    IconGroupSuffix({
      items: [
        {
          icon: { src: $r('app.media.startIcon'), size: { width: 16, height: 16 } },
          action: () => {
          }
        }
      ],
      iconBackgroundSystemMaterial: this.chipIconMaterial
    })
  }

  build() {
    Stack() {
      Column()
        .width('100%')
        .height('100%')
        .linearGradient({
          angle: 200,
          colors: [
            ['#0A2A6B', 0.0],
            ['#1E6FD9', 0.35],
            ['#3FBF9F', 0.7],
            ['#F2E8C9', 1.0]
          ]
        })

      Scroll() {
        Column({ space: 28 }) {
          Column({ space: 8 }) {
            Text('沉浸光感 · 按钮与选择类组件')
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.White)
            Text(`设备支持沉浸式材质: ${this.isMaterialSupported} ｜ 材质等级: ${this.materialLevel}`)
              .fontSize(12)
              .fontColor('#D9FFFFFF')
          }
          .alignItems(HorizontalAlign.Center)
          .width('100%')

          Column({ space: 12 }) {
            this.SectionTitle('按钮 Button', '未设置颜色属性时默认生效主题色材质；按压弹性形变 + 流光反馈')
            Row({ space: 14 }) {
              Button('主题色')
                .fontColor($r('sys.color.font_primary'))
                .systemMaterial(this.buttonThemeMaterial)
              Button('自定义流光')
                .fontColor($r('sys.color.font_primary'))
                .systemMaterial(this.buttonCustomLightMaterial)
              Button('禁用态')
                .enabled(false)
                .fontColor($r('sys.color.font_secondary'))
                .systemMaterial(this.buttonThemeMaterial)
            }
          }
          .width('100%')

          Column({ space: 12 }) {
            this.SectionTitle('下拉按钮 Select', '按钮 systemMaterial 与菜单 menuSystemMaterial 相互独立')
            Row({ space: 16 }) {
              Select([
                { value: '全部' },
                { value: '图片' },
                { value: '视频' },
                { value: '文档' }
              ])
                .selected(0)
                .value('按钮+菜单均开启')
                .fontColor($r('sys.color.font_primary'))
                .selectedOptionFontColor($r('sys.color.font_emphasize'))
                .systemMaterial(this.selectButtonMaterial)
                .menuSystemMaterial(this.selectMenuMaterial)

              Select([
                { value: '全部' },
                { value: '图片' },
                { value: '视频' }
              ])
                .selected(0)
                .value('菜单已单独关闭')
                .fontColor($r('sys.color.font_primary'))
                .systemMaterial(this.selectButtonMaterial)
                .menuSystemMaterial(uiMaterial.Material.empty)
            }
          }
          .width('100%')

          Column({ space: 12 }) {
            this.SectionTitle('开关 Toggle', 'Switch 材质参数仅作开关标记；Material.empty 单独关闭')
            Row({ space: 20 }) {
              Column({ space: 6 }) {
                Toggle({ type: ToggleType.Switch, isOn: this.switchOn })
                  .systemMaterial(this.switchMaterial)
                  .onChange((isOn: boolean) => {
                    this.switchOn = isOn;
                  })
                Text('默认开启')
                  .fontSize(11)
                  .fontColor('#D9FFFFFF')
              }

              Column({ space: 6 }) {
                Toggle({ type: ToggleType.Switch, isOn: false })
                  .systemMaterial(uiMaterial.Material.empty)
                Text('empty 关闭')
                  .fontSize(11)
                  .fontColor('#D9FFFFFF')
              }

              Column({ space: 6 }) {
                Toggle({ type: ToggleType.Button, isOn: this.toggleBtnOn })
                  .systemMaterial(this.switchMaterial)
                  .onChange((isOn: boolean) => {
                    this.toggleBtnOn = isOn;
                  })
                Text('Button 形态')
                  .fontSize(11)
                  .fontColor('#D9FFFFFF')
              }
            }
          }
          .width('100%')

          Column({ space: 12 }) {
            this.SectionTitle('滑动条 Slider', '材质参数仅作开关标记；DEFAULT 滑块 + 非 NONE 样式时交互反馈生效')
            Slider({
              value: this.sliderValue,
              min: 0,
              max: 100,
              step: 1,
              style: SliderStyle.OutSet
            })
              .width('90%')
              .blockStyle({ type: SliderBlockType.DEFAULT })
              .trackColor($r('sys.color.comp_divider'))
              .selectedColor($r('sys.color.brand'))
              .systemMaterial(this.sliderMaterial)
              .onChange((value: number) => {
                this.sliderValue = value;
              })
            Text(`当前进度: ${this.sliderValue.toFixed(0)}`)
              .fontSize(12)
              .fontColor('#D9FFFFFF')
          }
          .width('100%')

          Column({ space: 12 }) {
            this.SectionTitle('子页签 ChipGroup', '普通 / 选中 / 图标三种材质入口')
            ChipGroup({
              items: this.chipItems,
              multiple: false,
              backgroundSystemMaterial: this.chipNormalMaterial,
              selectedBackgroundSystemMaterial: this.chipSelectedMaterial
            }) {
              this.ChipGroupSuffix()
            }
          }
          .width('100%')

          Column({ space: 12 }) {
            this.SectionTitle('操作块 SegmentButton', '胶囊单选接入材质；V2 开启后选中项背景跟随手指拖拽')
            SegmentButton({
              options: this.segOptions,
              selectedIndexes: this.segSelected
            })
            CapsuleSegmentButtonV2({
              items: this.segV2Items,
              selectedIndex: this.segV2Selected!,
              backgroundSystemMaterial: this.segV2Material
            })
          }
          .width('100%')
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 48, bottom: 40 })
        .alignItems(HorizontalAlign.Center)
      }
      .scrollBar(BarState.Off)
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}
