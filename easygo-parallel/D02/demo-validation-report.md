# D02 主页与关联页首次分栏组合

- 场景：EP-S002（EP-S002 主页与关联页）
- 工程：`/Users/ming/harmonyos-validation/easygo-parallel/D02/test-demo`
- 环境：Huawei_TripleFold (模拟器, serial 127.0.0.1:5557) / HarmonyOS 7.0.0(26.0.0) / API 26 (SDK 26.0.0.105 Release)
- 验证日期：2026-10-08（opencode 自动验证 + 截图判图）
- 结论：2/2 变体符合官网描述

| 验证点 | 状态 | 实际结果 |
|---|---|---|
| D02-01 | 通过 | home-related：启动即左主页+右关联页（商品分类）；home-only：左主页+右系统占位页 |

## 证据

![主页+关联页](evidence/emulator/D02-01-home-related.png)

![只配置主页](evidence/emulator/D02-01-home-only.png)

## 限制

Router 路由格式未覆盖（Demo 为 Navigation 路由）（场景路由选择 Navigation 路线）
