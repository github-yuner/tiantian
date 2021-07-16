import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
    routes: [
        movieRouter,
        cinemaRouter,
        mineRouter,
        {
            path: '/*',
            redirect: '/movie'
            // 重定向到movie页面
            
        }
  ]
})

export default router
