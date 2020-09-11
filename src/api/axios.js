import axios from "axios";
import { WHITELIST_CODE, TIME_OUT_CODE } from "@/config";
// import { Message } from 'element-ui';
import cookie from "@/modules/utils/cookie.js";
import store from "@/store/index";
import { Message } from "element-ui";
import { debug } from "leancloud-realtime";

// 设置uuid
cookie.getItem("X-User-Agent") ||
cookie.setItem(
  "X-User-Agent",
  `version=AIQIU_pc;channel=main;mac=${ guid() }`,
  {
    // TODO 域名
    // domain: process.env.VUE_APP_DOMAIN, // 域名
    domain: store.state.domain, // 域名
    expires: 365
  }
);

const instance = axios.create({
  timeout: 20000 // 请求超时
});
// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();
instance.defaults.withCredentials = true;
// 请求拦截设置
instance.interceptors.request.use(
  config => {
    // 设置header
    setHeader(config);
    // 临时处理,后面删掉 start
    if(config.url.startsWith("http://192.168.0.109:8080")){
      config.headers["xx-user-token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4eC11c2VyLWlkIjoiMTAwMDQ2MDMiLCJpc3MiOiJhaXFpdSIsImV4cCI6MTU5NzA0MDg2NCwiaWF0IjoxNTk2NDM2MDY0fQ.bvP_VBH3iUAlcWUqjY7ZlXKxKg2MI-bD5ehDUBGCtkfvsk_W9nQsym1XAPBEDX4-vctItN-ooN4eLD4YrvGGsw";
      config.headers["xx_n_t"] =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4eC11c2VyLWlkIjoiMTAwMDQ2MDMiLCJpc3MiOiJhaXFpdSIsImV4cCI6MTU5NzA0MDg2NCwiaWF0IjoxNTk2NDM2MDY0fQ.bvP_VBH3iUAlcWUqjY7ZlXKxKg2MI-bD5ehDUBGCtkfvsk_W9nQsym1XAPBEDX4-vctItN-ooN4eLD4YrvGGsw";
    }
    // 临时处理,后面删掉 end
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// axios response封装的数据在data里面
instance.interceptors.response.use(
  response => {
    console.log(response, "response");
    // 进度查询等长时间loading兼容
    if (response.data.code === TIME_OUT_CODE) {
      // TODO 重新登录 怎么处理
      store.commit("layout");
      return Promise.reject(response);
    } else if (response.config.noCheckCode) {
      return response.data;
    }

    // 请求成功
    if (WHITELIST_CODE.includes(response.data.code)) {
      if(response.data.task != null || response.data.gift != null) {
        for(var i= 0;i<response.data.task.length;i++) {
          if(response.data.task[i].taskType == 1) {
            Message({
              message: "完成新手任务获得积分"+response.data.task[i].coin+",获得经验"+response.data.task[i].experience,
              type: "success"
            });
          }
          if(response.data.task[i].taskType == 2){
            Message({
              message: "完成新手任务获得积分"+response.data.task[i].coin+",获得经验"+response.data.task[i].experience,
              type: "success"
            });
          }
      }
      }
      // console.log("asfgyuewgfwyefgweyfgyfgyegfagywagfewgef",response.data)
      // Message({
      //   message: "恭喜恭喜~~~",
      //   type: "success"
      // });
      return response.data;
    } else {
      errorToast(response);
      return response.data;
    }
    
  },
  error => {
    const response = error.response || {};
    if (axios.isCancel(response)) {
      return false;
    }
    errorToast(error.response || error);
    return Promise.reject(error);
  }
);

/**
 * 设置公共headers
 * @param info
 * @param config
 */
function setHeader(config) {
  if (config.disableHeader) return false;
  // setHeader
  config.headers["Content-Type"] = config.contentTypejson
    ? "application/json"
    : "application/x-www-form-urlencoded";
    // config.headers["xx-user-token"] = cookie.getItem('xx-user-token') || cookie.getItem('xx_n_t');
    // config.headers["xx_n_t"] =  cookie.getItem('xx-user-token') || cookie.getItem('xx_n_t');
  // config.headers["xx-user-token"] = cookie.getItem('xx_n_t') || "";
  // config.headers["X-User-Agent"] = `version=MIFAN_pc;channel=main;mac=${ storage.getItem('uuid') }`;

  // TODO 获取并设置token
  // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiIzNDg2MDc0IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTE1NDcyOCwiaWF0IjoxNTc3OTQ1MTI4fQ.fdWr8bgcExT3a7Qr8k-AMEF142FqK09RtqMWAHc4TECvJA7V_gD2F8v7UMsJKhbAspgWdN84byJfh3IALkg70w';
  // let token = cookie.getItem('xx-user-token');
  // let xua = cookie.getItem('x-user-agent')
  // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiI2ODA2MTI5IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTE3MjE5NSwiaWF0IjoxNTc3OTYyNTk1fQ.-wFfhE9p5RxRYTJIiFLoYSG1OTCvu-LMWo3Q4bSuBuhm_QdCFnCICxhskLD2BxGKQzEVDIDO4MzZXHVH_0ehFQ';
  // let userNo = '6806129';
  // if (token) config.headers["x-zy-user-token"] = token;
  // if (xua) config.headers["x-user-agent"] = xua;
  // if (userNo) config.headers["x-zy-user-id"] = userNo;
  return true;
}

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 统一异常toast
 * @param response
 */
function errorToast(response = {}) {
  const config = response.config || {};
  if (!config.disableErrorTips) {
    // TODO 异常msg赋值
    // Message.error({
    //   message: "服务器开小差啦，请稍后再试",
    // })
    // 统一报错处理
    // if (response.data && response.data.errors && response.data.errors[0]) {
    //   singleToast(response.data.errors[0].message);
    // } else if (response.data && response.data.msg) {
    //   singleToast(response.data.msg);
    // } else if (response.data && response.data.message) {
    //   singleToast(response.data.message);
    // } else {
    //   singleToast("服务器开小差啦，请稍后再试");
    // }
  }
}

export default instance;
