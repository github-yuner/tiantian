import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios; // 将axios挂载在Vue实例的原型对象上

Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);
    // 过滤器 使用后面的参数替换匹配到的前面的参数 全局的
})

Vue.config.productionTip = false;

import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller);
// 注册全局组件 注册完后直接就可以在其他组件使用 不用再引入

import Loading from '@/components/Loading'
Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
