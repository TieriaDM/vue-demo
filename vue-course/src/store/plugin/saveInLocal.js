const saveInLocal = store => {
  //
  if (localStorage.state) {
    // json串转换成对象，替换store实例里的state
    store.replaceState(JSON.parse(localStorage.state))
  }
  store.subscribe((mutation, state) => {
    // state转换成json串，保存到本地
    localStorage.state = JSON.stringify(state)
  })
}

export default saveInLocal
