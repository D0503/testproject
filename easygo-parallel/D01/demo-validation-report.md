# D01 基础平行视界分栏（navigationSplit vs original）

- 场景：EP-S001（EP-S001 基础接入与 original 基线）
- 工程：`/Users/ming/harmonyos-validation/easygo-parallel/D01/test-demo`
- 环境：Huawei_TripleFold (模拟器, serial 127.0.0.1:5557) / HarmonyOS 7.0.0(26.0.0) / API 26 (SDK 26.0.0.105 Release)
- 验证日期：2026-10-08（opencode 自动验证 + 截图判图）
- 结论：2/2 变体符合官网描述

| 验证点 | 状态 | 实际结果 |
|---|---|---|
| D01-01 | 通过 | parallel-enabled：左侧主页列表+右侧详情页 1:1 分栏；parallel-original：详情页单页全宽无分栏 |

## 证据

![navigationSplit 分栏](evidence/emulator/D01-01-parallel-enabled.png)

![original 单页基线](evidence/emulator/D01-01-parallel-original.png)

## 限制

仅验证宽屏（长方形）窗口；方形窗口形态未单独覆盖（模拟器 TripleFold 展开态为长方形宽屏窗口）
