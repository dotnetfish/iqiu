<template>
  <section>
    <loginPop ref="login" @successLogin="init"></loginPop>
    <div :class="[{ fold: isFold }, 'main-header']">
      <homeNav :navLogo="true"></homeNav>
      <!--      <homeNav :navLogo="false"></homeNav>-->
    </div>
    <div class="liveroom" :class="[{ fold: isFold }, 'main-container']">
      <LeftSideBar @changeFoldState="getFoldState"></LeftSideBar>
      <div class="main-wrap">
        <LiveroomHeader
          :channelInfo="channelInfo"
          v-bind:follow.sync="userInfo.follow"
          @login="login"
        ></LiveroomHeader>

        <div class="empty" ref="danmaku" id="danmaku">
          <videoPlayer ref="dPlayer" :roomId="liveroom" :notLivingSuggest="recommendVideo2"></videoPlayer>
          <!--          <LiveroomPaodao :messageItem="messageItem"></LiveroomPaodao>-->
        </div>
        <LiveroomGift
          :userLogin="userLogin"
          :channelInfo="channelInfo"
          :giftList="giftList"
          @sendGiftSuccess="sendGiftSuccess"
          @login="login"
        ></LiveroomGift>
        <LiveroomRecommend ref="recommend" :recommendList="recommendList"></LiveroomRecommend>
      </div>
      <div class="chat-wrap">
        <liveroomNotice :msg="channelInfo.notice"></liveroomNotice>
        <liveroomRank :channelInfo="channelInfo"></liveroomRank>
        <liveroomChat
          :giftListToObject="giftListToObject"
          :hongbaoList="hongbaoList"
          :userLogin="userLogin"
          :msgList="msgList"
          :channelInfo="channelInfo"
          :giftItem="giftItem"
          :userInfo="userInfo"
          :col="col"
          @login="login"
          @hongBaoSuccess="getloginInfo"
        ></liveroomChat>
        <!-- <div class="fanmessage"><img src="@/assets/timg.jpg" style="width:90%;height:60px;"></div> -->
        <liveroomInput :userInfo="userInfo" @sendMsg="sendMsg" @login="login" :channelInfo="channelInfo" @change-color='getcolor'></liveroomInput>
        <LiveroomLoginDialog @login="login"></LiveroomLoginDialog>
      </div>
    </div>
    <liveroomSmallvideo></liveroomSmallvideo>
  </section>
</template>
<script>
import LiveroomHeader from "@/components/liveroom/LiveroomHeader";
import LiveroomGift from "@/components/liveroom/LiveroomGift";
import liveroomNotice from "@/components/liveroom/LiveroomNotice";
import liveroomRank from "@/components/liveroom/LiveroomRank";
import liveroomInput from "@/components/liveroom/LiveroomInput";
import liveroomChat from "@/components/liveroom/LiveroomChat";
// import LiveroomPaodao from "@/components/liveroom/LiveroomPaodao";
import LiveroomLoginDialog from "@/components/liveroom/LiveroomLoginDialog";
import LiveroomRecommend from "@/components/liveroom/LiveroomRecommend";
import liveroomSmallvideo from "@/components/liveroom/liveroomSmallvideo.vue"

import LeftSideBar from "@/components/left-side-bar.vue";
import homeNav from "@/views/home/homeNav.vue";
import loginPop from "@/components/login/loginTipPopup.vue";
import videoPlayer from "@/components/video/videoPlayer.vue";

import { md5Secret } from "@/utils/md5.js";
import * as Chat from "@/utils/chat.js";
import { event } from "@/utils/leancloud.js";
import {
  queryRoomRanking,
  channelInfo,
  enterRoom,
  getGiftList,
  loginInfo
} from "@/api/liveroom";
import { recommendLiveList } from "@/api/api";

import { debounce } from "@/utils/debounceAndthrottle";
// import Cookies from 'js-cookie';
import Danmaku from "danmaku";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "LiveRoom",
  components: {
    LiveroomHeader,
    LiveroomGift,
    liveroomChat,
    // LiveroomPaodao,
    liveroomNotice,
    liveroomRank,
    LiveroomLoginDialog,
    liveroomInput,
    LiveroomRecommend,
    liveroomSmallvideo,
    LeftSideBar,
    homeNav,
    loginPop,
    videoPlayer
  },
  data() {
    return {
      flag: 3,
      isFold: true,
      userLogin: {
        // "id": "6806129",
        // "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiI2ODA2MTI5IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTUxOTY0MiwiaWF0IjoxNTc4MzEwMDQyfQ.VU2NbKftvSJTRe1tTcXtRoWW4UnGg36gGGbHq3KgSBfhDLNjptkLsYPNyhsU_lpaZJ97Hq4LnA8Q8ThgPmAtnQ",
        // "mobile": "184****6272",
        // "uname": "足球精英",
        // "status": 0,
        // "avatarUrl": "https://pic.imifan.live/avatar/2019121013081813608091574583384.jpg",
        // "accountDto": {
        //   "_id": "13183057850163215",
        //   "uid": "6806129",
        //   "cashAccount": {
        //     "totalBalance": 9011,
        //     "balance": 9011,
        //     "frzBalance": 0,
        //     "totalRecharge": 12000,
        //     "totalWithdrawal": 10000
        //   },
        //   "salaryAccount": {
        //     "totalBalance": 6000,
        //     "balance": 5000,
        //     "frzBalance": 1000,
        //     "totalRecharge": 0,
        //     "totalWithdrawal": 0
        //   },
        //   "cashAssets": 8011,
        //   "miCoin": {
        //     "balance": 379898800,
        //     "totalExpend": 1099998,
        //     "totalRecharge": 1099998
        //   },
        //   "cashTotalRecharge": 1111998,
        //   "cashTotalWithdrawal": 10000
        // },
        // "isAnchor": true,
        // "favorite": 1,
        // "wxBindStatus": "BIND",
        // "wxName": "mimo",
        // "canEditUname": true,
        // "logOutStatus": "INAUDIT"
      },
      liveroom: "",
      col:'',
      col1:'',
      channelInfo: {}, // 主播信息
      userInfo: {
        channelRoleType: 0,
        follow: false,
        forbid: false,
        forbidEndTime: null
      }, // 用户在当前直播间信息
      giftList: [], // 礼物列表
      giftListToObject: {}, // 礼物列表
      hongbaoList: [], // 红包列表
      recommendList: [], // 推荐列表
      recommendVideo2: [], // 未开播推荐列表
      rankObject: {},
      messageItem: {},
      giftItem: {
        // "gift": {
        //   "anchorId": "6919164",
        //   "anchorName": "冯曦妤",
        //   "id": 12915206930636802,
        //   "name": "浪味仙",
        //   "number": 1,
        //   "picture": "https://pic.imifan.live/gifts/langXianXian/2019101819283913031452620677141.png",
        //   "showGift": true,
        //   "totalFee": 10
        // },
        // "pType": 0,
        // "pid": "6919164",
        // "sign": "286403A393C275046C3053CA7EBE4ADD",
        // "user": {
        //   "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
        //   "id": "3486074",
        //   "name": "晨曦吻月"
        // }
      },
      msgList: [
        // 四种角色发送弹幕
        // {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000004","user":{"role":0,"name":"春暖花开567","id":"10000004"}},"_lctype":-1,"_lctext":"主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1"},
        // {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","user":{"role":1,"name":"春暖花开567","id":"3506329"}},"_lctype":-1,"_lctext":"主播早1"},
        // {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","user":{"role":2,"name":"春暖花开567","id":"3506329"}},"_lctype":-1,"_lctext":"主播早2"},
        // {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","user":{"role":9,"name":"春暖花开567","id":"3506329"}},"_lctype":-1,"_lctext":"主播早3"},
        // {"_lcattrs":{"gift":{"anchorId":"6336335","anchorName":"老牛解说","id":12915206930636801,"name":"饭团","number":1,"picture":"https://pic.imifan.live/gifts/riceBall/2019101819132913031452620677128.png","showGift":true,"totalFee":10},"pType":0,"pid":"6336335","sign":"F5AE7BF879696F2ECE83AADD2359E229","user":{"avatar":"https://pic.imifan.live/avatar/2019111210320013250427765727273.jpg","id":"6741398","name":"凉白开"}},"_lctext":"12915206930636801","_lctype":2}, {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","user":{"role":0,"name":"春暖花开567","id":"3506329"}},"_lctype":-1,"_lctext":"主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1主播早1"},
        // {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","user":{"role":1,"name":"春暖花开567","id":"3506329"}},"_lctype":-1,"_lctext":"主播早1"},
        // {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","user":{"role":2,"name":"春暖花开567","id":"3506329"}},"_lctype":-1,"_lctext":"主播早2"},
        // {"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","user":{"role":9,"name":"春暖花开567","id":"3506329"}},"_lctype":-1,"_lctext":"主播早3"},
        // {"_lcattrs":{"gift":{"anchorId":"6336335","anchorName":"老牛解说","id":12915206930636801,"name":"饭团","number":1,"picture":"https://pic.imifan.live/gifts/riceBall/2019101819132913031452620677128.png","showGift":true,"totalFee":10},"pType":0,"pid":"6336335","sign":"F5AE7BF879696F2ECE83AADD2359E229","user":{"avatar":"https://pic.imifan.live/avatar/2019111210320013250427765727273.jpg","id":"6741398","name":"凉白开"}},"_lctext":"12915206930636801","_lctype":2},
        // {
        //   "_lctype": 1,
        //   "_lctext": "小飞机关注了这个主播",
        //   "_lcattrs": {
        //     "user": { "id": "20032019", "name": "晨曦吻月", "role": 9, "avatar": "xxxxxx" },
        //     "sm": { "type": 0 },
        //     "gift": { "id": 83743784138, "number": 12, "totalFee": 1200, "anchorId": "726265" },
        //     "rw": { "type": 0, "level": 0, "isJump": 0 },
        //     "pType": 0,
        //     "pid": "126712676"
        //   }
        // },
        // {
        //   "_lctype": 1,
        //   "_lctext": "公告",
        //   "_lcattrs": {
        //     "user": { "id": "20032019", "name": "晨曦吻月", "role": 9, "avatar": "xxxxxx" },
        //     "sm": { "type": 1 },
        //     "gift": { "id": 83743784138, "number": 12, "totalFee": 1200, "anchorId": "726265" },
        //     "rw": { "type": 0, "level": 0, "isJump": 0 },
        //     "pType": 0,
        //     "pid": "126712676"
        //   }
        // },
        // {
        //   "_lctype": 5,
        //   "_lctext": "ban",
        //   "_lcattrs": {
        //     "user": { "id": "20032019", "name": "晨曦吻月", "role": 9, "avatar": "xxxxxx" },
        //     "sm": { "type": 0 },
        //     "gift": { "id": 83743784138, "number": 12, "totalFee": 1200, "anchorId": "726265" },
        //     "rw": { "type": 0, "level": 0, "isJump": 0 },
        //     "pType": 0,
        //     "pid": "126712676"
        //   }
        // },
        // {
        //   "_lctype": 1,
        //   "_lctext": "小飞机关注了这个主播",
        //   "_lcattrs": {
        //     "user": { "id": "20032019", "name": "晨曦吻月", "role": 9, "avatar": "xxxxxx" },
        //     "sm": { "type": 0 },
        //     "gift": { "id": 83743784138, "number": 12, "totalFee": 1200, "anchorId": "726265" },
        //     "rw": { "type": 0, "level": 0, "isJump": 0 },
        //     "pType": 0,
        //     "pid": "126712676"
        //   }
        // }
      ], // 弹幕列表
      danmaku: null, // 视频弹幕
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    topNavStyleObj() {
      if (this.isFold) {
          return {
            paddingLeft: `48px`,
            width: `calc(100% - 48px)`,
            minWidth: "1132px"
          };
        } else {
          return {
            paddingLeft: `240px`,
            width: `calc(100% - 240px)`,
            minWidth: "948px"
          };
        }
    },
    userStatus: {
      get() {
        return this.$store.state.userStatus;
      },
      set(val) {
        return this.$store.commit("updateUserStatus", val);
      }
    }
  },
  watch: {
    $route() {
      // 对路由变化作出响应
      this.init();
    }
    // isLogin(value) {
    //   // 监听登陆成功 组件暴露功能 暂未使用
    //   if(value) this.init()
    // }
  },

  created() {
    // let sign = "123*5";
    // let md5string = "12345";
    //
    // if (sign.indexOf("*") > -1) {
    //   console.log((sign = sign.split("*")[0]), "sign.split('*')[0]");
    //   console.log((md5string = md5string.slice(0, sign.length)), "md5string");
    // }
    // console.log(md5string === sign);
    // document.cookie = 'xx-user-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiIzNDg2MDc0IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTE1NDcyOCwiaWF0IjoxNTc3OTQ1MTI4fQ.fdWr8bgcExT3a7Qr8k-AMEF142FqK09RtqMWAHc4TECvJA7V_gD2F8v7UMsJKhbAspgWdN84byJfh3IALkg70w'
    // Cookies.set('xx-user-token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiIzNDg2MDc0IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTE1NDcyOCwiaWF0IjoxNTc3OTQ1MTI4fQ.fdWr8bgcExT3a7Qr8k-AMEF142FqK09RtqMWAHc4TECvJA7V_gD2F8v7UMsJKhbAspgWdN84byJfh3IALkg70w')
    this.init();
    // setTimeout(() => {
    //   this.msgList.push({
    //     name: 111,
    //     content: 222222
    //   })
    // },3000)

    // test chatroom
    // let index = 1;
    // setInterval(() => {
    //   console.log('msgList push');
    //   this.msgList.push({
    //     name: 111,
    //     content: 222222+ index
    //   })
    //   index++
    // },3000)

    // test 礼物横幅
    // let i = 1;
    // let timer = setInterval(() => {
    //   if (i == 10) clearInterval(timer);
    //   this.giftItem = {
    //     "gift": {
    //       "anchorId": "6919164",
    //       "anchorName": "冯曦妤",
    //       "id": 12915206930636802,
    //       "name": "浪味仙",
    //       "number": 1,
    //       "picture": "https://pic.imifan.live/gifts/langXianXian/2019101819283913031452620677141.png",
    //       "showGift": true,
    //       "totalFee": 10 * i
    //     },
    //     "pType": 0,
    //     "pid": "6919164",
    //     "sign": "286403A393C275046C3053CA7EBE4ADD",
    //     "user": {
    //       "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
    //       "id": "3486074",
    //       "name": "晨曦吻月"
    //     }
    //   }
    //   i++
    //
    //   console.log('setTimeout-----------------------');
    //   this.getRank();
    //
    // }, 1000)

    // test 跑道
    // let i = 1;
    // let timer = setInterval(() => {
    //   if (i == 3) clearInterval(timer);
    //   this.msgList.push({"_lcattrs":{"gift":{"anchorId":"10007878","anchorName":"小饭粒_10007878","id":"12915206930636816","name":"满汉全席","number":1,"picture":"https://pic.imifan.live/gifts/manchu/2019101819301813031452620677143.png","showGift":true,"totalFee":200000},"pType":0,"pid":"10007878","sign":"B575A0DA78F8AB6A0A20D4D1546C8279","user":{"avatar":"https://pic.imifan.live/avatar/2020011612283314054534902399033.jpg","id":"6782355","name":"fred"}},"_lctext":"12915206930636816","_lctype":2})
    // this.messageItem = {
    //   "_lcattrs": {
    //     "pType": 1,
    //     "rw": {
    //       "anchorId": "6144444",
    //       "anchorName": "不朽少年梦",
    //       "duration": 10000,
    //       "isJump": 1,
    //       "level": 0,
    //       "name": "糖果庄园",
    //       "number": 2,
    //       "picture": "https://pic.imifan.live/gifts/fruitCastle/2019101819410313031452620677151.png",
    //       "times": 3,
    //       "type": 1
    //     },
    //     "sign": "64C3A3E27B5DB6DAFE1F3C46B6D9FEAE",
    //     "user": {
    //       "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
    //       "id": "3486074",
    //       "name": "晨曦吻月"
    //     }
    //   }, "_lctext": "晨曦吻月赠送给主播不朽少年梦 2 个 糖果庄园！快来围观吧!", "_lctype": 4
    // }
    //   i++
    //
    //   console.log('setTimeout');
    //
    // }, 1000)

    // 封禁测试
    // setTimeout(() => {
    //   this.userInfo= {
    //     channelRoleType: 2,
    //     follow: false,
    //     forbid: true,
    //     forbidEndTime: 1577963587139
    //   };
    // },3000)

    // 红包 测试
    // this.hongbaoList.push({"_lcattrs":{"pType":0,"sign":"37D9109E305705375A2960BEB3000222","lcuid":"CHAT_USER_3506329","pid":"10000157","rp":{"time":5000,"id":"3506329"}},"_lctype":3,"_lctext":"主播早"})
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.$nextTick(() => {
      this.DanmakuInit();
    });
  },
  destroyed() {
    // 移除弹幕和resize监听
    this.danmaku.destroy();
    window.removeEventListener("resize", this.danmakuResize);
  },
  methods: {
    getcolor(color){
      this.col = color
      console.log("改变颜色=",this.col)
    },
    //滚动条
    handleScroll() {
      this.scrollTop = window.pageYOffset;
      console.log(this.scrollTop);
      if (this.scrollTop >= 700) {
        this.videoshow = true;
      } else {
        this.videoshow = false;
      }
    },
    getFoldState() {
      // let leftFoldState = window.sessionStorage.getItem("leftFoldState");
      // this.isFold =
      //   leftFoldState === null || leftFoldState === "false" ? false : true;
      this.$nextTick(() => {
        this.$refs.recommend.init();
      });
    },
    DanmakuInit() {
      this.danmaku = new Danmaku({
        // 用于显示弹幕的「舞台」会被添加到该容器中
        container: this.$refs.danmaku,
        // container: this.$refs.dPlayer,
        // container: document.querySelector('#danmaku'),
        // container: document.querySelector('.video-player'),
        // video: document.querySelector('.dplayer-video'),

        // 弹幕数据数组，在 emit API 中会说明其格式
        comments: [],

        // 支持 DOM 引擎和 canvas 引擎。canvas 引擎一般比 DOM 更高效，但相对更耗内存。
        // 默认为 DOM 引擎
        // engine: 'canvas',

        // 弹幕速度，也可以用 speed API 设置
        speed: 105
      });

      // setInterval(() => {
      //   this.danmaku.emit(comment);
      // },200)
      this.danmakuResize();
      window.addEventListener("resize", this.danmakuResize);
    },
    danmakuResize: debounce(
      function() {
        console.log("aaaa",this.danmaku);
        this.danmaku.resize();
      },
      200,
      false
    ),
    /**
     * 飘窗弹幕自己的type 对应三种字体
     * 展示的消息类型：
     * -1用户发送的消息、 #ffffff
     * 1欢迎消息、关注消息、#FFC955
     * 2抢红包消息 #FF7F64
     * @param message
     * @param type
     */
    sendDanmaku(message, type,msgColor) {
      this.col1 = this.col 
      if(!msgColor){
        msgColor = '#FFFFFF'
      }
      let colorMap = {
        "-1": msgColor,
        1: "#FFC955",
        2: "#FF7F64"
      };
      // if(this.col == '#000000'){
      //   let colorMap = {
      //   "-1": '#FFFFFF',
      //   1: "#FFC955",
      //   2: "#FF7F64"
      // };
      // }
      let comment = {
        text: message,

        // 默认为 rtl（从右到左），支持 ltr、rtl、top、bottom。
        mode: "rtl",

        // 在使用 DOM 引擎时，Danmaku 会为每一条弹幕创建一个 <div> 节点，
        // 以下 CSS 样式会直接设置到 div.style 上
        style: {
          // top: '30px',
          zIndex: 10,
          fontSize: "24px",
          fontWeight: "700",
          opacity: "0.84",
          lineHeight: "33px",
          color: colorMap[type],
          padding: "4px 0",
          textShadow: "1px 0px 1px rgba(34,34,34,1)"
        }

        // 自定义渲染器
        // 当 `render` 字段存在时, `text`, `html`, `style` 和 `canvasStyle` 将被忽略。

        // 在使用 DOM 引擎时，该函数应当返回一个 HTMLElement。
        // render: function() {
        // var $div = document.createElement('div');
        // var $img = document.createElement('img');
        // $img.src = '/path/to/xxx.png';
        // $div.appendChild($img);
        // return $div;
        // },
        // 在使用 canvas 引擎时，该函数应当返回一个 HTMLCanvasElement。
        // render: function() {
        //   var canvas = document.createElement('canvas');
        //   canvas.width = 320;
        //   canvas.height = 180;
        //   var ctx = canvas.getContext('2d');
        //   ctx.beginPath();
        //   ctx.arc(75, 75, 50, 0, 2 * Math.PI);
        //   ctx.stroke();
        //   return canvas;
        // }
      };
      this.danmaku.emit(comment);
    },
    init() {
      // 左侧边栏当前状态
      // this.getFoldState();
      console.log(6666);
      this.liveroom = this.$route.params.liveroom;
      // if (this.getChannelInfo instanceof Promise) {
      //   console.log("yes Promise");
      // } else console.log("no Promise");
      this.getChannelInfo().then(()=>{
          console.log("yes Promise===",this.channelInfo);
          this.connetConversation();
          this.getrecommendLiveList();
      })      
      this.getGiftList();
      // this.getRanking();
      this.getloginInfo();
      this.enterRoom();
    },
    sendGiftSuccess(data) {
      this.$set(this.userLogin, "credit", data.credit);
    },
    // 获取直播间信息
    getloginInfo() {
      if (!this.isLogin) return;
      return loginInfo().then(res => {
        this.userLogin = res.data;
        // this.userStatus.userInfo.balance = res.data.accountDto.miCoin.balance
        // console.log('this.userStatus.userInfo.balance',this.userStatus.userInfo.balance)
        // console.log("直播间-个人信息", res);
      });
    },
    // 当前用户进入直播间的信息
    enterRoom() {
      // if (!this.isLogin) return;
      return enterRoom({ cid: this.liveroom }).then(res => {
        this.userInfo = res.data;
        // console.log(res);
      });
    },
    // 获取直播间信息
    getChannelInfo() {
    return channelInfo({ cid: this.liveroom }).then(res => {
           this.channelInfo = res.data;
           document.title = this.channelInfo.name;
           console.log("888888888888888888888888888",this.channelInfo);
          //  console.log(res);
        });
    },
    // 获取推荐列表
    getrecommendLiveList() {
      return recommendLiveList(
        {
          recommendAnchorType: "SEARCH_PAGE"
          // size: 10,
        },
        {}
      ).then(res => {
        // 未开播
        if (this.channelInfo.playStatusCode == 905) {
          console.log('1')
          this.recommendVideo2 = res.data.slice(0, 2);
          this.recommendList = res.data.slice(2);
        } else {
          this.recommendList = res.data;
        }
        console.log(res);
      });
    },
    // 礼物列表
    getGiftList() {
      return getGiftList().then(res => {
        this.giftList = res.data;
        // this.giftList = [res.data[0],res.data[0],res.data[0],res.data[0],res.data[0],res.data[0],res.data[0],res.data[0]];

        res.data.forEach(item => {
          this.$set(this.giftListToObject, item.id, item);
        });
        console.log(res);
      });
    },
    // 榜单
    getRanking() {
      return queryRoomRanking({ anchorId: this.liveroom, type: 0 }).then(res => {
        this.rankObject = res.data;
      });
    },
    // 节流处理 更新榜单
    getRank: debounce(
      function() {
        this.getRanking();
      },
      1000,
      false
    ),
    // 弹幕初始化
    connetConversation() {
      var error;
      // throw error;
      console.log("链接聊天室-用户信息", this.userStatus);
      let clientId = "CHAT_VISITOR_" + uuidv4();
      if (this.isLogin) {
        clientId = "CHAT_USER_" + this.userStatus.userInfo.uid;
      }
      console.log("链接聊天室clientId", clientId);
      Chat.getChatRoom(clientId, this.channelInfo.chatRooms[0]).then(
        // test--加入签名
        conversation => {
          console.log(conversation, "conversation");
          this.msgList.push({
            _lctype: 1,
            // _lctext: `欢迎来到秘饭直播${ this.channelInfo.uname }的直播间，监播人员将对直播间进行24小时巡查，禁止传播任何违法、违规、低俗、暴力等不良信息的行为。`
            _lctext: `爱球禁止未成年人送礼等付费行为、严禁主播诱导未成年人消费。如直播间出现违法违规、色情低俗、赌博、诱导欺诈等行为，请及时举报。管理员24小时在线巡查并接受举报。`
          });
          // this.sendDanmaku(`欢迎来到秘饭直播${ this.channelInfo.uname }的直播间，直播间依法对直播内容进行24小时巡查，禁止任何传播违章、违规、低俗、暴力等不良信息的行为。`, 1)
          try {
            // 正常交互
            conversation.on(event.MESSAGE, message => {
              console.log("event.MESSAGE", event.MESSAGE);
              console.log("message", message);
              console.log("message.content", message.content);
              console.log(
                message.content,
                "contentcontentcontentcontentcontent"
              );
              console.log(
                message.content._lctext,
                "messagemessagemessagemessagemessage"
              );
              this.assignedMessage(message.content);
            });
            // // 弹出提示，告知当前用户的 clientId 在其他设备上登录了
            conversation.on(event.CONFLICT, function() {
              // TODO 互踢啦
              console.log("互踢啦");
            });
          } catch (error) {
            console.log("弹幕服务器加载失败");
          }
        }
      );
    },
    // 分配弹幕返回数据
    assignedMessage(message) {
      let text = message._lctext;
      let type = message._lctype;
      let md5String = md5Secret(text);
      let sign = message._lcattrs.sign;
      let msg = message._lcattrs.msgColor
      /**
       * 因为加密的字符串含有leanCloud的屏蔽词, 会被转化为*, 所以各个客户端需要增加以下逻辑
       * 第一步: 判断字符串中是否包含*: 不包含直接对比
       * 第二步: 如果包含*, 则判断*是否为第一个, 如果是第一个则不进行对比,直接展示
       * 第三步: 如果不是第一个则切割字符串, 获取*前面的部分, 然后和本地截取相同长度然后在进行对比
       */
      if (sign.indexOf("*") > -1) {
        sign = sign.split("*")[0];
        md5String = md5String.slice(0, sign.length);

        console.log(sign, "sign");
        console.log(md5String, "md5string");
      }
      console.log(md5String === sign, "md5String === sign");
      if (md5String === sign && md5String !== "false") {
        console.log("receive message:" + text);
        // 弹幕文案
        if (type === -1 || type === 1 || type === 2 || type === 5) {
          this.msgList.push(JSON.parse(JSON.stringify(message)));
        }
        // 飘窗弹幕
        if (type === -1) {
          this.sendDanmaku(text, "-1", msg);
        }
        if (type === 1) {
          this.sendDanmaku(text, message._lcattrs.sm === 0 ? 2 : 1);
        }
        // 禁言 判断的是不是当前登陆用户
        if (type === 5 && message._lcattrs.fb.uid === this.userLogin.id) {
          this.enterRoom();
        }
        // 设置房管 判断的是不是当前登陆用户
        if (type === 6 && message._lcattrs.manager.id === this.userLogin.id) {
          this.enterRoom();
        }
        // 礼物
        if (type === 2) {
          this.giftItem = JSON.parse(JSON.stringify(message._lcattrs));
          // this.getRank();
        }
        // 红包
        if (type === 3) {
          this.hongbaoList.push(JSON.parse(JSON.stringify(message)));
        }
        // 跑道
        if (type === 4) {
          this.messageItem = JSON.parse(JSON.stringify(message));
        }
      }
    },
    // 发送消息
    sendMsg(msg,levelicon,nowicon,name) {
      console.log(msg,"sendMsg",name,levelicon);
      let sign = md5Secret(msg);
      let params = {
        user: {
          id: this.userLogin.id,
          name: this.userLogin.uname,
          role: this.userInfo.channelRoleType,
          avatar: this.userLogin.avatarUrl,
          fansCardName: name,
          fansCardUrl: nowicon,
          icon:levelicon,
          sign:this.userLogin.sign,
        },
        pType: 0,
        msgColor: this.col,
        pid: this.liveroom,
        lcuid: `CHAT_USER_${this.userLogin.id}`,
        sign
      };
      Chat.sendMsg(msg,params).then(() => {
        console.log("success",this.col);
        this.msgList.push({
          _lcattrs: {
            user: {
              role: this.userInfo.channelRoleType,
              name: this.userLogin.uname,
              id: this.userLogin.id,
              avatar: this.userLogin.avatarUrl,
              fansCardName: name,
              fansCardUrl: nowicon,
              icon:levelicon,
              sign:this.userLogin.sign,
            },
            msgColor: this.col,
          },
          _lctype: -1,
          _lctext: msg,
          icon:levelicon,
        });
        // console.log("aaaaaaaaaaaaaaaaaaaaadddddddd=",this.col)
        this.sendDanmaku(msg,"-1",this.col);
      });
    },
    login() {
      // 展示登陆弹窗
      this.$refs.login.openLoginDialog();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/_index.scss";

.video-player {
  /*position: absolute;*/
  /*width: 100%;*/
  /*height:100%;*/
}

.topNav {
  position: fixed;
  z-index: $z-index1;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 948px;
  padding-left: 240px;
  // transition: all 0.5s;
  background-color: #fff;
}

.main-header {
  position: fixed;
  z-index: 21;
  top: 0;
  left: 0;
  width: 100%;

  ::v-deep.home-nav {
    /*width: calc(100% - 480px);*/
    /*margin: 0 240px;*/
    /*box-sizing:border-box;*/
  }
}

.main-container {
  padding-left: 240px;

  &.fold {
    padding-left: 48px;
  }
}

.liveroom {
  position: relative;
  padding-top: 60px;
  padding-right: 370px;

  background-color: $bg-main;
  @extend %clearfix;
}

.main-wrap {
  margin: 20px 20px 20px 35px;
  min-width: 535px;
  // float:left;
  display: flex;
  flex-direction: column;
  // width: calc(80vw - 240px);
  width: calc(93vw - 371px);
}

.chat-wrap {
  position: fixed;
  z-index: 3;
  right: 0;
  top: 80px;
  border-radius: 10px;
  width: 17%;
  min-width: 371px;
  background-color: #fff;
  border: 1px solid $color-border;
  border-top: 0px solid $color-border;
  border-right: 0px solid $color-border;

}

.empty {
  position: relative;
  /*height: 350px;*/
  background-color: #ccc;
  // hack 更改弹幕定位方式 保证视频在文档流内
  & > ::v-deep div:not(:only-child):last-of-type {
    position: absolute !important;
    z-index: 19 !important;
    top: 0px !important;
    /*background-color: red!important;*/
  }
}
</style>
