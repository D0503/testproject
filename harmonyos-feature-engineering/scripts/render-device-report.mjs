#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'
import { validateIssueRecord, issueRecordLines, officialIssueUrl, ISSUE_SEVERITIES } from './lib/issue-record.mjs'

const STATUSES = new Set(['待验证', '通过', '不通过', '无法判定', '不适用'])
const exists = async (path) => { try { await access(path); return true } catch { return false } }
const text = (value) => String(value ?? '').trim()

function parseArgs(argv) {
  const allowed = new Set(['plan', 'results', 'output', 'collection'])
  const result = {}
  for (let index = 0; index < argv.length; index += 2) {
    const token = argv[index], value = argv[index + 1]
    if (!token?.startsWith('--') || !allowed.has(token.slice(2)) || !value || value.startsWith('--')) throw new Error('用法: node render-device-report.mjs --plan <validation-plan.json> --results <results.json> --output <绝对路径.md> [--collection <绝对路径.json>]')
    result[token.slice(2)] = value
  }
  return result
}

async function validateResults(plan, results, output) {
  const errors = []
  if (results?.environment?.deviceType !== undefined && !['emulator', 'real-device'].includes(results.environment.deviceType)) errors.push('environment.deviceType 必须为 emulator 或 real-device')
  const featureId = text(plan?.featureId)
  if (!text(plan?.scenarioId)) errors.push('plan.scenarioId 必填')
  const featureRoot = dirname(resolve(output))
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(featureId)) errors.push('plan.featureId 必须是英文 slug')
  if (/\p{Script=Han}/u.test(resolve(output))) errors.push(`Demo 报告路径不得包含中文字符: ${resolve(output)}`)
  if (basename(featureRoot) !== featureId || basename(output) !== 'demo-device-validation-report.md') errors.push(`Demo 报告必须写入 <result>/${featureId}/demo-device-validation-report.md`)
  if (results?.schemaVersion !== '1.0') errors.push('results.schemaVersion 必须为 1.0')
  if (results?.scenarioId !== plan.scenarioId) errors.push(`results.scenarioId 必须为 ${plan.scenarioId}`)
  if (/^D\d{2}$/.test(results?.demoId ?? '')) {
    const demoRoot = resolve(featureRoot, results.demoId)
    if (resolve(results?.project ?? '') !== resolve(demoRoot, 'test-demo')) errors.push(`results.project 必须为 ${demoRoot}/test-demo`)
    for (const point of results?.points ?? []) {
      for (const evidence of point.evidence ?? []) {
        if (/\p{Script=Han}/u.test(resolve(evidence?.path ?? ''))) errors.push(`${point.id} 证据路径不得包含中文字符: ${evidence?.path}`)
        const evidenceRelative = relative(resolve(demoRoot, 'evidence'), resolve(evidence?.path ?? ''))
        if (!evidenceRelative || evidenceRelative === '..' || evidenceRelative.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) || isAbsolute(evidenceRelative)) errors.push(`${point.id} 证据必须位于 ${demoRoot}/evidence/`)
      }
    }
  }
  for (const field of ['demoName', 'demoDescription', 'project', 'navigation', 'buildIdentity', 'verifiedAt', 'verifier', 'implementationConformance', 'implementationBasis', 'summary', 'evidenceSummary', 'automationRelation', 'automationBasis', 'documentationIssue', 'documentationIssueBasis', 'limitations', 'limitationBasis']) {
    if (!text(results?.[field])) errors.push(`results.${field} 必填`)
  }
  for (const field of ['device', 'systemVersion', 'sdkApi', 'capability', 'displaySettings']) if (!text(results?.environment?.[field])) errors.push(`results.environment.${field} 必填`)
  for (const point of plan.points) {
    const result = results.points?.find((item) => item.id === point.id)
    if (!result) { errors.push(`缺少验证点结果 ${point.id}`); continue }
    errors.push(...validateIssueRecord(result.issue, `${point.id}.issue`))
    if (!STATUSES.has(result.status)) errors.push(`${point.id}.status 无效`)
    for (const field of ['operation', 'actual', 'statusReason']) if (!text(result[field])) errors.push(`${point.id}.${field} 必填`)
    const variants = new Set((result.variants ?? []).map((item) => item.id))
    for (const variant of point.variants) if (!variants.has(variant.id)) errors.push(`${point.id} 缺少变体结果 ${variant.id}`)
    for (const variant of result.variants ?? []) if (!text(variant.actual)) errors.push(`${point.id}.${variant.id}.actual 必填`)
    if (point.defaultEquivalence) {
      const comparison = result.defaultEquivalence
      errors.push(...validateIssueRecord(comparison?.issue, `${point.id}.defaultEquivalence.issue`))
      if (!STATUSES.has(comparison?.status)) errors.push(`${point.id}.defaultEquivalence.status 无效`)
      for (const field of ['actual', 'statusReason']) if (!text(comparison?.[field])) errors.push(`${point.id}.defaultEquivalence.${field} 必填`)
    }
    if (point.interactionRequirements) {
      const interactions = new Map((result.interactions ?? []).map((item) => [item.id, item]))
      for (const requirement of point.interactionRequirements) {
        const interaction = interactions.get(requirement.id)
        if (!interaction) { errors.push(`${point.id} 缺少交互结果 ${requirement.id}`); continue }
        errors.push(...validateIssueRecord(interaction.issue, `${point.id}.${requirement.id}.issue`))
        if (!STATUSES.has(interaction.status)) errors.push(`${point.id}.${requirement.id}.status 无效`)
        for (const field of ['actual', 'statusReason']) if (!text(interaction[field])) errors.push(`${point.id}.${requirement.id}.${field} 必填`)
      }
    }
    for (const evidence of result.evidence ?? []) {
      if (!['screenshot', 'video', 'device_log', 'component_tree'].includes(evidence?.type)) errors.push(`${point.id} 证据类型无效`)
      if (!isAbsolute(evidence?.path ?? '') || !await exists(evidence.path)) errors.push(`${point.id} 证据必须是存在的绝对路径: ${evidence?.path}`)
    }
  }
  if (errors.length) throw new Error(errors.join('; '))
}

function collectRuntimeProblems(entries) {
  const problems = []
  for (const entry of entries) for (const point of entry.plan.points) {
    const result = entry.results.points.find((item) => item.id === point.id)
    const collect = (item, label) => {
      if (item && (item.issue || ['不通过', '无法判定'].includes(item.status))) problems.push({ entry, point, item, label })
    }
    collect(result, '')
    if (result.status !== '不通过') {
      collect(result.defaultEquivalence, '默认等价对照')
      for (const item of result.interactions ?? []) collect(item, `交互 ${item.id}`)
    }
  }
  for (const entry of entries) {
    const legacy = text(entry.results.anomalies)
    if (!legacy || /^(?:无[。.]?|none|no anomalies|n\/a)$/i.test(legacy)) continue
    if (problems.some((problem) => problem.entry === entry && [problem.item.actual, problem.item.statusReason].some((value) => text(value) === legacy))) continue
    problems.push({ entry, point: { id: 'legacy-anomalies', title: '历史异常说明', expectedFromCurrentSnapshot: [] }, item: { status: '历史记录待整理', actual: legacy, statusReason: '保留旧报告异常描述，请按实际验证点补录结构化问题字段。' }, label: '' })
  }
  problems.sort((a, b) => (a.item.issue?.severity ? ISSUE_SEVERITIES.indexOf(a.item.issue.severity) : 5) - (b.item.issue?.severity ? ISSUE_SEVERITIES.indexOf(b.item.issue.severity) : 5))
  for (const problem of problems) problem.anchor = `issue-${createHash('sha256').update(JSON.stringify([problem.entry.results.demoId, problem.entry.results.environment?.deviceType, problem.entry.plan.scenarioId, problem.point.id, problem.label])).digest('hex').slice(0, 12)}`
  return problems
}

function runtimeIssueSections(problems, output, evidenceIndex) {
  const lines = ['## 6. 运行验证问题与待确认异常', '', '按严重度 Blocker → High → Medium → Low → Suggestion 排序；未评定严重度列在最后。无法判定项保留实际状态，不认定为已确认官网错误。', '']
  if (!problems.length) return [...lines, '未记录问题或待确认异常。', '']
  for (const { entry, point, item, label, anchor } of problems) {
    const issue = item.issue ?? {}
    const expected = point.expectedFromCurrentSnapshot ?? []
    const environment = entry.results.environment?.deviceType === 'emulator' ? '模拟器' : entry.results.environment?.deviceType === 'real-device' ? '真机' : '环境未标注'
    const urls = [...new Set([issue.officialUrl, ...expected.map((item) => item.officialUrl)].map(officialIssueUrl).filter(Boolean))]
    const quote = issue.quote ?? expected.map((item) => item.anchor).filter(Boolean).join('；')
    lines.push(`<a id="${anchor}"></a>`, '', `### ${entry.results.demoId} / ${entry.plan.scenarioId} / ${point.id}${label ? ` / ${label}` : ''} · ${point.title}`, '',
      `- 验证方式：运行验证（${environment}）`, `- 严重程度：${issue.severity ?? '待评定'}`, ...issueRecordLines(issue),
      `- 验证状态：${item.status}`, `- 复测/验证日期：${entry.results.verifiedAt}`,
      `- 位置：${urls.length ? urls.map((url) => `[官网页面](${url})`).join('；') : '官网链接待补充'}`,
      `- 原文：${quote || '原文片段待补充'}`,
      `- 被检验主张：${issue.claim ?? (expected.map((item) => item.statement).join('；') || '待补充')}`,
      `- 实际结果：${item.actual ?? '待补充'}`, `- 分析：${item.statusReason ?? '待补充'}`,
      `- 影响：${issue.impact ?? '待补充'}`, `- 建议：${issue.recommendation ?? '待补充'}`,
      `- 工程及构建标识：${entry.results.project} · ${entry.results.buildIdentity}`, '',
      ...(!label ? [
        ...(item.defaultEquivalence && ['不通过', '无法判定'].includes(item.defaultEquivalence.status) ? [`- 默认等价对照详情：${text(item.defaultEquivalence.actual)}；${text(item.defaultEquivalence.statusReason)}`] : []),
        ...(item.interactions ?? []).filter((interaction) => ['不通过', '无法判定'].includes(interaction.status)).map((interaction) => `- 交互 ${interaction.id}：${text(interaction.actual)}；${text(interaction.statusReason)}`),
      ] : []),
      ...evidenceMarkdown(item.evidence ?? resultEvidence(entry, point), output, evidenceIndex))
  }
  return lines
}
function resultEvidence(entry, point) { return entry.results.points.find((item) => item.id === point.id)?.evidence ?? [] }

function evidenceMarkdown(items, output, evidenceIndex) {
  if (!items?.length) return ['本轮无截图、录屏、日志或组件树附件；结论证据等级受限。', '']
  const lines = []
  for (const item of items) {
    const key = `${item.type}:${resolve(item.path)}`
    if (evidenceIndex.has(key)) { lines.push(`- ${text(item.label) || item.type}：[查看已展示证据](#${evidenceIndex.get(key)})`); continue }
    const anchor = `evidence-${evidenceIndex.size + 1}`
    evidenceIndex.set(key, anchor)
    lines.push(`<a id="${anchor}"></a>`, '')
    const path = relative(dirname(output), resolve(item.path)).replaceAll('\\', '/')
    if (item.type === 'screenshot') lines.push(`<img src="${path}" alt="${text(item.label) || '设备验证截图'}" width="240">`)
    else lines.push(`- [${text(item.label) || item.type}](${path})`)
  }
  return [...lines, '']
}

export async function renderDeviceReport(plan, results, output) {
  const demoId = text(results.demoId) || 'D01'
  const demoOrder = Number.isInteger(results.demoOrder) ? results.demoOrder : Number(demoId.slice(1)) || 1
  return renderFeatureDeviceReport([{ plan, results: { ...results, demoId, demoOrder } }], output)
}

function demoSection(entry, environmentId, output, problems, evidenceIndex) {
  const deviceType = entry.results.environment?.deviceType
  const environmentName = deviceType === 'emulator' ? '模拟器' : deviceType === 'real-device' ? '真机' : '设备类型未标注'
  environmentId += ` (${environmentName})`
  const { plan, results } = entry
  const passed = results.points.filter((item) => item.status === '通过').length
  const applicable = results.points.filter((item) => item.status !== '不适用').length
  const demoId = results.demoId
  const anchor = `${demoId}-${deviceType ?? 'unspecified'}-${plan.scenarioId}`.toLocaleLowerCase()
  const lines = [
    `<a id="${anchor}"></a>`, '', `### ${demoId} ${text(results.demoName)}（${environmentName}）— ${plan.scenarioId}`, '',
    '#### 基本信息', '', '| 项目 | 内容 |', '|---|---|', `| Demo 介绍 | ${text(results.demoDescription)} |`, `| 工程目录 | \`${text(results.project)}\` |`, `| 页面入口与操作路径 | ${text(results.navigation)} |`, `| 代码版本 / 安装包标识 | ${text(results.buildIdentity)} |`, `| 验证环境 | ${environmentId} |`, `| 验证日期 / 验证人 | ${text(results.verifiedAt)} / ${text(results.verifier)} |`, `| 本次验证范围 | ${plan.points.map((point) => point.title).join('；')} |`, '',
    '#### 官方依据', '', '| 验证点 | 判据 ID | 本次冻结文档预期 |', '|---|---|---|',
  ]
  for (const point of plan.points) lines.push(`| ${point.id} ${point.title} | ${point.criteriaRefs.join('、')} | ${point.expectedFromCurrentSnapshot.map((item) => item.statement).join('；')} |`)
  lines.push('', '#### 验证点', '')
  for (const point of plan.points) {
    const result = results.points.find((item) => item.id === point.id)
    const pointProblems = problems.filter((problem) => problem.entry === entry && problem.point.id === point.id)
    const reference = (label, observation) => {
      const problem = pointProblems.find((item) => item.label === label) ?? (observation.issue || ['不通过', '无法判定'].includes(observation.status) ? pointProblems.find((item) => !item.label) : null)
      return problem ? `[查看问题明细](#${problem.anchor})` : null
    }
    lines.push(`**${point.id}：${point.title}**`, '', `验证操作：${text(result.operation)}`, '', `文档预期：${point.expectedFromCurrentSnapshot.map((item) => item.statement).join('；')}`, '', '参数与结果：', '', '| 变体 | 参数 | 设备结果 |', '|---|---|---|')
    for (const variant of point.variants) {
      const actual = result.variants.find((item) => item.id === variant.id)
      lines.push(`| ${variant.label} | \`${JSON.stringify(variant.parameters)}\` | ${text(actual.actual)} |`)
    }
    if (point.defaultEquivalence) {
      const comparison = result.defaultEquivalence
      const defaultVariant = point.variants.find((item) => item.id === point.defaultEquivalence.defaultVariantId)
      const explicitVariant = point.variants.find((item) => item.id === point.defaultEquivalence.explicitVariantId)
      const problemLink = reference('默认等价对照', comparison)
      lines.push('', '默认开启与显式设置对照：', '', '| 默认变体 | 显式变体 | 文档预期 | 对照结果 | 状态 |', '|---|---|---|---|---|', `| ${defaultVariant.label} | ${explicitVariant.label} | ${text(point.defaultEquivalence.basis)} | ${problemLink ?? text(comparison.actual)} | **${comparison.status}**${problemLink ? '' : `。${text(comparison.statusReason)}`} |`)
    }
    if (point.interactionRequirements) {
      lines.push('', '交互验证：', '', '| 交互项 | 操作要求 | 预期 | 设备结果 | 状态 |', '|---|---|---|---|---|')
      for (const requirement of point.interactionRequirements) {
        const interaction = result.interactions.find((item) => item.id === requirement.id)
        const problemLink = reference(`交互 ${interaction.id}`, interaction)
        lines.push(`| ${requirement.id} | ${requirement.description} | ${requirement.expected} | ${problemLink ?? text(interaction.actual)} | **${interaction.status}**${problemLink ? '' : `。${text(interaction.statusReason)}`} |`)
      }
    }
    if (pointProblems.length) lines.push('', `验证状态：**${result.status}**`, '', ...pointProblems.map((problem) => `- ${problem.label || '问题记录'}：[查看问题明细与证据](#${problem.anchor})`), '')
    else lines.push('', `设备结果：${text(result.actual)}`, '', `验证状态：**${result.status}**。${text(result.statusReason)}`, '', ...evidenceMarkdown(result.evidence, output, evidenceIndex))
  }
  lines.push('#### 设备证据说明', '', text(results.evidenceSummary), '', '#### 符合性结论', '', '| 结论项 | 结果 | 依据 / 说明 |', '|---|---|---|', `| 代码实现是否符合开发指南 | ${text(results.implementationConformance)} | ${text(results.implementationBasis)} |`, `| 设备效果是否符合文档预期 | ${passed} / ${applicable} | ${text(results.summary)} |`, `| 自动验证与人工验证关系 | ${text(results.automationRelation)} | ${text(results.automationBasis)} |`, `| 是否发现疑似文档问题 | ${text(results.documentationIssue)} | ${text(results.documentationIssueBasis)} |`, `| 未覆盖项及结论限制 | ${text(results.limitations)} | ${text(results.limitationBasis)} |`, '')
  return { lines, passed, applicable }
}

export async function renderFeatureDeviceReport(entries, output) {
  if (!Array.isArray(entries) || !entries.length) throw new Error('特性报告至少需要一个 Demo')
  const normalized = entries.map(({ plan, results }) => ({ plan, results: { ...results } })).sort((a, b) => a.results.demoOrder - b.results.demoOrder || String(a.results.environment?.deviceType ?? '').localeCompare(String(b.results.environment?.deviceType ?? '')) || String(a.plan.scenarioId ?? '').localeCompare(String(b.plan.scenarioId ?? '')))
  const featureIds = new Set(normalized.map((entry) => entry.plan.featureId))
  if (featureIds.size !== 1) throw new Error('同一报告只能包含一个特性')
  const runKeys = new Set(), demoOrders = new Map(), orderDemos = new Map()
  for (const entry of normalized) {
    await validateResults(entry.plan, entry.results, output)
    if (!/^D\d{2}$/.test(entry.results.demoId ?? '')) throw new Error('results.demoId 必须是 D01、D02 等格式')
    if (!Number.isInteger(entry.results.demoOrder) || entry.results.demoOrder < 1) throw new Error(`${entry.results.demoId}.demoOrder 必须是正整数`)
    const runKey = `${entry.results.demoId}:${entry.results.environment?.deviceType ?? 'unspecified'}:${entry.plan.scenarioId}`
    if (runKeys.has(runKey)) throw new Error('同一 Demo、环境与场景结果重复')
    if (demoOrders.has(entry.results.demoId) && demoOrders.get(entry.results.demoId) !== entry.results.demoOrder) throw new Error('同一 Demo 的顺序不一致')
    if (orderDemos.has(entry.results.demoOrder) && orderDemos.get(entry.results.demoOrder) !== entry.results.demoId) throw new Error('不同 Demo 的顺序重复')
    runKeys.add(runKey); demoOrders.set(entry.results.demoId, entry.results.demoOrder); orderDemos.set(entry.results.demoOrder, entry.results.demoId)
  }
  const environments = [], environmentIds = new Map()
  for (const entry of normalized) {
    const key = JSON.stringify(entry.results.environment)
    if (!environmentIds.has(key)) { environments.push(entry.results.environment); environmentIds.set(key, `ENV-${String(environments.length).padStart(2, '0')}`) }
  }
  const title = text(normalized[0].results.featureName) || normalized[0].plan.featureId
  const lines = [
    `# ${title} Demo 设备验证报告`, '', '## 1. 验证说明', '',
    `- **验证目标**：按 Demo 顺序累计验证 ${title} 特性；每个 Demo 使用各自本次冻结判据。`,
    '- **结论范围**：仅覆盖本文记录的代码、构建产物、设备环境和验证点。',
    '- **更新规则**：新增场景和 Demo 追加；同编号、同环境、同场景重跑只替换该场景结果，保留其他场景、环境和 Demo 的记录。',
    '- **结果口径**：构建通过不等同于设备视觉通过；没有附件的人工观察会明确标记证据限制。', '',
    '| 状态 | 含义 |', '|---|---|', '| 待验证 | 尚未执行 |', '| 通过 | 实际结果符合本次冻结判据 |', '| 不通过 | 满足前提但实际结果不符合预期 |', '| 无法判定 | 环境或证据不足 |', '| 不适用 | 当前场景不适用 |', '',
    '## 2. 验证总览', '', '| 编号 | Demo 名称 | 环境 | 场景 | 已通过 / 适用验证点数 | 实现符合性 | 设备效果一致性 | 明细 |', '|---|---|---|---|---|---|---|---|',
  ]
  for (const entry of normalized) {
    const passed = entry.results.points.filter((item) => item.status === '通过').length
    const applicable = entry.results.points.filter((item) => item.status !== '不适用').length
    const deviceType = entry.results.environment?.deviceType
    const environmentName = deviceType === 'emulator' ? '模拟器' : deviceType === 'real-device' ? '真机' : '未标注'
    lines.push(`| ${entry.results.demoId} | ${text(entry.results.demoName)} | ${environmentName} | ${entry.plan.scenarioId} | ${passed} / ${applicable} | ${text(entry.results.implementationConformance)} | ${text(entry.results.summary)} | [详情](#${`${entry.results.demoId}-${deviceType ?? 'unspecified'}-${entry.plan.scenarioId}`.toLocaleLowerCase()}) |`)
  }
  lines.push('', '## 3. 设备验证环境', '', '| 环境编号 | 设备型号 | HarmonyOS 完整版本 | SDK / API 版本 | HDS 版本（如适用） | 能力检测方式及结果 | 主题、字体及显示设置 |', '|---|---|---|---|---|---|---|')
  for (const environment of environments) lines.push(`| ${environmentIds.get(JSON.stringify(environment))} | ${text(environment.device)} | ${text(environment.systemVersion)} | ${text(environment.sdkApi)} | ${text(environment.hdsVersion) || '不适用'} | ${text(environment.capability)} | ${text(environment.displaySettings)} |`)
  lines.push('', '## 4. Demo 验证明细', '')
  const problems = collectRuntimeProblems(normalized)
  const evidenceIndex = new Map()
  let totalPassed = 0, totalApplicable = 0
  for (const entry of normalized) {
    const section = demoSection(entry, environmentIds.get(JSON.stringify(entry.results.environment)), output, problems, evidenceIndex)
    lines.push(...section.lines); totalPassed += section.passed; totalApplicable += section.applicable
  }
  lines.push('## 5. 证据文件约定', '', '- 设备证据按 Demo 和验证点保存，并关联源码版本、构建产物哈希和参数变体。', '- 动态效果使用录屏；静态截图不能单独证明连续动画或交互轨迹。', '- 不存在的附件不生成链接，不创建占位截图。', '')
  lines.push(...runtimeIssueSections(problems, output, evidenceIndex))
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, `${lines.join('\n')}\n`, 'utf8')
  return { output, demos: demoOrders.size, environmentResults: new Set(normalized.map((entry) => `${entry.results.demoId}:${entry.results.environment?.deviceType ?? 'unspecified'}`)).size, scenarioResults: normalized.length, passed: totalPassed, applicable: totalApplicable }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!isAbsolute(args.output)) throw new Error('output 必须是绝对路径')
  const plan = JSON.parse(await readFile(resolve(args.plan), 'utf8'))
  const results = JSON.parse(await readFile(resolve(args.results), 'utf8'))
  if (args.collection) {
    if (!isAbsolute(args.collection)) throw new Error('collection 必须是绝对路径')
    const collectionPath = resolve(args.collection)
    const featureRoot = dirname(resolve(args.output))
    const relativeCollection = relative(dirname(featureRoot), collectionPath)
    if (basename(collectionPath) !== 'feature-report-data.json' || basename(dirname(collectionPath)) !== plan.featureId || relativeCollection === '' || (!relativeCollection.startsWith(`..${sep}`) && relativeCollection !== '..' && !isAbsolute(relativeCollection))) throw new Error('collection 必须位于结果目录之外的本批临时目录/<featureId>/feature-report-data.json')
    const reportJsonPath = resolve(featureRoot, 'demo-device-validation-report.json')
    const source = await exists(collectionPath) ? collectionPath : await exists(reportJsonPath) ? reportJsonPath : null
    const collection = source ? JSON.parse(await readFile(source, 'utf8')) : { schemaVersion: '1.0', featureId: plan.featureId, demos: [] }
    if (collection.schemaVersion !== '1.0' || collection.featureId !== plan.featureId || !Array.isArray(collection.demos)) throw new Error('collection 与本次特性不兼容')
    if (!/^D\d{2}$/.test(results.demoId ?? '') || !Number.isInteger(results.demoOrder)) throw new Error('集合模式要求 results.demoId 和 results.demoOrder')
    const entry = { plan, results }
    const index = collection.demos.findIndex((item) => item.results?.demoId === results.demoId && (item.results?.environment?.deviceType ?? 'unspecified') === (results.environment?.deviceType ?? 'unspecified') && item.plan?.scenarioId === plan.scenarioId)
    if (index >= 0) collection.demos[index] = entry
    else collection.demos.push(entry)
    collection.demos.sort((a, b) => a.results.demoOrder - b.results.demoOrder)
    const rendered = await renderFeatureDeviceReport(collection.demos, resolve(args.output))
    await mkdir(dirname(collectionPath), { recursive: true })
    const content = `${JSON.stringify(collection, null, 2)}\n`
    await writeFile(collectionPath, content, 'utf8')
    await writeFile(reportJsonPath, content, 'utf8')
    process.stdout.write(`${JSON.stringify({ ...rendered, reportJson: reportJsonPath })}\n`)
  } else process.stdout.write(`${JSON.stringify(await renderDeviceReport(plan, results, resolve(args.output)), null, 2)}\n`)
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main().catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 2 })
