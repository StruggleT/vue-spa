<template>
  <div class="shopcar-container">
    <!-- 商品展现区域 -->
    <div class="mui-card" v-for="(item,i) in shopCarList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch
            v-model="$store.getters.getselectedStatu[item.id]"
            @change="selectedChange(item.id,$store.getters.getselectedStatu[item.id])"
          ></mt-switch>
          <img :src="item.img" alt />
          <div>
            <h1 style="font-size:13px">Apple iPhone 11 128GB 移动联通电信4G手机</h1>
            <p class="context">
              <span style="color:red;font-weight:bold">￥5999</span>
              <numbox
                style="height:25px;width:110px"
                :nowcarcount="$store.getters.getGoodsCount[item.id]"
                :goodsId="item.id"
              ></numbox>
              <a href="#" @click.prevent="deleteData(item.id,i)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner pay-area">
          <div class="left">
            <div class="total">总计(不包含运费)</div>
            <div>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAcount.count}}</span>件，总价
              <span class="red">￥{{$store.getters.getGoodsCountAndAcount.price}}</span>
            </div>
          </div>
          <div class="right">
            <mt-button type="danger">确认支付</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/numbox_shopcar.vue";

export default {
  data() {
    return {
      count: this.$store.getters.getAllCount,
      shopCarList: []
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      //获取被加入购物车的商品数据
      if (this.count === 0) return;
      const url = "getImages?page=1&count=" + this.count;
      this.$axios({
        method: "post",
        url: url
      }).then(res => {
        if (res.data.code === 200) {
          this.shopCarList = res.data.result;
        }
      });
    },
    deleteData(id, index) {
      //要删除每一个商品，要把shopCarList数组的数据删除，还要把localStorage里的数据删除，item.id是为了删除localStorage，i是为了删除数组的
      this.shopCarList.splice(index, 1);
      this.$store.commit("deleteCar", id);
    },
    selectedChange(id, val) {
      //把选择的状态更新到store的car中
      console.log(id + "=======" + val);
      this.$store.commit("updataSelected", {
        id,
        selected: val
      });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
  }

  .pay-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>