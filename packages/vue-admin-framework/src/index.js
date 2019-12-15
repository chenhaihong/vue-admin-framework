import 'normalize.css'
import './style/index.less'

import Vue from 'vue'
import { makeRouter } from './router'
import { makeStore } from './store'
import GroundLayout from './layout/GroundLayout'

import globalData from './helper/globalData'
import registerComponents from './helper/registerComponents'

export default {
  render: function({ el, routeConfig = {}, storeConfig = {}, slots = {} }) {
    globalData.set('routeConfig', routeConfig)
    globalData.set('storeConfig', storeConfig)

    registerComponents(slots)

    return new Vue({
      el,
      router: makeRouter(routeConfig),
      store: makeStore(storeConfig),
      render: (h) => h(GroundLayout)
    })
  }
}
