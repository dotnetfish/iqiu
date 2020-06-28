<template>
  <div>
    <!--下载-->
    <el-popover placement="bottom" title="" width="220" trigger="hover" v-if=" displayItem === 'download' ">
      <div class="code-down">
        <div class="code-show">
          <p class="code-pic"><img src="@/assets/img/all-download-qrcode.png" style="width:110px;height:110px;"></p>
          <p class="info" style="margin-top:20px;">爱球APP   扫一扫随时看直播</p>

          <!--          <el-divider></el-divider>-->
<!--          <p class="down-zhushou" >-->
<!--            <a target="_blank" :href="DOWNLOAD_APP_URL">爱球直播APP</a>-->
<!--          </p>-->
        </div>
      </div>
      <!--Nav 显示内容-->
      <div class="nav-icon download" slot="reference" @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)">
<!--        <img :src="downLoadUrl1" style="width:14px;height:14px;">-->
        下载APP
      </div>
    </el-popover>

    <!--导航栏搜索-->
    <div class="nav-search" slot="reference" v-if=" displayItem === 'search' ">
      <el-input placeholder="搜主播" v-model="searchContent" size="small" @keyup.enter.native="jumpResult(searchContent)"
                style="width:191px;">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="jumpResult(searchContent)"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
  import { Button, Popover, divider, Input, Dialog } from 'element-ui';
  // import { recommendLiveList } from "@/api/api";
  import storages from "@/utils/storage.js";
  import * as eventTrack from '@/utils/eventTracking.js'

  export default {
    name: 'home-nav-download',
    components: {
      [Button.name]: Button,
      [Popover.name]: Popover,
      [divider.name]: divider,
      [Input.name]: Input,
      [Dialog.name]: Dialog,
    },
    props: {
      displayItem: {}
    },
    data() {
      return {
        checked: false,
        searchContent: '',
        historySearchList: [], // 历史搜索列表
        recommendSearch: [{ uname: '' }, { uname: '' }, { uname: '' }, { uname: '' }, { uname: '' }, { uname: '' }],
        downLoadUrl1: require('@/assets/download/download@2x.png'),
        dialogOpenVisible: false,
        ShowDeleteButton: false,
        historyHoverIndex: 0, // 鼠标悬浮索引
      }
    },
    computed: {},
    created() {
    },
    watch: {},
    methods: {
      // 下载切换图片
      changeImageSrc(index) {
        if (index === 1) {
          this.downLoadUrl1 = require('@/assets/download/download@2x.png')
        } else {
          this.downLoadUrl1 = require('@/assets/download/download@2x.png')
        }
      },
      // 获取历史搜索信息
      getHistorySearch() {
        if (storages.getItem('historySearch')) {
          console.log('读取本地historySearch', storages.getItem('historySearch'))
          if (storages.getItem('historySearch').length > 4) {
            this.historySearchList = storages.getItem('historySearch').slice(-4)
          } else {
            this.historySearchList = storages.getItem('historySearch')
          }
        }
      },
      // 删除缓存中所有
      deleteHistoryList() {
        storages.removeItem('historySearch')
        this.historySearchList = []
      },
      // 删除缓存中一个s
      deleteOne(index) {
        console.log('删除缓存中一个', index)
        let historySearch = storages.getItem('historySearch')
        historySearch.splice(index, 1)
        console.log('historySearch.splice(index,1)', historySearch)
        storages.setItem('historySearch', historySearch)
        console.log('historySearch.splice(index,1)', historySearch)
        let that = this
        setTimeout(function () {
          that.getHistorySearch()
          console.log(2);
        }, 100);

      },
      // 跳转到搜索结果页面
      jumpResult(content) {
        if (content.length >= 1) {
          this.$router.push({ path: '/search', query: { searchContent: content } })
          this.historySearchList.push(content)
          this.historySearchList = [...new Set(this.historySearchList)]
          console.log('this.historySearchList', this.historySearchList)
          storages.setItem('historySearch', this.historySearchList)
          this.navClickEvent('搜索')
        }
      },
      // 跳转到直播间
      jumpToLiveRoom(item) {
        this.$router.push({ path: '/' + item.id })
        this.historySearchList.push(item.uname)
        storages.setItem('historySearch', this.historySearchList)
        this.navClickEvent('搜索')
      },
      // 获取推荐列表--搜索栏
      getSugestedList() {
        // let data = {
        //   recommendAnchorType: 'SEARCH_PAGE',
        //   size: 6,
        // }
        // let headers = {}
        // recommendLiveList(data, headers).then(res => {
        //   // console.log('-导航栏获取推荐列表', res)
        //   this.recommendSearch = res.data.channel
        // })
      },
      //埋点-首页-导航栏-点击事件
      navClickEvent(item) {
        console.log('首页-导航-埋点')
        let eventTrackParams = { item_id: 'top_nav_click', page_id: 'index', btn: item }
        eventTrack.reportData(eventTrackParams)
      },
    },
    mounted() {
      // this.getSugestedList()
      this.getHistorySearch()
    },
    filters: {
      historyFilters: function (value) {
        if (!value) return ''
        if (value.length > 15) {
          return value.slice(0, 10)
        } else {
          return value
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_var.scss";

  .nav-icon {
    /*padding-right: 25px;*/
    width: 135px!important;
    display: flex;

    align-items: center;
    font-size: 16px;
    &.download {
      justify-content: center!important;
      background: url(~@/assets/img/download.png) center center no-repeat;
      background-size: 80% 80%;
    }
  }

  .nav-icon:hover {
    color: $color-main;
  }


  .nav-search {
    width: 235px;

    ::v-deep.el-input--small .el-input__inner {
      height: 32px;
      font-size: 14px;
      line-height: 14px;
      padding: 9px 10px 9px 25px;
      background-color: #F0F0F0;
    }
  }

  .nav-search-pop {
    width: 310px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;

    .search-title {
      width: 310px;
      height: 30px;
      font-size: 16px;
      color: rgba(153, 153, 153, 1);
      line-height: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .search-list {
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      text-align: left;
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;

      .search-list-item {
        width: 150px;
        height: 24px;
        margin: 3px 0px 3px 0px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        vertical-align: middle;

        .hot-index {
          height: 17px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          position: relative;

          .hot-index-number {
            position: absolute;
            top: 0px;
            left: 3px;
            width: 5px;
            font-size: 12px;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
          }
        }
      }

      .search-list-item:hover {
        background: rgba(244, 244, 244, 1);
      }
    }

    .history-item {
      width: 140px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .down-dialog {
    ::v-deep.el-dialog {
      border-radius: 10px;
    }
  }

  .code-show-pop {
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
  }

  ::v-deep.el-divider--horizontal {
    margin: 14px 0;
  }

  .code-down {
    // position: relative;
    .code-show {
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      // box-shadow: 1px 2px 10px 0px #9B9B9B;
      .title {
        font-size: 16px;
        color: #333;
        line-height: 22px;
        font-weight: 500;
      }

      .info {
        margin-top: 10px;
        font-size: 14px;
        line-height: 17px;
        color: #333;
      }

      .code-pic {
        width: 120px;
        height: 120px;
        margin: 10px auto;
        border-radius: 4px;
        border: 0.5px solid #ccc;

        img {
          width: 110px;
          height: 110px;
          margin: 5px;
        }
      }

      .down-zhushou {
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
</style>
