<template>
  <div>
    <div class="video-content" ref="movediv" v-if="videoshow">
      <div class="videomove" @mousedown="move"></div>
      <!-- <videosmall src=""></videosmall> -->
      <videoPlayer
        class="video-player"
        ref="player"
        :roomId="recommendVideo.id"
      ></videoPlayer>
    </div>
  </div>
</template>
 <script>
import homeLive from "@/views/home/homeLive.vue";
import videoPlayer from "@/components/video/videoPlayer.vue";
import livelistitem from "@/components/live-list-item.vue";
import { liveList,recommendLiveList } from "@/api/api"
export default {
  // name: "LiveroomSmallvideo",
  components: {
      videoPlayer,
      homeLive
    },
  data() {
      return {
          recommendVideo: {},
          videoshow:false,
      }
  },
//   props: {
//     roomId: {
//       type: String,
//       default: ""
//     },
//     notLivingSuggest: {
//       type: Array
//     },
//     videoshow: {
//       type: Boolean
//     }
//   },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.getSugestedList();
  },
  methods: {
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
        })
      },
    move(e) {
      // let e = window.event;
      let odiv = e.target; //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;

        //移动当前元素下面没有
        odiv.style.left = left + "px";
        this.$refs.player.$el.style.left = left + "px";

        odiv.style.top = top + "px";
        this.$refs.player.$el.style.top = top + "px";
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    handleScroll() {
      this.scrollTop = window.pageYOffset;
      // console.log(this.scrollTop);
      if (this.scrollTop >= 700) {
        this.videoshow = true;
      } else {
        this.videoshow = false;
      }
    }
  }
};
</script>

 <style lang="scss" scoped>
@import "@/assets/css/_index.scss";
.video-content {
  // position: absolute;
  position: fixed;
      right: 86px;
  top: 350px;
  width: 500px;
  height: 200px;
}
.videomove {
  position: absolute; /*定位*/
  // top: 100px;
  // left: 20%;
  width: 500px;
  height: 250px;
  // background-color: #bbf;
  cursor: move;
  opacity: 0;
  z-index: 100;
}
.video-player {
  left: 20px;
  top: 20px;
  z-index: 50;
}
</style>