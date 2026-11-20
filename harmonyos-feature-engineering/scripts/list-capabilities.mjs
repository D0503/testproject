#!/usr/bin/env node
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { discoverCapabilities } from './lib/capability-tools.mjs'

const args = process.argv.slice(2)
if (args.length && (args.length !== 2 || args[0] !== '--skill-root')) {
  process.stderr.write('用法: node list-capabilities.mjs [--skill-root <skill目录>]\n')
  process.exitCode = 2
} else {
  try {
    const root = args[1] ? resolve(args[1]) : resolve(dirname(fileURLToPath(import.meta.url)), '..')
    process.stdout.write(`${JSON.stringify(await discoverCapabilities(root), null, 2)}\n`)
  } catch (error) {
    process.stderr.write(`${error.message}\n`)
    process.exitCode = 2
  }
}
