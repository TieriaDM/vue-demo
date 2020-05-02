<template>
  <div class="tel">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    // $on 给当前实例绑定指定监听
    this.$bus.$on('on-click', mes => {
      this.message = mes
    })
  }
}
</script>
<style scoped>
.tel {
  border: 1px solid red;
}
</style>
