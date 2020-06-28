<template>
 <div>
    <div class="login-tip">
      <el-dialog title="登录后可以" :visible.sync="loginTipDialog" width="406px" height="259px">
        <div class="login-tip-content">
          <div class="login-tip-item">
              <img src="@/assets/login/barrage.png">
              <p>发弹幕</p>
          </div>
          <div class="login-tip-item">
              <img src="@/assets/login/watchHD.png">
              <p>看高清</p>
          </div>
          <div class="login-tip-item">
              <img src="@/assets/login/beFollow.png">
              <p>点关注</p>
          </div>
        </div>
        <el-button  class="loginBtn" @click="openLoginDialog">登录</el-button>
      </el-dialog>
    </div>
    <!--登录弹框-->
    <div class="login-pop">
      <el-dialog title="登 录" :visible.sync="loginDialogVisible" width="482px" height="323px" :before-close="handleClose">
        <div class="login-pop-content">
          <el-form label-width="80px">
            <el-form-item label="手机号">
              <div class="loginMobile">
                <input type="text"  class="loginInput"  placeholder="请输入手机号" v-model="mobile" style="width:320px" :οnkeyup="mobile=mobile.replace(/[^\d\.]/g,'')"/>
              </div>
            </el-form-item>
            <el-form-item label="验证码">
              <div class="loginMobile" style="margin-bottom:20px;">
                <input type="text" class="loginInput"  placeholder="请输入验证码" v-model="code" style="width:200px;"/>
                <span v-if="coutDowm===60" class="color-main" style="width:120px;cursor:pointer;" @click="getMobileCode">请获取验证码</span>
                <span v-else class="color-main" style="width:120px;">{{coutDowm}}秒后重新获取</span>
              </div>
              <div v-if="showMessage === 'inputErr' " class='errorMessage'><span >{{errorMessage}}</span></div>
            </el-form-item>
          </el-form>
          <el-button class="loginBtn" @click="submitForm">登录</el-button>
          <section style="text-align: center">
            <el-checkbox v-model="agreement" style="margin:15px auto 0;">
              我已阅读并同意
              <a target="_blank" :href="USER_PRIVACY_CONTRACT"  class="color-main">《隐私政策》</a>
              <a target="_blank" :href="USER_SERVICE_CONTRACT"  class="color-main">《用户服务协议》</a>
            </el-checkbox>
          </section>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { Dialog, MenuItem, Button, Input, Checkbox, Divider, Message, Form, FormItem} from 'element-ui';
  import { encrypt } from "@/modules/utils/crypto.js";
  import * as eventTrack from '@/utils/eventTracking.js'
  import cookie from "@/modules/utils/cookie.js";
  import storages from "@/utils/storage.js";
  import { getCodeEncrypt,postLoginForm } from "@/api/api";
  export default {
    name: 'home-nav',
    components: {
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [MenuItem.name]: MenuItem,
      [Input.name]: Input,
      [Checkbox.name]: Checkbox,
      [Divider.name]: Divider,
      [Message.name]: Message
    },
    props: {},
    inject:['reload'],   //注入reload方法
    data() {
      return {
        showMessage: true,
        confirmColor: false,
        verifyStatus: false,
        coutDowm: 60,
        errorMessage: '手机号已经注册',
        mobile: '',
        code: '',
        agreement: true,
        tokenOptions : {
          // expires : 14, // 失效时间
          // TODO 域名
          // domain: process.env.VUE_APP_DOMAIN,
          domain: this.$store.state.domain,
          expires: 365
          // domain : ".likedu.top", // 域名
        }
      }
    },
    created() {
    },
    computed: {
      userStatus: {
        get () {
          return this.$store.state.userStatus
        },
        set(val){
          this.$store.commit('updateUserStatus', val)
        }
      },
      loginDialogVisible: {
        get () {
          return this.$store.state.openLoginDialog
        },
        set(val){
          this.$store.commit('updateLoginDialog', val)
        }
      },
      loginTipDialog: {
        get () {
          return this.$store.state.openLoginTip
        },
        set(val){
          this.$store.commit('updateLoginTip', val)
        }
      }
    },
    methods: {
      // 打开登录弹框
      openLoginDialog () {
        this.loginTipDialog = false
        this.loginDialogVisible = true
      },
      getMobileCode () {
        if (this.showMessage === 'right') {
          let param = encodeURIComponent(encrypt('message', this.mobile))
          getCodeEncrypt(param).then(res => {
            if (res.code === 0) {
              let countDownSet = setInterval(() => {
                this.coutDowm--
                if (this.coutDowm <= 0) {
                  this.verifyStatus = true
                  clearInterval(countDownSet)
                  this.coutDowm = 60
                }
              }, 800)
            } else {
              this.showMessage = 'inputErr'
              this.errorMessage = res.msg
            }
          })
        } else {
          this.showMessage = 'inputErr'
          this.errorMessage = "请输入正确手机号"
        }
      },
      submitForm () {
        if(this.agreement === true ){
           if (this.showMessage === 'right' && this.code.length === 4) {
            postLoginForm(this.code, this.mobile).then(res => {
              console.log('111',res)
              if (res.code === 0) {
                this.showMessage = 'right'
                this.userStatus = {
                  loginStatus: 'isLogin',
                  userInfo: {
                    avatarUrl: res.data.avatarUrl,
                    uid: res.data.uid,
                    uname: res.data.uname,
                    balance: res.data.balance
                  }
                }
                cookie.setItem('xx_n_t', res.data.token, this.tokenOptions)  // token 存入cookie
                storages.setItem('userStatus', this.userStatus) // 用户信息存入storage
                this.$store.state.openLoginDialog = false
                this.loginEventTanck('登录') //埋点
                window.location.reload() //调用reload方法刷新当前页面
              } else {
                this.showMessage = 'inputErr'
                this.errorMessage = '手机验证码出错'
              }
            }).catch((err) => {
               this.showMessage = 'inputErr'
               this.errorMessage = err.data.msg
            })
          } else {
            this.showMessage = 'inputErr'
            this.errorMessage = '请输入正确的验证码'
          }
        } else {
          Message.error('请同意协议')
        }

      },
      // 点击叉号关闭
      handleClose(done) {
        this.loginEventTanck('小叉号')
        done()
      },
       //登录弹框埋点
      loginEventTanck(item){
        let eventTrackParams = {}
        eventTrackParams = { item_id: 'logon_pop_click', page_id: 'longon', btn: item }
        eventTrack.reportData(eventTrackParams)
      },
  },
  mounted () {
  },
  watch: {
     mobile (val) {
      switch(true){
        case val.length === 0:
          this.showMessage = 'right'
          break;
        case val.length > 11:
          this.mobile = val.slice(0, 11)
          break;
        case val.length === 11:
          if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)){
            this.showMessage = 'inputErr'
            this.errorMessage = '请输入正确的手机号'
          }else{
            this.showMessage = 'right'
          }
          break;
        // default:
        //   如果表达式的值和以上的case后面的值都没有匹配上，那么就执行这里的代码。
        //   break;
      }
    },
    code (val) {
      if (val.length === 4) {
        this.showMessage = 'right'
      } else {
        if (val.length > 4) {
          this.showMessage = 'inputErr'
          this.errorMessage = '请输入正确的验证码'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 @import "@/assets/css/_var.scss";
 .loginBtn{
   width:320px;
   height:48px;
   margin-top: 50px;
   margin:0 auto;
   display:block;
   background:$color-main;
   border-radius:24px;
   font-size: 20px;
   font-family:PingFangSC-Medium,PingFang SC;
   font-weight:500;
   color:rgba(255,255,255,1);
 }
.login-tip-content{
   font-size:14px;
   display: flex;
   flex-direction:row;
   justify-content : space-around;
   align-items : center;
   .login-tip-item{
      display: flex;
      flex-direction:column;
      justify-content : flex-start;
      align-items : center;
      width: 65px;
   }
 }
 .login-pop{
   ::v-deep.el-dialog{
     border-radius:10px;
   }
   ::v-deep.el-dialog__header{
     margin-top: 11px;
     display: block;
     text-align: center;
     margin: 0 auto;
     font-size:18px;
     font-family:PingFangSC-Medium,PingFang SC;
     font-weight:500;
     color:rgba(51,51,51,1);
     line-height:25px;
   }
   ::v-deep.el-dialog__body{
     padding: 20px 20px 20px 20px;
   }
   ::v-deep.el-checkbox{
     border-radius:10px;
   }
   ::v-deep.el-checkbox__input.is-checked+.el-checkbox__label {
    color:#606266;
}
   .login-pop-content{
    padding: 0px 20px 0px 20px;
    .errorMessage{
      color:rgba(255,61,48,1);
      line-height: 20px;
      height: 20px;
      font-size: 14px;
    }
    .loginMobile{
      border: 1px solid rgba(242,242,242,1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items : center;
      .loginInput{
        border: none;
        outline: none;
        text-align:left;
        font-size: 14px;
        line-height: 14px;
        padding: 0 18px;
        color:rgba(74,74,74,1);
        height: 40px;
      }
    }
  }
   .toast {
				padding: 10px 25px 10px 25px ;
				background: rgba(0, 0, 0, .5);
				border-radius: 5px;
				color: #ffffff;
				text-align: center;
				position: fixed;
				left: 50%;
				top: 40%;
				transform: translate(-50%, -50%);
				z-index: 100;
			}
 }

</style>
