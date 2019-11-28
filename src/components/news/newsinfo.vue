<template>
  <div class="nwesinfo-contariner">
    <h1 class="title">{{newsinfo.name}}</h1>
    <p>
      <span>发表时间：{{newsinfo.passtime}}</span>
      <span>查看次数：{{newsinfo.comment}}</span>
    </p>

    <hr />
    <!-- 文章内容 -->
    <div class="content">
      {{newsinfo.text}}
      <img :src="newsinfo.thumbnail" alt />
    </div>
    <!-- 评论区 -->
    <comment-cpn></comment-cpn>
  </div>
</template>

<script>
//导入评论组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.sid,
      newsinfo: {}
    };
  },
  created() {
    this.getnewsinfo();
  },
  methods: {
    getnewsinfo() {
      const url = "getSingleJoke/?sid=" + this.id;
      var params = new URLSearchParams();
      // params.append("page", "18"); //你要传给后台的参数值 key/value
      // params.append("count", "20");
      this.$axios({
        method: "get",
        url: url
        // data: params
      })
        .then(res => {
          if (res.data.code === 200) {
            console.log(res.data.result);
            this.newsinfo = res.data.result;
          }
        })
        .catch(err => {
          Toast("新闻列表加载失败");
        });
    }
  },
  components: {
    "comment-cpn": comment
  }
};
</script>

<style lang="scss">
.nwesinfo-contariner {
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  p {
    display: flex;
    justify-content: space-between;
    color: #2262ff;
  }
  .content {
    width: 100%;
  }
}
</style>