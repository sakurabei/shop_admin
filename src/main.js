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
// 2. 每个组件页面都要引入axios
Vue.prototype.$axios = axios
// 3.解决每次请求都需要呆着token值
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  // config.headers.Authorization = localStorage.getItem('token')
  console.log('修改了')
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
