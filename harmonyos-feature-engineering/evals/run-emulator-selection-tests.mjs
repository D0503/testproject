#!/usr/bin/env node

import assert from "node:assert/strict"
import { listInstalledEmulators, normalizeInstalledEmulators } from "../scripts/list-installed-emulators.mjs"

const fixture = [
  { name: "Mate 90", status: "stopped", serial: null, deviceType: "phone", osVersion: "HarmonyOS 7.0.0(26.0.0)" },
  { name: "MatePad Pro 13", status: "running", serial: "emulator-001", deviceType: "tablet", osVersion: "HarmonyOS 7.0.0(26.0.0)" },
]

const normalized = normalizeInstalledEmulators(fixture)
assert.equal(normalized.length, 2, "已停止与运行中的已安装模拟器都应进入候选")
assert.equal(normalized.find((item) => item.name === "Mate 90").running, false)
assert.equal(normalized.find((item) => item.name === "MatePad Pro 13").running, true)

const listed = await listInstalledEmulators({ commandRunner: async () => JSON.stringify(fixture) })
assert.equal(listed.status, "selection_required")
assert.equal(listed.requiresUserSelection, true)
assert.match(listed.nextAction, /即使只有一个候选也不得自动选中/)

const one = await listInstalledEmulators({ commandRunner: async () => JSON.stringify([fixture[0]]) })
assert.equal(one.requiresUserSelection, true, "单个候选也必须由用户确认")

const none = await listInstalledEmulators({ commandRunner: async () => "[]" })
assert.equal(none.status, "none_installed")
assert.equal(none.requiresUserSelection, false)

assert.throws(() => normalizeInstalledEmulators([{ name: "A" }, { name: "A" }]), /名称重复/)
console.log("emulator selection tests passed")
