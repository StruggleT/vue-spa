
import VueRouter from 'vue-router' 

//导入tabber组件
import HomeContainer from './components/tabbar/homeContainer.vue'
import MenberContainer from './components/tabbar/menberContainer.vue'
import ShopcarContainer from './components/tabbar/shopcarContainer.vue'
import SearchContainer from './components/tabbar/searchContainer.vue'
import NewsList from './components/news/newlist.vue'
import NewsInfo from './components/news/newsinfo.vue'
import PhotoList from './components/photos/photolist.vue'
import PhotoInfo from './components/photos/photoinfo.vue'
// 第四步，创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/menber',component:MenberContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newsinfo/:sid',component:NewsInfo},
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo',component:PhotoInfo}
  ],
  linkActiveClass:'mui-active'
})

//把路由对象暴露出去
export default router