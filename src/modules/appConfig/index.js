import AppConfig from './AppConfig/index'
import minimatch from "minimatch"

export const storageHandle = {
  name: '*',
  handle(config, all, localConfig) {
    const clear = () => {
      localStorage.clear()
      localStorage.setItem(this.storageKey, JSON.stringify(config))
    }
    if (localConfig) {
      if (localConfig.bizId !== config.bizId) {
        clear()
      }
    } else {
      clear()
    }

    return config
  }
}

const hosts = {
  name: 'hosts',
  handle(hosts, config) {
    const isValid = hosts.some(host => minimatch(location.hostname, host))

    if (isValid) {
      return hosts
    } else {
      const tips = (config.tips || {}).phishing || `此网站为钓鱼网站，将跳转至官网${hosts[0]}`

      alert(tips)
      const homepage = config.website || `https://${hosts[0]}`

      window.location.href = homepage
    }
  }
}

export default function ({ api, preHandlers = [], handlers = [] }) {
  const appConfig = new AppConfig({
    handlers: [
      ...preHandlers,
      hosts,
      ...handlers
    ],
    api,
    autoStart: true
  })

  return {
    name: 'appConfig',
    weight: 100,
    run: appConfig.init.bind(appConfig)
  }
}
