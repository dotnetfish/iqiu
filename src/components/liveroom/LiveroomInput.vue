<template>
  <div class="live-input">
    <div class="mask mask-ban" v-if="userInfo.forbid && isLogin">{{ banText }}</div>
    <div class="mask mask-login" v-if="!isLogin" @click.stop="$emit('login')"><span>登陆</span>即可发送弹幕</div>
    <el-input
      type="textarea"
      :rows="2"
      resize="none"
      placeholder=""
      v-model.trim="textarea"
      maxlength="50"
      show-word-limit
      v-on:keyup.enter.native="handleSend">
    </el-input>
    <el-button class="btn" :class="{'login': isLogin}" @click.stop="handleSend">发布</el-button>
    <!--<div class="btn" :class="{'login': isLogin}">发布</div>-->
  </div>
</template>

<script>
  import { Input, Button } from 'element-ui'
  import setTime from "@/utils/setTime";
  import { throttle } from "@/utils/debounceAndthrottle";

  export default {
    name: 'LiveroomInput',
    components: {
      [Input.name]: Input,
      [Button.name]: Button,
    },
    data() {
      return {
        textarea: "",
      }
    },
    props: {
      userInfo: {
        type: Object
      }
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      },
      banText: function () {
        if (this.userInfo.forbidEndTime) {
          let time = setTime(this.userInfo.forbidEndTime)
          // 于2019-12-23 19:30:00解封
          return `于${ time.timeStr }解封`
        }
        return ''
      }
    },
    methods: {
      setTime: setTime,
      // handleSend() {
      //   if (!this.textarea) return;
      //   this.$emit('sendMsg', this.textarea)
      //   this.textarea = "";
      // },
      handleSend: throttle(function () {
        if (!this.textarea) return;
        this.$emit('sendMsg', this.textarea)
        this.textarea = "";
      }, 2000),
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .live-input {
    position: relative;
    margin-top: 40px;
    height: 54px;
    padding-left: 12px;
    padding-right: 11px;

    ::v-deep .el-textarea {
      width: 265px;
      display: inline-block;
    }

    ::v-deep .el-textarea__inner {
      box-sizing: border-box;
      border-radius: 4px 0 0 4px;
    }

    .btn {
      display: inline-block;
      width: 80px;
      height: 54px;
      /*line-height: 54px;*/
      text-align: center;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      border-radius: 0 4px 4px 0;
      border: 0 none;
      background-color: $color-border-input;

      &.login {
        background-color: $color-main;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 12px;
      z-index: 1;
      margin-right: 82px;
      width: 265px;
      height: 100%;
      line-height: 54px;
      font-size: 14px;
      text-align: center;
    }

    .mask-ban {
      color: $color-title2;
    }

    .mask-login {
      color: $color-title3;

      span {
        cursor: pointer;
        color: $color-main;
      }
    }
  }

</style>
