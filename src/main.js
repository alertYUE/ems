// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入index.css
import '@/assets/css/index.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

/* // 引入axios
import Axios from 'axios'
Vue.prototype.$http = Axios
// 统一设置请求路径
Axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/' */
// 引入myaxios插件
import myaxios from '@/assets/js/myaxios.js'
Vue.use(myaxios)

// 引入面包屑
import Bread from '@/layout/bread.vue'
// 定义为全局组件
Vue.component(Bread.name, Bread)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
