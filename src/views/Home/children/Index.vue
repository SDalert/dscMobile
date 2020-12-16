<!--  -->
<template>
  <div
    class="index-page"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="0"
  >
    <Loading v-if="LoadingFlag"></Loading>
    <div class="index-header" :style="colorObj"></div>
    <div class="swiper-page">
      <Swiper @changeColor="getColor"></Swiper>
    </div>
    <div class="tide-page">
      <Tide></Tide>
      <HomeNews></HomeNews>
    </div>
    <div class="discounts_img">
      <img :src="discounts_img" alt="" />
    </div>
    <div class="seckill-page">
      <Seckill></Seckill>
    </div>
    <div class="product">
      <ul class="product_nav">
        <li
          v-for="(value, index) in productTab"
          :key="index"
          @click="changeTab(index, value.url, value.type)"
        >
          <span>{{ value.name }}</span>
          <p :class="{ active: productIndex == index }">{{ value.title }}</p>
        </li>
      </ul>
    </div>

    <div>
      <List :listDatas="listDatas"></List>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Swiper from "../../../components/Swiper.vue";
// 引入潮流服饰
import Tide from "../components/tide.vue";
// 商城热点
import HomeNews from "../components/HomeNews";
// 限时秒杀
import Seckill from "../components/seckill";
// 公共列表
import List from "@/components/List";
// 导入api
import { getHomeList } from "@/api/api";
import Loading from "@/components/Loading.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Swiper,
    Tide,
    HomeNews,
    Seckill,
    List,
    Loading,
  },
  data() {
    //这里存放数据
    return {
      LoadingFlag: false,
      discounts_img: require("@/images/limit.png"),
      colorObj: {
        backgroundColor: "#ec5151",
      },
      colorArry: [
        {
          backgroundColor: "#ec5151",
        },
        {
          backgroundColor: "rgb(228, 49, 36)",
        },
        {
          backgroundColor: "rgb(60, 129, 255)",
        },
        {
          backgroundColor: "rgb(2, 131, 121)",
        },
        {
          backgroundColor: "rgb(64, 145, 255)",
        },
      ],
      listDatas: [],
      page: 1,
      size: 10,
      type: "is_best",
      url: "/goods/type_list",
      productIndex: 0,
      productTab: [
        {
          name: "精选",
          title: "为你推荐",
          url: "/goods/type_list",
          type: "is_best",
        },
        {
          name: "社区",
          title: "新奇好物",
          url: "/discover/find_list",
          type: "",
        },
        {
          name: "新品",
          title: "潮流上新",
          url: "/goods/type_list",
          type: "is_new",
        },
        {
          name: "热卖",
          title: "火热爆款",
          url: "/goods/type_list",
          type: "is_hot",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getColor(index) {
      this.colorObj = this.colorArry[index];
    },
    async getDatas(page, size, type, url) {
      this.LoadingFlag = true;

      let result = await getHomeList(
        url,
        {
          page: page,
          size: size,
          type: type,
        },
        "get"
      );
      this.LoadingFlag = false;
      this.listDatas = this.listDatas.concat(result.data);
    },
    changeTab(index, url, type) {
      this.productIndex = index;
      this.url = url;
      this.type = type;
      this.getDatas(this.page, this.size, this.type, this.url);
      this.page = 1;
      this.listDatas = [];
    },
    loadMore() {
      this.getDatas(this.page, this.size, this.type, this.url);
      this.page++;
    },
  },

  mounted() {
    this.getDatas(this.page, this.size, this.type, this.url);
  },
};
</script>
<style lang='less'>
.index-page {
  .index-header {
    height: 15rem;
    background: #ec5151;
    transition: all 1s;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    position: relative;
    top: -8.8rem;
    left: 0;
  }
  .swiper-page {
    margin-top: -14rem;
  }
  .tide-page {
    height: 25.8rem;
  }
  .discounts_img {
    padding: 1rem 1rem 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product {
    margin: 1rem 1rem 0;

    .product_nav {
      padding: 1rem 0;
      display: flex;
      justify-content: space-around;

      li {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        &::after {
          content: " ";
          position: absolute;
          height: 80%;
          width: 1px;
          right: 0;
          top: 10%;
          background-color: #ccc;
        }

        &:last-child {
          &::after {
            height: 0;
          }
        }

        span {
          font-weight: bold;
          font-size: 1.6rem;
          color: #333;
        }

        p {
          display: inline-block;
          border-radius: 1rem;
          font-size: 1.2rem;
          padding: 0.1rem 0.8rem;
          margin-top: 0.2rem;
          color: #888;

          &.active {
            color: #fff;
            background: linear-gradient(-88deg, #ff4f2e, #f91f28);
          }
        }
      }
    }
  }
}
</style>