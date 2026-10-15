# D05 全屏页进入退出分栏与返回恢复

- 场景：EP-S005（EP-S005 全屏页与恢复分栏）
- 工程：`/Users/ming/harmonyos-validation/easygo-parallel/D05/test-demo`
- 环境：Huawei_TripleFold (模拟器, serial 127.0.0.1:5557) / HarmonyOS 7.0.0(26.0.0) / API 26 (SDK 26.0.0.105 Release)
- 验证日期：2026-10-08（opencode 自动验证 + 截图判图）
- 结论：进入全屏与返回恢复两时刻均符合官网描述

| 验证点 | 状态 | 实际结果 |
|---|---|---|
| D05-01 | 通过 | 进入全屏页：退出分栏独占全窗口；返回后：恢复左主页+右详情 1:1 分栏且路由状态保持 |

## 证据

![全屏页退出分栏](evidence/emulator/D05-01-fullscreen.png)

![返回恢复分栏](evidence/emulator/D05-01-restore.png)

## 限制

未验证全屏页与横屏叠加场景（超出本场景范围（EP-S006 单独覆盖横屏））
