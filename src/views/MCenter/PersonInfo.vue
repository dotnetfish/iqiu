<!--Created by fly on 2019/12/25-->
<template>
  <section>
    <div class="bind-mobile info-wrap">

      <h3>个人资料</h3>
      <div class="userinfo-wrap">
        <div class="avatar-info">
          <div class="title">头像</div>
          <cropper @updataImg="updataImg">
            <img :src="squareUrl" alt="logo"
                 style="width:120px;height:120px;border-radius: 50%">
          </cropper>
        </div>
        <div class="name-info">
          <div class="title">姓名</div>
          <el-input v-model="userName" size="medium" minlength="5" class="name-input" placeholder="请输入"></el-input>
        </div>
        <div class="name-info">
          <div class="title">积分</div>
          <div class="blod"> {{ credit }}</div>

        </div>
        <el-button type="primary" size="small" class="userinfo-btn" @click="save">提交</el-button>
      </div>
      <h3 style="margin-top:40px;">账号管理</h3>
      <section class="accout-wrap">
        <div class="mobile-wrap">
          <img src="@/assets/img/Mcenter-mobile.png" style="width:46px;height:60px;">
          <div class="content">
            <p v-if="!!phone">手机已绑定 <span>({{ phone }})</span></p>
            <p v-else>手机未绑定</p>
            <p>手机绑定可以享受手机相关的安全与提醒服务</p>
          </div>
          <el-button type="primary" size="small" round @click="handleBindMobile" :disabled="!!phone">{{
            !!phone?'已绑定':'绑定手机号' }}
          </el-button>

        </div>
        <div class="mobile-wrap">
          <img src="@/assets/img/Mcenter-play.png" style="width:58px;height:42px;">
          <div class="content">
            <p>我要开播</p>
            <p>丰富奖励，成为主播</p>
          </div>
          <el-button type="primary" size="small" round @click="$emit('AnchorApply','3')" :disabled="!!isAnchor">{{
            !!isAnchor?'已是主播':'成为主播' }}
          </el-button>
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

  </section>

</template>

<script>
  import { Row, Col, Button, Avatar, Card, Input, Message } from 'element-ui';

  import { updateUser, usersLoginInfo } from "@/api/mcenterapi";
  import Cropper from '@/components/MCenter/Cropper.vue';

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
      Cropper
    },
    data() {
      return {
        input: "",
        isAnchor: false,

        squareUrl: '',
        userName: '',
        uid: '',
        phone: '',
        wechat: '',
        credit: 0,
      };
    },
    computed: {
      userStatus: {
        get() {
          console.log('home-nav-user检测到登录状态改变', this.$store.state.userStatus)
          return this.$store.state.userStatus
        },
        set(val) {
          this.$store.commit('updateUserStatus', val)
        }
      },
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    methods: {
      handlePlay() {

      },
      editInfo() {
        this.$emit('showInfoEdit', 2);
      },
      showCostDetail() {
        this.$emit('showCostDetail', 3);
      },
      wallt() {
        this.$emit('showWalt', true);
      },
      handleBindMobile() {
        if (this.phone) {
          this.Message.success('您已绑定')
        } else {
          this.Message('12')
        }
      },
      usersLoginInfo() {
        usersLoginInfo().then((response) => {
          if (response.code === 0) {
            this.squareUrl = response.data.avatarUrl;
            this.userName = response.data.uname;
            this.uid = response.data.id;
            this.phone = response.data.mobile;
            this.isAnchor = response.data.isAnchor;
            this.credit = response.data.credit;

            this.userStatus = {
              loginStatus: 'isLogin',
              userInfo: {
                avatarUrl: response.data.avatarUrl,
                uid: response.data.id,
                uname: response.data.uname,
                balance: response.data.balance
              }
            }
          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          });
      },
      save() {
        let data =
          {
            uname: this.userName
          };
        this.updateUser(data, '名字修改成功')
      },
      updataImg(url) {
        this.squareUrl = url;
        let data =
          {
            avatarUrl: url
          };
        this.updateUser(data, '头像上传成功')
      },
      updateUser(data, messages) {
        updateUser(data).then((response) => {
          if (response.code === 0) {
            this.usersLoginInfo()
            Message.success({
              message: messages,
            })
          } else {
            Message.error({
              message: response.error,
            })
          }
        })
          .catch(function (error) {
            // debugger
            Message.error({
              message: error.data.msg,
            })

          });
      },
    },
    mounted() {
      this.usersLoginInfo();
    }
  }
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
      border-color: #D9D9D9;
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
    color: #F9F9F9;
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
        background-color: #F0F0F0;
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
            color: $color-title3
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

      .avatar-info, .name-info {
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
        /*width: 149px;*/
        /*height: 50px;*/
        font-size: 16px;
      }
    }
  }

</style>
