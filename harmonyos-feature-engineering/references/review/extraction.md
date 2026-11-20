# 输入抽取

本地文件和目录的统一入口：

```text
node <skill>/scripts/prepare-review.mjs "<file|directory>" [--output "<temporary-json>"] [--max-evidence-pages 12]
```

## 单个本地文件

支持 `.md`、`.markdown`、`.html`、`.htm`、`.txt`。记录绝对路径、字节数、SHA-256 和本地修改时间；本地修改时间只用于文件完整性，不得写入官网抓取时间。

解析标题、章节、段落、代码围栏、链接、媒体、版本声明和来源元数据。文件内容超过脚本限制时停止并报告，不做静默截断。

## 目录

普通目录按文件名排序读取第一层的 `.md`、`.markdown`、`.html`、`.htm` 和 `.txt`，不因为缺少资料清单而降级或产生警告，且不做无界递归。

如果目录来自 `snapshot-url.mjs`，脚本会自动读取其中的内部快照索引，按快照顺序读取文档并检查：

- `localPath` 是否仍位于资料集根目录内。
- 文件是否存在。
- 实际 SHA-256 是否与清单一致。
- 来源 URL、规范 URL、更新时间、抓取时间和抓取方式是否明确。
- 引用页面是否已快照，媒体是否可用。

内部索引路径不得逃逸到快照目录之外。哈希不一致属于源完整性错误，报告不能声称审查的是索引所描述的快照。`source-manifest.json` 不作为用户输入；直接传入时要求改为提供其所在目录。

## 官网 URL

按照 [URL 快照](url-snapshot.md) 先运行 `snapshot-url.mjs`，再将快照目录交给 `prepare-review.mjs`。不要在 Skill 主流程中直接审查瞬时抓取结果。

只允许 HTTPS `developer.huawei.com`，禁止凭据、非标准端口、私网跳转和跨域重定向。快照记录：

- 请求 URL 和最终规范 URL。
- 抓取时间 `retrievedAt`。
- 页面声明的更新时间；没有则为 `null`。
- 正文 SHA-256。
- 抓取方式和内容类型。

URL 快照默认写入脚本创建的独立临时目录；需要与本轮工作目录共用时，显式传 `--output-dir <本轮临时目录>/source-snapshot`。报告输出目录独立于快照目录，统一为 `<交付目录>/<特性ID>/`。交付目录默认是本次执行开始时的当前工作目录，用户指定时采用指定位置；渲染时通过 `--feature <特性ID>` 指定归属。报告保留官网 URL、原文摘录、定位与哈希，交付前清理本次快照。

## 结构化预检

`prepare-review.mjs` 输出 `reviewPreparationVersion`、`input`、`sourceIntegrity`、`documents`、`preflightCandidates`、`preflightCoverage` 和 `evidenceBudget`。

预检分为通用规则和特性规则。通用规则检查结构、代码格式、示例上下文、参数内版本判断、链接媒体与来源完整性；[特性规则模块](../../scripts/lib/review-feature-rules.mjs) 根据文档正文和实际代码识别沉浸光感、平行视界、互动卡片/服务卡片、闪控窗/闪控球，可同时启用多组，不把所有输入都按沉浸光感处理。

| 特性 | 自动候选方向 |
|---|---|
| 沉浸光感 | import 上下文、disable 作用域差异、材质赋色文字与示例线索 |
| 平行视界 | 关联页与主页配置上下文、导航栈来源、同节布尔配置与文字要求差异 |
| 互动卡片/服务卡片 | 扩展名称与配置映射、定时器清理、事件接收位置 |
| 闪控窗/闪控球 | 创建与启动上下文、权限前提说明、监听清理、绑定态边界 |

新增特性的缺失项检查仅用于本节明确承诺“完整示例/完整代码/可直接运行”的内容；局部片段或声明省略时不据此判缺失，同节多个代码块可共同提供上下文。注释和字符串中的 API 文本不视为执行代码。这些是结构启发式，不是完整语法或控制流分析；封装、别名、跨节实现及版本条件仍需人工复核。

`preflightCoverage` 记录启用的通用规则、特性组、逐文档范围和 `manualReviewRequired`，并显式标注 `candidateOnly=true`、`completeTechnicalCoverage=false`。未命中规则或没有候选不代表技术正确。候选的 `details.featureId/ruleId/requiresSemanticReview` 用于追踪规则来源；不得当作官网依据。核查实现可运行 `evals/run-review-preflight-tests.mjs`，覆盖问题示例、正确示例、局部片段、跨块上下文与注释误报。

候选项用于提醒模型复核，常见类型包括空导航页、无语言代码围栏、代码异常空格等格式瑕疵、相对链接失效、媒体缺失、import/上下文缺失线索、快照哈希异常、未快照官方引用、范围冲突、属性约束/示例冲突，以及“版本判断只位于新 API 参数内、没有保护调用本身”的兼容风险。

预检候选项不是 finding：必须回到原文位置判断语义、影响、证据和置信度。`code-formatting-anomaly` 只定位分隔符或运算符后的可疑连续空白；字符串、注释、有意对齐和语言自身要求的空白需在语义复核时排除。
