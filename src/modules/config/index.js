import { getValueByPath } from '../utils/object'

export function getAppConfig(path, defaultValue) {
  if (path) {
    return getValueByPath(window.appConfig, path, defaultValue)
  } else {
    return window.appConfig
  }
}

export function setAppConfig(config) {
  window.appConfig = config
}
