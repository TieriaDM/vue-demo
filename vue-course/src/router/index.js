import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history', // 默认是hash模式，并且不需要写，正式环境是history模式，并且需要后端支持
  routes: routes
})

const HAS_LOGINED = true // 模拟登录状态
// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // to即将去往的页面, from即将离开的页面, next函数，用来跳转
  if (to.name !== 'login') {
    if (HAS_LOGINED) next()
    else next({ name: 'login' })
  } else {
    if (HAS_LOGINED) next({ name: 'Home' })
    else next()
  }
})

router.beforeResolve((to, from, next) => {
  next()
})

// 后置钩子
router.afterEach((to, from) => {
  // 跳转完成后的操作
})

/** 导航解析流程
 * 1.导航被触发
 * 2.在失活组件（即将离开的页面组件）里调用守卫 beforeRouteLeave
 * 3.调用全局的前置守卫 beforeEach
 * 4.在重用的组件里调用 beforeRouteUpdate
 * 5.调用路由独享的守卫 beforeEnter
 * 6.解析异步路由组件
 * 7.在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8.调用全局的解析守卫 beforeResolve
 * 9.导航被确认
 * 10.调用全局的后置守卫 afterEach
 * 11.触发DOM更新
 * 12.用创建好的实例调用 beforeRouteEnter守卫里的 next 回调函数
 * **/

export default router
