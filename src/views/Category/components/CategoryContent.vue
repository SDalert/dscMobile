<!-- 内容部分 -->
<template>
  <div class="category-content">
    <CategoryLeft :categoryLeftDatas="categoryLeftDatas"></CategoryLeft>
    <Loading v-if="this.$store.state.loadingFalg"></Loading>
    <CategoryRight
      :categoryRightDatas="categoryRightDatas"
      v-else
    ></CategoryRight>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CategoryLeft from "./CategoryLeft";
import CategoryRight from "./CategoryRight";
import Loading from "@/components/Loading.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CategoryLeft,
    CategoryRight,
    Loading,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    categoryLeftDatas() {
      return this.$store.state.categoryLeftDatas;
    },
    categoryRightDatas() {
      return this.$store.state.getCategoryRight;
    },
  },
  mounted() {
    // console.log(this.$store);
    this.$store.dispatch("actChangeCategoryLeft");
    this.$store.dispatch("actChangeCategoryRight", "858");
  },

  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）

  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.category-content {
  background-color: #fff;
  margin: 5rem 0 5rem 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  height: calc(100% - 10rem);
  display: flex;
  overflow: hidden;
  border-top: 1px solid #efefef;
}
</style>