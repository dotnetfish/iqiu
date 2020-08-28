<template>
  <div class="login-tip-popup">
    <div class="login-tip">
      <el-dialog title="登录后可以" :visible.sync="loginTipDialog" width="406px" height="259px">
        <div class="login-tip-content">
          <div class="login-tip-item">
            <img src="@/assets/login/barrage.png" />
            <p>发弹幕</p>
          </div>
          <div class="login-tip-item">
            <img src="@/assets/login/watchHD.png" />
            <p>看高清</p>
          </div>
          <div class="login-tip-item">
            <img src="@/assets/login/beFollow.png" />
            <p>点关注</p>
          </div>
        </div>
        <el-button class="loginBtn" @click="openLoginDialog">登录</el-button>
      </el-dialog>
    </div>
    <!-- 未设置密码弹窗 -->
    <!--登录弹框-->
    <div class="login-pop">
      <el-dialog
        :visible.sync="loginDialogVisible"
        width="520px"
        height="323px"
        :before-close="handleClose"
      >
        <div style="display:flex;width:100%;height:33px" v-if="find==false && register==false">
          <div class="passwordenter" @click="changeblue(true)" ref="passwordenter">密码登入</div>
          <div class="quickenter" @click="changeblue(false)" ref="quickenter">快捷登入</div>
        </div>
        <div style="display:flex;height:3px;width:100%;margin-bottom:47px" v-if="find==false && register==false">
          <div class="blueone" v-if="showblue==true"></div>
          <div class="bluetow" v-if="showblue==false"></div>
        </div>
        <!-- 快捷登入 -->
        <div class="login-pop-content" v-if="showblue==false && find==false && register==false">
          <el-form >
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="text"
                  class="loginInput"
                  placeholder="请输入手机号"
                  v-model="mobile"
                  style="width:320px"
                  :οnkeyup="mobile=mobile.replace(/[^\d\.]/g,'')"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile" style="margin-bottom:20px;">
                <input
                  type="text"
                  class="loginInput"
                  placeholder="请输入验证码"
                  v-model="code"
                  style="width:200px;"
                />
                <span
                  v-if="coutDowm===60"
                  class="color-main"
                  style="width:120px;cursor:pointer;font-size:16px"
                  @click="getMobileCode"
                >请获取验证码</span>
                <span
                  v-else
                  class="color-main"
                  style="width:135px;font-size:16px"
                >{{coutDowm}}秒后重新获取</span>
              </div>
              <div v-if="showMessage === 'inputErr' " class="errorMessage">
                <span>{{errorMessage}}</span>
              </div>
            </el-form-item>
          </el-form>
          <el-button class="loginBtn" @click="submitForm">登录</el-button>
          <section style="text-align: center;margin-top:30px;margin-bottom:24px">
            <el-checkbox v-model="agreement" style="margin:15px auto 0;font-size:18px;">
              <span style="font-size:16px;">我已阅读并同意</span>
              <a
                target="_blank"
                :href="USER_PRIVACY_CONTRACT"
                class="color-main"
                style="font-size:16px;"
              >《隐私政策》</a>
              <a
                target="_blank"
                :href="USER_SERVICE_CONTRACT"
                class="color-main"
                style="font-size:16px;"
              >《用户服务协议》</a>
            </el-checkbox>
          </section>
          <!-- <div class="Divider">
            <div class="divider"></div>
          </div>
          <div class="team">合作账号登入</div>
          <div style="display:flex;height:42px;justify-content:center;margin-bottom:10px">
            <div style="width:42px;height:42px;margin-right:53px">
              <img src="@/assets/微信.png" />
            </div>
            <div style="width:42px;height:42px;margin-left:53px">
              <img src="@/assets/qq.png" />
            </div>
          </div>
          <div style="display:flex;height:42px;justify-content:center;margin-bottom:10px">
            <div
              style="height:42px;margin-right:30px;color:rgba(153,153,153,1);font-size:18px;"
            >微信登入</div>
            <div style="height:42px;margin-left:50px;color:rgba(153,153,153,1);font-size:18px;">QQ登入</div>
          </div> -->
        </div>
        <!-- 密码登入 -->
        <div class="login-pop-content" v-if="showblue==true && find==false && register==false">
          <el-form>
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="text"
                  class="loginInput"
                  placeholder="请输入手机号"
                  v-model="mobile1"
                  style="width:320px"
                  :οnkeyup="mobile=mobile.replace(/[^\d\.]/g,'')"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile" style="margin-bottom:20px;">
                <input
                  type="password"
                  class="loginInput"
                  placeholder="请输入密码"
                  v-model="code1"
                  style="width:406px;border:0px"
                  show-password
                />
              </div>
            </el-form-item>
          </el-form>
          <div style="height:25px;width:100%;justify-content: space-between;display:flex">
            <span class="noremeber" @click="registerpassword(true)" style="margin-left:20px">快捷注册</span>
            <span class="noremeber" @click="findpassword(true)">忘记密码？</span>
          </div>
          <el-button class="loginBtn" @click="submitForm1()">登录</el-button>
          <section style="text-align: center;margin-top:30px;">
            <el-checkbox v-model="agreement" style="margin:15px auto 0;font-size:18px;">
              <span style="font-size:16px;">我已阅读并同意</span>
              <a
                target="_blank"
                :href="USER_PRIVACY_CONTRACT"
                class="color-main"
                style="font-size:16px;"
              >《隐私政策》</a>
              <a
                target="_blank"
                :href="USER_SERVICE_CONTRACT"
                class="color-main"
                style="font-size:16px;"
              >《用户服务协议》</a>
            </el-checkbox>
          </section>
          <!-- <div class="Divider">
            <div class="divider"></div>
          </div>
          <div class="team">合作账号登入</div>
          <div style="display:flex;height:42px;justify-content:center;margin-bottom:10px">
            <div style="width:42px;height:42px;margin-right:53px">
              <img src="@/assets/微信.png" />
            </div>
            <div style="width:42px;height:42px;margin-left:53px">
              <img src="@/assets/qq.png" />
            </div>
          </div>
          <div style="display:flex;height:42px;justify-content:center;margin-bottom:10px">
            <div
              style="height:42px;margin-right:30px;color:rgba(153,153,153,1);font-size:18px;"
            >微信登入</div>
            <div style="height:42px;margin-left:50px;color:rgba(153,153,153,1);font-size:18px;">QQ登入</div>
          </div> -->
        </div>
        <!-- 找回密码 -->
        <div class="Backpassword" v-if="find==true">
          <div>忘记密码</div>
        </div>
        <div class="login-pop-content" v-if="find==true">
          <el-form>
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="text"
                  class="loginInput"
                  placeholder="请输入手机号"
                  v-model="mobile"
                  style="width:320px"
                  :οnkeyup="mobile=mobile.replace(/[^\d\.]/g,'')"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="text"
                  class="loginInput"
                  placeholder="请输入验证码"
                  v-model="code"
                  style="width:200px;"
                />
                <span
                  v-if="coutDowm===60"
                  class="color-main"
                  style="width:120px;cursor:pointer;font-size:16px"
                  @click="getMobileCode"
                >请获取验证码</span>
                <span
                  v-else
                  class="color-main"
                  style="width:135px;font-size:16px"
                >{{coutDowm}}秒后重新获取</span>
              </div>
              <div v-if="showMessage === 'inputErr' " class="errorMessage">
                <span>{{errorMessage}}</span>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="password"
                  class="loginInput"
                  placeholder="请输入新密码"
                  v-model="newpassword"
                  show-password
                  style="width:200px;"
                />
              </div>
              <span class="error" v-if="flag1">大写字母、小写字母、数字和标点符号至少包含2种且长度在8-16</span>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile" style="margin-bottom:20px;">
                <input
                  type="password"
                  class="loginInput"
                  placeholder="确认新密码"
                  v-model="newpassword1"
                  show-password
                  style="width:200px;"
                />
              </div>
              <span class="error" v-if="flag2">密码不一致</span>
            </el-form-item>
          </el-form>
          <el-button class="loginBtn" @click="submitForm2()">完成</el-button>
          <div class="backpassword">
            <span @click="findpassword(false)">返回密码登入</span>
          </div>
        </div>

        <!-- 注册账号 -->
        <div class="Backpassword" v-if="register==true">
          <div>快捷注册</div>
        </div>
        <div class="login-pop-content" v-if="register==true">
          <el-form>
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="text"
                  class="loginInput"
                  placeholder="请输入手机号"
                  v-model="mobile"
                  style="width:320px"
                  :οnkeyup="mobile=mobile.replace(/[^\d\.]/g,'')"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="text"
                  class="loginInput"
                  placeholder="请输入验证码"
                  v-model="code"
                  style="width:200px;"
                />
                <span
                  v-if="coutDowm===60"
                  class="color-main"
                  style="width:120px;cursor:pointer;font-size:16px"
                  @click="getMobileCode"
                >请获取验证码</span>
                <span
                  v-else
                  class="color-main"
                  style="width:135px;font-size:18px"
                >{{coutDowm}}秒后重新获取</span>
              </div>
              <div v-if="showMessage === 'inputErr' " class="errorMessage">
                <span>{{errorMessage}}</span>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile">
                <input
                  type="password"
                  class="loginInput"
                  placeholder="请输入新密码"
                  show-password
                  v-model="Newpassword"
                  style="width:200px;"
                />
              </div>
              <span class="error" v-if="flag1">大写字母、小写字母、数字和标点符号至少包含2种且长度在8-16</span>
            </el-form-item>
            <el-form-item>
              <div class="loginMobile" style="margin-bottom:20px;">
                <input
                  type="password"
                  class="loginInput"
                  placeholder="确认新密码"
                  show-password
                  v-model="Newpassword1"
                  style="width:200px;"
                />
              </div>
              <span class="error" v-if="flag2">密码不一致</span>
            </el-form-item>
          </el-form>
          <el-button class="loginBtn" @click="submitForm3()">完成</el-button>
          <div class="backpassword">
            <span @click="registerpassword(false)">返回密码登入</span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  Dialog,
  MenuItem,
  Button,
  Input,
  Checkbox,
  Divider,
  Message,
  Form,
  FormItem,
} from "element-ui";
import { encrypt } from "@/modules/utils/crypto.js";
import * as eventTrack from "@/utils/eventTracking.js";
import cookie from "@/modules/utils/cookie.js";
// import { loginInfo } from "@/api/liveroom";
import storages from "@/utils/storage.js";
import {
  getCodeEncrypt,
  postLoginForm,
  loginPassword,
  backPassword,
  loginregister
} from "@/api/api";
export default {
  name: "home-nav",
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [MenuItem.name]: MenuItem,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    [Divider.name]: Divider,
    [Message.name]: Message,
  },
  props: {},
  inject: ["reload"], //注入reload方法
  data() {
    return {
      showMessage: true,
      confirmColor: false,
      verifyStatus: false,
      coutDowm: 60,
      errorMessage: "手机号已经注册",
      flag1: false,
      flag2:false,
      mobile: "",
      code: "",
      mobile1: "",
      code1: "",
      newpassword: "",
      newpassword1: "",
      Newpassword:"",
      Newpassword1:"",
      find: false,
      register:false,
      showblue: true,
      agreement: true,
      tokenOptions: {
        // expires : 14, // 失效时间
        // TODO 域名
        // domain: process.env.VUE_APP_DOMAIN,
        domain: this.$store.state.domain,
        expires: 365,
        // domain : ".likedu.top", // 域名
      },
    };
  },
  created() {},
  computed: {
    userStatus: {
      get() {
        return this.$store.state.userStatus;
      },
      set(val) {
        console.log("111111111111111111set UserStatus = ", val);
        this.$store.commit("updateUserStatus", val);
      },
    },
    loginDialogVisible: {
      get() {
        return this.$store.state.openLoginDialog;
      },
      set(val) {
        this.$store.commit("updateLoginDialog", val);
      },
    },
    loginTipDialog: {
      get() {
        return this.$store.state.openLoginTip;
      },
      set(val) {
        this.$store.commit("updateLoginTip", val);
      },
    },
  },
  methods: {
    // 打开登录弹框
    openLoginDialog() {
      this.loginTipDialog = false;
      this.loginDialogVisible = true;
    },
    getMobileCode() {
      if (this.showMessage === "right") {
        let param = encodeURIComponent(encrypt("message", this.mobile));
        getCodeEncrypt(param).then((res) => {
          if (res.code === 0) {
            let countDownSet = setInterval(() => {
              this.coutDowm--;
              if (this.coutDowm <= 0) {
                this.verifyStatus = true;
                clearInterval(countDownSet);
                this.coutDowm = 60;
              }
            }, 800);
          } else {
            this.showMessage = "inputErr";
            this.errorMessage = res.msg;
          }
        });
      } else {
        this.showMessage = "inputErr";
        this.errorMessage = "请输入正确手机号";
      }
    },
    changeblue(showblue) {
      this.showblue = showblue;
      // if(this.showblue == true) {
      //   this.$refs.passwordenter.style.color = 'rgba(51, 51, 51, 1)';
      //   this.$refs.quickenter.style.color = 'rgba(122,122,122,1)';
      // }else{
      //   this.$refs.quickenter.style.color = 'rgba(51, 51, 51, 1)';
      //   this.$refs.passwordenter.style.color = 'rgba(122,122,122,1)';
      // }
    },
    findpassword(type) {
      this.mobile= '';
      this.code= '';
      this.newpassword = "",
      this.newpassword1 = "",
      this.find = type;
    },
    registerpassword(type) {
      this.mobile= '';
      this.code= '';
      this.Newpassword = "",
      this.Newpassword1 = "",
      this.register = type;
    },
    submitForm() {
      if (this.agreement === true) {
        if (this.showMessage === "right" && this.code.length === 4) {
          postLoginForm(this.code, this.mobile)
            .then((res) => {
              console.log("111", res);
              if (res.code === 0) {
                this.showMessage = "right";
                this.userStatus = {
                  loginStatus: "isLogin",
                  userInfo: {
                    avatarUrl: res.data.avatarUrl,
                    uid: res.data.uid,
                    uname: res.data.uname,
                    balance: res.data.balance,
                  },
                };
                cookie.setItem("xx_n_t", res.data.token, this.tokenOptions); // token 存入cookie
                storages.setItem("userStatus", this.userStatus); // 用户信息存入storage
                this.$store.state.openLoginDialog = false;
                this.loginEventTanck("登录"); //埋点
                window.location.reload(); //调用reload方法刷新当前页面
              } else {
                this.showMessage = "inputErr";
                this.errorMessage = "手机验证码出错";
              }
            })
            .catch((err) => {
              this.showMessage = "inputErr";
              this.errorMessage = err.data.msg;
            });
        } else {
          this.showMessage = "inputErr";
          this.errorMessage = "请输入正确的验证码";
        }
      } else {
        Message.error("请同意协议");
      }
    },
    submitForm1() {
      if (this.agreement === true) {
        let data = {
          mobile: this.mobile1,
          password: this.code1,
        };
        loginPassword(data).then((res) => {
          if(res.code===500) {
            this.$message({
                  message: res.msg,
                  type: "success",
                });
          } else {
          this.userStatus = {
            loginStatus: "isLogin",
            userInfo: {
              avatarUrl: res.data.avatarUrl,
              uid: res.data.uid,
              uname: res.data.uname,
            },
          };
          cookie.setItem("xx_n_t", res.data.token, this.tokenOptions); // token 存入cookie
          storages.setItem("userStatus", this.userStatus); // 用户信息存入storage
          this.$store.state.openLoginDialog = false;
          this.loginEventTanck("登录"); //埋点
          window.location.reload(); //调用reload方法刷新当前页面
          }
        });
      } else {
        Message.error("请同意协议");
      }
    },
    submitForm2() {
      if (this.showMessage === "right" && this.code.length === 4) {
        var FloatRegex = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/;
        if (!FloatRegex.test(this.newpassword)) {
          this.flag1 = true;
        } else {
          this.flag1 = false;
        }
        if (this.newpassword != this.newpassword1) {
          this.flag2 = true;
        } else {
          this.flag2 = false;
        }
        if (this.flag1 == false && this.flag2 == false) {
          let data = {
            mobile: this.mobile,
            code: this.code,
            password: this.newpassword,
          };
          backPassword(data)
            .then((res) => {
              if (res.code === 0) {
                this.showMessage = "right";
                this.$message({
                  message: "密码修改成功",
                  type: "success",
                });
                this.find = false;
              } else {
                this.showMessage = "inputErr";
                this.errorMessage = "手机验证码出错";
              }
            })
            .catch((err) => {
              this.showMessage = "inputErr";
              this.errorMessage = err.data.msg;
            });
        }
      } else {
        this.showMessage = "inputErr";
        this.errorMessage = "请输入正确的验证码";
      }
    },
    //注册
    submitForm3() {
      if (this.showMessage === "right" && this.code.length === 4) {
        var FloatRegex = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/;
        if (!FloatRegex.test(this.Newpassword)) {
          this.flag1 = true;
        } else {
          this.flag1 = false;
        }
        if (this.Newpassword != this.Newpassword1) {
          this.flag2 = true;
        } else {
          this.flag2 = false;
        }
        if (this.flag1 == false && this.flag2 == false) {
          let data = {
            mobile: this.mobile,
            code: this.code,
            password: this.Newpassword,
          };
          loginregister(data)
            .then((res) => {
              console.log(res)
              if(res.code === 500) {
                this.$message({
                  message: "手机号已注册过",
                  type: "success",
                });
              } else{
              if (res.code === 0) {
                this.showMessage = "right";
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.register = false;
              } else {
                this.showMessage = "inputErr";
                this.errorMessage = "手机验证码出错";
              }
              }
            })
            .catch((err) => {
              this.showMessage = "inputErr";
              this.errorMessage = err.data.msg;
            });
        }
      } else {
        this.showMessage = "inputErr";
        this.errorMessage = "请输入正确的验证码";
      }
    },
    // 点击叉号关闭
    handleClose(done) {
      this.loginEventTanck("小叉号");
      done();
    },
    // getHomeUserInfo () {
    //   console.log('登录获取用户信息11ressfsssss');
    //     loginInfo().then(res => {
    //       this.isPassword = res.data.isPassword
    //       if(this.isPassword == 1) {
    //         this.isPassword == false
    //       } else {
    //         this.isPassword == true
    //       }
    //       console.log('登录获取用户信息resssssss',res.data.isPassword);
    //       // this.balance = res.data.accountDto.miCoin.balance
    //     })
    //   },
    //登录弹框埋点
    loginEventTanck(item) {
      let eventTrackParams = {};
      eventTrackParams = {
        item_id: "logon_pop_click",
        page_id: "longon",
        btn: item,
      };
      eventTrack.reportData(eventTrackParams);
    },
  },
  mounted() {
    // this.getHomeUserInfo ()
  },
  watch: {
    mobile(val) {
      switch (true) {
        case val.length === 0:
          this.showMessage = "right";
          break;
        case val.length > 11:
          this.mobile = val.slice(0, 11);
          break;
        case val.length === 11:
          if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
            this.showMessage = "inputErr";
            this.errorMessage = "请输入正确的手机号";
          } else {
            this.showMessage = "right";
          }
          break;
        // default:
        //   如果表达式的值和以上的case后面的值都没有匹配上，那么就执行这里的代码。
        //   break;
      }
    },
    code(val) {
      if (val.length === 4) {
        this.showMessage = "right";
      } else {
        if (val.length > 4) {
          this.showMessage = "inputErr";
          this.errorMessage = "请输入正确的验证码";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/_var.scss";
.loginBtn {
  width: 320px;
  height: 48px;
  margin-top: 50px;
  margin: 0 auto;
  display: block;
  background: $color-main;
  border-radius: 24px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.login-tip-content {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .login-tip-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 65px;
  }
}
.login-pop {
  ::v-deep.el-dialog {
    border-radius: 10px;
    height: auto !important;
  }
  ::v-deep.el-dialog__header {
    margin-top: 11px;
    display: block;
    text-align: center;
    margin: 0 auto;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  ::v-deep.el-dialog__body {
    padding: 0px 20px 20px 20px;
  }
  ::v-deep.el-checkbox {
    border-radius: 10px;
  }
  ::v-deep.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #606266;
  }
  .login-pop-content {
    padding: 0px 20px 0px 20px;
    .errorMessage {
      color: rgba(255, 61, 48, 1);
      line-height: 20px;
      height: 20px;
      font-size: 14px;
    }
    .loginMobile {
      border-bottom: 1px solid rgba(242, 242, 242, 1);
      border-left: 0px solid rgba(242, 242, 242, 1);
      border-right: 0px solid rgba(242, 242, 242, 1);
      border-top: 0px solid rgba(242, 242, 242, 1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .loginInput{
        border: none;
        outline: none;
        text-align: left;
        font-size: 16px;
        line-height: 14px;
        padding: 0 18px;
        color: rgba(74, 74, 74, 1);
        height: 40px;
      }
    }
  }
  .toast {
    padding: 10px 25px 10px 25px;
    background: rgba(0, 0, 0, 0.5);
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

.passwordenter {
  width: 96px;
  height: 33px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
  margin-left: 45px;
  cursor: pointer;
}

.quickenter {
  width: 96px;
  height: 33px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
  margin-left: 82px;
  cursor: pointer;
}

.blueone {
  width: 68px;
  height: 3px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 9.6%;
}

.bluetow {
  width: 68px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 3px;
  margin-left: 46.8%;
}

.divider {
  width: 480px;
  height: 1px;
  background: rgba(216, 216, 216, 1);
  margin: auto;
}

.Divider {
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 30px;
}

.team {
  height: 25px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 25px;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.noremeber {
  width: 90px;
  height: 25px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 25px;
  margin-top: -32px;
  cursor: pointer;
  z-index: 2;
}

.backpassword {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 35px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-bottom: 6px;
  cursor: pointer;
}

.Backpassword {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 24px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 67px;
}

.error {
  width: 362px;
  height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(249, 52, 52, 1);
  line-height: 40px;
  margin-left: 19px;
}

</style>
