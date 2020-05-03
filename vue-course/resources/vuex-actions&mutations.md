## mutation是同步的

mutation是同步的，因此在mutation中是不可以调用异步请求的，如果需要用到异步请求获取数据、做异步处理等操作，则需要使用action来完成。



### 一般的处理方式

对于计算属性来讲，是只包含getter，而不包含setter的；如果计算属性用到了state里的状态值，则同样直接修改state是不会成功的。

按照 `vuex` 的运行逻辑，应该触发 action，提交一个mutation 来对 state 进行修改。

举例如下：

state.js

```js
const state = {
  appName: 'myapp'
}
export default state
```

mutations.js

```js
const mutations = {
  SET_APP_NAME (state, params) {
    // 这里的state是同级别的state对象
    // params是参数，如果只有一个值，则params就是这个值，如果有多个值，则params就是对象
    state.appName = params
  }
}
export default mutations
```

在模块中：

```html
<template>
  <div>
	  <p>appname: {{ appName }}</p>
    <button @click="handleChangeAppName">修改appname</button>
  </div>
</template>
```

```js
export default {
	methods: {
    handleChangeAppName () {
      this.$store.commit('SET_APP_NAME', 'newAppName')
    }
  }
}
```

说明：

在模块中，点击按钮，会触发handleChangeAppName方法，触发 commit  SET_APP_NAME 事件，在mutations 中完成 state 的修改

当触发 commit 事件需要带多个参数时，可以这样写：

```js
export default {
	methods: {
    handleChangeAppName () {
      this.$store.commit('SET_APP_NAME', {
	      appName:'newAppName',
	      ......
      })
    }
  }
}
```

或：

```js
export default {
	methods: {
    handleChangeAppName () {
      this.$store.commit({
      	type: 'SET_APP_NAME', // commit的事件用type参数带走
	      appName:'newAppName',
	      ......
      })
    }
  }
}
```

此时的mutations.js中需要改写为：

```js
const mutations = {
  SET_APP_NAME (state, params) {
    state.appName = params.appName
    ......
  }
}
export default mutations
```



### state中没有声明属性的处理方式

对于state中没有声明的属性，则可以使用这种方式处理。

mutations.js

```js
import vue from 'vue' // 需要引入

const mutations = {
  SET_APP_VERSION (state, params) { // 可以带参数
    vue.set(state, 'appVersion', params.version) // 只有state已声明的属性才可以直接赋值修改
  }
}
export default mutations
```

模块中：

```js
export default {
	methods: {
    handleChangeAppName () {
      this.$store.commit({
        type: 'SET_APP_VERSION',
        version: 'v2.1'
      })
    }
  }
}
```



### 工具方法

```js
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations([ // 根模块或未开启命名空间的子模块的写法
      'SET_APP_NAME',
    ]),
    ...mapMutations('user', [ // 开启命名空间子模块mutation的写法
      'SET_FUCK_USER_NAME',
    ]),
    handleChangeAppName () {
      this.SET_APP_NAME('newAppName') // 如果mutation是用对象赋值，这里也传对象即可
    },
    handleChangeUserName () {
      this.SET_FUCK_USER_NAME('wangwu')
    }
  }
}
```

子模块内mutation的写法与根模块的一致

```js
const mutations = {
  SET_FUCK_USER_NAME (state, params) {
    state.userName = params
  }
}
```







# actions

actions一般用来处理异步操作，如数据请求等，因此这里用Promise来模拟，在正式场合需要用数据请求等来处理

api.js

```js
export const getAppName = () => {
  return new Promise((resolve, reject) => {
    const err = null
    setTimeout(() => {
      if (!err) resolve({ code: 200, info: { appName: 'veryNewAppName' }})
      else reject(err)
    })
  })
}
```

actions.js

```js
import { getAppName } from '@/api/app'

const actions = {
  // updateAppName ({ commit }) {
  //   getAppName().then(res => { // ES6 一般promise的写法
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
```



在模块中

```js
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([ // 如果是开启了命名空间的模块，需要在这里加入模块名
      'updateAppName'
    ]),
    handleChangeAppName () {
      this.updateAppName()
    }
  }
}
```

