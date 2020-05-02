<template>
  <div class="home">
    <b>{{ food }}</b>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转指定页</button>
    <button @click="handleClick('replace')">替换指定页</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  props: {
    food: {
      type: String,
      default: 'yuki'
    }
  },
  methods: {
    handleClick (type) {
      if (type == 'back') {
        // $router指的是vue实例中绑定的router
        // go方法的参数代表如何翻页，其中正数代表下*页，负数代表上*页
        this.$router.go(-1);
        // 向前翻页还可以这样操作
        // this.$router.back();
      } else if (type == 'push') {
        // push的参数可以传router.js中组件的path、alias、name字段的值，或者用ES6的模板语法写
        // this.$router.push('/parent');
        this.$router.push({
          name: 'argu',
          params: {
            // 注意params和query的区别：
            // params http://localhost:8080/#/argu/lisi
            // query http://localhost:8080/#/about?name=lisi
            name: 'lisi'
          }
        });
      } else if (type == 'replace') {
        // replace的传参方式与push一样
        // 注意replace与push的区别，push是在当前浏览记录中增加一条，而replace是将当前的浏览页面替换为指定页面
        this.$router.push({
          name: 'About',
          query: { // 参数
            name: 'lisi'
          }
        });
      }
    }
  }
}
</script>
