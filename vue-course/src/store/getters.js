const getters = {
  appNameWithVersion: (state) => { // 这里的参数state代表getters同级的state对象
    return `${state.appName}-v2.0`
  }
}
export default getters
