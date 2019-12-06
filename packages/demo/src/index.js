import 'vue-admin-framework/build/index.css';
import './index.less';

import framework from 'vue-admin-framework/build/index.umd';
import routeConfig from './router';
import storeConfig from './store';

console.log(framework, routeConfig, storeConfig);

// framework.render({
//   el: '#app',
//   routeConfig,
//   storeConfig,
// });
