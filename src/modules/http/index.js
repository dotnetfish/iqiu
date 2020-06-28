import axios from 'axios'

const baseURL = process.env.VUE_APP_ZY_API;

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
  transformRequest: [function (data) {
    // 将数据转换为表单数据
    let ret = ''
    for (const it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.substring(0, ret.length - 1);
    return ret
  }]
})

http.interceptors.response.use(function (response) {
  if (typeof response.data.code === 'undefined' || response.data.code === 0) {
    return response.data
  } else {
    return Promise.reject(response.data);
  }
}, function (error) {
  return Promise.reject(error);
});

export default http