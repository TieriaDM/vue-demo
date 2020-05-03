<template>
  <div>
    <!-- 绑定子组件的value属性到inputValue上，并且注册input事件，接收子组件发射的消息 -->
    <a-input :value="inputValue" @subInput="handleSubInput" />
    <p>{{ inputValue }} -> last letter is {{inputValueLastLetter}}</p>
    <!-- 对content属性绑定inputValue的值 -->
    <a-show :content="inputValue" />
    <p>appname: {{ appName }}</p>
    <p>username: {{ userName }}, first letter is {{ firstLetter }}</p>
    <p>appNameWithVersion: {{ appNameWithVersion }}</p>
    <button @click="handleChangeAppName('mutations')">mutations修改appname</button>
    <button @click="handleChangeAppName('actions')">actions修改appname</button>
    <p><b>{{ appVersion }}</b></p>
    <button @click="handleChangeUserName">修改用户名</button>
  </div>
</template>

<script>
import AInput from '_c/AInput'
import AShow from '_c/AShow'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex' // 没有使用命名空间时可以这样使用
// import { createNamespacedHelpers } from 'vuex' // 开启了命名空间时使用
// const { mapState } = createNamespacedHelpers('user')
export default {
  name: 'store',
  data() {
    return {
      inputValue: ''
    }
  },
  components: {
    AInput, AShow
  },
  computed: { // 计算型属性，只有getter，没有setter的
    // appName () {
    //   return this.$store.state.appName // 根节点的state
    // },
    // userName () {
    //   return this.$store.state.user.userName // 注意模块里面的要带模块名
    // }

    ...mapState({ // 这种写法等同于上面注释部分的写法，未使用命名空间时使用
      appName: state => state.appName, // state代表根节点的state
      // userName: state => state.user.userName
      appVersion: state => state.appVersion
    }),

    ...mapState('user', { // 开启了命名空间
      userName: state => state.userName // 开启了命名空间就不用写模块名称了
    }),
    inputValueLastLetter () {
      return this.inputValue.substr(-1, 1)
    },
    // appNameWithVersion () { // 获取getters的常规写法
    //   return this.$store.getters.appNameWithVersion
    // },
    ...mapGetters([ // 根getters使用mapGetters的写法
      'appNameWithVersion'
    ]),
    ...mapGetters('user', [ // 模块内部getters的写法
      'firstLetter'
    ])
  },
  methods: {
    ...mapMutations([ // 根模块或未开启命名空间的子模块的写法
      'SET_APP_NAME',
    ]),
    ...mapMutations('user', [ // 开启命名空间子模块mutation的写法
      'SET_FUCK_USER_NAME',
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    // 实现handleInput方法
    handleSubInput (value) {
      this.inputValue = value
    },
    handleChangeAppName (type) {
      if (type === 'mutations') {
    //   this.$store.commit('SET_APP_NAME', 'newAppName')  // 两个参数的写法
        this.SET_APP_NAME('newAppName') // 一个参数的写法
        this.$store.commit({
          type: 'SET_APP_VERSION',
          version: 'v2.1'
        })
      } else if (type === 'actions') {
        this.updateAppName()
        // 如果不用mapActions，则写法是这样的，参数与mutation的用法一样
        this.$store.dispatch('updateAppName', '123')
      }
    },
    handleChangeUserName () {
      this.SET_FUCK_USER_NAME('wangwu')
    }
  }
}
/**
 * 子组件->父组件传值的方式：
 * 1.定义父子组件
 * 2.在子组件中绑定事件a和属性b，并在a中发射指定的事件c，并带上数据d
 * 3.在父组件中导入子组件，并在components字段注册，
 * 4.在父组件中绑定事件c，并实现相应的方法，在方法中即可拿到数据d
**/
/**
 * 兄弟组件的传值方法
 * 1-4.与子组件->父组件传值方式相同
 * 5.在父组件中将数据d传递给子组件兄弟组件的绑定属性e，即完成
 * **/
</script>
