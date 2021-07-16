import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios // 将axios挂载在Vue实例的原型对象上
Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);
    // 过滤器 使用后面的参数替换匹配到的前面的参数 全局的
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
