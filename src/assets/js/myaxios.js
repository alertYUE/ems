import axios from 'axios'
var myaxios = {}
myaxios.install = function (Vue) {
    // 设置统一路径
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    // 挂载到Vue原型中
    Vue.prototype.$http = axios
}
// 把对象导出
export default myaxios