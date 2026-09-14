import { uiMaterial } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  private isSupported: boolean = uiMaterial.isImmersiveMaterialSupported();
  private materialLevel: uiMaterial.MaterialLevel = uiMaterial.getGlobalMaterialLevel();
  private levelText: string = '';
  private plainMaterial: uiMaterial.ImmersiveMaterial | undefined = undefined;
  private interactiveMaterial: uiMaterial.ImmersiveMaterial | undefined = undefined;
  @State titlePlainCount: number = 0;
  @State titleLightCount: number = 0;
  @State contentBtnCount: number = 0;

  aboutToAppear(): void {
    const levelNames: string[] = ['EXQUISITE(高算力)', 'GENTLE(中算力)', 'SMOOTH(低算力)'];
    this.levelText = levelNames[this.materialLevel] ?? `${this.materialLevel}`;
    if (this.isSupported) {
      this.plainMaterial = new uiMaterial.ImmersiveMaterial({
        style: uiMaterial.ImmersiveStyle.THIN,
      });
      this.interactiveMaterial = new uiMaterial.ImmersiveMaterial({
        style: uiMaterial.ImmersiveStyle.THIN,
        interactive: true,
        lightEffect: {},
      });
    }
  }

  @Builder
  NavigationTitle() {
    Column({ space: 8 }) {
      Text('A · 标题栏内 Button（生效范围内，预期材质生效）')
        .fontSize(12)
        .fontColor('#182431')
      Row({ space: 12 }) {
        Button(`A1 纯材质 ${this.titlePlainCount}`)
          .id('btnTitlePlain')
          .fontSize(14)
          .width(136)
          .borderRadius(22)
          .onClick(() => {
            this.titlePlainCount += 1;
          })
          .systemMaterial(this.plainMaterial)
        Button(`A2 流光 ${this.titleLightCount}`)
          .id('btnTitleLight')
          .fontSize(14)
          .width(136)
          .borderRadius(22)
          .onClick(() => {
            this.titleLightCount += 1;
          })
          .systemMaterial(this.interactiveMaterial)
      }
      .justifyContent(FlexAlign.Center)
    }
    .height('100%')
    .alignItems(HorizontalAlign.Center)
    .width('100%')
  }

  build() {
    Column() {
      NavDestination() {
        Column({ space: 16 }) {
          Column({ space: 6 }) {
            Text('验证目标：Button 沉浸光感生效区域是否具有限制')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor('#182431')
            Text(`设备支持沉浸材质: ${this.isSupported}`)
              .fontSize(12)
              .fontColor('#182431')
            Text(`全局材质等级: ${this.levelText}`)
              .fontSize(12)
              .fontColor('#182431')
            Text('官网清单：Slider/Toggle/Select 可全页面生效；Button 未列入该清单')
              .fontSize(12)
              .fontColor('#182431')
            Text('观察点：内容区组件受限时 hilog 出现 Material inactive: out of scope')
              .fontSize(12)
              .fontColor('#182431')
          }
          .alignItems(HorizontalAlign.Start)
          .width('100%')
          .padding(14)
          .borderRadius(14)
          .backgroundColor('rgba(255,255,255,0.72)')

          Column({ space: 10 }) {
            Text('B · 内容区 Button（清单字面：生效范围外）')
              .fontSize(14)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
            Button(`B 内容区Button ${this.contentBtnCount}`)
              .id('btnContent')
              .fontSize(14)
              .width(200)
              .height(48)
              .borderRadius(24)
              .onClick(() => {
                this.contentBtnCount += 1;
              })
              .systemMaterial(this.plainMaterial)
            Text('预期分歧：按清单字面不生效并打印 out of scope 日志；按组件章入口侧则生效。以本页实测裁决。')
              .fontSize(11)
              .fontColor('#F0FAFF')
          }
          .alignItems(HorizontalAlign.Start)
          .width('100%')
          .padding(14)
          .borderRadius(14)
          .backgroundColor('rgba(0,0,0,0.12)')

          Column({ space: 10 }) {
            Text('C · 清单内对照组（Slider/Toggle/Select，预期全页面生效）')
              .fontSize(14)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
            Row({ space: 16 }) {
              Slider({ value: 40, min: 0, max: 100 })
                .id('sliderContent')
                .width(170)
                .systemMaterial(this.plainMaterial)
              Toggle({ type: ToggleType.Switch, isOn: false })
                .id('toggleSwitch')
                .systemMaterial(this.plainMaterial)
            }
            Row() {
              Select([
                { value: '选项一' },
                { value: '选项二' },
                { value: '选项三' }
              ])
                .id('selectContent')
                .selected(0)
                .value('选项一')
                .fontColor('#FFFFFF')
                .width(150)
                .onSelect(() => {
                })
                .systemMaterial(this.plainMaterial)
            }
            .width('100%')
            .justifyContent(FlexAlign.Start)
          }
          .alignItems(HorizontalAlign.Start)
          .width('100%')
          .padding(14)
          .borderRadius(14)
          .backgroundColor('rgba(0,0,0,0.12)')

          Column({ space: 6 }) {
            Text('判定说明')
              .fontSize(14)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
            Text('1. A 组与 B 组 Button 使用同一材质对象与尺寸，仅位置不同（标题栏 vs 内容区）。')
              .fontSize(11)
              .fontColor('#F0FAFF')
            Text('2. 探针未设置 buttonStyle/backgroundColor；材质生效后背景恢复透明，可作生效信号。')
              .fontSize(11)
              .fontColor('#F0FAFF')
            Text('3. C 组为清单内组件对照：若 C 生效而 B 不生效并伴随 out of scope 日志，则 Button 生效区域受限成立。')
              .fontSize(11)
              .fontColor('#F0FAFF')
          }
          .alignItems(HorizontalAlign.Start)
          .width('100%')
          .padding(14)
          .borderRadius(14)
          .backgroundColor('rgba(0,0,0,0.12)')
        }
        .width('100%')
        .padding(16)
        .linearGradient({
          angle: 180,
          colors: [
            ['#004AAF', 0.0],
            ['#2787D9', 0.5],
            ['#F0FAFF', 1.0]
          ]
        })
      }
      .hideToolBar(true)
      .title(this.NavigationTitle, { barStyle: BarStyle.STACK, systemMaterial: new uiMaterial.ImmersiveMaterial({
        style: uiMaterial.ImmersiveStyle.THIN,
        interactive: true,
        lightEffect: {},
      }) })
    }
    .width('100%')
    .height('100%')
  }
}
