<template>
<div class="category-list">
     <div v-for="(item, index) in allCategoryList" :key="index"  class="category-list-item" :class="listItemW" @click="toLiveList(item.code, item.name)">
    <!-- <a href="" target="_blank"> -->
        <div class="category-pic">
            <img :src="item.url">
        </div>
        <div class="category-info-bg"></div>
        <div class="category-info">
            <span class="name">{{item.name}}</span>
            <img class="icon" :src="item.icon">
        </div>
    <!-- </a> -->
    </div>
</div>

</template>

<script>
 import * as eventTrack from '@/utils/eventTracking.js'

// import * as api from "@/api/api";
export default {
  name: 'CategoryListItem',
  props: {
    // msg: String
    itemW: {
        type: String,
        default: 'unfold'
    },
    // allCategoryList: {
    //     type: Array,
    //     default: function () {
    //         return []
    //     }
    // }
  },
  data() {
      return {
          isLiving: true,
          isFollowList: false,
          isFold: false,
          liveState: '正在直播',
          allCategoryList: [{
		"index": null,
		"parentIndex": null,
		"code": "football",
		"name": "足球",
		"icon": require("../assets/icon_zq@2x.png"),
		"level": 1,
		"order": 2,
		"resourceType": "MATCH",
		"resource": null,
		"url": require("../assets/pic_category_zq@2x.png"),
		"isNew": null,
		"isHot": null,
		"isRecommend": false,
		"recommendOrder": null,
		"isForceRecommend": false,
		"forceRecommendOrder": null
	}, {
		"index": null,
		"parentIndex": null,
		"code": "basketball",
		"name": "篮球",
		"icon": require("../assets/icon_lq@2x.png"),
		"level": 1,
		"order": 3,
		"resourceType": "MATCH",
		"resource": null,
		"url": require("../assets/pic_category_lq@2x.png"),
		"isNew": null,
		"isHot": null,
		"isRecommend": false,
		"recommendOrder": null,
		"isForceRecommend": false,
		"forceRecommendOrder": null
	}, {
		"index": null,
		"parentIndex": null,
		"code": "other",
		"name": "综合",
		"icon": require("../assets/icon_zh@2x.png"),
		"level": 1,
		"order": 4,
		"resourceType": "MATCH",
		"resource": null,
		"url": require("../assets/pic_category_zh@2x.png"),
		"isNew": null,
		"isHot": null,
		"isRecommend": false,
		"recommendOrder": null,
		"isForceRecommend": false,
		"forceRecommendOrder": null
	}]
      }
    },
    computed: {
        listItemW () {
            return 'item-' + this.itemW;
        }
    },
    created () {
        // let leftFoldState = window.sessionStorage.getItem('leftFoldState');
        // this.isFold =  leftFoldState === null ||  leftFoldState === 'false' ? false : true;
    },
    methods: {
        // 跳转直播列表
        toLiveList (code, name) {
          this.$router.push({ path: '/Live', query: { 'typeId': code, name: name }})
          this.cateListEventTanck(name)
        },
         //直播页-埋点-列表
        cateListEventTanck(item){
          let eventTrackParams = {}
          eventTrackParams = { item_id: 'class_button_click', page_id: 'class', btn: item }
          eventTrack.reportData(eventTrackParams)
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/_index.scss";
.category-list {
    // @extend %clearfix;
    display: flex;
    flex-flow: row wrap;
}
.category-list-item {
        position: relative;
        // float: left;
        // width: 18%;
        // width: 376px;
        // height: 214px;
        // width: calc(25% - 36px);
        text-align: left;
        margin: 36px 18px 0;
        box-sizing: border-box;
        // border: 1px dashed #E9EAEC;
        border-radius: 4px;
        // background-color: #fff;
        transition: all 0.5s;
        &:hover {
            box-shadow:  0px 2px 15px 0px rgba(0, 0, 0, 0.6);
            cursor: pointer;
            .category-pic {
                img {
                    // top: -10%;
                    // left: -10%;
                    // width: 120%;
                    // height: 120%;
                    transform: scale(1.2)
                }
            }
            .category-info {
                .name {
                    color: $color-main;
                }
            }

        }

        .category-pic {
            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
            // padding-top: 60%;
            // height: 179px;
            border-radius: 4px;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 4px;
                transition: all 0.5s;
            }
        }
        .category-info-bg {
            position: absolute;
            left: -5px;
            bottom: -22px;
            width: 146px;
            height: 46px;
            background: url('../assets/bg_category_ty.png') no-repeat center bottom;
        }
        .category-info {
            position: absolute;
            left: -5px;
            bottom: -10px;
            display: block;
            // width:147px;
            // height:49px;

             background-color:#222;

            border-radius:0px 25px 25px 0px;
            padding: 12px 60px 12px 18px;
            //  box-shadow:  0px 2px 15px 0px rgba(0, 0, 0, 0.6);

            .name {
                padding: 0;
                padding-right: 24px;
                font-size: 24px;
                color: #fff;
                background: url('../assets/icon_category_more@2x.png') no-repeat right 55%;
                background-size: 13px 13px;
            }
            .icon {
                position: absolute;
                right: 4px;
                top: 3px;
                width: 30px;
                height: 30px;
                padding: 6px;
                border-radius: 50%;
                background-color: $color-main;
            }

        }
}
// fold的样式
@media only screen and (min-width: 3600px) {
     .category-list .item-fold {
        width: 376px;
        height: 214px;
        // width: calc(10% - 36px);
        // transition: all 0.5s;

    }
}
@media only screen and (max-width: 3600px) {
     .category-list .item-fold {
        width: 376px;
        height: 214px;
        // width: calc(100% / 9 - 36px);
        // transition: all 0.5s;

    }
}
@media only screen and (max-width: 3120px) {
     .category-list .item-fold {
        width: 376px;
        height: 214px;
        // width: calc(12.5% - 36px);
        // transition: all 0.5s;

    }
}
@media only screen and (max-width: 2640px) {
     .category-list .item-fold {
        width: 376px;
        height: 214px;
        // width: calc(14.28571% - 36px);
        // transition: all 0.5s;

    }
}
@media only screen and (max-width: 2160px) {
     .category-list .item-fold {
        width: 376px;
        height: 214px;
        // width: calc(16.66667% - 36px);
        // transition: all 0.5s;

    }
}


@media only screen and (max-width: 1680px) {
     .category-list .item-fold {
        width: 376px;
        height: 214px;
        // width: calc(25% - 36px);
        // transition: all 0.5s;
    }
}
@media only screen and (max-width: 1440px) {
     .category-list .item-fold {
        width: calc(29% - 36px);
        height: 100%;
        // transition: all 0.5s;
        .category-pic {
            padding-top: 60%;
            height: 0;
        }

    }
}
@media only screen and (max-width: 1366px) {
     .category-list .item-fold {
        width: calc(31% - 36px);
        height: 100%;
        // transition: all 0.5s;
        .category-pic {
            padding-top: 60%;
            height: 0;
        }

    }
}
@media only screen and (max-width: 1200px) {
     .category-list .item-fold {
        width: calc(33.33333% - 36px);
        height: 100%;
        // transition: all 0.5s;
        .category-pic {
            padding-top: 60%;
        }

    }
}

// unfold的样式
@media only screen and (min-width: 2640px) {
     .category-list .item-unfold {
        width: 376px;
        height: 214px;
        // width: calc(10% - 36px);
        // transition: all 0.5s;

    }
}
// @media only screen and (max-width: 2640px) {
//      .category-list .item-unfold {
//         // width: 284px;
//         width: calc(100% / 9 - 36px);
//         transition: all 0.5s;

//     }
// }
@media only screen and (max-width: 2640px) {
     .category-list .item-unfold {
        width: 376px;
        height: 214px;
        // width: calc(12.5% - 36px);
        // transition: all 0.5s;

    }
}
@media only screen and (max-width: 2400px) {
     .category-list .item-unfold {
        width: 376px;
        height: 214px;
        // width: calc(14.28571% - 36px);
        // transition: all 0.5s;

    }
}
@media only screen and (max-width: 2160px) {
     .category-list .item-unfold {
        width: 376px;
        height: 214px;
        // width: calc(16.66667% - 36px);
        // transition: all 0.5s;

    }
}

@media only screen and (max-width: 1920px) {
     .category-list .item-unfold {
        width: 376px;
        height: 214px;
        // width: calc(20% - 36px);
        // transition: all 0.5s;

    }
}

@media only screen and (max-width: 1680px) {
     .category-list .item-unfold {
        width: 376px;
        height: 214px;
        // width: calc(25% - 36px);
        // transition: all 0.5s;

    }
}
@media only screen and (max-width: 1440px) {
     .category-list .item-unfold {
        height: 100%;
        width: calc(33.33333% - 36px);
        // transition: all 0.5s;
        .category-pic {
            padding-top: 60%;
            height: 0;
        }
    }
}

</style>
