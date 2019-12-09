import './style/index.less';

import Vue from 'vue';
import routerGenerator from './router';
import GroundLayout from './layout/GroundLayout';

import globalData from './helper/globalData';

export default {
  render: function({ el, routeConfig, storeConfig, slots = {} }) {
    globalData.set('routeConfig', routeConfig);
    globalData.set('storeConfig', storeConfig);

    const { navBarRight } = slots;
    Vue.component('NavBarRight', navBarRight || null);

    return new Vue({
      el,
      router: routerGenerator(routeConfig),
      // store,
      render: (h) => h(GroundLayout),
    });
  },
};
