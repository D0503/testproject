# 3DGS端侧重建路由说明

## 能力定位

本能力包覆盖 Spatial Recon Kit（空间建模套件）的端侧 3DGS 全链路：C/C++ 重建流水线与 ArkTS 渲染/编辑。该 Kit 是 ArkGraphics 3D 模块的扩展，任何路线都需与 @kit.ArkGraphics3D 联合使用，不能脱离 ArkGraphics 3D 场景体系单独接入。

## 路线选择

- **route-c-ndk-recon（默认路线）**：目标涉及端侧三维重建、C/C++ NDK 接口（HMS_SpatialRecon_* 函数族、spatial_recon_interface.h、libspatial_recon_ndk.z.so）、相机/AR 推帧、重建进度、暂停恢复、结果保存导出（MP4/PLY）时进入本路线。对应场景 SR-S001～SR-S004。SDK 起始口径 6.1.0(23)；HMS_SpatialReconNGCallbackFunc 与 HMS_SpatialRecon_RegisterNGCallbackFunc 等 NG 回调 26.0.0 起才提供，版本门槛须按场景判据现核。
- **route-arkts-render**：目标涉及 3DGS 模型加载与渲染（spatialRender/loadGSNode）、渲染滤镜（复古/漫画/黑白bit/颜色编辑）、大规模分块加载（TiledGSNode/.sog 瓦片）、模型编辑与导出（spatialEdit）时进入本路线。对应场景 SR-S005～SR-S008。spatialRender 起始口径 6.0.1(21)，滤镜参数枚举存在 6.0.1(21) 与 6.1.0(23) 版本差异；TiledGSNode/setTileRequestCallback/notifyTileReady 与 spatialEdit 模块仅 26.0.0 起可用。
- 同一目标同时命中两条路线（如先重建再渲染展示）时，按用户明确指定的接口家族或 Kit 名称优先；无法确定时列出候选场景交由用户选择，不得默认合并或擅自切换路线。

## 特有验证约束

- Kit 仅支持中国境内（香港、澳门特别行政区、中国台湾除外）；适用 Phone/Tablet/PC/2in1/TV 设备形态，暂不支持模拟器。涉及设备与地区判据时按此边界核对，并均以当次冻结官网快照为准。
- C/C++ 重建输入帧仅支持 width=1080、height=1440 的图像，自定义输入仅支持 RGB 格式，其余尺寸结果未定义；PushFrame/PushARFrame 要求帧数据有效。
- 同一时刻仅允许一个 session 执行重建、仅允许一个 session 保存 MP4；正在执行重建/保存时销毁会话或销毁后继续操作均为未定义行为。
- 芯片体验边界：仅保证 Kirin 9020/9030S/9030/9030 Pro 及以后旗舰芯片的耗时与质量；其他芯片即使 HMS_SpatialRecon_IsSupport 通过也不构成质量承诺。IsSupport 结果可随硬件/系统版本/环境变化。
- StartSession 启动建模后无法再推送帧；启动后须按前后台正确调用 HMS_SpatialRecon_SetRunningMode，否则性能功耗劣化。
- ArkTS 侧调用任何 spatialRender 接口前，必须先通过 ArkGraphics 3D 的 renderContext.loadPlugin(spatialRender.GSPlugin.PLUGIN_ID) 加载插件，再 Scene.load() 与加载节点，否则未定义行为；全部接口仅 Stage 模型可用。
- 保存侧：writeInfo 非空时自动保存，为空可后续 HMS_SpatialRecon_SaveResultToFile 手动保存；输出格式仅 MP4（运镜视频）与 PLY（点云）；modelFile 必填且必须是应用文件目录的子目录，audioFile 须以 .mp3 结尾或为 nullptr。
- spatialEdit.extract3DMainBody 的结果会覆盖内存中 GSNode 数据，操作前须确认可接受覆盖语义。

## 设备与运行策略

- install/runtime/visual 各层验证一律使用真机（Kit 暂不支持模拟器），且运行前确认设备 IsSupport 通过并处于支持地区。
- 真机重建耗时与质量、滤镜视觉效果、分块加载内存收益等运行表现为待验证项，结论以当轮实际运行与冻结判据为准，本包不预存规范事实。