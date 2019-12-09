import 'vue-admin-framework/build/index.css';
import './index.less';

import Vue from 'vue';
import vaf from 'vue-admin-framework/build/index.umd';
// import ELEMENT from 'element-ui';
import routeConfig from './router';
import storeConfig from './store';

// ELEMENT.locale(ELEMENT.lang.zhCN);
// Vue.use(ELEMENT);

vaf.render({
  el: '#app',
  routeConfig,
  storeConfig,
  slots: {
    // navBarRight: NavbarRight,
    navBarRight: () => import('./components/NavbarRight.vue'),
  },
});
