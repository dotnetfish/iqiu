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

   // 榜单
   export const requestRankingList = (data) =>
    axios({
      url: `${baseURL}/aiqiu/v1/live/ranking/list`,
      method: "post",
      data,
      contentTypejson: true,
  });

     // 设置密码
     export const setPassword = (data) =>
     axios({
       url: `${baseURL}/aiqiu/v1/user/logins/setPassword`,
       method: "post",
       data,
       contentTypejson: true,
   });

   // 修改密码
   export const updatePassword = (data) =>
   axios({
     url: `${baseURL}/aiqiu/v1/user/logins/updatePassword`,
     method: "post",
     data,
     contentTypejson: true,
 });

 // 密码登入
 export const loginPassword = (data) =>
 axios({
   url: `${baseURL}/aiqiu/v1/user/logins/password`,
   method: "post",
   data,
   contentTypejson: true,
});

// 忘记密码
export const backPassword = (data) =>
axios({
  url: `${baseURL}/aiqiu/v1/user/logins/backPassword`,
  method: "post",
  data,
  contentTypejson: true,
});

// 注册
export const loginregister = (data) =>
axios({
  url: `${baseURL}/aiqiu/v1/user/logins/register`,
  method: "post",
  data,
  contentTypejson: true,
});

// 新手任务
export const newTaskAdd = (data) =>
axios({
  url: `${baseURL}/aiqiu/v1/app/task/newTaskAdd`,
  method: "post",
  data,
  contentTypejson: true,
});

// 新手任务完成情况
export const newTaskList = (data) =>
axios({
  url: `${baseURL}/aiqiu/v1/app/task/newTaskList`,
  method: "post",
  data,
  contentTypejson: true,
});

// 日常任务
export const dayTaskAdd = (data) =>
axios({
  url: `${baseURL}/aiqiu/v1/app/task/everydayTaskAdd`,
  method: "post",
  data,
  contentTypejson: true,
});

// 日常任务完成情况
export const dayTaskList = (data) =>
axios({
  url: `${baseURL}/aiqiu/v1/app/task/everydayTaskList`,
  method: "post",
  data,
  contentTypejson: true,
});
// 添加弹幕记录
export const addMesNum = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/task/addMesNum`,
  method: "post",
  data,
  contentTypejson: true,
})

// 签到情况列表
export const signlist = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/sign/list`,
  method: "post",
  data,
  contentTypejson: true,
})

//签到
export const signadd = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/sign/add`,
  method:"post",
  data,
  contentTypejson:true,
})

//邮箱
export const bindEmail = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/user/bindEmail`,
  method:"post",
  data,
  contentTypejson:true,
})

//查看是否可以领取粉丝牌
export const findFanCard = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/findFanCard`,
  method:"post",
  data,
  contentTypejson:true,
})

//领取粉丝牌
export const getFanCard = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/get`,
  method:"post",
  data,
  contentTypejson:true,
})

//佩戴粉丝牌
export const wearFanCard = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/wear`,
  method:"post",
  data,
  contentTypejson:true,
})

//取消佩戴粉丝牌
export const unwearFanCard = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/unWear`,
  method:"post",
  data,
  contentTypejson:true,
})

//用户实时等级
export const getLevel = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/user/getLevel`,
  method:"post",
  data,
  contentTypejson:true,
})

//直播间粉丝牌列表
export const getChannelFanCard = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/getChannelFanCard`,
  method:"post",
  data,
  contentTypejson:true,
})

//我的粉丝牌列表
export const myFanCardList = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/myFanCardList`,
  method:"post",
  data,
  contentTypejson:true,
})

//主播申请粉丝牌
export const FanCardadd = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/add`,
  method:"post",
  data,
  contentTypejson:true,
})

//主播粉丝牌详情
export const FanCardinfo = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/fanCard/info`,
  method:"post",
  data,
  contentTypejson:true,
})

//我的背包礼物列表
export const MyPackage = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/live/gift/getMyPackage`,
  method:"get",
  data,
  contentTypejson:true,
})

//系统消息列表
export const sysMessagelist = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/sysMessage/list`,
  method:"post",
  data,
  contentTypejson:true,
})

//系统未读消息
export const haveMessage = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/sysMessage/haveMessage`,
  method:"post",
  data,
  contentTypejson:true,
})

//读消息
export const readsysMessage = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/sysMessage/read`,
  method:"post",
  data,
  contentTypejson:true,
})

//举报弹幕
export const accusationadd = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/accusation/add`,
  method:"post",
  data,
  contentTypejson:true,
})

//充值记录列表
export const paylist = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/pay/list`,
  method:"post",
  data,
  contentTypejson:true,
})

//充值记录列表
export const bindBank = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/user/bindBank`,
  method:"post",
  data,
  contentTypejson:true,
})

//代充人信息
export const getToUser = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/pay/getToUser`,
  method:"post",
  data,
  contentTypejson:true,
})

//默认充值数据
export const payType = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/pay/payType`,
  method:"post",
  data,
  contentTypejson:true,
})

//支付宝充值球币
export const payadd = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/pay/add`,
  method:"post",
  data,
  contentTypejson:true,
})

//获取用户资产
export const getPay = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/user/getPay`,
  method:"post",
  data,
  contentTypejson:true,
})

//我的收益
export const mySalary = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/pay/mySalary`,
  method:"post",
  data,
  contentTypejson:true,
})

//主播申请提现
export const paycash = (data) =>
axios({
  url:`${baseURL}/aiqiu/v1/app/pay/cash`,
  method:"post",
  data,
  contentTypejson:true,
})