<!-- 公共列表 -->
<template>
  <div class="list-page">
    <ul class="list_content">
      <li v-for="(value, index) in listDatas" :key="index" class="list_item">
        <router-link :to="'/goodsdetail/' + value.goods_id">
          <img :src="value.goods_img || value.img" alt="" />
          <div class="list_info">
            <span>{{ value.title || value.user_name }}</span>
            <div class="list_price">
              <em>¥</em>
              <span>{{
                value.goods_name || value.shop_price.slice(0, -2)
              }}</span>
              <em>00</em>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    listDatas: Array,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.list-page {
  margin: 1rem 1rem 0;
  .list_content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .list_item {
      width: 48.5%;
      background-color: #fff;
      border-radius: 1rem;
      margin-bottom: 2.5%;
      overflow: hidden;
      position: relative;
      img {
        display: block;
        width: 100%;
      }
      .list_info {
        padding: 1.5rem;
        > span {
          font-size: 1.5rem;
          color: #000;
          font-weight: 500;
          height: 4.2rem;
          line-height: 2.1rem;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          -webkit-box-orient: vertical;
        }
        .list_price {
          font-weight: 700;
          display: block;
          font-size: 0;
          color: rgb(242, 14, 40);
          span {
            font-size: 1.8rem;
          }
          em {
            font-size: 1.26rem;
            font-style: normal;
          }
        }
      }
    }
  }
}
</style>