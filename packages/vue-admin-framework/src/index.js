import 'normalize.css';
import './style/index.less';

import Vue from 'vue';
import routerGenerator from './router';
import GroundLayout from './layout/GroundLayout';

export default {
  render: function({ el, routeConfig, slots = {} }) {
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
