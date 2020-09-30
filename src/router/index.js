import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "爱球直播"
    },
    component: Home
  },
  {
    path: "/html",
    name: "html",
    meta: {
      title: "支付"
    },
    component: ()=> import('../views/MCenter/html.vue')
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    meta: {
      title: "支付成功"
    },
    component: ()=> import('../views/word/paysuccess.vue')
  },
  {
    path:"/privary",
    name:"Privary",
    meta:{
        title:"隐私协议"
    },
    component: ()=> import('../views/word/privary.vue')
},
{
  path:"/aboutwe",
  name:"Aboutwe",
  meta:{
      title:"关于我们"
  },
  component: ()=> import('../views/word/aboutwe.vue')
},
{
  path:"/aboutwefake",
  name:"Aboutwefake",
  meta:{
      title:"关于我们"
  },
  component: ()=> import('../views/word/aboutwefake.vue')
},
{
  path:"/serve",
  name:"Serve",
  meta:{
      title:"用户服务协议"
  },
  component: ()=> import('../views/word/serve.vue')
},
{
  path:"/host",
  name:"Host",
  meta:{
      title:"主播管理规范"
  },
  component: ()=> import('../views/word/host.vue')
},
{
  path:"/barrage",
  name:"Barrage",
  meta:{
      title:"弹幕管理"
  },
  component: ()=> import('../views/word/barrage.vue')
},
{
  path:"/withdrawal",
  name:"Withdrawal",
  meta:{
      title:"提现说明"
  },
  component: ()=> import('../views/word/withdrawal.vue')
},
{
  path:"/topup",
  name:"Topup",
  meta:{
      title:"充值说明"
  },
  component: ()=> import('../views/word/topup.vue')
},
{
  path:"/fans",
  name:"Fans",
  meta:{
      title:"粉丝体系"
  },
  component: ()=> import('../views/word/fans.vue')
},
{
  path:"/levelthat",
  name:"Levelthat",
  meta:{
      title:"等级制度"
  },
  component: ()=> import('../views/word/levelthat.vue')
},
  {
    path: "/zhibo",
    name: "channel",
    component: () => import("../views/channel.vue"),
    children: [
      {
        path: "/",
        name: "LiveList",
        meta: {
          title: "直播"
        },
        component: () => import("../views/live-list.vue")
      },
      {
        path: "/Live-list",
        name: "LiveList",
        meta: {
          title: "直播"
        },
        component: () => import("../views/live-list.vue")
      },
      {
        path: "/category",
        name: "CategoryList",
        meta: {
          title: "分类"
        },
        component: () => import("../views/category-list.vue")
      },
      {
        path: "/follow",
        name: "FollowList",
        meta: {
          title: "我的关注"
        },
        component: () => import("../views/follow-list.vue")
      },
      {
        path: "/search",
        name: "SearchResult",
        meta: {
          title: "搜索结果"
        },
        component: () => import("../views/search-result.vue")
      },
      {
        path: "/rank",
        name: "Rank",
        meta: {
          title: "榜单"
        },
        component: () => import("../views/Rank.vue")
      },
      {
        path: "/download",
        name: "Download",
        meta: {
          title: "下载"
        },
        component: () => import("../views/Download.vue")
      },
      {
        path: "/schedule",
        name: "Schedule",
        meta: {
          title: "赛程"
        },
        component: () => import("../views/Schedule.vue")
      },
      {
        path: "/live-broadcast",
        name: "Live-broadcast",
        meta: {
          title: "赛程直播"
        },
        component: () => import("../views/schedule/live-broadcast.vue")
      },
    ]
  },
  {
    path: "/MLive",
    name: "Mchannel",
    component: () => import("../views/MCenter/Mchannel.vue"),
    children: [
      {
        path: "/me",
        name: "me",
        meta: {
          title: "主播中心"
        },
        component: () => import("../views/MCenter/MCenter.vue")
      }
    ]
  },

  {
    path: "/:liveroom",
    name: "liveroom",
    meta: {
      title: "直播间"
    },
    component: () => import("../views/Liveroom.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});
// 重写路由的push方法
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

router.beforeEach(function (to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "爱球直播";
  }
  next();
});

export default router;
