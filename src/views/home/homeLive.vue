<template>
  <div>
    <div class="videoRecom">
      <div class="imgright" @click.self="downloadright()"></div>
      <div class="imgleft" @click.self="downloadleft()"></div>
      <div class="RecomContent">
        <div class="videoRecomMain">
          <videoPlayer class="videoPlayer" ref="dPlayer" :roomId="recommendVideo.id" :notLivingSuggest="recommendVideo2"></videoPlayer>
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
      <div class="liveRecomend">
        <div class="liveRecomend-title">
          <img src="@/assets/home/rebo.png" style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
          <p class="liveRecomend-title-text">热门赛事</P>
        </div>
        <div class="bigboss">
          <div class="boss">
            <div class="bossone">
              <div style="width:33px;height:30px;"><img src="@/assets/home/zuqiu.png" style="width:33px;height:30px"></div>
              <div style="line-height:30px;color:rgb(154, 160, 179);margin-left:10px">莫西超</div>
              <div style="line-height:30px;margin-left:20%;margin-right:2%">07月28日</div>
              <div style="line-height:30px;color:rgb(154, 160, 179)">09:00</div>
            </div>

            <div class="bosstow">
              <div style="width:60px;height:60px;"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
               <div style="line-height:60px;margin-left:28px;margin-right:28px">0-1</div>
              <div style="width:60px;height:60px"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
            </div>

            <div class="bossthree">
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">系里哈哈</div>
              <div style="width:60px;height:28px;margin-left:12px;margin-right:12px"><img src="@/assets/home/lookbo.jpg" style="width:60px;height:28px"></div>
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">呼哈呼哈</div>
            </div>
          </div>
          <div class="boss">
            <div class="bossone">
              <div style="width:33px;height:30px;"><img src="@/assets/home/zuqiu.png" style="width:33px;height:30px"></div>
              <div style="line-height:30px;color:rgb(154, 160, 179);margin-left:10px">莫西超</div>
              <div style="line-height:30px;margin-left:20%;margin-right:2%">07月28日</div>
              <div style="line-height:30px;color:rgb(154, 160, 179)">09:00</div>
            </div>

            <div class="bosstow">
              <div style="width:60px;height:60px;"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
               <div style="line-height:60px;margin-left:30px;margin-right:30px">VS</div>
              <div style="width:60px;height:60px"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
            </div>

            <div class="bossthree">
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">系里哈哈</div>
              <div style="width:60px;height:28px;margin-left:12px;margin-right:12px"><img src="@/assets/home/yuyue.jpg" style="width:60px;height:28px"></div>
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">呼哈呼哈</div>
            </div>
          </div>
          <div class="boss">
            <div class="bossone">
              <div style="width:33px;height:30px;"><img src="@/assets/home/zuqiu.png" style="width:33px;height:30px"></div>
              <div style="line-height:30px;color:rgb(154, 160, 179);margin-left:10px">莫西超</div>
              <div style="line-height:30px;margin-left:20%;margin-right:2%">07月28日</div>
              <div style="line-height:30px;color:rgb(154, 160, 179)">09:00</div>
            </div>

            <div class="bosstow">
              <div style="width:60px;height:60px;"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
               <div style="line-height:60px;margin-left:30px;margin-right:30px">VS</div>
              <div style="width:60px;height:60px"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
            </div>

            <div class="bossthree">
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">系里哈哈</div>
              <div style="width:60px;height:28px;margin-left:12px;margin-right:12px"><img src="@/assets/home/yuyue.jpg" style="width:60px;height:28px"></div>
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">呼哈呼哈</div>
            </div>
          </div>
          <div class="boss">
            <div class="bossone">
              <div style="width:33px;height:30px;"><img src="@/assets/home/zuqiu.png" style="width:33px;height:30px"></div>
              <div style="line-height:30px;color:rgb(154, 160, 179);margin-left:10px">莫西超</div>
              <div style="line-height:30px;margin-left:20%;margin-right:2%">07月28日</div>
              <div style="line-height:30px;color:rgb(154, 160, 179)">09:00</div>
            </div>

            <div class="bosstow">
              <div style="width:60px;height:60px;"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
               <div style="line-height:60px;margin-left:30px;margin-right:30px">VS</div>
              <div style="width:60px;height:60px"><img src="@/assets/icon_nologin@2x.png" style="width:60px;height:60px"></div>
            </div>

            <div class="bossthree">
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">系里哈哈</div>
              <div style="width:60px;height:28px;margin-left:12px;margin-right:12px"><img src="@/assets/home/yuyue.jpg" style="width:60px;height:28px"></div>
              <div style="line-height:30px;width:63px;height:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">呼哈呼哈</div>
            </div>
          </div>
        </div>   
    </div>

      <div class="liveRecomend">
        <div class="liveRecomend-title">
          <img src="@/assets/home/homeIcon/hotRecom@2x.png" style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
          <p class="liveRecomend-title-text">热门
           <!-- 推荐<i class="el-icon-arrow-right arrow-right"></i> -->
          </P>
          <button class="liveRecomend-title-chenge"  @click="changeHotVideo()">换一换
           <!-- 推荐<i class="el-icon-arrow-right arrow-right"></i> -->
          </button>
        </div>
        <div style="margin: 0 -12px;width:1224px">
          <livelistitem :liveList="recommendVideo8" :itemStyle="{width: 'calc(25% - 24px)'}"
                        @homeListEventTanck="homeListHotTanck"></livelistitem>
        </div>
    </div>

      <div class="img-news">
        <section class="news-wrap">
          <div class="liveRecomend-title">
            <img src="@/assets/home/homeIcon/news.png" style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
            <p class="liveRecomend-title-text">官方公告
  <!--            <i class="el-icon-arrow-right arrow-right"></i>-->
            </P>
          </div>
          <div class="allimg">
          <div class="shuffling">
          <section class="news-content">
            <el-carousel height="350px">
              <el-carousel-item v-for="(item,index) in protocolList" :key="index">
                <a :href="item.url" target="_blank" @click="homeClickEvent('ad_click','新闻公告',item.url)">
                  <img :src="item.img" style="width:420px;height:350px;">
                </a>
              </el-carousel-item>
            </el-carousel>
            <!-- <div class="news-item" v-for="(item,index) in protocolList" :key="index">
              <a class="news-item-title" :href="item.url" target="_blank">{{ item.title }}</a> -->
              <!--          <p class="news-item-desc">{{ item }} 爱球直播平台（以下简称“本平台”）是全民的直…</p>-->
            <!-- </div> -->
          </section>
          </div>
          <div>
          <div class="img1"> <img src="@/assets/gonggao/small2.png" style="width:210px;height:170px;"></div>
          <div class="img2"> <img src="@/assets/gonggao/small1.png" style="width:210px;height:170px;"></div>
          </div>
          </div>
        </section>
        <!-- 新闻 -->
        <section class="rightnews">
          <div class="liveRecomend-title">
            <img src="@/assets/home/homeIcon/news.png" style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
            <p class="liveRecomend-title-text">新闻
  <!--            <i class="el-icon-arrow-right arrow-right"></i>-->
            </P>
          </div>
          <div class="news-item" v-for="(item,index) in protocolList" :key="index">
              <a class="news-item-title" :href="item.url" target="_blank">{{ item.title }}</a>
              <!--          <p class="news-item-desc">{{ item }} 爱球直播平台（以下简称“本平台”）是全民的直…</p>-->
            </div>
        </section>
        </div>

      <!-- <section class="hot-wrap">
        <div class="liveRecomend-title">
          <img src="@/assets/home/homeIcon/hotRecom@2x.png" style="width:25px;height:22px;margin: 18px 12px 18px 0px;">
          <p class="liveRecomend-title-text">热门
          </P>
          <button class="liveRecomend-title-chenge"  @click="changeHotVideo()">换一换
          </button>
        </div>
        <div style="margin: 0 -12px;width:100%">
          <livelistitem :liveList="recommendVideo8" :itemStyle="{width: 'calc(24.4% - 18px)'}"
                        @homeListEventTanck="homeListHotTanck"></livelistitem>
        </div>
    </section> -->
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
    <!-- 拖拽 -->
    <!-- <div class="video-content" ref="movediv" v-if="videoshow">
      <div class="videomove" @mousedown="move"></div>
      <videoPlayer class="video-player" ref="player" :roomId="recommendVideo.id" :notLivingSuggest="recommendVideo2"></videoPlayer>
    </div> -->
    <liveroomSmallvideo></liveroomSmallvideo>

  </div>
</template>
<script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
<script>
  import { Button, Popover, divider, Carousel, CarouselItem } from 'element-ui'
  import RightFloatLayer from '@/components/right-float-layer.vue'
  import videoPlayer from "@/components/video/videoPlayer.vue"
  import livelistitem from "@/components/live-list-item.vue"
  import liveroomSmallvideo from "@/components/liveroom/liveroomSmallvideo.vue"
  import * as eventTrack from '@/utils/eventTracking.js'
  // import { liveList,changeHotVideo } from "@/api/api";
  import { liveList,recommendLiveList } from "@/api/api"
  // import  from "@/modules/share/qzopensl.js";
  import QRCode from 'qrcodejs2'
  // import img from '@/assets/share/kongjian.png'

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
      liveroomSmallvideo
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
            img: require('@/assets/gonggao/big2.png'),
          },
          {
            title: "[公告]爱球直播隐私政策",
            url: this.USER_PRIVACY_CONTRACT,
            img: require('@/assets/gonggao/big2.png'),
          }
        ],
        sum: 0,
        positionX:0,
        positionY:0,
        scrollTop:0,
        // videoshow:false,
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
      // this.creatQrCode()
      this.getSugestedList()
      this.getZQSugestedList()
      this.getLQSugestedList()
      this.getZHSugestedList()
      if (!this.isLogin) {
        // TODO 未登录弹登陆
        // this.reminder()
      }
      this.regularRefresh()
      // window.addEventListener('scroll',this.handleScroll,true)
    },
    methods: {
      //二维码
    //   creatQrCode() {
    //     var qrcode = new QRCode(this.$refs.qrCodeUrl, {
    //         text: 'http://m.iqiulive.cn', // 需要转换为二维码的内容
    //         width: 100,
    //         height: 100,
    //         colorDark: '#000000',
    //         colorLight: '#ffffff',
    //         correctLevel: QRCode.CorrectLevel.H
    //     })
    // },
      //分享
      // share(type) {
      //   // console.log(encodeURIComponent(document.location))
      //   var i = "https://rpic.douyucdn.cn/asrpic/200716/254667_1359.png/dy1"
      //   if(type=='qq') {
      //     window.open('http://connect.qq.com/widget/shareqq/index.html?url='+'http://www.iqiulive.cn'+'?sharesource=qzone&title=&pics='+i+'&summary= 根据调查你确实是猪')
      //   }else if(type=='qzone') {
      //     window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+'http://www.iqiulive.cn'+'?sharesource=qzone&title=555&pics=图片地址&summary= 嗯嗯')
      //   }else if(type=='weibo') {
      //     window.open('http://service.weibo.com/share/share.php?url='+'http://www.iqiulive.cn'+'?sharesource=weibo&title=标题&pic=图片&appkey=微博平台申请的key');
      //   }else{
      //     var url = 'http://www.iqiulive.cn',
      //           encodePath = encodeURIComponent(url),
      //           targetUrl = 'http://qr.liantu.com/api.php?text=' + encodePath;
      //        window.open(url,'weixin', 'height=320, width=320')
      //   }
        
      //   // window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+this.sum+'&pics=图片地址&summary= 嗯嗯')
      //   // window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(document.location) + '?sharesource=qzone&title=' + sum + '&pics=' +  + '&summary=' + '');
      //   // window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content'))
      // },
      // 滚动条
      // handleScroll() {
      //   this.scrollTop = window.pageYOffset;
      //   console.log(this.scrollTop)
      //   if(this.scrollTop>=700){
      //     this.videoshow=true
      //   }else{
      //     this.videoshow=false
      //   }
      //   // var offsetTop = Number(this.scrollTop);
      //   // this.$refs.movediv.style.top+=offsetTop+'px';
      //   // this.$refs.movediv.style.top+=200+'px';
      //   // console.log(this.$refs.movediv.style.top)
      //   // console.log(offsetTop)
      // },
      downloadleft() {
         window.open('http://www.iqiulive.cn/zhibo')
      },
      downloadright() {
         window.open('http://www.iqiulive.cn/category')
      },
      // 获取推荐列表
      getSugestedList() {
        let data = {
          p: 1,
          size: 14,
          typeId: 'all'
        }
        let headers = {
         
        }
        liveList(data, headers).then(res => {
          // console.log('首页-获取推荐列表--res',res)
          this.recommendVideo = res.data[0]
          this.recommendVideo6 = res.data.slice(0, 6)
          this.recommendVideo2 = res.data.slice(1, 3)
          if(res.data.length<14) {
            res.data=res.data.reverse();
            this.recommendVideo8 = res.data.slice(0, 8)}
            else{this.recommendVideo8 = res.data.slice(0, 8)}
        })
      },
      //拖拽
      // move(e){
      //       // let e = window.event;
      //       let odiv = e.target;        //获取目标元素
      //       //算出鼠标相对元素的位置
      //       let disX = e.clientX - odiv.offsetLeft;
      //       let disY = e.clientY - odiv.offsetTop;
      //       document.onmousemove = (e)=>{       //鼠标按下并移动的事件
      //           //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      //           let left = e.clientX - disX;    
      //           let top = e.clientY - disY;
                
      //           //绑定元素位置到positionX和positionY上面
      //           this.positionX = top;
      //           this.positionY = left;
                
      //           //移动当前元素下面没有
      //           odiv.style.left = left + 'px';
      //           this.$refs.player.$el.style.left = left + 'px'
                
      //           odiv.style.top = top + 'px';
      //           this.$refs.player.$el.style.top = top + 'px'

      //       };
      //       document.onmouseup = () => {
      //           document.onmousemove = null;
      //           document.onmouseup = null;
      //       };
      //   },
      // changeHotVideo() {
      //   console.log("1")
      //   let data = {
      //     // p:1,
      //     // size:6,
      //     focus:'true',
      //     typeId:'pchot'
      //     // typeld:'add'
      //   }
      //   changeHotVideo(data).then(res=>{
      //     this.recommendVideo8=res.data
      //   })
      //   },
      changeHotVideo() {
        // console.log("1")
        let data = {
          // p:1,
          // size:6,
          type:'',
          typeId:'hot'
          // typeld:'add'
        }
        let headers = {}
        recommendLiveList(data,headers).then(res=>{
          // console.log(res.data)
          // if(res.data.length<14)  res.data = res.data.concat(res.data);//res.data=res.data.reverse();
          if(this.sum==0 && res.data.length>=14) this.sum=6;
          // console.log(res.data);
          this.recommendVideo8 = res.data.slice(this.sum,this.sum+8)
          this.sum += 8
          if(this.sum >= res.data.length) this.sum = 0
        })
        },
      // 获取分类推荐列表-足球
      getZQSugestedList() {
        let data = {
          p: 1,
          size: 8,
          typeId: 'football'
        }
        let headers = {
         
        }
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
        console.log(this.$router.resolve(itemID, '/'))
        console.log(5555555);
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
    display: flex;
    position: relative;
    
    .imgleft{
      position: absolute;
      width: 50%;
      height: 646px;
      background: url(../../assets/home/left.png) no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -o-background-size: cover;
      background-position: center 0;
      z-index: 0;
    }
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
        z-index: 1;
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

    .liveRecomend-title-chenge {
      margin-left: 50px;
      height: 50px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      border: 0px;
      font-weight: 500;
      color: rgb(55, 171, 248);
      line-height: 50px;
      z-index: 4;
      outline:0;
      background-color: rgb(240, 240, 240);
    }
  }

  .arrow-right {
    vertical-align: middle;
    margin-left: 6px;
    font-size: 13px;
    color: #666;
  }

  .news {
    // display: flex;
    // flex-direction: row;
    justify-content: space-between;

    .hot-wrap {
      width: 1020px;
      overflow: hidden;
    }

    .news-wrap {
      // width: 290px;
      // height: 514px;
      width: 620px;
      height: 350px;
      border-radius: 4px;
      margin-bottom: 150px;
    }
    .news-content {
      height: calc(514px - 164px);
      background-color: #fff;
      // display: flex;
    }
    .shuffling {
      width: 420px;
      height: 350px;
    }
    .img-news {
      display: flex;
    }
    .img1 {
      width: 150px;
      height: 150px;
      margin-left: 13px;
    }
    .img2 {
      width: 150px;
      height: 150px;
      padding-top: 30px;
      margin-left: 13px;
    }
    .allimg {
      display: flex;
    }

    .rightnews {
      margin-left: 100px;
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

  .imgright{
  position: absolute;
  right: 0px;
  width: 50%;
  height: 646px;
  background: url(../../assets/home/right.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  overflow: hidden;
}
// .video-content{
//   // position: absolute;
//   position: fixed;
//   left: 1450px;
//   top: 557px;
//   width: 500px;
//   height: 200px;
// }
// .videomove{
//   position: absolute;     /*定位*/
//   top: 100px;
//   left: 100px;
//   width: 500px;
//   height: 250px;
//   // background-color: #bbf;
//   cursor:move;
//   opacity: 0;
//   z-index: 100;
// }
// .video-player{
//   left: 100px;
//   top: 100px;
//   z-index: 50;
// }

.share{
  margin-top: 50px;
  margin-left: 10px;
  width: 70px;
  height: 70px;
}

.shareall{
  margin-top: 20px;
  width: 100px;
}
.sharearea{
  width: 410px;
  height: 200px;
  display: flex;
}

.text{
  font-size: 24px;
  text-align: center;
  margin-top: 30px;
}

.bigboss {
  display: flex;
  width: 1224px;
  height: 178px;
  // border: rgb(243, 108, 108) solid 1px;
  margin-left: -12px;

}

.boss {
  width: calc(25% - 22px);
  height: 178px;
  border: rgb(233, 236, 243) solid 1px;
  margin-right: 12px;
  margin-left: 12px;
  background-color: #fff;
  border-radius: 4px;
}

.bossone {
  display: flex;
  height: 30px;
  margin-top:18px;
  margin-left: 11px;
}

.bosstow {
  display: flex;
  height: 60px;
  margin-top:10px;
  padding-left: 40px;
  padding-right: 40px;
}

.bossthree {
  display: flex;
  height: 30px;
  margin-top:10px;
  padding-left: 38px;
  padding-right: 38px;
}
</style>
