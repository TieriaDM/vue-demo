<template>
  <div>
    <!-- $route 当前加载的路由对象，其包含一个params对象，params对象中包含一个名为name的值 -->
    <!-- {{ $route.params.name }} -->
    <!-- 这里必须搭配props使用，并且在router中设置props: true -->
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'lisi'
    }
  }
}
</script>
