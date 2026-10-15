# D09 分栏比例、拖拽与分割线

- 场景：EP-S009（EP-S009 比例拖拽分割线）
- 工程：`/Users/ming/harmonyos-validation/easygo-parallel/D09/test-demo`
- 环境：Huawei_TripleFold (模拟器, serial 127.0.0.1:5557) / HarmonyOS 7.0.0(26.0.0) / API 26 (SDK 26.0.0.105 Release)
- 验证日期：2026-10-08（opencode 自动验证 + 截图判图）
- 结论：4/4 变体符合官网描述

| 验证点 | 状态 | 实际结果 |
|---|---|---|
| D09-01 | 通过 | 1|1：左右平分；1|2：左约 1/3 右约 2/3 |
| D09-02 | 通过 | drag-off：分割线固定按 ratio 显示无手柄；drag-on：初始 1:1 且显示拖拽手柄，拖动后吸附 1:2 档位 |

## 证据

![ratio 1|1](evidence/emulator/D09-01-ratio-1-1.png)

![ratio 1|2](evidence/emulator/D09-01-ratio-1-2.png)

![拖拽开启初始 1:1](evidence/emulator/D09-02-drag-on-initial.png)

![拖拽后吸附 1:2](evidence/emulator/D09-02-drag-on-after-drag.png)

## 限制

squareSplit（方形窗口）与深色模式分割线颜色未覆盖；拖拽仅验证一档吸附（模拟器展开态为长方形宽屏；深色模式切换未纳入本轮）
