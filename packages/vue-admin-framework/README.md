# `vue-admin-framework`

基于 vue@v2、vue-router、vuex 的后台框架包。

## Usage

```javascript
import 'vue-admin-framework/build/index.css';
import './index.less';

import vaf from 'vue-admin-framework';
import routeConfig from './router';
import storeConfig from './store';

vaf.render(
  {
    el: '#app',
    routeConfig,
    storeConfig,
  },
  function() {
    console.log('finished');
  }
);
```
