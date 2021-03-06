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

# 角色列表（右边）

1. 弹出对话框

- 参考 ： Tree 树形组件 ->默认展开和默认选中

2. 展示 所有的权限信息

```js
defaultProps: {
    // children 负责显示结构
    children: 'children',
    // label : 负责显示标题
    label: 'authName'
  }
```

3. 展示当前拥有的权限信息
4. 发送后台

```js
> 参数1： roleId（角色id） 参数2：rids(权限信息的id)
> roleId: 点击弹窗的时候，传row 的id 保存起来了
> rids => 获取当前选中的权限（√）+获取当前半选中的权限（-）

```

# pid

{
name :'上海市',
id : 1,
pid :0
children :[
{
id : 2
pid : 1,
name :'静安区',
children : [
{
id :4,
pid :'1,2'
name :'静安寺'
}
]
},
{
id : 3,
pid : 1
name :'浦东新区'
}
]
}

# 分配角色

1. 弹出对话框 ok
2. 展示所有的角色信息
   > el-option
   > label:负责展示的 :label='item.roleName'
   > value: 负责收集数据：value ='item.id'
3. 展示当前的角色信息
   > 1. 传 row 过来 获取三个参数，但是只有两个参数 id 和 username,用 id 再次获取信息得到 rid
   > 2. 把 id ueername rid 都赋值给 assignRoleForm
   > 3. 稍微处理一下 rid = -1
4. 发送请求

```js
// 分配角色
    async assignRole() {
      // 获取需要的参数
      let { id, rid } = this.assignRoleForm;
      // 请求
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      });
      // console.log(res);
      if (res.data.meta.status === 200) {
        // 1.关闭对话框
        this.dialogAssignRoleVisible = false;
        // 2. 提示
        this.$message({
          message: "分配角色成功",
          type: "success",
          duration: 800
        });
        // 3. 刷新
        this.loadUsersData(this.pagenum);
      }
    }
```

# 左侧栏

> 动态动态获取权限菜单

> 1. 发送请求获取权限数据
> 2. 两层 v-for
> 3. 一点开，全部都开了
>    el-submenu => index => 不能唯一
>    <el-submenu :index="item.id+''">
>    el-menu-item 里的 index 作为 path 参与跳转
>    <el-menu-item :indx="'/'+item1.path">

> 5. 刷新可以获取 url 中哈希值里的路径
>    :default-active ="\$route.path"=>/users

# 保留页数

> 思路： 我们可以把页面保存到 url 路径里面，以后直接获取就知道第几页了
> 上 => 下

1. path:'/users/:page?'
2. 获取 page 发送请求
   const page = this.\$route.params.page
   this.loadUsersData(page)
3. 已经做好的
   this.pagenum = res.data.data.pagenum

> 下=> 上

1.  点击页码
    this.\$router.push('/users/'+curPage)

>

# 商品分类 => 树结构

> 参考：https://github.com/foolishchow/element-tree-grid

- 安装 ： npm install element-tree-grid --save
- 引入

```js
import ElTreeGrid from "element-tree-grid";
Vue.component(ElTreeGrid.name, ElTreeGrid);
```

- 拷贝列 + 合并列
  el-table-tree-column

- 几个属性
- treeKey => 父节点 找子节点 tree-key='cat_id'
- parentKey => 子节点找父节点 parent-key = "cat_pid"

- levelKey => 按照登记进行缩进 level-key='cat_level'
- indentSize => 缩进:indent-size='20'

# 添加商品分类

1. 弹出对话框
2. 显示父级名称列表
   > 2.1 先准备级联选择器组件 + options 数据拷贝过来
   > 2.2 获取二层的分类数据 type:2
   > 2.3 把数据赋值给 options
   > this.options = res.data.data
   > 2.4 只有结构，没有显示标题，对不上号

- :props='defaultProps'
- defaultProps:{
  value:'cat_id',
  label:'cat_name'
  }

> 2.5 addCatForm =>{

    cat_name,
    cat_pid_arr

}

3. 发送请求
   > const { cat_name,cat_pid_arr}= this.addCatForm
   > 请求的三个参数
   > cat_name 直接用
   > cat_pid: 数组的最后一个元素（父 id）
   > at_level 数组的长度

# 商品列表

> 1. 创建商品组件
> 2. 四个步骤

# 添加商品

1. 步骤条

- :index ='activeIndex'
- activeIndex :?

2. 标签页

- 每个 tab 元素加 name
- tabs => v-model = 'activeName'
- 控制 activeName 就可以控制 tabs 的切换

3. 让标签页和步骤条关联起来

   > 点击标签页 => 控制步骤条
   > 3.1 tabs 注册一个时间 <el-tabs @tab-click ="clickTab">
   > 3.2 clickTab(tab){
   > // tab.index 0=> 开始
   > this.activeIndex = +tab.index +1
   > }

4. 处理下一步

- 基本信息的下一步 next(2,'two')
- 商品图片的下一步 next（3，'three'）
- next(index,name){
  this.activeIndex = index
  this.activeName = name
  }

5. 四个文本输入框+级联选择器
   > 展示 + 获取数据 + 配置项（value，label）

> 单选框

 <!-- label 是收集数据 -->

    <el-radio v-model="addGoodsForm.radio" :label="true">是</el-radio>
    <el-radio v-model="addGoodsForm.radio" :label="false">否</el-radio>

# 商品图片

1. 拷贝 => el-upload
2. 处理 actions ='基准路径 + upload'
3. 处理 请求头:headers='headers'
4. 上传成功回调 :on-success = 'uploadImgSuccess'
   uploadImgSuccess(res){

}

5. 添加到数组里

```js
this.addGoodsForm.pics.push({
  pic: res.data.tmp_path
});
```

# 富文本编辑器

> 参考 https://github.com/surmon-china/vue-quill-editor

- 安装 :`npm install vue-quill-editor --save`
- 引入 main.js

```js
// 引入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor /* { default global options } */);
```

- 使用 => SPA => 双向按数据绑定

```html
<quill-editor
  v-model="content"
  ref="myQuillEditor"
  :options="editorOption"
  @blur="onEditorBlur($event)"
  @focus="onEditorFocus($event)"
  @ready="onEditorReady($event)"
>
</quill-editor>
```

# scoped

> scoped

- 作用：添加 scoped 之后，当前组件内的样式只对当前组件起效果
  > 不良反应 ： HTML ，body => 不起效果的
  > 不良反应： 动态添加的不起效果的
  > innerHtml => v-html

> 解决办法：

- 方式一：在 less 里面添加一个 style 标签

```js
<style>

.ql-container {
  height: 400px;
  background: pink;
}

.red {
  color: red;
}
</style>

```

- 方式 2: 穿透/deep/

  > 父元素/deep/子元素

- 方式 3：穿透 >>> (不支持 less)
  格式 : 父元素>>> 子元素
