const state = {
  userName: 'lisi'
}

const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}

const mutations = {
  SET_FUCK_USER_NAME (state, params) {
    state.userName = params
  }
}

const actions = {
  updateUserName ({ commit, state, rootState, dispatch}) {
    // commit：用来提交mutation
    // state：当前实例的state
    // rootState：根实例的state
    // dispatch：用来提交action
  }
}

export default {
  namespaced: true, // 启用了命名空间
  getters, // 上面增加了getters之后要记得挂载，否则会报unknown getter错误
  state,
  mutations,
  actions,
  modules: { // 子模块也可以包含子模块

  }
}
