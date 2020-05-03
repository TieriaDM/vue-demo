## vuex 双向绑定

对于全局state属性来说，用 v-model 是十分危险的，因为这种类型的值不能通过赋值方式直接进行修改，而需要 commit mutation 来进行处理。因此 v-model 的修饰符通常用双向绑定的方式来处理全局 state 。



### 一般写法

state.js

```js
const state = {
  appName: 'myapp',
  stateValue: 'abc' // 新增全局state属性
}
export default state
```

mutations.js

```js
const mutations = {
  SET_STATE_VALUE (state, params) {
    state.stateValue = params
  }
}
export default mutations
```

组件内：

```html
<template>
  <div>
    <!-- 绑定值value到stateValue，注册输入事件 -->
    <a-input :value="stateValue" @subInput="handleStateValueChange" />
    <p>{{ stateValue }} -> last letter is {{inputValueLastLetter}}</p>
  </div>
</template>
```

逻辑部分

```js
export default {
  computed: {
    ...mapState({
      stateValue: state => state.stateValue
    }),
  methods: {
    ...mapMutations([
      'SET_STATE_VALUE'
    ]),
    handleStateValueChange (value) {
      this.$store.commit('SET_STATE_VALUE', value)
    }
  }
}
```





