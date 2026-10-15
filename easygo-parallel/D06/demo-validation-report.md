# D06 主动横屏时全屏策略（supportLandscapeFullscreen）

- 场景：EP-S006（EP-S006 横屏全屏策略）
- 工程：`/Users/ming/harmonyos-validation/easygo-parallel/D06/test-demo`
- 环境：Huawei_TripleFold (模拟器, serial 127.0.0.1:5557) / HarmonyOS 7.0.0(26.0.0) / API 26 (SDK 26.0.0.105 Release)
- 验证日期：2026-10-08（opencode 自动验证 + 截图判图）
- 结论：2/2 变体符合官网描述

| 验证点 | 状态 | 实际结果 |
|---|---|---|
| D06-01 | 通过 | true：请求横屏后视频页退出分栏独占全窗口；false：保持左列表+右视频页分栏 |

## 证据

![true 退出分栏全屏](evidence/emulator/D06-01-landscape-fullscreen.png)

![false 保持分栏](evidence/emulator/D06-01-landscape-split.png)

## 限制

未在竖屏窗口态重复验证（模拟器展开态即宽屏）（TripleFold 展开态为宽屏形态）
