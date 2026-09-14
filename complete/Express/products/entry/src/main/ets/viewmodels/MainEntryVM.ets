import { AppStorageV2 } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';
import { BaseViewModel, BreakpointNameEnum, ContextUtil, RouterModule } from 'lib_foundation';
import { PageRouterModel, TabListItem } from '../types';
import type { ImmersiveModifierHolder } from '../utils/ImmersiveCompat';


@ObservedV2
export class MainEntryVM extends BaseViewModel {
  // 路由栈实例
  @Trace navStack: NavPathStack = RouterModule.stack;
  @Trace pageRouter: PageRouterModel = AppStorageV2.connect(PageRouterModel, () => new PageRouterModel())!;
  // 当前页签
  @Trace curIndex: number = 0;
  @Trace firstBackTime: number = 0;
  // 沉浸光感修饰器（API 26 且设备支持时创建）
  @Trace immersiveModifierHolder: ImmersiveModifierHolder | undefined = undefined;
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

  // 初始化沉浸光感：仅 API 26 及以上动态加载材质模块，低版本设备保持普通样式
  async initImmersiveMaterial(): Promise<void> {
    if (deviceInfo.sdkApiVersion < 26) {
      return;
    }
    try {
      const compat = await import('../utils/ImmersiveCompat');
      this.immersiveModifierHolder = compat.createImmersiveModifiers();
    } catch (err) {
      this.immersiveModifierHolder = undefined;
    }
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
