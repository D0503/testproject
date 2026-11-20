import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { loadCapability, resolveScenario } from '../scripts/lib/capability-tools.mjs'
import { buildValidationPlan } from '../scripts/generate-validation-plan.mjs'
import { prepareDemoOutput } from '../scripts/prepare-demo-output.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
let checks = 0
const check = (condition, message) => { assert.ok(condition, message); checks += 1 }

const capability = await loadCapability(root, '平行视界')
check(capability.feature.id === 'easygo-parallel', 'Chinese alias loads EasyGo capability')
check(capability.scenariosData.entryPoints.length === 18, 'all 18 mirrored official pages are registered')
check(capability.scenariosData.scenarios.length === 8, 'eight scoped EasyGo scenarios are registered')
check(!Object.hasOwn(capability, 'session'), 'new capability starts without stale archived criteria')
check(!JSON.stringify(capability.scenariosData).includes('购物') && !JSON.stringify(capability.scenariosData).includes('transPages'), 'example-specific shopping mode does not enter the capability contract')
check(resolveScenario(capability, '生成购物模式页面推入和过渡页 Demo').status === 'unmatched', 'shopping example request is not routed as a published capability scenario')

const routingCases = {
  'EP-S001': '接入平行视界并使用 Navigation 分栏',
  'EP-S002': '配置主页与关联页',
  'EP-S005': '进入全屏页后返回恢复分栏',
  'EP-S006': '主动请求横屏时保持分栏',
  'EP-S007': '开启虚拟容器解决页面被截断',
  'EP-S008': '在窗口分屏中保持平行视界',
  'EP-S009': '对比分栏比例并验证拖拽分栏',
  'EP-S010': '运行时判断是否处于平行视界',
}
for (const [id, goal] of Object.entries(routingCases)) {
  const result = resolveScenario(capability, goal)
  check(result.status === 'resolved' && result.selected.id === id, `${goal} routes to ${id}`)
}

for (const scenario of capability.scenariosData.scenarios) {
  check(scenario.sources.every((id) => capability.scenariosData.entryPoints.some((entry) => entry.snapshotId === id)), `${scenario.id} sources are registered`)
  check(scenario.requiredChecks.includes('static') && scenario.requiredChecks.includes('build'), `${scenario.id} keeps mandatory gates`)
  if (!scenario.demoValidation) continue
  check(scenario.demoValidation.backgroundResource === undefined, `${scenario.id} has no fixed template background dependency`)
  const criteria = scenario.criteriaSpec.required.map((item, index) => ({
    id: `${scenario.id}-C${index + 1}`, topic: item.topic, type: 'behavior', statement: `fixture ${item.topic}`,
    snapshotId: scenario.sources[0], anchor: `fixture anchor ${index + 1}`,
  }))
  const plan = buildValidationPlan(scenario, {
    schemaVersion: '1.0', featureId: 'easygo-parallel', scenarioId: scenario.id,
    frozenAt: '2026-01-01T00:00:00.000Z', strategy: 'fresh', criteria,
  }, routingCases[scenario.id], { points: scenario.demoValidation.points.map((point) => ({ id: point.id, goalAnchor: routingCases[scenario.id], variantIds: point.variants.map((variant) => variant.id) })) })
  check(plan.featureId === 'easygo-parallel' && plan.points.every((point) => point.criteriaRefs.length > 0), `${scenario.id} builds a traceable Demo plan`)
}

const temp = await mkdtemp(join(tmpdir(), 'easygo-output-'))
try {
  const layout = await prepareDemoOutput({ skillRoot: root, root: temp, feature: 'EasyGo平行视界', demoId: 'D03' })
  check(layout.featureDirectory === join(temp, 'easygo-parallel'), 'artifacts use ASCII feature-id folder')
  check(layout.projectDirectory === join(temp, 'easygo-parallel', 'D03', 'test-demo'), 'Demo gets a separate Dxx folder')
} finally {
  await rm(temp, { recursive: true, force: true })
}

console.log(`ok - ${checks} EasyGo parallel checks`)
