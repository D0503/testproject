import { basename, join, resolve } from "node:path"

export function resolveReportOutputDirectory(requested, openedWorkspaceDirectory = process.cwd()) {
  const workspace = resolve(openedWorkspaceDirectory)
  if (requested === undefined || requested === null) return workspace
  if (typeof requested !== "string" || !requested.trim()) throw new Error("输出目录必须是非空路径")
  return resolve(workspace, requested)
}

export function resolveFeatureOutputDirectory(requested, featureId) {
  if (typeof featureId !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(featureId)) throw new Error("特性 ID 必须是小写字母、数字和连字符组成的非空标识")
  const output = resolveReportOutputDirectory(requested)
  return basename(output) === featureId ? output : join(output, featureId)
}
