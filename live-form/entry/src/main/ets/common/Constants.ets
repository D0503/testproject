// 互动卡片动效相关常量
export class Constants {
  // 互动卡片动效超范围，左侧偏移百分比 = 偏移值/卡片宽度
  public static readonly OVERFLOW_LEFT_RATIO: number = 0.1;
  // 互动卡片动效超范围，上侧偏移百分比 = 偏移值/卡片高度
  public static readonly OVERFLOW_TOP_RATIO: number = 0.15;
  // 互动卡片动效超范围，宽度放大百分比
  public static readonly OVERFLOW_WIDTH_RATIO: number = 1.2;
  // 互动卡片动效超范围，高度放大百分比
  public static readonly OVERFLOW_HEIGHT_RATIO: number = 1.3;
  // 互动卡片动效超范围，动效时长（不超过最大合法动效时长3500ms）
  public static readonly OVERFLOW_DURATION: number = 3500;
}
