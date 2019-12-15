import Vue from 'vue'
import Vuex from 'vuex'

import layout from './modules/layout'

Vue.use(Vuex)

let _store

export function makeStore(storeConfig = {}) {
  if (!storeConfig.modules) {
    storeConfig.modules = {}
  }
  storeConfig.modules.VafLayout = layout

  _store = new Vuex.Store(storeConfig)
  return _store
}

export function getStore() {
  return _store
}
