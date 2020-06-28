<template>
  <div class="live-rank">
<!--    <el-tabs class="live-rank-tab" v-model="activeName" @tab-click="handleClick" :stretch="true">-->
<!--      <el-tab-pane :label="items.label" :name="indexs" v-for="(items,indexs) in tabList" :key="indexs">-->
<!--        <div class="rank-empty" v-if="items.isEmpty">-->
<!--          给主播送礼物可以上榜哦～-->
<!--        </div>-->
<!--        <div class="content" :class="{show:items.isShow && items.list.length>3}" v-else @mouseenter.stop.self="mouseenter(items)"-->
<!--             @mouseleave.stop.self="mouseleave(items)">-->
<!--          <div class="common-top3-wrap">-->
<!--            <div class="common-top2">-->
<!--              <div class="logo">-->
<!--                <img :src="items.list[1].avatarUrl" alt="">-->
<!--              </div>-->
<!--              <i></i>-->
<!--              <div class="name">{{ items.list[1].name }}</div>-->
<!--              <div class="shared"><span>{{ items.list[1].score }}</span></div>-->
<!--            </div>-->
<!--            <div class="common-top1">-->
<!--              <div class="logo">-->
<!--                <img :src="items.list[0].avatarUrl" alt="">-->
<!--              </div>-->
<!--              <i></i>-->
<!--              <div class="name">{{ items.list[0].name }}</div>-->
<!--              <div class="shared"><span>{{ items.list[0].score }}</span></div>-->
<!--            </div>-->
<!--            <div class="common-top3">-->
<!--              <div class="logo">-->
<!--                <img :src="items.list[2].avatarUrl" alt="">-->
<!--              </div>-->
<!--              <i></i>-->
<!--              <div class="name">{{ items.list[2].name }}</div>-->
<!--              <div class="shared"><span>{{ items.list[2].score }}</span></div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <template v-if="items.list.length>3">-->
<!--            <transition name="el-zoom-in-top">-->
<!--              <div v-show="items.isShow" class="common-list">-->
<!--                <div class="list-item" v-for="item in 7" :key="item">-->
<!--                  <div class="no-wrap"><span class="no">NO.</span>{{ item + 3 }}</div>-->
<!--                  <img class="logo" :src="items.list[item+2].avatarUrl" alt="">-->
<!--                  <span class="name">{{ items.list[item+2].name }}</span>-->
<!--                  <div class="shared">贡献值: <span>{{ items.list[item+2].score }}</span></div>-->
<!--                </div>-->
<!--                <div class="line">{{ indexs == 'dayRank'?'榜单每日6点重置':'榜单每周一6点重置' }}</div>-->
<!--              </div>-->
<!--            </transition>-->
<!--          </template>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->

  </div>
</template>

<script>
  import { Tabs, TabPane } from 'element-ui'

  export default {
    name: 'LiveroomRank',
    data() {
      return {
        tabList: {
          dayRank: {
            label: '日榜',
            list: [],
            isShow: false,
            isEmpty: true,
          },
          weekRank: {
            label: '周榜',
            list: [],
            isShow: false,
            isEmpty: true,
          }
        },
        activeName: 'dayRank',
        defalutItem: { avatarUrl: require('@/assets/img/live-rank-default-logo.png'), name: '虚位以待', score: 0 }
      }
    },
    components: {
      [Tabs.name]: Tabs,
      [TabPane.name]: TabPane
    },
    props: {
      rankObject: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    watch: {
      // 弹幕中获取新的礼物
      rankObject: {
        handler: function (newValue) {
          // console.log(oldValue, 'oldValue');
          // console.log(newValue, 'newValue');
          // 日榜填充
          this.fillRankList(newValue.dayRankingList, 'dayRank');
          // 周榜填充
          this.fillRankList(newValue.weekRankingList, 'weekRank');
        },
        immediate: false
      }
    },
    methods: {
      /**
       * 数据处理
       * 空列表 展示引导图片
       * 1~3 hover不显示下边列表 defaultItem填空
       * >3 defaultItem填空
       * @param rankList
       * @param rankType
       */
      fillRankList(rankList = [], rankType) {
        let list = [];
        if (rankList.length === 0) {
          return this.tabList[rankType].isEmpty = true
        } else if (rankList.length >= 10) {
          this.tabList[rankType].list = rankList;
        } else if (rankList.length <= 3) {
          list = JSON.parse(JSON.stringify(rankList));
          list.length = 3;
          this.tabList[rankType].list = list.fill(this.defalutItem, rankList.length, 3)
        } else if (rankList.length > 3) {
          list = JSON.parse(JSON.stringify(rankList));
          list.length = 10;
          this.tabList[rankType].list = list.fill(this.defalutItem, rankList.length, 10)
        }
        this.tabList[rankType].isEmpty = false

      },
      mouseenter(items) {
        console.log(items);
        items.isShow = true
        console.log(items.isShow);
      },
      mouseleave(items) {
        console.log(items);
        items.isShow = false
        console.log(items.isShow);
      },
      handleClick() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";

  .live-rank {
    /*height: 225px;*/
    ::v-deep .el-tabs__content {
      overflow: inherit;
    }

    .rank-empty {
      height: 211px;
      background: url('~@/assets/img/live-rank-empty.png') center 54px no-repeat;
      background-size: 140px 100px;
      padding-top: 169px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      color: $color-title2;
    }

    .content {
      position: relative;
      width: 100%;
      height: 100%;

      background: url('~@/assets/img/live-rank-bg-1.png') 0 0 no-repeat;
      background-size: cover;

      &.show {
        background: url('~@/assets/img/live-rank-bg.png') 0 0 no-repeat;
        background-size: cover;
      }
      /*background: url('~@/assets/img/live-rank-bg.png') 0 0 no-repeat;*/
      /*background-size: cover;*/

      .common-top3-wrap {
        display: flex;
        height: 211px;

        text-align: center;

        .common-top1, .common-top2, .common-top3 {
          display: flex;
          align-items: center;
          flex-direction: column;

          .name {
            width: 100%;
            color: $color-title1;
            font-size: 14px;
            @include ellipsis;
          }

          .shared {
            margin-top: 8px;
            width: 100%;
            color: $color-rank-title;
            font-size: 12px;
            @include ellipsis;

            span {
              color: $color-gift;
            }
          }
        }

        .common-top2, .common-top3 {
          width: 125px;
          padding-top: 52px;
        }

        .common-top1 {
          width: 120px;
          padding-top: 38px;
        }

        @for $i from 1 through 3 {
          .common-top#{$i} {
            i {
              margin-top: 8px;
              margin-bottom: 10px;
              width: 36px;
              height: 12px;
              background: url('~@/assets/img/live-rank-no' +$i+ '.png') 0 0 no-repeat;
              background-size: 100%;
            }
          }
        }

        .common-top1 {
          .logo {
            margin-left: 10px;

            width: 86px;
            height: 84px;
            /*background:url('~@/assets/img/test-logo.png') 2px 12px/70px 70px no-repeat;*/
            background: url('~@/assets/img/live-rank-top1-bg.png') 0 0/86px 84px no-repeat;

            img {
              display: block;
              margin-left: 2px;
              margin-top: 12px;
              width: 70px;
              height: 70px;
              border-radius: 50%;
            }
          }
        }

        .common-top2 .logo {
          margin-left: 4px;
          width: 68px;
          height: 70px;
          /*background: url('~@/assets/img/liveroom-rank-top1-bg.png') 0 0 no-repeat;*/
          background: url('~@/assets/img/test-logo.png') 2px 8px/60px 60px no-repeat, url('~@/assets/img/live-rank-top2-bg.png') 0 0/68px 70px no-repeat;

          img {
            display: block;
            margin-left: 2px;
            margin-top: 8px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }

        .common-top3 .logo {
          margin-left: 4px;
          width: 68px;
          height: 70px;
          /*background: url('~@/assets/img/liveroom-rank-top1-bg.png') 0 0 no-repeat;*/
          background: url('~@/assets/img/test-logo.png') 2px 8px/60px 60px no-repeat, url('~@/assets/img/live-rank-top3-bg.png') 0 0/68px 70px no-repeat;

          img {
            display: block;
            margin-left: 2px;
            margin-top: 8px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
      }
    }

    .common-list {
      position: absolute;
      left: 0;
      top: 211px;
      z-index: 5;
      padding: 7px 0 20px;
      width: 100%;
      height: 325px;
      box-sizing: border-box;
      border-top: 1px solid $color-border;
      border-bottom: 1px solid $color-border;
      background-color: #fff;
      font-size: 14px;
      color: #4A4A4A;

      background: url('~@/assets/img/live-rank-bg.png') center bottom no-repeat;
      background-size: cover;
      .list-item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 36px;

        .no-wrap {
          position: absolute;
          left: 12px;
          top: 10px;
          color: $color-title3;
        }

        .no {
          margin-top: 2px;
          font-size: 12px;
          @extend .bold;
        }

        .logo {
          padding-left: 51px;
          margin-right: 10px;
          width: 30px;
          height: 30px;
        }

        .name {
          flex: 1;
          @include ellipsis;
        }

        .shared {
          padding-right: 12px;

          span {
            color: $color-gift;
          }
        }
      }

      @mixin line($left) {
        position: relative;
        margin-top: 27px;
        text-align: center;
        font-size: 12px;
        color: #c3c3c3;
        &:before {
          content: '';
          position: absolute;
          left: $left;
          top: 6px;
          width: 50px;
          height: 1px;
          background-color: #c3c3c3;
        }
        &:after {
          content: '';
          position: absolute;
          right: $left;
          top: 6px;
          width: 50px;
          height: 1px;
          background-color: #c3c3c3;
        }
      }

      .line {
        @include line(83px);
      }

      .line-weekRank {
        @include line(75px);
      }
    }
  }

  .live-rank-tab {
    // tab 样式覆盖
    ::v-deep .el-tabs__nav-wrap::after {
      height: 0px;
    }

    ::v-deep .el-tabs__active-bar {
      width: 52px !important;
      left: 66px !important;
      height: 4px;
      background-color: $color-main;
    }

    ::v-deep .el-tabs__header {
      margin-bottom: 0;
    }

    ::v-deep .el-tabs__item.is-top {
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      padding: 0;
      background-color: $bg-tab;
      border-top: 1px solid $color-border;
      border-bottom: 1px solid $color-border;
      @extend .bold;

      &:nth-last-of-type(1) {
        border-left: 1px solid $color-border;
      }

      &.is-active {
        background-color: #fff;
        border-bottom: 0 solid $color-border;

      }
    }
  }

</style>
