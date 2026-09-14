// HDS 沉浸光感 Demo：HdsNavigation 标题栏 + HdsTabs 底部悬浮页签
// 依据官网《HDS组件使用沉浸光感材质指南》自适应沉浸光感示例最小适配
import {
  HdsNavigation,
  HdsNavigationTitleMode,
  HdsNavigationMenuContentOptions,
  HdsTabs,
  HdsTabsController,
  ScrollEffectType,
  hdsMaterial
} from '@kit.UIDesignKit';
import { SymbolGlyphModifier } from '@kit.ArkUI';

interface TabItem {
  symbolGlyph: SymbolGlyphModifier,
  symbolGlyph1: SymbolGlyphModifier,
  label: string,
  defaultBgColor: ResourceColor,
  hoverBgColor: ResourceColor,
  pressBgColor: ResourceColor,
}

const TAB_CONFIG: TabItem[] = [
  {
    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.alarm_fill_1')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.alarm_fill_1')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
    label: '闹钟',
    defaultBgColor: Color.Transparent,
    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
  },
  {
    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.worldclock_fill_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.worldclock_fill_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
    label: '时钟',
    defaultBgColor: Color.Transparent,
    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
  },
  {
    symbolGlyph: new SymbolGlyphModifier($r('sys.symbol.stopwatch_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
      .fontColor([$r('sys.color.ohos_id_color_bottom_tab_icon_off'),
        $r('sys.color.ohos_id_color_bottom_tab_icon_auxcolor_off02')]),
    symbolGlyph1: new SymbolGlyphModifier($r('sys.symbol.stopwatch_2')).renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
      .fontColor([$r('sys.color.ohos_id_color_activated'), $r('sys.color.ohos_id_color_primary_contrary')]),
    label: '秒表',
    defaultBgColor: Color.Transparent,
    hoverBgColor: $r('sys.color.ohos_id_color_hover'),
    pressBgColor: $r('sys.color.ohos_id_color_click_effect')
  }
];

@Entry
@Component
struct Index {
  private scrollerForScroll: Scroller = new Scroller();
  private controller: HdsTabsController = new HdsTabsController();

  private menus: HdsNavigationMenuContentOptions = {
    value: [{
      content: {
        label: 'menu1',
        icon: $r('sys.symbol.square_and_pencil')
      }
    }, {
      content: {
        label: 'menu2',
        icon: $r('sys.symbol.star')
      }
    }, {
      content: {
        label: 'menu3',
        icon: $r('sys.symbol.more')
      }
    }
    ]
  };

  build() {
    HdsNavigation() {
      HdsTabs({ controller: this.controller }) {
        ForEach(TAB_CONFIG, (item: TabItem) => {
          TabContent() {
            Stack() {
              Scroll(this.scrollerForScroll) {
                Column() {
                  // 本地资源，替换官网示例中的 scenery01
                  Image($r('app.media.scenery')).width('100%')
                }
              }
              .clipContent(ContentClipMode.SAFE_AREA)
              .height('100%')
            }
          }
          .tabBar(new BottomTabBarStyle({
            normal: item.symbolGlyph, selected: item.symbolGlyph1
          }, item.label))
        })
      }
      // 悬浮布局条件：barOverlap(true) + vertical(false) + barPosition(End) + barFloatingStyle
      .barOverlap(true)
      .vertical(false)
      .barPosition(BarPosition.End)
      .barFloatingStyle({
        barBottomMargin: 28,
        // 底部悬浮页签沉浸光感：ADAPTIVE 类型 + ADAPTIVE 等级，跟随系统策略自适应
        systemMaterialEffect: {
          materialType: hdsMaterial.MaterialType.ADAPTIVE,
          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
        }
      })
    }
    .mode(NavigationMode.Stack)
    .titleBar({
      content: {
        title: {
          mainTitle: '沉浸光感',
        },
        menu: this.menus,
      },
      style: {
        scrollEffectOpts: {
          enableScrollEffect: false,
          scrollEffectType: ScrollEffectType.GRADIENT_BLUR,
        },
        // 标题栏按钮沉浸光感：ADAPTIVE 类型 + ADAPTIVE 等级，跟随系统策略自适应
        systemMaterialEffect: {
          materialType: hdsMaterial.MaterialType.ADAPTIVE,
          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
        },
      },
      avoidLayoutSafeArea: false,
      enableComponentSafeArea: false
    })
    .bindToScrollable([this.scrollerForScroll])
    .hideBackButton(false)
    .titleMode(HdsNavigationTitleMode.MINI)
    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM], [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
  }
}
