# 两类报告的问题记录字段

文档审查报告与设备运行验证报告各自保留，使用统一的问题跟踪字段，不生成独立总报告或运行独立合并工具。

- 文档审查模板：[review-report.md](../assets/report-template/review-report.md)。问题明细仍为 `findings[]`，附加 `findings[].issue`；原九个评分维度及门禁不变。
- 运行验证模板：[demo-device-validation-report.md](../assets/report-template/demo-device-validation-report.md)。问题跟踪字段为 `results.points[].issue`；默认等价对照或交互子项也可填写 `.issue`。模拟器与真机同样适用。

未知字段用 null，不用生成时间、抓取时间、文件修改时间或复测时间冒充首次发现日期。旧报告缺少附加字段时显示待补充或未核实，不编造历史事实。

## 文档审查的填法

严重度、原文、主张、影响和建议只填写在既有 finding 字段中；`finding.issue` 仅补充日期、四维分类、官网链接和官网状态，不复制既有结论。

```json
{
  "issue": {
    "discoveredAt": "2026-10-12",
    "dimension": "清晰性",
    "officialUrl": "https://developer.huawei.com/consumer/cn/doc/<对应文档路径>",
    "officialFix": {
      "status": "未核实",
      "recordedAt": "2026-10-12",
      "basis": "尚未复查官网现网页",
      "officialUrl": null
    }
  }
}
```

新记录不再填写 `finding.issue.severity`，既有报告仍兼容该字段，但必须与 finding.severity 一致。无法确定官网 URL 时保留本地文档原始位置并显示链接待补充。

## 运行验证的填法

运行结果本身没有独立问题严重度、影响和修改建议，这些信息填写到对应观察结果的 `.issue`。原文、被检验主张和官网链接优先使用计划中的 anchor、statement、officialUrl；只有需要更精确的片段或定位时才补充 `issue.quote/claim/officialUrl`，不要求复制计划已有内容。

```json
{
  "issue": {
    "severity": "Medium",
    "discoveredAt": "2026-10-12",
    "dimension": "清晰性",
    "impact": "经核实的实际影响",
    "recommendation": "可执行的修改建议",
    "officialFix": {
      "status": "未核实",
      "recordedAt": "2026-10-12",
      "basis": "尚未复查官网现网页",
      "officialUrl": null
    }
  }
}
```

正常验证点保留验证结果，问题验证点只保留简短状态和问题章节链接。完整实际结果、原因、跟踪字段及问题截图集中在问题章节，共享附件只展示一次。旧 `results.anomalies` 仅用于兼容续读到问题章节，新记录按具体验证点填写 `.issue`，不另写一份重复异常描述。

## 公共规则

例中的日期与 URL 仅为字段示意，实际记录须使用真实值。日期采用 YYYY-MM-DD 或 ISO 时间。四类问题维度为完整性、清晰性、准确性、规范性，按具体问题分类，不从报告总分自动推断。

运行问题的原文与官网链接可由所选验证计划中的 anchor 与 officialUrl 提供，缺失时明确待补充；影响、建议、问题严重度和四维分类按实际异常填写。严重度为 Blocker、High、Medium、Low、Suggestion，未评定为 null。运行报告的问题与待确认异常跨 Demo/环境/场景按严重度排序，缺少严重度列在最后；正常验证明细继续按 Demo 展示。

官网修复状态为未核实、未修复、修复中、已修复、无法确认。默认未核实；其他状态须记录状态日期及依据，未修复、修复中、已修复还须提供官网复查链接。记录结构通过校验不代表官网状态已被程序证明。用户修改本地代码、构建通过、运行通过或修复验证点均不能自动改变官网状态。

两类 Markdown 均展示验证方式、发现日期、官网修复状态、状态记录日期、维度、官网位置、原文、被检验主张、影响与建议。实际观察和确认程度单独保留，无法判定不升级为官网错误。
