import './index.less';

import Vue from 'vue';
import routerGenerator from './router';
import GroundLayout from './layout/GroundLayout.vue';

export default {
  render: function({ el, routeConfig }) {
    return new Vue({
      el,
      router: routerGenerator(routeConfig),
      render: (h) => h(GroundLayout),
    });
  },
};
