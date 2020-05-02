import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 默认是hash模式，并且不需要写，正式环境是history模式，并且需要后端支持
  routes: routes
})

export default router
