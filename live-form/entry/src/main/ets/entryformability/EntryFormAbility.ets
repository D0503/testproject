import { FormExtensionAbility, formBindingData, formInfo, formProvider } from '@kit.FormKit';
import { BusinessError, thermal } from '@kit.BasicServicesKit';
import { Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { Constants } from '../common/Constants';

const TAG: string = 'EntryFormAbility';
const DOMAIN_NUMBER: number = 0xFF00;

export default class EntryFormAbility extends FormExtensionAbility {
  onAddForm(want: Want) {
    hilog.info(DOMAIN_NUMBER, TAG, 'onAddForm');
    return formBindingData.createFormBindingData('');
  }

  async onFormEvent(formId: string, message: string) {
    let shortMessage: string = JSON.parse(message)['message'];

    // 当接收的message为requestOverflow，触发互动卡片动效
    if (shortMessage === 'requestOverflow') {
      let formRect: formInfo.Rect = await formProvider.getFormRect(formId);
      this.requestOverflow(formId, formRect.width, formRect.height);
      return;
    }
  }

  private requestOverflow(formId: string, formWidth: number, formHeight: number): void {
    if (formWidth <= 0 || formHeight <= 0) {
      hilog.info(DOMAIN_NUMBER, TAG, 'requestOverflow failed, form size is not correct.');
      return;
    }

    // 记录当前热档位，用于诊断热档位（HOT/OVERHEATED）导致的动效请求失败
    let thermalLevel: thermal.ThermalLevel = thermal.getLevel();
    hilog.info(DOMAIN_NUMBER, TAG, `requestOverflow current thermal level: ${thermalLevel}`);

    // 以卡片左上角为原点，基于卡片自身尺寸计算动效渲染区域（单位vp）
    let left: number = -Constants.OVERFLOW_LEFT_RATIO * formWidth;
    let top: number = -Constants.OVERFLOW_TOP_RATIO * formHeight;
    let width: number = Constants.OVERFLOW_WIDTH_RATIO * formWidth;
    let height: number = Constants.OVERFLOW_HEIGHT_RATIO * formHeight;
    let duration: number = Constants.OVERFLOW_DURATION;

    // 发起互动卡片动效申请
    try {
      formProvider.requestOverflow(formId, {
        // 动效申请范围，包含卡片全部区域且不超过最大可申请区域
        area: {
          left: left,
          top: top,
          width: width,
          height: height
        },
        // 动效持续时间
        duration: duration,
        // 指定是否使用系统提供的默认切换动效
        useDefaultAnimation: true,
      }).then(() => {
        hilog.info(DOMAIN_NUMBER, TAG, 'requestOverflow requestOverflow succeed');
      }).catch((error: BusinessError) => {
        // 不支持的设备返回801、省电或热档位受限返回16501000等，卡片保持普通卡片行为，不重试不缓存
        hilog.info(DOMAIN_NUMBER, TAG, `requestOverflow requestOverflow catch error` +
          `, code: ${error.code}, message: ${error.message}`);
      })
    } catch (e) {
      let error = e as BusinessError;
      hilog.info(DOMAIN_NUMBER, TAG, `requestOverflow call requestOverflow catch error` +
        `, code: ${error.code}, message: ${error.message}`);
    }
  }
}
