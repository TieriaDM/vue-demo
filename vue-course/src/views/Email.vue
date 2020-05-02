<template>
  <div class="email">
    <button @click="handleClick">按我</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      // $emit 是发射当前实例上的指定事件
      this.$bus.$emit('on-click', 'hello')
    }
  },
  mounted () {
    console.log(this.$bus)
  }
}
/**
 * 不同组件间的传值bus
 * 1.传值的逻辑是先创建一个vue实例bus，并注册到全局
 * 2.在合适时机，组件a使用bus发射事件b和参数
 * 3.组件c监听bus的事件b，并获取参数，完成传值
**/
</script>
<style scoped>
.email {
  border: 1px solid green;
}
</style>
