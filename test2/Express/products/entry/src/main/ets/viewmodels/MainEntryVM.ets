import { AppStorageV2, uiMaterial } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';
import { BaseViewModel, BreakpointNameEnum, ContextUtil, RouterModule } from 'lib_foundation';
import { PageRouterModel, TabListItem } from '../types';

/** 沉浸光感接口最低 API 版本（判据 IL-F001：ArkUI 沉浸光感接口从 API 26 起提供） */
const IMMERSIVE_MATERIAL_MIN_API: number = 26;


@ObservedV2
export class MainEntryVM extends BaseViewModel {
  // 路由栈实例
  @Trace navStack: NavPathStack = RouterModule.stack;
  @Trace pageRouter: PageRouterModel = AppStorageV2.connect(PageRouterModel, () => new PageRouterModel())!;
  // 当前页签
  @Trace curIndex: number = 0;
  @Trace firstBackTime: number = 0;
  tabList: TabListItem[] = [
    {
      label: '首页',
      icon: $r('app.media.ic_home'),
      iconChecked: $r('app.media.ic_home_selected'),
    },
    {
      label: '查快递',
      icon: $r('app.media.ic_express'),
      iconChecked: $r('app.media.ic_express_selected'),
    },
    {
      label: '福利',
      icon: $r('app.media.ic_gift'),
      iconChecked: $r('app.media.ic_gift_selected'),
    },
    {
      label: '我的',
      icon: $r('app.media.ic_mine'),
      iconChecked: $r('app.media.ic_mine_selected'),
    }
  ]

  @Computed
  get isTabVertical() {
    return [
      BreakpointNameEnum.LG,
      BreakpointNameEnum.XL,
    ].includes(this.breakPointModel.currentBreakpoint);
  }

  @Computed
  get barPosition() {
    if (this.isTabVertical) {
      return BarPosition.Start;
    }
    return BarPosition.End;
  }

  @Computed
  get tabWidth(): Length {
    if (this.isTabVertical) {
      return 96;
    }
    return '100%';
  }

  @Computed
  get tabHeight(): Length {
    if (this.isTabVertical) {
      return 400;
    }
    return 48;
  }

  /**
   * 底部悬浮页签样式（判据 IL-F010：Tabs 使用 FloatingTabBarStyle.systemMaterial）。
   * 悬浮样式仅在 barOverlap=true、vertical=false、barPosition=End 同时满足时生效，
   * 竖排页签（LG/XL 断点）返回 undefined 保持原样式。
   * 判据 IL-F008：运行时查询设备能力，低版本或不支持设备回退为 undefined（普通样式）。
   */
  @Computed
  get tabBarFloatingStyle(): FloatingTabBarStyle | undefined {
    if (this.isTabVertical) {
      return undefined;
    }
    if (deviceInfo.sdkApiVersion < IMMERSIVE_MATERIAL_MIN_API || !uiMaterial.isImmersiveMaterialSupported()) {
      return undefined;
    }
    return {
      systemMaterial: new uiMaterial.ImmersiveMaterial({
        style: uiMaterial.ImmersiveStyle.THIN
      })
    };
  }

  onBackPressed() {
    let nowTime = Date.now();
    if (nowTime - this.firstBackTime < 1500) {
      return false;
    } else {
      this.firstBackTime = nowTime;
      ContextUtil.showToast({ message: '再按一次退出应用' });
      return true;
    }
  }
}
