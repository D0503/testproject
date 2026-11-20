# 碰一碰精准分享 · 专属路由

## 技术路线
- 唯一路线 `share-kit-knock`（Share Kit）：`harmonyShare` 负责 knockShare/dataReceive 事件与 SharableTarget/ReceivableTarget 交互；`systemShare`（SharedData/SharedRecord/getSharedData）负责分享数据构造与解析。仅 Stage 模型，系统能力 SystemCapability.Collaboration.HarmonyShare / SystemShare。
- 命中词：碰一碰、碰一碰分享、超近场分享、华为分享、knockShare、harmonyShare。显式命中时只考虑本路线场景及 crossRoute 场景。

## 场景分流
- 手机间内容分享发送端（on/off('knockShare')、SendCapabilityRegistry、卡片模板、updateShareData 延迟更新、clarifyNonShare/reject 异常终止）→ KPS-S001。
- 目标设备接收落位、一步直达与指定应用直达（module.json5 shareType/shareBundleName、同包名优先、能力限制）→ KPS-S002。
- 手机与 PC/2in1、Tablet 互分享与沙箱接收（on('dataReceive')、RecvCapabilityRegistry(utd/maxSupportedCount)、receive/reject、类型与数量不匹配回退）→ KPS-S003。
- 轻碰坐标精准分享（getInfo().coordinate.screenX/screenY、触发点位置匹配插入/分享、版本与设备校验降级）→ KPS-S004。
- 卡片模板与界面设计规范（四区域自定义边界、五类模板、比例自适应与裁剪、预览图建议）→ KPS-S005。
- 版本与设备形态差异核验（Tablet 互通版本、双向分享手机优先发送机制、sendOnly 拦截、dataReceive 设备差异与 801、物理姿态与保护壳约束）→ KPS-S006（crossRoute，可绕过显式路线过滤）。
- 错误码 1003700001/1003702001/1003702002/1003703001 与 FAQ 排查（数据类型混合负例、文件 URI 不可访问、自定义 utd 扩展）→ KPS-S007。

## 验证与实施约束
- 需两台满足版本约束的设备（手机 + 手机/PC/2in1/Tablet；PC/2in1 系统 HarmonyOS 6.0.0 Beta1+，DevEco Studio 6.0.0 Beta1+）且登录同一华为账号；轻碰角度、直板/折叠直板态、不超出屏幕、保护壳等物理约束详见 KPS-S006。
- 判据一律从本次冻结官网快照现提锚定；各版本号（坐标 26.0.0、Tablet 6.1.0(23)、双向分享 Beta5 起限制等）为文档记录，不得当作已验证事实。
- 真机轻碰互通、沙箱落位、触发点插入效果未经实际验证前不得宣称通过；按六层验证策略如实记录 build/runtime/visual 状态。
- 范围不含系统分享面板通用场景与隔空传送（gesturesShare）；harmonyShare 参考页中 gesturesShare 章节不作为本能力包判据来源。