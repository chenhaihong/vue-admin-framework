import 'vue-admin-framework/build/index.css';
import './index.less';

import vaf from 'vue-admin-framework/build/index.umd';
import routeConfig from './router';
import storeConfig from './store';

// import NavbarRight from './components/NavbarRight.vue';

const createdComponent = vaf.render({
  el: '#app',
  routeConfig,
  storeConfig,
  slots: {
    // navBarRight: NavbarRight,
    navBarRight: () => import('./components/NavbarRight.vue'),
  },
});
