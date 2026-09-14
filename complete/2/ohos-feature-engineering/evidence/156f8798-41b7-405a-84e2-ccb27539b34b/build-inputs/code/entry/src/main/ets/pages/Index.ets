import { uiMaterial } from '@kit.ArkUI';

@Builder
function EmptyBuilder() {
}

// 弹窗内容区保持合理尺寸（约 328x216），避免接近全屏带来的动效绘制开销
@CustomDialog
struct MaterialDialog {
  controller?: CustomDialogController;

  build() {
    Column({ space: 12 }) {
      Text('自定义弹窗')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
      Text('CustomDialogControllerOptions.systemMaterial 设置沉浸式系统材质，样式 ULTRA_THICK。')
        .fontSize(14)
        .fontColor($r('sys.color.font_secondary'))
        .textAlign(TextAlign.Center)
      Button('关闭')
        .width(120)
        .onClick(() => {
          this.controller?.close();
        })
    }
    .width(328)
    .height(216)
    .justifyContent(FlexAlign.Center)
    .padding(16)
  }
}

// 半透明卡片（渐变实现）：页面内容区不使用沉浸式系统材质，控制材质使用面积
@Component
struct DemoCard {
  @BuilderParam content: () => void = EmptyBuilder;

  build() {
    Column({ space: 12 }) {
      this.content()
    }
    .padding(16)
    .borderRadius(16)
    .width('90%')
    .linearGradient({
      angle: 90,
      colors: [['#1AFFFFFF', 0], ['#1AFFFFFF', 1]]
    })
  }
}

@Entry
@Component
struct Index {
  @State showPopup: boolean = false;
  @State showMenu: boolean = false;
  @State showSheet: boolean = false;
  dialogController: CustomDialogController = new CustomDialogController({
    builder: MaterialDialog(),
    systemMaterial: new uiMaterial.ImmersiveMaterial({
      style: uiMaterial.ImmersiveStyle.ULTRA_THICK
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center,
    cancel: () => {
      console.info('CustomDialog auto cancel');
    }
  });

  // 即时反馈：ShowToastOptions.systemMaterial（THICK），不设置 backgroundColor / backgroundBlurStyle
  showToastFeedback(): void {
    try {
      this.getUIContext().getPromptAction().showToast({
        message: '即时反馈：Toast 沉浸式系统材质（THICK）',
        duration: 2500,
        systemMaterial: new uiMaterial.ImmersiveMaterial({
          style: uiMaterial.ImmersiveStyle.THICK
        })
      });
    } catch (error) {
      console.error(`showToast failed: ${JSON.stringify(error)}`);
    }
  }

  // 弹出框：AlertDialogParam.systemMaterial（ULTRA_THICK），保留按钮回调
  showAlertDialog(): void {
    AlertDialog.show({
      title: '警告弹窗',
      message: 'AlertDialog 通过 AlertDialogParam.systemMaterial 设置沉浸式系统材质（ULTRA_THICK）。',
      primaryButton: {
        value: '取消',
        action: () => {
          console.info('AlertDialog cancel');
        }
      },
      secondaryButton: {
        value: '确定',
        action: () => {
          console.info('AlertDialog confirm');
        }
      },
      systemMaterial: new uiMaterial.ImmersiveMaterial({
        style: uiMaterial.ImmersiveStyle.ULTRA_THICK
      })
    });
  }

  // 弹出框：ActionSheetOptions.systemMaterial（ULTRA_THICK），materialColor 为半透明色
  showActionSheet(): void {
    ActionSheet.show({
      title: '选择操作',
      message: 'ActionSheet 演示半透明 materialColor 赋色，不透明颜色会遮挡材质滤镜效果。',
      sheets: [
        {
          title: '选项一',
          action: () => {
            console.info('ActionSheet option 1');
          }
        },
        {
          title: '选项二',
          action: () => {
            console.info('ActionSheet option 2');
          }
        },
        {
          title: '选项三',
          action: () => {
            console.info('ActionSheet option 3');
          }
        }
      ],
      systemMaterial: new uiMaterial.ImmersiveMaterial({
        style: uiMaterial.ImmersiveStyle.ULTRA_THICK,
        materialColor: 'rgba(64, 128, 255, 0.2)'
      })
    });
  }

  // 菜单：ContextMenuOptions.systemMaterial（THICK）
  @Builder
  MenuBuilder() {
    Menu() {
      MenuItem({ content: '菜单项一' })
      MenuItem({ content: '菜单项二' })
      MenuItem({ content: '菜单项三' })
    }
  }

  // 半模态：SheetOptions.systemMaterial（ULTRA_THICK），高度保持常规尺寸
  @Builder
  SheetBuilder() {
    Column({ space: 12 }) {
      Text('半模态转场')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
      Text('SheetOptions.systemMaterial 设置沉浸式系统材质（ULTRA_THICK）。')
        .fontSize(14)
        .fontColor($r('sys.color.font_secondary'))
        .textAlign(TextAlign.Center)
      Button('关闭半模态')
        .width(160)
        .margin({ top: 12 })
        .onClick(() => {
          this.showSheet = false;
        })
    }
    .width('100%')
    .padding(24)
    .alignItems(HorizontalAlign.Center)
  }

  @Builder
  CardTitle(title: string, subtitle: string) {
    Column({ space: 4 }) {
      Text(title)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
      Text(subtitle)
        .fontSize(12)
        .fontColor($r('sys.color.font_secondary'))
    }
    .alignItems(HorizontalAlign.Start)
    .width('100%')
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        Text('弹窗类组件沉浸光感 Demo')
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 36, bottom: 4 })
        Text('API 26 · 应用级 ENABLE · 组件级 systemMaterial')
          .fontSize(12)
          .fontColor($r('sys.color.font_secondary'))

        DemoCard() {
          this.CardTitle('即时反馈（Toast）', 'ShowToastOptions.systemMaterial · THICK')
          Button('显示 Toast')
            .width('100%')
            .onClick(() => {
              this.showToastFeedback();
            })
        }

        DemoCard() {
          this.CardTitle('气泡提示（Popup / Tips）', 'PopupOptions / TipsOptions.systemMaterial · THICK')
          Row({ space: 12 }) {
            Button('气泡 Popup')
              .layoutWeight(1)
              .onClick(() => {
                this.showPopup = !this.showPopup;
              })
              .bindPopup(this.showPopup, {
                message: '气泡提示：Popup 沉浸式系统材质（THICK）',
                placement: Placement.Top,
                onStateChange: (state: PopupStateChangeParam) => {
                  if (!state.isVisible) {
                    this.showPopup = false;
                  }
                },
                systemMaterial: new uiMaterial.ImmersiveMaterial({
                  style: uiMaterial.ImmersiveStyle.THICK
                })
              })
            Button('长按悬浮 Tips')
              .layoutWeight(1)
              .bindTips('悬浮提示：Tips 沉浸式系统材质（THICK）', {
                appearingTime: 300,
                disappearingTime: 2000,
                systemMaterial: new uiMaterial.ImmersiveMaterial({
                  style: uiMaterial.ImmersiveStyle.THICK
                })
              })
          }
          .width('100%')
        }

        DemoCard() {
          this.CardTitle('菜单（Menu）', 'ContextMenuOptions.systemMaterial · THICK')
          Button('打开菜单')
            .width('100%')
            .onClick(() => {
              this.showMenu = !this.showMenu;
            })
            .bindContextMenu(this.showMenu, this.MenuBuilder, {
              systemMaterial: new uiMaterial.ImmersiveMaterial({
                style: uiMaterial.ImmersiveStyle.THICK
              })
            })
        }

        DemoCard() {
          this.CardTitle('弹出框（Dialog）', 'AlertDialogParam / CustomDialogControllerOptions / ActionSheetOptions / SheetOptions · ULTRA_THICK')
          Button('AlertDialog 警告弹窗')
            .width('100%')
            .onClick(() => {
              this.showAlertDialog();
            })
          Button('CustomDialog 自定义弹窗')
            .width('100%')
            .onClick(() => {
              this.dialogController.open();
            })
          Button('ActionSheet 选择列表')
            .width('100%')
            .onClick(() => {
              this.showActionSheet();
            })
          Button('bindSheet 半模态')
            .width('100%')
            .onClick(() => {
              this.showSheet = true;
            })
            .bindSheet(this.showSheet, this.SheetBuilder(), {
              height: 320,
              showClose: true,
              onDisappear: () => {
                console.info('Sheet dismiss');
              },
              systemMaterial: new uiMaterial.ImmersiveMaterial({
                style: uiMaterial.ImmersiveStyle.ULTRA_THICK
              })
            })
        }

        Text('弹窗类组件与接口可在页面内全部区域生效，无需位于标题栏或 TabBar')
          .fontSize(12)
          .fontColor($r('sys.color.font_secondary'))
          .margin({ top: 8, bottom: 32 })
          .width('90%')
          .textAlign(TextAlign.Center)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)
    }
    .width('100%')
    .height('100%')
    .align(Alignment.Top)
    .linearGradient({
      angle: 180,
      colors: [
        ['#0A3D91', 0],
        ['#2E7CD6', 0.5],
        ['#B8E4FF', 1]
      ]
    })
  }
}
