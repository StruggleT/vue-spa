<template>
  <div>
    <!-- 轮播图区域 -->
    <slider :lunBoList="dataList" :isfull="false"></slider>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">内涵段子</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">精美图片</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-more"></span>
          <div class="mui-media-body">更多</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui"

//引入轮播图组件
import slider from '../subcomponents/slider.vue'

export default {
  data() {
    return {
      dataList: []
    };
  },
  created() {
    //请求图片api
    const url = "getImages";

    var params = new URLSearchParams();

    params.append("page", "18"); //你要传给后台的参数值 key/value
    params.append("count", "4");

    this.$axios({
      method: "post",
      url: url,
      data: params
    })
      .then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.dataList = res.data.result;
        }
      })
      .catch(err => {
        Toast("轮播图加载失败");
      });
  },
  components:{
    slider
  }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 250px;
  img {
    width: 100%;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
  img {
    width: 60px;
  }
  .mui-media-body {
    font-size: 12px;
  }
}
</style>