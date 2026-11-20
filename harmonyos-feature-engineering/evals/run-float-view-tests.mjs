import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { loadCapability, resolveScenario } from '../scripts/lib/capability-tools.mjs'
import { buildValidationPlan } from '../scripts/generate-validation-plan.mjs'
import { runStaticScenarioChecks } from '../scripts/lib/development-project.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
let checks = 0
const check = (condition, message) => { assert.ok(condition, message); checks += 1 }

const capability = await loadCapability(root, '闪控窗')
check(capability.feature.id === 'float-view', 'Chinese alias loads float-view capability')
check(capability.scenariosData.entryPoints.length === 17, 'all scoped official pages are registered')
check(capability.scenariosData.scenarios.length === 7, 'seven float-view scenarios are registered')
check(!Object.hasOwn(capability, 'session'), 'new capability starts without copied local criteria')

const routingCases = {
  'FV-S001': '创建闪控窗并处理 FLOAT_VIEW 权限后启动和停止闪控窗',
  'FV-S002': '根据 getFloatViewLimits 设置闪控窗尺寸并监听 onLimitsChange',
  'FV-S003': '监听闪控窗状态并通过 restoreMainWindow 恢复主窗口',
  'FV-S004': '绑定闪控窗与闪控球并实现两种形态切换',
  'FV-S005': '创建闪控球并用 updateFloatingBall 更新内容',
  'FV-S006': '给闪控窗增加 DlpAntiPeep 防窥保护',
  'FV-S007': '实现桌面、锁屏和待机屏保全链路盯盘',
}
for (const [id, goal] of Object.entries(routingCases)) {
  const result = resolveScenario(capability, goal)
  check(result.status === 'resolved' && result.selected.id === id, `${goal} routes to ${id}`)
}
check(resolveScenario(capability, '制作普通应用弹窗').status === 'unmatched', 'ordinary app dialog is not mistaken for float view')

for (const scenario of capability.scenariosData.scenarios) {
  check(scenario.sources.every((id) => capability.scenariosData.entryPoints.some((entry) => entry.snapshotId === id)), `${scenario.id} sources are registered`)
  check(scenario.requiredChecks.includes('static') && scenario.requiredChecks.includes('build'), `${scenario.id} keeps mandatory gates`)
  if (!scenario.demoValidation) continue
  const criteria = scenario.criteriaSpec.required.map((item, index) => ({
    id: `${scenario.id}-C${index + 1}`, topic: item.topic, type: 'behavior', statement: `fixture ${item.topic}`,
    snapshotId: scenario.sources[0], anchor: `fixture anchor ${index + 1}`,
  }))
  const plan = buildValidationPlan(scenario, {
    schemaVersion: '1.0', featureId: 'float-view', scenarioId: scenario.id,
    frozenAt: '2026-09-28T00:00:00.000Z', strategy: 'fresh', criteria,
  }, routingCases[scenario.id], { points: scenario.demoValidation.points.map((point) => ({ id: point.id, goalAnchor: routingCases[scenario.id], variantIds: point.variants.map((variant) => variant.id) })) })
  check(plan.featureId === 'float-view' && plan.points.every((point) => point.criteriaRefs.length > 0), `${scenario.id} builds a traceable validation plan`)
}

const temporary = await mkdtemp(join(tmpdir(), 'float-view-tests-'))
try {
  const project = join(temporary, 'project')
  await mkdir(project)
  const fixtures = [
    ['FV-S001', `if (floatView.isFloatViewEnabled()) { const c = await floatView.create(config); await c.setUIContext('pages/Float'); await c.start(); await c.stop(); }`, ['float-view-capability', 'float-view-create', 'float-view-content', 'float-view-start', 'float-view-stop']],
    ['FV-S002', `const t = floatView.FloatViewTemplateType.ROUNDED_RECTANGLE; const limits = floatView.getFloatViewLimits(t); controller.onLimitsChange(() => {}); controller.onRectChange(() => {}); controller.setWindowSize(limits.maxSize);`, ['float-view-template', 'float-view-limits', 'float-view-size', 'float-view-limit-listener']],
    ['FV-S003', `controller.onStateChange(() => {}); controller.onRectChange(() => {}); controller.restoreMainWindow(want); controller.offStateChange(); controller.offRectChange();`, ['float-view-state-listener', 'float-view-observation', 'float-view-listener-cleanup']],
    ['FV-S004', `const view = await floatView.create(viewConfig); const ball = await floatingBall.create(ballConfig); await floatView.bind(view, ball, params); await floatView.unbind(view, ball);`, ['bound-float-view-create', 'bound-floating-ball-create', 'float-view-bind', 'float-view-unbind']],
    ['FV-S005', `const ball = await floatingBall.create(config); await ball.startFloatingBall(params); await ball.updateFloatingBall(next); await ball.stopFloatingBall();`, ['floating-ball-create', 'floating-ball-start', 'floating-ball-update', 'floating-ball-stop']],
    ['FV-S006', `if (canIUse('SystemCapability.Security.DlpAntiPeep')) { dlpAntiPeep.on('dlpAntiPeep', callback); dlpAntiPeep.getDlpAntiPeepInfo(); dlpAntiPeep.setAntiPeepMaskLayer(windowId); dlpAntiPeep.removeAntiPeepMaskLayer(windowId); dlpAntiPeep.off('dlpAntiPeep', callback); }`, ['anti-peep-capability', 'anti-peep-listener', 'anti-peep-mask', 'anti-peep-cleanup']],
    ['FV-S007', `class MarketForm extends FormExtensionAbility {}\nconst view = floatView.create(config); const ball = floatingBall.create(config); const form = { type: 'ohos.extension.form', standby: { isAdapted: true } };`, ['market-watch-desktop', 'market-watch-form', 'market-watch-standby']],
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

console.log(`ok - ${checks} float-view checks`)
