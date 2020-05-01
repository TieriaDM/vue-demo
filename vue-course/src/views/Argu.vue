<template>
  <div>
    <!-- $route 当前加载的路由对象，其包含一个params对象，params对象中包含一个名为name的值 -->
    {{ $route.params.name }}
  </div>
</template>

<script>
export default {

}
</script>
