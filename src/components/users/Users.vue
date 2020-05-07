
<template>
  <el-table :data="usersData" style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column label="用户状态"></el-table-column>
    <el-table-column label="操作"></el-table-column>
  </el-table>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      usersData: []
    };
  },
  created() {
    // 加载用户列表数据
    this.loadUsersData();
  },
  methods: {
    loadUsersData() {
      axios
        .get("http://localhost:8888/api/private/v1/users", {
          params: {
            query: "",
            pagenum: 1,
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
        });
    }
  }
};
</script>

<style>
</style>
