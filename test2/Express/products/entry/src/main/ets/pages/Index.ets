import { uiMaterial } from '@kit.ArkUI';

@Entry
@Component
struct SliderSystemMaterial {
  build() {
    Column() {
      Slider({
        style: SliderStyle.InSet
      })
        .padding({top:50})
        // .alignRules({
        //   center: { anchor: '__container__', align: VerticalAlign.Top },
        //   middle: { anchor: '__container__', align: HorizontalAlign.Start },
        // })
        .systemMaterial(new uiMaterial.ImmersiveMaterial({
          style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
        }))
    }
    .height('100%')
    .width('100%')
    // 请开发者替换为实际资源文件
    .backgroundImage($r("app.media.bg_benefit"))
  }
}