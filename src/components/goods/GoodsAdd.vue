
<template>
<div>
  <el-steps :active="activeIndex">
  <el-step title="第一步" description="基本信息"></el-step>
  <el-step title="第二步" description="图片商品"></el-step>
  <el-step title="第三步" description="商品内容"></el-step>
</el-steps>
</div>
</template>

<script>
/* eslint-disable */
export default {
  data(){
    return{
      activeIndex:1
    }
  }

}
</script>

<style>

</style>
