import axios from "./axios";

// const qs = require("qs");

let baseURL = process.env.VUE_APP_ZY_API;
console.log(baseURL);
// ---------------------示例 -------------------------
// export const getRealInfo = (params = {}) => {
//     params.disableErrorTips = true; // 此接口不影响主流程，即使错误也不提示错误消息
//     params.noCheckCode = true; // 不校验返回code
//     params.disableHeader = true; // 不设置header
//     params.contentTypejson = true; // Content-Type类型 注意params格式
//     return axios.get('/renpinloan/api/v1/userInfo/{{userId}}', params);
// };
// ---------------------示例结束 -------------------------

export const api = axios;

// 查询房间榜单数据
export const queryRoomRanking = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/ranking/queryRoomRanking`,
    method: "get",
    params,
  });

// 添加关注操作,并设置当前设备的类别
export const attentionAnchor = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/follow/add`,
    method: "post",
    params,
  });

// 取消关注主播,并更改设备信息
export const attentionCancelAnchor = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/follow/undo`,
    method: "post",
    params,
  });

// 当前直播间信息
export const channelInfo = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/channels/info`,
    method: "post",
    params,
  });

// 进入直播间
export const enterRoom = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/room/enter`,
    method: "get",
    params,
  });

// 得到礼物列表
export const getGiftList = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/gift/getGiftList`,
    method: "get",
    params,
  });

// 发送礼物
export const sendGift = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/gift/sendGift`,
    method: "post",
    params,
  });

// 对用户进行禁言和取消禁言操作
export const forbidUser = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/user/forbid/user`,
    method: "post",
    params,
  });

// 设置房管
export const setManager = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/room/managers`,
    method: "post",
    params,
  });

// 抢红包
export const openRedPacket = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/redPocket/openRedPacket`,
    method: "post",
    params,
  });

// 获取当前登录用户信息
export const loginInfo = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/user/login/info`,
    method: "get",
    params,
  });
