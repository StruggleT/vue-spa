
import VueRouter from 'vue-router' 

//导入tabber组件
import homeContainer from './components/tabbar/homeContainer.vue'
import menberContainer from './components/tabbar/menberContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import newslist from './components/news/newlist.vue'
import newsinfo from './components/news/newsinfo.vue'

// 第四步，创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:homeContainer},
    {path:'/menber',component:menberContainer},
    {path:'/shopcar',component:shopcarContainer},
    {path:'/search',component:searchContainer},
    {path:'/home/newslist',component:newslist},
    {path:'/home/newsinfo/:sid',component:newsinfo}
  ],
  linkActiveClass:'mui-active'
})

//把路由对象暴露出去
export default router