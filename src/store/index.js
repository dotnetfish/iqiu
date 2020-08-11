import Vue from 'vue'
import Vuex from 'vuex'
import storages from "@/utils/storage.js";
import cookie from "@/modules/utils/cookie.js";

Vue.use(Vuex)

let storageUserStatus = storages.getItem('userStatus') || {}

console.log('APP.VUE,获取getItem->>>>>>>>', storageUserStatus)

var isCN = window.location.host.split('.')[2] == 'cn' ? true: false;

let {
  userInfo = {
    avatarUrl: '',
    uid: '',
    uname: '',
    balance: 0,
    migrateConfirm: false,
    zuid: null
  },
  loginStatus = "notLogin"
} = storageUserStatus

let hostArray = window.location.host.split('.')
let DOMAIN = `.${hostArray[1]}.${hostArray[2]}`
window.DOMAIN = DOMAIN

export default new Vuex.Store({
  state: {
    fold: false,
    leftW0: false,
    userStatus: {
      userInfo: userInfo,
      loginStatus: loginStatus // isLogin/notLogin
    },
    openLoginDialog: false,   // 只弹出登录弹框
    openLoginTip: false,      // 先弹出登录提示、在弹出登录弹框
    userIp: '',                // 用户外网IP
    domain: DOMAIN,
    isCN: isCN
  },
  getters: {
    isLogin: function (state) {
      return state.userStatus.loginStatus === 'isLogin';
    }
  },
  mutations: {
    FoldState(state, obj) {
      console.log(typeof obj)
      state.fold = obj.fold;
      state.leftW0 = obj.leftW0;
      window.sessionStorage.setItem('leftFoldState', obj.fold);
      window.sessionStorage.setItem('leftWState', obj.leftW0);
    },
    // 修改userStatus
    updateUserStatus(state, userStatus) {
      console.log("修改登陆状态 = ",userStatus);
      storages.setItem('userStatus', userStatus)
      if (userStatus.userInfo) state.userStatus.userInfo = userStatus.userInfo
      if (userStatus.loginStatus) state.userStatus.loginStatus = userStatus.loginStatus
    },
    // 修改登录弹框状态
    updateLoginDialog(state, status) {
      state.openLoginDialog = status
    },
    // 修改登录提示框
    updateLoginTip(state, status) {
      console.log('修改openLoginTip参数status', status)
      state.openLoginTip = status
      console.log('修改openLoginTip接口', state.status)
    },
    // 退出登陆
    layout(state) {
      state.userStatus = {
        userInfo: {
          avatarUrl: '',
          uid: '',
          uname: ''
        },
        loginStatus: 'notLogin'
      }
      cookie.removeItem('xx_n_t', {
        // expires : 14, // 失效时间
        // TODO 域名
        domain: state.domain,
        expires: 365
        // domain : ".likedu.top", // 域名
      })
      storages.removeItem('userStatus', this.userStatus)

      let href = window.location.href
      if (href.substr(-3, 3) === '/me') {
        // hack 在个人中心退出登录后死循环
        window.location.href = window.location.origin;
      } else {
        window.location.reload()
      }
    },
    updataUserIp(state, val) {
      state.userIp = val
    },

  },
  actions: {},
  modules: {}
})
