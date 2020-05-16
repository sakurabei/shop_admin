// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由 进行挂载
import router from './router/router.js'
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义的全局公共css
import './assets/css/common.css'
// 处理axios的三个问题
// 1.每次都需要添加基准路径
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
