<template>
  <div class="live-gift" :class="{'hidden': hidden}" v-show="giftList.length>0">
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div style="display:flex">
        <div
          style="color: #999999;font-size: 14px;height:40px;line-height:40px;margin-right:12px;"
        >代充账号:</div>
        <div v-if="flag==false">
          <el-input v-model="touid" placeholder="请输入对方UID"></el-input>
        </div>
        <div v-else style="display:flex">
          <div>
            <img :src="avatarUrl" style="width:30px;height:30px;margin-top:5px;border-radius:50px;" />
          </div>
          <div style="margin-top:5px;margin-left:10px">
            <div style="margin-bottom:4px;font-size: 14px;">{{uname}}</div>
            <div style="font-size:12px;">UID:{{id}}</div>
          </div>
        </div>
        <div class="getuid" @click="GetToUser()" v-if="flag==false">确认</div>
        <div class="getuid" @click="noGetToUser()" v-else>取消</div>
      </div>
      <div class="default">
        <div v-for="(item,index) in defaultpaylist" :key="index">
          <div class="defaultmoney" @click="getcoin(item.coin,item.price)" tabindex="1">
            <div style="font-size:18px;color:#333333;text-align: center;margin-top: 7px;">{{item.price}}元</div>
            <div style="font-size:12px;color:#F9772A;margin-top:4px;text-align: center;">{{item.coin}}球币</div>
          </div>
        </div>
        <div class="defaultmoney" @click="isanymoney = true" v-if="isanymoney == false">
          <div style="font-size:18px;color:#333333;text-align: center;margin-top: 7px;">任意金额</div>
          <div style="font-size:12px;color:#F9772A;margin-top:4px;text-align: center;">1元=1000球币</div>
        </div>
        <div class="defaultmoney1" v-if="isanymoney == true" tabindex="1">
          <div style="font-size:18px;color:#333333;text-align: center;margin-top: 7px;"><input type="text" class="inputmoney" v-model="anymoney">元</div>
          <div style="font-size:12px;color:#F9772A;margin-top:4px;text-align: center;">1元=1000球币</div>
        </div>
      </div>
      <div style="margin-top:20px" v-if="isanymoney == false">可获得{{coinsum}}球币</div>
      <div style="margin-top:20px;margin-bottom" v-else>可获得{{anymoney*1000}}球币</div>
      <div class="alipay" @click="alipay()"><img src="@/assets/zhifubao.png" style="width: 16px;height: 16px;margin-top: 8px;margin-right: 10px;">支付宝</div>
      <section style="margin-top:30px;text-align:center">
            <el-checkbox v-model="agreement" style="margin:15px auto 0;font-size:12px;">
              <span style="font-size:12px;">我已阅读并同意</span>
              <a
                target="_blank"
                :href=href
                class="know"
                style="font-size:12px;"
              >《充值须知》</a>
            </el-checkbox>
        </section>
    </el-dialog>
    <div class="gift-count">
      <div class="my-count">
        我的积分:
        <span class="color-main">{{ userLogin.credit }}</span>
      </div>
      <div class="my-count">
        我的球币:
        <span class="color-main">{{ Summoney }}</span>
      </div>
      <div class="count-tip">
        每日登陆赠送
        <span class="color-main">200</span> 积分
      </div>
    </div>
    <div class="allall"> 
    <div>
      <el-button @click="leftmove()" class="leftmove" v-if="xxx != 0">＜</el-button>
      <div class="leftmove" v-if="xxx == 0"></div> 
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
                    <span class="count" v-if="item.type==1">（{{ item.price }}积分）</span>
                    <span class="count" v-if="item.type!=1">（{{ item.price }}球币）</span>
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
                <p class="count" v-if="item.type==1">我的积分：{{ userLogin.credit }}</p>
                <p class="count" v-if="item.type!=1">我的球币：{{ Summoney }}</p>
                <!-- <input class="input" type="tel" v-model="gift.value"> -->
                <el-input v-model="gift.value" placeholder="自定义" :value="gift.value" class="input"></el-input>
                <el-button
                  class="poppper-btn"
                  :loading="sending"
                  @click.stop="handleSendGift(item, gift.value)"
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
      <el-button @click="rightmove()" v-if="xxx != length">＞</el-button>
    </div>
    <!-- <div style="margin-left:20px;margin-right:20px;">
      <div style="margin-top:3px"><img src="@/assets/rank/backpack.png"></div>
      <div style="margin-left:7px">背包</div>
    </div> -->
    <el-popover
            popper-class="live-popper"
            placement="top-end"
            width="335"
            trigger="hover"
          >
          <div style="margin-left:10px;margin-top:10px;margin-bottom:10px">我的背包</div>
          <div v-for="(item,index1) in freegift" :key="index1">
            <div style="margin-left:10px;margin-top:10px;margin-bottom:10px">
              <div style="width:60px;text-align:center" @click="handleSendGift(item,1)"><img :src=item.imageUrl style="width:30px;height:30px"></div>
              <div style="width:60px;text-align:center">{{item.name}}</div>
              <div style="width:60px;text-align:center">x{{item.sum}}</div>
            </div>
          </div>
            <div class="item" slot="reference" style="margin-left:20px;margin-right:20px;">
              <img style="margin-top:3px" class="logo" src="@/assets/rank/backpack.png" alt />
              <div style="margin-left:7px">背包</div>
            </div>
          </el-popover>
    <!-- <div class="backpack"></div> -->
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
import { Popover, Button, Input, Message, Dialog, Checkbox } from "element-ui";
import { throttle } from "@/utils/debounceAndthrottle";
import { MyPackage, getPay, paylist, getToUser, payType, payadd } from "@/api/api";
// import PersonWallt from '@/components/MCenter/PersonWallt.vue';

export default {
  name: "LiveroomGift",
  data() {
    return {
      sending: false,
      Summoney:0,
      xxx: 0,
      length:8,
      hidden: true, // 展示全部礼物
      href:'',
      radioList: [
        {
          value: 10,
          desc: "十全十美",
        },
        {
          value: 25,
          desc: "十全十美",
        },
        {
          value: 999,
          desc: "十全十美",
        },
        {
          value: 1314,
          desc: "十全十美",
        },
      ],
      radioIndex: 0,
      flag: false,
      touid: "",
      avatarUrl: "",
      id: "",
      defaultpaylist:'',
      uname: "",
      anymoney:1,
      price:'',
      agreement:true,
      coinsum:0,
      isanymoney:false,
      gift: {
        value: 1,
      },
      // imageUrl:'',
      // giftname:'',
      // giftsum:'',
      freegift:'',
      dialogVisible:false,
      payDialogVisible: false,
      tabBool: [false, true, false],
    };
  },
  components: {
    [Popover.name]: Popover,
    [Button.name]: Button,
    [Input.name]: Input,
    [Message.name]: Message,
    [Dialog.name]: Dialog,
    [Checkbox.name]:Checkbox,
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
  mounted() {
    this.getMyPackage()
    this.Getpay()
    this.getpayType()
  },
  methods: {
    alipay(){
      if(this.touid == ''){
        this.touid = this.$store.state.userStatus.userInfo.uid
      }
      if(this.isanymoney==true){
        this.price = this.anymoney
      }
      // console.log(this.touid)
      let data = {
        toUid:this.touid,
        platform:'pc',
        price:this.price,
        type:1,
      }
      if(this.agreement==true){
        payadd(data).then(res=>{
        if(res.code==0){
          // console.log("返回的链接=",res,"aa")
        let routeData = this.$router.resolve({ path:'/html',query:{htmls:res.data.payInfo}})
        // console.log(routeData)
        this.dialogVisible = false
        window.open(routeData.href,'_blank');
        }else{
          Message.error(res.msg);
        }
      })
      }else{
        Message.error("请同意协议");
      }
    },
    getpayType(){
      console.log("默认充值金额组=")
      let data = {
        type:3
      }
      payType(data).then((res)=>{
        this.defaultpaylist = res.data.payTypes 
        console.log("默认充值金额组=",res)
      })
    },
    GetToUser() {
      let data = {
        uid: this.touid,
      };
      getToUser(data).then((res) => {
        // console.log("代充信息=", res);
        if (res.code == 0) {
          this.flag = true;
          this.avatarUrl = res.data.avatarUrl;
          this.id = res.data.id;
          this.uname = res.data.uname;
        } else {
          Message.error(res.msg);
          this.flag = false;
        }
      });
    },
    noGetToUser() {
      this.touid = ''
      let data = {
        uid: "",
      };
      getToUser(data).then((res) => {
        this.flag = false;
      });
    },
    Getpay(){
      this.href = process.env.VUE_APP_HREF+'/topup'
      console.log("54544",this.href)
      if(this.$store.state.userStatus.userInfo.uid){
        getPay().then(res=>{
        if(res.data.coin){
          this.Summoney = res.data.coin 
        }
      })
      }
    },
    //多少球币
    getcoin(coin,price){
      this.isanymoney = false;
      this.anymoney = 1;
      this.coinsum = coin;
      this.price = price;
    },
    //我的礼物背包
    getMyPackage(){
      if(this.$store.state.userStatus.userInfo.uid){
        MyPackage().then((res)=>{
        console.log("我的礼物背包",res.data)
        this.freegift = res.data
        // this.imageUrl = res.data.imageUrl;
        // this,giftname = res.data.name;
        // this.giftsum = res.data.sum;
      })
      }
    },
    rightmove() {
      // console.log("sadafaefwertwrrgreg===-==",this.giftList.length)
      this.length = this.giftList.length - 8;
      if (this.xxx < this.giftList.length) {
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
      // console.log("礼物item = ",item);
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
            this.getMyPackage();
          } else if(res.code==500){
            console.log("5555555555555555555555555555555555")
            this.dialogVisible = true
            Message.error(res.msg);
          }else{
            Message.error(res.msg);
          }
          // console.log(res);
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
    width: 775px;
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

    // .mydefined {
    //   width: 53px;
    //   height: 26px;
    //   margin-right: 5px;
    // }

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
.getuid {
  width: 60px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #979797;
  line-height: 34px;
  text-align: center;
  font-size: 14px;
  margin-left: 20px;
  transition: all 0.2s;
  cursor: pointer;
  margin-top: 3px;
}

.getuid:hover {
  border: 1px solid #f9772a;
  color: #f9772a;
  // transition: all 0.2s
}
.default{
  display: flex;
  flex-wrap: wrap;
}
.defaultmoney:focus{
border: 1px solid #f9772a;
}
.defaultmoney1{
  width: 122px;
height: 50px;
background: #FFFFFF;
border-radius: 5px;
border: 1px solid #f9772a;
margin-right: 5px;
margin-left: 5px;
margin-top: 20px;
}
.alipay{
  width: 111px;
height: 32px;
background: #FFFFFF;
border-radius: 5px;
border: 1px solid #999999;
line-height: 32px;
cursor: pointer;
margin-top: 20px;
    display: flex;
    justify-content: center;
}
.know{
  color: #f9772a;
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #f9772a;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #f9772a;
    border-color: #f9772a;
}

::v-deep .el-checkbox__inner:hover {
    border-color: #f9772a;
}
// .backpack{
//   position: absolute;
//   width: 461px;
// height: 286px;
// background: #FFFFFF;
// box-shadow: 0px 4px 8px 0px #D8D8D8;
// }
.inputmoney {
  border: 1px solid #bebebe;;
  width: 50px;
  outline: 0;
}
.defaultmoney{
  width: 122px;
height: 50px;
background: #FFFFFF;
border-radius: 5px;
border: 1px solid #999999;
margin-right: 5px;
margin-left: 5px;
margin-top: 20px;
transition: all 0.2s;
}
</style>
<style>
.live-popper {
  padding: 0 !important;
  overflow: hidden;
}
</style>
