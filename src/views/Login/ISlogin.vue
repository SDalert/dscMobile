<!-- 判断登录方式 -->
<template>
  <div class="islogin-page">
    <div class="islogin-content">
      <div class="login-btn" @click="login(0)">短信登录</div>
      <div class="login-btn" @click="login(1)">密码登录</div>
    </div>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login(index) {
      this.$router.push("/login?page=" + index);
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
.islogin-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .islogin-content {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 10%;
    display: flex;
    .login-btn {
      width: 40%;
      height: 5rem;
      font-size: 2rem;
      text-align: center;
      background-color: yellow;
      line-height: 5rem;
      &:first-child {
        background-color: royalblue;
      }
    }
  }
}
</style>