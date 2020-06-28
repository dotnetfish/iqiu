<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view v-if="isRouterAlive"></router-view>
    <homeFooter v-show="SHOW_FOOTER_LIST.includes($route.name)"></homeFooter>
    <loginTipPopup></loginTipPopup>
  </div>
</template>

<script>
  import homeFooter from '@/views/home/homeFooter.vue'

  // import storages from "@/utils/storage.js";
  import loginTipPopup from '@/components/login/loginTipPopup.vue'

  export default {
    name: 'home',
    components: {
      loginTipPopup,
      homeFooter
    },

    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        SHOW_FOOTER_LIST: ['home','LiveList','CategoryList','FollowList','Rank','SearchResult','me'],
        isRouterAlive: true,
      }
    },
    created() {
    },
    mounted() {
      // TODO 登陆
      // var status = {
      //   "uid": "10000940",
      //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ4eC11c2VyLWlkIjoiMTAwMDA5NDAiLCJpc3MiOiJhaXFpdSIsImV4cCI6MTU4NzE4MDk3NSwiaWF0IjoxNTg2NTc2MTc1fQ.D-L-U36RmBArYdeP-AJOk58ZHkHEK_j_c6ZwQ8WmKTjbkJuRas_qfn6Af8aWjB8cWJiFFPIm6C5u2TH-Vcr1BQ",
      //   "uname": "爱球用户_10000940",
      //   "avatarUrl": "http://pic.likedu.top/avatar/default-avatar.jpg"
      // }
      // storages.setItem('userStatus', {
      //   loginStatus: 'isLogin',
      //   userInfo: {
      //     avatarUrl: status.avatarUrl,
      //     uid: status.uid,
      //     uname: status.uname,
      //     balance: status.balance
      //   }
      // })
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>
