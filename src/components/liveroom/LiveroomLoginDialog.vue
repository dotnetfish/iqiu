<template>
  <el-dialog
    custom-class="live-login-dialog"
    title="登陆后可以"
    append-to-body
    :visible.sync="dialogVisible"
    width="406px">
    <div class="icons-container">
      <div class="icon-item" v-for="(item,index) in list" :key="index">
        <img :src="item.url" alt="">
        {{ item.title }}
      </div>
    </div>
    <div class="live-login-btn" @click="handleLogin">登录</div>
  </el-dialog>
</template>

<script>
  import { Dialog } from 'element-ui'
  import * as eventTrack from '@/utils/eventTracking.js'

  export default {
    name: 'LiveroomLoginDialog',
    props: {
      msg: String
    },
    components: {
      [Dialog.name]: Dialog
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      },
    },
    created() {
      // this.init()
    },
    methods: {
      init() {
        if (!this.isLogin) {
          console.log('dialogVisible', 'show');
          this.dialogVisible = true
        }
        let timer = null;
        timer = setInterval(() => {
          if (this.isLogin) {
            this.dialogVisible = false
            clearTimeout(timer);
          } else {
            console.log('dialogVisible', 'show');
            this.dialogVisible = true
          }
        }, this.showLoginTime)

        // 清除绑定的定时器
        this.$once('hook:beforeDestroy', () => {
          console.log("hook:beforeDestroy");
          clearTimeout(timer);
        })
      },
      handleLogin() {
        this.dialogVisible = false;
        this.$emit('login');
        this.loginEventTanck('登录')
      },
      // 弹框小叉号
       handleClose(done) {
         this.loginEventTanck('小叉号')
         done()
      },
       //登录弹框埋点
      loginEventTanck(item){
        let eventTrackParams = {}
        eventTrackParams = { item_id: 'logon_pop_click', page_id: 'zhibo', btn: item }
        eventTrack.reportData(eventTrackParams)
      },
    },
    data() {
      return {
        // isLogin: true,
        dialogVisible: false,
        showLoginTime: 1000 * 60 * 2,// 每2分钟提示一次
        list: [{
          url: require('@/assets/img/live-login-icon0.png'),
          title: '发弹幕'
        }, {
          url: require('@/assets/img/live-login-icon1.png'),
          title: '看高清'
        }, {
          url: require('@/assets/img/live-login-icon2.png'),
          title: '点关注'
        }]
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/_index.scss";

  .live-login-dialog {
    margin-top: 30vh !important;

    .el-dialog__header {
      padding-top: 15px;

      .el-dialog__title {
        font-size: 16px;
        color: $color-title2;
      }

      .el-dialog__headerbtn .el-dialog__close {
        color: $color-title2;
      }
    }

    .el-dialog__body {
      padding-top: 15px;
    }

    .icons-container {
      padding: 0 58px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .icon-item {
      text-align: center;

      img {
        display: block;
        margin-bottom: 10px;
        width: 70px;
        height: 70px;
      }
    }

    .live-login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px auto 0;
      width: 320px;
      height: 48px;
      background-color: $color-main;
      font-size: 20px;
      color: #fff;
      border-radius: 48px;
      @extend .bold;
    }
  }
</style>
