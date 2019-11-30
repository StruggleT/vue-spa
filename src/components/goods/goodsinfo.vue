<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <slider :lunBoList="lunBoTu" :isfull="true"></slider>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">Apple iPhone 11 (A2223) 128GB 黑色</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          市场价：
          <del>￥6999</del>&nbsp;&nbsp;
          销售价：
          <span class="now_price">￥5999</span>
          <p>
            购买数量：
            <numbox></numbox>
          </p>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small">加入购物车</mt-button>
        </div>
      </div>
    </div>

    <!-- 商品详情区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsParams.sid}}</p>
          <p>库存情况：{{goodsParams.up}}件</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button
          type="primary"
          size="large"
          plain
          class="mint-button-bigbtn"
          @click="goGoodsDesc(goodsParams.sid)"
        >图文详情</mt-button>
        <mt-button type="danger" size="large" plain @click="goGoodsComment(goodsParams.sid)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
//导入轮播图组件
import slider from "../subcomponents/slider.vue";
//导入数字输入框组件
import numbox from "../subcomponents/numbox_goodsinfo.vue";
//导入mui.js文件
import mui from "../../lib/mui/js/mui.js";
export default {
  //引轮播图组件
  data() {
    return {
      lunBoTu: [
        {
          img:
            "https://img13.360buyimg.com/n7/jfs/t1/79993/29/9874/153231/5d7809f4E8f387bff/1dc9e1b6b262f0fb.jpg"
        },
        {
          img:
            "https://img13.360buyimg.com/n7/jfs/t1/27653/36/12572/346766/5c99ef63E81a8de14/5a38e39b2975e837.jpg"
        },
        {
          img:
            "https://img12.360buyimg.com/n7/jfs/t1/76327/24/7494/166690/5d5a7346E521dde23/c399d644f61cf94b.jpg"
        },
        {
          img:
            "https://img11.360buyimg.com/n7/jfs/t1/90139/34/1379/180822/5dbe8875E02dc2e95/c78c80a4116ee57d.jpg"
        }
      ],
      page: 1,
      goodsParams: {}
    };
  },
  created() {
    this.getLunBoList();
    this.getGoodsParams();
    this.page++;
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    getLunBoList() {
      //获取轮播图数据
      const url = "getWangYiNews?page=" + this.page;
      var params = new URLSearchParams();
      params.append("count", "3");
      this.$axios({
        method: "post",
        url: url,
        params: params
      }).then(res => {
        if (res.data.code === 200) {
          res.data.result.forEach(item => {
            item.img = item.image;
          });
          this.lunBoTu = this.lunBoTu.concat(res.data.result);
        }
      });
    },
    getGoodsParams() {
      //获取商品参数
      const url = "getJoke";
      var params = new URLSearchParams();
      params.append("count", "1");
      this.$axios({
        method: "post",
        url: url,
        params: params
      }).then(res => {
        if (res.data.code === 200) {
          this.goodsParams = res.data.result[0];
        }
      });
    },
    goGoodsDesc(sid) {
      //通过编程式路由，去图文详情
      this.$router.push({ name: "goodsdesc", params: { sid } });
    },
    goGoodsComment(sid) {
      //去商品评论
      this.$router.push({ name: "goodscomment", params: { sid } });
    }
  },
  components: {
    slider,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
  }
  .mint-button-bigbtn {
    margin: 15px 0;
  }
}
</style>