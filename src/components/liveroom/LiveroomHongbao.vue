<template>
  <section>
    <!--<div class="hongbao-mask" v-if="hongbaoDialog" @click.stop.self="hongbaoDialog = false">-->
    <!--</div>-->

    <transition name="zoom-in" appear>
      <div class="hongbao-wrap" v-if="hongbaoDialog">
        <i class="hongbao-close" @click.stop.self="hongbaoDialog = false"></i>
        <div class="hongbao-title">大吉大利</div>
        <div class="hongbao-result" v-if="isShowResult">
          <div class="hongbao-content-successed" v-if="result.gradSuccess">
            <div class="successed-money">
              {{ result.money }}<span> 米粒</span>
            </div>
            <div class="successed-tips">已存入账户,可到我的钱包中查看</div>
          </div>
          <div class="hongbao-content-failed" v-else>手慢了，红包已被领完啦～</div>
        </div>
        <div class="hongbao-btn-wrap" v-else>
          <div class="hongbao-btn" @click.stop.self="handleHongbao"></div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  /*
  * 主播发送红包后，在消息区上方弹出红包，红包只对已在直播间中的用户可见，之后进入的用户无法抢红包。若用户未点击，红包20秒后关闭。
  *
  * 连续有两个红包弹出时，第二个红包弹出后覆盖在第一个红包上方，弹出时有一个简单的由小放大的动画
  * */

  import { openRedPacket } from '@/api/liveroom';
  import { throttle } from "@/utils/debounceAndthrottle";

  export default {
    name: 'LiveroomHongbao',
    props: {
      hongbaoItem: {
        type: Object,
        default: () => {
          return {}
        }
      },
      userLogin: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      }
    },
    data() {
      return {
        hongbaoDialog: true, // 红包蒙层
        sending: false, // 接口加载flag
        isShowResult: false, // 接口返回结果
        result: {
          gradSuccess: false,
          money: "0.00"
        },
        timer: null
      }
    },
    mounted() {
      this.initSetTimeout();
    },
    methods: {
      initSetTimeout() {
        console.log(this.hongbaoItem._lcattrs.rp.time, 'this.hongbaoItem._lcattrs.rp.time');
        this.timer = setTimeout(() => {
          console.log('close');
          this.hongbaoDialog = false;

        }, 20000) // 固定20s 没有取接口数据
        // }, this.hongbaoItem._lcattrs.rp.time || 20000)

        // 清除绑定的定时器
        this.$once('hook:beforeDestroy', () => {
          console.log("hook:beforeDestroy");
          clearTimeout(this.timer);
        })
        return this.timer;
      },
      handleHongbao: throttle(function (value) {
        // 未登录 不清定时器 弹登陆
        if (!this.isLogin) {
          return this.$emit('login')
        }
        // 点击后清除定时器
        clearTimeout(this.timer);

        console.log(value, 'hongbao');
        this.sending = true;
        return openRedPacket({
          anchorId: this.hongbaoItem._lcattrs.pid,
          redPacketId: this.hongbaoItem._lcattrs.rp.id,
        }).then(res => {
          console.log(res);
          this.sending = false;
          this.result = res.data;
          this.isShowResult = true;
          if(res.data.gradSuccess === true){
            this.$emit('receiveHongBaoSuccess') // 抢到红包更新余额
          }
        }).catch(() => {
          this.sending = false;
          this.isShowResult = true;
        })
      }, 1000),
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  /*.hongbao-mask {*/
  /*  position: fixed;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  z-index: 19;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  background-color: transparent;*/
  /*}*/

  .hongbao-wrap {
    position: absolute;
    top: 14px;
    left: 60px;
    z-index: 20;
    width: 250px;
    height: 300px;
    background: url('~@/assets/img/live-hongbao-bg.png') 0 0 no-repeat;
    background-size: 100%;
    box-shadow: 0px 2px 16px 0px rgba(30, 32, 39, 0.11);
    text-align: center;

    .hongbao-close {
      position: absolute;
      right: 2px;
      top: 0;
      padding: 10px;
      width: 12px;
      height: 12px;
      cursor: pointer;
      background: url('~@/assets/img/live-hongbao-close.png') center center no-repeat;
      background-size: 12px 12px;
    }

    .hongbao-title {
      margin-top: 54px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      line-height: 28px;
    }

    .hongbao-btn-wrap {
      position: absolute;
      top: 155px;
      left: 0;
      width: 100%;
      height: 84px;

      .hongbao-btn {
        width: 84px;
        height: 84px;
        margin: 0 auto;
        cursor: pointer;
        background: url('~@/assets/img/live-hongbao-btn.png') 0 0 no-repeat;
        background-size: 100%;
      }
    }

    .hongbao-result {
      text-align: center;
    }

    .hongbao-content-failed {
      margin-top: 37px;
      font-size: 16px;
      line-height: 22px;
      color: $color-hongbao;
    }

    .hongbao-content-successed {
      margin-top: 38px;
      color: $color-hongbao;

      .successed-money {
        font-size: 44px;
        @extend .bold;

        span {
          line-height: 1;
          font-size: 12px;
          font-weight: 400;
        }
      }

      .successed-tips {
        margin-top: 12px;
        font-size: 12px;
      }
    }
  }
</style>
