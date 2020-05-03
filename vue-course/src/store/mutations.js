import vue from 'vue'

const mutations = {
  SET_APP_NAME (state, params) {
    // 这里的state是同级别的state对象
    // params是参数，如果只有一个值，则params就是这个值，如果有多个值，则params就是对象
    state.appName = params
  },
  SET_APP_VERSION (state, params) {
    vue.set(state, 'appVersion', params.version)
  }
}
export default mutations
