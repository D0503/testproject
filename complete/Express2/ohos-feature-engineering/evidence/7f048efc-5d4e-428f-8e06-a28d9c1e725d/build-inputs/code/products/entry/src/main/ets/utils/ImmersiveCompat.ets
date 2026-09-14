import { uiMaterial } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';

/**
 * 沉浸光感 AttributeModifier 持有对象。
 * 该模块依赖 API 26 的 @ohos.arkui.uiMaterial，只能通过动态 import 加载，
 * 保证 compatibleSdkVersion 低于 26 的设备不加载本模块、回退普通样式。
 */
export interface ImmersiveModifierHolder {
  titleBar: AttributeModifier<ColumnAttribute>;
  titleBarCircle: AttributeModifier<ColumnAttribute>;
  tabBar: AttributeModifier<TabsAttribute>;
}

class TitleBarMaterialModifier implements AttributeModifier<ColumnAttribute> {
  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;

  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
    this.material = material;
  }

  applyNormalAttribute(instance: ColumnAttribute): void {
    instance.systemMaterial(this.material);
  }
}

class TabBarMaterialModifier implements AttributeModifier<TabsAttribute> {
  private material: uiMaterial.ImmersiveMaterial | undefined = undefined;

  constructor(material: uiMaterial.ImmersiveMaterial | undefined) {
    this.material = material;
  }

  applyNormalAttribute(instance: TabsAttribute): void {
    instance.barFloatingStyle({ systemMaterial: this.material });
  }
}

export function createImmersiveModifiers(): ImmersiveModifierHolder | undefined {
  let supported = false;
  try {
    supported = deviceInfo.sdkApiVersion >= 26 && uiMaterial.isImmersiveMaterialSupported();
  } catch (err) {
    supported = false;
  }
  if (!supported) {
    return undefined;
  }
  return {
    titleBar: new TitleBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
      style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
      // 沉浸材质自带阴影效果，优先于通用 shadow 属性
      applyShadow: true,
    })),
    // 标题栏右侧圆形：ULTRA_THIN 材质 + 材质阴影 + 按压交互形变
    titleBarCircle: new TitleBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
      style: uiMaterial.ImmersiveStyle.ULTRA_THIN,
      applyShadow: true,
      interactive: true,
    })),
    tabBar: new TabBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
      // THIN 薄材质：满足自动反色的样式前提
      style: uiMaterial.ImmersiveStyle.THIN,
      // 开启自动反色：子节点资源颜色随背景反色
      colorInvert: true,
      // 材质赋色：带透明度的红色，不遮挡材质滤镜
      materialColor: 'rgba(255, 0, 0, 0.2)',
      // 交互形变：按压弹性形变
      interactive: true,
      // 点光源：触摸流光跟随（默认白色）
      lightEffect: {},
      // 沉浸材质阴影效果
      applyShadow: true,
    })),
  };
}
