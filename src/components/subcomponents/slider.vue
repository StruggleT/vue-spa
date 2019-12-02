<template>
  <div>
    <!-- 封装轮播图 -->
     <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunBoList" :key="item.img">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  props:['lunBoList','isfull']
}
</script>

<style lang="scss" scoped>
  .mint-swipe {
  height: 250px;
  img {
    width: 100%;
    // height: 100%;
  }
}
  .full {
    width: 100%;
    height: 200px;
  }
</style>