<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="50">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="nowcarcount"
      @change="changecount"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
//导入mui.js文件
import mui from "../../lib/mui/js/mui.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    changecount() {
      // console.log(this.$refs.numbox.value)
      //每当数量值改变，就把当前数据更新到store中去覆盖
      this.$store.commit('updataGoodsInfo',{
        id:this.goodsId,
        count:this.$refs.numbox.value
      })

    }
  },
  props:['nowcarcount','goodsId']
};
</script>

<style lang="scss" scoped>
</style>