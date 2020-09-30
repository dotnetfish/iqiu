<template>
  <div class="follow-content">
    <!--已登录-未关注主播/未登录-->
    <el-popover placement="bottom" width="320" title="我的关注" trigger="hover"
                v-if="userStatus.loginStatus === 'notLogin' ">
      <div class="notFollow-tip">
        <!--          <img src="@/assets/home/expression_cry@3x.png" style="width:100px;height:100px;">-->
        <p>您还未关注主播,<a class="notFollow-tip-text">快去看看吧~</a></p>
      </div>
      <!--导航栏显示-未登录-->
      <div class="nav-icon" slot="reference" @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)">
        <!--          <img :src="followUrl" style="width:14px;height:14px;">-->
        关注
      </div>
    </el-popover>
    <!--已登录-关注列表-->
    <el-popover placement="bottom" :title="myFollowTitle" width="310" trigger="hover"
                v-if="userStatus.loginStatus === 'isLogin'">
      <div class="login-follow-list" v-if="num !== 0">
        <div class="login-follow-row" v-for="(item,index) in onlineChannels" :key=index @click="toLiveRoom(item.cid)">
          <!-- <img :src="item.avatarUrl" > -->
          <div class="row-avatar">
            <el-avatar size="large" :src="item.avatarUrl" fit="scale-down" style="width:58px;height:58px;"></el-avatar>
          </div>
          <div class="row-title">
            <p class="row-title-name">{{item.uname | nameFilter}}</p>
            <p class="row-title-uname">{{item.typeName}}</p>
          </div>
          <div class="row-hot">
            <!--              <div class="row-hot-hot">-->
            <!--                <img src="../../assets/home/huo@2x.png" style="width:18px;height:20px;">-->
            <!--                <p class="row-title-onLineScore">{{item.score}}</P>-->
            <!--              </div>-->
            <p class="row-title-uname color-red">Live</p>
          </div>
        </div>
        <el-button v-show="onlineChannels.length>2" type="primary" style="width:320px;height:48px;border-radius:24px;"
                   @click="junmpToFollow()">查看更多
        </el-button>
      </div>
      <div class="notFollow-tip" v-if="num === 0">
        <!--          <img src="@/assets/home/expression_sleep@3x.png" style="width:116px;height:117px;">-->
        <p>主播不在家,<a class="notFollow-tip-text">快去看看别的直播吧~</a></p>
      </div>
      <!--导航栏显示-已登录-->
      <div class="nav-icon " slot="reference" @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)">
        <!--            <img :src="followUrl" style="width:14px;height:14px;">-->
        关注 <span class="follower" v-if="num > 0">{{ num }}</span>
      </div>
    </el-popover>
  </div>
</template>
<script>
  import { Button, Popover, divider, Col, avatar } from 'element-ui';
  import { attentionGetFollowAnchors } from "@/api/api";

  export default {
    name: 'home-nav-follow',
    components: {
      [Button.name]: Button,
      [Popover.name]: Popover,
      [divider.name]: divider,
      [Col.name]: Col,
      [avatar.name]: avatar,
    },
    data() {
      return {
        num: 0,
        onlineChannels: [
          // {
          //   userDto:{
          //     avatarUrl:'',
          //     uname:'sss',
          //   },
          //   channelCoverDto:{
          //      uname:'sss',
          //       name:'ss',
          //       onLineScore:'sdcsc',
          //      typeName:'sdfs',
          //   }
          // },
          //  {
          //   userDto:{
          //     avatarUrl:'',
          //     uname:'sss33',
          //   },
          //   channelCoverDto:{

          //       name:'ss1111111111111111111111111111111111',
          //       onLineScore:'sdcsc',
          //      typeName:'sdfs',
          //   }
          // },
        ],
        followUrl: require('@/assets/home/follow@2x.png')
      }
    },
    computed: {
      userStatus() {
        console.log('检测到登录状态改变', this.$store.state.userStatus)
        return this.$store.state.userStatus
      },
      isLogin() {
        return this.$store.getters.isLogin
      },
      myFollowTitle() {
        return "我关注的主播有" + this.num + "人在直播"
      }
    },
    created() {
    },
    methods: {
      // 切换导航栏图片
      changeImageSrc() {
        // if(index === 1){
        //   this.followUrl = require('@/assets/home/follow_blue@2x.png')
        // } else {
        //   this.followUrl = require('@/assets/home/follow@2x.png')
        // }
      },
      junmpToFollow() {
        this.$router.push({ name: 'FollowList' })
      },
      openLoginDialog() {
        this.$store.state.openLoginDialog = true
      },
      // 查询用户信息
      getFellowList() {
        attentionGetFollowAnchors({}, {}).then(res => {
          this.num = res.data.onlineChannels.length;
          if (res.data.onlineChannels.length <= 6) {
            this.onlineChannels = res.data.onlineChannels;
          } else {
            for (let i = 0; i < 6; i++) {
              this.onlineChannels.push(res.data.onlineChannels[i]);
            }
          }
        }).catch(e => {
          console.error(e);
        })
      },
      // 跳转直播间
      toLiveRoom(cid, item) {
        console.log('组件-埋点测试-', item)
        // this.$router.push({ path: '/Liveroom', query: { cid: cid } })
        const { href } = this.$router.resolve(cid, '/')
        window.open(href, "_blank");
        this.trackPassToParent(item);
      },
    },
    mounted() {
      if (this.isLogin) {
        this.getFellowList()
      }
    },
    watch: {},
    filters: {
      nameFilter: function (value) {
        if (!value) return ''
        if (value.length > 15) {
          return value.slice(0, 7)
        } else {
          return value
        }

      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/css/_var.scss";

  .el-popover {
    border-radius: 8px;
    border: 5px solid $color-main;
    border-width: 5px 0px 0px 0px;
  }

  .el-popover__title {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
</style>
<style lang="scss" scoped>
  @import "@/assets/css/_var.scss";

  .notFollow-tip {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    color: rgba(153, 153, 153, 1);

    .notFollow-tip-text {
      color: #F9772A;
    }
  }

  .nav-icon {
    position: relative;
    padding-right: 25px;
    width: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    .follower {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      height: 8px;
      position: absolute;
      top: 10px;
      left: 30px;
      border-radius: 20px;
      background-color: $color-red-envelope;
      color: #fff;
      font-size: 14px;
    }
  }

  .nav-icon:hover {
    color: #F9772A;
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

  .login-follow-list {
    width: 100%;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    cursor: pointer;

    .login-follow-row {
      width: 310px;
      height: 70px;
      background: rgba(255, 255, 255, 1);
      margin: 0px 0px 10px 0px;
      padding: 2px 0px 2px 0px;
      /*box-shadow: 0px 1px 1.5px 0px rgba(0,0,0,0.21);*/
      border-radius: 2px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .row-avatar {
        width: 66px;
        height: 66px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .row-title {
        width: 192px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding-left: 10px;

        .row-title-name {
          height: 30px;
          font-size: 16px;
          color: $color-main;
          line-height: 30px;
        }
      }

      .row-hot {
        width: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .row-hot-hot {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;

          .row-title-onLineScore {
            border-radius: 2px;
            height: 30px;
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
          }
        }
      }
    }

    .login-follow-row:hover {
      background: rgba(233, 234, 236, 1);
    }
  }

  .login-pop {
    .signOut {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    .user {
      width: 300px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .user-logo {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 80%;
          height: 80%;
          border-radius: 50%;
        }
      }

      .user-info {
        height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        margin-left: 5px;

        .user-info-name {
          font-weight: 500;
          color: rgba(74, 74, 74, 1);
          font-size: 15px;
          line-height: 20px;
        }

        .user-info-id {
          font-weight: 400;
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
      }
    }
  }
</style>
