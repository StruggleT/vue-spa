<template>
  <div class="music-container">
    <div class="mui-card">
      <div class="mui-card-header">
        <h1 class="title">{{musicParam.title}}</h1>
        <p>{{musicParam.author}}</p>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <img
            :src="musicParam.pic"
            alt
          />
        </div>
      </div>
      <div class="mui-card-footer">
        <audio :src="musicParam.url" controls></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      musicParam:this.$route.query
    }
  }
};
</script>

<style lang="scss" scoped>
.music-container {
  background: linear-gradient(transparent, cornflowerblue);
  padding: 10px;
  .mui-card-header {
    margin: 30px 0;
    display: block;
    .title{
      font-size: 16px;
    }
  }
  .mui-card-content-inner {
    img {
      width: 100%;
      border-radius: 50%;
      animation: rotation 8s linear infinite;
    }
  }

  @keyframes rotation {
    from{
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
}
</style>