<!-- 搜索页面 -->
<template>
  <div class="search-page">
    <div class="category-header">
      <header>
        <a
          href="javascript:;"
          class="iconfont icon-jiantou3"
          onclick="window.history.back()"
        ></a>
        <form action="">
          <input type="text" placeholder="请输入商品名称" v-model="keywords" />
          <i class="iconfont icon-sousuo2" @click="searchList"></i>
        </form>
      </header>
      <div>
        <div class="search_content">
          <div class="search_title">
            <div>最近搜索</div>
            <i class="iconfont icon-shanchu1" @click="deleKeywords"></i>
          </div>
          <ul class="search_list">
            <li v-if="keywordDatas.length == 0">暂无</li>
            <li
              v-else
              v-for="(keywordData, index) in keywordDatas"
              :key="index"
            >
              <router-link :to="'/searchlist?keywords=' + keywordData">
                {{ keywordData }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="search_content">
          <div class="search_title">
            <div>热门搜索</div>
          </div>
          <ul class="search_list">
            <li>手机</li>
            <li>手机</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "@/components/footer.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Footer,
  },
  data() {
    //这里存放数据
    return {
      keywords: "",
    };
  },
  //监听属性 类似于data概念
  computed: {
    keywordDatas() {
      return this.$store.state.searchKeywords;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    searchList() {
      if (this.keywords) {
        this.$store.commit("searchKeywords", this.keywords);
        this.$router.push("/searchlist?keywords=" + this.keywords);
      }
    },
    deleKeywords() {
      this.$store.state.searchKeywords = [];
      localStorage.setItem("keywords", []);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.search-page {
  .search_content {
    width: calc(100% - 2rem);
    padding: 1.5rem 1rem 0;
    background-color: #fff;
    border-top: 1px solid #f1f1f1;
    .search_title {
      display: flex;
      justify-content: space-between;
      padding-bottom: 1rem;
      font-size: 1.5rem;
      color: #232326;
    }
    .search_list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      li {
        height: 2rem;
        line-height: 2rem;
        color: #686868;
        padding: 0 1rem;
        background-color: #f0f2f5;
        border-radius: 3px;
        font-size: 1.3rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>