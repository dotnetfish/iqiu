<template>
   <div v-if="video.url !== '' " ref="dplayer" class="dplayer"  id="dplayer1"  v-bind:style="{ height: height + 'px' }"></div>
   <div v-else ref="dplayerSpecial" class="dplayer"  id="dplayer2"  v-bind:style="{ height: height + 'px' }"></div>
</template>

<script>
// import Hls from 'hls.js' // hls模式-m3u8流
import flvjs from 'flv.js/dist/flv.min.js' // flv流，
import DPlayer from 'dplayer'
import 'dplayer/dist/DPlayer.min.css'
import elementResizeDetectorMaker from 'element-resize-detector'
import storages from "@/utils/storage.js";

 // window.Hls = Hls
window.flvjs = flvjs
export default {
  props: {
    video: {
      type: Object
    },
  },
  data () {
    return {
      dPlayer: null,
      height: 0
    }
  },
  watch: {
    // video:{//深度监听，可监听到对象、数组的变化
    //   handler:function(val, oldVal){
    //     console.log()
    //     if(val.url !=='' ){
    //      console.log('播放器-监听video新',val,'监听video新',oldVal)
    //      // this.destroyPlayer()
    //      this.initDPlayer()
    //     }
    //   },
    //   deep:true //true 深度监听
    //  }
     'video.pic' (newValue) {
       console.log(newValue,'newValuenewValuenewValuenewValue');
       if(newValue !== ''){
        this.$nextTick(() => {
          this.initDPlayer()
          this.listenElementwidth('dplayer1')
        })
      }else {
        this.$nextTick(() => {
          this.listenElementwidth('dplayer2')
        })

      }
    },
  },
  mounted () {
    console.log('window',window)
    console.log('flvjs',flvjs)
    if(this.video.url !== ''){
      this.initDPlayer()
    }else {
      this.$nextTick(() => {
        this.listenElementwidth('dplayer2')
      })
    }
    // document.getElementById("dplayer1").oncontextmenu = function(){  // test 去掉右键
    //    return false;
    // }
  },

  methods: {
    initDPlayer () {
      console.log('播放器初始化')
      console.log(JSON.stringify(this.video));
      this.dPlayer = new DPlayer({
        container: this.$refs.dplayer,
        live: true,
        autoplay: true, // 自动播放
        theme: '#1BB5EC',
        loop: false, // 视频循环播放
        lang: 'zh-cn',
        screenshot: false,
        hotkey: false, // 开启热键，支持快进、快退、音量控制、播放暂停
        preload: 'auto',
        volume: 0.8,
        date1:'',
        date2:'',
        date3:'',
        time:0,
        mutex: true, // 互斥，阻止多个播放器同时播放
        contextmenu: '',
        video: this.video
      })

      // this.$nextTick(() => {
      //   console.log(this.$refs.dplayer.clientWidth, 'wwww-video')
      //   console.log(this.height = this.$refs.dplayer.clientWidth / 5 * 3, 'height')
      // })
      this.dPlayer.play()
      console.log('播放器初始化完成')
      this.initEvents();
    },
    destroyPlayer(){
      console.log('销毁播放器')
      this.dPlayer.destroy()
    },
    listenElementwidth (dom) {
       // 监听-dplayer宽度
      let erd = elementResizeDetectorMaker();  // 引入element-resize-detector,监听宽度变化
      let that = this;
      erd.listenTo(document.getElementById(dom), function () {
        that.$nextTick(function () {
        // console.log(this.$refs.dplayer.clientWidth, 'video')
          if(this.video.url !== ''){
            console.log(12)
            console.log(this.$refs.dplayer.clientWidth / 5 * 3, 'video-height')
            this.height = this.$refs.dplayer.clientWidth / 5 * 3, 'video-height'
          }else{
            console.log(23)
            console.log(this.$refs.dplayerSpecial.clientWidth / 5 * 3, 'video-height')
            this.height = this.$refs.dplayerSpecial.clientWidth / 5 * 3, 'video-height'
          }
        })
      })

    },
    initEvents () {
      this.dPlayer.on('play', () => {
        this.$emit('play')
        this.date1 = new Date()
        console.log("开始播放(～￣▽￣)～")
      })
      this.dPlayer.on('quality_start', (res) => {
        storages.setItem('quality', res.code)
        this.$emit('quality_start')
      })
      this.dPlayer.on('pause', () => {
        this.$emit('pause')
        this.date2 = new Date()
        this.date3 = this.date2.getTime() - this.date1.getTime();
        var leave1=this.date3%(24*3600*1000)
        var leave2=leave1%(3600*1000)
        var minutes=Math.floor(leave2/(60*1000))
        var leave3=leave2%(60*1000)
        this.time=this.time + Math.round(leave3/1000)
        console.log("结束播放(～￣▽￣)～=",minutes,this.time)
      })
      this.dPlayer.on('canplay', () => {
        this.$emit('canplay')
      })
      this.dPlayer.on('playing', () => {
        this.$emit('playing')
      })
      this.dPlayer.on('ended', () => {
        this.$emit('ended')
      })
      this.dPlayer.on('error', () => {
        this.$emit('error')
      })
    }
  }
}
</script>

<style scoped>
.dplayer{
  width: 100%;
  height: 100%;
  padding: 0px;
  background-color: #222;
}
</style>
