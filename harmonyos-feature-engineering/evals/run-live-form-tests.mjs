import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { loadCapability, resolveScenario } from '../scripts/lib/capability-tools.mjs'
import { buildValidationPlan } from '../scripts/generate-validation-plan.mjs'
import { runStaticScenarioChecks } from '../scripts/lib/development-project.mjs'
import { renderDeviceReport } from '../scripts/render-device-report.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
let checks = 0
const check = (condition, message) => { assert.ok(condition, message); checks += 1 }

const capability = await loadCapability(root, '互动卡片')
check(capability.feature.id === 'live-form', 'Chinese alias loads LiveForm capability')
check(capability.scenariosData.entryPoints.length === 20, 'all scoped official pages are registered')
check(capability.scenariosData.scenarios.length === 7, 'seven LiveForm and service-form scenarios are registered')
check(!Object.hasOwn(capability, 'session'), 'new capability starts without copied local criteria')

const routingCases = {
  'LF-S001': '接入场景动效类型互动卡片并配置 sceneAnimationParams',
  'LF-S002': '实现 onLiveFormCreate 和 onLiveFormDestroy 生命周期资源清理',
  'LF-S003': '使用 requestOverflow 实现破框动效并支持 cancelOverflow',
  'LF-S004': '实现摇一摇触发动效并处理热档位互动卡片限制',
  'LF-S005': '在激活态点击后通过 startAbilityByLiveForm 跳转应用页面',
  'LF-S006': '开发趣味交互类型卡片小游戏的暂停态',
  'LF-S007': '实现音乐服务卡片的播放暂停功能',
}
for (const [id, goal] of Object.entries(routingCases)) {
  const result = resolveScenario(capability, goal)
  check(result.status === 'resolved' && result.selected.id === id, `${goal} routes to ${id}`)
}
check(resolveScenario(capability, '制作量子卡片').status === 'unmatched', 'unknown card feature is not guessed')

for (const scenario of capability.scenariosData.scenarios) {
  check(scenario.sources.every((id) => capability.scenariosData.entryPoints.some((entry) => entry.snapshotId === id)), `${scenario.id} sources are registered`)
  check(scenario.requiredChecks.includes('static') && scenario.requiredChecks.includes('build'), `${scenario.id} keeps mandatory gates`)
  if (!scenario.demoValidation) continue
  const criteria = scenario.criteriaSpec.required.map((item, index) => ({
    id: `${scenario.id}-C${index + 1}`, topic: item.topic, type: 'behavior', statement: `fixture ${item.topic}`,
    snapshotId: scenario.sources[0], anchor: `fixture anchor ${index + 1}`,
  }))
  const plan = buildValidationPlan(scenario, {
    schemaVersion: '1.0', featureId: 'live-form', scenarioId: scenario.id,
    frozenAt: '2026-09-28T00:00:00.000Z', strategy: 'fresh', criteria,
  }, routingCases[scenario.id], { points: scenario.demoValidation.points.filter((point) => scenario.id !== 'LF-S007' || point.id === 'D07-01').map((point) => ({ id: point.id, goalAnchor: routingCases[scenario.id], variantIds: point.variants.map((variant) => variant.id) })) })
  check(plan.featureId === 'live-form' && plan.points.every((point) => point.criteriaRefs.length > 0), `${scenario.id} builds a traceable validation plan`)
}

const temporary = await mkdtemp(join(tmpdir(), 'live-form-tests-'))
try {
  const music = capability.scenariosData.scenarios.find((item) => item.id === 'LF-S007')
  const musicCriteria = {
    scenarioId: music.id, featureId: 'live-form', strategy: 'fresh', frozenAt: '2026-10-10T00:00:00Z',
    criteria: music.criteriaSpec.required.map((item, index) => ({ id: `M${index}`, topic: item.topic, type: 'behavior', statement: `fixture ${item.topic}`, snapshotId: 'music-service-form', anchor: `fixture ${index}` })),
  }
  const choose = (ids, anchor) => ({ points: ids.map((id) => ({ id, goalAnchor: anchor, variantIds: music.demoValidation.points.find((point) => point.id === id).variants.map((variant) => variant.id) })) })
  const singleMusic = buildValidationPlan(music, musicCriteria, '只验证音乐播控', choose(['D07-01'], '音乐播控'))
  check(singleMusic.points.length === 1 && singleMusic.points[0].title === '音乐播控', 'single music effect does not expand into all effects')
  const selectedMusic = buildValidationPlan(music, musicCriteria, '验证音乐播控和收藏', { points: [...choose(['D07-01'], '音乐播控').points, ...choose(['D07-04'], '收藏').points] })
  check(selectedMusic.points.map((point) => point.id).join(',') === 'D07-01,D07-04', 'multiple effects in LF-S007 retain both without adding lyrics or playlists')
  const allMusic = buildValidationPlan(music, musicCriteria, '验证音乐服务卡片全部效果', choose(['D07-01', 'D07-02', 'D07-03', 'D07-04'], '全部效果'))
  check(allMusic.points.length === 4 && allMusic.points.every((point) => point.criteriaRefs.length && point.interactionRequirements.length) && allMusic.demoReusePolicy.pointIdsDoNotAllocateProjects, 'all music effects have separate traceable points in one reusable Demo')
  const reportPath = join(temporary, 'live-form', 'demo-device-validation-report.md')
  const musicResults = {
    schemaVersion: '1.0', scenarioId: music.id, demoId: 'D01', demoOrder: 1, featureName: '音乐服务卡片', demoName: 'All music effects',
    project: join(temporary, 'live-form', 'D01', 'test-demo'),
    environment: { deviceType: 'emulator', device: 'fixture', systemVersion: 'fixture', sdkApi: 'fixture', capability: 'fixture', displaySettings: 'fixture' },
    ...Object.fromEntries(['demoDescription', 'navigation', 'buildIdentity', 'verifiedAt', 'verifier', 'implementationConformance', 'implementationBasis', 'summary', 'evidenceSummary', 'automationRelation', 'automationBasis', 'documentationIssue', 'documentationIssueBasis', 'limitations', 'limitationBasis'].map((field) => [field, 'fixture'])),
    points: allMusic.points.map((point) => ({
      id: point.id, status: '通过', operation: 'fixture', actual: 'fixture', statusReason: 'fixture', evidence: [],
      variants: point.variants.map((variant) => ({ id: variant.id, actual: 'fixture' })),
      interactions: point.interactionRequirements.map((item) => ({ id: item.id, status: '通过', actual: 'fixture', statusReason: 'fixture' })),
    })),
  }
  const renderedMusic = await renderDeviceReport(allMusic, musicResults, reportPath)
  const musicMarkdown = await readFile(reportPath, 'utf8')
  check(renderedMusic.demos === 1 && renderedMusic.passed === 4 && allMusic.points.every((point) => musicMarkdown.includes(`**${point.id}：${point.title}**`)), 'one Demo report records each music effect independently')
  await assert.rejects(() => renderDeviceReport(allMusic, { ...musicResults, points: musicResults.points.slice(0, 3) }, reportPath), /缺少验证点结果 D07-04/)
  checks++
  const project = join(temporary, 'project')
  await mkdir(project)
  const fixtures = [
    ['LF-S001', `class Demo extends LiveFormExtensionAbility {}\nconst config = { sceneAnimationParams: { abilityName: 'Demo' } }`, ['live-form-extension', 'scene-animation-config']],
    ['LF-S002', `class Demo { onLiveFormCreate() { session.loadContent('pages/Live') } onLiveFormDestroy() {} }`, ['live-form-create', 'live-form-load-content', 'live-form-destroy']],
    ['LF-S003', `formProvider.getFormRect(formId); formProvider.requestOverflow(formId, info); formProvider.cancelOverflow(formId)`, ['overflow-request', 'form-rect-query', 'overflow-cancel']],
    ['LF-S004', `const config = { triggerTypes: ['shake'] }; try { formProvider.requestOverflow(id, info).catch(() => {}) } catch (error) {}`, ['triggered-overflow', 'shake-config', 'request-error-handling']],
    ['LF-S005', `Button('open').onClick(() => context.startAbilityByLiveForm({ bundleName: 'com.example.demo', abilityName: 'EntryAbility' }))`, ['live-form-start-ability', 'explicit-want-bundle', 'explicit-want-ability', 'click-callback']],
    ['LF-S006', `const config = { funInteractionParams: { targetBundleName: 'com.example.game' } }`, ['fun-interaction-config', 'fun-target-bundle']],
    ['LF-S007', `class MusicForm extends FormExtensionAbility { onAddForm() { return createFormBindingData({}) } }\nButton().onClick(() => postCardAction(this, { action: 'call' }))`, ['music-form-provider', 'music-form-action', 'music-form-update']],
  ]
  for (const [id, source, expectedRules] of fixtures) {
    await writeFile(join(project, 'Fixture.ets'), source)
    const scenario = capability.scenariosData.scenarios.find((item) => item.id === id)
    const result = await runStaticScenarioChecks(project, scenario, { modules: [] })
    check(expectedRules.every((rule) => result.rules.find((item) => item.id === rule)?.status === 'passed'), `${id} recognizes its implementation signals`)
  }
} finally {
  await rm(temporary, { recursive: true, force: true })
}

console.log(`ok - ${checks} LiveForm checks`)
