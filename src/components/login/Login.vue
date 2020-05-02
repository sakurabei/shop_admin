<template>
  <!-- el-form 表单组件
  -：model="ruleForm" 表单数据 和表单绑定的数据对象（ruleForm对象）
  -：rules="rules"校验规则
  -refs="ruleForm"可以通过 refs获取当前这个组件
  - label-width="150px"就是el-form-item  label标签的宽度
el-form-item表单元素组件
  - label：标签名称组件
  - prop="name" 校验/重置用的
  -->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="startLogin()">登陆</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      // 校验规则
      rules: {
        // 用户名
        username: [
          // 判断是否需要输入
          { required: true, message: "请输入用户名", trigger: "blur" },
          // 判断输入格式是否正确
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          // 判断是否需要输入
          { required: true, message: "请输入密码", trigger: "blur" },
          // 判断输入格式是否正确
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 开始登陆
    startLogin() {
      // 校验
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return alert("格式不正确");
        }
        console.log("开始登陆");
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style></style>
