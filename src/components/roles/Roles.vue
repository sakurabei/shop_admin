
<template>
  <div>
    <el-table :data="rolesData" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      rolesData: [
        {
          roleName: "主管",
          roleDesc: "技术负责人"
        }
      ]
    };
  },
  created() {
    this.loadRolesData();
  },
  methods: {
    // 加载角色列表的数据
    async loadRolesData() {
      let res = await this.$axios.get(`roles`);
      console.log(res);
      this.rolesData = res.data.data;
    }
  }
};
</script>

<style>
</style>
