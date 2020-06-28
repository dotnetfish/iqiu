<template>
  <div>
    <div class="videoRecom">
      <div class="RecomContent">
        <div class="videoRecomMain">
          <videoPlayer ref="dPlayer" :roomId="recommendVideo.id" :notLivingSuggest="recommendVideo2"></videoPlayer>
          <div class="intoLiveRomm" @click="intoLiveRomm(recommendVideo.id)">进入直播间</div>
        </div>
        <div class="videoRecomList">
          <div :class="[item.id === recommendVideo.id ? 'videoRecomList-active' : '','videoRecomList-item']"
               v-for="item in recommendVideo6" :key="item.id">
            <img :src="item.imageUrl" style="width:174px;height:92px;" @click="changeRocm(item)">
          </div>
        </div>
      </div>
    </div>

<!--    <div class="events" style="margin-top:15px;">-->
<!--      <div class="activity">-->
<!--        <div class="liveRecomend-title">-->
<!--          <img src="@/assets/home/homeIcon/noticeLeft@2x.png"-->
<!--               style="width:25px;height:22px;margin: 18px 12px 18px 0px;">-->
<!--          <p class="liveRecomend-title-text">新闻公告</P>-->
<!--        </div>-->
<!--        <el-carousel height="236px">-->
<!--          <el-carousel-item v-for="(item,index) in protocolList" :key="index">-->
<!--            <a :href="item.url" target="_blank" @click="homeClickEvent('ad_click','新闻公告',item.url)">-->
<!--              <img :src="item.img" style="width:592px;height:236px;">-->
<!--            </a>-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
<!--      </div>-->
<!--      <div class="announcement">-->
<!--        <div class="liveRecomend-title">-->
<!--          <img src="@/assets/home/homeIcon/noticeRight@2x.png"-->
<!--               style="width:25px;height:22px;margin: 18px 12px 18px 0px;">-->
<!--          <p class="liveRecomend-title-text">行为准则</P>-->
<!--        </div>-->
<!--        <div class="announcement-item">-->
<!--          <a href="https://pic.imifan.live/mifanh5/h5/anchorAdminitrationSpcification.html" target="_blank"-->
<!--             @click="homeClickEvent('ad_click','行为准则','https://pic.imifan.live/mifanh5/h5/anchorAdminitrationSpcification.html')">-->
<!--            <img src="@/assets/home/events/youxiuzhubo@2x.png" style="width:592px;height:109px;">-->
<!--          </a>-->
<!--          <a href="https://pic.imifan.live/mifanh5/h5/barrageSpecification.html" target="_blank"-->
<!--             @click="homeClickEvent('ad_click','行为准则','https://pic.imifan.live/mifanh5/h5/barrageSpecification.html') ">-->
<!--            <img src="@/assets/home/events/danmuliyi@2x.png" style="width:592px;height:109px;">-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->


    <div class="liveRecomend news" style="margin-top:15px;">
      <section class="hot-wrap">
        <div class="liveRecomend-title">
          <img src="@/assets/home/homeIcon/hotRecom@2x.png" style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
          <p class="liveRecomend-title-text">热门
<!--            推荐<i class="el-icon-arrow-right arrow-right"></i> -->
          </P>
        </div>
        <div style="margin: 0 -12px;width:100%">
          <livelistitem :liveList="recommendVideo8" :itemStyle="{width: 'calc(33.3% - 24px)'}"
                        @homeListEventTanck="homeListHotTanck"></livelistitem>
        </div>
      </section>
      <section class="news-wrap">
        <div class="liveRecomend-title">
          <img src="@/assets/home/homeIcon/news.png" style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
          <p class="liveRecomend-title-text">官方公告
<!--            <i class="el-icon-arrow-right arrow-right"></i>-->
          </P>
        </div>
        <section class="news-content">
          <el-carousel height="236px">
            <el-carousel-item v-for="(item,index) in protocolList" :key="index">
              <a :href="item.url" target="_blank" @click="homeClickEvent('ad_click','新闻公告',item.url)">
                <img :src="item.img" style="width:290px;height:236px;">
              </a>
            </el-carousel-item>
          </el-carousel>
          <div class="news-item" v-for="(item,index) in protocolList" :key="index">
            <a class="news-item-title" :href="item.url" target="_blank">{{ item.title }}</a>
            <!--          <p class="news-item-desc">{{ item }} 爱球直播平台（以下简称“本平台”）是全民的直…</p>-->
          </div>
        </section>
      </section>
    </div>

    <div class="liveRecomend" v-show="recommendFootball.length>0">
      <div class="liveRecomend-title">
        <img src="@/assets/home/homeIcon/footballRecom@2x.png"
             style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
        <p class="liveRecomend-title-text">足球
<!--          推荐<i class="el-icon-arrow-right arrow-right"></i>-->
        </P>
      </div>
      <div style="margin: 0 -12px;width:1224px">
        <livelistitem :liveList="recommendFootball" :itemStyle="{width: 'calc(25% - 24px)'}"
                      @homeListEventTanck="homeListFootballTanck"></livelistitem>
      </div>
    </div>
    <div class="liveRecomend" v-show="recommendBasketball.length>0">
      <div class="liveRecomend-title">
        <img src="@/assets/home/homeIcon/basketBallRecom@2x.png"
             style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
        <p class="liveRecomend-title-text">篮球
<!--          推荐<i class="el-icon-arrow-right arrow-right"></i>-->
        </P>
      </div>
      <div style="margin: 0 -12px;width:1224px">
        <livelistitem :liveList="recommendBasketball" :itemStyle="{width: 'calc(25% - 24px)'}"
                      @homeListEventTanck="homeListBasketBallTanck"></livelistitem>
      </div>
    </div>
    <div class="liveRecomend" v-show="recommendAll.length>0">
      <div class="liveRecomend-title">
        <img src="@/assets/home/homeIcon/all.png"
             style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
        <p class="liveRecomend-title-text">综合
<!--          推荐<i class="el-icon-arrow-right arrow-right"></i>-->
        </P>
      </div>
      <div style="margin: 0 -12px;width:1224px">
        <livelistitem :liveList="recommendAll" :itemStyle="{width: 'calc(25% - 24px)'}"
                      @homeListEventTanck="homeListBasketBallTanck"></livelistitem>
      </div>
    </div>
    <!--右下角滑块-->
    <right-float-layer :step="200"></right-float-layer>
  </div>
</template>
<script>
  import { Button, Popover, divider, Carousel, CarouselItem } from 'element-ui'
  import RightFloatLayer from '@/components/right-float-layer.vue'
  import videoPlayer from "@/components/video/videoPlayer.vue"
  import livelistitem from "@/components/live-list-item.vue"
  import * as eventTrack from '@/utils/eventTracking.js'
  import { liveList } from "@/api/api";

  export default {
    name: 'home-live',
    components: {
      [Button.name]: Button,
      [Popover.name]: Popover,
      [divider.name]: divider,
      [Carousel.name]: Carousel,
      [CarouselItem.name]: CarouselItem,
      videoPlayer,
      livelistitem,
      RightFloatLayer,
    },
    data() {
      return {
        activityItem: [],
        recommendVideo: {},
        recommendVideo6: [],
        recommendVideo8: [],
        recommendVideo2: [],  // test
        recommendBasketball: [],  // test
        recommendAll: [],  // test
        recommendFootball: [],  // test
        protocolList: [
          {
            title: "[公告]爱球直播免责声明",
            url: this.USER_SPECIAL_CONTRACT,
            img: require('@/assets/gonggao/special.jpeg'),
          },
          {
            title: "[公告]爱球直播隐私政策",
            url: this.USER_PRIVACY_CONTRACT,
            img: require('@/assets/gonggao/privacy.jpeg'),
          }
        ]
      }
    },
    computed: {
      userStatus() {
        return this.$store.state.userStatus
      },
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    created() {
      // getExtensionOrderReport()
    },
    mounted() {
      this.getSugestedList()
      this.getZQSugestedList()
      this.getLQSugestedList()
      this.getZHSugestedList()
      if (!this.isLogin) {
        // TODO 未登录弹登陆
        // this.reminder()
      }
      this.regularRefresh()
    },
    methods: {
      // 获取推荐列表
      getSugestedList() {
        let data = {
          p: 1,
          size: 14,
          typeId: 'all'
        }
        let headers = {}
        liveList(data, headers).then(res => {
          // console.log('首页-获取推荐列表--res',res)
          this.recommendVideo = res.data[0]
          this.recommendVideo6 = res.data.slice(0, 6)
          this.recommendVideo8 = res.data.slice(6, 12)
          this.recommendVideo2 = res.data.slice(1, 3)
        })

      },
      // 获取分类推荐列表-足球
      getZQSugestedList() {
        let data = {
          p: 1,
          size: 8,
          typeId: 'football'
        }
        let headers = {}
        liveList(data, headers).then(res => {
          // console.log('首页分类请求--足球', res)
          if (res.data.length) {
            this.recommendFootball = res.data
          }
        })
          .catch(e => {
            console.error(e);
          })
      },
      // 获取分类推荐列表-篮球
      getLQSugestedList() {
        let data = {
          p: 1,
          size: 8,
          typeId: 'basketball'
        }
        let headers = {}
        liveList(data, headers).then(res => {
          // console.log('首页分类请求--篮球', res)
          if (res.data.length) {
            this.recommendBasketball = res.data
          }
        })
      },
      // 获取分类推荐列表-篮球
      getZHSugestedList() {
        let data = {
          p: 1,
          size: 8,
          typeId: 'other'
        }
        let headers = {}
        liveList(data, headers).then(res => {
          // console.log('首页分类请求--篮球', res)
          if (res.data.length) {
            this.recommendAll = res.data
          }
        })
      },
      changeRocm(item) {
        this.recommendVideo = item
      },
      intoLiveRomm(itemID) {
        const { href } = this.$router.resolve(itemID, '/')
        window.open(href, "_blank");
        this.homeClickEvent('living_room_enter_click', '首页背投', this.recommendVideo.id, this.recommendVideo.name)
      },
      // 定时提醒
      reminder() {
        this.$store.state.openLoginDialog = true

        let reminderId = setInterval(() => {
          if (this.isLogin) {
            clearInterval(reminderId)
            return
          }
          this.$store.state.openLoginDialog = true
        }, 120000)
      },
      // 列表每两分钟定时刷新
      regularRefresh() {
        setInterval(() => {
          this.getSugestedList()
          this.getZQSugestedList()
          this.getLQSugestedList()
          this.getZHSugestedList()
        }, 120000)
      },
      //埋点-首页
      homeClickEvent(place, page_2_id, param, param2) {
        let eventTrackParams = {}
        if (place === 'living_room_enter_click') {
          eventTrackParams = { item_id: place, page_id: 'index', page_2_id: page_2_id, room_id: param, btn: param2 }
        } else {
          eventTrackParams = { item_id: place, page_id: 'index', page_2_id: page_2_id, btn: param }
        }
        eventTrack.reportData(eventTrackParams)
      },
      //首页埋点-接收子组件数据-热门推荐
      homeListHotTanck(param) { //living_room_enter_click
        this.homeClickEvent('living_room_enter_click', '热门推荐', param.id, param.name)
      },
      //首页埋点-接收子组件数据-足球
      homeListFootballTanck(param) {
        this.homeClickEvent('living_room_enter_click', '足球推荐', param.id, param.name)
      },
      //首页埋点-接收子组件数据-足球
      homeListBasketBallTanck(param) {
        this.homeClickEvent('living_room_enter_click', '篮球推荐', param.id, param.name)
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";
  .videoRecom {
    width: 100%;
    min-width: 1202px;
    height: 646px;
    background-color: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(26, 29, 31, 1) 51%, rgba(8, 10, 16, 1) 100%);
    background: url('../../assets/home/videoBg@2x.png') no-repeat 100% top;
    background-size: 100% 100%;

    .RecomContent {
      cursor: pointer;
      width: 1202px;
      height: 646px;
      margin: 0 auto;
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
        width: 200px;
        height: 602px;
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
          background: url('../../assets/home/arrow@3x.png');
          background-size: 187px 98px;
          background-repeat: no-repeat;
          padding-left: 3px;
        }

        .videoRecomList-item:hover {
          background: url('../../assets/home/rectangle@3x.png');
          background-size: 184px 98px;
          background-repeat: no-repeat;
          background-position: center;
          transform: scale(1.03);
        }

      }
    }
  }

  .events {
    width: 1202px;
    min-width: 1200px;
    //height: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .activity {
      width: 592px;
    }

    .announcement {
      width: 592px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .announcement-item {
        height: 236px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .liveRecomend {
    width: 1202px;
    min-width: 1202px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .liveRecomend-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .liveRecomend-title-text {
      height: 50px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 50px;
    }
  }

  .arrow-right {
    vertical-align: middle;
    margin-left: 6px;
    font-size: 13px;
    color: #666;
  }

  .news {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .hot-wrap {
      width: 920px;
      overflow: hidden;
    }

    .news-wrap {
      width: 290px;
      height: 514px;
      border-radius: 4px;
    }
    .news-content {
      height: calc(514px - 58px);
      background-color: #fff;
    }
    .news-item {
      padding: 24px 10px 0;

      .news-item-title {
        padding-bottom: 8px;
        font-size: 18px;
        color: #333;
        line-height: 1;
        @include ellipsis;
      }
      .news-item-desc {
        font-size: 14px;
        color: #666;
        line-height: 1;
        @include ellipsis;
      }
    }
  }
</style>
