<template>
  <div class="photo-info">
    <div class="tips">想看美女详情？😄哈哈，请点击放大哦~~~</div>
    <h1>{{details.name}}</h1>
    <p class="pt-header">
      <span>发表时间：{{details.passtime}}</span>
      <span>查看{{details.comment}}次</span>
    </p>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content">{{details.text}}</div>

    <!-- 评论子组件 -->
    <cmt-cpn></cmt-cpn>
  </div>
</template>

<script>
//引入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      details: {},
      list: [] //缩略图
    };
  },
  created() {
    this.getpicinfo();
    this.getpicture();
  },
  methods: {
    getpicinfo() {
      const url = "getJoke";
      var params = new URLSearchParams();
      this.$axios({
        method: "post",
        url: url
      })
        .then(res => {
          if (res.data.code === 200) {
            this.details = res.data.result[0];
          }
        })
        .catch(err => {
          Toast("新闻加载失败");
        });
    },
    getpicture() {
      const url = "getImages";
      var params = new URLSearchParams();
      params.append("count", "6");
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          if (res.data.code === 200) {
            res.data.result.forEach(item => {
              item.w = 600;
              item.h = 700;
              item.msrc = item.img;
              item.src = item.img;
            });
            this.list = res.data.result;
          }
        })
        .catch(err => {
          Toast("新闻加载失败");
        });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "cmt-cpn": comment
  }
};
</script>

<style lang="scss" scoped>
.photo-info {
  .tips {
    font-size: 20px;
    color: deeppink;
  }
  h1 {
    color: red;
    font-size: 18px;
    margin: 10px 0;
  }
  .pt-header {
    display: flex;
    justify-content: space-between;
    color: skyblue;
  }
  .content {
    font-size: 16px;
  }
  .thumbs {
    /deep/ .my-gallery {
      //deep深层作用选择器
      display: flex;
      flex-wrap: wrap; //默认换行
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          box-shadow: 0 0 8px #999;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>