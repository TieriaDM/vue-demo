<template>
  <div>
    <!-- 绑定子组件的value属性到inputValue上，并且注册input事件，接收子组件发射的消息 -->
    <a-input :value="inputValue" @subInput="handleSubInput" />
    <p>{{ inputValue }}</p>
    <!-- 对content属性绑定inputValue的值 -->
    <a-show :content="inputValue" />
    <p>appname: {{ appName }}</p>
    <p>username: {{ userName }}</p>
  </div>
</template>

<script>
import AInput from '_c/AInput'
import AShow from '_c/AShow'
// import { mapState } from 'vuex' // 没有使用命名空间时可以这样使用
import { createNamespacedHelpers } from 'vuex' // 开启了命名空间时使用
const { mapState } = createNamespacedHelpers('user')
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
  computed: { // 计算型属性
    appName () {
      return this.$store.state.appName // 根节点的state
    },
    // userName () {
    //   return this.$store.state.user.userName // 注意模块里面的要带模块名
    // }

    // ...mapState({ // 这种写法等同于上面注释部分的写法，未使用命名空间时使用
    //   appName: state => state.appName, // state代表根节点的state
    //   userName: state => state.user.userName
    // })

    ...mapState({ // 开启了命名空间
      userName: state => state.userName // 开启了命名空间就不用写模块名称了
    })
  },
  methods: {
    // 实现handleInput方法
    handleSubInput (value) {
      this.inputValue = value
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
