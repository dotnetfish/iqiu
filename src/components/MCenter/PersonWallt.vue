<!--Created by fly on 2019/12/26-->
<template>
  <div class="person-wallt">
    <template v-if="isDialog">
      <el-dialog
        custom-class="person-wallt wallt-dialog"
        :visible.sync="isShow"
        append-to-body
        :show-close="false"
        width="509px">
        <div class="wallt-dialog-header">
          <span class="wallt-dialog-title">{{ this.uname }} </span>
          <span class="wallt-dialog-desc"> (<i></i>米粒:{{ this.mili }})</span>
          <div class="wallt-dialog-close" @click.stop="isShow = false"></div>
        </div>
        <div class="wallt-dialog-body">
          <div class="recharge-radio">
            <div class="subtitle">充值金额:</div>
            <div class="item-wrap">
              <div @click.stop="changeRecharge(index)" v-for="(o,index) in recharge"
                   :key="index" class="radio-item" :class="{'active': index === costNumber}">
                <!--          <div class="tip-tag" v-if="o.proportion">加送{{ o.proportion * o.totalFee / 10000 / 100 }}万米粒</div>-->
                <div class="tip-tag" v-if="o.proportion">{{ o.presentDesc }}</div>
                <div class="tip-money">{{o.title}}元</div>
                <div class="tip-mili"><i class="radio-icon"></i>{{o.totalFee / 10000}}万米粒</div>
              </div>
              <div class="other-wrap" :class="{'isNumErr': isNumErr}" v-if="otherRecharge">
                <div class="radio-item other" :class="{'active': '-1' === costNumber}" @click.stop="changeRecharge('-1')">
                  <div class="tip-tag" v-if="'-1' === costNumber && otherRechargeTag">加送{{ otherRechargeTagStr }}米粒</div>
                  <template v-if="costNumber != -1">
                    其他金额
                  </template>
                  <template v-else>
                    <div class="other-money">
                      <el-input ref="input" type='tel' v-model="money" placeholder="" @input="inputrecahrgeChange"></el-input>
                      元
                    </div>
                  </template>
                </div>
                <div class="tips">大于10的整数</div>
              </div>
            </div>
          </div>

          <div class="recharge-radio">
            <div class="subtitle">支付方式:</div>
            <div @click.stop="changePayMethod(5)" class="radio-item paymethod" :class="{'active-pay': payMethod === 5}">
              <div class="tip-mili"><img src="../../assets/weixin.png"/>微信</div>
            </div>
            <!-- <div @click.stop="changePayMethod(0)" class="radio-item paymethod" :class="{'active-pay': payMethod === 7}">
              <div class="tip-mili"><img src="../../assets/alipay.png"/>支付宝</div>
              </div> -->
          </div>

          <div class="money-wrap">
            <div class="subtitle">应付金额:</div>
            <div class="money">{{money}} <span>元</span></div>
            <div class="dialog-btn-wrap">
              <el-button type="primary" style="margin-left:40px;width:152px" round :loading="loading" v-if="isDialog" @click.stop="confirmPayVisible">
                立即支付
              </el-button>
              <br>
              <el-checkbox v-model="agreement" style="margin-top:10px">
                阅读并同意
                <a target="_blank" href="https://pic.imifan.live/mifanh5/h5/topUpServiceAgreement.html">《米粒充值服务协议》</a>
              </el-checkbox>
            </div>
          </div>
        </div>
      </el-dialog>
    </template>
    <!--个人中心显示-->
    <template v-else>
      <div class="title">我的钱包</div>
      <div class="info-mili">
        <i class="mili-icon"></i>
        <span>米粒: <span style="margin-left: 5px;margin-right:20px">{{mili}}</span></span>
        <el-link type="primary" @click="showCostDetail">充值明细</el-link>
      </div>

      <el-divider></el-divider>

      <div class="recharge-radio">
        <div class="subtitle">充值金额:</div>
        <div class="item-wrap">
          <div @click.stop="changeRecharge(index)" v-for="(o,index) in recharge"
               :key="index" class="radio-item" :class="{'active': index === costNumber}">
            <!--          <div class="tip-tag" v-if="o.proportion">加送{{ o.proportion * o.totalFee / 10000 / 100 }}万米粒</div>-->
            <div class="tip-tag" v-if="o.proportion">{{ o.presentDesc }}</div>
            <div class="tip-money">{{o.title}}元</div>
            <div class="tip-mili"><i class="radio-icon"></i>{{o.totalFee / 10000}}万米粒</div>
          </div>
          <div class="other-wrap" :class="{'isNumErr': isNumErr}" v-if="otherRecharge">
            <div class="radio-item other" :class="{'active': '-1' === costNumber}" @click.stop="changeRecharge('-1')">
              <div class="tip-tag" v-if="'-1' === costNumber && otherRechargeTag">加送{{ otherRechargeTagStr }}米粒</div>
              <template v-if="costNumber != -1">
                其他金额
              </template>
              <template v-else>
                <div class="other-money">
                  <el-input ref="input" type='tel' v-model="money" placeholder="" @input="inputrecahrgeChange"></el-input>元
                </div>
              </template>
            </div>
            <div class="tips">大于10的整数</div>
          </div>
        </div>
      </div>

      <div class="recharge-radio">
        <div class="subtitle">支付方式:</div>
        <div @click.stop="changePayMethod(5)" class="radio-item paymethod" :class="{'active-pay': payMethod === 5}">
          <div class="tip-mili"><img src="../../assets/weixin.png"/>微信</div>
        </div>
        <!-- <div @click.stop="changePayMethod(7)"  class="radio-item paymethod" :class="{'active-pay': payMethod === 0}">
          <div class="tip-mili"><img src="../../assets/alipay.png"/>支付宝</div>
        </div> -->
      </div>

      <div class="money-wrap">
        <div class="subtitle">应付金额:</div>
        <div class="money">{{money}} <span>元</span></div>
      </div>
      <div class="wallt-btn-wrap">
        <el-button v-if="!isDialog" type="primary" round class="pay-btn" :loading="loading" @click.stop="confirmPayVisible">
          立即支付
        </el-button>
        <br>
        <el-checkbox v-model="agreement" style="margin-top:10px">
          阅读并同意
          <a target="_blank" href="https://pic.imifan.live/mifanh5/h5/topUpServiceAgreement.html">《米粒充值服务协议》</a>
        </el-checkbox>
        <div id="zhifubao" style="width:100px;height:100px;"></div>
      </div>
    </template>

    <el-dialog
      custom-class="pay-dialog"
      :visible.sync="payVisible"
      :title="payMethodTitle"
      append-to-body
      width="608px"
      :before-close="handlePayClose">
      <div class="qr-wrap" :class="{'weixin': payMethod === 5,'alipay': payMethod === 0}">
        <vue-qr
          :size="160"
          :margin="0"
          :auto-color="true"
          :dot-scale="1"
          :text="appSrc"
        />
        <!--支付宝test--> 
        <div id="zhifubao"></div>
        <qrcode  :value="qrcodeUrl"  v-if="qrcodeUrl"  :options="{ size: 20}"> </qrcode>
        <div v-html="html"></div>
      </div>
      <template v-if="payMethod==5">
        <div class="pay-tip"><img src="../../assets/weixin.png"/><span>打开微信手机客户端扫一扫</span>
        </div>
      </template>
      <template v-if="payMethod==0">
        <div class="pay-tip"><img src="../../assets/alipay.png"/><span>打开支付宝手机客户端扫一扫</span>
        </div>
      </template>
      <div class="pay-money">支付金额：{{money}}元</div>
      <div class="pay-desc">
        <div class="pay-mili">充值米粒：<span>{{rechargeMili}}米粒</span></div>
        <div class="pay-type">支付方式：{{payMethod==5?'微信':'支付宝'}}</div>
      </div>
    </el-dialog>

    <el-dialog
      custom-class="pay-success-dialog"
      :visible.sync="paySuccessVisible"
      append-to-body
      :show-close="false"
      width="608px">
      <div class="pay-bg">
        <div class="success">充值成功</div>
        <div>您已获得{{rechargeMili}}米粒</div>
      </div>
      <el-button type="primary" round class="pay-success-btn" @click.stop="paySuccessVisible = false">
        确定
      </el-button>
    </el-dialog>
  </div>
  
</template>

<script>
  import { Row, Col, Link, Radio, Button, Dialog, Input, Divider, Checkbox } from 'element-ui';
  import { payConfTabs, usersLoginInfo, payIndex, payOrder } from "@/api/mcenterapi";
  import VueQr from 'vue-qr';
  import { md5SecretPay } from '@/utils/md5.js'
  const qs = require("qs");
  import Qrcode from 'vue-qrcode';//支付宝test


  export default {
    name: "PersonWallt",
    components: {
      [Checkbox.name]: Checkbox,
      [Row.name]: Row,
      [Col.name]: Col,
      [Link.name]: Link,
      [Input.name]: Input,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [Radio.name]: Radio,
      [Divider.name]: Divider,
      VueQr,
      qrcode: Qrcode
    },
    data() {
      return {
        mili: 0,
        uname: '',
        agreement: true,

        loading: false,
        costNumber: 0, // -1 其他金额（特殊处理）其他取 recharge
        recharge: [],
        proportionList: [], // 赠送list
        otherRecharge: false,
        otherRechargeTag: '', // 赠送米粒数
        money: 10,
        paySuccessVisible: false,
        payMethod: 5, // 充值渠道: 0(支付宝), 1(微信APP), 2(苹果支付), 5(微信Native)
        payVisible: false,
        payMethodTitle: '微信扫码支付',
        appSrc: "http://www.baidu.com",
        tradeNo: "",
        isNumErr: false,
        timer: null,
        times: 0,
        isShow: false,
        html:'', // 支付宝test
        qrcodeUrl:'' // zhifubaotest
      };
    },
    props: {
      isDialog: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      rechargeMili() {
        if (this.costNumber === '-1') {
          return this.money * 100 + this.otherRechargeTag
        } else if (this.recharge[this.costNumber] && this.recharge[this.costNumber].proportion) {
          return this.recharge[this.costNumber].proportion * this.recharge[this.costNumber].totalFee / 100 + this.recharge[this.costNumber].totalFee
        }
        return this.money * 100
      },
      otherRechargeTagStr() {
        // 大于1万的时候单位是万，小于1万直接显示就行 两位吧，单位为万时保留两位位小数，不是四舍五入，如19892显示1.98万
        return this.otherRechargeTag >= 10000 ? Math.floor(this.otherRechargeTag / 100) / 100 + '万' : this.otherRechargeTag;
      }
    },
    watch: {
      money: function () {
        if (this.costNumber == '-1') {
          this.otherRechargeUpdate()
        } else {
          this.otherRechargeTag = '';
        }
      },
      costNumber: function (val) {
        if (val !== '-1') {
          this.money = this.recharge[val].totalFee / 100
        }
      },
      payMethod: function (val) {
        if (val == 5) {
          this.payMethodTitle = '微信扫码支付'
        } else {
          this.payMethodTitle = '支付宝扫码支付'
        }
      }
    },
    created() {
      this.getPayConfTabs();
      this.getUsersInfo()
    },
    destroyed() {
      console.log('destroyed');
      clearTimeout(this.timer);
    },
    methods: {
      show(val) {
        this.isShow = val;
      },
      // 其他金额 计算赠送
      otherRechargeUpdate() {
        this.proportionList.forEach((item, index) => {
          if (item.totalFee / 100 <= this.money && !this.proportionList[index + 1]) {
            console.log(item.proportion);
            this.otherRechargeTag = item.proportion * this.money
          } else if (item.totalFee / 100 <= this.money && this.proportionList[index + 1].totalFee / 100 > this.money) {
            console.log(item.proportion);
            this.otherRechargeTag = item.proportion * this.money
          }
        })
        // 小于最小金额 清空
        if (this.proportionList[0] && this.proportionList[0].totalFee / 100 > this.money) this.otherRechargeTag = '';
      },
      // 其他金额输入异常
      inputrecahrgeChange(value) {
        if (value >= 10 && (/(^[1-9]\d*$)/.test(value))) {
          console.log(false);
          this.isNumErr = false;
        } else {
          console.log(true);
          this.isNumErr = true;
        }
      },
      // 金额切换
      changeRecharge(data) {
        console.info(data);
        this.costNumber = data
        if (data == '-1') {
          this.$nextTick(() => {
            this.otherRechargeUpdate()
            // this.money = 10;
            this.$refs.input.focus()
          })
        } else {
          // 清除其他金额样式
          this.isNumErr = false
          this.otherRechargeTag = "";
        }
      },
      // 支付方式
      changePayMethod(data) {
        console.info(data);
        this.payMethod = data;
      },
      handlePayClose(done) {
        this.appSrc = '';
        done();
      },
      // 支付按钮
      confirmPayVisible() {
        if (!this.agreement) return this.Message.error('请阅读并同意协议')
        if (this.isNumErr) return this.Message.error('请输入有效金额')

        if (this.timer) clearTimeout(this.timer);

        this.loading = true;
        this.getPayIndex()
      },

      showCostDetail() {
        this.$emit('showCostDetail', true);
      },

      getPayConfTabs() {
        let data = {
          platform: "PC"
        }
        payConfTabs(data).then((response) => {
          if (response.code === 0) {
            response.data.forEach((item, index) => {
              //执行代码
              if (item.title != "其它") {
                this.recharge[index] = item;
                // this.rechargeCost[index] = item.title;
                if (item.proportion) this.proportionList.push(item);
                if (item.isDefault) {
                  this.money = this.recharge[index];
                  this.costNumber = index;
                }
              } else {
                // 其他金额单独处理
                this.otherRecharge = true;
              }
            })
          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          });
      },
      getUsersInfo() {
        usersLoginInfo().then((response) => {
          if (response.code === 0) {
            this.mili = response.data.accountDto.miCoin.balance || 0;
            this.uname = response.data.uname;
          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          });
      },
      // 获取二维码
      getPayIndex() {
        let params = {
          assetType: 0, //  0(米粒), 1(红包)
          payChannel: this.payMethod, // 0(支付宝), 1(微信APP), 2(苹果支付), 5(微信Native)
          payTabId: this.costNumber === '-1' ? '' : this.recharge[this.costNumber].payPresentId,
          platform: 'PC',
          random: parseInt((Math.random() + 1) * Math.pow(10, 8 - 1)), // 8位随机数
          timeStamp: new Date().getTime(),
          totalFee: this.money * 100 // 总金额,单位分
        }
        if(this.costNumber === '-1') delete params.payTabId
        let sign = md5SecretPay(qs.stringify(params))
        params.sign = sign;
        console.log('支付参数',params);

        return payIndex(params).then((response) => {
          console.log('支付-response', response.data)
          // 7
        //  document.querySelector('#zhifubao').innerHTML = response.data;
        //  // this.executeScript(response.data);
        //  const payDiv = document.getElementById('payDiv');
				// 		if (payDiv) {
				// 			document.body.removeChild(payDiv);
				// 		}
				// 		const div = document.createElement('div');
				// 		div.id = 'payDiv';
				// 		div.innerHTML = response.data;
				// 		document.body.appendChild(div);
				// 		document.getElementById('payDiv').getElementsByTagName('form')[0].submit();


         console.log(response, 'payIndex'); // 微信支付
          this.payVisible = true;
          this.loading = false;
          this.appSrc = response.data.codeUrl;
          this.tradeNo = response.data.tradeNo;
          // 轮询查结果
          this.getPayOrder();
        })
        .catch((error) => {
          alert('00')
            this.loading = false;
            this.Message.error(error.data.msg)
            console.error(error, 'payindex');
          });
      },
      //test
       executeScript(html){
         /* eslint-disable */
        let reg = /<script[^>]*>([^\x00]+)$/i;
        let htmlBlock = html.split("<\/script>");
        for (let i in htmlBlock){
          let blocks;
          if (blocks = htmlBlock[i].match(reg)){
            let code = blocks[1].replace(/<!--/, '');
            try{
              eval(code) //执行脚本
            }
            catch (e){
              console.log(e)
            }
          }
        }
      },
      // 获取结果
      getPayOrder() {
        // 目前轮询时间是 120 * 2000  4分钟
        if (this.times > 120) return this.times = 0;
        this.times++
        payOrder({ tradeNo: this.tradeNo }).then((response) => {
          if (response.data.tradeStatus === 'TRADE_END') {
            this.payVisible = false
            this.paySuccessVisible = true;
            this.times = 0
            if (this.isDialog) this.isShow = false;
            // 更新当前页面米粒数
            this.getUsersInfo()
            this.$emit('rechargeSuccess')
          } else {
            this.timer = setTimeout(() => {
              this.getPayOrder();
            }, 2000)
          }
        })
          .catch(function (error) {
            console.error(error);
          });
      },
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/_index.scss";

  .wallt-btn-wrap {
  }
  .wallt-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding-left: 0px;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 24px;
    }
    &.person-wallt {
      padding: 0;
    }
    .wallt-dialog-body {
      padding: 0 35px;
      .recharge-radio {
        margin-top: 39px;
      }
      .money-wrap {
        margin-top: 30px;
      }
    }
    .wallt-dialog-header {
      position: relative;
      padding-top: 21px;
      padding-left: 35px;
      height: 62px;
      background-color: $color-main;
      color:#fff;
      box-sizing: border-box;
      .wallt-dialog-title {
        font-size: 20px;
        @extend .bold;
      }
      .wallt-dialog-desc {
        font-size: 14px;
        i {
          display: inline-block;
          vertical-align: bottom;
          width: 18px;
          height: 18px;
          background: url('~@/assets/img/Mcenter-mili-o.png') 0 0 no-repeat;
          background-size: 100%;

        }
      }
      .wallt-dialog-close {
        position: absolute;
        right:14px;
        top:7px;
        padding: 10px;
        width:16px;
        height: 16px;
        background: url('~@/assets/img/Mcenter-mili-close.png') center center no-repeat;
        background-size: 16px 16px;
        cursor: pointer;
      }
    }
  }
  .person-wallt {
    /*padding-left: 30px;*/

    .title {
      margin: 0px 0 34px;
      font-size: 22px;
      color: $color-title1;
      line-height: 30px;
      @extend .bold;
    }

    .info-mili {
      display: flex;
      justify-content: left;
      align-items: center;
      font-size: 12px;
      color: $color-title2;
    }

    .mili-icon {
      display: inline-block;
      margin-right: 4px;
      width: 16px;
      height: 16px;
      background: url('~@/assets/img/live-gift-icon.png') 0 0 no-repeat;
      background-size: 100%;
    }

    .subtitle {
      /*margin-top: 15px;*/
      margin-right: 13px;
      /*padding-left: 20px;*/
      line-height: 22px;
      font-size: 16px;
      color: $color-title1;
    }

    .recharge-radio {
      margin-top: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;

      font-size: 13px;
      color: $color-title3;

      .item-wrap {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
      }

      .other-wrap {
        text-align: center;

        &.isNumErr {
          .radio-item {
            border: 1px solid #FF3D30;
            background-image: none;
          }

          .tips {
            color: #FF3D30;
          }

          .el-input__inner {
            color: #FF3D30;
          }
        }

        .tips {
          margin-top: -4px;
          margin-right: 10px;
        }
      }

      .radio-item {
        position: relative;
        margin-right: 8px;
        margin-bottom: 12px;
        width: 110px;
        height: 50px;
        text-align: center;
        border: 1px solid $color-border-input;
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;

        &.active {
          border: 0px solid $color-border;
          background: url('~@/assets/img/Mcenter-recharge-active.png') 0 0 no-repeat;
          background-size: 100% 100%;
        }

        &.active-pay {
          border: 0px solid $color-border;
          background: url('~@/assets/img/Mcenter-pay-active.png') 0 0 no-repeat;
          background-size: 100% 100%;
        }


        &.other {
          color: $color-title1;
          line-height: 50px;

          .other-money {
            margin-right: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            color: $color-title3;
          }

          .el-input__inner {
            flex: 1;
            border: 0;
            margin-left: 1px;
            text-align: center;
            height: 40px;
            font-size: 13px;
            line-height: 13px;
            padding: 18px 2px;
          }
        }

        &.paymethod {
          height: 40px;
          line-height: 40px;

          img {
            width: 20px;
            height: 20px;
            margin-right: 8px;
          }
        }

        .tip-tag {
          position: absolute;
          top: -10px;
          right: -4px;
          z-index: 2;
          /*left: 31px;*/
          height: 17px;
          padding: 0 6px;
          line-height: 17px;
          color: #fff;
          font-size: 12px;
          white-space: nowrap;
          background: linear-gradient(0deg, #F16C01 0%, #FF5921 100%);
          border-radius: 17px 17px 17px 0;
        }

        .radio-icon {
          display: block;
          width: 16px;
          height: 16px;
          margin-right: 4px;
          background: url('~@/assets/img/live-gift-icon.png') 0 0 no-repeat;
          background-size: 100%;
        }

        .tip-money {
          margin-top: 9px;
          margin-bottom: 5px;
        }

        .tip-mili {
          display: flex;
          justify-content: center;
          align-items: center;
          color: $color-title1;
        }
      }
    }

    .money-wrap {
      margin-top: 60px;
      /*margin-right: 50px;*/
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .money {
        flex: 1;
        height: 100%;
        font-size: 18px;
        color: $color-main;
        @extend .bold;

        span {
          font-size: 12px;
          color: $color-title2;
        }
      }
    }
    .wallt-btn-wrap {
      margin-top: 95px;
      margin-left: 35%;
      margin-bottom: 40px;
    }

    .pay-btn {
      margin-left: 8%;
      width: 152px;
      height: 40px;
    }

    .el-divider--horizontal {
      margin: 30px 0 60px 0;
    }
  }

  .pay-dialog {
    text-align: center;
    padding-bottom: 20px;

    .el-dialog__body {
      padding-top: 20px;
    }

    .qr-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      padding: 8px;
      width: 168px;
      height: 168px;

      &.weixin {
        background: url('~@/assets/img/Mcenter-pay-weixin.png') 0 0 no-repeat;
        background-size: 100%;
      }

      &.alipay {
        background: url('~@/assets/img/Mcenter-pay-alipay.png') 0 0 no-repeat;
        background-size: 100%;
      }
    }

    .pay-tip {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 9px;
      margin-bottom: 20px;

      img {
        margin-right: 6px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }

      span {
        font-size: 12px;
        color: $color-title3;
      }
    }

    .pay-money {
      font-size: 18px;
      color: $color-title1;
    }

    .pay-desc {
      position: relative;
      margin: 20px auto 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 430px;
      height: 41px;
      background: rgba(255, 255, 255, 1);
      border-radius: 21px;
      border: 1px solid rgba(217, 217, 217, 1);

      font-size: 14px;
      color: $color-title2;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        display: block;
        height: 20px;
        width: 1px;
        background-color: #D8D8D8;
        transform: translate(-50%, -50%);
      }

      span {
        color: $color-main;
      }
    }
  }

  .pay-success-dialog {
    text-align: center;
    font-size: 14px;
    color: $color-title2;

    .pay-bg {
      margin: 0 auto;
      width: 276px;
      height: 276px;
      background: url('~@/assets/img/Mcenter-pay-success.png') 0 0 no-repeat;
      background-size: 100%;
    }

    .pay-success-btn {
      margin-top: 26px;
      width: 152px;
      height: 40px;
    }

    .success {
      padding-top: 156px;
      padding-bottom: 6px;
      color: $color-main;
      font-size: 20px;
    }
  }
</style>

