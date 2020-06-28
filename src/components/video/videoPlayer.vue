<template>
  <div class="player-content" id="playerContainer" ref="playerContainer">
    <VueDplayerHls ref="DPlayer" :video="video" v-if="reFresh"></VueDplayerHls>

    <template v-if="playStatus === 1 ">
      <div class="player-status">
        <div class="pStatus1">
          <img src="@/assets/video/smallRefresh@2x.png" alt="" style="width:13px;height:12px">
          <p class="pStatus903">视频数据下载中</p>
        </div>
      </div>
    </template>
    <template v-if="playStatus === 2">
      <div class="player-status">
        <img class="status2" src="@/assets/video/noSignal@2x.png" alt="">
        <p class="pStatus903">直播信号不见了，请检查网络连接</p>
        <div>
          <!--            <img class="status2-button" src="@/assets/video/switchLine@2x.png" alt="" >-->
          <!--            <img class="status2-button" src="@/assets/video/refreshRetry@2x.png" alt="" @click="refreshRetry" >-->
        </div>
      </div>
    </template>
    <template v-if="playStatus === 903">
      <div class="player-status">
        <img class="status2" src="@/assets/video/ban@2x.png" alt="">
        <p class="pStatus903">该直播间涉及违规，已被封禁。</p>
        <p class="pStatus903" style="font-size:10px;">解封时间为：2020-03-16 17:07</p>
      </div>
    </template>
    <template v-if="playStatus === 905">
      <div class="player-status">
        <div style="width:65%;">
          <livelistitem :itemStyle="{width: 'calc(50% - 34px)'}" :liveList="notLivingSuggest"></livelistitem>
        </div>
        <p class="pStatus905">主播不在家，先看看其他的比赛吧…</p>
      </div>
    </template>
  </div>
</template>

<script>
  import { Button, Popover, divider, Carousel, CarouselItem } from 'element-ui';
  import VueDplayerHls from "@/components/video/VueDplayerHls.vue";
  import livelistitem from "@/components/live-list-item.vue";
  import { decrypt } from "@/modules/utils/crypto.js";
  import { getChannelInfo } from "@/api/api";
  import storages from "@/utils/storage.js";
  import browser from "@/utils/browser.js";

  console.log(browser, 'browser');
  export default {
    name: 'home-live',
    components: {
      [Button.name]: Button,
      [Popover.name]: Popover,
      [divider.name]: divider,
      [Carousel.name]: Carousel,
      [CarouselItem.name]: CarouselItem,
      VueDplayerHls,
      livelistitem
    },
    props: {
      roomId: {
        type: String,
        default: ''
      },
      notLivingSuggest: {
        type: Array
      }
    },
    data() {
      return {
        encryptIp: '',
        playStatus: 1, // 1-正在加载、2-无信号、
        // 视频信息
        video: {
          pic: '',
          type: "flv",
          defaultQuality: 0,
          url: '',
          quality: [
            {
              code: 'medium',
              name: '标清',
              type: 'flv',
            },
            {
              code: 'origin',
              name: '高清',
              type: 'flv',
            },
          ],
        },
        reFresh: true
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      if (this.roomId !== '') {
        this.getChannel()
      }
      // this.ipEncryp57()
    },
    destroyed() {
    },
    methods: {
      // 获取视频信息
      getChannel() {
        console.log('视频组件-执行获取信号方法', this.roomId)
        getChannelInfo(this.roomId).then(res => {  // 如果请求失败如何获取
          if (res.code === 0) {
            this.anchorDetail = res.data
            console.log('视频返回', res)
            // this.anchorDetail.playStatusCode = 905
            switch (this.anchorDetail.playStatusCode) {
              case 0: // 正常
                this.playStatus = 0
                // if (res.data.m3u8 && JSON.stringify(res.data.m3u8.rtmplist) !== '{}') {  // 清晰度
                if (res.data.allPlayUrls) {
                  const quality = storages.getItem('quality') || 'medium';
                  this.video.defaultQuality = quality== 'medium'?0:1
                  if (browser.Chrome) {
                    // chrome 浏览器去掉清晰度切换
                    delete this.video.quality
                    this.video.url = decrypt(res.data.playUrl)
                  } else {
                    this.getVideoUrl(res.data.allPlayUrls)
                    this.video.url = decrypt(res.data.allPlayUrls[quality])
                  }
                  this.video.pic = res.data.imageUrl
                  // console.log('视频解密--', this.video.url)
                } else {
                  this.playStatus = 2
                }
                break;
              case 903: // 被封禁
                this.playStatus = 903
                break;
              case 905: // 未开播
                this.playStatus = 905
                break;
              default: // 无信号
                this.playStatus = 2
                break;
            }
          } else {
            this.playStatus = 2
          }
        })
      },
      // 视频URL-清晰度-解析-数组
      getVideoUrl(rtmplist) {
        for (let key in rtmplist) {
          console.log(key);
          this.video.quality.forEach(item => {
            console.log(item);
            if (item.code === key) {
              item.url = decrypt(rtmplist[key])
            }
          })
        }
      },
      // 刷新重试
      refreshRetry() {
        // this.getChannelInfo()
      },
      ipEncryp57() {
        let userIp = localStorage.getItem("userIp").split('.')
        let encryptKey = "XQJrKfeUbZd1t5VapNzvE9TylFhRMwABGqxum84PC762H0jskc3YgnSDL"
        userIp.forEach((item) => {
          let result = parseInt((+item) / 57) // 商
          let remainder = (+item) % 57        // 余数
          if (result > 0) {
            this.encryptIp += encryptKey.substring(result, result + 1) + encryptKey.substring(remainder, remainder + 1)
          } else {
            this.encryptIp += 'w' + encryptKey.substring(remainder, remainder + 1)
          }
        })
      }
    },
    watch: {
      'video.pic'() {
        // if(newValue !== '' && oldValue !== ''){
        //   console.log('检测到video-URL变化')
        //   this.$nextTick(() => {
        //     console.log('播放器父组件-待销毁')
        //     this.$refs.DPlayer.destroyPlayer()
        //     this.$refs.DPlayer.initDPlayer()
        //   })
        // }else if(newValue !== ''){
        //   this.$nextTick(() => {
        //     console.log('视频组件-监听到封面变化')
        //     this.$refs.DPlayer.initDPlayer()
        //   })
        // }

        // if(newValue !== ''){
        //   this.reFresh= false
        //   this.$nextTick(()=>{
        //     console.log('运行子组件')
        //     this.reFresh = true
        //   })
        // }
      },
      roomId() {
        this.getChannel()
        this.reFresh = false
        this.$nextTick(() => {
          console.log('运行子组件')
          this.reFresh = true
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_var.scss";

  .player-content {
    position: relative;
    width: 100%;
    //height: 100%;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    padding: 0px;
    /*z-index: 0;*/
    .Watermark {
      max-width: 120px;
      height: 58px;
      position: absolute;
      right: 70px;
      top: 50px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      font-size: 10px;
      color: rgba(195, 195, 195, 0.7);
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

      .status1 {
        width: 198px;
        height: 58px;
      }

      .status2 {
        width: 150px;
        height: 150px;
      }

      .status2-button {
        width: 90px;
        height: 27px;
        margin: 5px 5px 5px 5px;
      }

      .pStatus905 {
        width: 240px;
        height: 21px;
        font-size: 15px;
        color: rgba(255, 175, 0, 1);
        line-height: 21px;
      }

      .pStatus903 {
        height: 17px;
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
        line-height: 17px;
      }

      .pStatus1 {
        width: 120px;
        height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
</style>
