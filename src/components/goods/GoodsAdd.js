/* eslint-disable */
export default {
  data() {
    return {
      // 控制步骤条
      activeIndex: 1,
      // 控制标签页
      activeName: "one",
      addGoodsForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        goods_introduce: "",
        pics: []
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            }
          ]
        }
      ],
      // 级联选择器的 配置对象
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      }
    };
  },
  created() {
    this.loadCatName();
  },
  methods: {
    // 点击tabs
    clickTabs(tab) {
      // 控制步骤条
      this.activeIndex = +tab.index + 1;
    },
    // next 下一步
    // 2. two
    // 3. three
    next(index, name) {
      this.activeIndex = index;
      this.activeName = name;
    },
    // 加载分类数据
    async loadCatName() {
      let res = await this.$axios.get("categories");
      // console.log(res);
      this.options = res.data.data;
    }
  }
};
