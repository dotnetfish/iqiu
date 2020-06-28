<template>
    <div class="live-list-box">
      <div class="liveRecomend-title">
        <img src="@/assets/icon_zb.png" style="width:23px;height:23px;margin: 18px 12px 18px 0px;">
        <p class="liveRecomend-title-text">{{typeName}}<i class="el-icon-arrow-right arrow-right"></i></P>
      </div>
<!--        <h3>{{typeName}}</h3>-->
      <div style="margin: 0 -12px;width:1224px">
        <live-list-item
          :liveList="allLiveList" :itemW="getItemW" @liveListEventTanck="liveListEventTanck">
        </live-list-item>
      </div>

        <div class="no-data" v-show="isNoData">
          <img src="" alt="">
          <p>暂时没有数据</p>
        </div>
        <div class="load-more" v-show="isMore">{{loadTxt}}</div>
    </div>
</template>

<script>
  // @ is an alias to /src
  import LiveListItem from '@/components/live-list-item.vue'
  import * as eventTrack from '@/utils/eventTracking.js'
  import * as api from "@/api/api";
//   import { Button } from 'element-ui';

  export default {
    name: 'LiveList',
    components: {
    //   [Button.name]: Button,
      LiveListItem
    },
    data () {
      return {
        page: 1,
        size: 30,
        typeName: '全部直播',
        typeId: 'all',
        loadTxt: '~努力加载中...',
        scrollFlag: false,
        noDataFlag: false,
        isDataShow: 1,
        isNoData: 0,
        isMore: 0,
        allLiveList: [],
        isFold: false
      }
    },
    props: {
        getisFold: {
            type: Boolean,
            default: false
        }
    },
    created () {
      // console.log('直播列表')
      // this.getFoldState();
      this.getAllLiveList();
      // this.regularRefresh();
    },
    mounted () {
      window.addEventListener('scroll', this.scrollLoadMore, true);  // 监听（绑定）滚轮滚动事件
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollLoadMore);
    },
    watch:{
      '$route':'routeChange',
      getisFold (val) {
          this.isFold = val;
          // console.log(888)
      }
    },
    computed: {
      getItemW () {
         if(this.isFold){
          return  'fold';
        }else {
          return  'unfold';
        }
      }

    },
    methods: {
      getFoldState () {
        let leftFoldState = window.sessionStorage.getItem('leftFoldState');
        this.isFold =  leftFoldState === null ||  leftFoldState === 'false' ? false : true;
      },
      // 滚动加载更多
      scrollLoadMore () {
          let clientHeight = document.documentElement.clientHeight || document.body.clientHeight || window.screen.height ;  // 浏览器可视区域高度
          // let clientWidth = document.documentElement.clientWidth || document.body.clientWidth || window.screen.width
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop ||  window.pageYOffset; // 滚动条到顶部的距离
          let scrollHeight =  document.documentElement.scrollHeight ||  document.body.scrollHeight; // 网页正文总高度
          // let contentHeight = document.querySelector('.live-list-box').offsetHeight; //列表内容区域的高度
          // console.log('clientHeight:' + clientHeight)
          // console.log('clientWidth:' + clientWidth)
          // console.log('scrollTop:' + scrollTop)
          // console.log('scrollHeight:' + (scrollHeight-60))
          // console.log('contentHeight:' + contentHeight)
          //滚动条到底部的条件
          if(scrollTop+clientHeight >= scrollHeight-60 && !this.noDataFlag){// 滚动条到头部的距离 + 屏幕高度 = 可滚动的总高度
            if(this.scrollFlag ){return false}
            this.scrollFlag = true;
            this.isMore = 1;
            let vm = this
            setTimeout(function(){
                vm.page++;
                vm.getAllLiveList(vm.page,vm.size,vm.typeId)
                vm.scrollFlag = false;
            },1000);

          }

        },
        // 监听路由变化
       routeChange () {
         this.isMore = 0;
         this.page = 1;
         this.allLiveList = [];
         this.getFoldState();
         this.getAllLiveList();
       },
      //  获取直播列表
       getAllLiveList () {
         this.typeId = this.$route.query.typeId || 'all';
         this.typeName = this.$route.query.name || '全部直播';
         let clientHeight = document.documentElement.clientHeight || document.body.clientHeight || window.screen.height ;  // 浏览器可视区域高度
        // let clientWidth = document.documentElement.clientWidth || document.body.clientWidth || window.screen.width
        // console.log('clientHeight:' + clientHeight)
        // console.log('clientWidth:' + clientWidth)
        if(clientHeight > 1080 && clientHeight < 1215) {
          this.size = 40
        }else if(clientHeight > 1215  && clientHeight < 1350 ) {
          this.size = 50
        }else if(clientHeight > 1350  && clientHeight < 1495) {
          this.size = 60
        }else if(clientHeight > 1495) {
          this.size = 70
        }
         if(this.page > 1) {
          //  console.log(66666666)
           this.size = 20;
         }
         let data = {
          p: this.page,
          size: this.size,
          typeId: this.typeId
        }
        let headers = {}
        api.liveList(data,headers).then(res => {
          // console.log(2222)
          // console.log(res.data);
          // this.allLiveList = res.data;
           if(res.data.length) {
                this.isMore = 0;
                this.loadTxt = '加载中...';
                this.noDataFlag = false;
                // this.page = page+1;
                this.allLiveList.push(...res.data);
            } else {
                this.isMore = 1;
                this.loadTxt = '真的到底了';
                this.noDataFlag = true;
            }
        })
        .catch(e => {
          console.error(e);

        })
      },
      // 列表每两分钟定时刷新
      regularRefresh(){
        setInterval(() => {
          this.getAllLiveList()
        }, 120000)
      },
      //直播页-埋点-列表
      liveListEventTanck(item){
        let eventTrackParams = {}
        eventTrackParams = { item_id: 'living_room_enter_click', page_id: 'zhibo', page_2_id: this.typeName , room_id: item.id, btn: item.name }
        eventTrack.reportData(eventTrackParams)
      },
    }

  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";

  .live-list-box {
    min-height: 70vh;
    h3 {
        margin: 30px 0 20px;
        padding-left: 12px;
        font-size: 22px;
        text-align: left;
        font-weight: 500;
        font-family: 'PingFangSC-Medium','PingFang SC';
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
