<template>
  <div>
    <el-table :data="goodsData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价值" width="180">
      </el-table-column>
      <el-table-column prop="goods_number" label="商品数量"> </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope"
          ><span>{{ scope.row.add_time | dateFilter }}</span></template
        >
      </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
/* eslint-disable */
export default {
  data() {
    return {
      goodsData: [
        {
          goods_name: "2016-05-02",
          goods_price: "王小虎",
          goods_number: "上海市普陀区金沙江路 1518 弄",
          add_time: "10000"
        }
      ]
    };
  },
  created() {
    this.loadGoodsData();
  },
  methods: {
    // 加载商品 数据
    async loadGoodsData() {
      let res = await this.$axios.get("goods", {
        params: {
          query: "",
          pagenum: 1,
          pagesize: 4
        }
      });
      console.log(res);
      this.goodsData = res.data.data.goods;
    }
  },
  filters: {
    dateFilter(res) {
      return moment(res).format("YYYY-MM-DD");
    }
  }
};
</script>

<style></style>
