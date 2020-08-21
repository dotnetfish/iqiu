<template>
  <div>
    <loginPop ref="login" ></loginPop>
    <LeftSideBar></LeftSideBar>

    <div class="title">
      <span class="titlesign">赛程</span>
    </div>

    <div class="alldate">
      <el-button class="datebutton" :autofocus="true" @click="getmatchList(nowDate,nowyear)">
        <div class="nowweek">{{nowWeek}}</div>
        <div class="nowdate">{{nowDate}}</div>
      </el-button>
      <el-button class="datebutton"  @click="getmatchList(nowDate1,nowyear)">
        <div class="nowweek">{{nowWeek1}}</div>
        <div class="nowdate">{{nowDate1}}</div>
      </el-button>
      <el-button class="datebutton"  @click="getmatchList(nowDate2,nowyear)">
        <div class="nowweek">{{nowWeek2}}</div>
        <div class="nowdate">{{nowDate2}}</div>
      </el-button>
      <el-button class="datebutton"  @click="getmatchList(nowDate3,nowyear)">
        <div class="nowweek">{{nowWeek3}}</div>
        <div class="nowdate">{{nowDate3}}</div>
      </el-button>
      <el-button class="datebutton"  @click="getmatchList(nowDate4,nowyear)">
        <div class="nowweek">{{nowWeek4}}</div>
        <div class="nowdate">{{nowDate4}}</div>
      </el-button>
      <el-button class="datebutton"  @click="getmatchList(nowDate5,nowyear)">
        <div class="nowweek">{{nowWeek5}}</div>
        <div class="nowdate">{{nowDate5}}</div>
      </el-button>
      <el-button class="datebutton"  @click="getmatchList(nowDate6,nowyear)">
        <div class="nowweek">{{nowWeek6}}</div>
        <div class="nowdate">{{nowDate6}}</div>
      </el-button>
    </div>

    <div class="game-date">
      <div class="bluestrip"></div>
      <div class="Game-Date">{{changedate}}</div>
      <!-- <button class="state1" ref="already" @click="AddmatchList()">{{appoint}}</button> -->
    </div>

    <div class="gameinformation">
      <div @click="goother()" class="none" v-if="schedulelist == null"><div><img src="@/assets/none.png"></div> <div>今日无比赛，去其他地方看看</div></div>
      <div v-for="(item,indexo) in schedulelist" :key="indexo">
        <div class="information1">
          <div class="leftinformation">
            <div class="information-title">{{item.name}}</div>
            <div class="information-time">{{item.startTime | formatDate}}</div>
            <div v-if="item.status==1">
              <div class="information-state" v-if="item.isOrder== 0">
                <img src="@/assets/schedule/appoint.png" style="position:absolute;width:16px;height:16px;margin-left: 39px;margin-top: 8.5px;" @click="getApplyStatus(item)">
                <button class="state1" @click="getApplyStatus(item)">预约</button>
              </div>
              <div class="information-state" v-else>
                <img src="@/assets/schedule/alappoint.png" style="position:absolute;width:16px;height:16px;margin-left: 39px;margin-top: 8.5px;" @click="getApplyStatus(item)">
                <button class="state2" @click="getApplyStatus(item)">已预约</button>
              </div>
            </div>
            <div v-if="item.status==3">
              <div class="information-state">
                <button class="state4">已结束</button>
              </div>
            </div>
            <div v-if="item.status==2">
              <div class="information-state">
                <button class="state5"><span class="word">直播中</span></button>
                <img src="https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.gif" style="position:absolute;width:16px;height:16px;margin-left: -22px;margin-top: 9.5px;" @click="getApplyStatus(item)">
              </div>
            </div>
          </div>
          <!-- <router-link :to="{name:'live-broadcast'}"> -->
          <div class="centreinformation" @click="live(item.id)">
            <div class="team1">
              <div class="team-icon">
                <img :src="item.teamOneLogo" class="icon1" />
              </div>
              <div class="team-name">{{item.teamOne}}</div>
              <div class="team-score">{{item.teamOneScore}}</div>
            </div>
            <div class="team2">
              <div class="team-icon">
                <img :src="item.teamTwoLogo" class="icon1" />
              </div>
              <div class="team-name">{{item.teamTwo}}</div>
              <div class="team-score">{{item.teamTwoScore}}</div>
            </div>
          </div>
          <!-- </router-link> -->
          <div class="rightinformation" v-if="item.status !==3" @click="live(item.id)">
            <!-- <div class="live" @click="live()"></div> -->
            <div v-for="(channel,indext) in item.channels" :key="indext">
              <div class="people" v-if="indext<5">
                <img :src="channel.avatarUrl" class="people1" />
              </div>
            </div>
            <div v-if="schedulelist[indexo].channels.length == 0" class="nopeople">暂时还没有主播在直播哦～</div>
          </div>
          <div class="peoplepull" v-if="schedulelist[indexo].channels.length < 6"><div class="allpeople"></div></div>
          <div class="peoplepull" v-if="schedulelist[indexo].channels.length > 5">
              <img src="@/assets/home/jiantou.png" class="allpeople" @click="dialog(indexo)" />
              <el-dialog :visible.sync="dialogVisible">
                <div class="flextitle">
                  <div class="one"></div>
                  <div class="dialogtitle">已预约主播</div>
                  <div class="one"></div>
                  <div class="Close">
                    <img src="@/assets/close.png" class="close" @click="dialogVisible = false" />
                  </div>
                </div>
                <div class="all-head">
                  <div v-for="(channel,indexf) in schedulelist[num].channels" :key="indexf">
                    <div class="head-portrait-name">
                      <img :src="channel.avatarUrl" class="head-portrait" />
                      <div class="photo-name">{{channel.uname}}</div>
                    </div>
                  </div>
                </div>
              </el-dialog>
            </div>
          <div class="end" v-if="item.status !==3">
            <div class="focus" v-if="schedulelist[indexo].channels.length != 0"> 
              <div class="information-state" v-if="item.isFollow == 0">
                <img src="@/assets/schedule/focus.png" style="position:absolute;width:13px;height:13px;margin-left: 42px;margin-top: 10.5px;" @click="focus(item)">
                <button class="state1" @click="focus(item)" >关注</button>
              </div>
              <div class="information-state" v-else>
                <img src="@/assets/schedule/alfocus.png" style="position:absolute;width:13px;height:13px;margin-left: 48px;margin-top: 10.5px;" @click="focus(item)">
                <button class="state2" @click="focus(item)" style="padding-left:22px">已关注</button>
              </div>
            </div>
            <div class="focus" v-if="schedulelist[indexo].channels.length == 0"> 
              <div class="information-state">
                <img src="@/assets/schedule/my.png" style="position:absolute;width:17px;height:11px;margin-left: 12px;margin-top: 12px;" @click="focus(item)">
                <button class="state3" @click="getApplyStatus(item)">我要直播</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSideBar from "@/components/left-side-bar.vue";
import loginPop from "@/components/login/loginTipPopup.vue";
// import channel from "@/views/channel.vue"
import storages from "@/utils/storage";
import { Button, Dialog } from "element-ui";
import { matchList, addmatchList, deletematchList, focusmatchList, nofocusmatchList, applyStatus } from "@/api/api";
// import {schedule} from '@/api/liveroom'
export default {
  data() {
    return {
      nowyear:"",
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
      flag: false,
      appoint: false,
      schedulelist: [],
      changedate:"",
      num:0,
      attenment:false,
      anchorStatus:0,
      nday:0,
      nmouth:0,
    };
  },
  //时间戳转换
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      return h + ":" + m;
    },
  },
  components: {
    LeftSideBar,
    loginPop,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
  methods: {
    live(mid) {
      this.$router.push({ path: '/live-broadcast', query: { mid } })
      // this.$router.push("/live-broadcast?id=2");
    },
    currentTime() {
      setInterval(this.getDate, 5);
    },
    dialog(index) {
      this.dialogVisible = true;
      this.num = index;
    },
    //计算一礼拜的日期
    getDate: function () {
      var _this = this;
      let DD = 0;
      let MM = 0;
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
      DD=dd;
      MM=mm;
      if(dd<10) {
        DD = '0'+dd
      }
      if(mm<10) {
        MM = '0'+mm
      }
      _this.nowDate = MM + "/" + DD;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      DD=dd;
      MM=mm;
      if(dd<10) {
        DD = '0'+dd
      }
      if(mm<10) {
        MM = '0'+mm
      }
      _this.nowDate1 = MM + "/" + DD;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      DD=dd;
      MM=mm;
      if(dd<10) {
        DD = '0'+dd
      }
      if(mm<10) {
        MM = '0'+mm
      }
      _this.nowDate2 = MM + "/" + DD;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      DD=dd;
      MM=mm;
      if(dd<10) {
        DD = '0'+dd
      }
      if(mm<10) {
        MM = '0'+mm
      }
      _this.nowDate3 = MM + "/" + DD;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      DD=dd;
      MM=mm;
      if(dd<10) {
        DD = '0'+dd
      }
      if(mm<10) {
        MM = '0'+mm
      }
      _this.nowDate4 = MM + "/" + DD;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      DD=dd;
      MM=mm;
      if(dd<10) {
        DD = '0'+dd
      }
      if(mm<10) {
        MM = '0'+mm
      }
      _this.nowDate5 = MM + "/" + DD;
      dd = dd + 1;
      if (dd > d && mm != 12) {
        dd = 1;
        mm++;
      }
      if (dd > d && mm == 12) {
        dd = 1;
        mm = 1;
      }
      DD=dd;
      MM=mm;
      if(dd<10) {
        DD = '0'+dd
      }
      if(mm<10) {
        MM = '0'+mm
      }
      _this.nowDate6 = MM + "/" + DD;
      _this.nowyear = yy;
    },
    // 销毁定时器
    beforeDestroy: function () {
      if (this.getDate) {
        console.log("销毁定时器");
        clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
      }
    },
    // appointment() {
    //   this.flag = !this.flag;
    //   if (this.flag == true) {
    //     this.$refs.already.style.color = "rgb(255,255,255)";
    //     this.$refs.already.style.background = "rgba(27,181,236,1)";
    //     this.appoint = "已预约";
    //   } else {
    //     this.$refs.already.style.color = "#1bb5ec";
    //     this.$refs.already.style.background = "rgba(255, 255, 255, 1)";
    //     this.appoint = "预约";
    //   }
    // },
    goother() {
      this.$router.push({ path: '/' })
    },
    //预约和取消
    AddmatchList(item) {
      if(this.anchorStatus == "SUCCESS") {
        if(item.isOrder == 0) {
          let data = {
            cid:this.$store.state.userStatus.userInfo.uid,
            mid: item.id
          }
          addmatchList(data).then(res => {
            item.isOrder = 1;
            console.log(res.data)
            })
        }else {
            let data = {
            cid:this.$store.state.userStatus.userInfo.uid,
            mid: item.id
          }
          deletematchList(data).then(res => {
            item.isOrder = 0;
            console.log(res.data)
            })
          }
        this.appoint = !this.appoint;
        this.GetmatchList();
        console.log(this.appoint);
      } else {
        this.$message({
         message: "您还不是主播,请前往认证主播",
         type: "success"
       });
      }
    },
    // 判断主播
    getApplyStatus(item) {
      // 已登陆,验证是否主播
      if(this.$store.state.userStatus.userInfo.uid){
        let data = {
          uid:this.$store.state.userStatus.userInfo.uid,
        }
        console.log("id==",this.$store.state.userStatus.userInfo.uid)
        applyStatus(data).then(res => {
          this.anchorStatus = res.data.channelApplyStatus
          this.AddmatchList(item)
          console.log("申请状态==",res.data)
        });
      } else { // 未登录,弹出登录框
 // 展示登陆弹窗
      this.$refs.login.openLoginDialog();
      }
    },
    //关注
    focus(item) {
      if(this.$store.state.userStatus.userInfo.uid) {
        if(item.isFollow == 0) {
          let data = {
            mid: item.id
          }
          focusmatchList(data).then(res => {
            item.isFollow = 1
            console.log(res.data)
            })
          }else {
            let data = {
            mid: item.id
          }
          nofocusmatchList(data).then(res => {
            item.isFollow = 0;
            console.log(res.data)
            })
          }
        this.attenment = !this.attenment;
      } else {
        this.$refs.login.openLoginDialog();
      }
    },
    //获取列表
    getmatchList(date,year) {
      this.nday = date;
      this.nmouth = year 
      let t1 = this.nowyear;
      let t2 = this.nowDate;
      if(date != null) {
        t1 = year;
        t2 = date;
      } else{
        this.nday = this.nowDate;
        this.nmouth = this.nowyear;
      }
      this.changedate = t2;
      let timeStr1 = t1 + "/" + t2 + "/00:00:00";
      let timeStr2 = t1 + "/" + t2 + "/23:59:59";
      console.log(t1 + "/" + t2)
      console.log(timeStr2)
      let time1 = new Date(timeStr1).getTime();
      let time2 = new Date(timeStr2).getTime();
      let headers = { "content-type": "application/json" };
      let data = {
        startTime: time1,
        endTime: time2,
      };
      matchList(data, headers).then((res) => {
        this.schedulelist = res.data;
      });
    },
    GetmatchList() {
      let t1 = this.nmouth;
      let t2 = this.nday;
      this.changedate = t2;
      let timeStr1 = t1 + "/" + t2 + "/00:00:00";
      let timeStr2 = t1 + "/" + t2 + "/23:59:59";
      console.log(t1 + "/" + t2)
      console.log(timeStr2)
      let time1 = new Date(timeStr1).getTime();
      let time2 = new Date(timeStr2).getTime();
      let headers = { "content-type": "application/json" };
      let data = {
        startTime: time1,
        endTime: time2,
      };
      matchList(data, headers).then((res) => {
        this.schedulelist = res.data;
      });
    },
  },
  mounted() {
    this.currentTime();
    setTimeout(() => {
        this.getmatchList();
     }, 200);
  },
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
  height: 0px;
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
  width: 37%;
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
  z-index: 10;
}

.state1 {
  width: 90px;
  height: 25px;
  line-height: 20.5px;
  background: rgba(255, 255, 255, 1);
  border: 0px solid rgba(27, 181, 236, 1);
  color: #1BB5EC;
  margin-left: 27px;
  margin-top: 5px;
  font-size: 12px;
  outline: 0;
  cursor:pointer;
}

.state2 {
  width: 90px;
  height: 25px;
  line-height: 20.5px;
  // background: rgba(27,181,236,1);
  background: #ffffff;
  color: #999999;
  margin-left: 34px;
  margin-top: 5px;
  outline: 0;
  border: 0px solid rgba(27, 181, 236, 1);
  font-size: 12px;
  cursor:pointer;
}

.state3 {
  width: 90px;
  height: 25px;
  line-height: 20.5px;
  background: rgba(255, 255, 255, 1);
  border: 0px solid #EC6B6B;
  color: #EC6B6B;
  margin-left: 15px;
  margin-top: 5px;
  outline: 0;
  cursor:pointer;
}

.state4 {
  width: 90px;
  height: 25px;
  line-height: 20.5px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(240,240,240,1);
  color:rgba(153,153,153,1);;
  margin-left: 15px;
  margin-top: 5px;
  outline: 0;
}

.state5 {
  width: 90px;
  height: 25px;
  line-height: 20.5px;
  background:rgb(255, 255, 255);
  border: 0px solid #ffffff;
  color: #EC6B6B;
  margin-left: 10px;
  margin-top: 5px;
  outline: 0;
  cursor:pointer;
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
  width: 36px;
  height: 120px;
  margin-right: 40px;
}

.nopeople {
  width:240px;
  height:120px;
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:120px;
  margin-left: 40px;
}

.peoplepull {
  width: 4%;
  height: 120px;
  margin-left: 1%;
  margin-top: 4px;

}

.people1 {
  width: 50px;
  height: 50px;
  margin-top: 38px;
  border-radius: 150px;
  border: #f2f2f2 1px solid;
}

.allpeople {
  width: 32px;
  height: 32px;
  margin-top: 44px;
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

.focus {
  position: absolute;
  right: 0;
  margin-right: 37px;
  margin-top: 45px;
}

.word {
  margin-bottom: 1px;
}

.none {
  margin: auto;
  width: 185px;
  padding-top: 5%;
}

.end {
  width: 18%;
  position: relative;
}
</style>