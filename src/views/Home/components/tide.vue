<!--  -->
<template>
  <div class="tide_list">
    <mt-swipe :auto="0" :continuous="false">
      <mt-swipe-item v-for="(item, index) in imgData" :key="index">
        <ul>
          <router-link
            v-for="(value, index) in item"
            :key="index"
            tag="li"
            to=""
          >
            <img :src="value.imgSrc" alt="" />
            <span>{{ value.title }}</span>
          </router-link>
        </ul>
      </mt-swipe-item>
    </mt-swipe>
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
      imgData: [
        [
          {
            imgSrc: require("../../../images/cl1.png"),
            title: "潮流服饰",
          },
          {
            imgSrc: require("../../../images/cl2.png"),
            title: "箱包配饰",
          },
          {
            imgSrc: require("../../../images/cl3.png"),
            title: "美容护肤",
          },
          {
            imgSrc: require("../../../images/cl4.png"),
            title: "母婴儿童",
          },
          {
            imgSrc: require("../../../images/cl5.png"),
            title: "手机数码",
          },
          {
            imgSrc: require("../../../images/cl6.png"),
            title: "微社区",
          },
          {
            imgSrc: require("../../../images/cl7.gif"),
            title: "拼团",
          },
          {
            imgSrc: require("../../../images/cl8.gif"),
            title: "预售",
          },
          {
            imgSrc: require("../../../images/cl9.png"),
            title: "拍卖",
          },
          {
            imgSrc: require("../../../images/cl10.gif"),
            title: "超值礼包",
          },
        ],
        [
          {
            imgSrc: require("../../../images/cl11.png"),
            title: "家居装修",
          },
          {
            imgSrc: require("../../../images/cl12.png"),
            title: "休闲零食",
          },
          {
            imgSrc: require("../../../images/cl13.png"),
            title: "水果生鲜",
          },
          {
            imgSrc: require("../../../images/cl14.png"),
            title: "萌宠",
          },
          {
            imgSrc: require("../../../images/cl15.png"),
            title: "大家电",
          },
          {
            imgSrc: require("../../../images/cl16.png"),
            title: "店铺街",
          },
          {
            imgSrc: require("../../../images/cl17.png"),
            title: "品牌特卖",
          },
          {
            imgSrc: require("../../../images/cl18.png"),
            title: "天天特价",
          },
          {
            imgSrc: require("../../../images/cl19.png"),
            title: "限时团购",
          },
          {
            imgSrc: require("../../../images/cl20.png"),
            title: "积分商城",
          },
        ],
        [
          {
            imgSrc: require("../../../images/cl31.png"),
            title: "限时秒杀",
          },
          {
            imgSrc: require("../../../images/cl32.png"),
            title: "到家020",
          },
          {
            imgSrc: require("../../../images/cl33.png"),
            title: "拍卖",
          },
          {
            imgSrc: require("../../../images/cl34.png"),
            title: "促销活动",
          },
          {
            imgSrc: require("../../../images/cl35.png"),
            title: "礼品鲜花",
          },
          {
            imgSrc: require("../../../images/cl36.png"),
            title: "玩具乐器",
          },
          {
            imgSrc: require("../../../images/cl37.png"),
            title: "文化娱乐",
          },
          {
            imgSrc: require("../../../images/cl38.png"),
            title: "母婴童装",
          },
          {
            imgSrc: require("../../../images/cl39.png"),
            title: "饮料专区",
          },
          {
            imgSrc: require("../../../images/cl40.png"),
            title: "店铺列表",
          },
        ],
      ],
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
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.tide_list {
  margin: 1rem 1rem 0;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
  background-color: #fff;
  height: 20.8rem;
  .mint-swipe-item {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    ul {
      padding-bottom: 30px;
      overflow: hidden;

      li {
        width: 20%;
        float: left;
        text-align: center;

        img {
          width: 100%;
          height: auto;
          display: block;
        }

        span {
          display: block;
          margin-top: 0.2rem;
          font-size: 1.3rem;
          height: 1.6rem;
          color: #000;
        }
      }
    }
  }
  .mint-swipe-indicators {
    width: 4.5rem;
    left: 50%;
    opacity: 1 !important;
    .mint-swipe-indicator {
      width: 1.5rem !important;
      height: 0.4rem !important;
      border-radius: 0;
      margin: 0;
      background: linear-gradient(-88deg, #ff4f2d, #f91f27);
      &.is-active {
        width: 1.5rem !important;
        height: 0.4rem !important;
        background: linear-gradient(-88deg, #ff4f2d, #f91f27);
        opacity: 1;
        border-radius: 1rem;
      }
    }
  }
}
</style>