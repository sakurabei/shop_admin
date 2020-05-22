/* eslint-disable */
export default {
  data() {
    return {
      rolesData: [
        {
          roleName: "主管",
          roleDesc: "技术负责人"
        }
      ],
      // 是否显示 对话框
      dialogAssignRightsVisible: false,
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        // children:负责显示结构
        children: "children",
        // label:负责显示标题
        label: "authName"
      }
    };
  },
  created() {
    this.loadRolesData();
    this.loadAllRightsData();
  },
  methods: {
    // 加载角色列表的数据
    async loadRolesData() {
      let res = await this.$axios.get(`roles`);
      // console.log(res);
      this.rolesData = res.data.data;
    },
    // 处理索引
    indexMethod(index) {
      return index;
    },
    // 获取所有的权限信息
    async loadAllRightsData() {
      let res = await this.$axios.get(`rights/tree`);
      console.log(res);
      this.treeData = res.data.data;
    },
    // 显示分配权限对话框
    showAssignRihtsDialog(row) {
      this.dialogAssignRightsVisible = true;
      // 获取第三层的id
      let keys = [];
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            console.log(item3.id);
            keys.push(item3.id);
          });
        });
      });
      // 原因异步DOM更新，打印有点早了，
      // DOM更新完毕了，在获取
      // nextTick
      this.$nextTick(() => {
        console.log(this.$refs.tree);
        // 这个是element-UI自带的通过传递消息，获取数据
        this.$refs.tree.setCheckedKeys(keys)
      });
    }
  }
};
