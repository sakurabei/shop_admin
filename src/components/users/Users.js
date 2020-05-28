/* eslint-disable */
export default {
  data() {
    return {
      // 用户列表数据
      usersData: [],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      // 查询内容
      queryText: "",
      // 用户状态
      state: true,
      // 添加用户表单对象
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 是否显示添加用户 对话框
      dialogAddUserFormVisible: false,
      // 添加用户的检验规则
      rules: {
        // 用户名
        username: [
          // 判断是否有输入内容
          { required: true, message: "请输入用户名", trigger: "blur" },
          // 判断是否正确
          {
            min: 3,
            max: 5,
            message: "输入内容应该在3-5之间",
            trigger: "blur"
          }
        ],
        // 用户名
        password: [
          // 判断是否有输入内容
          { required: true, message: "请输入密码", trigger: "blur" },
          // 判断格式是否正确
          {
            min: 5,
            max: 10,
            message: "输入密码内容应该在5-10之间",
            trigger: "blur"
          }
        ],
        // 邮箱
        email: [
          {
            // 邮箱正则
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        // 手机
        mobile: [
          {
            // 手机正则
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ]
      },
      // 是否显示编辑用户对话框
      dialogEditUserFormVisible: false,
      editUserform: {
        id: "",
        username: "春春",
        email: "",
        mobile: ""
      },
      // 是否显示分配角色对话框
      dialogAssignRoleVisible: false,
      // 分配角色表单对象
      assignRoleForm: {
        username: "",
        id: 0,
        rid: ""
      },
      // 角色列表
      rolesData: []
    };
  },
  created() {
    // 获取路由 参数=> 页码
    const page = this.$route.params.page;
    console.log(page);
    // 加载用户列表数据
    // 刷新 之后仍然是这一页
    this.loadUsersData(page);
    this.loadRolesData();
  },
  methods: {
    async loadUsersData(pagenum = 1, query = "") {
      const url = "users";
      const config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      };
      let res = await this.$axios.get(url, config);

      console.log(res);
      // 保存列表数据
      this.usersData = res.data.data.users;
      // 保存 用户总个数
      this.total = res.data.data.total;
      // 保存当前页码
      this.pagenum = res.data.data.pagenum;
      // this.$axios
      //   .get('http://localhost:8888/api/private/v1/users', {
      //     params: {
      //       query,
      //       pagenum,
      //       pagesize: 2
      //     },
      //     headers: {
      //       Authorization: localStorage.getItem('token')
      //     }
      //   })
      //   .then(res => {
      //     console.log(res)
      // // 保存列表数据
      // this.usersData = res.data.data.users
      // // 保存 用户总个数
      // this.total = res.data.data.total
      // // 保存当前页码
      // this.pagenum = res.data.data.pagenum
      //   })
    },
    // 点击页码
    clickCurrentPage(curPage) {
      console.log(curPage);
      // 改变入口路径
      this.$router.push("/users/" + curPage);
      // 传递参数 加载当前页的内容
      this.loadUsersData(curPage, this.queryText);
    },
    // 开始查询内容
    startQuery() {
      console.log(this.queryText);
      this.loadUsersData(1, this.queryText);
    },
    // 显示添加用户对话框
    showAddUserDialog() {
      this.dialogAddUserFormVisible = true;
    },
    //添加用户
    async addUser() {
      // 收集表单数据，发送请求
      // 格式：this.$axios.post(url,data,config)
      let res = await this.$axios.post("users", this.addUserForm);
      console.log(res);
      if (res.data.meta.status === 201) {
        // 1.关闭对话框
        this.dialogAddUserFormVisible = false;
        // 2.重新刷新页面
        this.loadUsersData();
        // 3.添加用户成功提示
        this.$message({
          message: "添加用户成功",
          type: "success",
          duration: 800
        });
        // 4. 重置表单
        // 其实我觉得这个东西可以删除
        this.$refs.addUserForm.resetFields();
      } else {
        // 添加失败
      }
    },
    //监听对话框关闭
    dialogClosed() {
      this.$refs.addUserForm.resetFields();
    },
    // 删除用户
    async delUser(id) {
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        // 发送请求删除用户
        // this.$axios.delete(url,config)
        //     params: {
        let res = await this.$axios.delete(`users/${id}`);
        if (res.data.meta.status === 200) {
          // 1.刷新页面
          this.loadUsersData();
          // 2.提示
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 800
          });
        }
        // console.log(res);
      } catch (error) {
        this.$message({
          type: "info",
          message: "取消删除",
          duration: 800
        });
      }
    },
    // 状态改变
    async stateChanged(row) {
      console.log("改了");
      // 1.从row 对象里获取 id 和mg_state
      // this.$axios.put('users/:uId/state/:type)
      const { id, mg_state: mgState } = row;
      // 格式 this.$axios.put(url,data,config)
      let res = await this.$axios.put(`users/${id}/state/${mgState}`);
      console.log(res);
      if (res.data.meta.status === 200) {
        // 提示修改状态成功
        this.$message({
          message: "修改状态成功",
          type: "success",
          duration: 800
        });
        // 刷新当前页,这样更改状态之后，还在当前页，不会跑到别的页面上
        this.loadUsersData(this.pagenum);
      }
    },
    // 显示编辑用户对话框
    showEditUserDialog(row) {
      // 1.获取 用户名 邮箱 电话
      const { username, email, mobile, id } = row;
      // 2.赋值给绑定表单的数据对象，editUserForm
      this.editUserform.username = username;
      this.editUserform.email = email;
      this.editUserform.mobile = mobile;
      this.editUserform.id = id;
      // 点击时，编辑表单弹窗出现
      this.dialogEditUserFormVisible = true;
    },
    // 编辑用户
    async editUser() {
      // 1.从编辑用户对象里读取需要的数据
      const { id, email, mobile } = this.editUserform;
      // axios.put(url,ddata,config)
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      });
      console.log(res);
      if (res.data.meta.status === 200) {
        // 1. 关闭对话框
        this.dialogEditUserFormVisible = false;
        // 2.刷新页面
        this.loadUsersData(this.pagenum);
        // 3.提示
        this.$message({
          message: "更新成功",
          type: "success",
          duration: 800
        });
      }
    },
    async loadRolesData() {
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.rolesData = res.data.data;
      console.log(this.rolesData);
    },
    // 显示分配角色的对话框
    async showAssignRoleDialog(row) {
      this.dialogAssignRoleVisible = true;
      // 打印
      // console.log(row);
      // 对象里，需要三个参数 id username rid
      const { id, username } = row;
      // rid 在row中没有，但是留了一个接口，可以使用id 去请求获取
      // 根据 id 查询用户信息
      let res = await this.$axios.get(`users/${id}`);
      console.log(res);
      // 把三个参数 赋值给assignRoleForm对象
      this.assignRoleForm.id = id;
      this.assignRoleForm.username = username;
      this.assignRoleForm.rid =
        res.data.data.rid == -1 ? "" : res.data.data.rid;
    },
    // 分配角色
    async assignRole() {
      // 获取需要的参数
      let { id, rid } = this.assignRoleForm;
      // 请求
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      });
      // console.log(res);
      if (res.data.meta.status === 200) {
        // 1.关闭对话框
        this.dialogAssignRoleVisible = false;
        // 2. 提示
        this.$message({
          message: "分配角色成功",
          type: "success",
          duration: 800
        });
        // 3. 刷新
        this.loadUsersData(this.pagenum);
      }
    }
  }
};
