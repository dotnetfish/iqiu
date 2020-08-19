import axios from "./axios";

const qs = require("qs");

// let baseURL = process.env.VUE_APP_ZY_API;
let baseURL = process.env.VUE_APP_ZY_API;
// let baseurl = 'http://192.168.0.109:8080';
// https://api.iqiulive.cn
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

// export const api = axios;

// 用户管理-展期列表
export const getExtensionOrderReport = data =>
  axios({
    url: `${baseURL}/order/getExtensionOrderReport`,
    method: "post",
    data: qs.stringify(data)
  });

// leanCloud-签名
export const leanCloudSign = (roomId, mac) =>
  axios({
    // url: `${ baseURL }/aiqiu/v1/chat/leancloud/sessionsign?roomId=${roomId}&mac=${mac}`, // 加密
    url: `${baseURL}/aiqiu/v1/chat/leancloud/sessionsign-unencry?roomId=${roomId}&mac=${mac}`,
    method: "get",
    contentTypejson: true
  });

// 登录-获取手机验证码-短信加密.
export const getCodeEncrypt = param =>
  axios({
    url: `${baseURL}/aiqiu/v1/user/logins/codeEncrypt?mobile=${param}`,
    method: "post",
    contentTypejson: true
  });

// 登录-发送手机号+验证码
export const postLoginForm = (param1, param2) =>
  axios({
    url: `${baseURL}/aiqiu/v1/user/logins/login/sms?code=${param1}&mobile=${param2}`,
    method: "post",
    contentTypejson: true
  });

//获取视频信息

export const getChannelInfo = (anchorId) =>
  axios.get(`${baseURL}/aiqiu/v1/live/channels/info?cid=${anchorId}&vf=FLV`)
// axios.get(`${baseURL}/aiqiu/v1/channels/infoM3u8?cid=${anchorId}`)  // hls
  // axios({
  //   url:`${baseURL}/aiqiu/v1/live/channels/info?cid=${anchorId}&vf=FLV`,
  //   method: "get",
  // })

// 获取关注列表 /user/follow/getFollowAnchors
export const attentionGetFollowAnchors = (data, headers) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/follow/channels`,
    // url: `http://192.168.10.167:8080/aiqiu/v1/attention/getFollowAnchors`,
    method: "get",
    headers,
    data,
    contentTypejson: false,
    disableHeader: false
  });
// 获取分类
export const CategoryList = (data, headers) =>
  axios({
    url: `${baseURL}/aiqiu/v1/app/menu/list`,
    method: "get",
    headers,
    params: data,
    contentTypejson: true,
    disableHeader: false
  });
// 获取直播列表
export const liveList = (data, headers) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/type/channel`,
    method: "get",
    headers,
    params: data
    // contentTypejson: true,
    // disableHeader: false
  });
// 获取推荐直播列表
export const recommendLiveList = (data, headers) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/recommend/hot`,
    method: "get",
    headers,
    params: data
    // contentTypejson: true,
    // disableHeader: false
  });

  // 获取推荐直播信息
export const channelInfo = (data, headers) =>
axios({
  url: `${baseURL}/aiqiu/v1/live/channels/info`,
  method: "get",
  headers,
  params: data
  // contentTypejson: true,
  // disableHeader: false
});
// 获取pc推荐直播列表
export const changeHotVideo = (data, headers) =>
axios({
  url: `${baseURL}/aiqiu/v1/live/channels/recommend/pchot`,
  method: "get",
  headers,
  params: data
  // contentTypejson: true,
  // disableHeader: false
});

// 获取搜索结果
export const searchResult = (data) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/search`,
    method: "get",
    params: data
    // contentTypejson: true,
    // disableHeader: false
  });


// 检查当前状态
export const checkStatus = (data) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/apply/status`,
    method: "post",
    params: data
  });

// 检查手机端验证码
export const checkCode = (data) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/apply/bindMobile`,
    method: "post",
    params: data
    // contentTypejson: true,
    // disableHeader: false
  });

// 校验身份证信息
export const checkSecond = (data) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/apply/checkSecond`,
    method: "post",
    params: data
  });

// 校验介绍说明
export const checkThird = (data) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/apply/checkThird`,
    method: "post",
    params: data
  });

// 校验介绍说明live/ranking/query
export const rankingQuery = (data) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/ranking/query`,
    method: "get",
    params: data
  });

  // POST 的json请求方式:不要放到params中要放在data中
  // 接口地址的域名要用剑波电脑的IP地址,不是接口网站的全地址,只要copy接口文档的接口路径地址就好,比如:/aiqiu/v1/app/match/find
  //赛程列表
  export const matchList = (data, headers) =>
    axios({
      url: `${baseURL}/aiqiu/v1/app/match/find`,
      method: "post",
      headers:headers,
      data:  data,
      contentTypejson: true,
  });

  // 赛程详情
  export const matchInfo = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/app/match/info`,
      method: "post",
      data,
      contentTypejson: true,
  });

  // 热门赛程详情
  export const hotmatchList = (data, headers) =>
    axios({
      url: `${baseURL}/aiqiu/v1/app/match/hot`,
      method: "post",
      headers:headers,
      data:  data,
      contentTypejson: true,
  });


  //添加赛程预约
  export const addmatchList = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/app/match/order`,
      method: "post",
      data:  data,
      contentTypejson: true
  });

  //取消赛程预约
  export const deletematchList = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/app/match/unOrder`,
      method: "post",
      data:  data,
      contentTypejson: true
    });

  //关注
  export const focusmatchList = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/app/match/follow`,
      method: "post",
      data:  data,
      contentTypejson: true
  });

  //取消关注
  export const nofocusmatchList = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/app/match/unFollow`,
      method: "post",
      data:  data,
      contentTypejson: true
  });

   // 赛程下预约主播直播列表
   export const matchChannelList = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/live/channels/match/channel`,
      method: "post",
      data,
      contentTypejson: true,
  });

  // 申请状态
  export const applyStatus = (data) =>
  axios({
    url: `${baseURL}/aiqiu/v1/live/channels/apply/status`,
    method: "post",
    data,
    contentTypejson: true,
});

// 榜单
// export const requestRankingList = (data) =>
// axios({
//   url: `${baseURL}/aiqiu/v1/live/ranking/list`,
//   method: "post",
//   data,
//   contentTypejson: true,
// });

   // 赛程下预约主播直播列表
   export const requestRankingList = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/live/ranking/list`,
      method: "post",
      data,
      contentTypejson: true,
  });

