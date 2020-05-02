<template>
  <!-- @input表示注册input事件到指定方法，并且绑定input的value值到组件的aValue字段上 -->
  <input @input="handleInput" />
</template>
<script>
export default {
  name: 'AInput',
  methods: {
    handleInput (event) {
      const value = event.target.value
      // vue实例发射input事件消息，并传值value
      this.$emit('subInput', value)
    }
  }
}
</script>
