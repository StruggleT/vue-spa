<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in musicList" :key="item.songid">
        <span @click="getData(item.title,item.url,item.pic,item.author)">
          <img class="mui-media-object mui-pull-left" :src="item.pic" />
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span>歌手：{{item.author}}</span>
              <span>来自：{{item.type}}</span>
            </p>
          </div>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      musicList: [],
      value: this.$route.params.val
    };
  },
  created() {
    this.getMusic();
  },
  methods: {
    getMusic() {
    
      const url = "searchMusic?name=" + this.value;
      this.$axios({
        method: "get",
        url: url
      })
        .then(res => {
          if (res.data.code === 200) {
            this.musicList = res.data.result;
          }
        })
        .catch(err => {
          Toast("歌曲加载失败");
        });
    },
    getData(title, url, pic, author) {
      this.$router.push({
        path: "/search/musicdesc",
        query: { title, url, pic, author }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-ellipsis {
  display: flex;
  justify-content: space-between;
}
</style>