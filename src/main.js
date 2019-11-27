// 入口文件
console.log('ok')

//导入vue组件
import Vue from 'vue'

//导入App.vue组件
import app from './App.vue'

//按需导入mint-ui组件库
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)


//导入mui组件库
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//注册vue对象
var vue = new Vue({
  el:'#app',
  render:c=>c(app)
})