
<template>
  <div>
    <el-table :data="usersData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="clickCurrentPage"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
      :current-page="pagenum"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      // 用户列表数据
      usersData: [],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1
    };
  },
  created() {
    // 加载用户列表数据
    this.loadUsersData();
  },
  methods: {
    loadUsersData(pagenum = 1) {
      axios
        .get("http://localhost:8888/api/private/v1/users", {
          params: {
            query: "",
            pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          // 保存列表数据
          this.usersData = res.data.data.users;
          // 保存 用户总个数
          this.total = res.data.data.total;
          // 保存当前页码
          this.pagenum = res.data.data.pagenum;
        });
    },
    // 点击页码
    clickCurrentPage(curPage) {
      console.log(curPage);
      // 传递参数 加载click页的内容
      this.loadUsersData(curPage);
    }
  }
};
</script>

<style>
</style>
