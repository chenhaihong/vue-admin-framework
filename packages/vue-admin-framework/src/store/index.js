import Vue from 'vue';
import Vuex from 'vuex';

import setting from './modules/setting';

Vue.use(Vuex);

let _store;

export function makeStore(storeConfig = {}) {
  if (storeConfig.modules) {
    storeConfig.modules.setting = setting;
  }
  return new Vuex.Store(storeConfig);
}

export function getStore() {
  return _store;
}
