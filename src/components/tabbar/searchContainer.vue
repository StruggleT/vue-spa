<template>
  <div class="search-container">
    <div class="search">
      <input type="text" class="text" v-model="value" placeholder="搜索音乐" />
      <router-link class="mui-icon mui-icon-search" :to="'/search/musiclist/'+value"></router-link>
    </div>

 
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data(){
    return {
       value: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  .search {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .text {
      margin: 0;
    }
    .mui-icon-search {
      color: green;
    }
  }
}
</style>