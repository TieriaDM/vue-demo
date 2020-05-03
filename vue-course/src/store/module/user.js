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

}

export default {
  namespaced: true, // 启用了命名空间
  getters, // 上面增加了getters之后要记得挂载，否则会报unknown getter错误
  state,
  mutations,
  actions
}
