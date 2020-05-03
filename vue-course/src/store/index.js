import Vue from 'vue'
import Vuex from 'vuex'// 状态管理
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  }
})
