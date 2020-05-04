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
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  methods:{
    //退出
    logout(){
      //确认框
       this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        //点击确定的时候=>走then
        .then(() => {
          //清除token
          localStorage.removeItem('token')
          //提示
          this.$message({
            type: 'success',
            message: '退出成功!',
            duration:800
          });
          //跳转到login页
          this.$router.push('/login')
        })
        //点击取消的时候 =>catch
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出',
            duration:800
          });          
        });
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
