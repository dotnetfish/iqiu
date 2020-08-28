<!--Created by fly on 2019/12/25-->
<template>
  <section>
    <div class="bind-mobile info-wrap" v-if="nopassword && repassword">
      <h3>个人资料</h3>
      <div class="userinfo-wrap">
        <div class="avatar-info">
          <div class="title">头像</div>
          <cropper @updataImg="updataImg">
            <img :src="squareUrl" alt="logo" style="width:120px;height:120px;border-radius: 50%" />
          </cropper>
        </div>
        <div class="name-info">
          <div class="title">姓名</div>
          <el-input
            v-model="userName"
            size="medium"
            minlength="5"
            class="name-input"
            placeholder="请输入"
          ></el-input>
        </div>
        <div class="name-info">
          <div class="title">积分</div>
          <div class="blod">{{ credit }}</div>
        </div>
        <el-button type="primary" size="small" class="userinfo-btn" @click="save">提交</el-button>
      </div>
      <h3 style="margin-top:40px;">账号管理</h3>
      <section class="accout-wrap">
        <div class="mobile-wrap">
          <img src="@/assets/img/Mcenter-mobile.png" style="width:46px;height:60px;" />
          <div class="content">
            <p v-if="!!phone">
              手机已绑定
              <span>({{ phone }})</span>
            </p>
            <p v-else>手机未绑定</p>
            <p>手机绑定可以享受手机相关的安全与提醒服务</p>
          </div>
          <el-button
            type="primary"
            size="small"
            round
            @click="handleBindMobile"
            :disabled="!!phone"
          >
            {{
            !!phone?'已绑定':'绑定手机号' }}
          </el-button>
        </div>
        <div class="mobile-wrap">
          <img src="@/assets/img/Mcenter-play.png" style="width:58px;height:42px;" />
          <div class="content">
            <p>我要开播</p>
            <p>丰富奖励，成为主播</p>
          </div>
          <el-button
            type="primary"
            size="small"
            round
            @click="$emit('AnchorApply','3')"
            :disabled="!!isAnchor"
          >
            {{
            !!isAnchor?'已是主播':'成为主播' }}
          </el-button>
        </div>
      </section>

      <!-- 密码设置及修改 -->
      <section class="accout-wrap" style="margin-top:26px">
        <div class="mobile-wrap">
          <img src="@/assets/img/Mcenter-mobile.png" style="width:46px;height:60px;" />
          <div class="content">
            <p>密码设置</p>
            <p>设置登录密码更多登录方式</p>
          </div>
          <el-button type="primary" size="small" round @click="password()" v-if="isPassword==0" class="setpassword1">设置密码</el-button>
          <el-button type="primary" size="small" round @click="password()" v-if="isPassword==1" disabled= true>已设置</el-button>
        </div>
        <div class="mobile-wrap">
          <img src="@/assets/img/Mcenter-play.png" style="width:58px;height:42px;" />
          <div class="content">
            <p>修改密码</p>
            <p>设置登录密码更多登录方式</p>
          </div>
          <el-button type="primary" size="small" round @click="passwords()" v-if="isPassword==1" class="setpassword1">修改密码</el-button>
          <el-button type="primary" size="small" round @click="passwords()" v-if="isPassword==0" disabled= true>修改密码</el-button>
        </div>
      </section>
    </div>

    <!--    <div class="info-wrap">-->
    <!--      <div class="info">-->
    <!--        <div class="fl info-logo">-->
    <!--          <el-avatar :size="120" fit="contain" :src="squareUrl" style="background-color: transparent">-->
    <!--            <img src="@/assets/img/user-avatar-default.png"/>-->
    <!--          </el-avatar>-->
    <!--        </div>-->
    <!--        <div class="fl info-text">-->
    <!--          <section>-->
    <!--            <div class="name-wrap">-->
    <!--              <span class="info-name">{{userName}}</span>-->
    <!--              <img src="@/assets/img/Mcenter-person-add.png" class="info-add" alt="" @click="editInfo">-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              UID: <span>{{uid}}</span>-->
    <!--            </div>-->
    <!--            <div class="info-mili">-->
    <!--              <img src="@/assets/img/Mcenter-mili.png" style="width:20px;height: 20px;">-->
    <!--              <span class="ml5">{{mili}}</span>-->
    <!--              <el-button type="primary" class="recharge" @click="wallt">充值-->
    <!--              </el-button>-->
    <!--              <el-button type="text" size="mini" class="record" @click="showCostDetail">充值记录-->
    <!--              </el-button>-->
    <!--            </div>-->
    <!--          </section>-->
    <!--          <el-button type="primary" class="broadcast" @click="$emit('AnchorApply','3')"><span><img src="@/assets/img/Mcenter-play-icon.png"-->
    <!--                                                                                style="display: inline-block;width: 24px;hehght:24px;margin-right:10px">我要开播</span>-->
    <!--          </el-button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="bind-mobile info-wrap" v-if="nopassword == false">
      <div style="display:flex">
        <div
          style="width:22px;height:22px;margin-top:4.5px;margin-right:11px;cursor:pointer;"
          @click="back()"
        >
          <img src="@/assets/back.png" style="width:22px;height:22px;" />
        </div>
        <div class="setpass">设置密码</div>
      </div>
      <div style="margin-top:60px">
        <div style="display:flex;">
          <span class="password">密码</span>
          <el-input v-model="Password" style="width:355px" show-password></el-input>
          <span class="error" v-if="flag1">大写字母、小写字母、数字和标点符号至少包含2种且长度在8-16</span>
        </div>
        <div style="display:flex;margin-top:40px;">
          <span class="confirm-password">确认密码</span>
          <el-input style="width:355px" v-model="Password2" show-password></el-input>
          <span class="error" v-if="flag2">密码不一致</span>
        </div>
        <el-button @click="submit()" class="submit">提交</el-button>
      </div>
    </div>
    <div class="bind-mobile info-wrap" v-if="repassword == false">
      <div style="display:flex">
        <div
          style="width:22px;height:22px;margin-top:4.5px;margin-right:11px;cursor:pointer;"
          @click="back()"
        >
          <img src="@/assets/back.png" style="width:22px;height:22px;" />
        </div>
        <div class="setpass">修改密码</div>
      </div>
      <div style="margin-top:60px">
        <div style="display:flex;">
          <span class="updatepassword">旧密码</span>
          <el-input v-model="oldPassword" style="width:355px" show-password></el-input>
        </div>
        <div style="display:flex;margin-top:40px;">
          <span class="updatepassword">新密码</span>
          <el-input v-model="newPassword" style="width:355px" show-password></el-input>
          <span class="error" v-if="Flag1">大写字母、小写字母、数字和标点符号至少包含2种且长度在8-16</span>
        </div>
        <div style="display:flex;margin-top:40px;">
          <span class="confirm-updatepassword">确认密码</span>
          <el-input style="width:355px" v-model="newPassword2" show-password></el-input>
          <span class="error" v-if="Flag2">密码不一致</span>
        </div>
        <el-button @click="submitupdate()" class="submit">提交</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { Row, Col, Button, Avatar, Card, Input, Message } from "element-ui";
import { setPassword, updatePassword } from "@/api/api";

import { updateUser, usersLoginInfo } from "@/api/mcenterapi";
import Cropper from "@/components/MCenter/Cropper.vue";
import { loginInfo } from "@/api/liveroom";

export default {
  name: "PersonInfo",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Button.name]: Button,
    [Avatar.name]: Avatar,
    [Card.name]: Card,
    [Message.name]: Message,
    Cropper,
  },
  data() {
    return {
      input: "",
      isAnchor: false,
      isPassword: '',
      squareUrl: "",
      userName: "",
      uid: "",
      phone: "",
      wechat: "",
      credit: 0,
      nopassword: true,
      repassword: true,
      Password: "",
      Password2: "",
      flag1: false,
      flag2: false,
      Flag1: false,
      Flag2: false,
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    };
  },
  computed: {
    userStatus: {
      get() {
        console.log(
          "home-nav-user检测到登录状态改变",
          this.$store.state.userStatus
        );
        return this.$store.state.userStatus;
      },
      set(val) {
        this.$store.commit("updateUserStatus", val);
      },
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    handlePlay() {},
    editInfo() {
      this.$emit("showInfoEdit", 2);
    },
    showCostDetail() {
      this.$emit("showCostDetail", 3);
    },
    wallt() {
      this.$emit("showWalt", true);
    },
    handleBindMobile() {
      if (this.phone) {
        this.Message.success("您已绑定");
      } else {
        this.Message("12");
      }
    },
    password() {
      // this.$router.push({ path: '/' })
      this.nopassword = false;
    },
    passwords() {
      this.repassword = false;
    },
    submit() {
      var FloatRegex = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/;
      if (!FloatRegex.test(this.Password)) {
        this.flag1 = true;
      } else {
        this.flag1 = false;
      }
      if (this.Password != this.Password2) {
        this.flag2 = true;
      } else {
        this.flag2 = false;
      }
      if (this.flag1 == false && this.flag2 == false) {
        this.getsetPassword();
      }
      console.log(this.Password);
    },
    submitupdate() {
      var FloatRegex = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/;
      if (!FloatRegex.test(this.newPassword)) {
        this.Flag1 = true;
      } else {
        this.Flag1 = false;
      }
      if (this.newPassword != this.newPassword2) {
        this.Flag2 = true;
      } else {
        this.Flag2 = false;
      }
      if (this.Flag1 == false && this.Flag2 == false) {
        this.getupdatePassword();
      }
      console.log(this.Password);
    },
    back() {
      this.nopassword = true;
      this.repassword = true;
    },
    //修改密码
    getupdatePassword() {
      let data = {
        password: this.oldPassword,
        newPassword: this.newPassword,
      };
      updatePassword(data).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
        if (res.msg != "旧密码错误") {
          this.repassword = true;
        }
      });
    },
    //设置密码
    getsetPassword() {
      let data = {
        password: this.Password,
      };
      setPassword(data).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
        if (res.msg == "success") {
          this.nopassword = true;
        }
      });
    },
    usersLoginInfo() {
      usersLoginInfo()
        .then((response) => {
          if (response.code === 0) {
            this.squareUrl = response.data.avatarUrl;
            this.userName = response.data.uname;
            this.uid = response.data.id;
            this.phone = response.data.mobile;
            this.isAnchor = response.data.isAnchor;
            this.credit = response.data.credit;

            this.userStatus = {
              loginStatus: "isLogin",
              userInfo: {
                avatarUrl: response.data.avatarUrl,
                uid: response.data.id,
                uname: response.data.uname,
                balance: response.data.balance,
              },
            };
          } else {
            console.error(response.error);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getHomeUserInfo () {
        loginInfo().then(res => {
          this.isPassword = res.data.isPassword
          // this.balance = res.data.accountDto.miCoin.balance
        })
      },
    save() {
      let data = {
        uname: this.userName,
      };
      this.updateUser(data, "名字修改成功");
    },
    updataImg(url) {
      this.squareUrl = url;
      let data = {
        avatarUrl: url,
      };
      this.updateUser(data, "头像上传成功");
    },
    updateUser(data, messages) {
      updateUser(data)
        .then((response) => {
          if (response.code === 0) {
            this.usersLoginInfo();
            Message.success({
              message: messages,
            });
          } else {
            Message.error({
              message: response.error,
            });
          }
        })
        .catch(function (error) {
          // debugger
          Message.error({
            message: error.data.msg,
          });
        });
    },
  },
  mounted() {
    this.usersLoginInfo();
    this.getHomeUserInfo()
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/_index.scss";

.ml5 {
  margin-left: 5px;
}

.fl {
  float: left;
}

.info-wrap {
  background-color: #fff;
  border-radius: 0px;

  ::v-deep .el-divider--horizontal {
    width: auto;
    padding: 30px auto 20px;
    border-color: #d9d9d9;
  }
}

.info {
  padding: 30px;
  height: 180px;
  box-sizing: border-box;
}

.info-text {
  box-sizing: border-box;
  width: calc(100% - 130px);
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name-wrap {
    margin-top: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .info-name {
    margin-right: 10px;
    line-height: 33px;
    color: $color-title1;
    font-size: 20px;
    @extend .bold;
  }

  .info-add {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
}

.info-mili {
  margin-top: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 12px;
  color: $color-title2;
}

.recharge {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 24px;
  padding: 0;
  margin-left: 20px;

  font-size: 12px;
  color: #f9f9f9;
}

.record {
  font-size: 12px;
}

.broadcast {
  width: 180px;
  padding: 0;
  height: 60px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.bind-mobile {
  padding: 30px 30px 200px;
  line-height: 1;

  h3 {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 600;
    color: $color-title1;
  }

  .accout-wrap {
    display: flex;
    justify-content: space-between;

    .mobile-wrap {
      width: 438px;
      height: 140px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 20px;
      padding-right: 8px;
      background-color: #f0f0f0;
      box-sizing: border-box;

      img {
        width: 35px;
        height: 35px;
        margin-right: 2px;
      }

      .content {
        margin-left: 10px;
        flex: 1;
        font-size: 12px;
        line-height: 17px;

        p:nth-child(1) {
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 700;
          color: #333;
          line-height: 20px;
        }

        span {
          font-size: 12px;
          color: $color-title3;
        }
      }

      .btn-bind {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        width: 102px;
        height: 30px;

        font-size: 14px;
      }
    }
  }

  .userinfo-wrap {
    padding-bottom: 40px;
    border-bottom: 1px solid $color-border;

    .avatar-info,
    .name-info {
      margin-bottom: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .title {
        width: 102px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: #666;
      }

      .name-input {
        width: 460px;
        /*height: 52px;*/
        ::v-deep .el-input__inner {
          height: 52px;
          line-height: 52px;
        }
      }
    }

    .userinfo-btn {
      margin-left: 102px;
      width: 149px;
      /*height: 50px;*/
      font-size: 16px;
    }
  }
}

.setpass {
  width: 96px;
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}

.password {
  width: 45px;
  height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
  justify-content: flex-end;
  display: flex;
  margin-left: 91px;
  margin-right: 19px;
}
.updatepassword {
  width: 60px;
  height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
  justify-content: flex-end;
  display: flex;
  margin-left: 91px;
  margin-right: 19px;
}
.confirm-password {
  width: 89px;
  height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
  justify-content: flex-end;
  display: flex;
  margin-left: 47px;
  margin-right: 19px;
}
.confirm-updatepassword {
  width: 89px;
  height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
  justify-content: flex-end;
  display: flex;
  margin-left: 62px;
  margin-right: 19px;
}
.error {
  width: 362px;
  height: 40px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(249, 52, 52, 1);
  line-height: 40px;
  margin-left: 19px;
}
.submit {
  margin-left: 201px;
  margin-top: 69px;
  width: 199px;
  height: 50px;
  border-radius: 4px;
  background: rgba(27, 181, 236, 1);
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  cursor: pointer;
}

.setpassword {
  border: #1BB5EC solid 2px;
  background-color: rgba(240,240,240,1);
  border-radius:20px;
  color:rgba(51,51,51,1);
}
</style>
