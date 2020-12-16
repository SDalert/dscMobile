<!--  -->
<template>
  <div class="homeNews-page">
    <!-- 商城热点 -->
    <div class="hot_shop">
      <img :src="title_img" alt="" class="hot_img" />
      <div class="hot_title" ref="title_ul" :class="{ tran: flag }">
        <span v-for="value in title_data" :key="value.id">
          {{ value.title }}
        </span>
      </div>
      <span class="iconfont icon-jiantou1"></span>
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
    return {
      title_img: require("../../../images/hot_shop.png"),
      title_data: [
        {
          id: 1,
          title: "三大国际腕表品牌签约",
        },
        {
          id: 2,
          title: "我们成为中国最大家电零售B2B2C系统",
        },
        {
          id: 3,
          title: "服务店突破2000多家",
        },
      ],
      timer: null,
      flag: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    atuoTitle() {
      //   console.log(this.$refs.title_ul);
      this.flag = true;
      let title_ul = this.$refs.title_ul;
      title_ul.style.top = "-3.6rem";
      setTimeout(() => {
        // this.title_data.push(this.title_data[0]);
        // this.title_data.shift();
        this.title_data.push(this.title_data.shift());
        title_ul.style.top = "0rem";
        this.flag = false;
      }, 500);
    },
  },
  mounted() {
    this.timer = setInterval(this.atuoTitle, 2000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang='less'>
.homeNews-page {
  /*商城热点*/
  .hot_shop {
    height: 5rem;
    margin: 0 1rem;
    border-radius: 0 0 1rem 1rem;
    padding: 0.7rem 1rem;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      top: 1px;
      left: 1rem;
      right: 1rem;
      height: 1px;
      background-color: #ededed;
    }

    .hot_img {
      height: 86%;
      margin-right: 0.8rem;
      display: block;
      flex-grow: 0;
    }

    .hot_title {
      font-size: 1.3rem;
      line-height: 3.6rem;
      font-weight: 700;
      flex-grow: 1;
      position: relative;
      top: 0;
      left: 0;
      span {
        display: block;
      }
    }
    .tran {
      transition: all 0.5s linear;
    }
    .iconfont {
      flex-grow: 0;
      color: #f10d23;
    }
  }
}
</style>