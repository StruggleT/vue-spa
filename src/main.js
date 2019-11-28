// 入口文件
console.log('ok')

//导入vue组件
import Vue from 'vue'

//导入App.vue组件
import app from './App.vue'

//导入并安装路由模块
import VueRouter from 'vue-router' 
Vue.use(VueRouter)

//按需导入mint-ui组件库
import { Header,Swipe, SwipeItem,Button} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

//导入mui组件库
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


//导入自定义路由router.js
import router from './router.js'

//引入axios
import Axios from 'axios'
Axios.defaults.baseURL = 'https://api.apiopen.top/'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//给Vue原型挂载一个属性
Vue.prototype.$axios = Axios;

//注册vue对象
var vue = new Vue({
  el:'#app',
  render:c=>c(app),
  router //将路由对象挂载到vue实例上
})