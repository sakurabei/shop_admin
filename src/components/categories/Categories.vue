
<template>
  <div>
    <el-table :data="catData" style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">{{scope.row.cat_deleted?'否':'是'}}</template>
      </el-table-column>
      <el-table-column label="层级" prop="cat_level">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level ==0">一级</span>
          <span v-else-if="scope.row.cat_level==1">二级</span>
          <span v-else>三级</span>
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
      catData: [
        {
          cat_name: "王小虎",
          cat_deleted: "是",
          cat_level: "一级"
        }
      ]
    };
  },
  created() {
    this.loadCatData();
  },
  methods: {
    async loadCatData() {
      let res = await this.$axios.get("categories", {
        params: {
          query: "",
          pagenum: 1,
          pagesize: 4
        }
      });
      console.log(res);
      this.catData = res.data.data.result;
    }
  }
};
</script>

<style>
</style>
