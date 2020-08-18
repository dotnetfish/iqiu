<template>
  <div class="live-gift" :class="{'hidden': hidden}" v-show="giftList.length>0">
    <div class="gift-count">
      <div class="my-count">
        我的积分:
        <span class="color-main">{{ userLogin.credit }}</span>
      </div>
      <div class="count-tip">
        每日登陆赠送
        <span class="color-main">200</span> 积分
      </div>
    </div>
    <div class="allall"> 
    <div>
      <el-button @click="leftmove()" class="leftmove">＜</el-button>
    </div>
    <div class="all-gift"> 
      <div class="gift-items" :style="{'right': xxx * 76 + 'px'}">
        <div
          class="gift-item"
          v-for="(item,index) in giftList"
          :key="index"
          @click.stop="handleSendGift(item,1)"
        >
          <!--              <el-input class="input" type="tel" v-model="gift.value" placeholder="0"></el-input>-->
          <el-popover
            popper-class="live-popper"
            placement="top-end"
            width="335"
            @hide="popverHide"
            @show="popverShow(index)"
            trigger="hover"
          >
            <div class="popper-content">
              <div class="popper-head">
                <img class="popper-head-logo" :src="item.imageUrl" alt />
                <div class="popper-head-wrap">
                  <div class="title-wrap">
                    <span class="title">{{ item.name }}</span>
                    <span class="count">（{{ item.price }}积分）</span>
                  </div>
                  <div class="popper-radios-wrap">
                    <span
                      class="popper-radio"
                      v-for="(item,index) in radioList"
                      :key="index"
                      :class="{'active': radioIndex === index}"
                      @click="handleRadio(index,item)"
                    >{{ item.value }}</span>
                  </div>
                </div>
              </div>
              <div class="popper-foot">
                <p class="count">我的积分：{{ userLogin.credit }}</p>
                <!--<input class="input" type="tel" v-model="gift.value">-->
                <!-- <el-input v-model="mydefined" placeholder="自定义" :value="mydefined" class="mydefined"></el-input> -->
                <el-button
                  class="poppper-btn"
                  :loading="sending"
                  @click.stop="handleSendGift(item, 1)"
                >赠送</el-button>
              </div>
            </div>

            <div class="item" slot="reference">
              <img class="logo" :src="item.imageUrl" alt />
              <div>{{ item.name }}</div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="rightmove">
      <el-button @click="rightmove()">＞</el-button>
    </div>
    </div>
    <!--    <div class="popper-switch" @click="handleSwitch">-->
    <!--      <i class="icon ion_down" :class="{'ion_up': hidden}"></i>-->
    <!--    </div>-->
    <!--TODO 全局用户信息 充值联调-->
    <!--    <div class="gift-tools">-->
    <!--      <i class="gift-tools-icon"></i>-->
    <!--      <span>米粒：{{ userLogin.id?userLogin.accountDto.miCoin.balance:0 }}</span>-->
    <!--      <el-button class="gift-btn" @click.stop="handlePay">充值</el-button>-->
    <!--    </div>-->
    <!--    <PersonWallt v-if="isLogin" ref="wallt" :is-dialog="true" @rechargeSuccess="$emit('sendGiftSuccess')"></PersonWallt>-->
  </div>
</template>

<script>
import { sendGift } from "@/api/liveroom";
import { Popover, Button, Input } from "element-ui";
import { throttle } from "@/utils/debounceAndthrottle";
// import PersonWallt from '@/components/MCenter/PersonWallt.vue';

export default {
  name: "LiveroomGift",
  data() {
    return {
      sending: false,
      xxx: 0,
      mydefined:0,
      hidden: true, // 展示全部礼物
      radioList: [
        {
          value: 1,
          desc: "十全十美",
        },
        // {
        //   value: 25,
        //   desc: "十全十美",
        // },
        // {
        //   value: 999,
        //   desc: "十全十美",
        // },
        // {
        //   value: 1314,
        //   desc: "十全十美",
        // },
      ],
      radioIndex: 0,
      gift: {
        value: 1,
      },
      payDialogVisible: false,
      tabBool: [false, true, false],
    };
  },
  components: {
    [Popover.name]: Popover,
    [Button.name]: Button,
    [Input.name]: Input,
    // PersonWallt
  },
  props: {
    userLogin: {
      type: Object,
      default: () => {
        return {};
      },
    },
    channelInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    giftList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    desc() {
      return this.radioList[this.radioIndex].desc;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  created() {},
  methods: {
    rightmove() {
      if (this.xxx < 5) {
        this.xxx += 1;
      }
    },
    leftmove() {
      if (this.xxx > 0) {
        this.xxx -= 1;
      }
    },
    handleSendGift: throttle(function (item, number) {
      if (!this.isLogin) return this.$emit("login");
      if (isNaN(this.gift.value) || !this.gift.value)
        return this.Message.error("请输入数字");
      this.sending = true;
      sendGift({
        uid: this.userLogin.id,
        sendFromType: 0, // 礼物来源: credit:0 package:1 coin:2
        platform: 2, //  礼物来源设备类型: ios:0 android:1 pc:2 msite:3
        giftId: item.id,
        number: number ? number : this.gift.value,
        receiveUid: this.channelInfo.id,
      })
        .then((res) => {
          this.sending = false;
          if (res.code == 0) {
            this.$emit("sendGiftSuccess", res.data);
          } else {
            this.Message.error(res.msg);
          }
          console.log(res);
        })
        .catch((err) => {
          if (err.data.msg) this.Message.error(err.data.msg);
          this.sending = false;
        });
    }, 1000),
    popverHide() {
      // this.radioIndex = 0;
      // this.gift.value = 10
    },
    handleRadio(index, item) {
      this.radioIndex = index;
      this.gift.value = item.value;
    },
    popverShow(index) {
      if (this.radioIndex == index) return;
      this.radioIndex = 0;
      this.gift.value = 1;
    },
    handleSwitch() {
      this.hidden = !this.hidden;
    },
    handlePay() {
      if (!this.isLogin) return this.$emit("login");
      this.$refs.wallt.show(true);
      // this.Message.error('未联调')
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/_index.scss";

.live-gift {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /*padding-top: 76px;*/
  padding-left: 15px;

  font-size: 12px;
  background-color: #fff;
  border-radius: 0px 0px 10px 10px;
  box-sizing: border-box;
  &.hidden {
    overflow: hidden;
  }

  .my-count {
    margin-bottom: 16px;
    color: #666;
    font-size: 16px;
    margin-top: 10px;
  }
  .count-tip {
    color: #666;
    font-size: 12px;
  }
  .gift-count {
    // margin-right: 30%;
    width: 200px;
    height: 66px;
  }
  .all-gift {
    position: relative;
    width: 600px;
    height: 60px;
    overflow: hidden;
  }
  .gift-items {
    /*position: absolute;*/
    /*right: 54px;*/
    // flex:1;
    position: absolute;
    display: flex;
    flex-direction: row;
    height: 60px;
    // flex-wrap: wrap-reverse;
    // justify-content: flex-end;
    width: 600px;
    /*width: 608px;*/

    align-items: center;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
  }

  .gift-item {
    // position: absolute;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 74px;
    width: 76px;
    text-align: center;

    .item {
      width: 60px;
      height: 62px;
      cursor: pointer;
      color: $color-title2;
      font-size: 12px;

      &:hover {
        background-color: $bg-gift;
      }
    }

    .logo {
      margin-top: 6px;
      margin-bottom: 4px;
      width: 32px;
      height: 32px;
    }
  }

   .rightmove {
    width: 54px;
    height: 39px;
    margin-top: 11px;
  }
  .leftmove {
    width: 54px;
    height: 39px;
    margin-top: 11px;
  }
  .allall {
    right: 0;
    position: absolute;
    width: 723px;
    height: 60px;
    display: flex;
  }
  .popper-switch {
    /*position: relative;*/
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    width: 24px;
    height: 50px;
    border: 2px solid $color-main;
    border-radius: 6px;
    cursor: pointer;

    .icon {
      /*position: absolute;*/
      /*top: 50%;*/
      /*left: 50%;*/
      transform: rotateZ(270deg);

      width: 9px;
      height: 13px;
      background: url("~@/assets/img/live-gift-arrow.png") center center
        no-repeat;
      background-size: 100% 100%;
    }

    .ion_down {
      line-height: 1;
      -webkit-transition: -webkit-transform 0.2s ease-out;
      transition: transform 0.2s ease-out;
    }

    .ion_up {
      -webkit-transform: rotateZ(450deg);
      transform: rotateZ(450deg);
    }
  }

  .gift-tools {
    clear: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /*padding-top: 76px;*/
    height: 47px;
    font-size: 12px;
    color: $color-title3;

    .gift-tools-icon {
      margin-right: 4px;
      width: 16px;
      height: 16px;
      background: url("~@/assets/img/live-gift-icon.png") 0 0 no-repeat;
      background-size: 100%;
    }

    .gift-btn {
      margin-left: 20px;
      margin-right: 20px;
      padding: 0;
      width: 53px;
      height: 23px;
      line-height: 23px;
      text-align: center;
      font-weight: 400;
      color: #fff;
      border-radius: 23px;
      border: 0 none;
      background-color: #f16c01;
    }
  }
}

.popper-content {
  width: 305px !important;
  /*height: 141px;*/
  .popper-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #d9d9d9;

    .popper-head-logo {
      margin: 0 15px 0 10px;
      padding: 13px;
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      border: 1px solid $color-border;
      border-radius: 4px;
    }

    .popper-head-wrap {
      height: 80px;
    }

    .title-wrap {
      margin-top: 15px;

      .title {
        font-size: 16px;
        color: $color-title1;
        @extend .bold;
      }

      .count {
        /*margin-left: 5px;*/
        font-size: 10px;
      }
    }

    .popper-radios-wrap {
      margin-top: 9px;
      width: 400px;

      .popper-radio {
        display: inline-block;
        margin-right: 5px;
        width: 48px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        color: $color-title2;
        border: 1px solid $color-border;
        border-radius: 4px;
        cursor: pointer;

        &.active {
          background: rgba(242, 246, 255, 1);
          color: $color-main;
          border: 1px solid $color-main;
        }
      }
    }
  }

  .popper-foot {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;

    .mydefined {
      width: 100px;
    }

    .count {
      flex: 1;
      margin-left: 10px;

      .desc {
        color: $color-title3;
      }
    }

    .input {
      margin-right: 10px;
      width: 48px;
      height: 20px;
    }

    ::v-deep .el-input__inner {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      text-align: center;
      padding: 0 2px;
    }

    .poppper-btn {
      margin-right: 10px;
      padding: 0;
      width: 53px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-weight: 400;
      color: #fff;
      border-radius: 4px;
      border: 0 none;
      background-color: $color-main;
    }
  }
}
</style>
<style>
.live-popper {
  padding: 0 !important;
  overflow: hidden;
}
</style>
