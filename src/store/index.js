import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    },
  // 存放子集状态管理的模块
    modules: {
        city: city
        // 或者直接city 键值同名
  }
})
