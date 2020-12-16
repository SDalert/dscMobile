<!--  -->
<template>
  <div class="category-list">
    <Loading v-if="this.$store.state.loadingFalg"></Loading>
    <CategoryHeader :showhide="showhide"></CategoryHeader>
    <div :style="{ height: oH }" v-infinite-scroll="loadMore">
      <div class="tabs-wrap">
        <ul ref="tabs_wrap">
          <li class="active" @click="changeZonghe">
            <span>综合</span>
            <i
              :class="
                ZongheFlag
                  ? 'iconfont icon-iconfontjiantou'
                  : 'iconfont icon-jiantou'
              "
            ></i>
          </li>
          <li @click="changeNews">
            <span>新品</span>
            <i></i>
          </li>
          <li @click="changeSale">
            <span>销量</span>
            <i></i>
          </li>
          <li @click="changePrice">
            <span>价格</span>
            <i
              :class="
                shopPrice
                  ? 'iconfont icon-iconfontjiantou'
                  : 'iconfont icon-jiantou'
              "
            ></i>
          </li>
          <li @click="showMask = !showMask">
            <i class="iconfont icon-daipingjia"></i>
            <span>筛选</span>
          </li>
        </ul>
      </div>
      <div :class="this.$store.state.toggleFalg ? 'list-wrap' : 'list-wrap2'">
        <ul ref="ul_wrap">
          <li
            v-for="categoryListData in categoryListDatas"
            :key="categoryListData.goods_id"
          >
            <router-link :to="'/goodsdetail/' + categoryListData.goods_id">
              <img :src="categoryListData.goods_thumb" alt="" />
              <div>
                <span class="list_title">{{
                  categoryListData.goods_name
                }}</span>
                <div class="price">
                  <span class="list_p">¥</span>
                  <span class="list_price">{{
                    categoryListData.shop_price.slice(0, -3)
                  }}</span>
                  <span class="list_p">.00</span>
                </div>
                <div class="outer">
                  <span class="tag">进店</span>
                  <span>
                    <i>{{ categoryListData.sale }}</i>
                    人已购买
                  </span>
                  <span class="iconfont icon-gouwuche"> </span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="nomore" v-if="this.$store.state.nomore">没有更多了</div>
      </div>
    </div>
    <transition name="dsc">
      <div class="mask" v-if="showMask">
        <div class="title">
          <span>自营产品</span>
        </div>
        <ul class="store">
          <li>仅看有货</li>
          <li>促销</li>
        </ul>
        <div class="price">
          <div class="price_title">价格区间</div>
          <div class="shop_price">
            <input type="text" v-model="min" placeholder="最低价" />
            <input type="text" v-model="max" placeholder="最高价" />
          </div>
        </div>
        <div class="button">
          <div class="close" @click="showMask = !showMask">关闭</div>
          <div class="enter" @click="enter">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CategoryHeader from "../Category/components/CategoryHeader";
import Loading from "@/components/Loading.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CategoryHeader,
    Loading,
  },
  data() {
    //这里存放数据
    return {
      showhide: true,
      toggleList: true,
      //   cat_id: 1131,
      size: 10,
      page: 1,
      sort: " goods_id",
      order: "desc",
      min: "",
      max: "",
      ZongheFlag: true,
      shopPrice: true,
      showMask: false,
      oH: 0,
      first: 1,
      keywords: "",
    };
  },
  computed: {
    categoryListDatas() {
      return this.$store.state.categoryListDatas;
    },
  },
  //监控data中的数据变化
  watch: {
    // 监视cat_id的变化
    // cat_id: function () {
    //   this.$store.state.categoryListDatas = [];
    //   this.$store.state.nomore = false;
    // },
  },
  //方法集合
  methods: {
    listDatas() {
      let params = {
        url: "/catalog/goodslist",
        params: {
          //   cat_id: this.cat_id,
          size: this.size,
          page: this.page,
          sort: this.sort,
          order: this.order,
          min: this.min,
          max: this.max,
          keywords: this.keywords,
        },
        type: "post",
      };
      console.log(456789);
      this.$store.dispatch("actChangegetCategoryList", params);
    },
    changeZonghe() {
      this.$store.state.categoryListDatas = [];
      this.$store.state.nomore = false;
      this.page = 1;
      this.first = true;
      this.ZongheFlag = !this.ZongheFlag;
      this.shopPrice = true;
      this.sort = "goods_id";
      if (this.ZongheFlag) {
        this.order = "desc";
        this.listDatas();
      } else {
        this.order = "asc";
        this.listDatas();
      }
    },
    changeNews() {
      this.$store.state.categoryListDatas = [];
      this.$store.state.nomore = false;
      this.page = 1;
      this.first = true;
      this.ZongheFlag = true;
      this.shopPrice = true;
      this.sort = "last_update";
      this.order = "desc";
      this.listDatas();
    },
    changeSale() {
      this.$store.state.categoryListDatas = [];
      this.$store.state.nomore = false;
      this.page = 1;
      this.first = true;
      this.ZongheFlag = true;
      this.shopPrice = true;
      this.sort = "sales_volume";
      this.order = "desc";
      this.listDatas();
    },
    changePrice() {
      this.$store.state.categoryListDatas = [];
      this.$store.state.nomore = false;
      this.page = 1;
      this.first = true;
      this.ZongheFlag = true;
      this.$store.state.loadingFalg = false;
      this.shopPrice = !this.shopPrice;
      if (this.shopPrice) {
        this.sort = "shop_price";
        this.order = "desc";
        this.listDatas();
      } else {
        this.sort = "shop_price";
        this.order = "asc";
        this.listDatas();
      }
    },
    enter() {
      this.$store.state.categoryListDatas = [];
      this.page = 1;
      this.listDatas();
      this.showMask = !this.showMask;
    },
    noData() {
      if (this.first) {
        this.$store.state.categoryListDatas = [];
        this.$store.state.nomore = false;
        this.page = 1;
      }
      this.first = false;
    },
    loadMore() {
      this.listDatas();
      this.page++;
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$store.state.categoryListDatas = [];
    this.keywords = this.$route.query.keywords;
    let that = this;
    for (let i = 0; i < this.$refs.tabs_wrap.children.length - 1; i++) {
      this.$refs.tabs_wrap.children[i].onclick = function () {
        for (var j = 0; j < that.$refs.tabs_wrap.children.length - 1; j++) {
          that.$refs.tabs_wrap.children[j].setAttribute("class", "");
        }
        this.setAttribute("class", "active");
      };
    }
    window.addEventListener("scroll", this.noData, false);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    this.oH = this.$refs.ul_wrap.offsetHeight + "px";
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    window.removeEventListener("scroll", this.noData, false);
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.category-list {
  .dsc-enter,
  .dsc-leave-to {
    transform: translateX(100%);
  }
  .dsc-enter-active,
  .dsc-leave-active {
    transition: all 0.2s;
  }
  .nomore {
    font-size: 1.4rem;
    height: 4.4rem;
    line-height: 4.4rem;
    text-align: center;
  }
  .mask {
    width: 100vh;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: #f6f6f9;
    overflow: hidden;
    .title {
      background-color: #fff;
      width: 100%;
      margin-bottom: 1.5rem;
      padding: 1rem;
      line-height: 2rem;
      font-size: 1.4rem;
    }
    .store {
      background-color: #fff;
      margin-bottom: 1.5rem;
      padding: 1rem 0 1rem;
      font-size: 1.4rem;
      overflow: hidden;
      li {
        height: 2.5rem;
        float: left;
        margin-left: 1rem;
        color: #666;
        background-color: #f7f7f7;
        padding: 0.5rem 3rem;
        text-align: center;
        line-height: 2.5rem;
        border-radius: 0.3rem;
      }
    }
    .price {
      margin-bottom: 1.5rem;
      background-color: #fff;
      .price_title {
        padding: 1rem;
        line-height: 2rem;
        color: #333;
        font-size: 1.6rem;
        overflow: hidden;
        border-bottom: 1px solid #f7f7f7;
      }
      .shop_price {
        width: 100%;
        padding: 1rem;
        line-height: 2rem;
        input {
          width: 13rem;
          background-color: #f7f7f7;
          padding: 1.3rem 1.5rem;
          text-align: center;
          margin-left: 1rem;
        }
      }
    }
    .button {
      height: 4.9rem;
      line-height: 4.9rem;
      font-size: 1.6rem;
      text-align: center;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      .close {
        background-color: #fff;
        color: #333;
        flex: 1;
        box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.07);
      }
      .enter {
        background-color: #e93b3d;
        color: #fff;
        flex: 1;
      }
    }
  }
  .tabs-wrap {
    width: 100%;
    background-color: #fff;
    position: relative;
    top: 5rem;
    left: 0;
    height: 3.5rem;
    line-height: 3.5rem;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        color: #333;
        font-size: 1.3rem;
        i {
          font-size: 1rem;
          margin: 0 0.3rem 0 0;
        }
        &.active {
          color: #f92028;
        }
      }
    }
  }
  .list-wrap {
    z-index: 1;
    width: 100%;
    position: relative;
    left: 0;
    top: 5.5rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        margin: 0 0.4rem;
        margin-bottom: 1rem;
        width: calc(50% - 0.8rem);
        border-radius: 0.5rem;
        overflow: hidden;
        img {
          width: 17.8rem;
          height: 17.8rem;
        }
        .list_title {
          font-size: 1.4rem;
          height: 3.8rem;
          line-height: 1.9rem;
          overflow: hidden;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .price {
          padding: 0.6rem 0.6rem 0.8rem;
          font-size: 1.6rem;
          font-weight: 700;
          color: rgb(242, 14, 40);
          .list_p {
            font-size: 1.12rem;
          }
        }
        .outer {
          display: flex;
          justify-content: space-around;
          padding: 0 0 0.5rem 0;
          .tag {
            background-color: #fef0f0;
            padding: 0.1rem 0.5rem;
            border-radius: 0.2rem;
            color: #f92028;
            font-size: 1.3rem;
          }
          span {
            font-size: 1.2rem;
            color: #999;
            i {
              font-style: normal;
            }
          }
          .icon-gouwuche {
            font-size: 1.4rem;
            color: #f92028;
          }
        }
      }
    }
  }
  .list-wrap2 {
    width: 100%;
    position: relative;
    top: 5rem;
    left: 0;
    z-index: 1;
    overflow: hidden;
    ul {
      padding: 0 0.7rem;
      a {
        background-color: #fff;
        overflow: hidden;
        padding: 0.8rem;
        border-radius: 0.5rem;
        margin: 0.5rem;
        display: flex;
        img {
          width: 9rem;
          height: 9rem;
          margin-right: 1rem;
        }
        .list_title {
          font-size: 1.4rem;
          height: 3.8rem;
          line-height: 1.9rem;
          overflow: hidden;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .price {
          padding: 0.6rem 0.6rem 0.8rem;
          font-size: 1.6rem;
          font-weight: 700;
          color: rgb(242, 14, 40);
          .list_p {
            font-size: 1.12rem;
          }
        }
        .outer {
          display: flex;
          justify-content: space-around;
          padding: 0 0 0.5rem 0;
          .tag {
            background-color: #fef0f0;
            padding: 0.1rem 0.5rem;
            border-radius: 0.2rem;
            color: #f92028;
            font-size: 1.3rem;
          }
          span {
            font-size: 1.2rem;
            color: #999;
            i {
              font-style: normal;
            }
          }
          .icon-gouwuche {
            font-size: 1.4rem;
            color: #f92028;
          }
        }
      }
    }
  }
}
</style>