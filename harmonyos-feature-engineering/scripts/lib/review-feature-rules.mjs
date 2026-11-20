// 文档预检启发式：只生成可定位候选，不提供官网事实或技术裁决。
const PROFILES = [
  { id: 'immersive-light', signal: /沉浸光感|\b(?:uiMaterial|hdsMaterial|systemMaterial|menuSystemMaterial|materialColor)\b/, manual: ['适用版本及设备范围', '材质优先级与实际视觉效果'] },
  { id: 'easygo-parallel', signal: /平行视界|\b(?:easyGo|easygo|splitOptions|enableInSplitScreen|enableReducedContainerSize|supportLandscapeFullscreen)\b/, manual: ['导航框架及配置文件关联', 'API 版本、窗口状态与分栏行为'] },
  { id: 'live-form', signal: /互动卡片|服务卡片|\b(?:LiveFormExtensionAbility|FormExtensionAbility|sceneAnimationParams|funInteractionParams|requestOverflow|postCardAction)\b/, manual: ['激活态与非激活态上下文', '事件、数据刷新及生命周期的完整链路'] },
  { id: 'float-view', signal: /闪控窗|闪控球|\b(?:floatView|floatingBall|dlpAntiPeep)\b/, manual: ['权限、设备能力与适用版本', '绑定态及独立态语义、实际系统行为'] },
]

// 保留原始偏移与换行，区分代码、字符串和注释，避免注释中的 API 触发执行规则。
export function codeViews(source) {
  let code = '', readable = '', quote = null, comment = null, escaped = false
  for (let i = 0; i < source.length; i++) {
    const c = source[i], next = source[i + 1], blank = c === '\n' ? '\n' : ' '
    if (comment) {
      code += blank; readable += blank
      if (comment === 'line' && c === '\n') comment = null
      else if (comment === 'block' && c === '*' && next === '/') { code += ' '; readable += ' '; i++; comment = null }
    } else if (quote) {
      code += blank; readable += c
      if (escaped) escaped = false
      else if (c === '\\') escaped = true
      else if (c === quote) quote = null
    } else if (c === '/' && (next === '/' || next === '*')) {
      comment = next === '/' ? 'line' : 'block'; code += '  '; readable += '  '; i++
    } else if (["'", '"', '`'].includes(c)) {
      quote = c; code += blank; readable += c
    } else { code += c; readable += c }
  }
  return { code, readable }
}

export function featurePreflight(documents, locate) {
  const candidates = [], coverage = []
  const add = (featureId, ruleId, type, message, locations, details = {}) => candidates.push({ type, message, locations, details: { featureId, ruleId, requiresSemanticReview: true, ...details } })
  const signals = new Map()
  for (const document of documents) {
    const prose = document.contentMarkdown.replace(/```[^\n]*\n[\s\S]*?```/g, '')
    const executable = document.codeBlocks.map((block) => codeViews(block.content).code).join('\n')
    const enabled = PROFILES.filter((profile) => profile.signal.test(prose + '\n' + executable))
    coverage.push({ source: document.sourcePath ?? document.canonicalUrl ?? document.sourceUrl, enabledProfiles: enabled.map((profile) => profile.id), manualReviewRequired: ['完整技术主张、上下文与证据复核', ...enabled.flatMap((profile) => profile.manual)], completeTechnicalCoverage: false })
    for (const profile of enabled) {
      if (!signals.has(profile.id)) signals.set(profile.id, [])
      signals.get(profile.id).push(document)
    }
    for (const block of document.codeBlocks) {
      const { code, readable } = codeViews(block.content)
      const section = [...document.sections].reverse().find((item) => item.lineStart <= block.startLine)
      const end = document.sections.find((item) => item.lineStart > block.startLine)?.lineStart ?? Infinity
      const context = document.contentMarkdown.split('\n').slice((section?.lineStart ?? 1) - 1, end - 1).join('\n').replace(/```[^\n]*\n[\s\S]*?```/g, '')
      const ancestors = []
      for (const item of document.sections.filter((item) => item.lineStart <= block.startLine)) {
        while (ancestors.length && ancestors.at(-1).level >= item.level) ancestors.pop()
        ancestors.push(item)
      }
      const headings = [document.title, ...ancestors.map((item) => item.heading)].filter(Boolean).join('\n')
      const peers = document.codeBlocks.filter((item) => item.startLine >= (section?.lineStart ?? 1) && item.startLine < end)
      const scope = codeViews(peers.map((item) => item.content).join('\n'))
      // 缺失检查只用于明确承诺完整的示例；局部示例不能按完整工程判缺项。
      const complete = /完整示例|完整代码|可直接运行|complete (?:example|sample)/i.test(context) && !/局部示例|代码片段|省略|partial (?:example|sample)/i.test(context)
      const location = (index = 0, quote = null) => locate(document, block.startLine + block.content.slice(0, index).split('\n').length, quote)
      for (const profile of enabled) {
        if (!profile.signal.test(headings + '\n' + context + '\n' + code)) continue
        const emit = (id, type, message, match = null) => add(profile.id, id, type, message, [location(match?.index ?? 0, match?.[0] ?? null)], { exampleScope: complete ? 'declared_complete' : 'fragment_or_unspecified' })
        if (profile.id === 'immersive-light') {
          if (/\buiMaterial\s*\./.test(code) && !/import\s*\{[^}]*\buiMaterial\b[^}]*\}\s*from\s*['"]@kit\.ArkUI['"]/.test(readable)) emit('material-import', 'missing-import-context', '代码块使用 uiMaterial，未在同块展示对应 import；核对是否由其他上下文提供。')
        }
        if (!complete) continue
        if (profile.id === 'easygo-parallel') {
          if (/\brelatedPage['"]?\s*:/.test(readable) && !/\bhomePage['"]?\s*:/.test(scope.readable)) emit('related-home-context', 'parallel-missing-home-context', '完整关联页配置示例未展示 homePage；核对主页关联是否在其他配置中定义。')
          if (/\bNavigation\s*\(\s*\w+\s*\)/.test(code) && !/\bNavPathStack\b/.test(scope.code)) emit('navigation-context', 'parallel-navigation-context', '完整平行视界示例使用 Navigation 参数，但未展示导航栈构造上下文；核对参数来源与导航框架。')
          const fields = ['enableInSplitScreen', 'enableReducedContainerSize', 'supportLandscapeFullscreen']
          for (const field of fields) {
            const stated = new RegExp(`${field}\\s*(?:必须|应当|应)\\s*(?:设置)?(?:为|成)\\s*(true|false)`, 'i').exec(context)
            const configured = new RegExp(`(?:["']?${field}["']?)\\s*:\\s*(true|false)\\b`, 'i').exec(readable)
            if (stated && configured && stated[1].toLowerCase() !== configured[1].toLowerCase()) emit('configuration-text-mismatch', 'parallel-config-text-mismatch', `${field} 的同节文字要求与示例布尔值不同，核对版本、条件及是否为反例。`, configured)
          }
        }
        if (profile.id === 'live-form') {
          if (/\bonLiveFormCreate\s*\(/.test(code) && /\bsetInterval\s*\(/.test(code) && !/\bclearInterval\s*\(/.test(scope.code)) emit('timer-cleanup', 'live-form-resource-cleanup', '完整生命周期示例创建定时器，但未展示清理；核对销毁或其他退出路径。')
          if (/\bsceneAnimationParams\b/.test(readable)) {
            const name = /\babilityName['"]?\s*:\s*['"]([^'"]+)['"]/.exec(readable)
            const implementation = /\bclass\s+(\w+)\s+extends\s+LiveFormExtensionAbility\b/.exec(scope.code)
            if (name && implementation && name[1] !== implementation[1]) emit('extension-name-context', 'live-form-extension-name-mismatch', '场景动效 abilityName 与示例扩展类名称不同；核对模块声明、入口文件和导出映射，不直接判错。', name)
          }
          if (/\bpostCardAction\s*\(/.test(code) && !/\b(?:onFormEvent|onCall|onNewWant)\s*\(/.test(scope.code) && !/事件接收|接收端|处理入口|应用侧处理/.test(context)) emit('event-receiver-context', 'live-form-event-receiver-context', '完整卡片交互示例展示了事件发送，但未说明接收/处理位置；核对所用事件类型与数据返回链路。')
        }
        if (profile.id === 'float-view') {
          if (/\bfloatView\s*\.\s*create\s*\(/.test(code) && !/\.\s*start\s*\(/.test(scope.code)) emit('window-start-context', 'float-view-start-context', '完整闪控窗示例展示创建但未展示启动；核对是否在其他入口完成。')
          if (/\b(?:floatView|floatingBall)\s*\.\s*create\s*\(/.test(code) && !/权限|授权|permission|authorization/i.test(context)) emit('permission-context', 'float-view-permission-context', '完整示例未说明权限/授权前提；需核对当前版本的官方前置条件，不据此认定必须申请某权限。')
          for (const on of code.matchAll(/\b([\w.]+)\s*\.\s*on\s*\(/g)) {
            const event = /^\s*['"]([^'"]+)['"]/.exec(readable.slice(on.index + on[0].length))?.[1]
            if (!event) continue
            const receiver = on[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const eventPattern = event.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const cleanup = new RegExp(`\\b${receiver}\\s*\\.\\s*off\\s*\\(\\s*['"]${eventPattern}['"]`, 'g')
            const hasCleanup = [...scope.readable.matchAll(cleanup)].some((match) => scope.code[match.index]?.trim())
            if (!hasCleanup) emit('listener-cleanup', 'float-view-listener-cleanup', `完整示例注册 ${on[1]} 的 ${event} 监听但未展示对应清理；核对宿主生命周期与封装方法。`, on)
          }
          if (/\bfloatView\s*\.\s*bind\s*\(/.test(code) && !/绑定态|绑定后|联动|bind|绑定/.test(context)) emit('bound-mode-context', 'float-view-bound-mode-context', '完整示例绑定闪控窗和闪控球，但未说明绑定态与独立态边界；需核对绑定后的操作语义。')
        }
      }
    }
  }
  // 沉浸光感跨文档线索只在已识别的相关资料内收集。
  const global = [], limited = [], transparent = [], opaque = []
  for (const document of signals.get('immersive-light') ?? []) {
    const scan = (pattern, destination) => { for (const match of document.contentMarkdown.matchAll(pattern)) destination.push(locate(document, document.contentMarkdown.slice(0, match.index).split('\n').length, match[0].trim())) }
    scan(/[^\n]*(?:disable|关闭)[^\n]*(?:全局禁用|全局失效|应用级或组件级[^\n]*不生效)[^\n]*/gi, global)
    scan(/[^\n]*disable[^\n]*(?:只针对|仅针对)[^\n]*应用级[^\n]*/gi, limited)
    scan(/[^\n]*materialColor[^\n]*(?:需要[^\n]*透明度|不透明[^\n]*(?:遮挡|覆盖))[^\n]*/gi, transparent)
    for (const block of document.codeBlocks) for (const match of codeViews(block.content).readable.matchAll(/materialColor\s*:\s*['"](#[0-9a-fA-F]{6})['"]/g)) opaque.push(locate(document, block.startLine + block.content.slice(0, match.index).split('\n').length, match[0]))
  }
  if (global.length && limited.length) add('immersive-light', 'disable-scope', 'potential-scope-conflict', 'disable 的全局作用域与只针对应用级的描述可能冲突；需对齐版本、组件和条件。', [global[0], limited[0]])
  if (transparent.length && opaque.length) add('immersive-light', 'material-color', 'potential-material-color-conflict', '文档要求 materialColor 带透明度，但示例包含六位不透明色值；核对示例适用范围。', [transparent[0], ...opaque.slice(0, 5)])
  return { candidates, coverage: { profiles: [...signals.keys()], documents: coverage, candidateOnly: true, completeTechnicalCoverage: false } }
}
