<template>
  <section class=nav-wrap>
    <div class="home-nav" :class="{'noLogo': !navLogo}">
      <div class="nav-menu">
        <div class="nav-logo" v-if="navLogo" align="center">
          <router-link :to="{name:'home'}" @click.native="navClickEvent('爱球直播')">
            <img :src="src">
          </router-link>
        </div>
        <div class="nav-display">
          <div class="nav-left">
            <router-link :to="{name:'home'}" @click.native="navClickEvent('默认')">
              <div class="routing" v-if="$route.name !== 'home' ">首页</div>
              <div class="nav-routing-active" v-if="$route.name === 'home' ">首页</div>
            </router-link>
            <router-link :to="{name:'LiveList'}" @click.native="navClickEvent('直播')">
              <div class="routing" v-if="$route.name !== 'LiveList' && $route.name !== 'liveroom' ">直播</div>
              <div class="nav-routing-active" v-if="$route.name === 'LiveList' ">直播</div>
              <div class="nav-routing-active" v-if="$route.name === 'liveroom' ">直播</div>
            </router-link>
            <router-link :to="{name:'CategoryList'}" @click.native="navClickEvent('分类')">
              <div class="routing" v-if="$route.name !== 'CategoryList' ">分类</div>
              <div class="nav-routing-active" v-if="$route.name === 'CategoryList' ">分类</div>
            </router-link>
            <router-link :to="{name:'Rank'}" @click.native="navClickEvent('榜单')">
              <div class="routing" v-if="$route.name !== 'Rank' ">榜单</div>
              <div class="nav-routing-active" v-if="$route.name === 'Rank' ">榜单</div>
            </router-link>
            <div class="nav-icon-item">
              <homeNavDownload :displayItem=" 'download' "></homeNavDownload>
            </div>
          </div>
          <div class="nav-right">
            <homeNavDownload :displayItem=" 'search' "></homeNavDownload>

            <div class="nav-icon-item">
              <router-link :to="{name:'FollowList'}">
                <homeNavFollow></homeNavFollow>
              </router-link>
            </div>
            <div class="nav-login" @click="jumpToMyCenter">
              <homeNavUser></homeNavUser>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
    import { Menu, MenuItem, Button, Input, Popover, Divider } from 'element-ui';
    import homeNavUser from '@/views/home/homeNavUser.vue';
    import homeNavFollow from '@/views/home/homeNavFollow.vue';
    import homeNavDownload from '@/views/home/homeNavDownload.vue';
    import cookie from "@/modules/utils/cookie.js";
    import * as eventTrack from '@/utils/eventTracking.js'

    export default {
        name: 'HomeNav',
        components: {
            homeNavUser, homeNavFollow, homeNavDownload,
            [Button.name]: Button,
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem,
            [Input.name]: Input,
            [Popover.name]: Popover,
            [Divider.name]: Divider,
        },
        props: {
            navLogo: {
                type: Boolean,
                default: false
            },
            navLogoType: {
                type: Number, //1 深色 2 白色
                default: 2
            }
        },
        data() {
            return {
                visible: false,
                loginStatus: '',
            }
        },
        created() {
            console.log('router', this.$router)
        },
        computed: {
            src() {
              return require(`@/assets/home/logo_big@2x${this.navLogoType==1?"":"_o"}.png`)
            },
            isLogin() {
                return this.$store.getters.isLogin
            }
        },
        watch: {},
        methods: {
            jumpToMyCenter() {
                if (this.isLogin && cookie.getItem('xx_n_t')) {
                    this.$router.push({ name: 'me' })
                }
            },
            //埋点-首页-导航栏-点击事件
            navClickEvent(item) {
                console.log('首页-导航看-埋点')
                let eventTrackParams = { item_id: 'top_nav_click', page_id: 'index', btn: item }
                eventTrack.reportData(eventTrackParams)
            },
        }
    }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_var.scss";

  .nav-wrap {
    width: 100%;
    background-color: #fff;
  }
  .home-nav {
    margin: 0 auto;

    width: 1200px;
    min-width: 1200px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 60px;
    &.noLogo {
      padding-right: 20px!important;
    }
    .nav-menu {
      height: 60px;
      cursor: pointer;
      background: #ffffff !important;
      /*box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);*/
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-flow: row;

      .nav-logo {
        width: 144px;
        height: 60px;
        margin-right: 50px;
        img {
          width: 144px;
          height: 60px;
        }
      }

      .nav-display {
        margin: 0px 0px 0px 24px;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .nav-left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          text-align: center;

          .nav-routing {
            width: 80px;
            height: 60px;
            border-radius: 60px;
            text-align: center;
          }

          .nav-routing:hover {
            width: 80px;
            height: 60px;
            color: $color-main;
          }

          .nav-routing-active {
            width: 60px;
            height: 34px;
            margin: 0px 10px 0px 10px;
            background: $color-main;
            border-radius: 60px;
            color: rgba(255, 255, 255, 1);
            line-height: 34px;
            text-align: center;
          }
        }

        .nav-right {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;

          ::v-deep.el-input__inner {
            border-radius: 20px;
          }
        }
      }

      .routing {
        width: 80px;
        height: 60px;
      }

      .routing:hover {
        width: 80px;
        height: 60px;
        color: $color-main;
      }

      .routing-home {
        margin-left: 40px;
      }

      .routing.is-active {
        width: 60px;
        height: 34px;
        background: $color-main;
        border-radius: 2px;
      }

      .nav-search {
        width: 193px;
        height: 60px;
      }

      ::v-deep.nav-icon {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 55px;
      }

      ::v-deep.nav-icon-item {
        width: 80px;
        text-align: center;
      }

      /*.nav-login {*/
        /*width: 180px;*/
      /*}*/
    }

    .download-pop {
      width: 300px;
      height: 210px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
