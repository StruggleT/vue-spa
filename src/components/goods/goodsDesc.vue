<template>
  <div>
    <h1 class="title">{{photoDesc.text}}</h1>
    <hr />
    <div class="content">
      <img :src="photoDesc.thumbnail" alt="">
    </div>
    <p class="time">{{photoDesc.passtime}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoDesc: {},
      id: this.$route.params.sid
    };
  },
  created() {
    this.getphotodesc()
  },
  methods: {
    getphotodesc() {
      //获取图文详情数据
      const url = "getSingleJoke?sid=" + this.id;
      this.$axios({
        method: "get",
        url: url
      }).then(res => {
        if (res.data.code === 200) {
          this.photoDesc = res.data.result;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: cyan;
}
.content{
  img{
    width: 100%;
    height: 100%;
  }
}
.time{
  margin-top: 20px;
  color: darkkhaki;
  font-size: 16px;
}
</style>