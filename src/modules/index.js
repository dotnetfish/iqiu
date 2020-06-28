import request from './http'
import AppInit from './init'
import initAppConfig, { storageHandle } from './appConfig'
import { setAppConfig } from './config'
import { createStorageRequirement } from './storages'
import { isLocal } from './env'

const LIFECYCLE = {
  NOT_INIT: 0,
  INITING: 1,
  INITED: 2,
  INIT_ERROR: 9
}

class SimpleEvent {
  callbacks = {}

  constructor() {

  }

  on(name, fn) {
    if (this.callbacks[name]) {
      this.callbacks[name].push(fn)
    } else {
      this.callbacks[name] = [fn]
    }
  }

  emit(name, ...args) {
    const fns = this.callbacks[name]

    if (fns && fns.length) {
      fns.forEach(fn => fn.apply(this, args))
    }
  }

  off(name, fn) {
    const fns = this.callbacks[name]

    if (fns && fns.length) {
      if (fn) {
        const newFns = fns.filter(item => item !== fn)

        if (newFns.length) {
          this.callbacks[name] = newFns
        } else {
          delete this.callbacks[name]
        }
      } else {
        delete this.callbacks[name]
      }
    }
  }
}
// ======================================================================
// SplashScreen
// 应用启动和渲染阶段的闪屏，用于关掉白屏，加载数据，提升用户体验
// ======================================================================
export class SplashScreen extends SimpleEvent {
  loadingElem = null
  options = {
    loadingId: 'splashscreen',
    rootId: 'app',
    autoHide: true
  }

  constructor(options = {}) {
    super()
    Object.assign(this.options, options)
    this.init()
  }

  init() {
    const loadingElem = document.getElementById(this.options.loadingId)

    if (loadingElem) {
      this.loadingElem = loadingElem
      const display = loadingElem.style.display

      this.show = () => {
        loadingElem.style.display = display
      }
      this.initEvents()
    } else {
      throw new Error('loading element not found')
    }
  }

  initEvents() {
    const targetNode = document.getElementById(this.options.rootId);
    const config = { childList: true, subtree: true };
    const callback = (mutationsList, observer) => {
      this.emit('loaded')
      observer.disconnect();
    };

    if (this.options.autoHide) {
      this.on('loaded', () => {
        this.hide()
      })
    }

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  show() {

  }

  hide() {
    this.loadingElem.style.display = 'none'
  }
}

export default class SDK extends SimpleEvent {
  static SplashScreen = SplashScreen
  static instance = null
  static createInstance(options) {
    if (SDK.instance) {
      return SDK.instance
    } else {
      SDK.instance = new SDK(options)
      return SDK.instance
    }
  }

  version = '0.1.0'
  desc = ''
  bizId = 'MIFAN'
  appId = ''
  lifecylce = LIFECYCLE.NOT_INIT

  options = {
    namespace: null, // sdk实例注册到全局时的 全局变量 name
    debug: false,
    configSource: null,
    autoInit: false,
    project: 'main'
  }

  constructor(options) {
    super()
    if (options) {
      this.handleOptions(options)
      if (this.options.autoInit) {
        this.init()
      }
    }
  }

  handleOptions(options) {
    if (typeof options.debug === 'undefined') {
      options.debug = false
    }
    Object.assign(this.options, options)
    const { configSource, debug, bizId, appId } = this.options
    console.log("TCL: SDK -> handleOptions -> this.options", this.options)

    if (!configSource) {
      this.options.configSource = function () {
        return configApi(bizId, appId, debug)
      }
    }
    if (bizId) {
      this.bizId = bizId
    } else {
      throw new Error('bizId is required')
    }

    if (appId) {
      this.appId = appId
    }
  }

  init(options) {
    if (this.lifecylce === LIFECYCLE.NOT_INIT) {
      this.lifecylce = LIFECYCLE.INITING
      if (options) {
        this.handleOptions(options)
      }
      const { debug } = this.options
      const appInit = new AppInit({
        appId: this.appId,
        debug,
        requirements: [
          initAppConfig({ 
            api: this.options.configSource,
            preHandlers: debug ? [storageHandle] : void 0
          }),
          createStorageRequirement(this.options.project)
        ]
      })

      appInit.start().then(context => {
        // TODO: 待移除，已在 AppConfig 里处理，因为这里设值太晚了
        setAppConfig(context.appConfig)
        this.lifecylce = this.lifecylce.INITED
        SDK.storages = this.storages = context.storages
        this.emit('inited', context)
      })
    }
  }
}

function getConfigApiURL(appId, debug) {
  if (!debug) {
    if (isLocal()) {
      return `/configs/${appId}.json`
    } else {
      return window.location.origin + `/configs/${appId}.json`
    }
  } else {
    if (window.publicPath.startsWith('http') || window.publicPath.startsWith('//')) {
      return window.publicPath + `configs/${appId}.json`
    } else {
      return window.location.origin + window.publicPath + `configs/${appId}.json`
    }
  }
}

function getConfig(configId, debug) {
  const url = getConfigApiURL(configId, debug)
  const options = {
    method: 'get',
    params: {
      t: Number(new Date())
    }
  }

  return request(url, options)
}

function isMap(val) {
  return typeof val === 'object' && !Array.isArray(val)
}

function mergeConfig(target, source = {}) {
  Object.keys(source).forEach(key => {
    const targetVal = target[key]
    const sourceVal = source[key]

    // 只深度合并对象，其它直接覆盖
    if (isMap(targetVal) && isMap(sourceVal)) {
      mergeConfig(targetVal, sourceVal)
    } else {
      target[key] = sourceVal
    }
  })
}

function configApi(bizId = 'MIFAN', appId, debug) {
  const tasks = []

  tasks.push(getConfig(bizId, debug))
  if (appId) {
    tasks.push(getConfig(appId, debug))
  }

  return Promise.all(tasks).then(results => {
    const bizConfig = results[0]
    const appConfig = results[1]

    if (appConfig) {
      mergeConfig(bizConfig, appConfig)
    }

    return bizConfig
  })
}
