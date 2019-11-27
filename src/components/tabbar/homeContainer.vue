<template>
  <div class="homecontainer">
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
    <h1>homeContainer</h1>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.homecontainer{
  height: 200px;
  background-color: red;
}
</style>