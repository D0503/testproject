import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { installImmersiveLightBacking } from '../scripts/install-immersive-light-backing.mjs'
import { prepareDemoOutput } from '../scripts/prepare-demo-output.mjs'
import { validateImmersiveLightBackground } from '../scripts/validate-immersive-light-background.mjs'
import { validateDemoSource } from '../scripts/validate-demo-source.mjs'
import { buildValidationPlan } from '../scripts/generate-validation-plan.mjs'
import { renderFeatureDeviceReport, renderDeviceReport } from '../scripts/render-device-report.mjs'
import { loadCapability, resolveScenario } from '../scripts/lib/capability-tools.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
const temp = await mkdtemp(join(tmpdir(), 'feature-demo-workflow-'))
const runCommand = promisify(execFile)
const workDirectories = []
let checks = 0
const check = (condition, message) => { assert.ok(condition, message); checks += 1 }

try {
  const goal = '请生成一个鸿蒙demo，实现底部页签和索引条的沉浸光感效果，对比索引弹窗 THIN 与背景模糊、页签默认参数与 THIN 和 ULTRA_THIN，并判断不同应用级开关的效果demo'
  const capability = await loadCapability(root)
  const resolution = resolveScenario(capability, '请生成一个鸿蒙demo，实现底部页签和索引条的沉浸光感效果，并判断不同应用级开关的效果demo')
  check(resolution.status === 'resolved' && resolution.selected.id === 'IL-S003', 'prompt routes to IL-S003')

  const resultRoot = join(temp, 'results')
  const layout = await prepareDemoOutput({ skillRoot: root, root: resultRoot, feature: 'immersive-light', demoId: 'D01' })
  workDirectories.push(layout.workDirectory)
  const multiLayout = await prepareDemoOutput({ skillRoot: root, root: resultRoot, feature: 'immersive-light', demoId: 'D01', workDir: layout.workDirectory, scenarios: ['IL-S003', 'IL-S008'] })
  check(multiLayout.projectDirectory === layout.projectDirectory && multiLayout.collection === layout.collection && multiLayout.scenarioOutputs['IL-S003'].validationPlan !== multiLayout.scenarioOutputs['IL-S008'].validationPlan, 'multiple scenarios share one Demo and collection with separate temporary plans')
  const selectedOutput = await runCommand(process.execPath, [join(root, 'scripts/prepare-demo-output.mjs'), '--root', resultRoot, '--feature', 'immersive-light', '--demo-id', 'D01', '--work-dir', layout.workDirectory, '--scenarios', 'IL-S003,IL-S008'])
  check(Object.keys(JSON.parse(selectedOutput.stdout).scenarioOutputs).length === 2, 'directory CLI accepts one multiple-scenario selection')
  const secondLayout = await prepareDemoOutput({ skillRoot: root, root: resultRoot, feature: '沉浸光感', demoId: 'D02', workDir: layout.workDirectory })
  check(layout.featureDirectory === join(resultRoot, 'immersive-light') && layout.demoDirectory === join(resultRoot, 'immersive-light', 'D01') && secondLayout.demoDirectory === join(resultRoot, 'immersive-light', 'D02'), 'all outputs share one ASCII feature-id folder with separate Demo subfolders')
  check(layout.featureReport === join(resultRoot, 'immersive-light', 'demo-device-validation-report.md') && !/\p{Script=Han}/u.test(layout.featureReport), 'generated Demo paths and report filename contain no Chinese characters')
  check(secondLayout.workDirectory === layout.workDirectory && secondLayout.collection === layout.collection && secondLayout.validationPlan !== layout.validationPlan, 'same batch shares a temporary collection but keeps per-Demo plans separate')
  check(!layout.collection.startsWith(resultRoot) && layout.featureReportJson.endsWith('demo-device-validation-report.json'), 'temporary collection and final JSON report have distinct paths')
  check(layout.developmentReport === join(layout.featureDirectory, 'development-verification-report.md') && layout.developmentReportJson === join(layout.featureDirectory, 'development-verification-report.json'), 'development and device reports have separate deliverable paths')
  await assert.rejects(() => prepareDemoOutput({ skillRoot: root, root: resultRoot, feature: 'immersive-light', demoId: 'D03', workDir: resultRoot }), /work-dir 不能位于结果目录内/)
  checks += 1
  await assert.rejects(() => prepareDemoOutput({ skillRoot: root, root: join(temp, '中文结果'), feature: 'immersive-light', demoId: 'D01' }), /root 不能包含中文字符/)
  checks += 1
  check(!layout.demoDirectory.includes(`${join('features', 'immersive-light')}`) && !layout.demoDirectory.includes(`${join('demos', 'D01')}`), 'layout has no legacy features/demos intermediate folders')
  const demoPath = layout.projectDirectory
  const pagesDirectory = join(demoPath, 'entry/src/main/ets/pages')
  const profileDirectory = join(demoPath, 'entry/src/main/resources/base/profile')
  await mkdir(pagesDirectory, { recursive: true })
  await mkdir(profileDirectory, { recursive: true })
  await writeFile(join(profileDirectory, 'main_pages.json'), `${JSON.stringify({ src: ['pages/Index'] }, null, 2)}\n`)
  await writeFile(join(pagesDirectory, 'Index.ets'), "@Entry @Component struct Index { build() { Column() { Text('Immersive light') }.width('100%').height('100%').backgroundImage($r('app.media.backing')).backgroundImageSize(ImageSize.Cover) } }\n")
  await writeFile(join(demoPath, 'build-profile.json5'), '{}\n')
  const installed = await installImmersiveLightBacking({ skillRoot: root, project: demoPath })
  check(installed.resource === 'app.media.backing' && installed.destination.endsWith('base/media/backing.png'), 'backing asset is installed without a project template')
  check((await readFile(join(demoPath, 'entry/src/main/ets/pages/Index.ets'), 'utf8')).includes("app.media.backing"), 'generated immersive-light page uses backing.png')
  check((await readFile(join(demoPath, 'entry/src/main/resources/base/media/backing.png'))).subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])), 'generated Demo contains a valid backing.png')
  await assert.rejects(() => readFile(join(demoPath, 'entry/src/main/resources/base/media/background.png')), /ENOENT/)
  checks += 1
  check(!(await readFile(join(demoPath, 'build-profile.json5'), 'utf8')).includes('keyPassword'), 'generated demo has no signing secret')
  check((await validateDemoSource(demoPath)).status === 'passed', 'generated Demo is a clean source tree')
  const nonAsciiFixture = join(demoPath, 'entry', '中文路径.txt')
  await writeFile(nonAsciiFixture, 'fixture')
  check((await validateDemoSource(demoPath)).violations.some((item) => item.path.includes('中文路径')), 'clean-source gate rejects Chinese paths')
  await rm(nonAsciiFixture)
  const reportFixture = join(demoPath, 'future-report.json')
  await writeFile(reportFixture, '{}')
  check((await validateDemoSource(demoPath)).violations.some((item) => item.path === 'future-report.json'), 'clean-source gate rejects reports without enumerating old report names')
  await rm(reportFixture)
  const initialBackgroundCheck = await validateImmersiveLightBackground(demoPath)
  check(initialBackgroundCheck.status === 'passed' && initialBackgroundCheck.pages.length === 1, 'generated immersive-light Demo passes all-page background gate')
  const pagesProfilePath = join(demoPath, 'entry/src/main/resources/base/profile/main_pages.json')
  const pagesProfile = JSON.parse(await readFile(pagesProfilePath, 'utf8'))
  pagesProfile.src.push('pages/Details')
  await writeFile(pagesProfilePath, `${JSON.stringify(pagesProfile, null, 2)}\n`)
  const detailsPage = join(demoPath, 'entry/src/main/ets/pages/Details.ets')
  await writeFile(detailsPage, "@Entry @Component struct Details { build() { Column() { Text('Details') }.width('100%').height('100%') } }\n")
  await assert.rejects(() => validateImmersiveLightBackground(demoPath), /Details\.ets.*backgroundImage/)
  checks += 1
  await writeFile(detailsPage, "@Entry @Component struct Details { build() { Column() { Text('Details') }.width('100%').height('100%').backgroundImage($r('app.media.background')).backgroundImageSize(ImageSize.Cover) } }\n")
  await assert.rejects(() => validateImmersiveLightBackground(demoPath), /Details\.ets.*app\.media\.backing/)
  checks += 1
  await writeFile(detailsPage, "@Entry @Component struct Details { build() { Column() { Text('Details') }.width('100%').height('100%').backgroundImage($r('app.media.backing')).backgroundImageSize(ImageSize.Cover) } }\n")
  check((await validateImmersiveLightBackground(demoPath)).pages.length === 2, 'new page passes only after using the immersive-light backing full-screen')

  const topics = resolution.selected.criteriaSpec.required.map((item, index) => ({
    id: `C${index + 1}`, topic: item.topic, statement: `current statement for ${item.topic}`,
    snapshotId: 'component', anchor: `anchor ${index + 1}`,
  }))
  topics.push({ id: 'C-CAPABILITY', type: 'capability', topic: '导航组件（IL-F011）', statement: '高算力、中算力与低算力设备效果分档。', snapshotId: 'component', anchor: 'device capability anchor' })
  const selection = { points: resolution.selected.demoValidation.points.map((point) => ({ id: point.id, goalAnchor: goal, variantIds: point.variants.map((variant) => variant.id) })) }
  const plan = buildValidationPlan(resolution.selected, {
    scenarioId: 'IL-S003', featureId: 'immersive-light', frozenAt: '2026-01-01T00:00:00.000Z', strategy: 'fresh', criteria: topics,
  }, goal, selection)
  const focusedGoal = '只验证索引条提示弹窗沉浸光感的 THIN 效果'
  const focusedCriteria = { scenarioId: 'IL-S003', featureId: 'immersive-light', criteria: topics.filter((item) => item.topic === '导航组件（IL-F011）') }
  const focusedSelection = { points: [{ id: 'D01-02', goalAnchor: '索引条提示弹窗沉浸光感', variantIds: ['indexer-system-material-thin'] }] }
  const focusedPlan = buildValidationPlan(resolution.selected, focusedCriteria, focusedGoal, focusedSelection)
  check(focusedPlan.points.length === 1 && focusedPlan.points[0].id === 'D01-02' && focusedPlan.points[0].variants.length === 1, 'single requested effect does not add unrelated points, variants or require their criteria')
  assert.throws(() => buildValidationPlan(resolution.selected, focusedCriteria, focusedGoal), /必须显式选择/)
  assert.throws(() => buildValidationPlan(resolution.selected, focusedCriteria, focusedGoal, { points: [{ ...focusedSelection.points[0], goalAnchor: '全局开关' }] }), /逐字引用/)
  assert.throws(() => buildValidationPlan(resolution.selected, focusedCriteria, focusedGoal, { points: [{ ...focusedSelection.points[0], variantIds: ['unknown'] }] }), /变体不存在/)
  assert.throws(() => buildValidationPlan(resolution.selected, focusedCriteria, focusedGoal, { points: [focusedSelection.points[0], focusedSelection.points[0]] }), /不存在或重复/)
  checks += 4
  const thinOnly = buildValidationPlan(resolution.selected, { scenarioId: 'IL-S003', featureId: 'immersive-light', criteria: topics }, '只验证页签 THIN 效果', { points: [{ id: 'D01-04', goalAnchor: '页签 THIN', variantIds: ['tabs-thin'] }] })
  check(!thinOnly.points[0].defaultEquivalence, 'single explicit material does not retain an unselected default comparison')
  const focusedCriteriaPath = join(temp, 'focused-criteria.json')
  const focusedSelectionPath = join(temp, 'focused-selection.json')
  const focusedPlanPath = join(temp, 'focused-plan.json')
  await writeFile(focusedCriteriaPath, JSON.stringify(focusedCriteria))
  await writeFile(focusedSelectionPath, JSON.stringify(focusedSelection))
  await runCommand(process.execPath, [join(root, 'scripts/generate-validation-plan.mjs'), '--goal', focusedGoal, '--criteria', focusedCriteriaPath, '--selection', focusedSelectionPath, '--output', focusedPlanPath])
  const cliFocusedPlan = JSON.parse(await readFile(focusedPlanPath, 'utf8'))
  check(cliFocusedPlan.points.length === 1 && cliFocusedPlan.points[0].variants.length === 1, 'CLI applies explicit point and variant selection')
  check(plan.points.map((item) => item.id).join(',') === 'D01-01,D01-02,D01-03,D01-04', 'four requested verification points are fixed')
  check(plan.points.find((item) => item.id === 'D01-03').execution === 'rebuild_per_variant', 'global states rebuild separately')
  check(plan.points.filter((item) => item.execution === 'single_page').length === 3, 'comparable points prefer one page')
  check(plan.points.every((item) => item.criteriaRefs.length > 0), 'every point traces current criteria')
  check(plan.scopePolicy.selection === 'prompt_strong_relevance_only' && plan.points.every((item) => !item.criteriaRefs.includes('C-CAPABILITY')), 'component-effect plan excludes unrelated device capability criteria')
  const capabilityPlan = buildValidationPlan(resolution.selected, {
    scenarioId: 'IL-S003', featureId: 'immersive-light', frozenAt: '2026-01-01T00:00:00.000Z', strategy: 'fresh', criteria: topics,
  }, `${goal}，并验证低算力设备差异`, selection)
  check(capabilityPlan.points.find((item) => item.id === 'D01-02').criteriaRefs.includes('C-CAPABILITY'), 'explicit device capability prompt restores capability criteria')
  const indexerPoint = plan.points.find((item) => item.id === 'D01-02')
  check(indexerPoint.demoSetupRequirements.map((item) => item.id).join(',') === 'indexer-secondary-popup,indexer-secondary-list' && indexerPoint.demoSetupRequirements.every((item) => item.countsAsFeatureValidation === false), 'AlphabetIndexer popup and list are non-reporting Demo setup requirements')
  const defaultTabs = plan.points.find((item) => item.id === 'D01-04').variants.find((item) => item.id === 'tabs-floating-style-default')
  check(defaultTabs.parameters.barFloatingStyle === 'present_without_explicit_parameters' && defaultTabs.parameters.systemMaterial === 'omitted', 'Tabs default variant exercises component default activation rather than ImmersiveMaterial constructor defaults')
  const tabsComparison = plan.points.find((item) => item.id === 'D01-04').defaultEquivalence
  check(tabsComparison.defaultVariantId === 'tabs-floating-style-default' && tabsComparison.explicitVariantId === 'tabs-thin' && tabsComparison.expected === 'visual_equivalent', 'component default and explicit THIN must be visually compared')

  const evidence = join(layout.evidenceDirectory, 'device', 'D01-01.png')
  await writeFile(evidence, 'fixture')
  const results = {
    schemaVersion: '1.0', scenarioId: 'IL-S003', demoId: 'D01', demoOrder: 1, featureName: '沉浸光感', demoName: '页签与索引条 Demo',
    demoDescription: 'fixture', project: demoPath, navigation: 'launch', buildIdentity: 'fixture hash', verifiedAt: '2026-01-01', verifier: 'fixture',
    implementationConformance: '符合', implementationBasis: 'fixture', summary: 'fixture summary', evidenceSummary: 'fixture evidence',
    automationRelation: '一致', automationBasis: 'fixture', documentationIssue: '否', documentationIssueBasis: 'fixture', limitations: 'fixture', limitationBasis: 'fixture', anomalies: '无。',
    environment: { deviceType: 'real-device', device: 'fixture device', systemVersion: 'fixture os', sdkApi: 'API 26', capability: 'supported', displaySettings: 'default' },
    points: plan.points.map((point, index) => ({
      id: point.id, status: '通过', operation: 'fixture operation', actual: 'fixture actual', statusReason: 'fixture reason',
      variants: point.variants.map((variant) => ({ id: variant.id, actual: 'fixture variant result' })),
      ...(point.defaultEquivalence ? { defaultEquivalence: { status: '通过', actual: 'fixture visual equivalence', statusReason: 'same background and dimensions' } } : {}),
      evidence: index === 0 ? [{ type: 'screenshot', path: evidence, label: 'fixture screenshot' }] : [],
    })),
  }
  const reportPath = layout.featureReport
  const rendered = await renderDeviceReport(plan, results, reportPath)
  const report = await readFile(reportPath, 'utf8')
  check(rendered.passed === 4 && report.includes('D01-04：默认参数 / THIN / ULTRA_THIN 对比'), 'report renders all point results')
  await assert.rejects(() => renderDeviceReport(plan, results, join(resultRoot, 'legacy-report.md')), /Demo 报告必须写入/)
  checks += 1
  check(!report.includes('交互验证') && !report.includes('indexer-secondary-list'), 'Demo setup requirements do not become feature verification report items')
  check(report.includes('默认开启与显式设置对照') && report.includes('fixture visual equivalence'), 'report renders default-equivalence conclusion')
  check(report.includes('本轮无截图、录屏、日志或组件树附件'), 'report states missing evidence without fake links')
  const secondPlan = structuredClone(plan)
  secondPlan.points.forEach((point) => { point.id = point.id.replace('D01-', 'D02-') })
  const secondResults = structuredClone(results)
  secondResults.demoId = 'D02'; secondResults.demoOrder = 2; secondResults.demoName = '弹窗 Demo'
  secondResults.project = secondLayout.projectDirectory
  secondResults.points.forEach((point) => { point.id = point.id.replace('D01-', 'D02-') })
  const secondEvidence = join(secondLayout.evidenceDirectory, 'device', 'D02-01.png')
  await writeFile(secondEvidence, 'fixture')
  secondResults.points[0].evidence = [{ type: 'screenshot', path: secondEvidence, label: 'fixture screenshot' }]
  const firstPlanPath = layout.validationPlan
  const secondPlanPath = secondLayout.validationPlan
  const firstResultsPath = join(layout.workDirectory, 'D01-results.json')
  const secondResultsPath = join(layout.workDirectory, 'D02-results.json')
  await writeFile(firstPlanPath, JSON.stringify(plan))
  await writeFile(secondPlanPath, JSON.stringify(secondPlan))
  await writeFile(firstResultsPath, JSON.stringify(results))
  await writeFile(secondResultsPath, JSON.stringify(secondResults))
  const cli = join(root, 'scripts', 'render-device-report.mjs')
  const renderCli = (planPath, resultsPath, collectionPath = layout.collection) => runCommand(process.execPath, [cli, '--plan', planPath, '--results', resultsPath, '--collection', collectionPath, '--output', layout.featureReport])
  const existingReportPath = join(layout.featureDirectory, 'demo-device-validation-report.json')
  const existingContent = JSON.stringify({ schemaVersion: '1.0', featureId: 'immersive-light', demos: [{ plan: secondPlan, results: secondResults }] })
  await writeFile(existingReportPath, existingContent)
  await renderCli(firstPlanPath, firstResultsPath)
  check(JSON.parse(await readFile(layout.featureReportJson, 'utf8')).demos.length === 2, 'device report resumes existing results across batches')
  await renderCli(secondPlanPath, secondResultsPath)
  const emulatorResults = structuredClone(results)
  emulatorResults.environment = { ...results.environment, deviceType: 'emulator', device: 'fixture emulator' }
  emulatorResults.summary = 'emulator summary'
  const emulatorEvidence = join(layout.evidenceDirectory, 'emulator', 'D01-01.png')
  await writeFile(emulatorEvidence, 'fixture emulator')
  emulatorResults.points[0].evidence = [{ type: 'screenshot', path: emulatorEvidence, label: 'fixture emulator screenshot' }]
  const emulatorResultsPath = join(layout.workDirectory, 'D01-emulator-results.json')
  await writeFile(emulatorResultsPath, JSON.stringify(emulatorResults))
  await renderCli(firstPlanPath, emulatorResultsPath)
  const persisted = JSON.parse(await readFile(layout.featureReportJson, 'utf8'))
  check(persisted.demos.length === 3 && persisted.demos.filter((item) => item.results.demoId === 'D01').length === 2, 'CLI keeps two environments for one Demo in one structured report')
  const dualEnvironmentReport = await readFile(layout.featureReport, 'utf8')
  check(dualEnvironmentReport.includes('D01 页签与索引条 Demo（模拟器）') && dualEnvironmentReport.includes('D01 页签与索引条 Demo（真机）'), 'one Markdown report shows both environment results')
  await renderCli(firstPlanPath, emulatorResultsPath)
  check(JSON.parse(await readFile(layout.featureReportJson, 'utf8')).demos.length === 3, 'rerunning one environment replaces only that environment result')
  const newBatch = await prepareDemoOutput({ skillRoot: root, root: resultRoot, feature: 'immersive-light', demoId: 'D02' })
  workDirectories.push(newBatch.workDirectory)
  await runCommand(process.execPath, [cli, '--plan', secondPlanPath, '--results', secondResultsPath, '--collection', newBatch.collection, '--output', layout.featureReport])
  check(JSON.parse(await readFile(newBatch.collection, 'utf8')).demos.length === 3, 'new batch resumes all environment results from final JSON report without old temporary collection')
  const additionalScenario = capability.scenariosData.scenarios.find((item) => item.id === 'IL-S008')
  const additionalPoint = additionalScenario.demoValidation.points[0]
  const additionalGoal = '复现背景色遮挡材质效果'
  const additionalPlan = buildValidationPlan(additionalScenario, {
    scenarioId: additionalScenario.id, featureId: 'immersive-light', frozenAt: plan.frozenAt, strategy: 'fresh',
    criteria: additionalScenario.criteriaSpec.required.map((item, index) => ({ id: `SEARCH-C${index}`, topic: item.topic, statement: `fixture ${item.topic}`, snapshotId: additionalScenario.sources[0], anchor: 'fixture' })),
  }, additionalGoal, { points: [{ id: additionalPoint.id, goalAnchor: '背景色遮挡材质效果', variantIds: [additionalPoint.variants[0].id] }] })
  const additionalResults = { ...structuredClone(results), scenarioId: additionalScenario.id, summary: 'search scene summary', points: additionalPlan.points.map((point) => ({ id: point.id, status: '通过', operation: 'navigate to search page', actual: 'search result', statusReason: 'fixture', variants: point.variants.map((variant) => ({ id: variant.id, actual: 'fixture' })), evidence: [] })) }
  const additionalPlanPath = multiLayout.scenarioOutputs['IL-S008'].validationPlan
  const additionalResultsPath = multiLayout.scenarioOutputs['IL-S008'].results
  await writeFile(additionalPlanPath, JSON.stringify(additionalPlan))
  await writeFile(additionalResultsPath, JSON.stringify(additionalResults))
  await renderCli(additionalPlanPath, additionalResultsPath)
  const multipleSceneReport = JSON.parse(await readFile(layout.featureReportJson, 'utf8'))
  check(multipleSceneReport.demos.length === 4 && multipleSceneReport.demos.filter((item) => item.results.demoId === 'D01' && item.results.environment.deviceType === 'real-device').length === 2, 'same Demo and environment accumulates two independently traceable scenes')
  await renderCli(firstPlanPath, firstResultsPath)
  const sceneRerun = JSON.parse(await readFile(layout.featureReportJson, 'utf8'))
  check(sceneRerun.demos.length === 4 && sceneRerun.demos.some((item) => item.plan.scenarioId === 'IL-S008' && item.results.summary === 'search scene summary'), 'rerunning one scene preserves the other scene and environment results')
  const sceneMarkdown = await readFile(layout.featureReport, 'utf8')
  check(sceneMarkdown.includes('id="d01-real-device-il-s003"') && sceneMarkdown.includes('id="d01-real-device-il-s008"'), 'scene sections have distinct Markdown anchors')
  await renderCli(additionalPlanPath, additionalResultsPath, newBatch.collection)
  check(JSON.parse(await readFile(newBatch.collection, 'utf8')).demos.length === 4, 'resumed temporary collection accumulates the new scene')
  await assert.rejects(() => renderCli(firstPlanPath, firstResultsPath, join(resultRoot, 'immersive-light', 'feature-report-data.json')), /collection 必须位于结果目录之外/)
  checks += 1
  const collectionPath = layout.featureReport
  const collection = await renderFeatureDeviceReport([{ plan: secondPlan, results: secondResults }, { plan, results }], collectionPath)
  const collectionReport = await readFile(collectionPath, 'utf8')
  check(collection.demos === 2 && collectionReport.indexOf('### D01') < collectionReport.indexOf('### D02'), 'feature report keeps demo order')
  check((collectionReport.match(/^## 5\. 证据文件约定$/gm) ?? []).length === 1, 'feature report has one shared evidence section')
  const foreignPlan = structuredClone(secondPlan)
  foreignPlan.featureId = 'another-feature'
  await assert.rejects(() => renderFeatureDeviceReport([{ plan, results }, { plan: foreignPlan, results: secondResults }], collectionPath), /同一报告只能包含一个特性/)
  checks += 1
  console.log(`ok - ${checks} demo workflow checks`)
} finally {
  for (const directory of workDirectories) await rm(directory, { recursive: true, force: true })
  await rm(temp, { recursive: true, force: true })
}
