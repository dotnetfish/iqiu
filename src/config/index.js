// 接口响应成功时候的code码
export const SUCCESS_CODE = 0;
// token失效
export const TIME_OUT_CODE = 403;

/**
 * 0 正常响应码 600 待丰富
 * @type {number[]}
 */
export const WHITELIST_CODE = [0, 600, 602, 400];
/**
 * 状态接口白名单
 * @type {string[]}
 */
export const WHITELIST_FLOW = [];
// 直播助手下载
export const DOWNLOAD_APP_URL = "http://static.cloudartisan.cn/upload/iQiuTool-V1.0.0.5-Setup.exe";
// 用户服务协议
export const USER_SERVICE_CONTRACT = `${ process.env.VUE_APP_CDN === 'production' ? "https://m.iqiulive.cn" : "https://m.iqiulive.com" }/contract_user`;
// 用户隐私协议
export const USER_PRIVACY_CONTRACT = `${ process.env.VUE_APP_CDN === 'production' ? "https://m.iqiulive.cn" : "https://m.iqiulive.com" }/contract_privacy`;
// 免责声明
export const USER_SPECIAL_CONTRACT = `${ process.env.VUE_APP_CDN === 'production' ? "https://m.iqiulive.cn" : "https://m.iqiulive.com" }/contract_special`;

export const SERVICE_PHONE = "95595";

export const LEANCLOUD = {
  development: {
    appId: "x5m2kYzKReAyIFNMmTwwiXT9-9Nh9j0Va",
    appKey: "A79Yw8BG7LEshJl0wVCoerrW",
    // masterKey: "",
    server: "https://chat.iqiulive.cn"
  },
  production: {
    appId: "x5m2kYzKReAyIFNMmTwwiXT9-9Nh9j0Va",
    appKey: "A79Yw8BG7LEshJl0wVCoerrW",
    // masterKey: "",
    server: "https://chat.iqiulive.cn"
  }
   
};

