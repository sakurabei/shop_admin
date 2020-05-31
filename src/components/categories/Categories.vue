<template>
  <div>
    <el-button type="success" plain @click="showAddCatDialog"
      >添加分类</el-button
    >
    <el-table :data="catData" style="width: 100%">
      <el-table-tree-column
        prop="cat_name"
        label="分类名称"
        width="220"
        tree-key="cat_id"
        parent-key="cat_pid"
        level-key="cat_level"
        :index-size="20"
      ></el-table-tree-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">{{
          scope.row.cat_deleted ? "否" : "是"
        }}</template>
      </el-table-column>
      <el-table-column label="层级" prop="cat_level">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-else-if="scope.row.cat_level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 第一个对话框：添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogAddCatFormVisible">
      <el-form :model="addCatForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="addCatForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <!-- 级联选择器 -->
          <el-cascader
            :options="options"
            :props="defaultProps"
            clearable
            v-model="addCatForm.cat_pid_arr"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCatFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCat">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import ElTreeGrid from "element-tree-grid";
Vue.component(ElTreeGrid.name, ElTreeGrid);
export default {
  data() {
    return {
      catData: [
        {
          cat_name: "王小虎",
          cat_deleted: "是",
          cat_level: "一级"
        }
      ],
      /**
       * children :结构
       * label：显示
       * value：收集数据
       */
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            }
          ]
        }
      ],
      // 级联选择器的 配置对象
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      },
      dialogAddCatFormVisible: false,
      addCatForm: {
        cat_name: "",
        cat_pid_arr: []
      }
    };
  },
  created() {
    this.loadCatData();
    this.loadCatData2();
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
    },
    // 添加分类处，使用
    async loadCatData2() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 2
        }
      });
      // console.log(res);
      this.options = res.data.data;
    },
    // 弹出对话框
    showAddCatDialog() {
      this.dialogAddCatFormVisible = true;
    },
    // 添加分类
    async addCat() {
      // 1.获取已知信息
      const { cat_name, cat_pid_arr } = this.addCatForm;
      // 发送请求
      let res = await this.$axios.post("categories", {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], //父id数组
        cat_name,
        cat_level: cat_pid_arr.length //数组的长度
      });
      console.log(res);
      if (res.data.meta.status == 201) {
        // 1. 关闭对话框
        this.dialogAddCatFormVisible = false;
        // 2.提示
        this.$message({
          message: "添加分类成功",
          type: "success",
          duration: 800
        });
        // 3. 刷新
        this.loadCatData();
      }
    }
  }
};
</script>

<style></style>
