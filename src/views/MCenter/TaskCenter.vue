<template>
  <section class="apply me-wrap">
    <div
      style="font-size:24px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:20px;"
    >任务中心</div>
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
            <el-progress :percentage=percent color='#F9772A'></el-progress>
          </div>
          <div class="percentnum">{{percentnum}}</div>
          <!-- <div>
            <img src="@/assets/task/nextrank.png" style="width:35px;height:16px" />
          </div> -->
        </div>
        <div
          style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#F9772A;margin-top:20px"
        >等级说明</div>
        <div
          style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(102,102,102,1);margin-top:4px"
        >提示：可以通过发送弹幕和赠送礼物，获得更多经验值</div>
      </div>
    </div>

    <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px;margin-bottom: 16px;"></div>

    <div class="new-old">
      <div style="width:96px;height:28px;font-size:20px;margin-left:44px;line-height:28px">
        <button class="new-task" @click="changeblue()" ref="newtask">新手任务</button>
      </div>
      <div style="width:96px;height:28px;margin-left:60px;line-height:28px">
        <button class="old-task" @click="changeblue()" ref="oldtask">日常任务</button>
      </div>
    </div>
    <div style="display:flex;height:4px;width:100%;margin-bottom:18px">
      <div class="blueone" v-if="showblue==true"></div>
      <div class="bluetow" v-if="showblue==false"></div>
    </div>
    <!-- 新手任务 -->
    <div v-if="showblue == true && taskOrder == 1" class="daytest">
      <div v-for="(item,indexn) in newlist" :key="indexn">
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src= item.url style="width:44px;height:44px"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">{{item.name}}</div><div class="task-reward">获取积分{{item.coin}}，获得经验{{item.experience}}</div></div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider" v-if="indexn%2==0"></div>
      </div>
      </div>
    </div>
    <!-- 日常任务 -->
    <div v-if="showblue == false && taskOrder == 1" class="daytest">
      <div v-for="(item,index) in daylist" :key="index">
        <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src=item.url style="width:44px;height:44px"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">{{item.name}}</div><div class="task-reward">获取积分{{item.coin}},获得经验{{item.experience}}</div></div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider" v-if="index%2==0"></div>
        </div>
      </div>
    </div>
    <!-- 日常任务 -->
    <div v-if="showblue == true && taskOrder == 2" class="daytest">
      <div v-for="(item,index) in daylist" :key="index">
        <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src=item.url style="width:44px;height:44px"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">{{item.name}}</div><div class="task-reward">获取积分{{item.coin}},获得经验{{item.experience}}</div></div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider" v-if="index%2==0"></div>
        </div>
      </div>
    </div>
    <!-- 新手任务 -->
    <div v-if="showblue == false && taskOrder == 2" class="daytest">
      <div v-for="(item,indexn) in newlist" :key="indexn">
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src= item.url style="width:44px;height:44px"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">{{item.name}}</div><div class="task-reward">获取积分{{item.coin}}，获得经验{{item.experience}}</div></div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="item.status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider" v-if="indexn%2==0"></div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cropper from "@/components/MCenter/Cropper.vue";
import { Progress } from "element-ui";
import { newTaskList, dayTaskList } from "@/api/api";
import { usersLoginInfo } from "@/api/mcenterapi";
import { loginInfo } from "@/api/liveroom";

export default {
  name: "TaskCenter",
  components: {
    Cropper,
    [Progress.name]: Progress,
  },
  data() {
    return {
      squareUrl: "",
      userName: "",
      showblue: true,
      levellist:[],
      newlist:[],
      daylist:[],
      percent:0,
      percentnum:'',
      taskOrder:"",
    };
  },
  methods: {
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
          this.taskOrder = this.levellist.taskOrder
          console.log("个人信息9",res)
          console.log("个人信息9",parseFloat(((this.levellist.experience/(this.levellist.experience + this.levellist.needExperience))*100).toFixed(1)))
          // this.balance = res.data.accountDto.miCoin.balance
        })
      },
    //     updataImg(url) {
    //     this.squareUrl = url;
    //     let data =
    //       {
    //         avatarUrl: url
    //       };
    //     this.updateUser(data, '头像上传成功')
    //   },

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
    getnewTaskList() {
      newTaskList().then((res) => {
        this.newlist = res.data
        // console.log("9999999999999999989999999",this.newlist)
      });
    },
    getdayTaskList() {
      dayTaskList().then((res) => {
        this.daylist = res.data
        // console.log("11111111111111111111276",this.daylist)
      });
    },
  },
  mounted() {
    this.usersLoginInfo();
    this.getHomeUserInfo();
    if(this.$store.state.userStatus.userInfo.uid) {
      this.getnewTaskList();
    }
    if(this.$store.state.userStatus.userInfo.uid) {
      this.getdayTaskList();
    }
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
  background: #F9772A;
  border-radius: 2px;
  margin-left: 71px;
}

.bluetow {
  width: 38px;
  height: 4px;
  background: #F9772A;
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
</style>