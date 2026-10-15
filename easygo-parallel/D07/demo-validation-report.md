# D07 虚拟容器与页面尺寸适配（enableReducedContainerSize）

- 场景：EP-S007（EP-S007 虚拟容器）
- 工程：`/Users/ming/harmonyos-validation/easygo-parallel/D07/test-demo`
- 环境：Huawei_TripleFold (模拟器, serial 127.0.0.1:5557) / HarmonyOS 7.0.0(26.0.0) / API 26 (SDK 26.0.0.105 Release)
- 验证日期：2026-10-08（opencode 自动验证 + 截图判图）
- 结论：2/2 变体符合官网描述

| 验证点 | 状态 | 实际结果 |
|---|---|---|
| D07-01 | 通过 | off：600lpx 渐变条超出右分栏被截断（右标尺不可见）；on：同一内容在右分栏内完整显示（左右标尺均可见） |

## 证据

![关闭时截断](evidence/emulator/D07-01-reduced-container-off.png)

![开启后完整](evidence/emulator/D07-01-reduced-container-on.png)

## 限制

退出分栏自动失效与分屏下屏幕宽度回退未单独截图（需联动全屏页/分屏场景，超出本验证点最小范围）
