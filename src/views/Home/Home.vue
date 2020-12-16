<!--  -->
<template>
  <div class="home-page">
    <div class="home-header" ref="home_header">
      <header>
        <form action="">
          <input type="text" placeholder="搜索商品名称" />
          <i class="iconfont icon-sousuo2"></i>
        </form>
        <a href="" class="iconfont icon-xiaoxi"></a>
      </header>
    </div>
    <div class="navbar" ref="navbar">
      <ly-tab
        v-model="selectedId"
        :items="items"
        :options="options"
        @change="changeTab"
      >
      </ly-tab>
      <div class="category-btn">
        <i class="iconfont icon-fenlei"></i>
        <span>分类</span>
      </div>
    </div>
    <div class="bgcbox" v-if="this.$route.path != '/home/index'"></div>
    <div>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入footer组件
import Footer from "@/components/footer.vue";
// 引入首页头部
// import HomeHeader from "./components/HomeHeader.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Footer,
  },
  data() {
    //这里存放数据
    return {
      selectedId: 0,
      items: [
        { label: "首页" },
        { label: "家用电器" },
        { label: "男装女装" },
        { label: "鞋靴箱包" },
        { label: "手机数码" },
        { label: "电脑办公" },
        { label: "家居家纺" },
        { label: "个人化妆" },
      ],
      options: {
        activeColor: "#fff",
      },
      RouetrDates: [
        "/home/index",
        "/home/household",
        "/home/clothing",
        "/home/shoebag",
        "/home/mobilephones",
        "/home/computer",
        "/home/hometextiles",
        "/home/personalmakeup",
      ],
      homeFlag: false,
      setClass: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changeTab(items, index) {
      this.$router.push(this.RouetrDates[index]);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.RouetrDates.forEach((item, count) => {
      if (this.$route.path == item) {
        this.selectedId = count;
      }
    });
    let that = this;
    this.setClass = function () {
      if (document.documentElement.scrollTop > 150) {
        that.$refs.home_header.setAttribute("class", "home-header home_scroll");
        that.$refs.navbar.setAttribute("class", "navbar navbar_scroll");
      } else {
        that.$refs.home_header.setAttribute("class", "home-header ");
        that.$refs.navbar.setAttribute("class", "navbar");
      }
    };
    window.addEventListener("scroll", this.setClass, false);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    window.removeEventListener("scroll", this.setClass, false);
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.home-page {
  .home-header {
    width: 100%;
    height: 4.4rem;
    position: relative;
    top: 0;
    left: 0;
    // background-color: #ec5151;
    background-color: transparent;
    transition: all 0.5s;
    z-index: 99;
    &.home_scroll {
      position: fixed;
      background-color: #ec5151;
    }
    header {
      display: flex;
      form {
        width: 90%;
        position: relative;
        input {
          width: 100%;
          height: 3rem;
          margin-top: 0.7rem;
          border-radius: 1.5rem;
          margin-left: 1rem;
          text-indent: 1.5rem;
          width: calc(100% - 1rem);
        }
        i {
          position: absolute;
          right: 0;
          top: 0;
          width: 4.4rem;
          height: 4.4rem;
          text-align: center;
          line-height: 4.4rem;
          color: #999;
        }
      }
      a {
        display: block;
        width: 10%;
        height: 4.4rem;
        line-height: 4.4rem;
        text-align: center;
        color: #fff;
        font-size: 2rem;
      }
    }
  }
  .navbar {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    z-index: 999;
    background-color: transparent;
    transition: all 0.5s;
    &.navbar_scroll {
      position: fixed;
      background-color: #ec5151;
      top: 4.4rem;
    }
    .ly-tab {
      width: 85%;
      .ly-tabbar {
        height: 4.4rem;
        background-color: transparent;
        border: 0;
        box-shadow: 0 0 0 0;
        .ly-tab-list {
          a {
            color: #fff;
          }
        }
      }
    }
    .category-btn {
      width: 15%;
      height: 4.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      i {
        font-size: 2rem;
        box-shadow: -6px 0 4px -4px rgba(0, 0, 0, 0.4);
      }
    }
  }
  .bgcbox {
    width: 100%;
    height: 8.8rem;
    background: #ec5151;
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>