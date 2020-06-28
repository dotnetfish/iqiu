<!--Created by fly on 2019/12/27-->
<template>
  <div>
    <div class="info">
      <div class="fl info-logo" style="width: 150px;">
        <el-avatar shape="square" :size="140" fit="contain" :src="squareUrl"></el-avatar>
      </div>
      <div class="fl info-text">
        <div class="name-wrap">
          <span class="info-name">{{userName}}</span>
          <img src="@/assets/img/Mcenter-person-add.png" class="info-add" alt="" @click="editInfo">
          <!--          <i class="el-icon-edit-outline" @click="editInfo"></i>-->
        </div>

        <div class="info-details">
          <div style="padding-left:0;border-right: 1px solid #C0C4CC">
            UID: <span>{{uid}}</span>
          </div>
          <div style="border-right: 1px solid #C0C4CC">
            手机: {{phone}}
          </div>
          <div style="margin-left: 5px">
            微信: {{wechat}}
          </div>
        </div>
        <p class="info-mili">粉丝数: <span>{{fanNumber}}</span></p>
      </div>
    </div>

    <el-divider></el-divider>

    <el-row class="income">
      <el-col :span="10" :lg="{span: 10, offset: 0}" :xl="{span: 10, offset: 0}"
              style="border-right: 1px solid #dcdcdc">
        <span class="s_title">我的收益</span>
        <el-row style="margin-top: 40px;" type="flex" align="middle">
          <el-col :span="12" style="margin-top: -3px;">
            <span class="s_number">{{income}}元</span>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" class="cbtn" size="mini" round @click="confirmWithdrawVisible">提现
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-link type="primary" style="font-size: 13px" @click="editIncome">收益明细</el-link>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" style="margin-left: 110px" >
        <span class="s_title">累计提现</span>
        <el-row style="margin-top: 40px;"  type="flex" justify="start" align="middle">
          <el-col :span="16" style="margin-top: -3px;">
            <span class="s_number">{{withdraw}}元</span>
          </el-col>
          <el-col :span="6">
            <el-link type="primary" style="font-size: 13px" @click="editWithdraw">提现明细</el-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="withdrawVisible"
      style="text-align: center"
      width="20%"
    >
      <div class="code-down">
        <div class="code-show">
          <h3 class="title">请前往91看球APP提现</h3>
          <p class="code-pic"><img src="../../assets/img/all-download-qrcode.png"></p>
          <p class="down-zhushou"><a href="./Live" target="_blank">下载直播助手</a></p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Row, Col, Button, Divider, Avatar, Link, Dialog } from 'element-ui';
  import { usersLoginInfo } from "@/api/mcenterapi";

  export default {
    name: "AnchorMyIncome",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Button.name]: Button,
      [Divider.name]: Divider,
      [Avatar.name]: Avatar,
      [Link.name]: Link,
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        squareUrl: '',
        url_ico: '',
        userName: '',
        uid: '',
        phone: '',
        wechat: '',
        fanNumber: '',
        withdraw: 0,
        income: 0,
        logoSrc: "",
        appSrc: "",
        withdrawVisible: false,

      };
    },
    methods:
      {

        editInfo() {
          this.$emit('showInfoEdit', 2);
        },
        confirmWithdrawVisible() {
          this.withdrawVisible = true;
          this.appSrc = "http://manhua.bainong365.cn:801/";
        },
        editWithdraw() {
          this.$emit('showInfoEdit', 3);
        },
        editIncome() {
          this.$emit('showInfoEdit', 4);
        }
      },

    mounted() {
      usersLoginInfo().then((response) => {
        if (response.code === 0) {
          this.squareUrl = response.data.avatarUrl;
          this.userName = response.data.uname;
          this.uid = response.data.id;
          this.phone = response.data.mobile;
          this.fanNumber = response.data.favorite || 0;
          this.wechat = response.data.wxName == null ? '未绑定' : response.data.wxName;
          this.income = response.data.accountDto.salaryAccount.balance;
          this.withdraw = response.data.accountDto.cashTotalWithdrawal;

        } else {
          console.error(response.error);
        }
      })
        .catch(function (error) {
          console.error(error);
        });
    }


  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .s_title {
    font-size: 22px;
    color: $color-title1;
    @extend .bold;
  }

  .s_number {
    font-size: 30px;
    color: $color-title1;
    @extend .bold;
  }

  .fans_count {
    padding: 5px 10px;
    border: 1px solid #3B90FF;
    border-radius: 5px;
    display: inline-block;
  }

  .info {
    height: 150px;
  }

  .info-logo {
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(195, 195, 195, 1);
  }


  .attention {
    margin-bottom: 10px;

    font-size: 22px;
    line-height: 30px;
    @extend .bold;
  }

  .image {
    width: 100%;
    display: block;
  }

  .info-text {
    box-sizing: border-box;
    width: calc(100% - 180px);
    padding-left: 30px;

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
      font-size: 24px;
      @extend .bold;
    }

    .info-add {
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
  }

  .info-details {

    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 23px;
    margin-bottom: 23px;

    font-size: 12px;
    color: $color-title2;

    div {
      padding: 0 15px;
    }

    span {
      color: $color-title1
    }
  }

  .info-mili {
    line-height: 1;

    font-size: 12px;
    color: #4A4A4A;
    span {
      padding-left: 6px;
      font-size: 22px;
      color: $color-main;
      line-height: 1;

    }
  }

  ::v-deep .el-divider--horizontal {
    width: auto;
    margin: 30px auto 20px;
    border-color: #D9D9D9;
  }

  .info-fans-number {
    margin-top: 5px;
    text-align: left;
    font-size: 13px;
  }


  .cbtn {
    width: 58px;
    height: 24px;
    padding: 0;
  }

</style>


<style scoped lang="scss">
  .code-down {
    // position: relative;
    .code-show {
      // width: 180px;
      // height: 202px;
      margin-top: -30px;
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      // box-shadow: 1px 2px 10px 0px #9B9B9B;
      .title {
        font-size: 16px;
        color: #333;
        line-height: 22px;
        font-weight: 500;
      }

      .info {
        margin: 10px;
        font-size: 12px;
        line-height: 17px;
        color: #666;
      }

      .code-pic {
        width: 120px;
        height: 120px;
        margin: 10px auto;
        border-radius: 4px;
        border: 0.5px solid #ccc;

        img {
          width: 110px;
          height: 110px;
          margin: 5px;
        }
      }

      .down-zhushou {
        margin-top: 0px;
        margin-bottom: -20px;
        height: 46px;
        line-height: 46px;
        // border-top: 1px solid #D9D9D9;
        font-size: 14px;

        /*a {*/
        /*  padding-left: 35px;*/
        /*  background: url('../../assets/icon_kt3.png') no-repeat left center;*/
        /*}*/
      }
    }
  }
</style>
