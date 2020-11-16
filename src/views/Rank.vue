<template>
  <div class="rank">
    <section class="rank-item" v-for="(item) in config" :key="item.title">
      <div class="liveRecomend-title">
        <img :src="item.src" style="width:23px;height:23px;margin: 18px 12px 18px 0px;">
        <p class="liveRecomend-title-text">{{item.title}}</P>
      </div>
      <div class="top3">
        <div class="item item0" :class="'item'+ top3Index" v-for="(top3Item,top3Index) in item.top3" :key="top3Index">
          <img :src="top3Item.avatarUrl" alt="" @click="enter(top3Item.uid)">
          <span class="item-name">
            <el-tooltip effect="dark" :content="top3Item.uname " placement="top-start">
                  <span class="name">{{ top3Item.uname }}</span>
            </el-tooltip>
          </span>
          <div class="item-fans">{{ top3Item.score }}人气</div>
        </div>
      </div>
      <div class="top7" v-for="(t, i) in item.top7" :key="i">
        <span class="top7-index">{{ i + 4 }}</span>
        <span class="top7-name">{{t.uname}}</span>
        <span>{{t.score}}人气</span>
      </div>
    </section>
  </div>
</template>

<script>
  import { rankingQuery } from '@/api/api'
  import { Tooltip } from 'element-ui'

  export default {
    name: 'Rank',
    components: {
      [Tooltip.name]: Tooltip,

    },
    data() {
      return {
        config: [
          {
            src: require('@/assets/icon_hot.png'),
            title: "人气主播榜",
            list: []
          },
          {
            src: require('@/assets/icon_new.png'),
            title: "新人主播榜",
            list: []
          }
        ]
      }
    },
    created() {
      rankingQuery({ typeCode: 'newanchor', timeType: 'ALL' }).then(
        res => {
          let list = [];
          if (res.data) list = res.data.itemDtoList
          this.fillRankList( list, 1);
        }
      );
      rankingQuery({ typeCode: "hotanchor", timeType: 'ALL' }).then(
        res => {
          let list = [];
          if (res.data) list = res.data.itemDtoList
          this.fillRankList( list, 0);
        }
      );
    },
    mounted(){
      console.log('989889998',this.config)
    },
    methods: {
      enter(roomid){
        console.log('989889998',roomid)
        window.open(process.env.VUE_APP_HREF + '/' + roomid)
      },
      fillRankList(rankList, rankType) {
        let list = [];
        if (rankList.length >= 10) {
          this.config[rankType].list = rankList;
          list = rankList
        } else {
          list = JSON.parse(JSON.stringify(rankList));
          list.length = 10;
          this.config[rankType].list = list.fill({
            avatarUrl: 'http://pic.likedu.top/avatar/default-avatar.jpg',
            uname: '虚位以待',
            score: 0
          }, rankList.length, 10)
        }

        console.log('87777777777777',this.config)

        this.$set(this.config[rankType], 'top3', [list[1], list[0], list[2]])
        this.$set(this.config[rankType], 'top7', list.slice(3, 10))
        // this.config[rankType].top3 = list.slice(0,3)
        // this.config[rankType].top7 = list.slice(3,10)
      },
      rankingQuery(typeCode) {
        return rankingQuery({ typeCode }).then(
          res => {
            this.rankObject = res.data;
          }
        );
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";

  .rank {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;

    .rank-item {
      padding: 10px 0 25px;
      width: 580px;
      background-color: #fff;
      border-radius: 10px;
    }

    ::v-deep .liveRecomend-title {
      margin-left: 30px;
    }

    .top3 {
      position: relative;
      border-top: 2px solid #F0F0F0;
      padding: 24px 0;
      box-sizing: border-box;
      height: 250px;
      display: flex;
      justify-content: space-around;
      /*align-items: center;*/
      .item {
        width: 33.3%;
        /*width: 122px;*/
        height: 150px;
        text-align: center;

        img {
          display: block;
          margin: 38px auto 0;
          width: 98px;
          height: 98px;
          border-radius: 50%;
        }

        .item-name {
          position: relative;
          text-align: center;
        }

        .name {
          position: absolute;
          z-index: 1;
          display: inline-block;
          position: relative;
          margin-top: -20px;
          padding: 5px 7px;
          border-radius: 10px;
          color: #fff;
          font-size: 18px;
          line-height: 25px;
          max-width: 140px;
          box-sizing: border-box;
          @include ellipsis()
        }

        .item-fans {
          margin-top: 24px;
          font-size: 18px;
          color: #333;
          text-align: center;
        }
      }

      .item0 {
        background: url(~@/assets/img/rank-top-1.png) center center no-repeat;
        background-size: 105px 130px;

        .item-name {
          .name {
            background-color: #CBD3D9;
          }

          &:after {
            content: "";
            position: absolute;
            left: -15px;
            top: -8px;
            width: 22px;
            height: 0;
            border-top: 16px solid #AFB3B6;
            border-bottom: 16px solid #AFB3B6;
            border-left: 7px solid #fff;
          }

          &:before {
            content: "";
            position: absolute;
            right: -15px;
            top: -8px;
            width: 22px;
            height: 0;
            border-top: 16px solid #AFB3B6;
            border-bottom: 16px solid #AFB3B6;
            border-right: 7px solid #fff;
          }
        }
      }

      .item1 {
        background: url(~@/assets/img/rank-top-0.png) center center no-repeat;
        background-size: 122px 150px;

        img {
          margin: 28px auto 0;
          width: 118px;
          height: 118px;
        }

        .item-name {
          .name {
            color: #C68621;
            background-color: #F8D64C;
          }

          &:after {
            content: "";
            position: absolute;
            left: -18px;
            top: -10px;
            width: 26px;
            height: 0;
            border-top: 18px solid #F8B54C;
            border-bottom: 18px solid #F8B54C;
            border-left: 9px solid #fff;
          }

          &:before {
            content: "";
            position: absolute;
            right: -18px;
            top: -10px;
            width: 26px;
            height: 0;
            border-top: 18px solid #F8B54C;
            border-bottom: 18px solid #F8B54C;
            border-right: 9px solid #fff;
          }
        }
      }

      .item2 {
        background: url(~@/assets/img/rank-top-2.png) center center no-repeat;
        background-size: 105px 130px;

        .item-name {
          .name {
            background-color: #E8A55F;
          }

          &:after {
            content: "";
            position: absolute;
            left: -15px;
            top: -8px;
            width: 22px;
            height: 0;
            border-top: 16px solid #D68A45;
            border-bottom: 16px solid #D68A45;
            border-left: 7px solid #fff;
          }

          &:before {
            content: "";
            position: absolute;
            right: -15px;
            top: -8px;
            width: 22px;
            height: 0;
            border-top: 16px solid #D68A45;
            border-bottom: 16px solid #D68A45;
            border-right: 7px solid #fff;
          }
        }
      }
    }

    .top7 {
      margin: 0 30px;
      padding: 0 20px;
      height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 18px;
      color: #999999;

      &:nth-child(odd) {
        background-color: #F0F0F0;
      }

      .top7-index {

        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid #999999;
      }

      .top7-name {
        padding-left: 8px;
        flex: 1;
      }
    }
  }
</style>
