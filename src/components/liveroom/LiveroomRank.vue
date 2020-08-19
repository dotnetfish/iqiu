<template>
  <div>
    <div class="list">
      <div class="towrank">
        <div style="width:52px;height:28px;font-size:20px;margin-left:100px;line-height:28px">
          <button class="day" @click="changeblue(true)" ref="newtask">日榜</button>
        </div>
        <div style="width:52px;height:28px;margin-left:190px;line-height:28px">
          <button class="week" @click="changeblue(false)" ref="oldtask">周榜</button>
        </div>
        <div class="line"></div>
      </div>
      <div style="display:flex;height:4px;width:100%;margin-bottom:22px">
        <div class="blueone" v-if="showblue==true"></div>
        <div class="bluetow" v-if="showblue==false"></div>
      </div>
      <div v-if="showblue==true">
        <div @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)">
        <div class="befor-three">
            <div class="level2">
              <img src="@/assets/rank/no2.png">
              <img :src=rankinglist[1].avatarUrl class="no2" v-if="rankinglist[1]">
            </div>
            <div class="level1">
              <img src="@/assets/rank/no1.png">
              <img :src=rankinglist[0].avatarUrl class="no1" v-if="rankinglist[0]">
            </div>
            <div class="level3">
              <img src="@/assets/rank/no3.png">
              <img :src=rankinglist[2].avatarUrl class="no3" v-if="rankinglist[2]">
            </div>
        </div>
        <div class="three-name">
          <div class="name1" v-if="rankinglist[1]">{{rankinglist[1].uname}}</div>
          <div class="name2" v-if="rankinglist[0]">{{rankinglist[0].uname}}</div>
          <div class="name3" v-if="rankinglist[2]">{{rankinglist[2].uname}}</div>
        </div>
        <div class="three-rank">
          <div class="rank1" v-if="rankinglist[1]">{{rankinglist[1].score}}贡献值</div>
          <div class="rank2" v-if="rankinglist[0]">{{rankinglist[0].score}}贡献值</div>
          <div class="rank3" v-if="rankinglist[2]">{{rankinglist[2].score}}贡献值</div>
        </div>
        </div>
      </div>

      <div v-if="showblue==false">
        <div @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)">
        <div class="befor-three">
            <div class="level2">
              <img src="@/assets/rank/no2.png">
              <img :src=rankinglist[1].avatarUrl class="no2" v-if="rankinglist[1]">
            </div>
            <div class="level1">
              <img src="@/assets/rank/no1.png">
              <img :src=rankinglist[0].avatarUrl class="no1" v-if="rankinglist[0]">
            </div>
            <div class="level3">
              <img src="@/assets/rank/no3.png">
              <img :src=rankinglist[2].avatarUrl class="no3" v-if="rankinglist[2]">
            </div>
        </div>
        <div class="three-name">
          <div class="name1" v-if="rankinglist[1]">{{rankinglist[1].uname}}</div>
          <div class="name2" v-if="rankinglist[0]">{{rankinglist[0].uname}}</div>
          <div class="name3" v-if="rankinglist[2]">{{rankinglist[2].uname}}</div>
        </div>
        <div class="three-rank">
          <div class="rank1" v-if="rankinglist[1]">{{rankinglist[1].score}}贡献值</div>
          <div class="rank2" v-if="rankinglist[0]">{{rankinglist[0].score}}贡献值</div>
          <div class="rank3" v-if="rankinglist[2]">{{rankinglist[2].score}}贡献值</div>
        </div>
        </div>
      </div>
      <div v-if="flag==true">
        <div class="allrank">
          <div v-for="(item,index) in rankinglist" :key="index">
          <div class="onerank" v-if="index>2"><div class="rankid">{{item.rank}}</div><div class="rankname">{{item.uname}}</div><div class="rankrank" style="width:80px;text-align:right">{{item.score}}</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestRankingList } from "@/api/api";
import Liveroom from "@/views/Liveroom";
import loginPop from "@/components/login/loginTipPopup.vue";
import storages from "@/utils/storage";
export default {
  name: "liveroomrank",
  components: {
    Liveroom,
    loginPop,
    storages
  },
  data() {
    return {
      rankinglist:[],
      rrankinglist: [{
        uid:1,
        uname:'didi1',
        rank:220
      },{
        uid:2,
        uname:'didi2',
        rank:120
      },{
        uid:3,
        uname:'didi3',
        rank:210
      },{
        uid:4,
        uname:'didi',
        rank:20
      },{
        uid:5,
        uname:'didi',
        rank:20
      },{
        uid:6,
        uname:'didi',
        rank:20
      },
      ],
      showblue:true,
      id:'',
      typedw:1,
      flag:false,
    };
  },
  props: {
    channelInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    changeblue(x) {
      this.showblue = x;
      if(this.showblue == true) {
        this.$refs.newtask.style.color = 'rgba(51, 51, 51, 1)';
        this.$refs.oldtask.style.color = 'rgba(122,122,122,1)';
        this.typedw = 1
      }else{
        this.$refs.oldtask.style.color = 'rgba(51, 51, 51, 1)';
        this.$refs.newtask.style.color = 'rgba(122,122,122,1)';
        this.typedw = 2
      }
      this.getrankingList(this.typedw)
    },
    getrankingList(typedw) {
      let that = this;
      if(typedw) {
        that.typedw = typedw
      }
      let data = {
        type: that.typedw,
        cid: that.channelInfo.id,
        // uid: that.$store.state.userStatus.userInfo.uid,
        uid:"10004603"
      };
      requestRankingList(data).then((res) => {
        that.rankinglist = res.data.rankingItemDtoList;
        console.log("1342559994",that.rankinglist);
      });
    },
    changeImageSrc(index) {
        if (index === 1) {
          this.flag = true
        } else {
          this.flag = false
        }
      },
  },
  mounted() {
    setTimeout(() => {
      this.getrankingList();
    }, 1000);
  },
  watch: {
    channelInfo(a) {
      console.log("watch",a);
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  width: 100%;
  height: 248px;
  // border: rgb(0, 255, 255) solid 1px;
}

.line {
  width:1px;
  height:16px;
  background:rgba(102,102,102,1);
  border:1px solid rgba(151,151,151,1);
  position: absolute;
  margin-left: 50%;
  margin-top: 6px;

}

.towrank {
  height: 28px;
  width: 100%;
  display: flex;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
}

.day {
  background-color: white;
  border: 0px;
  outline: 0;
  color: rgba(51, 51, 51, 1);
}

.week {
  background-color: white;
  border: 0px;
  outline: 0;
  color:rgba(122,122,122,1);
}

.blueone {
  width: 36px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 109px;
}

.bluetow {
  width: 36px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 350px;
}

.befor-three {
  display: flex;
}

.level2 {
  margin-left: 58px;
  display: flex;
  height: 94px;
  width: 17%;
  margin-top: 24px;
}
.level1 {
  height: 120px;
  width: 45%;
  display: flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:center;
}
.level3 {
  height: 94px;
  width: 17%;
  margin-top: 26px;
  display: flex;
}

.no2 {
  z-index: 2;
  position: absolute;
  border-radius: 150px;
  margin-left: 5px;
  margin-top: 19px;
  width: 70px;
  height: 70px;
}

.no1 {
  z-index: 2;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 150px;
  margin-top: 16px;
}

.no3 {
  z-index: 2;
  position: absolute;
  border-radius: 150px;
  margin-left: 6px;
  margin-top: 20px;
  width: 70px;
  height: 70px;
}

.allrank {
  width: 100%;
  height: 260px;
  border: rgba(240,240,240,1) solid 1px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  z-index: 10;
  margin-top: 20px;
}

.onerank {
  display: flex;
  height: 30px;
  width: 100%;
  margin-top: 6px;
}

.rankid {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:30px;
  height: 30px;
  margin-left: 43px;
  width: 17px;
}

.rankname {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:30px;
  height: 30px;
  margin-left: 10px;
  width: 300px;
}

.rankrank {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:30px;
  height: 30px;;
}

.three-name {
  display: flex;
  width: 100%;
  margin-top: 10px;
  height: 17px;
}

.name1 {
  position: absolute;
  margin-left: 38px;
  font-size: 18px;
  color:rgba(102,102,102,1);
  width: 120px;
  text-align: center;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.name2 {
  position: absolute;
  margin-left: 187px;
  color:rgba(102,102,102,1);
  width: 120px;
  text-align: center;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.name3 {
  position: absolute;
  margin-left: 338px;
  color:rgba(102,102,102,1);
  width: 120px;
  text-align: center;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.three-rank {
  display: flex;
  width: 100%;
  margin-top: 4px;
  height: 17px;
}

.rank1 {
  position: absolute;
  margin-left: 44px;
  width: 107px;
  font-size:14px;
  color:rgba(153,153,153,1);
  text-align: center;
}
.rank2 {
  position: absolute;
  margin-left: 193px;
  width: 107px;
  font-size:14px;
  color:rgba(153,153,153,1);
  text-align: center;
}
.rank3 {
  position: absolute;
  margin-left: 344px;
  font-size:14px;
  color:rgba(153,153,153,1);
  text-align: center;
  width: 107px;
}
</style>