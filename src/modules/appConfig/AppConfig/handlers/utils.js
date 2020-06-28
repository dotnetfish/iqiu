import minimatch from "minimatch"

function getProject() {
  return 'activity'
}

export const scopeConfig = [
  { key: 'site', fn: () => 'MAIN' },
  { key: 'lang', fn: () => 'zh_CN' },
  { key: 'project', fn: getProject }
]
// eslint-disable-next-line
export const GLOBAL_SCOPE = scopeConfig.map(_ => '*').join('.')

export const toGlob = val => {
  if (val) {
    if (typeof val === 'string') {
      return val
    } else if (val instanceof Array) {
      return `+(${val.join('|')})`
    } else {
      return '*'
    }
  } else {
    return '*'
  }
}

export function getScope(scopeInfo) {
  if (scopeInfo) {
    if (typeof scopeInfo === 'object') {
      return scopeConfig.map(item => {
        return toGlob(scopeInfo[item.key])
      }).join('.')
    } else if (typeof scopeInfo === 'string') {
      return scopeInfo
    } else {
      return GLOBAL_SCOPE
    }
  } else {
    return GLOBAL_SCOPE
  }
}

function isMatched(item) {
  const nowScope = scopeConfig.map(item => item.fn()).join('.')
  const itemScope = getScope(item.scope)
  const itemGlob = item.glob || '/**'
  const matched = minimatch(nowScope, itemScope) && minimatch(window.location.pathname, itemGlob)

  return matched
}

export function filterItems(items) {
  return items.filter(item => {
    const matched = isMatched(item)

    if (matched) {
      if (item.options) {
        const props = findOption(item.options) || {}

        Object.assign(item, props)
      }
      if (item.children && item.children.length) {
        item.children = filterItems(item.children)
      }
      return true
    } else {
      return false
    }
  })
}

export function findOption(options, lastOne = true) {
  let items = options.slice(0)

  if (lastOne) {
    items.reverse()
  }

  return items.find(item => isMatched(item))
}
