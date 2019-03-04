import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/pages/home.vue'
import Users from '@/components/pages/user/user.vue'
import Rights from '@/components/pages/rights/rights.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {name: 'home', path: '/home', component: Home, children: [
      // 挂载子路由
      { path: '/users', component: Users},
      { path: '/rights', component: Rights}
    ]},
  ]
})
