通常情况下的写法是写成计算属性，在 `computed` 里写：

```javascript
appName () {
	return this.$store.state.appName // 根节点的state
},
userName () {
	return this.$store.state.user.userName // 注意模块里面的要带模块名
}
```



没有开启命名空间的情况下：

```javascript
import { mapState } from 'vuex'

...mapState({
	appName: state => state.appName, // state代表根节点的state
	userName: state => state.user.userName
})
```



开启了命名空间的情况下：

```javascript
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user') // 这里配置开启了命名空间的模块名

...mapState({
	userName: state => state.userName // 这里就不用写模块名称了
})
```

或者

```javascript
import { mapState } from 'vuex'

...mapState('user', {
	userName: state => state.userName // 这里就不用写模块名称了
})
```









