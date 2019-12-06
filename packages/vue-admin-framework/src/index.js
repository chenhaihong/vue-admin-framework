import 'normalize.css';
import './style/index.less';

import Vue from 'vue';
import routerGenerator from './router';
import GroundLayout from './layout/GroundLayout.vue';

console.log(123);

const a = {
  render: function({ el, routeConfig }) {
    return new Vue({
      el,
      router: routerGenerator(routeConfig),
      render: (h) => h(GroundLayout),
    });
  },
};

export default a;
