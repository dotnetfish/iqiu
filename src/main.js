import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/_index.scss"; // global css
import "@/assets/css/_element-ui.scss"; // global css
import { DOWNLOAD_APP_URL, USER_SERVICE_CONTRACT, USER_PRIVACY_CONTRACT, USER_SPECIAL_CONTRACT } from '@/config/index'
import axios from "axios";
import { Message } from 'element-ui';
import Meta from 'vue-meta';
import VueClipboard from 'vue-clipboard2'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker)
Vue.use(HappyScroll)
Vue.component('happy-scroll', HappyScroll)
Vue.use(Meta)

Vue.use(VueClipboard)
// Vue.use(Message);

Vue.config.productionTip = false

Vue.prototype.$message = Message;
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

// 把对象挂载vue中
Vue.prototype.$axios = axios;
Vue.prototype.DOWNLOAD_APP_URL = DOWNLOAD_APP_URL;
Vue.prototype.USER_SERVICE_CONTRACT = USER_SERVICE_CONTRACT;
Vue.prototype.USER_PRIVACY_CONTRACT = USER_PRIVACY_CONTRACT;
Vue.prototype.USER_SPECIAL_CONTRACT = USER_SPECIAL_CONTRACT;

new Vue({
  router,
  data:{
    // title: '爱球直播-草根参与的体育互动直播',
    // keywords: '爱球、爱球直播、英超直播、中超直播、西甲直播、NBA、体育直播、足球直播、体育赛事、电竞直播、高清无延迟直播、欧洲杯',
    // description: '爱球直播是草根参与的互动类型综合体育直播平台，包含足球、篮球、电竞、娱乐等综合体育赛事，涵盖了中超、西甲、德甲、意甲、法甲、英超、CBA、NBA、美女秀场等互动直播内容'
  },
  // metaInfo(){
  //   return{
  //     title:this.title,
  //         meta:[
  //           {
  //             name:'keywords',
  //             content:this.keywords
  //           },{
  //             name:'description',
  //             content:this.description
  //           }
  //         ]
  //   }
  // },
  store,
  render: h => h(App)
}).$mount('#app')
