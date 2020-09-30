<template>
  <div class="live-header">
    <img class="header-logo" :src="channelInfo.avatarUrl" alt />
    <div class="header-content">
      <h3 class="title">
        {{ channelInfo.name }}
        <router-link
          target="_blank"
          class="label"
          v-show="channelInfo.typeName"
          :to="{ path: '/zhibo', query: { 'typeId': channelInfo.type || 'all', name: channelInfo.typeName }}"
        >{{ channelInfo.typeName }}</router-link>
      </h3>
      <div class="label-wrap">
        <span>主播：{{ channelInfo.uname }}</span>
        <span style="margin-left: 40px">房间号：{{ channelInfo.id }}</span>
        <i class="icon icon2"></i>
        <span>{{ channelInfo.onlinescore }}</span>
      </div>
    </div>
    <div class="shareall">
      <el-popover placement="bottom-start" width="410" trigger="hover">
        <div class="text">老铁分享一个呗~</div>
        <div class="sharearea">
          <div class="share1" @click="share('qq')">
            <img src="@/assets/share/qq.png" alt />
          </div>
          <div class="share1" @click="share('qzone')">
            <img src="@/assets/share/kongjian.png" alt />
          </div>
          <div class="share1" @click="share('weibo')">
            <img src="@/assets/share/xinlang.png" alt />
          </div>
          <div class="share" @click="share('weixin')" ref="qrCodeUrl" style="width:100px">微信扫码分享</div>
        </div>
        <div class="pc-m">
          <button class="pc" @click="changepc()" ref="pc">直播间地址</button>
          <button class="m" @click="changem()">H5外链播放器</button>
        </div>
        <div class="urlarea" v-if="flag==1">
          <el-input v-model="sharearea" class="inputurl"></el-input>
          <button class="copyurl" v-clipboard:copy="area">复制链接</button>
        </div>
        <div class="urlarea" v-if="flag==2">
          <el-input v-model="shareaream" class="inputurl"></el-input>
          <button class="copyurl" v-clipboard:copy="aream">复制链接</button>
        </div>
        <button
          slot="reference"
          class="share-button"
          @mouseenter="blueshare(1)"
          @mouseleave="blueshare(2)"
        >
          <img src="@/assets/share/share1.png" style="width:55px;height:17px" v-if="show==true">
          <img src="@/assets/share/share2.png" style="width:55px;height:17px" v-if="show==false">
        </button>
      </el-popover>
    </div>

    <div class="header-like">
      <div class="count">{{ channelInfo.followCount }}</div>
      <div class="like" :class="{'follow': follow}" @click.stop="handleLike">
        <!--        <i :class="{'follow': follow}"></i>-->
        {{follow?
        '已关注':'关注'}}
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Popover, Input } from "element-ui";
import { attentionAnchor, attentionCancelAnchor } from "@/api/liveroom";
import { throttle } from "@/utils/debounceAndthrottle";
import QRCode from "qrcodejs2";
import { newTaskAdd,dayTaskAdd } from "@/api/api";

export default {
  name: "LiveroomHeader",
  components: {
    [Button.name]: Button,
    [Popover.name]: Popover,
    [Input.name]: Input,
  },
  data() {
    return {
      sharearea: "",
      shareaream: "",
      area: "",
      flag: 1,
      aream: "",
      show:true,
    };
  },
  props: {
    channelInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    follow: {
      type: Boolean,
      defalut: false,
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {
    channelInfo(a) {
      console.log("watch");
      console.log(a);
    },
  },
  mounted() {
    setTimeout(() => {
      this.creatQrCode();
    }, 1000);
    // console.log("899898898989889==",this.channelInfo.id);
  },
  methods: {
    changepc() {
      this.flag = 1;
    },
    changem() {
      this.flag = 2;
    },
    getnewTaskAdd(type) {
      let data = {
          type:4
        }
      newTaskAdd(data).then((res) => {
      });
      this.getdayTaskAdd(type)
    },
    getdayTaskAdd(type) {
      let data = {
          type:2
        }
      dayTaskAdd(data).then((res) => {
      });
      if (type == "qq") {
        window.open(
          "http://connect.qq.com/widget/shareqq/index.html?url=" +
            "http://www.iqiulive.cn/" +
            this.channelInfo.id +
            "?sharesource=qzone&title=" +
            this.channelInfo.name +
            "&pics=https://static.iqiulive.cn/aiqiu-prod/pc/dist/img/logo_big@2x_o.55bd6cbc.png&summary=" +
            this.channelInfo.uname +
            "开播啦,快来看啊"
        );
      } else if (type == "qzone") {
        window.open(
          "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
            "http://www.iqiulive.cn/" +
            this.channelInfo.id +
            "?sharesource=qzone&title=" +
            this.channelInfo.name +
            "&pics=https://static.iqiulive.cn/aiqiu-prod/pc/dist/img/logo_big@2x_o.55bd6cbc.png&summary=" +
            this.channelInfo.uname +
            "开播啦,快来看啊"
        );
      } else if (type == "weibo") {
        window.open(
          "http://service.weibo.com/share/share.php?url=" +
            "http://www.iqiulive.cn/" +
            this.channelInfo.id +
            "?sharesource=" +
            this.channelInfo.uname +
            "开播啦,快来看啊" +
            "&title=" +
            this.channelInfo.name +
            "&pic=https://static.iqiulive.cn/aiqiu-prod/pc/dist/img/logo_big@2x_o.55bd6cbc.png&appkey=微博平台申请的key"
        );
      }
    },
    //复制链接
    // onCopy() {
    //   this.$message({
    //     message: `复制成功！`,
    //     type: "success",
    //   });
    //   this.snackBar.info(this.$t("prompt.copySuccess"));
    // },
    // onError() {
    //   this.$message.error(this.$t("prompt.copyFail"));
    // },

    blueshare(index) {
      if (index === 1) {
        // this.$refs.blue.style.color = "rgb(27, 181, 236)";
        // this.$refs.blue.style.border = "rgb(27, 181, 236) solid 1px";
        this.show = !this.show;
        this.sharearea = "http://www.iqiulive.cn/" + this.channelInfo.id;
        this.shareaream = "http://m.iqiulive.cn/" + this.channelInfo.id;
        console.log(this.show);
      } else {
        this.show = !this.show;
        // this.$refs.blue.style.color = "rgb(0, 0, 0)";
        // this.$refs.blue.style.border = "rgb(190, 190, 190) solid 1px";
      }
    },
    //二维码
    creatQrCode() {
      this.area = "http://www.iqiulive.cn/" + this.channelInfo.id;
      this.aream = "http://m.iqiulive.cn/" + this.channelInfo.id;
      let that = this;
      // console.log(595986);
      console.log("channelInfo",that.channelInfo);
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        // eslint-disable-line no-unused-vars
        text: "http://m.iqiulive.cn/" + that.channelInfo.id, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    //分享
    share(type) {
      // console.log(encodeURIComponent(document.location))
      // let i = require('https://rpic.douyucdn.cn/asrpic/200716/48699_1730.png/dy1')
      console.log(597777776);
      console.log(this.channelInfo.id);
      this.getnewTaskAdd(type)
      // else{
      //   var url = 'http://www.iqiulive.cn/'+this.channelInfo.id;
      //         // encodePath = encodeURIComponent(url),
      //         // targetUrl = 'http://qr.liantu.com/api.php?text=' + encodePath;
      //     //  window.open(url,'weixin', 'height=320, width=320')
      // }
      // window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+this.sum+'&pics=图片地址&summary= 嗯嗯')
      // window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(document.location) + '?sharesource=qzone&title=' + sum + '&pics=' +  + '&summary=' + '');
      // window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content'))
    },
    handleLike: throttle(function () {
      console.log("like click");
      if (!this.isLogin) {
        return this.$emit("login");
      } else if (this.follow) {
        return attentionCancelAnchor({ cid: this.channelInfo.id }).then(
          (res) => {
            console.log(res);
            this.$emit("update:follow", false);
            // this.$emit('updateChannelInfo')
            --this.channelInfo.followCount;
          }
        );
      } else if (!this.follow) {
        return attentionAnchor({
          cid: this.channelInfo.id,
          channel: "PC_SITE",
        }).then((res) => {
          console.log(res);
          this.$emit("update:follow", true);
          // this.$emit('updateChannelInfo')
          ++this.channelInfo.followCount;
        });
      }
    }, 1000),
    // handleJump(roomId) {
    //   // 跳转页面
    //   const { href } = this.$router.resolve(`/${ roomId }`)
    //   window.open(href, "_blank");
    // }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/_index.scss";

.live-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 97px;
  background-color: #fff;
  border-radius: 10px 10px 0px 0px;

  .header-logo {
    flex: 0 0 auto;
    padding: 0 20px;
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }

  .header-content {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50px;
    font-size: 14px;
    color: $color-title2;

    .title {
      margin: 0;
      padding: 0 0 4px;
      /*width: 250px;*/
      font-size: 20px;
      color: $color-title1;
      @include ellipsis;
      .label {
        margin-left: 10px;
        padding: 1px 15px;
        font-size: 14px;
        line-height: 1;
        border-radius: 24px;
        color: #F9772A;
        background-color: #fff;
        border: 1px solid #F9772A;
      }
    }

    .label-wrap {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .label {
        color: $color-main;
        cursor: pointer;
      }

      .icon {
        margin-left: 20px;
        margin-right: 7px;
        width: 12px;
        height: 12px;

        /*&:nth-of-type(1) {*/
        /*  margin-left: 0;*/
        /*}*/
      }

      @for $i from 0 through 2 {
        .icon#{$i} {
          background: url("~@/assets/img/live-header-icon" + $i + ".png")
            0
            0
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .header-like {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-top: 10px;
    width: 172px;
    height: 34px;

    border-radius: 4px;
    overflow: hidden;
    font-size: 14px;

    .count {
      flex-basis: 50%;
      height: 34px;
      line-height: 34px;
      background-color: $bg-tab;
      color: $color-title3;
      text-align: center;
      @include ellipsis;
    }

    .like {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-basis: 50%;
      height: 100%;
      color: #fff;
      background-color: #F9772A;
      cursor: pointer;

      &.follow {
        opacity: 0.7;

        i {
          background: url("~@/assets/img/live-header-like-o.png") 0 0 no-repeat;
          background-size: 100%;
        }
      }

      i {
        margin-right: 5px;
        width: 21px;
        height: 21px;
        background: url("~@/assets/img/live-header-like.png") 0 0 no-repeat;
        background-size: 100%;

        /*&.follow {*/
        /*opacity: .7;*/
        /*display: none;*/
        /*background: url('~@/assets/img/live-header-like-follow.png') 0 0 no-repeat;*/
        /*background-size: 100%;*/
        /*}*/
      }
    }
  }
}
.share {
  margin-top: 60px;
  margin-left: 54px;
  width: 70px;
  height: 70px;
}

.share1 {
  margin-top: 100px;
  margin-left: 10px;
  width: 70px;
  height: 70px;
}

.inputurl {
  width: 70%;
}

.pc-m {
  display: flex;
  width: 100%;
  height: 20px;
}

.pc {
  color: #fff;
  background-color: rgb(27, 181, 236);
  border: 0;
  outline-color: rgb(0, 162, 255);
  border-radius: 4px;
}

.m {
  color: #fff;
  background-color: rgb(27, 181, 236);
  border: 0;
  margin-left: 20px;
  outline-color: rgb(0, 162, 255);
  border-radius: 4px;
}

.urlarea {
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 10px;
}

.copyurl {
  color: #fff;
  background-color: rgb(27, 181, 236);
  border: 0;
  height: 39px;
  margin-left: 10px;
  width: 20%;
  outline-color: rgb(0, 162, 255);
  border-radius: 4px;
}

.share-button {
  width: 86px;
  height: 34px;
  background-color: #fff;
  border: 0;
  border-radius: 6px;
  outline: 0;
}

.shareall {
  // margin-top: 20px;
  margin-right: 10px;
  margin-top: 9px;
  width: 100px;
  z-index: 5;
  // border: rgb(190, 190, 190) solid;
}
.sharearea {
  width: 410px;
  height: 220px;
  display: flex;
  margin-top: -30px;
}

.share-text {
  margin-top: 4px;
}

.text {
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}
</style>
