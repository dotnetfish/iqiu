<template>
  <div class="left-side-bar">
<!--    <div class="fold-btn" v-show="isFold" @click="foldFn"><i></i></div>-->
<!--    <div class="unfold-btn" v-show="!isFold" @click="unfoldFn"><i></i></div>-->
    <div class="fold-box" v-show="isFold">
      <!--      <div class="logo">-->
      <!--        <router-link to="/"></router-link>-->
      <!--      </div>-->
      <div class="top">
        <ul>
          <li @click="toFollowList('关注')"><i class="gz"></i><span>关注</span></li>
          <li v-for="item in categoryList" :key="item.code" @click="toCategoryList(item.code,item.name)"><i :class="item.code"></i><span>{{item.name}}</span></li>
<!--          <li @click="toCategoryList('basketball')"><i class="basketball"></i><span>篮球</span></li>-->
<!--          <li @click="toCategoryList('all')"><i class="all"></i><span>综合</span></li>-->
        </ul>
      </div>
<!--      <div class="btm">-->
<!--        <ul>-->
<!--          <li @click="openDialogDown"><img class="down" src="../assets/icon_down3@2x.png"><span>下载</span></li>-->

<!--          <li @click="openDialogOpen"><img src="../assets/icon_kt3_2x.png"><span>开通</span></li>-->
<!--        </ul>-->

<!--      </div>-->
<!--    </div>-->
<!--    <div class="ow-box" :class="{w0:isw0}" v-show="!isFold">-->
<!--      <div class="unfold-box" :class="{w0:isw0}">-->
<!--        &lt;!&ndash;        <div class="logo1" :class="{w0:isw0}">&ndash;&gt;-->
<!--        &lt;!&ndash;          <router-link to="/" v-show="!isFold"></router-link>&ndash;&gt;-->
<!--        &lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div class="gz-list">-->
<!--          <div class="title">-->
<!--            <img src="@/assets/icon_follow_sidebar.png" alt="">-->
<!--            <span @click="toFollowList('关注')">我的关注{{num}}</span>-->
<!--&lt;!&ndash;            <span&ndash;&gt;-->
<!--&lt;!&ndash;              class="more"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="toFollowList('更多')">更多<i></i></span>&ndash;&gt;-->
<!--          </div>-->
<!--          <ul>-->
<!--            <li v-for="item in leftonlineChannels" :key="item.id" @click="toLiveRoom(item.cid)">-->
<!--              <div class="head-pic">-->
<!--                <i></i>-->
<!--                <img :src="item.avatarUrl">-->
<!--              </div>-->
<!--              <div class="name" :title="item.uname">{{item.uname}}</div>-->
<!--            </li>-->
<!--            &lt;!&ndash; <li>-->
<!--              <div class="head-pic"><i></i><img src="https://rpic.douyucdn.cn/asrpic/191224/4666609_1304.png/webpdy1"></div>-->
<!--              <div class="name" title="足球小子科技很快就会">足球小子科技很快就会</div>-->
<!--            </li>-->
<!--            &ndash;&gt;-->

<!--          </ul>-->
<!--        </div>-->
<!--        <div class="fl-list">-->
<!--          <div class="title">-->
<!--            <img src="@/assets/icon_type.png" alt="">-->
<!--            <span @click="toCategoryList">分类</span>-->
<!--          </div>-->
<!--          <ul>-->
<!--            &lt;!&ndash; <li title="全部" @click="toLiveList ('', '全部')">全部</li>       &ndash;&gt;-->
<!--            <li v-for="item in categoryList" :key="item.order" :title="item.name"-->
<!--                @click="toLiveList (item.code, item.name)">{{item.name}}-->
<!--            </li>-->
<!--            &lt;!&ndash; <li title="足球"><a data-v-6fa68043="" href="">综合</a></li>       &ndash;&gt;-->
<!--          </ul>-->
<!--        </div>-->
<!--        <div class="bottom b-fixed">-->
<!--          &lt;!&ndash; <span class="btn" >下载</span> &ndash;&gt;-->
<!--          <el-button type="primary" round class="downBtn" @click="openDialogDown">下载APP</el-button>-->
<!--          <div class="down-dialog">-->
<!--            <el-dialog title="" :visible.sync="dialogDownVisible" append-to-body width="240px">-->
<!--              <div class="code-down">-->
<!--                <div class="code-show">-->
<!--                  <h3 class="title">爱球APP</h3>-->
<!--                  <p class="info">扫一扫手机看直播</p>-->
<!--                  <p class="code-pic"><img src="../assets/img/all-download-qrcode.png"></p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-dialog>-->
<!--          </div>-->

<!--          <el-button type="primary" round class="downBtn" @click="openDialogOpen">我要开播</el-button>-->
<!--          <el-dialog title="" :visible.sync="dialogOpenVisible" append-to-body width="240px">-->
<!--            <div class="code-down">-->
<!--              <div class="code-show">-->
<!--                <h3 class="title">下载爱球APP</h3>-->
<!--                <p class="info">下载APP申请主播只需三步</p>-->
<!--                <p class="code-pic"><img src="../assets/img/all-download-qrcode.png"></p>-->
<!--                <p class="down-zhushou"><a-->
<!--                  :href="DOWNLOAD_APP_URL"-->
<!--                  target="_blank">下载直播助手</a></p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-dialog>-->
<!--          &lt;!&ndash; <span class="btn">我要开播</span> &ndash;&gt;-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
  import { Dialog, Button } from 'element-ui';
  import * as eventTrack from '@/utils/eventTracking.js'
  import * as api from "@/api/api";
  import storages from "@/utils/storage";

  //  import storages from "@/utils/storage.js";
  // import cookie from "@/modules/utils/cookie.js";
  export default {
    name: 'LeftSideBar',
    components: {
      [Dialog.name]: Dialog,
      [Button.name]: Button
    },
    props: {
      msg: String
    },
    data() {
      return {
        num: '',
        isCollapse: false,
        isFold: true,
        isw0: false,
        categoryList: [],
        leftonlineChannels: [],
        dialogDownVisible: false,
        dialogOpenVisible: false,
        followObj: {},
        categoryObj: {}
      }
    },
    watch: {
      isLogin(val) {
        if (val) {
          // console.log('已登录')
          this.getHotFollowList();
        } else {
          // console.log('未登录')
        }


      }
    },
    computed: {
      // 登录状态
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    created() {
      //  this.isFold = this.$store.state.fold;
      //  this.isw0 = this.$store.state.leftW0;
      // let leftFoldState = window.sessionStorage.getItem('leftFoldState');
      // let leftWState = window.sessionStorage.getItem('leftWState');
      // this.isFold = leftFoldState === null || leftFoldState === 'false' ? false : true; //折叠状态
      // this.isw0 = leftWState === null || leftWState === 'false' ? false : true;
      // console.log(this.isFold)
      // console.log(this.isw0)
      // cookie.setItem('xx-user-token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiIzNDg2MDc0IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTI0OTM4MCwiaWF0IjoxNTc4MDM5NzgwfQ.XJiyZ-K-3HOFIn7bC_Vo_zMI5ViK3niGNCTz4Sr6_CbUSN5drA0BsNnaJ6qSygjZB2FzWoWH3OydEZ2Ce73kUA')
      //   console.log('本地用户信息',storages.getItem('userStatus'))
      //  console.log('vuex',this.$store.state.userStatus)
      //  console.log('uid:',this.$store.state.userStatus.userInfo.uid)
      //  console.log('token:', cookie.getItem('xx-user-token'))
      //  console.log('登录状态:',this.isLogin)
      // 判断是否登录
      // if (this.isLogin) {
      //   this.getHotFollowList();
      // }
      this.getCategoryList()
    },

    methods: {
      // 获取左侧关注列表
      getHotFollowList() {
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4LXp5LXVzZXItaWQiOiIzNDg2MDc0IiwiaXNzIjoiemhhbmd5dSIsImV4cCI6MTU3OTI0OTM4MCwiaWF0IjoxNTc4MDM5NzgwfQ.XJiyZ-K-3HOFIn7bC_Vo_zMI5ViK3niGNCTz4Sr6_CbUSN5drA0BsNnaJ6qSygjZB2FzWoWH3OydEZ2Ce73kUA';
        // let headers = {
        //   'x-zy-user-id': '3486074',
        //   'x-zy-user-token': token
        // }
        return api.attentionGetFollowAnchors({}, {}).then(res => {
          // console.warn(res);
          if (res.data.offlineChannels.length > 0 && res.data.onlineChannels.length === 0) {
            this.num = '(0)';
          } else if (res.data.offlineChannels.length === 0 && res.data.onlineChannels.length === 0) {
            this.num = '';
          } else {
            if (res.data.onlineChannels.length <= 6) {
              this.leftonlineChannels = res.data.onlineChannels;
            } else {
              for (let i = 0; i < 6; i++) {
                this.leftonlineChannels.push(res.data.onlineChannels[i]);
              }

            }
            this.num = '(' + res.data.onlineChannels.length + ')';
          }


        })
        // .catch(e => {
        //   console.error(e);

        // })
      },
      // 获取左侧分类列表
      getCategoryList() {
        return api.CategoryList({ name: 'index' }, {}).then(res => {
          // console.warn(res);
          this.categoryList = res.data;
          this.categoryList.unshift({code: "all", name: "全部"});
        }).catch(e => {
          console.error(e);

        })
      },
      // 折叠点击
      foldFn() {
        this.$store.commit('FoldState', { fold: false, leftW0: false })
        this.isFold = false;
        this.isw0 = false;
        this.$emit('changeFoldState');
        // console.log('leftbar1:',this.isFold)
        // console.log(this.isw0)
      },
      // 展开点击
      unfoldFn() {
        this.$store.commit('FoldState', { fold: true, leftW0: true })
        this.isFold = true;
        this.isw0 = true;
        this.$emit('changeFoldState');
        // console.log('leftbar2:',this.isFold)
        // console.log(this.isw0)
      },
      // 跳转直播列表
      toLiveList(code, name) {
        this.$router.push({ path: '/Live', query: { 'typeId': code, name: name } })
        this.leftSideClickEvent(name)
      },
      // 跳转关注列表
      toFollowList(param) {
        this.$router.push('/follow');
        this.leftSideClickEvent(param)
      },
      // 跳转分类列表
      toCategoryList(keys, typeName) {
        storages.setItem("CategoryList", keys)
        storages.setItem('CategoryListName', typeName)
        this.$router.push('/category');
      },
      // 跳转直播间
      toLiveRoom(cid) {
        //  this.$router.push({ path: '/Liveroom', query: { cid: cid }})
        const { href } = this.$router.resolve(cid, '/')
        window.open(href, "_blank");
        // const { href } = this.$router.resolve({ path: '/Liveroom', query: { cid: cid } })
        // window.open(href, "_blank");
      },
      openDialogDown() {
        this.dialogDownVisible = true
        this.leftSideClickEvent('下载')
      },
      openDialogOpen() {
        this.dialogOpenVisible = true
        this.leftSideClickEvent('我要开播')
      },
      //埋点-直播-左侧
      leftSideClickEvent(param) {
        let eventTrackParams = {}
        eventTrackParams = { item_id: 'zhibo_button_click', page_id: 'zhibo', btn: param }
        eventTrack.reportData(eventTrackParams)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  $black-bg: #333;
  .left-side-bar {
    position: fixed;
    // overflow: hidden;
    z-index: $z-index1;
    top: 60px;
    left: 0;
    bottom: 0;
    // width: 240px;
    height: 100%;
    // height: 100%;
    // width: 48px;
    background-color: $black-bg;

    .fold-btn, .unfold-btn {
      position: absolute;
      z-index: $z-index2;
      right: -12px;
      top: 50%;
      // margin-top: -70px;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 40px;
      height: 200px;
      background-color: $black-bg;
      border-radius: 20px;
      cursor: pointer;

      i {
        position: absolute;
        // z-index: 300;
        top: 50%;
        right: 3px;
        // display: inline-block;
        margin-top: -7px;
        width: 8px;
        height: 13px;
        background: url('../assets/icon_arrow_r@2x.png') no-repeat center;
        background-size: 100%;
      }
    }

    // 展开按钮
    .unfold-btn {
      i {
        transform: rotateY(180deg);
        -ms-transform: rotateY(180deg); /* Internet Explorer */
        -moz-transform: rotateY(180deg); /* Firefox */
        -webkit-transform: rotateY(180deg); /* Safari 和 Chrome */
        -o-transform: rotateY(180deg); /* Opera */
        background-position: center;
      }
    }

    .ow-box {
      position: relative;
      z-index: $z-index1;
      width: 240px;
      // height: 100%;
      height: calc(100% - 90px);
      overflow: hidden;
      transition: width 0.5s;

    }

    // 折叠区域
    .fold-box {
      position: relative;
      z-index: $z-index1;
      width: 50px;

      .logo {
        display: block;
        border-bottom: 1px solid #313131;

        a {
          height: 100%;
          display: block;
          width: 30px;
          height: 30px;
          margin: 15px auto;
          overflow: hidden;
          background: url('../assets/logo1@2x.png') no-repeat center center;
          background-size: 100%;
          border-radius: 5px;
        }
      }

      .top {
        margin-top: 30px;
        ul {
          li {
            margin-bottom: 10px;
            font-size: 14px;
            color: #fff;
            text-align: center;
            cursor: pointer;

            img {
              margin: 16px auto 5px;
            }

            i {
              display: block;
              margin: 16px auto 5px;

              &.gz {
                width: 21px;
                height: 21px;
                background: url('../assets/icon_follow_sidebar.png') no-repeat center center;
                background-size: 100%;
              }

              &.fenlei {
                width: 21px;
                height: 21px;
                background: url('../assets/icon_type.png') no-repeat center center;
                background-size: 100%;

              }
              &.football {
                width: 21px;
                height: 21px;
                background: url(~@/assets/home/football.png) no-repeat center center;
                background-size: 100%;

              }
              &.basketball {
                width: 21px;
                height: 21px;
                background:  url(~@/assets/home/basketBall.png) no-repeat center center;
                background-size: 100%;

              }
              &.other {
                width: 21px;
                height: 21px;
                background:  url(~@/assets/home/all.png) no-repeat center center;
                background-size: 100%;

              }
              &.all {
                width: 21px;
                height: 21px;
                background:  url('../assets/icon_type.png') no-repeat center center;
                background-size: 100%;

              }
              &.esports {
                width: 21px;
                height: 21px;
                background:  url('../assets/home/esports.png') no-repeat center center;
                background-size: 100%;

              }
            }

            span {
              display: block;
              margin: 0 auto;
            }

            &:hover {
              color: #f9772a;

              /*i {*/
              /*  &.gz {*/
              /*    background-image: url('../assets/icon_gz1@2x.png');*/
              /*  }*/

              /*  &.fenlei {*/
              /*    background-image: url('../assets/icon_fl1@2x.png');*/
              /*  }*/
              /*}*/
            }
          }
        }
      }

      .btm {
        position: fixed;
        bottom: 97px;
        width: 50px;

        ul {
          li {
            margin-bottom: 10px;
            font-size: 16px;
            color: #999;
            text-align: center;
            cursor: pointer;

            img {
              margin: 16px auto 5px;
              width: 23px;

              &.down {
                width: 20px;
              }
            }

            span {
              display: block;
              margin: 0 auto;
            }

            &:hover {
              color: $color-main;
            }
          }
        }
      }

    }

    // 展开区域
    .unfold-box {
      // position: relative;
      overflow-y: auto;
      width: 258px;
      height: 100%;
      margin: 10px 0 60px;
      // z-index: $z-index1;
      background-color: $black-bg;
      border: 0;
      color: #fff;
      // &::-webkit-scrollbar {
      //     display: none;
      // }
      .logo1 {
        position: fixed;
        z-index: 400;
        width: 240px;
        top: 0;
        height: 59px;
        text-align: center;
        border-bottom: 1px solid #313131;
        background-color: $black-bg;
        transition: width 0.5s;

        a {
          //  position: relative;
          width: 116px;
          height: 38px;
          margin: 10px auto;
          display: block;
          overflow: hidden;
          background: url('../assets/logo@2x.png') no-repeat center;
          background-size: 116px 38px;
          // transition: width 0.5s;
        }

      }

      .w0 {
        // width: 0;
      }

      .gz-list {
        width: 216px;
        padding: 0 12px;
        font-size: 14px;
        color: #999;

        .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 30px 0 20px;
          font-size: 22px;
          color: #fff;

          span {
            cursor: pointer;
            margin-left: 6px;
            &:hover {
              color: $color-main;

              i {
                background: url('../assets/icon_arrow_r1@2x.png') no-repeat center;
                background-size: 100%;
              }
            }

            i {
              position: relative;
              top: 2px;
              margin-left: 5px;
              display: inline-block;
              width: 8px;
              height: 13px;
              background: url('../assets/icon_arrow_r@2x.png') no-repeat center;
              background-size: 100%;
            }
          }

          .more {
            cursor: pointer;

          }
        }

        ul {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          // align-items:center;
          // align-content: center;
          li {
            width: 103px;
            height: 140px;
            margin: 5px 0;
            text-align: center;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.3);
            cursor: pointer;

            .head-pic {
              position: relative;
              width: 56px;
              height: 56px;
              margin: 25px auto 13px;
              padding: 1px;
              border: 2px solid $color-main;
              border-radius: 50%;
              // background-color: #fff;
              img {
                width: 56px;
                height: 56px;
                // height: 54px;
                // padding: 2px;
                // margin: -1px 0 0 -1px;
                // border: 2px solid $color-main;
                // background-color: #000;
                border-radius: 50%;
              }

              i {
                position: absolute;
                right: 0;
                bottom: -3px;
                margin-left: 5px;
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url('../assets/icon_liveing@2x.png') no-repeat center;
                background-size: 100%;
              }
            }

            .name {
              cursor: pointer;
              padding: 0 5px;
              @include ellipsis($rowCount: 1);

              &:hover {
                color: $color-main;
              }
            }


          }
        }
      }

      .fl-list {
        width: 228px;
        padding: 0 0 0 12px;
        margin-bottom: 100px;
        font-size: 14px;
        color: #999;

        .title {
          display: flex;
          align-items: center;
          text-align: left;
          padding: 10px 0 10px;
          font-size: 22px;
          color: #fff;
          cursor: pointer;
          span {
            margin-left: 6px;
          }
        }

        ul {
          display: flex;
          flex-flow: row wrap;
          // justify-content:space-between;
          /*align-items:center;*/
          // align-content: center;
          li {
            width: 56px;
            height: 32px;
            padding: 0 5px;
            line-height: 32px;
            text-align: center;
            margin: 5px 9px 5px 0;
            background-color: #666666;
            color: #fff;
            cursor: pointer;
            border-radius: 32px;

            @include ellipsis(1);

            &:hover {
              color: #fff;
              background-color: $color-main;
            }

            a {
              // display: block;
              color: #999;

              &:hover {
                color: #fff;
                background-color: $color-main;
              }
            }
          }
        }
      }

      .bottom {
        // position: fixed;
        // bottom: 0;
        display: flex;
        width: 216px;
        padding: 20px 12px;
        margin-bottom: 100px;
        justify-content: space-between;

        .btn {
          width: 101px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 20px;
          background-color: $color-main;
          font-size: 15px;
          color: #fff;
          cursor: pointer;

          a {
            display: block;
            color: #fff;
          }
        }
      }

      .b-fixed {
        position: fixed;
        z-index: 400;
        bottom: 0px;
        margin-bottom: 0px;
        padding-bottom: 50px;
        background-color: $black-bg;
      }

    }

    .w0 {
      // width: 0;
    }

  }

  .w0 {
    // width: 0;
  }

  // .el-menu-vertical-demo:not(.el-menu--collapse) {
  //     width: 240px;
  //     min-height: 100%;
  //   }
  .downBtn {
    border-radius: 20px;
    font-size: 15px;
    background-color: $color-main;
    width: 103px;
    height: 40px;
  }

  .down-dialog {
    ::v-deep.el-dialog {
      border-radius: 10px;
    }
  }

  .code-down {
    // position: relative;
    .code-show {
      // width: 180px;
      // height: 202px;
      margin-top: -30px;
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
        font-size: 12px;
        line-height: 17px;
        color: #666;
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
        margin-top: 0px;
        margin-bottom: -20px;
        height: 46px;
        line-height: 46px;
        // border-top: 1px solid #D9D9D9;
        font-size: 14px;

        /*a {*/
        /*  padding-left: 35px;*/
        /*  background: url('../assets/icon_kt3_2x.png') no-repeat left center;*/
        /*  background-size: 23px 23px;*/
        /*}*/
      }
    }
  }
</style>
