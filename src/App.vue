<template>
  <div class="app-contrainer">
    <!-- 加载项目的头部header -->
    <mt-header fixed title="趣事多">
      <span to="/" slot="left">
        <mt-button icon="back" @click="goback" v-show="flag">返回</mt-button>
      </span>
    </mt-header>

    <!-- 加载路由组件router-view 区域 -->

    <transition>
      <router-view></router-view>
    </transition>

    <!-- 加载项目的底部bottom -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-cc" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-cc" to="/menber">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-cc" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="token">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-cc" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  created(){
    //因为flag默认为false,如果不在首页，然后刷新页面，此时返回按钮也会消失
    this.flag =(this.$route.path === '/home' )? false : true
  },
  methods: {
    goback() {
      //返回功能
      this.$router.go(-1);
    }
  },
  watch: {
    //监听路由是否为根路径,如果是就隐藏返回按钮
    "$route.path": function(newVal) {
      if (newVal === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-contrainer {
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50px;
  .mui-bar {
    touch-action: none;
  }
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

// 修改类名，解决tabbar点击无法切换的问题

.mui-bar-tab .mui-tab-item-cc.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-cc {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-cc .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-cc .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>