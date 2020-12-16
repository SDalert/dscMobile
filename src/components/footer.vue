<!--  -->
<template>
  <div class="footer-wrap">
    <ul>
      <router-link tag="li" to="/home">
        <div class="nav-img">
          <img
            src="../images/home1.png"
            alt=""
            v-if="!active.includes('/home')"
          />
          <img src="../images/home2.png" alt="" v-else />
        </div>
        <span>首页</span>
      </router-link>
      <router-link tag="li" to="/category">
        <div class="nav-img">
          <img
            src="../images/fennei1.png"
            alt=""
            v-if="active != '/category'"
          />
          <img src="../images/fennei2.png" alt="" v-else />
        </div>
        <span>分类</span>
      </router-link>
      <router-link tag="li" to="/find">
        <div class="nav-img">
          <img src="../images/faxian1.png" alt="" v-if="active != '/find'" />
          <img src="../images/faxian2.png" alt="" v-else />
        </div>
        <span>发现</span>
      </router-link>
      <router-link tag="li" to="/cart">
        <div class="nav-img">
          <img src="../images/gouwuche1.png" alt="" v-if="active != '/cart'" />
          <img src="../images/gouwuche2.png" alt="" v-else />
        </div>
        <span>购物车</span>
      </router-link>
      <router-link tag="li" to="/mine">
        <div class="nav-img">
          <img src="../images/wo1.png" alt="" v-if="active != '/mine'" />
          <img src="../images/wo2.png" alt="" v-else />
        </div>
        <span>我</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: "/home",
    };
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
  mounted() {
    this.active = this.$route.path;
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
 <style lang='less'>
.footer-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #e3e8ee;
  width: 100%;
  height: 5rem;
  display: flex;
  z-index: 999;
  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    li {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      align-items: center;
      flex: 1;
      img {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }
}
</style>