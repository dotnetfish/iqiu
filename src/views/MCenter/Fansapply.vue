<template>
  <section class="apply me-wrap">
    <div class="baseinformation">
      <div style="margin-right:20px">
        <img :src="squareUrl" alt="logo" style="width:120px;height:120px;border-radius: 50%" />
      </div>
      <div>
        <div
          style="font-size:18px;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:rgba(51,51,51,1);margin-top:32px"
        >{{userName}}</div>
        <div
          style="font-size:18px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(83,199,241,1);margin-top:20px"
        ><span style="color:rgba(51,51,51,1)">ID:</span>{{userid}}</div>
    </div>
    </div>
    <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px;margin-bottom: 16px;"></div>
    <div style="display:flex">
        <div style="width:120px;height:40px;line-height:40px;font-size:18px;">粉丝牌名称:</div>
        <el-input v-model="fansname" style="width:300px"></el-input>
    </div>
    <div class="rules">需要三个汉字或四个数字/英文/中英数结合</div>
    <div style="margin-left:120px"><el-button class="submit" @click="submit">提交</el-button></div>

  </section>
</template>

<script>
import Cropper from "@/components/MCenter/Cropper.vue";
import { Button, Input, Message} from "element-ui";
import { FanCardadd } from "@/api/api";
import { usersLoginInfo } from "@/api/mcenterapi";
import { loginInfo } from "@/api/liveroom";

export default {
  name: "Mymedal",
  components: {
    Cropper,
    [Button.name]: Button,
    [Input.name]: Input,
    [Message.name]: Message,
  },
  data() {
    return {
      squareUrl: "",
      userName: "",
      userid:"",
      // levellist:[],
      fansname:"",
    };
  },
  created: {
    //   getmyFanCardList() {
    //       myFanCardList().then((res)=>{
    //           console.log("我的粉丝牌列表=",res.data)
    //           this.myfanscardlist = res.data
    //       })
    //   },
  },
  methods: {
    submit() {
    var FloatRegex = /^([\u4e00-\u9fa5]{3,3}|[a-zA-Z]{4,4}|[0-9]{4,4}|(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![\u4e00-\u9fa5]+$)^.{4,4})$/;
      if (!FloatRegex.test(this.fansname)) {
        Message.error({
              message: "格式错误",
            });
      } else {
        let data = {
          name: this.fansname
        }
        FanCardadd(data).then(res => {
          console.log(res)
          if(res.code == 0){
            Message.success({
              message: "申请成功,待审核",
            });
          } else{
            Message.error({
              message: res.msg,
            });
          }
        })
      }
      },
    getHomeUserInfo () {
        loginInfo().then(res => {
          // this.levellist = res.data.userLevelDto;
          // console.log("个人信息9",res)
          // console.log("个人信息9",parseFloat(((this.levellist.experience/(this.levellist.experience + this.levellist.needExperience))*100).toFixed(1)))
        })
      },
    usersLoginInfo() {
      usersLoginInfo()
        .then((response) => {
          if (response.code === 0) {
            this.squareUrl = response.data.avatarUrl;
            this.userName = response.data.uname;
            this.userid = response.data.id;
          } else {
            console.error(response.error);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  mounted() {
    this.usersLoginInfo();
    this.getHomeUserInfo();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_index.scss";
.apply {
  padding: 28px;
  line-height: 1;
  color: $color-title1;
  font-size: 14px;

  .apply-title {
    margin-bottom: 30px;
    font-size: 28px;
    text-align: center;
  }
}
.baseinformation {
  display: flex;
  height: 120px;
  width: 100%;
  // border: rgb(221, 221, 245) solid 1px;
}

.done {
  width:66px;
  height:28px;
  background:rgba(83,199,241,1);
  border-radius:14px;
  border:0;
  color: #fff;
  outline: 0;
}

.nodone {
  width:66px;
  height:28px;
  border-radius:14px;
  border:2px solid rgba(153,153,153,1);
  background:rgb(255, 255, 255);
  color: rgba(153,153,153,1);
}

.merge {
  display: flex;
  height: 75px;
  width: 452px;
  align-items: center;
}

.divider {
  width:0px;
  height:45px;
  border:1px solid rgba(240,240,240,1);
  margin-right: 27px;
}

.daytest {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

::v-deep .el-progress__text {
 display: none;
}

.percentnum {
  margin-left: -34px;
}

.rules {
margin-left: 120px; 
font-size: 16px;
color: #666666;
line-height: 25px;
margin-top: 10px;
margin-bottom: 30px;
}

.submit {
    width: 160px;
    background: #1BB5EC;
    color: rgb(255, 255, 255);
}
</style>