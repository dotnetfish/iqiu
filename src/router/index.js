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
