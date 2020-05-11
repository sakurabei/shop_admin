/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      // 用户列表数据
      usersData: [],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      queryText: "",
      state: true
    };
  },
  created() {
    // 加载用户列表数据
    this.loadUsersData();
  },
  methods: {
    async loadUsersData(pagenum = 1, query = "") {
      const url = "http://localhost:8888/api/private/v1/users";
      const config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      };
      let res = await axios.get(url, config);

      console.log(res);
      // 保存列表数据
      this.usersData = res.data.data.users;
      // 保存 用户总个数
      this.total = res.data.data.total;
      // 保存当前页码
      this.pagenum = res.data.data.pagenum;
      // axios
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
      // 传递参数 加载当前页的内容
      this.loadUsersData(curPage, this.queryText);
    },
    startQuery() {
      console.log(this.queryText);
      this.loadUsersData(1, this.queryText);
    }
  }
};
