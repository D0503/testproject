import { uiMaterial } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';

/**
 * 沉浸光感 AttributeModifier 持有对象。
 * 该模块依赖 API 26 的 @ohos.arkui.uiMaterial，只能通过动态 import 加载，
 * 保证 compatibleSdkVersion 低于 26 的设备不加载本模块、回退普通样式。
 */
export interface ImmersiveModifierHolder {
  titleBar: AttributeModifier<ColumnAttribute>;
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
    })),
    tabBar: new TabBarMaterialModifier(new uiMaterial.ImmersiveMaterial({
      style: uiMaterial.ImmersiveStyle.THIN,
    })),
  };
}
