import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // NProgress Configuration 刷新页面头部进度条


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView/index.vue'),
    },
  ],
})

export default router
