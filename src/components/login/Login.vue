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
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
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
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable */
import axios from "axios";
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
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) {
          return alert("格式不正确");
        }
        // console.log("开始登陆");
        let res = await axios.post(
          "http://localhost:8888/api/private/v1/login",
          this.ruleForm
        );
        console.log(res);
        if (res.data.meta.status === 200) {
          //把token保存到本地
          localStorage.setItem("token", res.data.data.token);
          this.$message({
            // 成功提示
            message: "恭喜你，登陆成功",
            type: "success",
            duration: 800
          });
          // 直接跳转到home页面
          this.$router.push("/home");
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: "error",
            duration: 800
          });
        }
        //  axios
        //     .post("http://localhost:8888/api/private/v1/login", this.ruleForm)
        //     .then(res => {
        //       console.log(res);
        //       if (res.data.meta.status === 200) {
        //         //把token保存到本地
        //         localStorage.setItem("token", res.data.data.token);
        //         this.$message({
        //           // 成功提示
        //           message: "恭喜你，登陆成功",
        //           type: "success",
        //           duration: 800
        //         });
        //         // 直接跳转到home页面
        //         this.$router.push("/home");
        //       } else {
        //         this.$message({
        //           message: res.data.meta.msg,
        //           type: "error",
        //           duration: 800
        //         });
        //       }
        //     });
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style scoped>
.el-row {
  height: 100%;
  background: #2d434c;
}
.el-col {
  background: #fff;
  border-radius: 15px;
  padding: 20px 30px;
}
</style>
