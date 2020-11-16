<template>
  <div class="Back">
    <div class="back"></div>
    <div class="Back">
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
          <div class="videoing" v-if="scheduleInfo.status==2">正在直播</div>
          <div class="videoing" v-if="scheduleInfo.status==1">未开始</div>
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
      <div v-if="this.matchChannelList.length==0" class="nohost">暂无主播直播~</div>
      <div v-for="(item,index) in this.matchChannelList.length >= 4? this.matchChannelList.slice(0, 4) : this.matchChannelList" :key="index">
        <div class="people2" @click="changeRocm(item)">
          <div class="head-portrait">
            <img :src="item.avatarUrl" class="Head-Portrait" />
          </div>
          <div class="people-name-state">
            <div class="people-name">{{item.uname}}</div>
            <div class="state" v-if="item.living">直播中</div>
            <div class="state" v-else >未开播</div>
          </div>
        </div>
      </div>
      <div v-if="matchChannelList.length > 4">
        <img src="@/assets/pull-down.png" class="pull-down" @click="show()" />
      </div>
    </div>
    <div v-if="allshow==true">
      <div class="people-nav-pull">
        <div v-for="(item,index1) in matchChannelList" :key="index1">
          <div class="people2" @click="changeRocm(item)">
            <div class="head-portrait">
              <img :src="item.avatarUrl" class="Head-Portrait" />
            </div>
            <div class="people-name-state">
              <div class="people-name">{{item.uname}}</div>
              <div class="state" v-if="item.living">直播中</div>
              <div class="state" v-else >未开播</div>
            </div>
          </div>
        </div>
        <div>
          <img src="@/assets/pull-top.png" class="pull-top" @click="show()" />
        </div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="RecomContent" v-if="recommendVideo">
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
    <div class="type-points" v-if="flag==true && flag1==false">
      <div class="let-points" @click="changetype(1)" ref="typeone">让球</div>
      <div class="o-zhi" @click="changetype(2)" ref="typetow">欧指</div>
      <div class="total-score" @click="changetype(3)" ref="typethree">进球数</div>
    </div>
    <div class="type-points" v-if="flag1==true">
      <div class="let-points" @click="changetype(1)" ref="typeone">让分</div>
      <div class="o-zhi" @click="changetype(2)" ref="typetow">欧指</div>
      <div class="total-score" @click="changetype(3)" ref="typethree">总分</div>
    </div>
     <!-- 让球 -->
    <div class="tabledata" v-if="type==1" >
      <el-table
    :data="datalist.asia"
    stripe
    key="table1"
    style="width: 100%">
    <template slot="empty">
          <span style="font-size: 14px">暂无数据</span>
    </template>
    <el-table-column
      align="center"
      prop="name"
      label="公司">
    </el-table-column>
    <el-table-column label="初始" align="center">
    <el-table-column
    align="center"
      prop="begin"
      label="主">
      <template slot-scope="scope" class="cell">
          {{scope.row.begin.homeWin}}
      </template>
    </el-table-column>
    <el-table-column
    align="center"
      prop="begin"
      label="初始让球">
      <template slot-scope="scope" class="cell">
          {{scope.row.begin.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      align="center"
      label="客">
      <template slot-scope="scope" class="cell">
          {{scope.row.begin.awayWin}}
      </template>
    </el-table-column>
    </el-table-column>
    <el-table-column label="即时" align="center">
    <el-table-column
      prop="now"
      label="主"
      align="center">
      <template slot-scope="scope" class="cell">
        <div v-if="scope.row.now.homeWin<scope.row.begin.homeWin" style="color:green">{{scope.row.now.homeWin}}</div>
        <div v-else-if="scope.row.now.homeWin>scope.row.begin.homeWin" style="color:red">{{scope.row.now.homeWin}}</div>
        <div v-else>{{scope.row.now.homeWin}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="初始让球"
      align="center">
      <template slot-scope="scope" class="cell">
          {{scope.row.now.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="客"
      align="center">
      <template slot-scope="scope" class="cell">
        <div v-if="scope.row.now.awayWin<scope.row.begin.awayWin" style="color:green">{{scope.row.now.awayWin}}</div>
        <div v-else-if="scope.row.now.awayWin>scope.row.begin.awayWin" style="color:red">{{scope.row.now.awayWin}}</div>
        <div v-else>{{scope.row.now.awayWin}}</div>
      </template>
    </el-table-column>
    </el-table-column>
  </el-table>
    </div>

    <!-- 欧指 -->
    <div class="tabledata" v-if="type==2">
      <el-table
    :data="datalist.euro"
    stripe
    key="table2"
    style="width: 100%">
    <template slot="empty">
          <span style="font-size: 14px">暂无数据</span>
    </template>
    <el-table-column
      prop="name"
      align="center"
      label="公司">
    </el-table-column>
    <el-table-column label="欧指" align="center">
    <el-table-column
      prop="begin"
      label="主胜"
      align="center">
      <template slot-scope="scope">
        <div v-if="scope.row.now.homeWin<scope.row.begin.homeWin" style="color:green">{{scope.row.now.homeWin}}</div>
        <div v-else-if="scope.row.now.homeWin>scope.row.begin.homeWin" style="color:red">{{scope.row.now.homeWin}}</div>
        <div v-else>{{scope.row.now.homeWin}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="平局"
      align="center"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.now.draw<scope.row.begin.draw" style="color:green">{{scope.row.now.draw}}</div>
        <div v-else-if="scope.row.now.draw>scope.row.begin.draw" style="color:red">{{scope.row.now.draw}}</div>
        <div v-else>{{scope.row.now.draw}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="客胜"
      align="center"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.now.awayWin<scope.row.begin.awayWin" style="color:green">{{scope.row.now.awayWin}}</div>
        <div v-else-if="scope.row.now.awayWin>scope.row.begin.awayWin" style="color:red">{{scope.row.now.awayWin}}</div>
        <div v-else>{{scope.row.now.awayWin}}</div>
      </template>
    </el-table-column>
    </el-table-column>
    <el-table-column label="凯利" align="center">
    <el-table-column
      prop="now"
      label="主胜"
      align="center"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.now.kelly_homeWin<scope.row.begin.kelly_homeWin" style="color:green">{{scope.row.now.kelly_homeWin}}</div>
        <div v-else-if="scope.row.now.kelly_homeWin>scope.row.begin.kelly_homeWin" style="color:red">{{scope.row.now.kelly_homeWin}}</div>
        <div v-else>{{scope.row.now.kelly_homeWin}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="平局"
      align="center"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.now.kelly_draw<scope.row.begin.kelly_draw" style="color:green">{{scope.row.now.kelly_draw}}</div>
        <div v-else-if="scope.row.now.kelly_draw>scope.row.begin.kelly_draw" style="color:red">{{scope.row.now.kelly_draw}}</div>
        <div v-else>{{scope.row.now.kelly_draw}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="客胜"
      align="center"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.now.kelly_awayWin<scope.row.begin.kelly_awayWin" style="color:green">{{scope.row.now.kelly_awayWin}}</div>
        <div v-else-if="scope.row.now.kelly_awayWin>scope.row.begin.kelly_awayWin" style="color:red">{{scope.row.now.kelly_awayWin}}</div>
        <div v-else>{{scope.row.now.kelly_awayWin}}</div>
      </template>
    </el-table-column>
    </el-table-column>
  </el-table>
    </div>

    <!-- 进球数 -->
    <div class="tabledata" v-if="type==3">
      <el-table
    :data="datalist.size"
    stripe
    key="table3"
    style="width: 100%">
    <template slot="empty">
          <span style="font-size: 14px">暂无数据</span>
    </template>
    <el-table-column
      prop="name"
      label="公司"
      align="center">
    </el-table-column>
    <el-table-column
      prop="begin"
      label="大球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.begin.homeWin}}
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="总球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.begin.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="小球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.begin.awayWin}}
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="大球"
      align="center">
      <template slot-scope="scope">
        <div v-if="scope.row.now.homeWin<scope.row.begin.homeWin" style="color:green">{{scope.row.now.homeWin}}</div>
        <div v-else-if="scope.row.now.homeWin>scope.row.begin.homeWin" style="color:red">{{scope.row.now.homeWin}}</div>
        <div v-else>{{scope.row.now.homeWin}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="总球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.now.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="小球"
      align="center">
      <template slot-scope="scope">
        <div v-if="scope.row.now.awayWin<scope.row.begin.awayWin" style="color:green">{{scope.row.now.awayWin}}</div>
        <div v-else-if="scope.row.now.awayWin>scope.row.begin.awayWin" style="color:red">{{scope.row.now.awayWin}}</div>
        <div v-else>{{scope.row.now.awayWin}}</div>
      </template>
    </el-table-column>
  </el-table>
    </div>
    </div>
    <div v-if="flag==false && flag1==true">
    <!-- 让分 -->
    <div class="tabledata" v-if="type==1" >
      <el-table
    :data="datalist.asia"
    stripe
    key="table4"
    style="width: 100%">
    <template slot="empty">
          <span style="font-size: 14px">暂无数据</span>
    </template>
    <el-table-column
      align="center"
      prop="name"
      label="公司">
    </el-table-column>
    <el-table-column label="初始" align="center">
    <el-table-column
    align="center"
      prop="begin"
      label="主">
      <template slot-scope="scope" class="cell">
          {{scope.row.begin.homeWin}}
      </template>
    </el-table-column>
    <el-table-column
    align="center"
      prop="begin"
      label="初始让球">
      <template slot-scope="scope" class="cell">
          {{scope.row.begin.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      align="center"
      label="客">
      <template slot-scope="scope" class="cell">
          {{scope.row.begin.awayWin}}
      </template>
    </el-table-column>
    </el-table-column>
    <el-table-column label="即时" align="center">
    <el-table-column
      prop="now"
      label="主"
      align="center">
      <template slot-scope="scope" class="cell">
        <div v-if="scope.row.now.homeWin<scope.row.begin.homeWin" style="color:green">{{scope.row.now.homeWin}}</div>
        <div v-else-if="scope.row.now.homeWin>scope.row.begin.homeWin" style="color:red">{{scope.row.now.homeWin}}</div>
        <div v-else>{{scope.row.now.homeWin}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="初始让球"
      align="center">
      <template slot-scope="scope" class="cell">
          {{scope.row.now.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="客"
      align="center">
      <template slot-scope="scope" class="cell">
        <div v-if="scope.row.now.awayWin<scope.row.begin.awayWin" style="color:green">{{scope.row.now.awayWin}}</div>
        <div v-else-if="scope.row.now.awayWin>scope.row.begin.awayWin" style="color:red">{{scope.row.now.awayWin}}</div>
        <div v-else>{{scope.row.now.awayWin}}</div>
      </template>
    </el-table-column>
    </el-table-column>
  </el-table>
    </div>

    <!-- 欧指 -->
    <div class="tabledata" v-if="type==2">
      <el-table
    :data="datalist.euro"
    stripe
    key="table5"
    style="width: 100%">
    <template slot="empty">
          <span style="font-size: 14px">暂无数据</span>
    </template>
    <el-table-column
      prop="name"
      align="center"
      label="公司">
    </el-table-column>
    <el-table-column label="欧指" align="center">
    <el-table-column
      prop="begin"
      label="主胜"
      align="center">
      <template slot-scope="scope">
        <div v-if="scope.row.now.homeWin<scope.row.begin.homeWin" style="color:green">{{scope.row.now.homeWin}}</div>
        <div v-else-if="scope.row.now.homeWin>scope.row.begin.homeWin" style="color:red">{{scope.row.now.homeWin}}</div>
        <div v-else>{{scope.row.now.homeWin}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="平局"
      align="center"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.now.draw<scope.row.begin.draw" style="color:green">{{scope.row.now.draw}}</div>
        <div v-else-if="scope.row.now.draw>scope.row.begin.draw" style="color:red">{{scope.row.now.draw}}</div>
        <div v-else>{{scope.row.now.draw}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="客胜"
      align="center"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.now.awayWin<scope.row.begin.awayWin" style="color:green">{{scope.row.now.awayWin}}</div>
        <div v-else-if="scope.row.now.awayWin>scope.row.begin.awayWin" style="color:red">{{scope.row.now.awayWin}}</div>
        <div v-else>{{scope.row.now.awayWin}}</div>
      </template>
    </el-table-column>
    </el-table-column>
  </el-table>
    </div>

    <!-- 总分 -->
    <div class="tabledata" v-if="type==3">
      <el-table
    :data="datalist.size"
    stripe
    key="table6"
    style="width: 100%">
    <template slot="empty">
          <span style="font-size: 14px">暂无数据</span>
    </template>
    <el-table-column
      prop="name"
      label="公司"
      align="center">
    </el-table-column>
    <el-table-column
      prop="begin"
      label="大球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.begin.homeWin}}
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="总球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.begin.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="begin"
      label="小球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.begin.awayWin}}
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="大球"
      align="center">
      <template slot-scope="scope">
        <div v-if="scope.row.now.homeWin<scope.row.begin.homeWin" style="color:green">{{scope.row.now.homeWin}}</div>
        <div v-else-if="scope.row.now.homeWin>scope.row.begin.homeWin" style="color:red">{{scope.row.now.homeWin}}</div>
        <div v-else>{{scope.row.now.homeWin}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="总球"
      align="center">
      <template slot-scope="scope">
          {{scope.row.now.draw}}
      </template>
    </el-table-column>
    <el-table-column
      prop="now"
      label="小球"
      align="center">
      <template slot-scope="scope">
        <div v-if="scope.row.now.awayWin<scope.row.begin.awayWin" style="color:green">{{scope.row.now.awayWin}}</div>
        <div v-else-if="scope.row.now.awayWin>scope.row.begin.awayWin" style="color:red">{{scope.row.now.awayWin}}</div>
        <div v-else>{{scope.row.now.awayWin}}</div>
      </template>
    </el-table-column>
  </el-table>
    </div>
    </div>
  </div>
</template>

<script>
import LeftSideBar from "@/components/left-side-bar.vue";
import videoPlayer from "@/components/video/videoPlayer.vue";
import { liveList,matchInfo,matchChannelList,dataInfo } from "@/api/api";
import { Table,TableColumn} from "element-ui";
import jsonp from 'jsonp'
// import axios from "@/api/Axios1";
import axios from "@/api/axios";
// import * as eventTrack from '@/utils/eventTracking.js'
export default {
  data() {
    return {
      allshow: false,
      recommendVideo: null,
      recommendVideo6: [],
      recommendVideo2: [],
      matchChannelList:[1,2,3,4],
      type:1,
      flag: true,
      flag1: false,
      scheduleInfo:null,
      datalist:'',
      dataid:'',
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
    // console.log("this.$route.params = ",this.$route);
  },
  methods: {
    //json转换
    getdatalist(){
      let data = {
        dataId: this.dataid
      }
      dataInfo(data).then((res) => {
        if (this.dataid) { this.flag = true }
        this.datalist = JSON.parse(res.data)
        if (this.datalist.euro.length !== 0) {
          if (!this.datalist.euro[0].now.kelly_draw) {
            this.flag1 = true
            this.flag = false
          }
        }
        // console.log("ooooooooooooooooooo",this.datalist)
      })
//         axios.get('/dqd/soccer/biz/dqd/v1/match/odds/index/'+this.dataid+'?app=dqd&lang=zh-cn&cmp_type=soccer').then((response)=>{
//         // console.log("1111111111111",response)
//         if(response){this.flag = true}
// 　　    this.datalist = response
//         // console.log("ooooooooooooooooooo",this.datalist)
//       })
      // delete this.datalist.matchId;
      // this.$set(this.datalist,'matchId',this.dataid)
      // console.log("分数数据=",this.datalist)
      this.getMatchChannelList();
    },
    changeCellStyle (row, column, rowIndex, columnIndex) {
      if(row.column.label === "公司"){
        return 'background: #F9772A38'  // 修改的样式
      }else{
        return ''
      }
    },
    //获取赛事详情
    getMatchDetail() {
      document.querySelector('body').setAttribute('style','background-color: rgba(27, 181, 236, 0);')
      let data = {
        mid: this.$route.query.mid
      };
      matchInfo(data).then((res) => {        
        this.scheduleInfo = res.data;
        if(res.data.dataId){this.dataid=res.data.dataId}
        // console.log("sssssssssssssssss",res)
        this.getdatalist();
        // this.getMatchChannelList();
      });
    },
    //获取赛事正在直播的主播列表
    getMatchChannelList() {
      let data = {
        mid: this.$route.query.mid
      };
      matchChannelList(data).then((res) => {        
        this.matchChannelList = res.data;
        // console.log("比赛视频", this.matchChannelList)

        if(this.matchChannelList && this.matchChannelList.length > 0){
          this.recommendVideo = res.data[0];
        }
        this.getSugestedList();
      });
    },
    show() {
      this.allshow = !this.allshow;
      // console.log(this.allshow);
    },
    changeRocm(item) {
      this.recommendVideo = item;
      // console.log("9999999999999999999999999",this.recommendVideo)
    },
    intoLiveRomm(itemID) {
      const { href } = this.$router.resolve(itemID, "/");
      // console.log(this.$router.resolve(itemID, "/"));
      // console.log(5555555);
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
        // console.log("2222比赛视频", this.recommendVideo)
        if(!this.recommendVideo){
          this.recommendVideo = res.data[0];
          // console.log("3333比赛视频", this.recommendVideo)
        }
        
        this.recommendVideo6 = res.data.slice(0, 6);
        this.recommendVideo2 = res.data.slice(1, 3);
      });
    },

    changetype(type) {
      this.type = type;
      if(this.type==1) {
        this.$refs.typeone.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typeone.style.background='#F9772A';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else if(this.type===2) {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.background='#F9772A';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.background='#F9772A';
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_index.scss";
// .back {
//   position: fixed;
//   width: 163%;
//   height: 3000px;
//   background: url(../../assets/beijing.png) no-repeat;
//   background-size: 100% 100%;
//   // -webkit-background-size: cover;
//   // -o-background-size: cover;
//   background-position: center 0;
//   z-index: 0;
//   margin-left: -408px;
// }
.back {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(../../assets/beijing.png) no-repeat;
  background-size: 100% 100%;
  z-index: -2;
  left: 0;
  top: 0;
  // margin-left: -408px;
}
.Back{
  z-index: 10;
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
  margin-left: 16.1%;
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
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.teamname2 {
  height: 100px;
  line-height: 100px;
  width: 180px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
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
  // margin-left: 19.75%;
  margin: auto;
  display: flex;
}

.people-nav-pull {
  position: relative;
  width: 1200px;
  // height: 520px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-left: 19.75%;
  display: flex;
  flex-wrap: wrap;
}

.people2 {
  display: flex;
  margin-top: 7.5px;
  margin-left: 20px;
  margin-bottom: 7.5px;
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
  width: 66px;
  height: 25px;
  background: rgba(236, 107, 107, 1);
  border-radius: 15px;
  line-height: 25px;
  text-align: center;
  color: rgb(255, 255, 255);
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
  // margin-left: 19.75%;
  margin: auto;
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
  // margin-left: 19.75%;
}

.let-points {
  width: 399px;
  height: 100%;
  background:#F9772A;
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
  // margin-left: 19.75%;
  margin-top: 20px;
}

.player-status {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba($color: #000, $alpha: 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
}

.nohost {
  color: rgb(255, 255, 255);
  font-size: 20px;
  height: 130px;
  line-height: 130px;
  margin-left: 65px;
  font-family: PingFangSC-Regular, PingFang SC;

}
</style>