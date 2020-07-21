<template>
  <div>
    <div class="video-content" ref="movediv" v-if="videoshow">
      <div class="videomove" @mousedown="move"></div>
      <!-- <videosmall src=""></videosmall> -->
      <videoPlayer
        class="video-player"
        ref="player"
        :roomId="recommendVideo.id"
        :notLivingSuggest="recommendVideo2"
      ></videoPlayer>
    </div>
  </div>
</template>
 <script>
import livelistitem from "@/views/home/hpmeLive.vue";
export default {
  name: "LiverommSmallvideo",
  components: {},
  props: {
    roomId: {
      type: String,
      default: ""
    },
    notLivingSuggest: {
      type: Array
    },
    videoshow: {
      type: Boolean
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
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
      console.log(this.scrollTop);
      if (this.scrollTop >= 700) {
        this.videoshow = true;
      } else {
        this.videoshow = false;
      }
      // var offsetTop = Number(this.scrollTop);
      // this.$refs.movediv.style.top+=offsetTop+'px';
      // this.$refs.movediv.style.top+=200+'px';
      // console.log(this.$refs.movediv.style.top)
      // console.log(offsetTop)
    }
  }
};
</script>

 <style lang="scss" scoped>
.video-content {
  // position: absolute;
  position: fixed;
  left: 1450px;
  top: 557px;
  width: 500px;
  height: 200px;
}
.videomove {
  position: absolute; /*定位*/
  top: 100px;
  left: 100px;
  width: 500px;
  height: 250px;
  // background-color: #bbf;
  cursor: move;
  opacity: 0;
  z-index: 100;
}
.video-player {
  left: 100px;
  top: 100px;
  z-index: 50;
}
</style>