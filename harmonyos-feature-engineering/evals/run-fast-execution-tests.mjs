import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { fetchOfficialBatch } from '../scripts/lib/fetch-official.mjs'
import { buildFingerprint, decideBuild } from '../scripts/variant-build-decision.mjs'

const root = await mkdtemp(join(tmpdir(), 'fast-execution-test-'))
try {
  let calls = 0, active = 0, peak = 0
  const fetcher = async url => {
    calls++; active++; peak = Math.max(peak, active)
    await new Promise(resolve => setTimeout(resolve, 5)); active--
    return { ok: true, contentMarkdown: url, contentSha256: createHash('sha256').update(url).digest('hex') }
  }
  const entries = ['a', 'b', 'a', 'c'].map((id,i) => ({ snapshotId: String(i), officialUrl: `https://developer.huawei.com/${id}` }))
  const options = { fetcher, concurrency: 2, workDirectory: root }
  assert.equal((await fetchOfficialBatch(entries, options)).length, 4)
  assert.equal(calls, 3); assert.equal(peak, 2)
  await fetchOfficialBatch(entries, options); assert.equal(calls, 3)
  const fail = await fetchOfficialBatch([{ officialUrl: 'https://developer.huawei.com/fail' }], { fetcher: async () => { throw Error('offline') } })
  assert.equal(fail[0].ok, false)
  await assert.rejects(fetchOfficialBatch(entries, { concurrency: 0 }))
  const file = join(root, 'Index.ets')
  await writeFile(file, 'first')
  const before = await buildFingerprint(root, 'sdk-test')
  const previous = { fingerprint: before, buildPassed: true }
  assert.equal(decideBuild(before, previous, true).rebuild, false)
  assert.equal(decideBuild(before, previous, false).rebuild, true)
  assert.equal(decideBuild(before, { ...previous, buildPassed: false }, true).rebuild, true)
  await writeFile(file, 'changed')
  assert.equal(decideBuild(await buildFingerprint(root, 'sdk-test'), previous, true).rebuild, true)
  assert.notEqual(await buildFingerprint(root, 'other-sdk'), await buildFingerprint(root, 'sdk-test'))
  console.log('ok - URL deduplication, bounded concurrency, task cache, failure handling and build reuse invalidation')
} finally { await rm(root, { recursive: true, force: true }) }
