<template>
  <div class="photocontainer">
    <!-- 顶部滑动导航栏部分 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a class="mui-control-item mui-active" @click="getall">全部</a>
          <a class="mui-control-item">热点</a>
          <a class="mui-control-item">搞笑</a>
          <a class="mui-control-item" @click="getgril">美女</a>
          <a class="mui-control-item">娱乐</a>
        </div>
      </div>
    </div>

    <!-- 图片内容显示区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" to="/home/photoinfo" tag="li">
        <img v-lazy="item.img" />
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入mui.js文件
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      list: [],
      page: 2
    };
  },
  created() {
    this.getAllImg();
  },
  mounted() {
    // 初始化滑动条
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllImg() {
      //全部及明星分类的ajax请求
      const url = "getImages?page=" + this.page;
      var params = new URLSearchParams();
      params.append("count", "30");
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          if (res.data.code === 200) {
            this.list = res.data.result;
          }
        })
        .catch(err => {
          Toast("图片加载失败");
        });
    },
    getgril() {
      //美女
      this.page++;
      this.getAllImg();
    },
    getall() {
      //全部
      this.page++;
      this.getAllImg();
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photocontainer {
  .photo-list {
    list-style: none;
    padding: 5px;
    li {
      background-color: #ccc;
      img {
        width: 100%;
        height: 100%;
        margin: auto;
        box-shadow: 0 0 20px #999;
      }
    }
  }
}
</style>