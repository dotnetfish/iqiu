<template>
  <div v-if="isFollowList" class="live-list">
    <div v-for="(item, index) in getAllFollowLiveList" :key="index" class="live-list-item" :class="listItemW"
         :style="itemStyle" @click="toLiveRoom(item.cid,item)">
      <div class="living" :class="{no:!item.living}">{{item.living?'正在直播':'未开播'}}</div>
      <div class="live-pic"><img :src="item.imageUrl || item.coverUrl"></div>
      <h4 :title="item.name" class="live-title">{{item.name}}</h4>

      <div class="live-info">
        <div class="info-l">
          <img :src="item.avatarUrl">
        </div>
        <div class="info-r">
          <div class="info-r-t">
<!--            <h4 :title="item.name">{{item.name}}</h4>-->
<!--            <span class="live-type">{{item.typeName}}</span>-->
          </div>
          <div class="info-r-b">
            <h5 :title="item.uname">{{item.uname}}</h5>
            <span class="live-n">{{item.onlinescore|| item.score}}</span>
          </div>
        </div>
      </div>
      <!-- </a> -->
    </div>
  </div>
  
  <div v-else class="live-list">
    <div v-for="(item, index) in liveLists" :key="index" class="live-list-item" :class="listItemW" :style="itemStyle"
         @click="toLiveRoom(item.id,item)">
      <div class="live-pic"><img :src="item.imageUrl || item.coverUrl"></div>
      <h4 class="live-title" :title="item.name">{{item.name}}</h4>
      <div class="live-info">
        <div class="info-l">
          <img :src="item.avatarUrl">
        </div>
        <div class="info-r">
          <div class="info-r-t">
<!--            <h4 :title="item.name">{{item.name}}</h4>-->
<!--            <span class="live-type">{{item.typeName}}</span>-->
          </div>
          <div class="info-r-b">
            <h5 :title="item.uname">{{item.uname}}</h5>
            <span class="live-n">{{item.onlinescore || item.score}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- </a> -->
  </div>


</template>

<script>
  // import * as api from "@/api/api";
  export default {
    name: 'LiveListItem',
    props: {
      // msg: String
      itemW: {
        type: String,
        default: 'unfold'
      },
      itemStyle: {
        type: Object,
        default: function () {
          return {}
        }
      },
      isFollowList: {
        type: Boolean,
        default: false
      },
      liveList: {
        type: Array,
        default: function () {
          return []
        }
      },
      followLiveList: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        //   isLiving: false,
        isFold: false,
        getAllFollowLiveList: []
        //   liveState: '正在直播'
      }
    },
    computed: {
      // item宽度
      listItemW() {
        return 'item-' + this.itemW;
      },
      // 列表热度转换
      liveLists() {
        // console.log('cccccc',this.liveList)
        let lista = this.liveList;
        for (let i = 0; i < lista.length; i++) {
          // console.log('ddd',aaa[i])
          if (lista[i].onlinescore >= 10000) {
            lista[i].onlinescore = (lista[i].onlinescore / 10000).toFixed(1) + '万'
          } else {
            continue;
          }
        }
        return lista;
      }

    },
    watch: {
      // 关注列表重组
      followLiveList(val) {
        // console.log('0000:',val)
        let onlineChannels = val.onlineChannels;
        let offlineChannels = val.offlineChannels;
        for (let i = 0; i < onlineChannels.length; i++) {
          onlineChannels[i].isLiving = true;
        }
        for (let i = 0; i < offlineChannels.length; i++) {
          offlineChannels[i].isLiving = false;
        }
        this.getAllFollowLiveList.push(...onlineChannels);
        this.getAllFollowLiveList.push(...offlineChannels);
        //    console.log(776)
        //    console.log(this.getAllFollowLiveList)

      }
    },
    created() {
      // let leftFoldState = window.sessionStorage.getItem('leftFoldState');
      // this.isFold =  leftFoldState === null ||  leftFoldState === 'false' ? false : true;
      // this.getAllFollowLiveList();

    },
    mounted() {
      // console.log('0000:',this.followLiveList)
    },
    methods: {
      // 跳转直播间
      toLiveRoom(cid,item) {
        console.log('组件-埋点测试-', item)
        // this.$router.push({ path: '/Liveroom', query: { cid: cid } })
        const { href } = this.$router.resolve(cid, '/')
        window.open(href, "_blank");
        this.trackPassToParent(item);
      },
      //埋点-列表-点击事件-传递到父组件
      trackPassToParent(item) {
        this.$emit('homeListEventTanck',item)
        this.$emit('liveListEventTanck',item)
        this.$emit('followListEventTanck',item)
        this.$emit('cateReListEventTanck',item)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .live-list {
    //   @extend %clearfix;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    // align-items: flex-start;
  }

  .live-list-item {
    position: relative;
    // float: left;
    // width: 18%;
    // width: 23%;
    // width: 300px;
    // width: calc(25% - 24px);
    // width: calc(20% - 24px);
    text-align: left;
    margin: 0 12px 24px;
    box-sizing: border-box;
    // border: 1px dashed #E9EAEC;
    border-radius: 4px;
    background-color: #fff;
    transition: all 0.5s;

    &:hover {
      -webkit-box-shadow: 0px 18px 18px -2px rgba(0, 0, 0, 0.12);
      -moz-box-shadow: 0px 18px 18px -2px rgba(0, 0, 0, 0.12);
      -o-box-shadow: 0px 18px 18px -2px rgba(0, 0, 0, 0.12);
      -ms-box-shadow: 0px 18px 18px -2px rgba(0, 0, 0, 0.12);
      box-shadow: 0px 18px 18px -2px rgba(0, 0, 0, 0.12);
      cursor: pointer;

      .live-pic {
        img {
          // top: -10%;
          // left: -10%;
          // width: 120%;
          // height: 120%;
          transform: scale(1.2)
        }
      }

      .live-info {
        h4 {
          color: $color-main;
        }
      }

    }

    .living {
      position: absolute;
      z-index: 2;
      top: 8px;
      right: 8px;
      width: 80px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background: #5895FF;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.33);
      border-radius: 4px;
    }

    .no {
      background: #666;
    }

    .live-pic {
      overflow: hidden;
      position: relative;
      width: 100%;
      padding-top: 59.3%;
      // height: 179px;
      border-radius: 4px 4px 0 0;

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px 4px 0 0;
        transition: all 0.5s;
      }
    }
    .live-title {
      padding: 8px 10px 0;
      font-size: 18px;
      color: #333;
      @include ellipsis();
      font-weight: 600;
      &:hover {
        color: $color-main;
      }
    }

    .live-info {
      overflow: hidden;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info-l {
        position: relative;
        // float: left;
        width: 24px;
        height: 24px;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .info-r {
        width: 85%;
        // float: right;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .info-r-t {
          // float: left;
          width: 100%;
          display: flex;
          justify-content: space-between;
          // margin: 8px 0;
          h4 {
            // float: left;
            width: 80%;
            @include ellipsis();
            font-size: 14px;
            line-height: 16px;
            font-weight: 600;
            color: #333;
            &:hover {
              color: $color-main;
            }
          }

          span {
            // float: right;
            width: 16%;
            // margin-top: 2px;
            text-align: right;
            @include ellipsis();
            font-size: 12px;
            line-height: 16px;
            color: #666;
          }

        }

        .info-r-b {
          // float: left;
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 12px;
          line-height: 14px;
          color: #666;

          h5 {
            // float: left;
            width: 50%;
            font-size: 12px;
            @include ellipsis();

            &:hover {
              color: $color-main;
            }
          }

          span {
            // float: right;
            padding-left: 20px;
            background: url('../assets/hot.png') no-repeat left center;
            background-size: 11px 15px;
          }
        }
      }
    }
  }

  // fold的样式
  @media only screen and (min-width: 2400px) {
    .live-list .item-fold {
      // width: 284px;
      width: calc(10% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 2400px) {
    .live-list .item-fold {
      // width: 284px;
      width: calc(11.11111% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 2160px) {
    .live-list .item-fold {
      // width: 284px;
      width: calc(12.5% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 1920px) {
    .live-list .item-fold {
      // width: 284px;
      width: calc(14.28571% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 1680px) {
    .live-list .item-fold {
      // width: 284px;
      width: calc(16.66667% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 1440px) {
    .live-list .item-fold {
      // width: 284px;
      width: calc(20% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 1200px) {
    .live-list .item-fold {
      // width: 284px;
      width: calc(25% - 24px);
      transition: all 0.5s;

    }
  }

  // unfold的样式
  @media only screen and (min-width: 2640px) {
    .live-list .item-unfold {
      // width: 284px;
      width: calc(10% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 2640px) {
    .live-list .item-unfold {
      // width: 284px;
      width: calc(11.11111% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 2400px) {
    .live-list .item-unfold {
      // width: 284px;
      width: calc(12.5% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 2160px) {
    .live-list .item-unfold {
      // width: 284px;
      width: calc(14.28571% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 1920px) {
    .live-list .item-unfold {
      // width: 284px;
      width: calc(16.66667% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 1680px) {
    .live-list .item-unfold {
      // width: 284px;
      width: calc(20% - 24px);
      transition: all 0.5s;

    }
  }

  @media only screen and (max-width: 1440px) {
    .live-list .item-unfold {
      // width: 284px;
      width: calc(25% - 24px);
      transition: all 0.5s;

    }
  }

</style>
