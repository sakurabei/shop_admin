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
    },
    indexMethod(index) {
      return index;
    }
  }
};
