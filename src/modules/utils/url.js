import { parse } from 'qs';

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export function isUrl(path) {
  return reg.test(path);
}
export function getQuery(paramKey, url) {
  url = url ? url : window.location.href
  const querystring = url.split('?')[1]
  const query = parse(querystring)
  return paramKey ? query[paramKey] : query
}
export function toQuery(obj = {}) {
  return obj
}

export default {
  isUrl,
  getQuery,
  toQuery,
}

