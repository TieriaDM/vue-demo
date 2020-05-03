import Vue from 'vue'
import Vuex from 'vuex'// 状态管理
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import user from './module/user'
import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development', // 严格模式，如果用赋值形式在组件内对state进行修改会报错
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  // plugins: [ saveInLocal ] // 插件
})
