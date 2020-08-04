<template>
  
    <div class="background-my">
      <div class="downloadall">
        <div class="download">
          <button round class="downloadios" @click="openIos()">ios</button>
          <div v-if="showimg1" class="code1"></div>
        </div>
        <div class="Download">
          <button round class="downloadandroid" @click="openAndroid()">andriod</button>
          <div v-if="showimg2" class="code2"></div> 
        </div>
      </div>
    </div>
 
</template>

<script>
// import { openOrDownload } from '@/utils/openOrDownload.js'
export default {
  data() {
    return {
      showimg1: false,
      showimg2: false,
      // imgSrc:require('../img/download.jpg')
    };
  },
  computed:{
  },
  mounted: {
    
  },
  methods:{
    openIos() {
      this.showimg2 = false;
      this.showimg1 = !this.showimg1
      // console.log('ios')
      // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      // console.log(2)
      //   window.setTimeout(function() {
      //     window.location.href = 'https://www.baidu.com';
      //   }, 2000)
      // }
      //  window.location.href = 'https://www.baidu.com';
    },
    openAndroid() {
      this.showimg1 = false;
      this.showimg2 = !this.showimg2
        // window.setTimeout(function() {
        //   window.location.href = 'https://static.iqiulive.cn/apk/aiqiu_release_1.0.0_20200614215500.apk';
        // }, 2000)
    }
  }
};
</script>

<style lang="scss" scoped>
.background-my {
  // width: 81vw;
  width: 100%;
  height: 930px;
  margin: 0 auto;
  background: url(../assets/img/download.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.downloadall{
  // margin-top: 26%;
  margin-left: 60%;
  height: 600px;
  position: relative;
}
.downloadios{
    width: 64%;
    height: 37%;
    margin-top: 38%;
    margin-left: 17%;
    border-radius: 28%;
    opacity: 0;
}
.downloadandroid{
    width: 75%;
    height: 37%;
    border-radius: 28%;
    margin-top: 38%;
    margin-left: 11%;
    opacity: 0;
}
.download{
  width: 300px;
  height: 180px;
  background: url(../assets/img/downloadios.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  // position: fixed;
  position: absolute;
  z-index: 3;
  margin-top: 56%;
}
.Download{
  width: 280px;
  height: 189px;
  background: url(../assets/img/downloadandroid.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  position: absolute;
  // position: fixed;
  z-index: 2;
  margin-top: 69%;
  margin-left: 1.8%;
}

.code1{
  width: 220px;
  height: 220px;
  background: url(../assets/img/codeios.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  position: fixed;
  z-index: 6;
  margin-left: 41px;
}

.code2{
  width: 220px;
  height: 220px;
  background: url(../assets/img/codeandroid.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  position: fixed;
  z-index: 6;
  margin-left: 28px;
}
// .download{
//   z-index:1
// }
// .center{
//   width: 100%;
//   height: 1000px;
//   overflow-x: scroll; 
//   white-space: nowrap;
// }

// ::-webkit-scrollbar {
//  width: 7px;
//  height: 10px;
// }
// /* 滚动条的滑块 */
// ::-webkit-scrollbar-thumb {
//  background-color: #a1a3a9;
//  border-radius: 3px;
// }
</style>