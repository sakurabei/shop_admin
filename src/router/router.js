import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'

// 在模块化工程中Vue.use()
Vue.use(VueRouter)

// 实例化
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {path: '/home', name: 'home', component: Home}
  ]
})
// 导出
export default router
