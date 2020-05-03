import { getAppName } from '@/api/app'

const actions = {
  // updateAppName ({ commit }) {
  //   getAppName().then(res => { // 一般promise的写法
  //     console.log(res)
  //     commit('SET_APP_NAME', res.info.appName)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  async updateAppName ({ commit }) { // ES8 async/await写法
    try {
      const { info: { appName }} = await getAppName()
      commit('SET_APP_NAME', appName)
    } catch (error) {
      // 处理错误及异常
      console.log(error)
    }
  }
}
export default actions
