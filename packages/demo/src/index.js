import 'vue-admin-framework/build/index.css';
import './index.less';

import framework from 'vue-admin-framework/build/index.umd';
import routeConfig from './router';
import storeConfig from './store';

framework.render({
  el: '#app',
  routeConfig,
  storeConfig,
});
