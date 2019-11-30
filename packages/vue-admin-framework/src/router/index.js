import Vue from 'vue';
import Router from 'vue-router';

import FirstFloorLayout from '../layout/FirstFloorLayout.vue';
import SecondFloorLayout from '../layout/SecondFloorLayout.vue';

Vue.use(Router);

let router;

const routerGenerator = function(routerConfig) {
  transformRouterConfig(routerConfig);

  router = new Router({
    // mode: 'history', // require service support
    routes: routerConfig,
  });

  return router;
};

// 为了方便外部使用，第一层、第二层的添加layout的逻辑统一由内部处理，
// 第一层 加上 FirstFloorLayout
// 第二层 加上 SecondFloorLayout
function transformRouterConfig(routeConfig, floor = 1) {
  routeConfig.forEach((item) => {
    if (!item.children) return;

    switch (floor) {
      case 1:
        item.component = FirstFloorLayout;
        transformRouterConfig(item.children, 2);
        break;
      case 2:
        item.component = SecondFloorLayout;
        // 处理到第二层就结束了，内部不会处理高于2层的layout
        break;
    }
  });
}

export default routerGenerator;
