<template>
 <div>
   <!--导航栏显示-未登录-->
   <div class="nav-nologin" slot="reference"  @mouseenter="changeImageSrc(1)" @mouseleave="changeImageSrc(2)" @click="openLoginDialog()" v-if="userStatus.loginStatus==='notLogin'">
<!--     <img :src="avatarUrl" style="width:14px;height:14px">-->
     登录/注册
   </div>

    <!--登录弹框-->
    <el-popover  placement="bottom" width="260"  trigger="hover" v-if="userStatus.loginStatus==='isLogin'">
      <div class="login-pop" >
      <el-avatar :size="64" :src="userStatus.userInfo.avatarUrl" @error="errorHandler">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
      </el-avatar>
      <div class="user-info-name bold">{{ userStatus.userInfo.uname}}</div>
      <div class="user-info-id">UID: {{ userStatus.userInfo.uid }}</div>
      <el-divider></el-divider>
      <router-link :to="{ name: 'me'}">
        <div class="bold login-item">个人中心
        </div>
      </router-link>
      <el-divider></el-divider>
      <router-link :to="{ name: 'me',query:{isAuthor: true}}">
        <div class="bold login-item">主播中心
        </div>
      </router-link>
      <el-divider></el-divider>
      <div class='bold login-item pointer' @click="logout">退出</div>
      </div>
<!--        <div class="login-pop" >-->
<!--          <div class="user">-->
<!--            <div class="user-logo">-->
<!--              <el-avatar :size="64" :src="userStatus.userInfo.avatarUrl" @error="errorHandler">-->
<!--                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>-->
<!--              </el-avatar>-->
<!--            </div>-->
<!--            <div class="user-info">-->
<!--              <div class='signOut' @click="logout"><img src="@/assets/login/logOut@3x.png" style="width:15px;height:14px;margin-right:5px;">登出</div>-->
<!--              <p class="user-info-name">{{ userStatus.userInfo.uname}}</p>-->
<!--              <p class="user-info-id">UID: {{ userStatus.userInfo.uid }}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <el-divider></el-divider>-->
<!--           <div class="my-account">-->
<!--            <div class="my-account-left">-->
<!--             <P class="my-account-title">我的钱包</P>-->
<!--             <div class="my-account-sum">-->
<!--               <img src="@/assets/login/rice@2x.png" style="width:16px;height:16px;margin-right:5px;">米粒：{{userStatus.userInfo.balance === ''? balance :userStatus.userInfo.balance }}-->
<!--             </div>-->
<!--            </div>-->
<!--            <el-button round size="mini" style="background:rgba(241,108,1,1);color:rgba(249,249,249,1);" @click.stop="handlePay">充值</el-button>-->
<!--          </div>-->
<!--          <el-divider></el-divider>-->
<!--          <div class="login-pop-link">-->
<!--          <router-link :to="{ name: 'me'}">-->
<!--            <div class="login-pop-link-item">-->
<!--                <img src="@/assets/login/pop-personCenter.png"><p>个人中心</p>-->
<!--            </div>-->
<!--          </router-link>-->
<!--           <router-link :to="{ name: 'FollowList'}">-->
<!--            <div class="login-pop-link-item">-->
<!--                <img src="@/assets/login/pop-follow.png"><p>我的关注</p>-->
<!--            </div>-->
<!--           </router-link>-->
<!--            <div class="login-pop-link-item">-->
<!--              <a href="https://pic.imifan.live/tools/zhibozhushou/MiFanTool-V1.0.0.0-Setup.exe">-->
<!--                <img src="@/assets/login/pop-beAnchor.png" href="https://pic.imifan.live/tools/zhibozhushou/MiFanTool-V1.0.0.0-Setup.exe">-->
<!--              </a>-->
<!--                <p><a href="https://pic.imifan.live/tools/zhibozhushou/MiFanTool-V1.0.0.0-Setup.exe">我要开播</a></p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <!--导航栏显示-已登录-->
        <div class="nav-user" slot="reference">
          <el-avatar :size="40" :src="userStatus.userInfo.avatarUrl" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
<!--          <p style="margin-left:6px;"> {{userStatus.userInfo.uname | capitalize}}</p>-->
        </div>
    </el-popover>
  </div>
</template>
<script>
  import { Button, Popover, divider, avatar} from 'element-ui';
  import * as eventTrack from '@/utils/eventTracking.js'
  import { loginInfo } from "@/api/liveroom";
  // import cookie from "@/modules/utils/cookie.js";
  // import storages from "@/utils/storage.js";
  export default {
    name: 'home-nav-user',
    components: {
      [Button.name]: Button,
      [Popover.name]: Popover,
      [divider.name]: divider,
      [avatar.name]: avatar,
    },
    data() {
      return {
        avatarUrl: require('@/assets/login/avatar@2x.png'), // 人像
        balance:0,
      }
    },
    computed: {
      userStatus: {
        get () {
          console.log('home-nav-user检测到登录状态改变', this.$store.state.userStatus)
          return this.$store.state.userStatus
        },
        set(val){
          this.$store.commit('updateUserStatus', val)
        }
      },
      isLogin () {
        return this.$store.getters.isLogin
      }
    },
    created() {
      // getExtensionOrderReport()
      if(this.isLogin){
        this.getHomeUserInfo()
      }
    },
    methods: {
      // 切换导航栏图片
      changeImageSrc(){
        // if(index === 1){
        //   this.avatarUrl = require('@/assets/login/avatar_blue@2x.png')
        // } else {
        //   this.avatarUrl = require('@/assets/login/avatar@2x.png')
        // }
      },
      openLoginDialog(){
        this.$store.state.openLoginDialog = true
        this.navClickEvent ('登录')
      },
      // 查询用户信息
      getHomeUserInfo () {
         if (!this.isLogin) return;
           return loginInfo().then(res => {
          // this.userLogin = res.data;
          console.log('登录获取用户信息res',res);
          // this.balance = res.data.accountDto.miCoin.balance
          this.balance = 0;
        })
      },
      // 退出登录
      logout () {
        this.$store.commit('layout')
        this.$store.state.openLoginDialog = false
        console.log('localStorage',localStorage)
      },
      // 图片加载失败
      errorHandler() {
        return true
      },
      handlePay() {
        if (!this.isLogin) return this.$emit('login');
        this.$refs.wallt.show(true)
        // this.Message.error('未联调')
      },
      //埋点-首页-导航栏-点击事件
      navClickEvent (item) {
        console.log('首页-导航-埋点')
        let eventTrackParams = { item_id: 'top_nav_click', page_id: 'index', btn: item }
        eventTrack.reportData(eventTrackParams)
      },
    },
    mounted () {
      console.log('获取用户信息', this.userInfo )
    },
    watch: {
      isLogin(newvalue){
        console.log(newvalue)
        if(newvalue){
          this.getHomeUserInfo()
        }
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        if (value.length > 6){
          return value.slice(0,7)
        }else{
          return value
        }

      }
    }
}
</script>
<style lang="scss" scoped >
 @import "@/assets/css/_var.scss";
 .login-item {
   &:hover {
     color: #F9772A;
   }
 }
 .nav-nologin{
    width: 90px;
    display: flex;
    justify-content: space-around;
    align-items : center;
    font-size: 16px;
 }
 .nav-nologin:hover{
   color: $color-main;
 }
 .nav-user{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
 }
.login-tip-content{
   font-size:14px;
   height: 160px;
   display: flex;
   flex-direction:row;
   justify-content : space-around;
   align-items : center;
   .login-tip-item{
      display: flex;
      flex-direction:column;
      justify-content : flex-start;
      align-items : center;
      width: 65px;
   }
 }
 .login-pop{
   text-align: center;
   font-size: 16px;
   color: #333;
   font-weight: 800;

   .user-info-name {
     line-height: 28px;
   }
   .user-info-id {
     font-weight: 400;
     font-size: 14px;
     color: #666;
   }
  ::v-deep.el-divider--horizontal{
    margin: 15px 0px 15px 0px;
  }
}

</style>
