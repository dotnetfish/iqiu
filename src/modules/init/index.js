import * as env from '../env'

export default class AppInit {
  requirements = {}
  isReady = false
  context = null
  static options = {
    baseRequirements: [
      { name: 'env', run: env.init },
    ],
    requirements: null,
    debug: false
  }
  static isRequirements(target) {
    if (target && typeof target === 'object' && typeof target.run === 'function') {
      return true
    } else {
      return false
    }
  }
  static formatRequirements(requirements) {
    return Object.keys(requirements).reduce((obj, key) => {
      const requirement = requirements[key]

      if (requirement.init) {
        obj[key] = requirement
      } else {
        obj[key] = {
          init: requirements[key]
        }
      }
      return obj
    }, {})
  }
  constructor(options = {}) {
    this.options = Object.assign({}, AppInit.options, options)
    window.__cb_appInit__ = this
  }
  ready() {

  }
  init() {

  }
  start() {
    if (this.isReady) {
      return Promise.resolve(this.context)
    } else {
      const start = +new Date()
      this.init()
      this.createTasks()
      return this.runTasks().then(resp => {
        const usedTime = +new Date() - start
        console.log("TCL: start -> usedTime", usedTime)
        this.context = resp
        this.isReady = true

        return this.context
      })
    }
  }

  createTasks() {
    const baseRequirements = this.options.baseRequirements || []
    const userRequirements = this.options.requirements || []
    const allRequirements = baseRequirements.concat(userRequirements)

    this.requirements = allRequirements
      .filter(item => AppInit.isRequirements(item))
      .map((item) => {
        return {
          ...item,
          // 强制转换为 promise
          run: payload => Promise.resolve(item.run(payload)),
          weight: item.weight || 0
        }
      }).sort((a, b) => {
        return a.weight < b.weight ? 1 : -1
      })
  }

  runTasks() {
    const context = {}
    const task = this.requirements.reduce((prev, item) => {
      return prev.then(() => {
        // TODO: 统一 requirements 接口参数
        const payload = item.useContext ? context : void 0;
        console.log("TCL: AppInit -> runTasks -> item", item)
        return item.run(payload).then(res => {
          context[item.name] = res
        })
      })
    }, Promise.resolve())

    return task.then(() => {
      return context
    })
  }
}
