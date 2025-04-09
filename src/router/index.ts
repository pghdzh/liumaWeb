import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // NProgress Configuration 刷新页面头部进度条

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/HomeView/index.vue"),
    },
    {
      path: "/uploadview",
      component: () => import("../views/uploadView/index.vue"),
    },
    {
      path: "/talkview",
      component: () => import("../views/TalkView/index.vue"),
    },
    {
      path: "/luckydraw",
      component: () => import("../views/LuckyDraw/index.vue"),
    },
  ],
});

export default router;
