/* eslint-disable */
export default {
  data(){
    return {
      // 控制步骤条
      activeIndex: 1,
      // 控制标签页
      activeName:'one'
    }
  },
  methods: {
    // 点击tabs
    clickTabs (tab) { 
      // 控制步骤条
      this.activeIndex =  +tab.index+1
      
    }
  }

}