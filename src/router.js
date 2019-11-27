
import VueRouter from 'vue-router' 

//导入tabber组件
import homeContainer from './components/tabbar/homeContainer.vue'
import menberContainer from './components/tabbar/menberContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
// 第四步，创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/home',component:homeContainer},
    {path:'/menber',component:menberContainer},
    {path:'/shopcar',component:shopcarContainer},
    {path:'/search',component:searchContainer}
  ],
  linkActiveClass:'mui-active'
})

//把路由对象暴露出去
export default router