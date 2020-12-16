<!-- 左边 -->
<template>
  <div class="category-left" id="wrapper1">
    <ul>
      <li
        v-for="categoryLeftData in categoryLeftDatas"
        :key="categoryLeftData.cat_id"
        @click="changeTab(categoryLeftData)"
      >
        <p
          :class="{
            active: $store.state.cat_id == categoryLeftData.cat_id,
          }"
        >
          {{ categoryLeftData.cat_name }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from "better-scroll";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    categoryLeftDatas: Array,
  },
  data() {
    //这里存放数据
    return {
      leftScroll: null,
    };
  },
  //监听属性 类似于data概念

  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changeTab(categoryLeftData) {
      console.log(categoryLeftData.cat_id);
      this.$store.dispatch("actChangeCategoryRight", categoryLeftData.cat_id);
    },
    scrollPageL() {
      this.leftScroll = new BScroll("#wrapper1", {
        pullUpLoad: true,
        scrollbar: false,
        pullDownRefresh: true,
        click: true,
      });
    },
  },
  mounted() {
    this.scrollPageL();
  },
};
</script>
<style lang='less'>
.category-left {
  height: 100%;
  border-right: 1px solid #efefef;
  ul {
    width: 8.4rem;
    li {
      height: 2rem;
      padding: 0.9rem 0;
      text-align: center;
      p {
        font-size: 1.3rem;
        color: #999;
        display: block;
        &.active {
          border-left: 0.25rem solid #f23030;
          color: #f23030;
        }
      }
    }
  }
}
</style>