import auth from '../auth'
import { getQuery } from '../utils/url'
import { getAppConfig } from '../config'

const DEFAULT_INIT_OPTIONS = {
  unsafe: false,
  allowLog: false
}

export function init(opt = {}) {
  const options = {
    ...DEFAULT_INIT_OPTIONS,
    ...opt
  }
  if (isProd()) {
    // 生产环境
    if (!options.allowLog) {
      console.log = function () { } // 干掉所有的log
    }
    window.DEV = null // 干掉 DEV 的方法
  } else {
    setEnv()
    setDevAPIs()
  }
}

function setDevAPIs() {
  window.DEV = {
    ...(window.DEV || {}),
    login: function (userCookieStr) {
      let user = null
      if (userCookieStr) {
        try {
          user = decodeURIComponent(userCookieStr) // 解析代码
          user = JSON.parse(user)
        } catch (err) {
          console.error('getUser() 解析失败 :', userCookieStr, err)
        }
      }
      auth.setUser(user)
    },
    logout: function () {
      auth.logout()
    },
  }
}

export function isProd() {
  let host = window.location.host
  const bool = (
    !host.startsWith('localhost') && // 不是本地环境
    !host.startsWith('127.0.0.1') && // 不是本地环境
    !host.startsWith('192.168.1') && // 不是本地环境
    !host.startsWith('0.0.0.0') // 不是本地环境
  )
  return bool
}
export function isLocal() {
  let host = window.location.host
  return (
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('192.168.1') ||
    host.startsWith('0.0.0.0')
  )
}

function setEnv() {
  const query = getQuery()
  if (query && query.env) {
    localStorage.setItem('env', query.env)
  }
}

export function getEnv() {
  return localStorage.getItem('env') || 'dev'
}

// 默认配置，基本覆盖全部 case
const defaultApiConfigs = [
  ["localhost", "$protocol//localhost:$port/$env"],
  ["127\\.0\\.0\\.1", "$protocol//127.0.0.1:$port/$env"],
  ["^(www\\.)?(.*)$", "$protocol//a.$2"]
]

const defaultWsConfigs = [
]

function matchApi(host, [rule, template], type) {
  const reg = new RegExp(rule)
  const matched = host.match(reg)

  if (matched) {
    const protocol = window.location.protocol
    const ws = protocol === 'https:' ? 'wss:' : 'ws:'
    const port = window.location.port
    const vars = matched.reduce((all, item, index) => {
      all[`$${index}`] = item
      return all
    }, {
      $protocol: protocol,
      $ws: ws,
      $port: port,
      $env: getEnv()
    })
    let api
    api = template.replace(/(\$[\w\d]+)/g, ($0, $1) => {
      return vars[$1]
    })

    if (type === 'rest') {
      if (!api.startsWith('http')) {
        api = `${protocol}//${api}`
      }
    } else if (type === 'ws') {
      if (!api.startsWith('ws')) {
        api = `${ws}//${api}`
      }
    }
    // console.log('TCL: matchApi --> rule', [rule, template])

    return api
  } else {
    return false
  }
}

function getApiHost(configs, host, type = 'rest') {
  let matched

  for (const conf of configs) {
    matched = matchApi(host, conf, type)

    if (matched) {
      return matched
    }
  }
}

function getRestApiHost() {
  const host = window.location.host
  const apiConfigs = [...(getAppConfig('apiHosts') || []), ...defaultApiConfigs]
  const apiHost = getApiHost(apiConfigs, host, 'reset')

  return apiHost
}

function getWsApiHost() {
  const hostPath = `${window.location.host}${window.location.pathname}`
  const wsConfigs = [...(getAppConfig('wsHosts') || []), ...defaultWsConfigs]
  const wsHost = getApiHost(wsConfigs, hostPath, 'ws')

  // HACK: contract 合约的 ws 特殊一些
  return  wsHost.replace('/btc/', '/contract/')
}

export function getHost() {
  const host = getRestApiHost()

  return host
}

export function getSocketUrl() {
  const wsHost = getWsApiHost()

  return wsHost
}