// 两种报告共用的问题跟踪字段；未知信息不自动推断。
export const ISSUE_DIMENSIONS = ['完整性', '清晰性', '准确性', '规范性']
export const ISSUE_SEVERITIES = ['Blocker', 'High', 'Medium', 'Low', 'Suggestion']
export const OFFICIAL_FIX_STATUSES = ['未核实', '未修复', '修复中', '已修复', '无法确认']

export function officialIssueUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && url.hostname === 'developer.huawei.com' && !url.username && !url.password && (!url.port || url.port === '443') ? url.href : null } catch { return null }
}
function validDate(value) {
  if (value === null || value === undefined) return true
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) || Number.isNaN(Date.parse(value))) return false
  return new Date(`${value.slice(0, 10)}T00:00:00Z`).toISOString().slice(0, 10) === value.slice(0, 10)
}
export function validateIssueRecord(issue, label = 'issue') {
  const errors = []
  if (issue === undefined) return errors
  if (!issue || typeof issue !== 'object' || Array.isArray(issue)) return [`${label} 必须是对象`]
  if (issue.dimension !== undefined && issue.dimension !== null && !ISSUE_DIMENSIONS.includes(issue.dimension)) errors.push(`${label}.dimension 必须为完整性、清晰性、准确性或规范性`)
  if (issue.severity !== undefined && issue.severity !== null && !ISSUE_SEVERITIES.includes(issue.severity)) errors.push(`${label}.severity 无效`)
  if (!validDate(issue.discoveredAt)) errors.push(`${label}.discoveredAt 日期无效`)
  if (issue.officialUrl !== undefined && issue.officialUrl !== null && !officialIssueUrl(issue.officialUrl)) errors.push(`${label}.officialUrl 必须为官网链接`)
  for (const field of ['quote', 'claim', 'impact', 'recommendation']) if (issue[field] !== undefined && issue[field] !== null && typeof issue[field] !== 'string') errors.push(`${label}.${field} 必须为字符串或 null`)
  if (issue.officialFix !== undefined) {
    const fix = issue.officialFix
    if (!fix || typeof fix !== 'object' || Array.isArray(fix)) return [...errors, `${label}.officialFix 必须是对象`]
    if (!OFFICIAL_FIX_STATUSES.includes(fix.status)) errors.push(`${label}.officialFix.status 无效`)
    if (!validDate(fix.recordedAt)) errors.push(`${label}.officialFix.recordedAt 日期无效`)
    if (fix.basis !== undefined && fix.basis !== null && typeof fix.basis !== 'string') errors.push(`${label}.officialFix.basis 必须为字符串或 null`)
    if (fix.officialUrl !== undefined && fix.officialUrl !== null && !officialIssueUrl(fix.officialUrl)) errors.push(`${label}.officialFix.officialUrl 必须为官网链接`)
    if (fix.status !== '未核实' && (!fix.recordedAt || typeof fix.basis !== 'string' || !fix.basis.trim())) errors.push(`${label}.officialFix 缺少状态日期或依据`)
    if (['未修复', '修复中', '已修复'].includes(fix.status) && !officialIssueUrl(fix.officialUrl)) errors.push(`${label}.officialFix 缺少官网复查链接`)
  }
  return errors
}
export function issueRecordLines(issue = {}) {
  return [
    `- 发现日期：${issue.discoveredAt ?? '待补充'}`,
    `- 官网修复状态：${issue.officialFix?.status ?? '未核实'}`,
    `- 状态记录日期：${issue.officialFix?.recordedAt ?? '待补充'}`,
    `- 官网状态依据：${issue.officialFix?.basis ?? '尚未记录官网复查依据'}`,
    ...(officialIssueUrl(issue.officialFix?.officialUrl) ? [`- 官网状态对应页面：[官网页面](${officialIssueUrl(issue.officialFix.officialUrl)})`] : []),
    `- 维度：${issue.dimension ?? '待分类（完整性 / 清晰性 / 准确性 / 规范性）'}`,
  ]
}
