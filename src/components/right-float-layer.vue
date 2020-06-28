<template>
  <div class="right-float-layer">
    <ul class="layer-box">
      <li class="live-kt" @click="righEventTanck('我要开播')">
        <i></i>
        <span>开播</span>
        <div class="code-kt">
            <p class="down-zhushou"><a target="_blank" :href="DOWNLOAD_APP_URL">下载直播助手</a></p>
        </div>
      </li>
      <li class="down-app" :class="{'top-left-radius': isTopLeftRadius}" @click="righEventTanck('下载app')">
        <i></i>
        <span>下载</span>
        <div class="code-down">
          <div class="code-show">
            <p class="code-pic"><img  src="../assets/img/all-download-qrcode.png"></p>
            <p class="info">爱球APP   扫一扫随时看直播</p>

          </div>
        </div>
      </li>
      <li class="back-top" @click="backTop(step)">
        <i></i>
        <span>顶部</span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as eventTrack from '@/utils/eventTracking.js'
export default {
  name: 'RightFloatLayer',
  props: {
    step:{   //此数据是控制动画快慢的
      type:Number,
      default:100
    }
  },
  data() {
    return {
      isBackTopShow: false,
      isTopLeftRadius: true
    };
  },
  created(){
    window.addEventListener('scroll', this.scrollBackTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollBackTop)
  },

  methods: {
    // 返回顶部显示隐藏
    scrollBackTop () {
      let scrollTopH =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // 滚动条到顶部的距离
      let wH = document.documentElement.clientHeight || document.body.clientHeight || window.screen.height;  // 浏览器可视区域高度
        // console.log(scrollTopH)
        // console.log(wH)
        if (scrollTopH>=wH/3) {
            this.isBackTopShow = true;
            this.isTopLeftRadius = false;
            // console.log(this.isBackTopShow)
        }else {
            this.isBackTopShow = false;
            this.isTopLeftRadius = true;
            // console.log(this.isBackTopShow)
        }

    },
    // 返回顶部
    backTop(i){
        //参数i表示间隔的幅度大小，以此来控制速度
        document.documentElement.scrollTop-=i;
        if (document.documentElement.scrollTop>0) {
            var c=setTimeout(()=>this.backTop(i),16);
        }else {
            clearTimeout(c);
        }
    },
     //埋点
      righEventTanck(item){
        let eventTrackParams = {}
        eventTrackParams = { item_id: 'right_pop_click', page_id: 'download', btn: item }
        eventTrack.reportData(eventTrackParams)
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

.right-float-layer {
    position: fixed;
    z-index: $z-index1;
    bottom: 120px;
    right: 0;
    background-color: #fff;
    -webkit-box-shadow:  -5px 2px 11px 0px rgba(0, 0, 0, 0.12);
    -moz-box-shadow:  -5px 2px 11px 0px rgba(0, 0, 0, 0.12);
    -o-box-shadow:  -5px 2px 11px 0px rgba(0, 0, 0, 0.12);
    -ms-box-shadow:  -5px 2px 11px 0px rgba(0, 0, 0, 0.12);
    box-shadow:  -5px 2px 11px 0px rgba(0, 0, 0, 0.12);
    border-radius: 6px 0px 0px 6px;

    .layer-box {
        width: 64px;
          li {
            position: relative;
            height: 53px;
            padding: 12px 0 2px;
            font-size: 12px;
            color: #999;
            text-align: center;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: $color-main;
            }
            i {
              display: block;
              width: 20px;
              height: 21px;
              margin: 0 auto 5px;
            }
            span {
              display: block;
              margin: 0 auto;

            }
            .code-show {
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 1px 2px 10px 0px #9B9B9B;
              .title {
                font-size:16px;
                color:#333;
                line-height:22px;
                font-family: 'PingFangSC-Medium','PingFang SC';
                font-weight: 600;
              }
              .info {
                margin-top: 3px;
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
            }
           .code-down, .code-kt, .code-contact {
              position: absolute;
              right: 64px;
              padding-right: 6px;
            }
            .code-down {
              display: none;
              top: 0;
              .code-show {
                width: 180px;
                height: 202px;
                padding-top: 30px;
              }
            }
            .code-kt {
              display: none;
              bottom: 0;
              .down-zhushou {
                width: 185px;
                height: 46px;
                line-height: 46px;
                border-top: 1px solid #D9D9D9;
                font-size: 14px;
                background-color: #fff;
                border-radius: 10px;
                &:hover {
                  color: $color-main;
                }
              }
              .code-show {
                width: 185px;
                height: 232px;
                padding-top: 24px;
              }
            }
            .code-contact {
              display: none;
              bottom: 0;
              .code-show {
                width: 185px;
                height: 354px;
                padding-top: 24px;
                .title1 {
                  padding-top: 10px;
                }
              }
            }
          }

          .down-app {
            border-top-left-radius: 6px;

            i {
                background: url('../assets/icon_down2@2x.png') no-repeat center;
                background-size: 100%;
              }
              &:hover {
                .code-down {
                  display: block;
                }
                i {
                  background-image: url('../assets/icon_down1@2x.png');
                }
              }
          }
          .top-left-radius {
            &:hover {
              border-top-left-radius: 10px;
            }
          }
          .live-kt {
              i {
                background: url('../assets/icon_kt2@2x.png') no-repeat center;
                background-size: 100%;
              }
              &:hover {
                .code-kt {
                  display: block;
                }
                i {
                background-image: url('../assets/icon_kt1@2x.png');
                }
              }
          }
          .contact {
              i {
                background: url('../assets/icon_contact2@2x.png') no-repeat center;
                background-size: 100%;
              }
              &:hover {
                .code-contact {
                  display: block;
                }
                i {
                  background-image: url('../assets/icon_contact1@2x.png');
                }
              }
          }
      .back-top {
        border-bottom-left-radius: 6px;
        i {
          background: url('../assets/icon_back_top2@2x.png') no-repeat center;
          background-size: 100%;
        }
        &:hover {
          i {
            background-image: url('../assets/icon_back_top1@2x.png');
          }
        }
      }
    }
}

</style>
