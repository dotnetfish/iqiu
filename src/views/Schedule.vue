<template>
  <div>
    <LeftSideBar></LeftSideBar>

    <div class="title">
      <span class="titlesign">赛程</span>
    </div>

    <div class="alldate">
      <el-button class="datebutton" :autofocus="true">
        <div class="nowweek">{{nowWeek}}</div>
        <div class="nowdate">{{nowDate}}</div>
      </el-button>
      <el-button class="datebutton">
        <div class="nowweek">{{nowWeek1}}</div>
        <div class="nowdate">{{nowDate1}}</div>
      </el-button>
      <el-button class="datebutton">
        <div class="nowweek">{{nowWeek2}}</div>
        <div class="nowdate">{{nowDate2}}</div>
      </el-button>
      <el-button class="datebutton">
        <div class="nowweek">{{nowWeek3}}</div>
        <div class="nowdate">{{nowDate3}}</div>
      </el-button>
      <el-button class="datebutton">
        <div class="nowweek">{{nowWeek4}}</div>
        <div class="nowdate">{{nowDate4}}</div>
      </el-button>
      <el-button class="datebutton">
        <div class="nowweek">{{nowWeek5}}</div>
        <div class="nowdate">{{nowDate5}}</div>
      </el-button>
      <el-button class="datebutton">
        <div class="nowweek">{{nowWeek6}}</div>
        <div class="nowdate">{{nowDate6}}</div>
      </el-button>
    </div>

    <div class="game-date">
      <div class="bluestrip"></div>
      <div class="Game-Date">7月22日</div>
    </div>

    <div class="gameinformation">
      <div class="information1">
        <div class="leftinformation">
          <div class="information-title">英超第35轮</div>
          <div class="information-time">01:00</div>
          <div class="information-state">
            <button class="state1" ref="already" @click="appointment()">{{appoint}}</button>
          </div>
        </div>
        <!-- <router-link :to="{name:'live-broadcast'}"> -->
        <div class="centreinformation" @click="live()">
          <div class="team1">
            <div class="team-icon">
              <img src="@/assets/icon_nofollow.png" class="icon1" />
            </div>
            <div class="team-name">八一英超</div>
            <div class="team-score">0</div>
          </div>
          <div class="team2">
            <div class="team-icon">
              <img src="@/assets/icon_nofollow.png" class="icon1" />
            </div>
            <div class="team-name">托特纳姆尔兹…</div>
            <div class="team-score">0</div>
          </div>
        </div>
        <!-- </router-link> -->
        <div class="rightinformation">
          <div class="live" @click="live()"></div>
          <div class="people">
            <img src="@/assets/icon_nologin@2x.png" class="people1" />
          </div>
          <div class="people">
            <img src="@/assets/icon_nologin@2x.png" class="people1" />
          </div>
          <div class="people">
            <img src="@/assets/icon_nologin@2x.png" class="people1" />
          </div>
          <div class="people">
            <img src="@/assets/icon_nologin@2x.png" class="people1" />
          </div>
          <div class="people">
            <img src="@/assets/icon_nologin@2x.png" class="people1" />
          </div>
          <div class="people">
            <img src="@/assets/home/jiantou.png" class="allpeople" @click="dialogVisible = true" />
            <el-dialog :visible.sync="dialogVisible">
              <div class="flextitle">
                <div class="one"></div>
                <div class="dialogtitle">请选择一位主播</div>
                <div class="one"></div>
                <div class="Close">
                  <img src="@/assets/close.png" class="close" @click="dialogVisible = false" />
                </div>
              </div>
              <div class="all-head">
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
                <div class="head-portrait-name">
                  <img src="@/assets/icon_nosearch.png" class="head-portrait" />
                  <div class="photo-name">小鲤鱼</div>
                </div>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSideBar from "@/components/left-side-bar.vue";
import { Button, Dialog } from "element-ui";
// import {schedule} from '@/api/liveroom'
export default {
  data() {
    return {
      nowDate: "",
      nowDate1: "",
      nowDate2: "",
      nowDate3: "",
      nowDate4: "",
      nowDate5: "",
      nowDate6: "", // 当前日期
      // nowTime: "",    // 当前时间
      nowWeek: "", // 当前星期
      nowWeek1: "",
      nowWeek2: "",
      nowWeek3: "",
      nowWeek4: "",
      nowWeek5: "",
      nowWeek6: "",
      dialogVisible: false,
      flag:false,
      appoint:'预约'
    };
  },
  components: {
    LeftSideBar,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  methods: {
    live() {
      this.$router.push('/live-broadcast');
    },
    currentTime() {
      setInterval(this.getDate, 20);
    },
    //计算一礼拜的日期
    getDate: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let d = new Date(yy, mm, 0);
      d = d.getDate();
      let week1 = new Date().getDay();
      if (week1 == 1) {
        this.nowWeek = "星期一";
        this.nowWeek1 = "星期二";
        this.nowWeek2 = "星期三";
        this.nowWeek3 = "星期四";
        this.nowWeek4 = "星期五";
        this.nowWeek5 = "星期六";
        this.nowWeek6 = "星期日";
      } else if (week1 == 2) {
        this.nowWeek = "星期二";
        this.nowWeek1 = "星期三";
        this.nowWeek2 = "星期四";
        this.nowWeek3 = "星期五";
        this.nowWeek4 = "星期六";
        this.nowWeek5 = "星期日";
        this.nowWeek6 = "星期一";
      } else if (week1 == 3) {
        this.nowWeek = "星期三";
        this.nowWeek1 = "星期四";
        this.nowWeek2 = "星期五";
        this.nowWeek3 = "星期六";
        this.nowWeek4 = "星期日";
        this.nowWeek5 = "星期一";
        this.nowWeek6 = "星期二";
      } else if (week1 == 4) {
        this.nowWeek = "星期四";
        this.nowWeek1 = "星期五";
        this.nowWeek2 = "星期六";
        this.nowWeek3 = "星期日";
        this.nowWeek4 = "星期一";
        this.nowWeek5 = "星期二";
        this.nowWeek6 = "星期三";
      } else if (week1 == 5) {
        this.nowWeek = "星期五";
        this.nowWeek1 = "星期六";
        this.nowWeek2 = "星期日";
        this.nowWeek3 = "星期一";
        this.nowWeek4 = "星期二";
        this.nowWeek5 = "星期三";
        this.nowWeek6 = "星期四";
      } else if (week1 == 6) {
        this.nowWeek = "星期六";
        this.nowWeek1 = "星期日";
        this.nowWeek2 = "星期一";
        this.nowWeek3 = "星期二";
        this.nowWeek4 = "星期三";
        this.nowWeek5 = "星期四";
        this.nowWeek6 = "星期五";
      } else {
        this.nowWeek = "星期日";
        this.nowWeek1 = "星期一";
        this.nowWeek2 = "星期二";
        this.nowWeek3 = "星期三";
        this.nowWeek4 = "星期四";
        this.nowWeek5 = "星期五";
        this.nowWeek6 = "星期六";
      }
      // _this.nowTime = hh + ":" + mf;
      _this.nowDate = mm + "/" + dd;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      _this.nowDate1 = mm + "/" + dd;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      _this.nowDate2 = mm + "/" + dd;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      _this.nowDate3 = mm + "/" + dd;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      _this.nowDate4 = mm + "/" + dd;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      _this.nowDate5 = mm + "/" + dd;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      _this.nowDate6 = mm + "/" + dd;
    },
    // 销毁定时器
    beforeDestroy: function() {
      if (this.getDate) {
        console.log("销毁定时器");
        clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
      }
    },
    appointment() {
      this.flag = !this.flag;
      if(this.flag==true){
        this.$refs.already.style.color = 'rgb(255,255,255)';
      this.$refs.already.style.background = 'rgba(27,181,236,1)';
      this.appoint='已预约'
      }else {
        this.$refs.already.style.color = '#1bb5ec';
      this.$refs.already.style.background = 'rgba(255, 255, 255, 1)';
      this.appoint='预约'
      }
    },
  },
  // created() {
  //     schedule().then(res =>{
  //         console.log(res)
  //     })
  // },
  mounted() {
    this.currentTime();
  }
};
</script>

<style lang="scss" scoped>
.title {
  width: 80%;
  height: 60px;
  background-color: rgb(255, 255, 255);
  margin-top: 30px;
}

.titlesign {
  font-size: 20px;
  line-height: 60px;
  margin-left: 47.8%;
  color: rgba(27, 181, 236, 1);
}

.alldate {
  width: 80%;
  height: 60px;
  background-color: #fff;
  margin-top: 30px;
  display: flex;
}

.datebutton {
  border: 0px;
  width: 13.1%;
  height: 50px;
  margin-left: 10px;
  margin-top: 4px;
}

.nowweek {
  font-weight: bold;
  font-size: 16px;
  margin-top: -3px;
}

.nowdate {
  margin-top: 8px;
}

.game-date {
  width: 80%;
  height: 60px;
  display: flex;
}

.bluestrip {
  width: 4px;
  height: 20px;
  margin-top: 20px;
  background: rgba(27, 181, 236, 1);
}

.Game-Date {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 60px;
  margin-left: 6px;
}

.gameinformation {
  width: 80%;
  height: 360px;
  background-color: #fff;
}

.information1 {
  width: 100%;
  height: 120px;
  background-color: #fff;
  border: 1px solid rgba(240, 240, 240, 1);
  display: flex;
}

.leftinformation {
  width: 13%;
  // border: 1px solid rgba(240, 240, 240, 1);
}

.centreinformation {
  width: 27%;
  // border: 1px solid rgba(240, 240, 240, 1);
}

.rightinformation {
  position: relative;
  width: 60%;
  // border: 1px solid rgba(240, 240, 240, 1);
  display: flex;
}

.live {
  width: 498px;
  height: 120px;
  position: absolute;
  z-index: 2;
}

.information-title {
  width: 100%;
  height: 26px;
  margin-top: 7px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.information-time {
  width: 100%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.information-state {
  width: 100%;
  height: 45px;
}

.state1 {
  width: 62px;
  height: 25px;
  line-height: 25px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(27, 181, 236, 1);
  color: #1bb5ec;
  margin-left: 30px;
  margin-top: 5px;
  outline: 0;
}

.team1 {
  width: 100%;
  height: 60px;
  display: flex;
}

.team2 {
  width: 100%;
  height: 60px;
  display: flex;
}

.team-icon {
  width: 60px;
  height: 60px;
  // border: 1px solid rgba(27, 181, 236, 1);
}

.icon1 {
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
}

.team-name {
  width: 58%;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  // border: 1px solid rgba(27, 181, 236, 1);
}

.team-score {
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.people {
  width: 105px;
  height: 120px;
}

.people1 {
  width: 80px;
  height: 80px;
  margin-top: 20px;
  border-radius: 150px;
}

.allpeople {
  width: 32px;
  height: 32px;
  margin-top: 44px;
  margin-left: 20px;
}

::v-deep .el-dialog {
  width: 717px;
  height: 563px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  // border: 1px solid rgba(151, 151, 151, 1);
}

.flextitle {
  display: flex;
  margin: 0 auto;
  width: 544px;
  margin-bottom: 44px;
}

.one {
  width: 170px;
  height: 1px;
  background: rgba(216, 216, 216, 1);
  margin-top: 10px;
}

.Close {
  position: absolute;
  margin-left: 568px;
  margin-top: -40px;
}

.close {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 1);
}

.dialogtitle {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  margin-left: 18px;
  margin-right: 18px;
}

.all-head {
  display: flex;
  flex-wrap: wrap;
  padding-left: 69px;
}

.head-portrait-name {
  width: 80px;
  height: 120px;
  margin-right: 71px;
  margin-top: 10px;
}

.head-portrait {
  height: 80px;
  width: 80px;
}

.photo-name {
  text-align: center;
  margin-top: 14px;
}
</style>