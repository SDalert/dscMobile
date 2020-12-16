<!-- 分类头部 -->
<template>
  <div class="category-header">
    <header>
      <a
        href="javascript:;"
        class="iconfont icon-jiantou3"
        onclick="window.history.back()"
      ></a>
      <form action="">
        <input type="text" placeholder="请输入商品名称" @click="gotoSearch" />
        <i class="iconfont icon-sousuo2"></i>
      </form>
      <a href="javascript:;" v-if="showhide">
        <i
          class="iconfont"
          :class="
            this.$store.state.toggleFalg
              ? 'icon-leimupinleifenleileibie'
              : 'icon-leimupinleifenleileibie2'
          "
          @click="changeToggle()"
        ></i>
      </a>
    </header>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["showhide"],
  data() {
    //这里存放数据
    return {};
  },
  methods: {
    gotoSearch() {
      this.$router.push("/search");
    },
    changeToggle() {
      this.$store.commit("changeToggleFalg");
    },
  },
};
</script>
<style lang='less'>
.category-header {
  width: 100%;
  height: 5rem;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  position: fixed;
  z-index: 99;
  // margin-bottom: 5rem;
  header {
    height: 3rem;
    padding: 1rem 0;
    display: flex;
    a {
      width: 10%;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
    }
    form {
      position: relative;
      width: 85%;
      input {
        width: 100%;
        height: 3rem;
        border-radius: 1.5rem;
        border: 1px solid #ddd;
        text-indent: 1rem;
      }
      i {
        position: absolute;
        top: 0.7rem;
        right: 1.2rem;
        font-size: 1.6rem;
        color: #666;
      }
    }
  }
}
</style>