<template>
  <div class="center">
    <div class="background-my">
      <div class="downloadall">
        <div class="download">
          <button round class="downloadios" @click="openIos()">ios</button>
          <div v-if="showimg" class="code"></div>
        </div>
        <div class="Download">
          <button round class="downloadandroid" @click="openAndroid()">andriod</button> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { openOrDownload } from '@/utils/openOrDownload.js'
export default {
  data() {
    return {
      showimg: false
      // imgSrc:require('../img/download.jpg')
    };
  },
  computed:{

  },
  methods:{
    openIos() {
      this.showimg = !this.showimg
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
        window.setTimeout(function() {
          window.location.href = 'https://static.iqiulive.cn/apk/aiqiu_release_1.0.0_20200614215500.apk';
        }, 2000)
    }
  }
};
</script>

<style lang="scss" scoped>
.background-my {
  width: 81vw;
  height: 93vh;
  margin-right: 100px;
  background: url(../assets/img/download.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  position: fixed;
  left: 200px;

}
.downloadall{
  margin-top: 410px;
  margin-left: 60%;
  height: 600px;
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
  position: fixed;
  z-index: 4;
}
.Download{
  width: 280px;
  height: 189px;
  background: url(../assets/img/downloadandroid.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  position: fixed;
  z-index: 2;
  margin-top: 100px;
  margin-left: 0.6%;
}

.code{
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
// .download{
//   z-index:1;
// }
// .center{
//   margin-right: 100px;
// }
</style>