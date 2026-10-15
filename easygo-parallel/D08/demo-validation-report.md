# D08 窗口分屏中继续保持平行视界（enableInSplitScreen）

- 场景：EP-S008（EP-S008 分屏保持）
- 工程：`/Users/ming/harmonyos-validation/easygo-parallel/D08/test-demo`
- 环境：Huawei_TripleFold (模拟器, serial 127.0.0.1:5557) / HarmonyOS 7.0.0(26.0.0) / API 26 (SDK 26.0.0.105 Release)
- 验证日期：2026-10-08（opencode 自动验证 + 截图判图）
- 结论：配置、运行态判断与入口行为符合官网；分屏中保持平行视界的最终视觉效果模拟器无法判定

| 验证点 | 状态 | 实际结果 |
|---|---|---|
| D08-01 | 无法判定 | 分栏态下 isEasySplit=true、windowStatusType=1(FULL_SCREEN) 显示正确，按钮可见；点击后应用日志 startAbility 成功，但模拟器未呈现系统分屏窗口，无法观察分屏中平行视界是否保持 |

## 证据

![分栏态与分屏入口](evidence/emulator/D08-01-split-entry.png)

## 限制

系统分屏中的平行视界保持、enableInSplitScreen=false 对照均未覆盖（TripleFold 模拟器上 startAbility(WINDOW_MODE_SPLIT_PRIMARY) 成功返回但无可见分屏会话，需真机（平板/三折叠真机）验证）
