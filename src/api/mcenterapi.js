import axios from "./axios";

const qs = require("qs");

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

// 用户管理-展期列表
/*
export const getExtensionOrderReport = data =>
  axios({
    url: `${ baseURL }/order/getExtensionOrderReport`,
    method: "post",
    data: qs.stringify(data)
  });

// 信审管理-我的案件
export const auditOrderList = data =>
  axios({
    url: `${ baseURL }/audit/orderList`,
    method: "post",
    data,
  });
*/

// 获取登录用户信息
export const usersLoginInfo = () =>
  axios({
    url: `${ baseURL }/aiqiu/v1/user/login/info`,
    method: "get"
  });

export const upLoadAvatar = data =>
  axios({
    url: `${ baseURL }/aiqiu/v1/upLoad/file`,
    method: "post",
    data
  });

export const updateUser = data =>
  axios({
    url: `${ baseURL }/aiqiu/v1/user/updateUser?`+qs.stringify(data),
    method: "post",
  });

export const payConfTabs = data =>
  axios({
    url: `${ baseURL }/aiqiu/v1/payConf/tabs?platform=` + data.platform,
    method: "get"
  });


export const upLoadFileBase=data=>
 // console.log('data',data)
  axios({
    url: `${ baseURL}/aiqiu/v1/app/upload/fileBase`,
    data,
    method: "post",
    headers: {'Content-Type': 'text/plain'}
  });


export const payList = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/pay/list?assetType=` +
      data.assetType +
      "&p=" +
      data.p +
      "&size=" +
      data.size,
    method: "get"
  });

export const lookSalarySlip = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/frontSalary/lookSalarySlip?p=` +
      data.p +
      "&size=" +
      data.size,
    method: "get"
  });

export const salaryRecordList = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/withdraw/salaryRecordList?p=` +
      data.p +
      "&size=" +
      data.size,
    method: "get"
  });

export const managerList = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/live/room/managers?p=` +
      data.p +
      "&size=" +
      data.size,
    method: "get"
  });

export const forbidList = params => {
  console.log(params,'params');
  return  axios({
    url: `${ baseURL }/aiqiu/v1/user/forbid/list`,
    method: "get",
    params
  });
}


export const forbidUser = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/user/forbid/user`,
    params:data,
    method: "post"
  });

export const setManager = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/live/room/managers?operator=` +
      data.operator +
      "&uid=" +
      data.uid,
    method: "post"
  });

export const findLiveRecordDay = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/live/records?` +qs.stringify(data),
    method: "get",
  });

export const getMenuList = data =>
  axios({
    url: `${ baseURL }/aiqiu/v1/menu/anchorMenuList?name=` + data.name,
    method: "get"
  });

export const channelInfos = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/live/channels/info`,
    method: "get",
    params
  });

export const updateChannel = data =>
  axios({
    url:
      `${ baseURL }/aiqiu/v1/live/channels/updateChannel?` +qs.stringify(data),
       method: "post"
  });

// 米饭支付统一下单地址
export const payIndex = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/pay/index`,
    method: "get",
    params
  });
// 通过订单号查询订单
export const payOrder = params =>
  axios({
    url: `${ baseURL }/aiqiu/v1/pay/order`,
    method: "get",
    params
  });
