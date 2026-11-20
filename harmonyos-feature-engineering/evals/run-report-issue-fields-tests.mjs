import assert from 'node:assert/strict'
import { mkdtemp, rm, readFile, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { renderMarkdown, resolveReviewOutputDirectory } from '../scripts/render-report.mjs'
import { validateReport } from '../scripts/validate-report.mjs'
import { renderDeviceReport } from '../scripts/render-device-report.mjs'
import { validateIssueRecord } from '../scripts/lib/issue-record.mjs'

let checks = 0
const check = (value, message) => { assert.ok(value, message); checks++ }
check(resolveReviewOutputDirectory('/tmp/review-delivery', 'immersive-light') === '/tmp/review-delivery/immersive-light', 'review report output is nested under the feature directory')
assert.throws(() => resolveReviewOutputDirectory('/tmp/review-delivery', '../escape'), /特性 ID/)
assert.throws(() => resolveReviewOutputDirectory('/tmp/review-delivery'), /特性 ID/)
const url = 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/test-issue'
const issue = { severity: 'High', discoveredAt: '2026-10-10', dimension: '准确性', officialUrl: url, impact: '实际影响', recommendation: '具体建议', officialFix: { status: '未修复', recordedAt: '2026-10-12', basis: '本次官网复查原文仍未调整', officialUrl: url } }
check(!validateIssueRecord(issue).length, 'valid issue metadata is accepted for both report types')
check(validateIssueRecord({ ...issue, dimension: '其他' }).length > 0, 'classification is limited to four requested dimensions')
check(validateIssueRecord({ ...issue, discoveredAt: '2026-02-31' }).length > 0, 'invalid discovery dates are rejected')
check(validateIssueRecord({ officialFix: { status: '已修复' } }).length > 0, 'repaired website status requires dated official evidence')
check(!validateIssueRecord(undefined).length, 'legacy reports do not require invented historical metadata')

const baseFinding = { id: 'DOC-001', title: '示例问题', dimension: 'technical_correctness', status: 'likely', severity: 'High', confidence: 'medium', location: { source: '/local/document.md', section: '示例', line: 4, quote: '官网原文' }, claim: '被检验主张', evidenceRefs: [], analysis: '问题分析', impact: '实际影响', recommendation: '具体建议' }
const report = { verdict: { label: '证据不足', score: null, summary: 'fixture' }, input: { value: '/local/document.md', reviewedSources: 1 }, integrationGate: 'insufficient_evidence', sourceIntegrity: { status: 'verified', manifestUsed: false, warnings: [], items: [] }, dimensions: [], findings: [{ ...baseFinding, issue }], pendingVerifications: [], evidence: [] }
const reviewMarkdown = renderMarkdown(report)
for (const field of ['验证方式：文档审视', '发现日期：2026-10-10', '官网修复状态：未修复', '状态记录日期：2026-10-12', '维度：准确性', url, '原文：官网原文', '被检验主张：被检验主张', '影响：实际影响', '建议：具体建议']) check(reviewMarkdown.includes(field), `document report renders ${field}`)
check(reviewMarkdown.includes('审查评分维度：`technical_correctness`'), 'four-category issue classification does not replace nine-category scoring')
const legacyReview = renderMarkdown({ ...report, findings: [baseFinding] })
check(legacyReview.includes('发现日期：待补充') && legacyReview.includes('官网修复状态：未核实') && legacyReview.includes('官网链接待补充'), 'legacy document reports show unknown metadata without fabricating dates or links')
check(validateReport({ ...report, findings: [{ ...baseFinding, issue: { ...issue, dimension: '其他' } }] }).errors.some((item) => item.includes('.issue.dimension')), 'review validator enforces shared issue metadata')

const temp = await mkdtemp(join(tmpdir(), 'report-issue-fields-'))
try {
  const plan = { featureId: 'test-feature', scenarioId: 'TEST-S001', points: ['P1', 'P2'].map((id) => ({ id, title: `${id}效果`, criteriaRefs: ['C1'], expectedFromCurrentSnapshot: [{ statement: '被检验预期', anchor: '对应原文', officialUrl: url }], variants: [{ id: 'v1', label: '默认', parameters: {} }] })) }
  const results = {
    schemaVersion: '1.0', scenarioId: 'TEST-S001', demoId: 'D01', demoOrder: 1, project: join(temp, 'test-feature/D01/test-demo'),
    environment: { deviceType: 'emulator', device: 'fixture', systemVersion: 'fixture', sdkApi: 'fixture', capability: 'fixture', displaySettings: 'fixture' },
    ...Object.fromEntries(['demoName', 'demoDescription', 'navigation', 'buildIdentity', 'verifiedAt', 'verifier', 'implementationConformance', 'implementationBasis', 'summary', 'evidenceSummary', 'automationRelation', 'automationBasis', 'documentationIssue', 'documentationIssueBasis', 'limitations', 'limitationBasis'].map((key) => [key, key === 'verifiedAt' ? '2026-10-12' : 'fixture'])),
    points: plan.points.map((point, index) => ({ id: point.id, status: '不通过', operation: '复现', actual: '实际差异', statusReason: '分析依据', variants: [{ id: 'v1', actual: '观察结果' }], evidence: [], issue: { ...issue, severity: index ? 'High' : 'Low' } })),
  }
  const output = join(temp, 'test-feature/demo-device-validation-report.md')
  await renderDeviceReport(plan, results, output)
  const runtimeMarkdown = await readFile(output, 'utf8')
  const problems = runtimeMarkdown.slice(runtimeMarkdown.indexOf('## 6.'))
  check(problems.indexOf('/ P2') < problems.indexOf('/ P1'), 'runtime issue section sorts severity independently of normal point order')
  for (const field of ['验证方式：运行验证（模拟器）', '发现日期：2026-10-10', '状态记录日期：2026-10-12', '官网修复状态：未修复', '维度：准确性', '原文：对应原文', '被检验主张：被检验预期', '影响：实际影响', '建议：具体建议', url]) check(problems.includes(field), `runtime report renders ${field}`)
  const legacyResults = structuredClone(results)
  legacyResults.points.forEach((point) => { delete point.issue })
  await renderDeviceReport(plan, legacyResults, output)
  const legacyRuntime = await readFile(output, 'utf8')
  check(legacyRuntime.includes('发现日期：待补充') && legacyRuntime.includes('复测/验证日期：2026-10-12') && legacyRuntime.includes('官网修复状态：未核实'), 'verification date is not used as first-discovery date and website status is not inferred')
  const invalid = structuredClone(results)
  invalid.points[0].issue.officialFix = { status: '已修复' }
  await assert.rejects(() => renderDeviceReport(plan, invalid, output), /缺少状态日期或依据/)
  checks++
  const evidenceDirectory = join(temp, 'test-feature/D01/evidence/emulator')
  await mkdir(evidenceDirectory, { recursive: true })
  const screenshot = join(evidenceDirectory, 'shared.png')
  await writeFile(screenshot, 'fixture image')
  const sharedResults = structuredClone(results)
  sharedResults.points.forEach((point) => { point.evidence = [{ type: 'screenshot', path: screenshot, label: 'shared screenshot' }] })
  await renderDeviceReport(plan, sharedResults, output)
  const sharedMarkdown = await readFile(output, 'utf8')
  const beforeProblems = sharedMarkdown.slice(0, sharedMarkdown.indexOf('## 6.'))
  check(!beforeProblems.includes('实际差异') && !beforeProblems.includes('分析依据') && beforeProblems.includes('查看问题明细与证据'), 'problem points use summary links instead of repeating full result and analysis')
  check((sharedMarkdown.match(/<img /g) ?? []).length === 1 && sharedMarkdown.includes('查看已展示证据'), 'multiple problems sharing one screenshot embed it only once')
  const fragmentTargets = [...sharedMarkdown.matchAll(/\]\(#([a-z0-9-]+)\)/g)].map((match) => match[1])
  check(fragmentTargets.length > 0 && fragmentTargets.every((target) => sharedMarkdown.includes(`id="${target}"`)), 'severity-sorted problem and shared-evidence links resolve to real anchors')
  check(!sharedMarkdown.includes('#### 异常记录'), 'one structured problem chapter replaces the old duplicate anomaly section')
  const legacyAnomalies = { ...sharedResults, anomalies: '旧报告的设备启动异常说明' }
  await renderDeviceReport(plan, legacyAnomalies, output)
  const legacyAnomaliesMarkdown = await readFile(output, 'utf8')
  check(legacyAnomaliesMarkdown.includes('历史异常说明') && (legacyAnomaliesMarkdown.match(/旧报告的设备启动异常说明/g) ?? []).length === 1, 'legacy anomaly text survives once in the unified problem chapter')
  const childPlan = structuredClone(plan)
  childPlan.points = [childPlan.points[0]]
  childPlan.points[0].variants.push({ id: 'v2', label: '显式', parameters: {} })
  childPlan.points[0].defaultEquivalence = { defaultVariantId: 'v1', explicitVariantId: 'v2', basis: 'fixture default' }
  childPlan.points[0].interactionRequirements = [{ id: 'click', description: '点击', expected: '预期行为' }]
  const childResults = structuredClone(sharedResults)
  childResults.points = [childResults.points[0]]
  delete childResults.points[0].issue
  childResults.points[0].status = '通过'
  childResults.points[0].variants.push({ id: 'v2', actual: 'fixture' })
  childResults.points[0].defaultEquivalence = { status: '不通过', actual: '对照不同', statusReason: '对照原因' }
  childResults.points[0].interactions = [{ id: 'click', status: '不通过', actual: '点击差异', statusReason: '交互原因' }]
  await renderDeviceReport(childPlan, childResults, output)
  const childMarkdown = await readFile(output, 'utf8')
  const childSummary = childMarkdown.slice(0, childMarkdown.indexOf('## 6.'))
  check(!childSummary.includes('对照不同') && !childSummary.includes('点击差异') && childMarkdown.includes('对照不同') && childMarkdown.includes('点击差异'), 'default comparison and interaction problems keep detail only in the problem chapter')
  check((childMarkdown.match(/<img /g) ?? []).length === 1, 'child problems borrowing the parent screenshot do not duplicate it')
  console.log(`ok - ${checks} report issue field checks`)
} finally { await rm(temp, { recursive: true, force: true }) }
