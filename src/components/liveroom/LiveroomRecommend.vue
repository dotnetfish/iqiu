<template>
  <section class="recommend-container">
    <template v-show="recommendList.length>0">
      <div class="header-wrap">
        <h3 class="recommend-title">直播推荐</h3>
        <div class="more" @click="handleJump('/zhibo')">更多 <i class="el-icon-arrow-right"></i></div>
      </div>
      <ul class="live-recommend" ref="recommend">
<!--        <live-list-item-->
<!--          :liveList="recommendList" :itemStyle="{width: 'calc(45% - 34px)'}">-->
<!--        </live-list-item>-->
        <template v-for="(item,index) in recommendList">
          <li class="live-recommend-item" :key="item.id" v-if="index < showCount" @click="handleJump('/'+ item._id)">
            <div class="logo-wrap">
              <img class="item-bg" :src="item.imageUrl" alt="">
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="content-wrap">
              <img class="content-logo" :src="item.avatarUrl" alt="">
              <div class="title-wrap">
                <h3 class="uname">{{ item.uname }}</h3>
              </div>
              <div class="desc-wrap">
<!--                <div class="type">{{ item.typeName }}</div>-->
                <div class="onlinescore"><i></i>{{ item.onlinescore }}</div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </template>

<!--    <div class="header-wrap">-->
<!--      <h3 class="recommend-title">精彩推荐</h3>-->
<!--      <div class="more">更多 <i class="el-icon-arrow-right"></i></div>-->
<!--    </div>-->
<!--    <el-carousel :interval="4000" type="card" :autoplay="false" trigger="click" arrow="always">-->
<!--      <el-carousel-item v-for="item in 6" :key="item">-->
<!--        <img src="@/assets/img/live-rank-default-logo.png" alt="">-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
  </section>
</template>

<script>
  // import {Carousel, CarouselItem} from 'element-ui';
  import { debounce } from "@/utils/debounceAndthrottle";
  // import LiveListItem from '@/components/live-list-item.vue'

  export default {
    name: 'LiveroomRecommend',
    components: {
      // LiveListItem
      // [Carousel.name]: Carousel,
      // [CarouselItem.name]: CarouselItem,
    },
    props: {
      recommendList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    watch: {
      recommendList: function () {
        console.log(this.recommendList);
        this.$nextTick(() => {
          this.init()
        })
      }
    },
    data() {
      return {
        showCount: 0
      }
    },
    mounted() {
      window.addEventListener("resize", this.resize);
      // this.init()
      // setTimeout(() => {
      //   console.log(this.$refs.recommend.clientWidth, 'this.$refs.recommend.clientWidth');
      //   this.showCount = (this.$refs.recommend.clientWidth / 265).toFixed(0)
      //   console.log(this.$refs.recommend.clientWidth / 265);
      //   console.log(this.showCount);
      // }, 1000)
    },
    destroyed() {
      // 移除resize监听
      window.removeEventListener("resize", this.resize);
    },
    methods: {
      resize: debounce(function () {
        this.init()
      }, 40, false),

      init() {
        console.log('init');
        this.showCount = (this.$refs.recommend.clientWidth / 265).toFixed(0)
      },
      handleJump(path) {
        console.log(path);
        const { href } = this.$router.resolve(path)
        window.open(href, "_blank");
      }

    }
  }
</script>
<style>
  .el-carousel__item img {
    width: 100%;
    background-color: red;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .header-wrap {
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .recommend-title {
      font-size: 22px;
      line-height: 30px;
      @extend .bold;
    }

    .more {
      font-size: 16px;
      color: $color-title2;
      cursor: pointer;

      ::v-deep .el-icon-arrow-right {
        color: $color-title2;
      }
    }
  }

  .live-recommend {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    .live-recommend-item {

      margin-right: 10px;
      margin-bottom: 10px;
      flex: 1 1 auto;
      display: inline-block;
      width: 240px;
      /*height: 214px;*/
      border-radius: 4px;
      background-color: #fff;
      overflow: hidden;
      transition: all 0.5s;

      &:nth-last-of-type(1) {
        margin-right: 0;
      }

      &:hover {
        box-shadow: 0px 18px 18px -2px rgba(0, 0, 0, 0.12);
        cursor: pointer;

        .item-bg {
          transform: scale(1.2)
        }

        .name {
          color: $color-main !important;
        }
      }

      .logo-wrap {
        overflow: hidden;

        .item-bg {
          transition: all 0.5s;
          width: 100%;
          height: 141px;
        }
      }
      .name {
        padding: 8px 14px 0;
        overflow: hidden;
        font-weight: 600;
        /*margin-bottom: 7px;*/
        font-size: 13px;
        color: $color-title1;
        @extend .bold;
        @include ellipsis()
      }
      .content-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 44px;
        line-height: 1;
        font-size: 12px;
        color: $color-title3;



        .content-logo {
          margin-top: -6px;
          margin-left: 14px;
          margin-right: 6px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }

        .title-wrap {
          flex: 1;
          overflow: hidden;


          .uname {
            @include ellipsis()
          }
        }

        .desc-wrap {
          margin-right: 11px;
          text-align: right;

          .type {
            margin-bottom: 7px;
          }

          .onlinescore {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            i {
              margin-right: 6px;
              width: 10px;
              height: 13px;
              background: url('~@/assets/icon_user.png') 0 0 no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
  }

</style>
