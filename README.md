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

# token 过期了怎么处理？？？

 <!-- 相应拦截 -->

- 方式 1：我们和后台约定好，100010（过期），过期了怎么办？跳转到登录页

```js
// 方式1：
if (response.data.meta.status === 100010) {
  // 跳转 过登录页
  this.$router.push("/login");
}
```

- 方式 2： 和后台约定好，7 天过期（六天的时候），返回给我们一个 token 字段
  > 返回给我们的 token 是最新的，把本地旧的替换掉
  ```js
  if (response.data.data.token) {
    localStorage.setItem("token", token);
  }
  ```

# 编辑用户

1. 弹出对话框 ok
2. 展示已知信息
   > 点击编辑小图标的时候，获取当前行的对象=>通过方法传递=>赋值给 editUserForm（表单绑定过的）
3. 发送请求

# 权限列表

1. 表格展示
2. 请求权限数据
3. 处理等级

```js
<template slot-scope="scope">
  <span v-if="scope.row.level == 0">一级</span>
  <span v-else-if="scope.row.level==1">二级</span>
  <span v-else>三级</span>
</template>
```

4. 处理索引
   > 添加 type 属性 值:index 索引号就有了 从 1 开始的

- <el-table-column type='index' :index='indexMethod'></el-table-column>

- indexMethod( index ) { // index 就是从 0 开始的
  return index
  }

# 角色列表

1. 表格基本 展示
2. 发送请求获取角色数据
3. 赋值之后，有个小问题，降低成本

element
`npm i element-ui@2.4.11`

4. 索引

# 抽离三个部分

# 用户 - 角色 - 权限 三者之间的关系

    <=2=     <=1=

张三 主管 商品管理/订单管理/商品 列表

> 接下来要做的是 给`用户分配权限`

# 角色列表（左边）- 展示权限信息

1. 展开行功能

```js
<el-table-column type="expand">
  <template slot-scope="scope">
    <p>哈哈</p>
  </template>
</el-table-column>
```

2. 三层 代码 01

```html
<template slot-scope="scope">
  <!-- 第一层 -->
  <el-row v-for="item1 in scope.row.children" :key="item1.id">
    <el-col :span="4">{{ item1.authName }}</el-col>
    <el-col :span="20">
      <!-- 第二层  -->
      <el-row v-for="item2 in item1.children" :key="item2.id">
        <el-col :span="4">{{ item2.authName }}</el-col>
        <el-col :span="20">
          <!-- 第三层 -->
          <span v-for="item3 in item2.children" :key="item3.id"
            >{{ item3.authName }}</span
          >
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
```
