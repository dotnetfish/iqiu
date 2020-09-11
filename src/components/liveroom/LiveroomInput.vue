<template>
  <div class="live-input">
    <div class="mask mask-ban" v-if="userInfo.forbid && isLogin">{{ banText }}</div>
    <div class="mask mask-login" v-if="!isLogin" @click.stop="$emit('login')"><span>登陆</span>即可发送弹幕</div>
    <!-- <div class="fanmessage"><img src="@/assets/timg.jpg" style="width:90%;height:60px;"></div> -->
    <!-- 彩色弹幕 -->
    <!-- <div class="fanmessage" @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)">
      <div v-if="flag==false"><img src="@/assets/fans/painting.png"></div>
      <div v-if="flag==true"><img src="@/assets/fans/painting1.png"></div>
    </div>
    <div class="paintingmessage" v-if="flag==true" @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)">
      <div class="paintingmessage-back">
        <div style="margin-left:28px">彩色弹幕</div>
        <div class="changebarrage">
          <div class="change1">
              <img src="@/assets/fans/default.png">
          </div>
          <div class="change2">
              <img src="@/assets/fans/key.png" class="change">
          </div>
          <div class="change3">
              <img src="@/assets/fans/key.png" class="change">
          </div>
          <div class="change4">
              <img src="@/assets/fans/key.png" class="change">
          </div>
          <div class="change5">
              <img src="@/assets/fans/key.png" class="change">
          </div>
          <div class="change6">
              <img src="@/assets/fans/key.png" class="change">
          </div>
        </div>
      </div>
    </div> -->
    <el-input
      type="textarea"
      :rows="2"
      resize="none"
      placeholder=""
      v-model.trim="textarea"
      maxlength="50"
      show-word-limit
      v-on:keyup.enter.native="handleSend">
    </el-input>
    <!-- <el-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <el-button slot="reference" class="fans">hover 激活</el-button>
  </el-popover> -->
  <div class="conditionsmessage" v-if="flagconditions==true" @mouseenter="changeflagconditions(1)" @mouseleave="changeflagconditions(2)">
      <div class="conditionsmessage-back">
        <div style="margin-left:28px;font-size:14px;color:#666666;position:absolute;margin-top:20px">当天赠送主播500积分，即可获得专属主播勋章</div>
        <div style="margin-left:28px;font-size:14px;color:#666666;position:absolute;margin-top:50px;color:#1BB5EC;cursor:pointer;" @click="more()">了解更多></div>
      </div>
    </div>
    <div class="fans" @mouseenter="changeflagconditions(1)" @mouseleave="changeflagconditions(2)" @click="receive()" v-if="islevel==false">
      <div>
        <div class="nofanscard"></div>
        <div>未领取</div>
      </div>
    </div>
    <div class="fans" @mouseenter="changeflagconditions(1)" @mouseleave="changeflagconditions(2)" @click="getfanslist()" v-if="islevel==true">
      <div>
        <div class="nofanscard1"><img :src="nowicon" style="width: 47px;height: 18px;"></div>
      </div>
    </div>
    <div class="changefansflag" v-if="changefansflag==true">
      <div class="changefansflag-back">
        <div style="margin-left:28px;font-size:18px;color:#1BB5EC;position:absolute;margin-top:20px">我的粉丝勋章</div>
        <happy-scroll color="rgb(249,183,33)" size="3" resize style="height:430px;width:336px;margin-left:10px;margin-top:66px;position:absolute" hide-horizontal>
          <div>
            <div v-for="(item,index) in fanslist" :key="index">
              <div style="display:flex;margin-bottom:10px">
                <div style="margin-left:21px;margin-right:12px"><img :src="item.icon" style="width: 47px;height: 18px;"></div>
                <div>{{item.name}}</div>
                <div v-if="item.isGet == 0 && item.isHave == 1" class="getnowfans" @click="getnowfans()">可领取</div>
                <div v-if="item.isGet == 0 && item.isHave == 0" class="getnowfans">不可领取</div>
              </div>
              <div style="display:flex;align-items:center;height: 26px;margin-bottom:10px" v-if="item.isGet == 1 || item.isGet == null" >
                <div v-if="item.status == 0"><div class="alchange" @click="alter(item.id)"></div></div>
                <div v-if="item.status == 1"><img src="@/assets/fans/alchange.png" style="width: 15px;height: 15px;margin-left: 21px;"></div>  
                <div style="margin-left:21px;margin-right:12px">Lv.{{item.level}}</div>
                <div style="width:120px;margin-left:15px;">
                  <el-progress :percentage="parseFloat(((item.intimacy/(item.needIntimacy+item.intimacy))*100).toFixed(1))" :text-inside=true :stroke-width="12"></el-progress>
                </div>
                <div style="margin-left:27px">Lv.{{item.level+1}}</div>
                <!-- <div>{{item.intimacy}}/{{item.needIntimacy+item.intimacy}}</div>  -->
              </div>
            </div>
          </div>
      </happy-scroll>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible1"
      style="margin-top:12vh"
      :modal=false>
      <div style="text-align:center;font-size: 24px;color: #333333;margin-top:130px">领取成功</div>
      <div style="text-align:center;font-size: 24px;color: #333333;margin-top:20px">是否佩戴当前粉丝牌</div>
      <div style="text-align:center;margin-top:40px;display: flex;justify-content: center;margin-bottom:26px;">
        <div style="width: 160px;height: 60px;background: #1BB5EC;border-radius: 28px;font-size: 24px;color: #FFFFFF;line-height:60px;cursor:pointer;margin-right:40px" @click="dialogVisible1=false">取消</div>
        <div style="width: 160px;height: 60px;background: #1BB5EC;border-radius: 28px;font-size: 24px;color: #FFFFFF;line-height:60px;cursor:pointer;" @click="getwearFanCard()">佩戴</div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      style="margin-top:12vh"
      :modal=false
      width="30%">
      <div style="text-align:center;font-size: 24px;color: #333333;">是否领取</div>
      <div style="text-align:center;font-size: 24px;color: #333333;margin-top:20px">专属主播粉丝勋章</div>
      <div style="text-align:center;margin-top:40px"><img :src="nowreceive.icon"></div>
      <div style="text-align:center;margin-top:40px;display: flex;justify-content: center;margin-bottom:26px">
        <div style="width: 424px;height: 60px;background: #1BB5EC;border-radius: 28px;font-size: 24px;color: #FFFFFF;line-height:60px;cursor:pointer;" @click="Getfancard()">领取</div>
      </div>
    </el-dialog>
    <el-button class="btn" :class="{'login': isLogin}" @click.stop="handleSend">发布</el-button>
    <!--<div class="btn" :class="{'login': isLogin}">发布</div>-->
  </div>
</template>

<script>
  import { Input, Button, Popover, Dialog, Message, Progress } from 'element-ui'
  import setTime from "@/utils/setTime";
  import { throttle } from "@/utils/debounceAndthrottle";
  import {addMesNum, findFanCard, getFanCard, wearFanCard, getLevel, getChannelFanCard} from "@/api/api"

  export default {
    name: 'LiveroomInput',
    components: {
      [Input.name]: Input,
      [Button.name]: Button,
      [Popover.name]: Popover,
      [Dialog.name]: Dialog,
      [Message.name]: Message,
      [Progress.name]: Progress,
    },
    data() {
      return {
        textarea: "",
        flag:false,
        flagconditions:false,
        dialogVisible:false,
        dialogVisible1:false,
        nowreceive:[],
        islevel:false,
        nowicon:"",
        fanslist:[],
        changefansflag:false
      }
    },
    props: {
      userInfo: {
        type: Object
      },
      channelInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      },
      banText: function () {
        if (this.userInfo.forbidEndTime) {
          let time = setTime(this.userInfo.forbidEndTime)
          // 于2019-12-23 19:30:00解封
          return `于${ time.timeStr }解封`
        }
        return ''
      }
    },
    methods: {
      //直播间粉丝牌列表获取粉丝牌
      getnowfans() {
        this.Getfancard()
      },
      //切换粉丝牌
      alter(id) {
        let data = {
        cid:id
      }
        wearFanCard(data).then((res) => {
        })
        this.changefansflag = false
        Message.success({
              message: "粉丝牌切换成功",
            });
        this.GetLevel();
      },
      //打开直播间粉丝牌列表
      getfanslist() {
        this.changefansflag = !this.changefansflag
        this.GetChannelFanCard();
      },
      //直播间粉丝牌列表
      GetChannelFanCard() {
        let data = {
        cid:this.channelInfo.id
      }
        getChannelFanCard(data).then((res) => {
          this.fanslist = res.data
          console.log("sadfakjffhjgg000",res)
        })
      },
      //是否佩戴粉丝牌
      getwearFanCard() {
        let data = {
        cid:this.channelInfo.id
      }
        wearFanCard(data).then((res) => {
        })
        this.changefansflag = false
        this.dialogVisible1 = false
        Message.success({
              message: "佩戴成功",
            });
      },
      //领取粉丝牌页面
      Getfancard() {
        let data = {
        cid:this.channelInfo.id
      }
        getFanCard(data).then((res) => {
          console.log("之前是否有领粉丝牌",res)
        })
        this.dialogVisible = false
        this.dialogVisible1 = true
      },
      //是否可以领取粉丝牌
      getfindFanCard() {
        let data = {
          cid:this.channelInfo.id
        }
        findFanCard(data).then((res) => {
          this.nowreceive = res.data
          // this.dialogVisible1 = true
          if(res.code == 500) {
            Message.success({
              message: "该主播未申请粉丝牌",
            });
          } else if(res.data.isHave == 1){
            this.dialogVisible = true
          } else if(res.data.isHave == 0){
            Message.success({
              message: "未达到领取条件，还差"+res.data.userCoin+"积分",
            });
          }
          console.log("asdfadfaa",res)
      });
      },
      //用户实时等级
      GetLevel() {
        getLevel().then((res) => {
          if(res.data.userFanCard != null) {
            this.islevel = true
            this.nowicon = res.data.userFanCard.icon
          } else{
            this.islevel = false
          }
        })
        // this.GetChannelFanCard()
      },
      receive() {
        this.getfindFanCard()
      },
      more() {
        this.$router.push({ path: '/fans' })
      },
      setTime: setTime,
      // handleSend() {
      //   if (!this.textarea) return;
      //   this.$emit('sendMsg', this.textarea)
      //   this.textarea = "";
      // },
      handleSend: throttle(function () {
        if (!this.textarea) return;
        this.$emit('sendMsg', this.textarea)
        this.textarea = "";
        this.getaddMesNum()
      }, 2000),
      getaddMesNum () {
        console.log("发送弹幕id====",this.channelInfo.id)
        let data = {
            cid:this.channelInfo.id,
          }
        addMesNum(data).then((res) => {
      });
      },
      changeImageSrc(index) {
        if(index===1) {
          this.flag = true
        } else{
          this.flag = false
        }
      },
      changeflagconditions(index) {
        if(index===1) {
          this.flagconditions = true
        } else{
          this.flagconditions = false
        }
      },
    },
    mounted() {
      // this.getfindFanCard()
      this.GetLevel();
    //   setTimeout(() => {
    //     this.GetChannelFanCard();
    //  }, 200);
    },
    watch: {
    channelInfo(a) {
      console.log("watch",a);
    },
  },
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .live-input {
    position: relative;
    margin-top: 32px;
    height: 54px;
    padding-left: 12px;
    padding-right: 11px;
    margin-bottom: 20px;
    display: flex;

    ::v-deep .el-textarea {
      width: 80%;
      display: inline-block;
    }

    ::v-deep .el-textarea__inner {
      box-sizing: border-box;
      border-radius: 4px 0 0 4px;
      padding-left: 80px;
    }

    .btn {
      display: inline-block;
      width: 20%;
      height: 54px;
      /*line-height: 54px;*/
      text-align: center;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      border-radius: 0 4px 4px 0;
      border: 0 none;
      background-color: $color-border-input;

      &.login {
        background-color: $color-main;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 12px;
      z-index: 1;
      margin-right: 82px;
      width: 265px;
      height: 100%;
      line-height: 54px;
      font-size: 14px;
      text-align: center;
    }

    .mask-ban {
      color: $color-title2;
    }

    .mask-login {
      color: $color-title3;

      span {
        cursor: pointer;
        color: $color-main;
      }
    }
  }
  .fans {
    height: 54px;
    width: 80px;
    // background: rgb(246, 252, 255);
    position: absolute;
    border-right: #999999;
    text-align: center;
    color:#999999;
    font-size: 12px;
    cursor: pointer;
  }
  .nofanscard {
    margin-left: 15px;
    margin-top: 8px;
    margin-bottom: 5px;
    width: 45px;
    height: 19px;
    border-radius: 5px;
    border: 1px solid #D8D8D8;
  }

  .nofanscard1 {
    margin-left: 15px;
    margin-top: 18px;
    margin-bottom: 5px;
    width: 45px;
    height: 19px;
  }

  .fanmessage {
    position: absolute;
    z-index:5;
    top: -26px;
    left: 34px;
  }
  .paintingmessage {
    position: absolute;
    z-index:5;
    top: -162px;
  }
  .paintingmessage-back {
  background: url(../../assets/fans/paintingback.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  height: 140px;
  width: 356px;
  }
  .conditionsmessage {
    position: absolute;
    z-index:5;
    top: -102px;
  }
  .conditionsmessage-back {
  background: url(../../assets/fans/conditions.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  height: 108px;
  width: 356px;
  }
  .changefansflag-back {
  background: url(../../assets/fans/changefans.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  height: 542px;
  width: 356px;
  }
  .changefansflag {
    position: absolute;
    z-index:5;
    top: -524px;
  }
  .changebarrage {
    display: flex;
  }
  .change1 {
    width: 40px;
    height: 40px;
    border: 3px solid #F3F3F3;
    border-radius: 150px;
    margin-left: 25px;
    margin-top: 24px;
    line-height: 40px;
    text-align: center;
  }
  .change2 {
    width: 40px;
    height: 40px;
    background: #77BF39;
    border: 1px solid #FFFFFF;
    border-radius: 150px;
    margin-left: 10px;
    margin-top: 24px;
  }
  
  .change3 {
    width: 40px;
    height: 40px;
    background: #815BE6;
    border: 1px solid #FFFFFF;
    border-radius: 150px;
    margin-left: 10px;
    margin-top: 24px;
  }

  .change4 {
    width: 40px;
    height: 40px;
    background: #F6695D;
    border: 1px solid #FFFFFF;
    border-radius: 150px;
    margin-left: 10px;
    margin-top: 24px;
  }

  .change5 {
    width: 40px;
    height: 40px;
    background: #5D7AF6;
    border: 1px solid #FFFFFF;
    border-radius: 150px;
    margin-left: 10px;
    margin-top: 24px;
  }

  .change6 {
    width: 40px;
    height: 40px;
    background: #F6A95D;
    border: 1px solid #FFFFFF;
    border-radius: 150px;
    margin-left: 10px;
    margin-top: 24px;
  }
  .change {
    margin-top: 4px;
    margin-left: 8px;
  }
  ::v-deep .el-dialog__wrapper .el-dialog {
    // width: 30%;
    background: url(../../assets/fans/iswear.png) no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    width: 442px;
    height: 505px;
  }

  .alchange {
    width: 12px;
    height: 12px;
    border: #999999 solid 2px;
    border-radius: 150px;
    margin-left: 21px;
    cursor: pointer;
  }

::v-deep .el-progress-bar__innerText {
  margin-bottom: 6px;
}

.getnowfans {
  margin-left: 20px;
  border-radius: 10px;
  border: rgb(107, 181, 241) solid 1px;
  color: rgb(107, 181, 241);
  text-align: center;
  width: 60px;
  cursor: pointer;
}
</style>
