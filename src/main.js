// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由 进行挂载
import router from './router/router.js'
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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

// 响应拦截器里
// axios.interceptors.response.use(
//   function (response) {
//     // 方式1 :
//     if (response.data.meta.status === 100010) {
//       // 1.跳转 过登录页
//       this.$router.push('/login')
//     }

//     // 方式2 :
//     if (response.data.data.token) {
//       localStorage.setItem('token', token)
//     }

//     return response
//   },
//   function (error) {
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueQuillEditor /* { default global options } */)

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
