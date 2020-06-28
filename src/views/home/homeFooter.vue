<template>
 <div>
    <footer>
       <div class="home-footer">
         <div class="home-footer-content">
           <div class="footer-content-item">
<!--            <div class="content-layout">-->
<!--              <p class="title">友情链接</p>-->
<!--                 <p ><a href="http://www.soti008.com/" class="content" target="_blank" >搜体网</a></p>-->
<!--                 <p ><a href="http://www.173zbw.com/" class="content" target="_blank">173直播</a></p>-->
<!--                 <p ><a href="http://www.7tian.tv" class="content" target="_blank">七天直播网</a></p>-->
<!--                 <p ><a href="http://www.xunball.com" class="content" target="_blank">讯球体育网</a></p>-->
<!--                 <p ><a href="http://www.mso8.com" class="content" target="_blank" >奥体网体育</a></p>-->
<!--                 <p ><a href="http://www.7m.tv" class="content" target="_blank">7M直播</a></p>-->
<!--                 <p ><a href="http://www.iqty.net" class="content" target="_blank">爱球网</a></p>-->

<!--            </div>-->
<!--            <el-divider direction="vertical" style="height:124px" height="124"></el-divider>-->
            <div class="content-layout">
               <p class="title">主播中心</p>
                    <p class="content" @click="openDialog">申请成为主播</p>
                    <!-- <p class="content">新手主播上路</p> -->
                    <p ><a target="_blank" :href="DOWNLOAD_APP_URL" class="content">直播助手下载</a></p>
                    <!-- <p class="content">手机开播教程</p> -->
            </div>
<!--            <el-divider direction="vertical"></el-divider>-->
            <div class="content-layout">
               <p class="title">爱球直播APP</p>
                <p class="content sub-title">iOS/Android下载</p>
                <img src="@/assets/img/all-download-qrcode.png" style="width:96px;height:96px"/>
            </div>
<!--            <el-divider direction="vertical"></el-divider>-->
            <div class="content-layout">
               <p class="title">联系我们</p>
                <p class="content sub-title">主播及公会合作微信</p>
                <img src="@/assets/img/all-contact-qrcode.png" style="width:96px;height:96px"/>
            </div>
         </div>
        </div>
         <div class="home-footer-record">
            <P class="record-content"><span v-show="$store.state.isCN">杭州广悦互联网科技有限公司 浙江省杭州市萧山区宁围街道民和路479号国泰科技大厦2单元901室</span>备案号：浙ICP备20019840号-1</P>
            <P class="record-content">QQ：1478643884 邮箱：1478643884@qq.com <span v-show="$store.state.isCN">电话：0571-82802177</span></P>
         </div>
       </div>
    </footer>
     <el-dialog title="" :visible.sync="dialogOpenVisible"  append-to-body width="240px">
        <div class="code-down">
          <div class="code-show">
            <h3 class="title">下载爱球APP</h3>
            <p class="info">下载APP申请主播只需三步</p>
            <p class="code-pic"><img  src="@/assets/img/all-download-qrcode.png"></p>
            <p class="down-zhushou"><a target="_blank" :href="DOWNLOAD_APP_URL">下载直播助手</a></p>
          </div>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { Button, Popover, divider, Carousel, CarouselItem, Dialog} from 'element-ui';
import * as eventTrack from '@/utils/eventTracking.js'
  export default {
    name: 'home-footer',
    components: {
      [Button.name]: Button,
      [Popover.name]: Popover,
      [divider.name]: divider,
      [Carousel.name]: Carousel,
      [CarouselItem.name]: CarouselItem,
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        dialogOpenVisible: false,
        isOverseas: process.env.VUE_APP_CDN == 'overseas'
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      openDialog(){
        this.dialogOpenVisible = true
        this.homeFooterClickEvent('申请成为主播','主播中心')
      },
      //埋点-首页
      homeFooterClickEvent (page_2_id, param) {
        let eventTrackParams = {}
        eventTrackParams = { item_id: 'down_nav_click', page_id: 'index', page_2_id : page_2_id , btn: param }
        eventTrack.reportData(eventTrackParams)
      },
    },
  watch: {
  }
}
</script>
<style lang="scss" scoped >
 @import "@/assets/css/_index.scss";
 @import "@/assets/css/_var.scss";
.home-footer{
  width: 100%;
  min-width: 1200px;
  height: 318px;
  font-family:PingFangSC-Regular,PingFang SC;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .home-footer-content{
    background: #333333;
    width: 100%;
    min-width: 1200px;
    height: 261px;
    padding-top: 40px;
    cursor: pointer;
    .footer-content-item{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .el-divider--vertical{
        height: 124px;
        background:#D8D8D8;
      }
      .content-layout{
        height: 221px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .title{
          height: 40px;
          font-size: 16px;
          font-family: PingFangSC-Medium,PingFang SC;
          font-weight: 500;
          color: rgba(255,255,255,1);
          line-height: 22px;
        }
        .content{
          height: 35px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(153,153,153,1);
          line-height: 25px;
        }
        .sub-title {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
        }
        a:hover{
        color: $color-main;
      }
      }

    }
  }
  .home-footer-record{
    background:#000;
    width: 100%;
    height: 57px;
    .record-content{
      text-align: center;
      font-size: 12px;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height: 25px;
      .ahref {
        cursor:pointer;
        color:rgba(153,153,153,1);
      }
      a:hover{
        color: $color-main;
      }
    }
  }
}
.events{
  width: 1202px;
  min-width: 1200px;
  height: 280px;
  background: #999999;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .activity{
    width: 592px;
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    // align-items: flex-start;
  }
  .announcement{
    width: 592px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
.down-dialog {
  ::v-deep.el-dialog{
    border-radius:10px;
  }
  }
   .code-show-pop {
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
   }

  .code-down {
    // position: relative;
    .code-show {
      margin-top: -30px;
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      // box-shadow: 1px 2px 10px 0px #9B9B9B;
      .title {
        font-size:16px;
        color:#333;
        line-height:22px;
        font-weight: 500;
      }
      .info {
        margin-top: 10px;
        font-size:12px;
        line-height:17px;
        color: #666;
      }
      .code-pic {
        width:120px;
        height:120px;
        margin: 10px auto;
        border-radius:4px;
        border: 0.5px solid #ccc;
        img {
          width: 110px;
          height: 110px;
          margin: 5px;
        }
      }
      .down-zhushou {
        margin-top: 0px;
        margin-bottom: -20px;
        height: 46px;
        line-height: 46px;
        // border-top: 1px solid #D9D9D9;
        font-size: 14px;
        /*a {*/
        /*  padding-left: 35px;*/
        /*  background: url('../../assets/icon_kt3.png') no-repeat left center;*/
        /*}*/
      }
    }
  }
</style>
