<template>
  <section class="apply me-wrap">
    <div
      style="font-size:24px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:20px;"
    >我的勋章</div>
    <div class="baseinformation">
      <div style="margin-right:20px">
        <!-- <cropper @updataImg="updataImg"> -->
        <img :src="squareUrl" alt="logo" style="width:120px;height:120px;border-radius: 50%" />
        <!-- </cropper> -->
      </div>
      <div>
        <div
          style="font-size:16px;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:rgba(51,51,51,1);margin-top:17px"
        >{{userName}}</div>
        <div style="display:flex;margin-top:14px">
          <div>
            <img :src="levellist.icon" style="width:35px;height:16px" />
          </div>
          <div style="width:200px;margin-left:15px;">
            <el-progress :percentage=percent></el-progress>
          </div>
          <div class="percentnum">{{percentnum}}</div>
          <!-- <div>
            <img src="@/assets/task/nextrank.png" style="width:35px;height:16px" />
          </div> -->
        </div>
        <div
          style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(83,199,241,1);margin-top:20px"
        >等级说明</div>
        <div
          style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(102,102,102,1);margin-top:4px"
        >提示：可以通过发送弹幕和赠送礼物，获得更多经验值</div>
      </div>
    </div>

    <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px;margin-bottom: 16px;"></div>

    <div class="new-old">
      <div style="width:96px;height:28px;font-size:20px;margin-left:44px;line-height:28px">
        <button class="new-task" @click="changeblue()" ref="newtask">粉丝勋章</button>
      </div>
      <!-- <div style="width:96px;height:28px;margin-left:60px;line-height:28px">
        <button class="old-task" @click="changeblue()" ref="oldtask">日常任务</button>
      </div> -->
    </div>
    <div style="display:flex;height:4px;width:100%;margin-bottom:18px">
      <div class="blueone" v-if="showblue==true"></div>
      <div class="bluetow" v-if="showblue==false"></div>
    </div>
    <div class="nowfansbj">
        <div><img :src="myfanscardlist[0].avatar" style="width:60px;height:60px;margin-top:20px;margin-left:10px;border-radius:150px"></div>
        <div class="divier"></div>
        <div class="information">
            <div style="font-size: 16px;color: #1BB5EC;margin-top:17px;">{{myfanscardlist[0].uid}}</div>
            <div style="font-size: 12px;color: #666666;margin-top:12px;margin-bottom:12px">粉丝等级:{{myfanscardlist[0].level}}</div>
            <div style="font-size: 12px;color: #999999;display:flex;">
                <div>等级亲密度:</div>
                <div style="width:160px;margin-left:15px;">
            <el-progress :percentage="parseFloat(((myfanscardlist[0].intimacy/(myfanscardlist[0].needIntimacy+myfanscardlist[0].intimacy))*100).toFixed(1))"></el-progress>
                </div>
                <div class="percentnum">{{myfanscardlist[0].intimacy}}/{{myfanscardlist[0].intimacy+myfanscardlist[0].needIntimacy}}</div>
            </div>
        </div>
        <div class="alwearfans">已装备</div>
    </div>
    <el-table :data="myfanscardlist" style="width: 100%;">
      <el-table-column prop="id" header-align="center" align="center" label="勋章所属"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="勋章名称"></el-table-column>
      <el-table-column prop="level" header-align="center" align="center" label="勋章等级"></el-table-column>
      <el-table-column prop="intimacy,needIntimacy" header-align="center" align="center" label="勋章进度">
          <template slot-scope="scope">
          {{scope.row.intimacy}}/{{scope.row.intimacy+scope.row.needIntimacy}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="wear(scope.row.id)" v-if="scope.row.status==0">佩戴</el-button>
          <el-button type="text" size="small" v-if="scope.row.status==1">已佩戴</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import Cropper from "@/components/MCenter/Cropper.vue";
import { Progress, Table, TableColumn, Button} from "element-ui";
import { myFanCardList, wearFanCard } from "@/api/api";
import { usersLoginInfo } from "@/api/mcenterapi";
import { loginInfo } from "@/api/liveroom";

export default {
  name: "Mymedal",
  components: {
    Cropper,
    [Progress.name]: Progress,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
  },
  data() {
    return {
      squareUrl: "",
      userName: "",
      showblue: true,
      levellist:[],
      percent:0,
      percentnum:'',
      myfanscardlist:[],
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
      //佩戴粉丝牌
      wear(id) {
          let data = {
        cid:id
      }
          wearFanCard(data).then((res) => {
        })
        setTimeout(() => {
            this.getmyFanCardList()
        }, 200);
      },
      getmyFanCardList() {
          myFanCardList().then((res)=>{
              console.log("我的粉丝牌列表=",res.data)
              this.myfanscardlist = res.data
          })
      },
    changeblue() {
      this.showblue = !this.showblue;
      if(this.showblue == true) {
        this.$refs.newtask.style.color = 'rgba(51, 51, 51, 1)';
        this.$refs.oldtask.style.color = 'rgba(122,122,122,1)';
      }else{
        this.$refs.oldtask.style.color = 'rgba(51, 51, 51, 1)';
        this.$refs.newtask.style.color = 'rgba(122,122,122,1)';
      }
    },
    getHomeUserInfo () {
        loginInfo().then(res => {
          this.levellist = res.data.userLevelDto;
          this.percent = parseFloat(((this.levellist.experience/(this.levellist.experience + this.levellist.needExperience))*100).toFixed(1));
          this.percentnum = this.levellist.experience+"/"+(this.levellist.experience + this.levellist.needExperience)
          console.log("个人信息9",res)
          console.log("个人信息9",parseFloat(((this.levellist.experience/(this.levellist.experience + this.levellist.needExperience))*100).toFixed(1)))
        })
      },
    usersLoginInfo() {
      usersLoginInfo()
        .then((response) => {
          if (response.code === 0) {
            this.squareUrl = response.data.avatarUrl;
            this.userName = response.data.uname;
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
    this.getmyFanCardList();
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

.new-old {
  height: 28px;
  width: 100%;
  display: flex;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
}

.new-task {
  background-color: white;
  border: 0px;
  outline: 0;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
}

.old-task {
  background-color: white;
  border: 0px;
  outline: 0;
  color:rgba(122,122,122,1);
  cursor: pointer;
}

.blueone {
  width: 38px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 71px;
}

.bluetow {
  width: 38px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 227px;
}

.task {
  height: 44px;
  width: 100%;
  display: flex;
  // margin-bottom: 20px;
}

.task-title {
  height:22px;
  font-size:16px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:22px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.task-reward {
  height:17px;
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:17px;
  margin-top: 3px;
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

.nowfansbj{
width: 377px;
height: 100px;
background: #FFFFFF;
box-shadow: 0px 2px 4px 3px rgba(233, 233, 235, 0.72);
border-radius: 5px;
margin-bottom: 20px;
display: flex;
position: relative;
}

.divier{
    width: 1px;
    height: 70px;
    background: #D8D8D8;
    margin-top: 15px;
    margin-left: 15px;
}

.information{
    margin-left: 20px;
}

.alwearfans{
    width: 74px;
    height: 26px;
    line-height: 26px;
    color:rgb(0, 183, 255);
    border: rgb(0, 183, 255) solid 2px;
    border-radius: 30px;
    text-align: center;
    position: absolute;
    right: 16px;
    top: 16px;
}
</style>