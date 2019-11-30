import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import FirstFloorLayout from '../layout/FirstFloorLayout.vue';
import SecondFloorLayout from '../layout/SecondFloorLayout.vue';

Vue.use(Router);
NProgress.configure({ showSpinner: false }); // NProgress Configuration

let router;

export default function routerGenerator({ routes = [], ...others }) {
  attachLayouts(routes);
  router = new Router({
    // mode: 'history', // require service support
    routes,
  });
  attachGlobalNavigationGuards(router, others);
  return router;
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  if (router) {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
  }
}

// 为了方便外部使用，第一层、第二层的添加layout的逻辑统一由内部处理，
// (item.children && 第一层) ==> 加上 FirstFloorLayout
// (item.children && 第二层) ==> 加上 SecondFloorLayout
function attachLayouts(routeConfig, floor = 1) {
  routeConfig.forEach((item) => {
    if (!item.children) return;

    switch (floor) {
      case 1:
        item.component = FirstFloorLayout;
        attachLayouts(item.children, 2);
        break;
      case 2:
        item.component = SecondFloorLayout;
        // 处理到第二层就结束了，内部不会处理高于2层的layout
        break;
    }
  });
}

// 加上router的全局导航守卫
function attachGlobalNavigationGuards(router, others) {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    if (others.beforeEach) {
      others.beforeEach(to, from, next);
    } else {
      next();
    }
  });
  router.afterEach((to, from) => {
    // finish progress bar
    NProgress.done();

    if (others.afterEach) {
      others.afterEach(to, from);
    }
  });

  const list = ['beforeResolve', 'onReady', 'onError'];
  list.forEach((item) => {
    const func = others[item];
    if (func) {
      router[item](func);
    }
  });
}
