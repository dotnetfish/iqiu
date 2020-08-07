<template>
  <div class="back">
    <!-- 侧边栏 -->
    <LeftSideBar></LeftSideBar>
    <!-- 顶部信息 -->
    <div v-if="(this.scheduleInfo)" class="nav">
      <div class="iconone">
        <img :src="this.scheduleInfo.teamOneLogo" class="icon1" />
      </div>
      <div class="teamname1">{{this.scheduleInfo.teamOne}}</div>
      <div class="score1">{{this.scheduleInfo.teamOneScore}}</div>
      <div class="date-time-state">
        <div class="date-time">
          <div>{{this.scheduleInfo.startTime | formatDate}}</div>
          <!-- <div>21:00</div> -->
        </div>
        <div class="icon-state">
          <img src="@/assets/video.png" class="videoicon" />
          <div class="videoing">正在直播</div>
        </div>
      </div>
      <div class="score2">{{this.scheduleInfo.teamTwoScore}}</div>
      <div class="teamname2">{{this.scheduleInfo.teamTwo}}</div>
      <div class="icontow">
        <img :src="this.scheduleInfo.teamTwoLogo" class="icon1" />
      </div>
    </div>
    <!-- 主播选择 -->
    <div class="people-nav" v-if="allshow==false">
      <!-- <div class="people1">
        <div class="head-portrait">
          <img src="@/assets/timg.jpg" class="Head-Portrait" />
        </div>
        <div class="people-name-state">
          <div class="people-name">雅雅说篮伦</div>
          <div class="state">直播中</div>
        </div>
      </div> -->
      <div v-for="item in this.matchChannelList.length >= 4? this.matchChannelList.slice(0, 4) : this.matchChannelList" :key="item">
        <div class="people2" @click="changeRocm(item)">
          <div class="head-portrait">
            <img :src="item.avatarUrl" class="Head-Portrait" />
          </div>
          <div class="people-name-state">
            <div class="people-name">{{item.uname}}</div>
            <div class="state">直播中</div>
          </div>
        </div>
      </div>
      <div v-if="matchChannelList.length > 4">
        <img src="@/assets/pull-down.png" class="pull-down" @click="show()" />
      </div>
    </div>
    <div v-if="allshow==true">
      <div class="people-nav-pull">
        <!-- <div class="people1">
          <div class="head-portrait">
            <img src="@/assets/timg.jpg" class="Head-Portrait" />
          </div>
          <div class="people-name-state">
            <div class="people-name">每天吃蓝莓</div>
            <div class="state">直播中</div>
          </div>
        </div> -->
        <div v-for="item in matchChannelList" :key="item">
          <div class="people2" @click="changeRocm(item)">
            <div class="head-portrait">
              <img :src="item.avatarUrl" class="Head-Portrait" />
            </div>
            <div class="people-name-state">
              <div class="people-name">{{item.uname}}</div>
              <div class="state">直播中</div>
            </div>
          </div>
        </div>
        <div>
          <img src="@/assets/pull-top.png" class="pull-top" @click="show()" />
        </div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="RecomContent">
      <div class="videoRecomMain">
        <videoPlayer
          class="videoPlayer"
          ref="dPlayer"
          :roomId="recommendVideo.id"
          :notLivingSuggest="recommendVideo2"
        ></videoPlayer>
        <div class="intoLiveRomm" @click="intoLiveRomm(recommendVideo.id)">进入直播间</div>
      </div>
      <div class="videoRecomList">
        <div
          :class="[item.id === recommendVideo.id ? 'videoRecomList-active' : '','videoRecomList-item']"
          v-for="item in recommendVideo6"
          :key="item.id"
        >
          <img :src="item.imageUrl" style="width:174px;height:92px;" @click="changeRocm(item)" />
        </div>
      </div>
    </div>
    <!-- 分数信息 -->
    <div class="type-points" v-if=false>
      <div class="let-points" @click="changetype(1)" ref="typeone">让分</div>
      <div class="o-zhi" @click="changetype(2)" ref="typetow">欧指</div>
      <div class="total-score" @click="changetype(3)" ref="typethree">总分</div>
    </div>
    <!-- 让分 -->
    <div class="tabledata" v-if="type==1 && false" >
      <el-table
    :data="table1Data"
    :cell-style="changeCellStyle"
    stripe
    style="width: 100%">
    <el-table-column
      prop="company"
      label="公司"
      width="255">
    </el-table-column>
    <el-table-column
      prop="host1"
      label="主"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="begin1"
      label="初始让球"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="guest1"
      label="客"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="host2"
      label="主"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="begin2"
      label="初始让球"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="guest2"
      label="客"
      width="157.5">
    </el-table-column>
  </el-table>
    </div>

    <!-- 欧指 -->
    <div class="tabledata" v-if="type==2">
      <el-table
    :data="table2Data"
    :cell-style="changeCellStyle"
    stripe
    style="width: 100%">
    <el-table-column
      prop="company"
      label="公司"
      width="255">
    </el-table-column>
    <el-table-column
      prop="big1"
      label="大分"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="total1"
      label="总分"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="small1"
      label="小分"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="big2"
      label="大分"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="total2"
      label="总分"
      width="157.5">
    </el-table-column>
    <el-table-column
      prop="small2"
      label="小分"
      width="157.5">
    </el-table-column>
  </el-table>
    </div>

    <!-- 总分 -->
    <div class="tabledata" v-if="type==3">
      <el-table
    :data="table3Data"
    :cell-style="changeCellStyle"
    stripe
    style="width: 100%">
    <el-table-column
      prop="company"
      label="公司"
      width="255">
    </el-table-column>
    <el-table-column
      prop="guesty1"
      label="客胜"
      width="236.25">
    </el-table-column>
    <el-table-column
      prop="hosty1"
      label="主胜"
      width="236.25">
    </el-table-column>
    <el-table-column
      prop="guesty2"
      label="客胜"
      width="236.25">
    </el-table-column>
    <el-table-column
      prop="hosty2"
      label="主胜"
      width="236.25">
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
import LeftSideBar from "@/components/left-side-bar.vue";
import videoPlayer from "@/components/video/videoPlayer.vue";
import { liveList,matchInfo,matchChannelList } from "@/api/api";
import { Table,TableColumn} from "element-ui";
// import * as eventTrack from '@/utils/eventTracking.js'
export default {
  data() {
    return {
      allshow: false,
      recommendVideo: {},
      recommendVideo6: [],
      recommendVideo2: [],
      matchChannelList:[1,2,3,4],
      type:1,
      scheduleInfo:null,
      table1Data: [{
          company: 'sjhjfkdj',
          guest1: '0.98',
          guest2: '0.98',
          host1: '0.98',
          host2: '0.98',
          begin1: '-0.98',
          begin2: '0.98',

        }, {
          company: 'utnglhjfkdj',
          guest1: '0.98',
          guest2: '0.98',
          host1: '0.98',
          host2: '0.98',
          begin1: '-8.80',
          begin2: '-8.80',
        }],
      table2Data: [{
          company: 'sjhjfkdj',
          big1: '0.87',
          big2: '0.87',
          small1: '0.85',
          small2: '0.85',
          total1: '102',
          total2: '98',
      }, {
          company: 'sjhjfkdj',
          big1: '0.87',
          big2: '0.87',
          small1: '0.85',
          small2: '0.85',
          total1: '102',
          total2: '98',
      }],
      table3Data: [{
          company: 'sjhjfkdj',
          guesty1: '1.87',
          guesty2: '1.87',
          hosty1: '1.85',
          hosty2: '1.85',
      }, {
          company: 'sjhjfkdj',
          guesty1: '1.87',
          guesty2: '1.87',
          hosty1: '1.85',
          hosty2: '1.85',
    }],
    }
  },
  //时间戳转换
  filters: {
    formatDate: function (value) {
      // 获取当前年份
      let nowYear = new Date().getFullYear();
      // 格式化后的日期时间 yyyy/MM/DD HH:mm
      let formatDateStr = "";

      let date = new Date(value);
      
      // 当前年与查看的比赛不是同一年，则显示年份
      if(date.getFullYear() != nowYear){
        formatDateStr = date.getFullYear() + "年";
      }
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      // 月
      formatDateStr = formatDateStr + month + "月";
      
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      // 日
      formatDateStr = formatDateStr + day + "日 ";

      // 时
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      formatDateStr = formatDateStr + h;

      // 分
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      formatDateStr = formatDateStr + ":" + m;

      return formatDateStr;
    },
  },
  components: {
    LeftSideBar,
    videoPlayer,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  mounted() {
    this.getMatchDetail();
    setTimeout(() => {
        this.getSugestedList();
     }, 200);
    
    
    console.log("this.$route.params = ",this.$route);
  },
  methods: {
    changeCellStyle (row, column, rowIndex, columnIndex) {
      if(row.column.label === "公司"){
        return 'background: rgba(27,181,236,0.2)'  // 修改的样式
      }else{
        return ''
      }
    },
    //获取赛事详情
    getMatchDetail() {
      let data = {
        mid: this.$route.query.mid
      };
      matchInfo(data).then((res) => {        
        this.scheduleInfo = res.data;

        this.getMatchChannelList();
      });
    },
    //获取赛事正在直播的主播列表
    getMatchChannelList() {
      let data = {
        mid: this.$route.query.mid
      };
      matchChannelList(data).then((res) => {        
        this.matchChannelList = res.data;        
      });
    },
    show() {
      this.allshow = !this.allshow;
      console.log(this.allshow);
    },
    changeRocm(item) {
      this.recommendVideo = item;
    },
    intoLiveRomm(itemID) {
      const { href } = this.$router.resolve(itemID, "/");
      console.log(this.$router.resolve(itemID, "/"));
      console.log(5555555);
      window.open(href, "_blank");
      this.homeClickEvent(
        "living_room_enter_click",
        "首页背投",
        this.recommendVideo.id,
        this.recommendVideo.name
      );
    },
    getSugestedList() {
      let data = {
        p: 1,
        size: 14,
        typeId: "all",
      };
      let headers = {};
      liveList(data, headers).then((res) => {
        // console.log('首页-获取推荐列表--res',res)
        this.recommendVideo = res.data[0];
        this.recommendVideo6 = res.data.slice(0, 6);
        // this.recommendVideo2 = res.data.slice(1, 3);
      });
    },

    changetype(type) {
      this.type = type;
      if(this.type==1) {
        this.$refs.typeone.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typeone.style.background='rgba(27, 181, 236, 1)';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else if(this.type===2) {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.background='rgba(27, 181, 236, 1)';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.background='rgba(27, 181, 236, 1)';
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_index.scss";
.back {
  position: absolute;
  width: 172%;
  height: 1779px;
  background: url(../../assets/beijing.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  z-index: 0;
  margin-left: -408px;
}

.nav {
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
}

.iconone {
  width: 100px;
  height: 100px;
  margin-left: 22.6%;
}

.icontow {
  width: 100px;
  height: 100px;
  margin-left: 1%;
}

.icon1 {
  width: 70px;
  height: 70px;
  margin-top: 15px;
}

.teamname1 {
  height: 100px;
  line-height: 100px;
  width: 180px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.teamname2 {
  height: 100px;
  line-height: 100px;
  width: 180px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.score1 {
  margin-left: 4.7%;
  height: 100px;
  line-height: 100px;
  font-size: 48px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.score2 {
  margin-right: 4.7%;
  height: 100px;
  line-height: 100px;
  font-size: 48px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.date-time-state {
  padding-top: 28px;
  margin-left: 3.4%;
  margin-right: 3.4%;
  width: 110px;
  height: 100px;
}

.date-time {
  margin-left: 5px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: flex;
}

.icon-state {
  margin-left: 6px;
  text-align: center;
  margin-top: 11px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: flex;
}

.videoicon {
  margin-top: -1px;
  margin-right: 6px;
}

.videoing {
  margin-top: 1px;
}

.people-nav {
  width: 1200px;
  height: 130px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-left: 19.75%;
  display: flex;
}

.people-nav-pull {
  position: relative;
  width: 1200px;
  height: 520px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-left: 19.75%;
  display: flex;
  flex-wrap: wrap;
}

.people2 {
  display: flex;
  margin-top: 15px;
  margin-left: 20px;
  width: 265px;
  height: 100px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}

.people1 {
  display: flex;
  margin-top: 15px;
  margin-left: 20px;
  width: 265px;
  height: 100px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  border: 1px solid rgba(151, 151, 151, 1);
}

.head-portrait {
  margin-left: 47px;
  margin-top: 10px;
  width: 80px;
  height: 80px;
}

.Head-Portrait {
  width: 80px;
  height: 80px;
  border-radius: 150px;
}

.people-name-state {
  height: 100px;
  margin-left: 20px;
}

.people-name {
  width: 80px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  margin-top: 22px;
  display: inline-block;
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow:ellipsis;
}

.state {
  width: 62px;
  height: 25px;
  background: rgba(236, 107, 107, 1);
  border-radius: 10px;
  line-height: 25px;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-left: 9px;
  margin-top: 10px;
}

.pull-down {
  width: 32px;
  height: 32px;
  margin-left: 13px;
  margin-top: 49px;
}

.pull-top {
  width: 32px;
  height: 32px;
  right: 13px;
  bottom: 13px;
  position: absolute;
}

.RecomContent {
  cursor: pointer;
  width: 1202px;
  height: 646px;
  margin-left: 19.75%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .videoRecomMain {
    width: 1002px;
    height: 602px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 63px;
    position: relative;

    .intoLiveRomm {
      cursor: pointer;
      position: absolute;
      left: 41%;
      top: 43%;
      width: 185px;
      height: 63px;
      color: $color-main;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 63px;
      text-align: center;
      z-index: 3;
    }

    .intoLiveRomm:hover {
      color: rgba(255, 255, 255, 1);
      background: $color-main;
    }
  }

  .videoRecomList {
    z-index: 1;
    width: 200px;
    height: 601px;
    padding-left: 16px;
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 0 12px 12px 0;

    .videoRecomList-item {
      width: 187px;
      height: 98px;
      text-align: center;
      display: flex;
      justify-content: center; /*在主轴上的对齐*/
      align-items: center; /*在交叉轴上中心点的对齐*/
      filter: rgba(0, 0, 0, 0.6);
    }

    .videoRecomList-active {
      background: url("../../assets/home/arrow@3x.png");
      background-size: 187px 98px;
      background-repeat: no-repeat;
      padding-left: 3px;
    }

    .videoRecomList-item:hover {
      background: url("../../assets/home/rectangle@3x.png");
      background-size: 184px 98px;
      background-repeat: no-repeat;
      background-position: center;
      transform: scale(1.03);
    }
  }
}

.type-points {
  display: flex;
  width: 1200px;
  height: 62px;
  margin-left: 19.75%;
}

.let-points {
  width: 399px;
  height: 100%;
  background: rgba(27, 181, 236, 1);
  font-size: 26px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 62px;
  text-align: center;
  cursor:pointer;
}

.o-zhi {
  width: 400px;
  height: 62px;
  background: rgba(255, 255, 255, 1);
  margin-left: 2px;
  margin-right: 2px;
  font-size: 26px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 62px;
  text-align: center;
  cursor:pointer;
}

.total-score {
  width: 399px;
  height: 62px;
  background: rgba(255, 255, 255, 1);
  font-size: 26px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 62px;
  text-align: center;
  cursor:pointer;
}

.tabledata {
  width: 1200px;
  height: 62px;
  margin-left: 19.75%;
  margin-top: 20px;
}


</style>