// 路由列表
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/', // url路径
    alias: '/home_page', // 别名
    name: 'Home', // 命名
    component: Home // vue组件
  },
  { // 命名路由
    path: '/about',
    name: 'About', // 关键是有name字段，在组件中用如下对象方式使用<router-link :to="{name: 'About'}">About</router-link>
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  { // 动态路由
    path: '/argu/:name', // :name指动态路由参数，匹配/argu/后面的参数
    name: 'argu',
    component: () => import('@/views/Argu.vue'), // 箭头函数表示懒加载
    props: true // 路由传参的布尔模式，适合动态路由中有匹配参数的配置；true表示使用router的params作为组件属性，path中匹配了name属性，就会传入到组件的props的name属性中并显示
  },
  { // 嵌套组件
    path: '/parent',
    component: () => import('@/views/Parent.vue'),
    children: [
      {
        path: 'child', // 注意子组件path不需要带/，会自动补全
        component: () => import('@/views/Child.vue')
      }
    ]
  },
  { // 命名视图
    path: '/named_view',
    components: { // 注意这里是带s的
      default: () => import('@/views/Child.vue'),
      email: () => import('@/views/Email.vue'),
      tel: () => import('@/views/Tel.vue')
      // <router-view/> default对于这个没有name字段的
      // <router-view name="email"/> 这里由name字段对应的映射
      // <router-view name="tel"/>
    }
  },
  { // 重定向
    path: '/main',
    redirect: {
      name: 'About' // redirect可以指定路径、命名路由或者方法(方法看下面注释内容)
    }
    // redirect: to => {  // 注意这里的两种return方式的写法
    //   // return {
    //   //   name: 'About'
    //   // }
    //   // return '/'
    // }
  }
]

export default routes
