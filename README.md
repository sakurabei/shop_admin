# shop_admin

> A Vue.js project

# 添加用户

1. 弹出对话框 ok
2. 绑定表单数据
3. 点击确定，发送请求，添加用户
   > 添加之后处理

- 1. 关闭对话框
- 2. 刷新页面
- 3. 提示成功
- 4. 充值表单

# 假如有个需求，只要关闭对话框，就要重置表单

> 监听对话框的关闭
> 事件 closed 对话框关闭了，会自动调用

```js
// 添加closed事件
@closed="dialogClosed"
// 监听对话框关闭
dialogClosed(){
  // console.log('对话框关闭了')
  this.$refs.addUserForm.resetFileds()
}
```

# 删除用户

1. 注册事件 =>弹出确认框
2. 自定义列 传递数据

- @click ="delUser(scope.row.id)"
- delUser(id){用 id}

3. 发送请求删除用户

- 格式：axios.delete(url,config)

# 插槽

# 修改状态

1. 绑定当前用户自己的状态 v-model='scope.row.mg_state'
2. 注册 change 事件，传递当前对象
   @change='stateChange(scope.row)'

3. stateChange(row){
   const {id mg_state:mgState}=row;
   }

4. 格式：axios.put(url,data,config)

# 总结格式（注意一下）

- axios.get(url,config) config={params,headers}
- axios.delete(url,config)

- axios.post(url,data,config)
- axios.put(url,data,config)

# axios 的三个问题

- 问题 1.每次都要添加基准路径
  > 在 main.js 配置一下

```js
axios.defaults.baseURL = "https://api.example.com";
```

- 问题 2.每个组件页面都要引入 axios

  > main.js
  > 给 vue 的原型加：Vue.prototype.\$axios = axios
  > 所有的 vue 实例都可以使用，组件本质就是 vue 实例 this.\$axios

- 问题 3. 每次请求都要携带 token
  > 使用 请求拦截器，每次发送请求都要经过这个拦截器，我们就不要每次写代码的时候，自己写 token
  > 让拦截器帮我们去添加这个 token

```js
// 3.解决每次请求都需要呆着token值
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.getItem("token");
    // config.headers.Authorization = localStorage.getItem('token')
    console.log("修改了");
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
```
