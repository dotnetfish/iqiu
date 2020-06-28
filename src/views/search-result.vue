<template>
    <div class="search-box">
        <h3>{{typeName}}</h3>
        <div class="tabs-box">
             <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="直播" name="first">
                    <live-list-item
                    :liveList="allLiveList"
                    :itemW="getLiveItemW"
                    class="cc"
                    >
                    </live-list-item>
                </el-tab-pane>
                <el-tab-pane label="主播" name="second">
                    <anchor-list-item
                    :anchorList="allAnchorList"
                    :anchorItemW="getAnchorItemW"
                    class="cc"
                    >
                    </anchor-list-item>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="no-data" v-if="isNoData" v-show="isNoData">
<!--          <img src="../assets/icon_nosearch@2x.png" alt="无内容">-->
          <p>没有找到您搜索的内容</p>
        </div>
        <div v-if="isNoData" v-show="isNoData">
          <h3 class="tj">直播推荐</h3>
          <live-list-item
          :liveList="recommendLiveList"
          :itemW="getLiveItemW"
          class="cc"
          >
          </live-list-item>
        </div>

        <div class="load-more" v-show="isMore">{{loadTxt}}</div>
    </div>
</template>

<script>
  // @ is an alias to /src
  import LiveListItem from '@/components/live-list-item.vue'
  import anchorListItem from '@/components/anchor-list-item.vue'
  import * as api from "@/api/api";
  import { Tabs, TabPane } from 'element-ui';

  export default {
    name: 'SearchResult',
    components: {
      [Tabs.name]: Tabs,
      [TabPane.name]: TabPane,
      LiveListItem,
      anchorListItem
    },
    data () {
      return {
        page: 0,
        from: '',
        keyword: '',
        activeName: 'first',
        typeName: '搜索结果',
        typeId: 'all',
        loadTxt: '~努力加载中...',
        scrollFlag: false,
        noDataFlag: false,
        isDataShow: 1,
        isNoData: 0,
        isMore: 0,
        allSearchResult: [],
        allLiveList: [],
        allAnchorList: [],
        recommendLiveList: [],
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
      // console.log('搜索结果')
      this.getFoldState();
      this.getSearchResult();
      this.getRecommendLiveList();
    },
    mounted () {
    },
    destroyed () {
    },
    watch:{
      '$route':'routeChange',
      getisFold (val) {
          this.isFold = val;
          // console.log(999)
      }
    },
    computed: {
      getLiveItemW () {
        if(this.isFold){
          return  'fold';
        }else {
          return  'unfold';
        }
      },
      getAnchorItemW () {
        if(this.isFold){
          return  'fold';
        }else {
          return  'unfold';
        }
      }

    },
    methods: {
      // tab切换
      handleClick(tab, event) {
        console.log(tab, event);
        // console.log(tab.name)
        if(tab.name == 'first'){
          // 触发'直播'事件
          // console.log(this.allLiveList);
          if (!this.allLiveList.length) {
            this.isNoData = 1;
          }else {
            this.isNoData = 0;
          }
        }else{
          // 触发'主播'事件
          // console.log(this.allAnchorList);
          if (!this.allAnchorList.length) {
            this.isNoData = 1;
          }else {
            this.isNoData = 0;
          }
        }
      },
      // 获取折叠状态
      getFoldState () {
        let leftFoldState = window.sessionStorage.getItem('leftFoldState');
        this.isFold =  leftFoldState === null ||  leftFoldState === 'false' ? false : true;
        // console.log('search:',this.isFold)
      },

       routeChange () {
        //  this.page = 1;
      //  location.reload()
      //  this.$router.go(0)
        this.isNoData = 0;
         this.allLiveList = [];
         this.allAnchorList = [];
         this.recommendLiveList = [];
         this.getFoldState();
         this.getSearchResult();
         this.getRecommendLiveList();
       },
      //  获取搜索信息
       getSearchResult () {
         this.from = this.$route.query.from || '';
         this.keyword = this.$route.query.searchContent || '';
        //  this.keyword = this.$route.params.searchContent || '';
         this.page = this.$route.query.page || 0;
         let data = {
          from: this.from,
          keyword: this.keyword,
          page: this.page
        }
        // let headers = {}
        api.searchResult(data).then(res => {
          // console.log(2222)
          // console.log(res.data.items);
           if(res.data.items.length) {
             this.allSearchResult = res.data.items;
            //  console.log(this.allSearchResult)
             this.allLiveList = this.allSearchResult.filter(item => item.living === true)
             this.allAnchorList.push(...this.allSearchResult);
            //  console.log('直播',this.allLiveList)
            //  console.log('allAnchorList:',this.allAnchorList)
             if (!this.allLiveList.length) {
                this.activeName = 'second';
             }
            } else {
                this.isNoData = 1;
                // this.getRecommendLiveList();
            }
        })
        .catch(e => {
          console.error(e);

        })
      },
      // 获取推荐列表
      getRecommendLiveList () {
         let data = {
          recommendAnchorType: 'SEARCH_PAGE',
          size: this.size,
        }
        let headers = {}
        api.recommendLiveList(data,headers).then(res => {
          // console.log('搜索推荐直播')
          // console.log(res.data);
          this.recommendLiveList = res.data;
        })
        .catch(e => {
          console.error(e);

        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";

  .search-box {
    h3 {
        margin: 30px 0 20px;
        padding-left: 12px;
        font-size: 22px;
        text-align: left;
        font-weight: 500;
        font-family: 'PingFangSC-Medium','PingFang SC';
        &.tj {
          margin-top: 120px;
        }
    }
    .tabs-box {
        margin: 0 12px;
        .cc {
            margin: 0 -12px;
        }
    }
    .no-data {
        // @extend %clearfix;
        margin: 50px 0;
        text-align: center;
        img {
          width: 150px;
          height:153px;
          margin-bottom: 20px;
        }
        p {
          color: #666;
          font-size: 14px;
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
