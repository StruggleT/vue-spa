<template>
  <div class="goodsinfo-container">
    <!-- 小球滚动 -->
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
      <div class="ball" v-if="ballFlag" ref="ball"></div>
    </transition>

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
            <numbox @getcount="getnumboxcount" :max="goodsParams.up"></numbox>
            <!-- 通过事件机制把子组件的count值保存到父组件的data上 -->
          </p>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
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
      goodsParams: {},
      ballFlag: false,
      numbox_count: 1,
      id: this.$route.params.id
    };
  },
  created() {
    this.getLunBoList();
    this.getGoodsParams();
    this.page++;
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
    },
    addToCar() {
      this.ballFlag = !this.ballFlag;
      var goodsinfo = {
        id: this.id,
        count: this.numbox_count,
        price: 5999,
        selected: true
      };
      this.$store.commit('addToCar',goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth; //加上才能显示动画

      //由于把小球最终位置写死，导致在不同分辨率以及滚动条有移动距离后小球的位置不同，
      //所以可以通过徽标的位置来减去小球的位置动态的获取小球需要位移的距离
      //通过domObj.getBoundingClientRect()来获取位置
      //获取小球的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取徽标的位置
      const tokenPosition = document
        .getElementById("token")
        .getBoundingClientRect();

      const x = tokenPosition.left - ballPosition.left;
      const y = tokenPosition.top - ballPosition.top;

      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = "all .5s cubic-bezier(.38,-0.23,1,.65) ";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getnumboxcount(count) {
      //当获取到子组件的count时，保存到data中
      this.numbox_count = parseInt(count);
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
  .ball {
    width: 16px;
    height: 16px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    top: 430px;
    left: 152px;
  }
}
</style>