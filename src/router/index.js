import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/pages/home.vue'
import User from '@/components/pages/user/user.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {name: 'home', path: '/home', component: Home, children: [
      // 挂载子路由
      { path: '/user', component: User}
    ]},
  ]
})
