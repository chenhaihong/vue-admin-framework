import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import FirstFloorLayout from '@/layout/FirstFloorLayout.vue';
import SecondFloorLayout from '@/layout/SecondFloorLayout.vue';

Vue.use(Router);
NProgress.configure({ showSpinner: false }); // NProgress Configuration

let _router, _routeConfig;

export function makeRouter({ routes = [], mode = 'hash', ...navigationGuards }) {
  attachLayouts(routes);
  _routeConfig = {
    mode, // 'history' mode requires browser service support.
    routes,
  };
  _router = new Router(_routeConfig);
  attachGlobalNavigationGuards(_router, navigationGuards);
  return _router;
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  if (_router) {
    const newRouter = new Router(_routeConfig);
    _router.matcher = newRouter.matcher; // reset router
  }
}

export function getRouter() {
  return _router;
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
function attachGlobalNavigationGuards(router, guards) {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    if (guards.beforeEach) {
      guards.beforeEach(to, from, next);
    } else {
      next();
    }
  });
  router.afterEach((to, from) => {
    // finish progress bar
    NProgress.done();

    if (guards.afterEach) {
      guards.afterEach(to, from);
    }
  });

  const list = ['beforeResolve', 'onReady', 'onError'];
  list.forEach((item) => {
    const func = guards[item];
    if (func) {
      router[item](func);
    }
  });
}
