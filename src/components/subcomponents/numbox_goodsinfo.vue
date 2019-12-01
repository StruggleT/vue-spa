<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="5"
      @change="changecount"
      ref="numbox"
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
      this.$emit("getcount", this.$refs.numbox.value);
    }
  },
  props: ["max"], //由于max是父组件传过来的，而父组件的max是异步操作得到的，所以必须要监听max的值是否返回
  watch: {
    max: function(newval, oldval) {
      mui('.mui-numbox')
        .numbox()
        .setOption("max", newval);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>