// 入口文件
console.log('ok')

//导入vue组件
import Vue from 'vue'

//导入App.vue组件
import app from './App.vue'

//导入并安装路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入时间格式话插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat', function (daraStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(daraStr).format(pattern)
})

//按需导入mint-ui组件库
// import { Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

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

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    //通过this.$store.state.***来获取
    car: [] //用来存储商品的数据 可以设计为：{id:1 ,count:5 商品数量，price:价格，selected:true 选中状态}

  },
  mutations: {
    //通过this.$store.commit('方法名,'唯一参数')

    addToCar(state, goodsinfo) {
      //点击加入购物车，把商品信息保存到store上

      //首先，如果之前购物车有商品了，就只需要更新数量，count,
      // 如果没有，就把商品的数据push到car这个数组中

      //假设car中没有商品
      var flag = false
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if(!flag){
        state.car.push(goodsinfo)
      }
    }
  },
  getters: {
    //通过this.$store.getters.***
  }
})

//注册vue对象
var vue = new Vue({
  el: '#app',
  render: c => c(app),
  router, //将路由对象挂载到vue实例上
  store //挂载store 状态管理对象
})