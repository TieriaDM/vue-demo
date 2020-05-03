# 插件

vuex是支持插件的

如写一个能缓存state到本地的插件，避免页面被刷新时，state数据被清除的情况

插件saveInLocal.js

```js
const saveInLocal = store => {
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
```

引入插件并挂载

store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'// 状态管理
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import user from './module/user'
import saveInLocal from './plugin/saveInLocal'  // 引入插件

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  plugins: [ saveInLocal ] // 挂载插件
})

```

