<template>
  <div class="follow-list-box"  >
<!--    <h3>我的关注</h3>-->
    <div class="liveRecomend-title">
      <img src="@/assets/icon_follow.png" style="width:32px;height:26px;margin: 18px 12px 18px 0px;">
      <p class="liveRecomend-title-text">我的关注<i class="el-icon-arrow-right arrow-right"></i></P>
    </div>
    <!-- <div class="list-box"> -->

    <div style="margin: 0 -12px;width:1224px">
      <live-list-item
        :followLiveList="allFollowLiveList" :isFollowList = true :itemW="getItemW" @followListEventTanck="followListEventTanck"
      >
      </live-list-item>
    </div>
        <div class="no-data" v-show="isNoData">
          <img src="" alt="">
          <p>暂时没有数据</p>
        </div>

    <!-- </div> -->
      <div class="no-follow" v-show="isFollow">
<!--        <img src="../assets/icon_nofollow@2x.png">-->
        <p>您还未关注主播，<span @click="toLiveList">快去看看吧~</span></p>
    </div>
    <div class="no-login" v-show="isLoginShow">
<!--        <img src="../assets/icon_nologin@2x.png">-->
        <h5><span class="btn" @click="toLogin">点击登录</span></h5>
        <p>登录后获取关注列表</p>
    </div>
<!--    <div v-show="isRecommendShow">-->
<!--        <h3>直播推荐</h3>-->
<!--        &lt;!&ndash; <div class="list-box"> &ndash;&gt;-->
<!--          <div class="no-data" v-if="isNoData">-->
<!--            <img src="" alt="">-->
<!--            <p>暂时没有数据</p>-->
<!--          </div>-->
<!--          <live-list-item-->
<!--            v-else-->
<!--            :liveList="recommendLiveList"-->
<!--            :itemW="getItemW"-->
<!--          >-->
<!--          </live-list-item>-->
<!--        &lt;!&ndash; </div> &ndash;&gt;-->
<!--    </div>-->
    <!-- <login-tip-popup ref="loginPop"></login-tip-popup>   -->
  </div>
</template>

<script>
  // @ is an alias to /src
  import LiveListItem from '@/components/live-list-item.vue'
  import * as eventTrack from '@/utils/eventTracking.js'
  import * as api from "@/api/api";
  // import storages from "@/utils/storage.js";
  import cookie from "@/modules/utils/cookie.js";
//   import { Button } from 'element-ui';

  export default {
    name: 'FollowList',
    components: {
    //   [Button.name]: Button,
      // loginTipPopup,
      LiveListItem
    },
    data () {
      return {
        size: 8,
        typeId: 'all',
        loadTxt: '努力加载中...',
        isFollow: false,
        isLoginShow: false,
        isRecommendShow: false,
        scrollFlag: false,
        noDataFlag: false,
        isDataShow: 1,
        isNoData: 0,
        isMore: 0,
        // allFollowLiveList: [],
        allFollowLiveList: {},
        recommendLiveList: [],
        isFold: false,
      }
    },
     props: {
        getisFold: {
            type: Boolean,
            default: false
        }
    },
    watch:{
      getisFold (val) {
          this.isFold = val;
          // console.log(888)
      },
      isLogin (val) {
          if(val){
            // console.log('登录成功')
            this.init()
          }else {
            // console.log('登录失败')
          }


      }
    },
    created () {
    //   console.log('关注列表')
    //   console.log('折叠状态',this.$store.state.fold);
    //   console.log('本地用户信息',storages.getItem('userStatus'))
    //  console.log('vuex',this.$store.state.userStatus)
    //  console.log('uid:',this.$store.state.userStatus.userInfo.uid)
    //  console.log('token:', cookie.getItem('xx-user-token'))
      this.init();


    },
    mounted () {

    },
    computed: {
      openState () {
        return this.$store.state.openLoginDialog
      },
      isLogin () {
        return this.$store.getters.isLogin
      },
      getItemW () {
        if(this.isFold){
          return  'fold';
        }else {
          return  'unfold';
        }
      }
    },
    methods: {
      init() {
        this.getFoldState();
        if (this.isLogin && cookie.getItem('xx_n_t') ) {
        this.isLoginShow = false;
        this.isRecommendShow = false;
        this.getAllFollowLiveList();
        } else {
          this.isLoginShow = true;
          this.isRecommendShow = true;
          // this.getRecommendLiveList();
        }
      },
      toLogin () {
        this.$store.state.openLoginDialog = true;
        // console.log(this.$store.state.openLoginDialog)
        // this.$refs.loginPop.openLoginDialog()
      },
      toLiveList () {
          this.$router.push('/zhibo');
      },
      getFoldState () {
        let leftFoldState = window.sessionStorage.getItem('leftFoldState');
        this.isFold =  leftFoldState === null ||  leftFoldState === 'false' ? false : true;
      },
      // 获取关注列表
       getAllFollowLiveList () {
        //  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiIzNDg2MDc0IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTI0OTM4MCwiaWF0IjoxNTc4MDM5NzgwfQ.XJiyZ-K-3HOFIn7bC_Vo_zMI5ViK3niGNCTz4Sr6_CbUSN5drA0BsNnaJ6qSygjZB2FzWoWH3OydEZ2Ce73kUA';
        let headers = {
          // 'x-zy-user-id': this.$store.state.userStatus.userInfo.uid,
          // 'x-zy-user-token': cookie.getItem('xx-user-token')
        }
        // 只要cookie里有token或header有token就能请求成功，'x-zy-user-id'非必传
        api.attentionGetFollowAnchors({},headers).then(res => {
          console.log('全部关注列表')
          // console.log(res.data);
           if(res.data.onlineChannels.length || res.data.offlineChannels.length) {
                this.isFollow = false;
                this.isRecommendShow = false;
                // this.allFollowLiveList.push(...res.data.onlineChannels);
                // this.allFollowLiveList.push(...res.data.offlineChannels);
                this.allFollowLiveList = res.data;
                // console.log(typeof this.allFollowLiveList)
            } else {
                this.isFollow = true;
                this.isRecommendShow = true;
                // this.getRecommendLiveList();
            }
        })
        // .catch(e => {
        //   console.error(e);

        // })
      },
      // 获取推荐列表
      // getRecommendLiveList () {
      //    let data = {
      //     recommendAnchorType: 'FOLLOW_PAGE',
      //     size: this.size,
      //   }
      //   let headers = {}
      //   api.recommendLiveList(data,headers).then(res => {
      //     // console.log('推荐直播获取')
      //     // console.log(res.data);
      //     this.recommendLiveList = res.data;
      //     if (this.recommendLiveList.length) {
      //       this.isNoData = false;
      //     } else {
      //       this.isNoData = true;
      //     }
      //   })
      //   .catch(e => {
      //     console.error(e);
      //
      //   })
      // },
      //直播页-埋点-列表
      followListEventTanck(item){
        console.log('关注埋点传参',item)
        let eventTrackParams = {}
        eventTrackParams = { item_id: 'living_room_enter_click', page_id: 'zhibo', page_2_id: '关注', room_id: item.cid, btn: item.name }
        eventTrack.reportData(eventTrackParams)
      },
    }

  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";

  .follow-list-box {
    min-height: 70vh;
    h3 {
        margin: 30px 0;
        padding-left: 12px;
        font-size: 22px;
        text-align: left;
        font-weight: 500;
        font-family: 'PingFangSC-Medium','PingFang SC';
    }
    .no-login {
        @extend %clearfix;
        margin: 50px auto;
        text-align: center;
        img {
          width: 152px;
          height: 139px;
        }
      .btn {
        display: block;
        width: 120px;
        height: 35px;
        margin: 20px auto;
        line-height: 35px;
        text-align: center;
        border-radius: 21px;
        background-color: $color-main;
        font-weight: normal;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        a {
          display: block;
          color: #fff;
        }
      }
      p {
        font-size: 14px;
        color: #999;
        margin-bottom: 20px;
      }
    }
    .no-follow {
        margin: 50px 0;
        text-align: center;
        img {
          width: 150px;
          height: 150px;
          margin-bottom: 20px;
        }
        p {
            font-size: 14px;
            color: #999;
            span{
                cursor: pointer;
                color: $color-main;
            }
        }
    }
    .no-data {
        @extend %clearfix;
        // display: none;
        text-align: center;
        img {
          height:145px;
        }
        p {
          font-size: 15px;
        }

    }
    .load-more {
      @extend %clearfix;
      padding: 20px 0;
      font-size: 15px;
      text-align: center;
      color: #999;
    }
  }
</style>
