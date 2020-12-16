<!-- 海报 -->
<template>
  <div>
    <div class="share-poster" v-if="sharePoster">
      <div class="close-poster" @click="changePoster">
        <img src="@/assets/poster-close.png" alt="" />
      </div>
      <div class="poster">
        <img :src="posterDatas.image" alt="" />
        <div class="poster-title">{{ posterDatas.title }}</div>
        <div class="poster-price">
          <span class="now-price">${{ posterDatas.price }}</span>
          <span class="mark-price">${{ posterDatas.dprice }}</span>
        </div>
      </div>
      <div class="text">长按保存到相册</div>
    </div>
    <div class="carate-poster">
      <!-- 画布海报 -->
      <canvas ref="canvas"> </canvas>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    sharePoster: Boolean,
    posterDatas: Object,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    sharePoster() {
      if (this.sharePoster) {
        this.savePoster();
      }
    },
  },
  //方法集合
  methods: {
    changePoster() {
      //   this.sharePoster = false;
      this.$emit("changePoters", false);
    },
    savePoster() {
      // console.log("点击了海报");
      // console.log(this.$refs.canvas);
      var canvas = this.$refs.canvas;
      var ctx = canvas.getContext("2d");
      console.log(ctx);
      // 屏幕的宽度
      var Width = window.screen.availWidth;
      // 屏幕的高度
      var Height = window.screen.availHeight;
      // 像素比
      var devicePixelRatio = window.devicePixelRatio || 1;
      // 在画布canvas context中存在一个webkitBackingStorePixlRatio的属性  该属性的值决定了浏览器在渲染canvas之前会用几个像素来存储画布信息
      let backingPixelRatio = ctx.webkitBackingStorePixlRatio || 1;
      let ratio = devicePixelRatio / backingPixelRatio;
      console.log(ratio);
      console.log(Width);
      console.log(Height);
      console.log(devicePixelRatio);
      console.log(Width * ratio);
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
.share-poster {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  .poster {
    width: 70%;
    height: 70%;
    background-color: #fff;
    margin-left: 15%;
    position: absolute;
    top: 15%;
    img {
      width: 100%;
    }
    .poster-title {
      font-size: 1.5rem;
      overflow: hidden;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      text-indent: 2rem;
    }
    .poster-price {
      .now-price {
        color: rgb(242, 14, 40);
        font-size: 1.6rem;
        font-weight: 700;
      }
      .mark-price {
        font-size: 1.4rem;
        color: rgb(153, 153, 153);
        text-decoration: line-through;
      }
    }
  }
  .close-poster {
    position: absolute;
    top: 6rem;
    right: 6rem;
    img {
      width: 3rem;
    }
  }
  .text {
    width: 50%;
    text-align: center;
    font-size: 1rem;
    position: absolute;
    bottom: 10%;
    color: #fff;
    margin-left: 25%;
  }
}
</style>