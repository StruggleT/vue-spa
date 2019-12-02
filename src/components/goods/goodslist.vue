<template>
  <div class="goods-list">
    <!-- 每一个商品列表 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDatail(item.id)">
      <img v-lazy="item.img" alt />
      <h1 class="title">Apple iPhone 11 (A2223) 128GB 黑色 移动联通电信4G手机 双卡双待</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥5999</span>
          <span class="prim">￥6999</span>
        </p>
        <p class="sell">
          <span style="color:red;">热卖中</span>
          <span>剩1000+</span>
        </p>
      </div>
    </div>
    <!-- 加载更多 -->
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      page: 1
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      const url = "getImages?page=" + this.page;
      this.$axios({
        method: "post",
        url: url
      })
        .then(res => {
          if(res.data.code === 200){
            this.goodslist = this.goodslist.concat(res.data.result);
          }
        })
        .catch(err => {
          console.log("加载失败");
        });
    },
    loadMore() {
      this.page++;
      this.getgoodslist();
    },
    goDatail(id) {
      //编程式导航，用Js代码来操作导航
      this.$router.push("/home/goodsinfo/" + id);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-between;
  p {
    margin: 0;
  }
  .goods-item {
    display: flex;
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ccc;
    img {
      width: 100%;
      margin: auto;
      box-shadow: 0 0 20px #999;
      min-height: 200px;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      margin-top: 5px;
      padding: 5px;
      .price {
        .now {
          color: red;
          font-weight: bold;
        }
        .prim {
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}
</style>