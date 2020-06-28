import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/_index.scss"; // global css
import "@/assets/css/_element-ui.scss"; // global css
import { DOWNLOAD_APP_URL, USER_SERVICE_CONTRACT, USER_PRIVACY_CONTRACT, USER_SPECIAL_CONTRACT } from '@/config/index'
import axios from "axios";
import { Message } from 'element-ui';

Vue.config.productionTip = false

Vue.prototype.Message = Message;

// 把对象挂载vue中
Vue.prototype.$axios = axios;
Vue.prototype.DOWNLOAD_APP_URL = DOWNLOAD_APP_URL;
Vue.prototype.USER_SERVICE_CONTRACT = USER_SERVICE_CONTRACT;
Vue.prototype.USER_PRIVACY_CONTRACT = USER_PRIVACY_CONTRACT;
Vue.prototype.USER_SPECIAL_CONTRACT = USER_SPECIAL_CONTRACT;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
