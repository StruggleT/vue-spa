<template>
  <div class="cmtcontainer">
    <h1>发表评论</h1>
    <hr />
    <textarea placeholder="请输入评论(最多120字)" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list" v-for="(item, i) in cmtList" :key="item.sid">
      <div class="cmt-item">
        <div
          class="cmt-header"
        >第{{i+1}}楼&nbsp;&nbsp;用户：{{item.name}}&nbsp;&nbsp;评论时间：{{item.passtime | dataFormat}}</div>
        <div class="cmt-body">{{item.text}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cmtList: [],
      page: 1,
      msg: '',
    };
  },
  created() {
    this.getCmtList();
  },
  methods: {
    getCmtList() {
      //渲染评论列表
      const url = "getJoke?page=" + this.page;
      var params = new URLSearchParams();
      // params.append("page", "1"); //你要传给后台的参数值 key/value
      params.append("count", "10");

      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          if (res.data.code === 200) {
            this.cmtList = this.cmtList.concat(res.data.result); //为了不覆盖加载之前的数据，拼接评论数组
          }
        })
        .catch(err => {
          Toast("评论加载失败");
        });
    },
    loadMore() {
      //加载评论
      this.page++;
      this.getCmtList();
    },
    postComment() {
      //发表评论 
      const url = "getWangYiNews";
      var params = new URLSearchParams();
      params.append("page", "1"); //你要传给后台的参数值 key/value
      params.append("count", "10");

      //判断用户是否输入为空
      if(this.msg.trim().length === 0) {
        Toast('请输入评论内容');
        return
      }
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          if (res.data.code === 200) {
            //手动拼接出一个评论对象
            var cmtObj = {
              name:'匿名用户',
              text: this.msg.trim(),
              passtime: new Date()
            }
            this.cmtList.unshift(cmtObj);
            this.msg = '';
          }
        })
        .catch(err => {
          Toast("评论发表失败");
        });
    } 
  }
};
</script>

<style lang="scss" scoped>
.cmtcontainer {
  h1 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-header {
        background-color: #ccc;
        line-height: 30px;
      }
      .cmt-body {
        line-height: 30px;
        text-indent: 2em;
      }
    }
  }
}
</style>