<template>
    <ul   class="anchor-list">
    <li v-for="(item, index) in anchorList" :key="index" class="anchor-list-item"  :class="listItemW" @click="toLiveRoom(item.id)">
        <div class="head-pic"><i v-if="item.living"></i><img :src="item.avatarUrl"></div>
        <div class="anchor-name" :title="item.uname">{{item.uname}}</div>
    <div class="anchor-type" :title="item.typeName">{{item.typeName}}</div>
        <div class="anchor-info">
            <i class="tag" v-if="item.living"></i>
            <span v-if="item.living" class="title" :title="item.name">{{item.name}}</span>
            <span class="title" v-if="!item.living">— 未开播 —</span>
        </div>

        <!-- <div class="head-pic"><i></i><img src="https://rpic.douyucdn.cn/asrpic/191224/4666609_1304.png/webpdy1"></div>
        <div class="anchor-name" title="足球小子科技很快就会">足球小子科技很快就会</div>
        <div class="anchor-type" title="足球">足球</div>
        <div class="anchor-info">
            <i class="tag"></i>
            <span class="title" title="西甲 巴塞vs皇马胜多负少的都是反复">西甲 巴塞vs皇马胜多负少的都是反复</span>
             <span class="title">— 未开播 —</span>
        </div> -->
    </li>
    </ul>

</template>

<script>
// import * as api from "@/api/api";
export default {
  name: 'LiveListItem',
  props: {
    // msg: String
    anchorItemW: {
        type: String,
        default: 'unfold'
    },
    anchorList: {
        type: Array,
        default: function () {
            return []
        }
    }
  },
  data() {
      return {
        //   isLiving: false,
          getAllFollowLiveList: []
        //   anchorState: '正在直播'
      }
    },
    computed: {
        listItemW () {
            return 'item-' + this.anchorItemW;
        }

    },
    watch: {

    },
    created () {
        // this.getAllFollowLiveList();
    },
    mounted () {

    },
    methods: {
        // 跳转直播间
        toLiveRoom (cid) {
            // this.$router.push({ path: '/Liveroom', query: { cid: cid }})
            // this.$router.push({  path: `/Liveroom/${cid}` })
            // const { href } = this.$router.resolve({ path: '/Liveroom', query: { cid: cid } })
            const { href } = this.$router.resolve(cid,'/')
            window.open(href, "_blank");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/assets/css/_index.scss";
  .anchor-list {
    //   @extend %clearfix;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    // align-items: flex-start;
  }
.anchor-list-item {
        position: relative;
        width: calc(16.66667% - 24px);
        // width: 153px;
        // height: 208px;
        text-align: center;
        margin: 0 12px 24px;
        box-sizing: border-box;
        border: 1px solid #E9EAEC;
        border-radius: 4px;
        background-color: #fff;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
            box-shadow:  2px 2px 7px 0px rgba(0,0,0,0.09);;
            cursor: pointer;
            .anchor-name {
                color: $color-main;
            }
            // .anchor-info {
            //     .title {
            //         color: $color-main;
            //     }
            // }

        }
        .head-pic {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 25px auto 13px;
            padding: 2px;
            border: 2px solid $color-main;
            border-radius: 50%;
            // background-color: #fff;
            img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            }
            i {
            position: absolute;
            right: 5px;
            bottom: 0px;
            margin-left: 5px;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('../assets/icon_liveing@2x.png') no-repeat center;
            background-size: 100%;
            }
        }
        .anchor-name {
            cursor: pointer;
            padding: 0 20px;
            @include ellipsis($rowCount: 1);
            font-size: 14px;
            color: #333;
            &:hover {
                color: $color-main;
            }
        }
        .anchor-type {
            margin: 10px 0;
            font-size: 12px;
            color: #999;
        }
        .anchor-info {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: #666;
            padding: 0 14px;
            margin-bottom: 20px;
            // width: 100%;
            font-size: 12px;
            color: #999;
            .title {
                // width: 50%;
                line-height: 15px;
                @include ellipsis();
                &:hover {
                    color: $color-main;
                }
            }
            .tag {
                flex: 0 0 auto;
                width: 18px;
                height: 18px;
                margin-right: 5px;
                background: url('../assets/icon_kt3.png') no-repeat left center;
                background-size: 100%;
            }


        }
}
// fold的样式
@media only screen and (min-width: 3360px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(6.66666% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 3360px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(7.142857% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 3120px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(7.6932% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 2880px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(8.33333% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 2400px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(9.0909% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 2160px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(10% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 1920px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(11.11111% - 24px);
        transition: all 0.5s;

    }
}

@media only screen and (max-width: 1680px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(12.5% - 24px);
        transition: all 0.5s;

    }
}

@media only screen and (max-width: 1440px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(14.28571% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 1200px) {
     .anchor-list .item-fold {
        // width: 284px;
        width: calc(16.66667% - 24px);
        transition: all 0.5s;

    }
}

// unfold的样式
@media only screen and (min-width: 3120px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(7.142857% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 3120px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(7.6932% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 2880px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(8.33333% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 2640px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(9.0909% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 2400px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(10% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 2160px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(11.11111% - 24px);
        transition: all 0.5s;

    }
}

@media only screen and (max-width: 1920px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(12.5% - 24px);
        transition: all 0.5s;

    }
}

@media only screen and (max-width: 1680px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(14.28571% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 1440px) {
     .anchor-list .item-unfold {
        // width: 284px;
        width: calc(16.66667% - 24px);
        transition: all 0.5s;

    }
}
@media only screen and (max-width: 1200px) {
     .anchor-list .item-unfold {
        width: calc(20% - 24px);
        transition: all 0.5s;

    }
}

</style>
