import { setAppConfig } from '../../config'

const HANDLER_TYPE = {
  GLOBAL: 'global',
  PROP: 'prop'
}

export default class AppConfig {
  static options = {
    storageKey: 'cb_global_config',
    defaultConfig: {},
    handlers: [],
    autoStart: false,
    api() {
      throw new Error('unimplemented')
    }
  }

  static getOptionsKey(instance, key) {
    const thisVal = instance.options[key]

    if (typeof thisVal !== 'undefined') {
      return thisVal
    } else {
      return AppConfig.options[key]
    }
  }

  data = null

  isReady = false

  oldConfig = null

  globalHandlers = []

  propHandlers = []

  pageConfig = {}

  get storageKey() {
    return AppConfig.getOptionsKey(this, 'storageKey')
  }

  constructor(options = {}) {
    this.options = Object.assign({}, AppConfig.options, options)
    this.registerHandlers(this.options.handlers)
  }

  init() {
    if (this.options.autoStart) {
      this.oldConfig = this.getCachedConfig()
      return this.start()
    } else {
      this.data = this.options.defaultConfig
      this.cacheConfig(this.options.defaultConfig)
      this.restoreConfig()

      return Promise.resolve(this.pageConfig)
    }
  }

  getCachedConfig() {
    const cache = window.localStorage.getItem(this.storageKey)

    try {
      const data = JSON.parse(cache)

      return data
    } catch (error) {
      return null 
    }
  }

  restoreConfig() {
    this.data = this.getCachedConfig()
    this.createPageConfig()
  }

  cacheConfig(config, isCover) {
    if (isCover) {
      window.localStorage.setItem(this.storageKey, config)
    } else {
      const cached = this.getCachedConfig()

      if (!cached) {
        window.localStorage.setItem(this.storageKey, config)
      }
    }
  }

  fetchConfig() {
    return this.options.api().then((result) => {
      if (result) {
        this.data = result
        window.localStorage.setItem(this.storageKey, JSON.stringify(result))
      }
    })
  }

  registerHandlers(handlers) {
    handlers.forEach(item => this.registerHandler(item))
  }

  registerHandler(handler) {
    if (handler.name && handler.handle) {
      if (handler.name === '*') {
        handler.type = HANDLER_TYPE.GLOBAL
        this.globalHandlers.push(handler)
      } else {
        handler.type = HANDLER_TYPE.PROP
        this.propHandlers.push(handler)
      }
    }
  }

  execHandle(handler, config) {
    if (handler) {
      try {
        const conf = handler.type === HANDLER_TYPE.GLOBAL ? config : config[handler.name]

        return handler.handle.call(this, conf, config, this.oldConfig) || conf
      } catch (error) {
        console.error(error)
        return null 
      }
    } else {
      console.warn('handler not found...')
      return null
    }
  }

  createPageConfig() {
    if (this.data) {
      const handlers = [...this.globalHandlers, ...this.propHandlers]
      const pageConfig = handlers.reduce((all, handler) => {
        if (handler.type === HANDLER_TYPE.GLOBAL) {
          all = this.execHandle(handler, all) || all
        } else {
          all[handler.name] = this.execHandle(handler, all)
        }
  
        return all
      }, this.data)
      this.pageConfig = pageConfig
      setAppConfig(pageConfig)

      return this.pageConfig
    }
  }

  start() {
    return this.fetchConfig().then(() => {
      this.createPageConfig()
      this.isReady = true

      return this.pageConfig
    }) 
  }

  ready(callback) {
    if (this.isReady) {
      callback(this.pageConfig)
    } else {
      this.start().then(pageConfig => callback(pageConfig))
    }
  }
}