/* eslint-disable */
import Vue from "vue"
import VueRouter from "vue-router"

import Login from "../components/login/Login.vue"
import Home from "../components/home/Home.vue"
import Users from "../components/users/Users.vue"
import Roles from "../components/roles/Roles.vue"
import Rights from "../components/rights/Rights.vue"

// 在模块化工程中Vue.use()
Vue.use(VueRouter)

// 实例化
const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", name: "login", component: Login },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        { path: "/roles", name: "roles", component: Roles },
        { path: "/users", name: "users", component: Users },
        { path: "/rights", name: "rights", component: Rights}
    
      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
  } else { 
    const token = localStorage.getItem("token");
    token ? next() : next("/login")
  }
});
// 导出
export default router;
