import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { discoverCapabilities, loadCapability } from '../scripts/lib/capability-tools.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
const temporary = await mkdtemp(join(tmpdir(), 'capability-discovery-'))
let checks = 0
const check = (value, message) => { assert.ok(value, message); checks++ }
try {
  const current = await discoverCapabilities(root)
  check(current.features.length === 4 && current.features.every((item) => item.routingReferencePath), 'existing capabilities expose their scenario and routing resource paths')
  for (const item of current.features) {
    const loaded = await loadCapability(root, item.displayName)
    check(loaded.feature.id === item.id && loaded.routingReferencePath === item.routingReferencePath, 'discovery and loading resolve the same registered resources')
  }
  const packageDirectory = join(temporary, 'capabilities', 'new-feature')
  await mkdir(packageDirectory, { recursive: true })
  const scenarios = JSON.parse(await readFile(join(root, 'capabilities/immersive-light/scenarios.json'), 'utf8'))
  scenarios.featureId = 'new-feature'
  scenarios.displayName = '新增测试特性'
  await writeFile(join(packageDirectory, 'scenarios.json'), JSON.stringify(scenarios))
  await writeFile(join(packageDirectory, 'routing.md'), '# 新特性场景说明\n')
  const feature = { id: 'new-feature', displayName: '新增测试特性', aliases: ['新能力'], status: 'ready', scenarios: 'capabilities/new-feature/scenarios.json' }
  const registryPath = join(temporary, 'capabilities/registry.json')
  const setRegistry = (features) => writeFile(registryPath, JSON.stringify({ registryVersion: '1.0', features }))
  await setRegistry([feature])
  const discovered = await discoverCapabilities(temporary)
  check(discovered.features[0].routingReferencePath === join(packageDirectory, 'routing.md'), 'new feature directory supplies routing instructions without an entrypoint edit')
  check((await loadCapability(temporary, '新能力')).feature.id === 'new-feature', 'newly registered feature loads through its alias')
  const stray = join(temporary, 'capabilities/stray')
  await mkdir(stray)
  await writeFile(join(stray, 'scenarios.json'), '{}')
  check((await discoverCapabilities(temporary)).unregistered.some((item) => item.directory === 'stray'), 'directory scan reports an unregistered package without loading it')
  await assert.rejects(() => loadCapability(temporary, 'stray'), /未注册能力/)
  checks++
  await setRegistry([feature, { ...feature, id: 'second-feature', displayName: '第二特性' }])
  await assert.rejects(() => loadCapability(temporary, '新能力'), /有歧义/)
  checks++
  await setRegistry([{ ...feature, routingReference: '../outside.md' }])
  await assert.rejects(() => discoverCapabilities(temporary), /路径越界/)
  checks++
  await setRegistry([{ ...feature, status: 'draft' }])
  await assert.rejects(() => loadCapability(temporary, '新能力'), /未就绪/)
  checks++
  await setRegistry([feature])
  scenarios.featureId = 'other-feature'
  await writeFile(join(packageDirectory, 'scenarios.json'), JSON.stringify(scenarios))
  await assert.rejects(() => loadCapability(temporary, '新能力'), /与注册项不一致/)
  checks++
  console.log(`ok - ${checks} capability discovery checks`)
} finally {
  await rm(temporary, { recursive: true, force: true })
}
