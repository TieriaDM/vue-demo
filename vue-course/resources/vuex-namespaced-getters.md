# getters

一般情况下的写法是：

getters.js

```javascript
const getters = {
  appNameWithVersion: (state) => { // 这里的参数state代表getters同级的state对象
    return `${state.appName}-v2.0`
  }
}
export default getters
```

state.js

```javascript
const state = {
  appName: 'myapp'
}
export default state
```

store/index.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'// 状态管理
import state from './state'
import getters from './getters' // 引入getters
import actions from './actions'
import mutations from './mutations'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters, // 挂载
  mutations,
  actions,
  modules: {
    user
  }
})
```

一般的使用方法是：

```javascript
export default {
  computed: {
    appNameWithVersion () {
      return this.$store.getters.appNameWithVersion
    }
  }
}
```



使用vuex的工具方法来获取getters的方法是：

```javascript
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([ // 根getters使用mapGetters的写法；如果子模块没有开启命名空间，则也可以这么写
      'appNameWithVersion'
    ]),
    ...mapGetters('user', [ // 模块内部getters的写法，注意根getters和模块的getters的写法可以并行共存，注意这样的情况只适合于开启了命名空间并挂载了getters的模块
      'firstLetter'
    ])
  }
}
```



或者：

```javascript
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('user') // 这里配置开启了命名空间的模块名
export default {
  computed: {
    ...mapGetters([
      'firstLetter'
    ])
  }
}
```

