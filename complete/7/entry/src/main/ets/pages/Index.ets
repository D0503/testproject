import { uiMaterial } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  private isSupported: boolean = uiMaterial.isImmersiveMaterialSupported();
  private materialLevel: uiMaterial.MaterialLevel = uiMaterial.getGlobalMaterialLevel();

  private plainMaterial: uiMaterial.ImmersiveMaterial =
    new uiMaterial.ImmersiveMaterial({ style: uiMaterial.ImmersiveStyle.THIN });
  private opaqueColorMaterial: uiMaterial.ImmersiveMaterial =
    new uiMaterial.ImmersiveMaterial({ style: uiMaterial.ImmersiveStyle.THIN, materialColor: Color.Red });
  private translucentColorMaterial: uiMaterial.ImmersiveMaterial =
    new uiMaterial.ImmersiveMaterial({ style: uiMaterial.ImmersiveStyle.THIN, materialColor: '#80FF0000' });

  @Builder
  SectionHeader(title: string, subtitle: string) {
    Column({ space: 4 }) {
      Text(title)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FF182431')
      Text(subtitle)
        .fontSize(12)
        .fontColor('#99182431')
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ top: 16, bottom: 4 })
  }

  @Builder
  CardCaption(main: string, detail: string, color: string) {
    Column({ space: 2 }) {
      Text(main)
        .fontSize(13)
        .fontWeight(FontWeight.Medium)
        .fontColor(color)
      Text(detail)
        .fontSize(11)
        .fontColor('#99182431')
    }
    .width(328)
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  MaterialDemoList() {
    Scroll() {
      Column({ space: 6 }) {
        Text('沉浸光感 FAQ 验证 Demo')
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FF182431')
          .margin({ top: 12 })

        Column({ space: 4 }) {
          Text(`isImmersiveMaterialSupported: ${this.isSupported}`)
            .fontSize(13)
            .fontColor('#FF182431')
          Text(`getGlobalMaterialLevel: ${this.materialLevel}`)
            .fontSize(13)
            .fontColor('#FF182431')
          Text('材质效果随设备算力档位与系统沉浸光感强弱配置自适应；不支持沉浸式材质的设备上设置材质无效果。')
            .fontSize(11)
            .fontColor('#99182431')
        }
        .alignItems(HorizontalAlign.Start)
        .width('100%')

        this.SectionHeader('FAQ1 背景色或背景模糊遮挡材质效果',
          '沉浸光感视觉层级位于 backgroundColor、backgroundBlurStyle 等属性之下，不透明背景或背景模糊会覆盖材质层')

        Column({ space: 4 }) {
          Column() {
            Text('沉浸光感')
              .fontSize(16)
              .fontColor('#FF182431')
          }
          .width(328)
          .height(56)
          .borderRadius(28)
          .justifyContent(FlexAlign.Center)
          .systemMaterial(this.plainMaterial)
          .backgroundColor(Color.White)
          this.CardCaption('错误写法A：不透明背景色遮挡材质',
            'systemMaterial 之后设置 backgroundColor(Color.White)，材质效果被遮挡不可见', '#FFE84026')
        }

        Column({ space: 4 }) {
          Column() {
            Text('沉浸光感')
              .fontSize(16)
              .fontColor('#FF182431')
          }
          .width(328)
          .height(56)
          .borderRadius(28)
          .justifyContent(FlexAlign.Center)
          .systemMaterial(this.plainMaterial)
          .backgroundBlurStyle(BlurStyle.COMPONENT_THICK)
          this.CardCaption('错误写法B：背景模糊遮挡材质',
            'systemMaterial 之后叠加 backgroundBlurStyle，模糊效果覆盖材质层且重复处理', '#FFE84026')
        }

        Column({ space: 4 }) {
          Column() {
            Text('沉浸光感')
              .fontSize(16)
              .fontColor('#FF182431')
          }
          .width(328)
          .height(56)
          .borderRadius(28)
          .justifyContent(FlexAlign.Center)
          .backgroundColor(Color.Transparent)
          .systemMaterial(this.plainMaterial)
          this.CardCaption('推荐写法：背景透明，材质可见',
            'backgroundColor(Color.Transparent) 在前、systemMaterial 在后，不设置背景模糊；边框若透出周围背景色为正常折射现象', '#FF0A59F7')
        }

        this.SectionHeader('FAQ2 materialColor 传入不透明颜色后材质效果消失',
          'materialColor 为材质滤镜再混合纯色，需带透明度；纯不透明颜色会遮挡材质滤镜效果')

        Column({ space: 4 }) {
          Column() {
            Text('沉浸光感')
              .fontSize(16)
              .fontColor('#FFFFFFFF')
          }
          .width(328)
          .height(56)
          .borderRadius(28)
          .justifyContent(FlexAlign.Center)
          .systemMaterial(this.opaqueColorMaterial)
          this.CardCaption('错误写法：materialColor 为纯不透明 Color.Red',
            '材质滤镜效果被完全遮挡，仅显示纯红色背景', '#FFE84026')
        }

        Column({ space: 4 }) {
          Column() {
            Text('沉浸光感')
              .fontSize(16)
              .fontColor('#FF182431')
          }
          .width(328)
          .height(56)
          .borderRadius(28)
          .justifyContent(FlexAlign.Center)
          .systemMaterial(this.translucentColorMaterial)
          this.CardCaption("推荐写法：materialColor 为 '#80FF0000'（50% 透明度红色）",
            '材质透出背景内容同时呈现红色调；高/中算力设备混合材质滤镜，低算力设备作为背景色属性值', '#FF0A59F7')
        }

        Text('验证方法：对比同组错误与推荐卡片。错误卡片呈纯色/模糊背景（材质不可见），推荐卡片呈透出渐变背景的材质效果，即 FAQ 解决方案正确。')
          .fontSize(11)
          .fontColor('#99182431')
          .width('100%')
          .margin({ top: 8, bottom: 24 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)
      .padding({ left: 16, right: 16 })
    }
    .width('100%')
    .height('100%')
    .scrollBar(BarState.Off)
  }

  build() {
    Column() {
      Navigation() {
        Column() {
          Row() {
            Column().layoutWeight(1).height(220).backgroundColor('#FFD9453C')
            Column().layoutWeight(1).height(220).backgroundColor('#FFF7A331')
            Column().layoutWeight(1).height(220).backgroundColor('#FF67B14B')
          }
          .width('100%')

          Row() {
            Column().layoutWeight(1).height(220).backgroundColor('#FF3B7DD9')
            Column().layoutWeight(1).height(220).backgroundColor('#FF7B5BD9')
            Column().layoutWeight(1).height(220).backgroundColor('#FFD94BB4')
          }
          .width('100%')
        }
        .width('100%')
        .height('100%')
        .linearGradient({
          angle: 180,
          colors: [
            ['#004AAF', 0.0],
            ['#2787D9', 0.5],
            ['#F0FAFF', 1.0]
          ]
        })
      }
      .title({ builder: this.MaterialDemoList, height: '100%' })
    }
    .width('100%')
    .height('100%')
  }
}
