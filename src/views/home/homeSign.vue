<template>

  <div class="bj" v-if="status==0">
    <el-dialog
        :visible.sync="signDialogVisible"
        width="444px" 
      >
    <div class="sign-bj">
      <!-- <div class="thday"> -->
      <happy-scroll color="rgb(249,183,33)" size="3" resize style="height:300px;margin-top:212px" hide-horizontal :scroll-top=num>
      <div class="thday">
        <div v-for="(item,index) in signlists" :key="index" style="width:96px">
            <div class="week1" v-if="item.flag==0"><div class="daycount">第{{item.day}}天</div><img src="@/assets/sign/one.png" style="width:85px;height:110px"/></div>
            <div class="week1" v-if="item.flag==1"><img src="@/assets/sign/alone.png" style="width:85px;height:110px"></div>
        </div>
      </div>
      </happy-scroll>
      <!-- </div> -->
      <div class="continuous">已经连续签到<span style="color:red">{{this.count}}</span>天</div>
      <div style="width:342px;height:45px;margin-top:-16px" v-if="status == 0"><button class="sign-in" @click="getsignadd()">马上签到</button></div>
      <!-- <div class="reward" v-if="task.task">
        <img src="@/assets/sign/reward.png" style="margin-top:180px">
        <div v-if="task.task" style="width:100%;text-align:center;">获取积分{{task.task[0].coin}},获得经验{{task.task[0].experience}}</div>
        <div v-if="task.gift" style="width:100%;text-align:center;">获得{{task.gift.name}}x{{task.gift.num}}</div>
      </div> -->
      <div style="width:342px;height:45px;margin-top:-16px" v-if="status == 1"><button class="alsign-in">已签到</button></div>
    </div>
    </el-dialog>
    <!-- <el-dialog
        :visible.sync="rewardDialogVisible"
        width="0px"
      > -->
    <div class="reward" v-if="flagreward==true">
      <img src="@/assets/sign/reward.png" style="margin-top:200px;margin-bottom:14px">
        <div v-for="(item,index) in task.task" :key="index">
          <div v-if="task.task" style="width:100%;text-align:center;color:white">获取积分{{item.coin}},获得经验{{item.experience}}</div>
        </div>
        <div v-if="task.gift" style="width:100%;text-align:center;color:white">获得{{task.gift.name}}x{{task.gift.num}}</div>
    </div>
      <!-- </el-dialog> -->
  </div>
</template>

<script>
import { Dialog } from "element-ui"
import { signlist, signadd } from "@/api/api";
export default {
  name: "homeSign",
  components: {
    [Dialog.name]: Dialog,
  },
  data () {
    return {
      signDialogVisible:true,
      signlists:[],
      status:1,
      scrollTop: 0,
      num:5,
      num1:5,
      task:[],
      flagreward:false,
      count:0,
    }
  },
  updated () {
    this.num = 260 * this.num1
  },
  methods: {
    getsignlist() {
      signlist().then((res) => {
        console.log("555555555555",res)
        this.signlists = res.data.list
        this.status = res.data.status
        this.task = res
        this.num1 = Math.floor((res.data.count)/8)
        this.count = res.data.count
      });
    },
    getsignadd() {
      if(this.status == 0){
        signadd().then((res) => {
          // console.log("5555555555551212",res)
          this.task = res
        })
        this.signDialogVisible = false
        this.rewardsign()
      }
      // var a = document.querySelector("body");
      this.Getsignlist()
    },
    Getsignlist() {
      signlist().then((res) => {
        this.signlists = res.data.list
        this.status = res.data.status
      });
    },
    rewardsign() {
      // var a = document.querySelector("body");
      this.flagreward = true
      document.querySelector('body').setAttribute('style','overflow:hidden;')
      setTimeout(() => {
        this.flagreward = false
        document.querySelector('body').removeAttribute('style','overflow:hidden;')
     }, 1500);

    }
  },
  mounted() {
    this.getsignlist()
  }
};
</script>

<style lang="scss" scoped>
// .bj {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(53, 53, 53, 0.658);
//     z-index: 9;
// }
.sign-bj {
  position: absolute;
  width: 444px;
  height: 653px;
  background: url(../../assets/sign/beijing.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  z-index: 10;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  right:0;
  left:0;
  margin:0 auto;
  text-align:center;
//   margin-left: 600px;
  margin-top: -26%;
}
.week1 {
    // margin-top: 208px;
    margin-left: 3px;
    width: 86px;
    height: 95px;
    margin-bottom: 36px;
}

.week2 {
    margin-left: 3px;
    width: 107px;
    height: 95px;
}

.sign-in {
    width: 342px;
    height: 58px;
    background:linear-gradient(0deg,rgba(249,183,33,1),rgba(249,183,33,1));
    border-radius:33px;
    color: #fff;
    border: 0;
    outline: 0;
    margin-left: 51px;
    font-size: 24px;
    cursor: pointer;
}

.alsign-in {
  width:342px;
  height:58px;
  background:rgb(205, 205, 205);
  border-radius:33px;
  color:#fff;
  border:0;
  outline:0;
  margin-left:51px;
  font-size:24px;
}
.daycount {
  position: absolute;
  width: 86px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}

.thday {
  position: relative;
  // margin-top:166px;
  width:100%;
  display: flex;
  flex-wrap: wrap;
  // overflow: hidden;
  height: 300px;
  padding-left: 30px;
}

// .happy-scroll-content {
//   display: flex;
//   flex-wrap: wrap;
//   width: 107px;
// }
.continuous {
  width: 100%;
  text-align: center;
  font-size: 16px;
}

::v-deep .el-dialog__header {
  background: rgba(0, 0, 0);
}

::v-deep .el-dialog__body {
  background: rgba(0, 0, 0);
}
.reward {
  // position: absolute;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color:rgba(54, 54, 54, 0.466);
  color:rgb(0, 0, 0);
  font-size: 20px;
  z-index: 999;
  text-align: center;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  overflow: hidden;
}
// .className {
//   overflow: hidden;
// }
</style>