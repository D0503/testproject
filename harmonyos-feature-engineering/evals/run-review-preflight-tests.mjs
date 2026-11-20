import assert from 'node:assert/strict'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { prepareReview } from '../scripts/prepare-review.mjs'

const temp = await mkdtemp(join(tmpdir(), 'review-preflight-'))
let checks = 0, fixture = 0
const check = (condition, message) => { assert.ok(condition, message); checks++ }
const sample = (title, code, prose = '', kind = '完整示例') => `# ${title}\n\n## ${kind}\n\n${prose}\n\n\`\`\`ts\n${code}\n\`\`\`\n`
async function review(content) {
  const path = join(temp, `${fixture++}.md`)
  await writeFile(path, content)
  return prepareReview(path)
}
const has = (result, type) => result.preflightCandidates.some((item) => item.type === type)
const featureCandidates = (result) => result.preflightCandidates.filter((item) => item.details.featureId !== 'common')

try {
  const parallel = await review(sample('平行视界', `const config = { relatedPage: 'Detail', enableInSplitScreen: true };\nNavigation(unknownStack)`, 'enableInSplitScreen 必须为 false。'))
  for (const type of ['parallel-missing-home-context', 'parallel-navigation-context', 'parallel-config-text-mismatch']) check(has(parallel, type), `parallel candidate: ${type}`)
  const parallelCorrect = await review(sample('平行视界', `const config = { homePage: 'Home', relatedPage: 'Detail', enableInSplitScreen: false };\nconst stack = new NavPathStack();\nNavigation(stack)`, 'enableInSplitScreen 必须为 false。'))
  check(!featureCandidates(parallelCorrect).length, 'matching parallel config and navigation context have no feature candidates')
  const quotedConfig = await review(sample('平行视界', '{ "homePage": "Home", "relatedPage": "Detail" }'))
  check(!has(quotedConfig, 'parallel-missing-home-context'), 'JSON configuration keys are recognized as well as object properties')
  check(!featureCandidates(await review(sample('平行视界', `const config = { relatedPage: 'Detail' };\nNavigation(unknownStack)`, '', '局部示例'))).length, 'partial parallel snippets do not trigger missing-context checks')

  const live = await review(sample('互动卡片', `const config = { sceneAnimationParams: { abilityName: 'Other' } };\nclass Demo extends LiveFormExtensionAbility { onLiveFormCreate() { this.timer = setInterval(tick, 100); } }\npostCardAction(this, { action: 'message' });`))
  for (const type of ['live-form-extension-name-mismatch', 'live-form-resource-cleanup', 'live-form-event-receiver-context']) check(has(live, type), `live form candidate: ${type}`)
  const liveCorrect = await review(sample('互动卡片', `const config = { sceneAnimationParams: { abilityName: 'Demo' } };\nclass Demo extends LiveFormExtensionAbility { onLiveFormCreate() { this.timer = setInterval(tick, 100); } onLiveFormDestroy() { clearInterval(this.timer); } }\npostCardAction(this, { action: 'message' });\nfunction onFormEvent() {}`))
  check(!featureCandidates(liveCorrect).length, 'matching extension, cleanup and receiver suppress live form candidates')
  check(!featureCandidates(await review(sample('互动卡片', `postCardAction(this, { action: 'message' });`, '', '代码片段'))).length, 'partial event sender is not treated as a complete application')

  const float = await review(sample('闪控窗', `const controller = await floatView.create(config);\ncontroller.on('stateChange', handler);\nfloatView.bind(view, ball, options);`))
  for (const type of ['float-view-start-context', 'float-view-permission-context', 'float-view-listener-cleanup', 'float-view-bound-mode-context']) check(has(float, type), `float view candidate: ${type}`)
  const floatCorrect = await review(sample('闪控窗', `const controller = await floatView.create(config);\ncontroller.start();\ncontroller.on('stateChange', handler);\ncontroller.off('stateChange', handler);\nfloatView.bind(view, ball, options);`, '权限与授权前提另见配置说明。此处采用绑定态联动。'))
  check(!featureCandidates(floatCorrect).length, 'startup, authorization context, listener cleanup and bound-mode explanation suppress candidates')
  const splitCleanup = await review(sample('闪控窗', `const controller = await floatView.create(config);\ncontroller.on('stateChange', handler);`, '权限与授权前提另见配置说明。') + `\n\`\`\`ts\ncontroller.start();\ncontroller.off('stateChange', handler);\n\`\`\`\n`)
  check(!has(splitCleanup, 'float-view-listener-cleanup') && !has(splitCleanup, 'float-view-start-context'), 'cleanup and startup may be provided in another block of the same complete example')
  const unrelatedCleanup = await review(sample('闪控窗', `const controller = await floatView.create(config);\ncontroller.start();\ncontroller.on('stateChange', handler);\nother.off('stateChange', handler);`, '权限前提已说明。'))
  check(has(unrelatedCleanup, 'float-view-listener-cleanup'), 'cleanup on another receiver cannot hide an unpaired listener')
  const stringCleanup = await review(sample('闪控窗', `controller.on('stateChange', handler);\nconst text = "controller.off('stateChange', handler)";`))
  check(has(stringCleanup, 'float-view-listener-cleanup'), 'a cleanup mentioned inside a string is not an executed cleanup')

  const material = await review(sample('沉浸光感', `uiMaterial.Material.empty();\nconst options = { materialColor: '#FFFFFF' };`, 'materialColor 需要设置透明度。\ndisable 导致全局禁用。\ndisable 只针对应用级。'))
  for (const type of ['missing-import-context', 'potential-material-color-conflict', 'potential-scope-conflict']) check(has(material, type), `existing immersive candidate retained: ${type}`)
  const generic = await review(sample('普通应用', `component.newMethod(deviceInfo.sdkApiVersion >= 24 ? value : undefined);`))
  check(has(generic, 'unguarded-versioned-api-invocation') && generic.preflightCandidates.find((item) => item.type === 'unguarded-versioned-api-invocation').details.guardThreshold === 24, 'argument-only version guard is feature independent and records the actual threshold')
  check(!generic.preflightCoverage.profiles.length, 'generic method does not enable unrelated feature profiles')
  const safeGuard = await review(sample('普通应用', `if (deviceInfo.sdkApiVersion >= 24) { component.newMethod(value); }`))
  check(!has(safeGuard, 'unguarded-versioned-api-invocation'), 'outer control flow does not trigger argument-only guard candidate')
  const comments = await review(sample('普通应用', `// floatView.create(config); uiMaterial.Material.empty();\n/* controller.on('stateChange', handler); */\nconst text = 'component.newMethod(deviceInfo.sdkApiVersion >= 24 ? value : undefined)';`))
  check(!comments.preflightCoverage.profiles.length && !has(comments, 'unguarded-versioned-api-invocation'), 'API names in comments and strings do not trigger executable checks')
  check(!has(await review(sample('普通应用', '/*\nvalue =  value +  value;\n*/\nconst text = "value =  value";')), 'code-formatting-anomaly'), 'multiline comments and string contents do not become formatting candidates')
  const mixed = await review(sample('混合特性', `const options = { easyGo: {}, relatedPage: 'Detail' };\nclass Demo extends LiveFormExtensionAbility {}\nconst controller = await floatView.create(config);\nuiMaterial.Material.empty();`))
  check(mixed.preflightCoverage.profiles.length === 4, 'one document can enable all four feature rule groups')
  check(mixed.preflightCoverage.candidateOnly && mixed.preflightCoverage.completeTechnicalCoverage === false && mixed.preflightCoverage.documents[0].manualReviewRequired.length > 0, 'coverage explicitly preserves manual review and does not claim exhaustive technical checking')
  check(mixed.preflightCandidates.every((item) => item.details.requiresSemanticReview && item.details.ruleId && item.locations.every((location) => location.line > 0)), 'candidates have rule provenance and real source locations')
  check(new Set(mixed.preflightCandidates.map((item) => item.id)).size === mixed.preflightCandidates.length, 'merged common and feature candidates retain unique IDs')
  console.log(`ok - ${checks} review preflight checks`)
} finally {
  await rm(temp, { recursive: true, force: true })
}
