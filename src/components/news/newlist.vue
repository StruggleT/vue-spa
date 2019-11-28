<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.sid">
        <router-link :to="'/home/newsinfo/' + item.sid">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.header"
          />
          <div class="mui-media-body">
            <h1>{{item.text}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.passtime}}</span>
              <span class="mui-icon mui-icon-eye">查看次数:{{item.comment}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
    }
  },
  created() {
    //请求图片api
    const url = "getJoke";

    var params = new URLSearchParams();

    // params.append("page", "18"); //你要传给后台的参数值 key/value
    // params.append("count", "20");

    this.$axios({
      method: "post",
      url: url,
      // data: params
    })
      .then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.newsList = res.data.result;
        }
      })
      .catch(err => {
        Toast("新闻加载失败");
      });
  }
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 16px;
      text-overflow: ellipsis;
    }
    .mui-ellipsis {
      display: flex;
      font-size: 12px;
      color: #2262ff;
      justify-content: space-between;
      .mui-icon{
        font-size: 12px;
      }
    }
  }
}
</style>