<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/logo.png" />
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="col_r">
          恭喜上海前端37期年薪40万
          <a @click.prevent="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- el-menu :菜单组件
          -default-active="2"默认选中 默认高亮（index:2）
          -@open= "handleOpen"
          -@close="handleClose"
          el-submenu 菜单子组件（可展开）
          el-menu-item 菜单元素（最小单位）
          el-menu-item-group分组
        -->
        <el-menu
          :router="true"
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户管理 -->
          <!-- :index="item.id" 点击哪个展开哪个 -->
          <el-submenu :index="item.id+''" v-for="item in menus" :key="item.id">
            <!-- 标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 菜单元素 -->
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="'/'+item1.path"
            >{{item1.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子组件的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.loadMenusData();
  },
  methods: {
    //退出
    async logout() {
      //确认框
      try {
        const p = await this.$confirm("此操作将退出该账户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        //清除token
        localStorage.removeItem("token");
        //提示
        this.$message({
          type: "success",
          message: "退出成功!",
          duration: 800
        });
        //跳转到login页
        this.$router.push("/login");
      } catch (error) {
        this.$message({
          type: "info",
          message: "取消退出",
          duration: 800
        });
      }

      // //点击确定的时候=>走then
      // .then(() => {
      //   //清除token
      //   localStorage.removeItem("token");
      //   //提示
      //   this.$message({
      //     type: "success",
      //     message: "退出成功!",
      //     duration: 800
      //   });
      //   //跳转到login页
      //   this.$router.push("/login");
      // })
      // //点击取消的时候 =>catch
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "取消退出",
      //     duration: 800
      //   });
      // });
    },
    // 加载菜单
    async loadMenusData() {
      let res = await this.$axios.get("menus");
      console.log(res);
      this.menus = res.data.data;
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background: #b3c1cd;
  padding: 0;
}
h1 {
  color: #fff;
  font-size: 26px;
  line-height: 60px;
  text-align: center;
}
.el-aside {
  background: #545c64;
}
.el-main {
  background: #eaeef1;
}
.col_r {
  text-align: right;
  line-height: 60px;
  padding-right: 30px;
}
.col_r a {
  color: green;
}
</style>
