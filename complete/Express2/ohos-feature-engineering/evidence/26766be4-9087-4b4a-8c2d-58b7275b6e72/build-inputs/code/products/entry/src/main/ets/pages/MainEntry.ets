import { HomePage } from 'business_home';
import { OrderPage } from 'business_order';
import { BenefitPage } from 'business_benefits';
import { MinePage } from 'business_mine';
import { CommonTitle, ControllerModule, RouterMap, RouterModule } from 'lib_foundation';
import { TabListItem } from '../types';
import { MainEntryVM } from '../viewmodels/MainEntryVM';
import { WantUtils } from '../utils/WantUtils';
import { WidgetCardVM } from '../viewmodels/WidgetCardVM';


@Builder
export function MainEntryBuilder() {
  MainEntry()
}

@ComponentV2
struct MainEntry {
  vm: MainEntryVM = new MainEntryVM();
  formCardVM: WidgetCardVM = WidgetCardVM.instance;
  @Local opacityList: number[] = [1.0, 0, 0, 0];
  private controller: TabsController = new TabsController();
  // tab切换动画淡入淡出
  private customContentTransition: (from: number, to: number) => TabContentAnimatedTransition =
    (from: number, to: number) => {
      let tabContentAnimatedTransition = {
        timeout: 1200,
        transition: (proxy: TabContentTransitionProxy) => {
          this.opacityList[from] = 1.0;
          this.opacityList[to] = 0.1;
          this.getUIContext()?.animateTo({
            duration: 200,
            onFinish: () => {
              proxy.finishTransition();
            },
          }, () => {
            this.opacityList[from] = 0.1;
            this.opacityList[to] = 1.0;
          });
        },
      } as TabContentAnimatedTransition;
      return tabContentAnimatedTransition;
    };

  // 桌面快捷方式
  @Monitor('vm.pageRouter.shortcutId')
  shortcutsChange() {
    if (this.vm.pageRouter.shortcutId) {
      WantUtils.jumpToShortcutsPage(this.vm.userInfoModel.isLogin);
    }
  }

  // 服务卡片
  @Monitor('vm.pageRouter.formCardId')
  formCardChange() {
    if (this.vm.pageRouter.formCardId) {
      WantUtils.jumpToFormCardPage();
    }
  }

  @Monitor('vm.userInfoModel.isLogin')
  onLoginChange() {
    this.formCardVM.updateFormCardData(true);
  }

  aboutToAppear() {
    // tabs控制器存起来使用
    ControllerModule.set(this.controller);
    // 初始化沉浸光感（按设备能力与系统版本决定是否启用）
    this.vm.initImmersiveMaterial();
    // 更新服务卡片
    this.formCardVM.updateFormCardData();
    // 开启轮询
    this.formCardVM.startPolling();
    // 服务卡片
    if (this.vm.pageRouter.formCardId) {
      WantUtils.jumpToFormCardPage();
    }
    // 桌面图标
    if (this.vm.pageRouter.shortcutId) {
      WantUtils.jumpToShortcutsPage(this.vm.userInfoModel.isLogin);
    }
  }

  build() {
    NavDestination() {
      Column() {
        Tabs({ barPosition: BarPosition.End, index: this.vm.curIndex, controller: this.controller }) {
          TabContent() {
            HomePage()
          }
          .opacity(this.opacityList[0])
          .tabBar(this.tabBarBuilder(0, this.vm.tabList[0]))

          TabContent() {
            OrderPage({
              currentTabIndex: this.vm.curIndex
            })
          }
          .opacity(this.opacityList[1])
          .tabBar(this.tabBarBuilder(1, this.vm.tabList[1]))

          TabContent() {
            BenefitPage()
          }
          .opacity(this.opacityList[2])
          .tabBar(this.tabBarBuilder(2, this.vm.tabList[2]))

          TabContent() {
            MinePage()
          }
          .opacity(this.opacityList[3])
          .tabBar(this.tabBarBuilder(3, this.vm.tabList[3]))
        }
        .width('100%')
        .height('100%')
        .scrollable(false)
        .vertical(this.vm.isTabVertical)
        .barPosition(this.vm.barPosition)
        .barWidth(this.vm.tabWidth)
        .barHeight(this.vm.tabHeight)
        // 手机模式页签栏悬浮于内容之上，配合悬浮材质生效；大屏侧栏模式恢复占位
        .barOverlap(!this.vm.isTabVertical)
        .attributeModifier(this.vm.immersiveModifierHolder?.tabBar)
        .customContentTransition(this.customContentTransition)
        .onContentWillChange((currentIndex: number, comingIndex: number) => {
          if ((comingIndex === 1 || comingIndex === 2) && !this.vm.userInfoModel.isLogin) {
            RouterModule.push({ url: RouterMap.QUICK_LOGIN_PAGE }, () => {
              this.controller.changeIndex(comingIndex);
            })
            return false;
          }
          return true;
        })
        .onChange((index: number) => {
          this.vm.curIndex = index;
        })
      }
      .width('100%')
      .padding({
        bottom: this.vm.windowModel.windowBottomPadding
      })
      .backgroundColor(Color.White)
    }
    .title({builder: this.mainTitleBuilder(), height: 80 }, { barStyle: BarStyle.STACK })
    .hideToolBar(true)
    .onBackPressed(() => {
      return this.vm.onBackPressed();
    })
  }

  // 标题栏：STACK 样式覆盖内容区，容器节点设置沉浸光感材质
  @Builder
  mainTitleBuilder() {
    Column() {
      CommonTitle({
        title: this.vm.tabList[this.vm.curIndex].label,
        titleHeight: 80,
        showBackBtn: false,
        rightBuilder: this.titleRightBuilder,
      })
    }
    .attributeModifier(this.vm.immersiveModifierHolder?.titleBar)
  }

  // 标题栏右侧圆形：沉浸光感材质（材质阴影 + 按压交互形变）
  @Builder
  titleRightBuilder() {
    Column()
      .width(50)
      .height(50)
      .borderRadius(25)
      .justifyContent(FlexAlign.Center)
      .attributeModifier(this.vm.immersiveModifierHolder?.titleBarCircle)
  }

  @Builder
  tabBarBuilder(index: number, item: TabListItem) {
    Column() {
      Image(this.vm.curIndex === index ? item.iconChecked : item.icon)
        .width(24)
        .height(24);
      Text(item.label)
        // 选中色使用系统资源色，配合材质 colorInvert 自动反色
        .fontColor(this.vm.curIndex === index ? $r('sys.color.brand') :
          $r('sys.color.icon_secondary'))
        .fontSize(10)
        .margin({ top: 4 });

    }.width('100%');
  }
}