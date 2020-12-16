<!--商品详情  -->
<template>
  <div class="detail-page">
    <!-- 详情头部 -->
    <div
      class="datail_header"
      id="title0"
      ref="header"
      :style="'background: hsla(0, 0%, 100%,' + navOpacity + ')'"
    >
      <div class="datail_left" onclick="window.history.back()">
        <i class="iconfont icon-jiantou3"></i>
      </div>
      <div class="datail_center" :style="'opacity:' + navOpacity">
        <ul>
          <li
            :class="navActive == index ? 'active' : ''"
            v-for="(navList, index) in navLists"
            :key="index"
            @click="changeActive(index)"
          >
            {{ navList }}
          </li>
        </ul>
      </div>
      <div class="datail_right" @click="showShare()">
        <i class="iconfont icon-xiaoxi"></i>
      </div>
    </div>
    <!-- 详情页轮播图 -->
    <div class="detail-swiper">
      <mt-swipe :auto="3000">
        <mt-swipe-item
          v-for="(detailData, index) in detailDatas.gallery_list"
          :key="index"
        >
          <img :src="detailData.img_url" alt="" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 详情页价格 -->
    <div class="detail-price">
      <div class="shop_price"><em>¥</em>{{ detailDatas.shop_price }}</div>
      <div class="market_price">{{ detailDatas.market_price_formated }}</div>
    </div>
    <!-- 详情页标题 -->
    <div class="detail-title">
      {{ detailDatas.goods_name }}
    </div>
    <!-- 销量 -->
    <div class="detail-outer">
      <div class="detail-volume">
        <span>累计销量</span>
        <span>{{ detailDatas.sales_volume }}</span>
      </div>
      <div class="detail.inventory">
        <span>库存</span>
        <span>{{ detailDatas.goods_number }}</span>
      </div>
      <div class="citys">
        <span>{{ detailDatasInfo.province_name }}</span>
        <span>{{ detailDatasInfo.city_name }}</span>
      </div>
    </div>
    <!-- 赠送积分 -->
    <div class="detail-integral">
      <span class="addInte">赠送积分: </span>
      <span>317</span>
      积分
    </div>
    <!-- 服务 -->
    <div class="detail-integral">
      <span class="addInte">服务: </span>
      <span>正品保证 七天无理由退换 闪速配送</span>
    </div>
    <!-- 选择省份 -->
    <div class="detail-selected" @click="changeShowAddress">
      <div class="name">
        <span class="nowName">送至</span>
        <span class="city">{{ province }}--{{ city }} --{{ county }}</span>
      </div>
      <i class="iconfont icon-jiantou1"></i>
    </div>
    <!-- 选择省份蒙版弹窗 -->
    <div class="addRess">
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="addRess_content">
          <div class="addRess_header">
            <span>所在地区</span>
            <i
              class="iconfont icon-round_delete"
              @click="changeShowAddress"
            ></i>
          </div>
          <div class="addRess_center">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
          </div>
        </div>
      </mt-popup>
    </div>
    <!-- 已选 -->
    <div class="detail-selected" @click="showMask">
      <div class="name">
        <span class="nowName">已选:</span>
        <span>{{ addNum }}</span>
      </div>
      <i class="iconfont icon-jiantou1"></i>
    </div>
    <!-- 蒙版 -->
    <div
      class="detail-mask2"
      :class="!showMaskFlag ? 'showHide' : ''"
      @click="close"
    ></div>
    <div class="detail-mask">
      <div class="detail-goods-info" :class="showMaskFlag ? 'trams' : ''">
        <div class="datail-goods-img">
          <div class="img">
            <img :src="detailDatas.goods_thumb" alt="" />
          </div>
          <div class="title">
            <div class="datail_name">{{ detailDatas.goods_name }}</div>
            <span class="attr-price">{{ detailDatas.shop_price }}</span>
            <span class="attr-stock">库存:{{ detailDatas.goods_number }}</span>
          </div>
          <i class="iconfont icon-chahao" @click="close"></i>
        </div>
        <div class="num">
          <span>数量</span>
          <div class="addNum">
            <a href="javascript:;" @click="reducemodelNum">-</a>
            <input type="text" v-model.number="addNum" />
            <a href="javascript:;" @click="addmodelNum">+</a>
          </div>
        </div>
        <div class="button">
          <div class="nowShop">立即购买</div>
          <div class="addShop" @click="addShop">加入购物车</div>
        </div>
      </div>
    </div>
    <!-- 详情页底部 -->
    <div class="detail-page-footer">
      <div>
        <i class="iconfont icon-dkw_xiaoxi"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="iconfont icon-shoucang1"></i>
        <span>收藏</span>
      </div>
      <div @click="tocart" class="cart">
        <i class="iconfont icon-gouwuche1"></i>
        <span>购物车</span>
        <em class="cartNum">{{ cartnum }}</em>
        <div :class="{ moveNum: aniFlag }" v-if="aniFlag">+{{ addNum }}</div>
      </div>
      <div class="addCart" @click="addShop">加入购物车</div>
      <div class="saleCart">立即购买</div>
    </div>
    <!-- tab切换 -->
    <div class="detail-tab" id="title1">
      <mt-navbar v-model="selected" class="detail-tab-header">
        <mt-tab-item id="tab1">商品详情</mt-tab-item>
        <mt-tab-item id="tab2">规格参数</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="detail-tab-content">
        <mt-tab-container-item
          id="tab1"
          v-html="detailDatas.desc_mobile"
        ></mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <table>
            <tr
              v-for="(attr_parameters, index) in detailDatas.attr_parameter"
              :key="index"
            >
              <td>{{ attr_parameters.attr_name }}</td>
              <td>{{ attr_parameters.attr_value }}</td>
            </tr>
          </table>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 商品评价 -->
    <div
      class="detail-appraise"
      style="height: 1000px; background: red"
      id="title2"
    >
      <h1>商品评价</h1>
    </div>
    <!-- 分享海报 -->
    <div class="share-mask" v-show="showShareMask" @click="shareMaskHide"></div>
    <div class="share-content" v-show="showShareMask">
      <div class="share-item" v-if="weixinShowHuide" @click="changeShareInfo">
        <div class="iconfont icon-weixin"></div>
        <div class="text">发送给好友</div>
      </div>
      <div class="share-item" @click="changePoster">
        <div class="iconfont icon-haibaofenxiang"></div>
        <div class="text">海报分享</div>
      </div>
    </div>
    <!-- 分享到朋友圈 -->
    <shareInfo
      @changeInfo="changeInfo"
      :showShareFalg="showShareFalg"
    ></shareInfo>
    <!-- 海报 -->
    <SharePoster
      :sharePoster="sharePoster"
      @changePoters="changePoters"
      :posterDatas="posterDatas"
    ></SharePoster>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import citys from "@/assets/json/city.json";
import debounce from "lodash.debounce";
import { isWeiXin } from "@/untils/index.js";
import shareInfo from "./components/ShareInfo";
import SharePoster from "./components/SharePoster";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    shareInfo,
    SharePoster,
  },
  data() {
    //这里存放数据
    return {
      province: "选择省份",
      city: "选择市",
      county: "选择县/区",
      goods_id: 1153,
      addNum: 1,
      showMaskFlag: true,
      selected: "tab1",
      popupVisible: false,
      navLists: ["商品", "详情", "评论"],
      navActive: 0,
      navOpacity: 0,
      showShareMask: false,
      weixinShowHuide: false,
      showShareFalg: false,
      sharePoster: false,
      aniFlag: false,
      slots: [
        {
          values: Object.keys(citys),
          flex: 1,
          defaultIndex: 0,
          className: "slot1",
        },
        {
          divider: true,
          content: "-",
          className: "slot2",
        },
        {
          values: [],
          flex: 1,
          className: "slot3",
          defaultIndex: 0,
        },
        {
          divider: true,
          content: "-",
          className: "slot4",
        },
        {
          values: [],
          className: "slot5",
          flex: 1,
          defaultIndex: 0,
        },
      ],
      aniTimer: null,
    };
  },
  //监听属性 类似于data概念
  computed: {
    detailDatas() {
      return this.$store.state.detailDatas;
    },
    detailDatasInfo() {
      return this.$store.state.detailDatasInfo;
    },
    posterDatas() {
      return this.$store.state.posterDatas;
    },
    cartnum() {
      let cartNum = 0;
      this.$store.state.cartDatas.map((item) => {
        cartNum += item.value;
      });
      return cartNum;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onValuesChange(example, data) {
      example.setSlotValues(1, Object.keys(citys[data[0]]));
      example.setSlotValues(2, citys[data[0]][data[1]]);
      this.province = data[0];
      this.city = data[1];
      this.county = data[2];
    },
    reqdetailDatas() {
      let params = {
        url: "/goods/show",
        params: {
          goods_id: this.goods_id,
        },
        type: "post",
      };
      this.$store.dispatch("actChangedetailDatas", params);
    },
    showMask() {
      this.showMaskFlag = !this.showMaskFlag;
    },
    close() {
      this.showMaskFlag = !this.showMaskFlag;
    },
    tocart() {
      this.$router.push("/cart");
    },
    changeShowAddress() {
      this.popupVisible = !this.popupVisible;
    },
    changeActive(index) {
      this.$nextTick(() => {
        this.navActive = index;
        let ele = document.querySelector("#title" + index);
        // console.log(ele);
        console.log(ele.offsetTop);
        console.log(window.scrollY);
        let top =
          ele.offsetTop - window.scrollY - this.$refs.header.offsetHeight;
        window.scrollBy({ top: top, left: 0, behavior: "smooth" });
      });
    },
    scrollOpacity() {
      let top = document.documentElement.scrollTop;
      var opacity = top / 200;
      opacity = opacity > 1 ? 1 : opacity;
      this.navOpacity = opacity;
    },
    scrollPage: debounce(function () {
      var headerHeight = this.$refs.header.offsetHeight;
      var titleArry = [];
      titleArry.push(document.querySelector("#title0"));
      titleArry.push(document.querySelector("#title1"));
      titleArry.push(document.querySelector("#title2"));
      const { scrollY } = window;

      titleArry.reduce((total, title, index) => {
        if (
          !document.querySelector("#title0") &&
          !document.querySelector("#title1") &&
          !document.querySelector("#title2")
        ) {
          return;
        }
        if (total) {
          console.log(total);
          return total;
        }
        if (scrollY + headerHeight < title.offsetTop + title.offsetHeight) {
          this.navActive = index;
          total = true;
        }
        return total;
      }, false);
    }, 500),
    showShare() {
      this.showShareMask = !this.showShareMask;
      if (!isWeiXin()) {
        this.weixinShowHuide = true;
      }
    },
    changeInfo(data) {
      this.showShareFalg = data;
    },
    changeShareInfo() {
      this.showShareMask = false;
      this.showShareFalg = true;
    },
    changePoster() {
      this.sharePoster = !this.sharePoster;
      this.showShareMask = !this.showShareMask;
    },
    changePoters(data) {
      this.sharePoster = data;
    },
    shareMaskHide() {
      this.showShareMask = !this.showShareMask;
    },
    reducemodelNum() {
      this.addNum--;
      if (this.addNum < 1) {
        this.addNum = 1;
      }
    },
    addmodelNum() {
      this.addNum++;
    },
    addShop() {
      this.showMaskFlag = true;
      this.aniFlag = true;
      this.aniTimer = setTimeout(() => {
        this.aniFlag = false;
      }, 2000);

      let detailDatas = this.$store.state.detailDatas;

      // 判断当前购物车中是否有数据
      var isCart = this.$store.state.cartDatas.find((item) => {
        if (item.goods_id == detailDatas.goods_id) {
          item.value = item.value + this.addNum;
        }
        return detailDatas.goods_id == item.goods_id;
      });
      // 如果购物车中没有数据
      if (!isCart) {
        var addCartDatas = {
          goods_id: detailDatas.goods_id,
          goods_name: detailDatas.goods_name,
          shop_price: detailDatas.shop_price,
          market_price: detailDatas.market_price,
          goods_thumb: detailDatas.goods_thumb,
          value: this.addNum,
          isSelect: true,
        };
      }
      this.$store.commit("changeCartDatas", addCartDatas);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let top = document.documentElement || document.body;
    top.scrollTop = 0;
    // console.log(this.$route.params);
    this.goods_id = this.$route.params.cid;
    this.reqdetailDatas();
    this.$nextTick(() => {
      this.slots[0].defaultIndex = 15;
    });
    document.addEventListener("scroll", this.scrollOpacity, false);
    document.addEventListener("scroll", this.scrollPage, false);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    document.removeEventListener("scroll", this.scrollPage, false);
    document.removeEventListener("scroll", this.scrollOpacity, false);
  }, //生命周期 - 销毁完成
};
</script>
<style lang='less'>
.detail-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @keyframes moveNum {
    0% {
      opacity: 0;
      top: 20%;
    }
    50% {
      opacity: 1;
      top: -100%;
    }
    100% {
      opacity: 0;
      top: -100%;
    }
  }
  .cart {
    position: relative;
    .moveNum {
      color: #e4393c;
      position: absolute;
      top: -20%;
      left: 40%;
      font-size: 1.8rem;
      font-weight: 700;
      animation: moveNum 1.5s linear;
      opacity: 0;
    }
  }
  .share-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .share-content {
    width: 100%;
    height: 8rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    z-index: 9991;
    .iconfont {
      color: #1ed76d;
      font-size: 3rem;
    }
    .text {
      font-size: 1.4rem;
    }
  }
  .addRess {
    .mint-popup {
      width: 100%;
      border-radius: 2rem 2rem 0 0;
      overflow: hidden;
    }
    .addRess_content {
      width: 100%;
      height: 49rem;
      background-color: #fff;
      .addRess_header {
        height: 5rem;
        text-align: center;
        position: relative;
        span {
          line-height: 5rem;
          font-size: 1.6rem;
          color: #333;
          font-weight: 700;
        }
        i {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 1.4rem;
          color: #999;
        }
      }
    }
  }
  .detail-price {
    padding: 1.1rem 1.1rem 0.8rem;
    background-color: #fff;
    display: flex;
    .shop_price {
      color: rgb(242, 14, 40);
      font-weight: 700;
      font-size: 2.4rem;
      em {
        font-style: normal;
        font-size: 1.6rem;
      }
    }
    .market_price {
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: rgb(153, 153, 153);
      margin-left: 8px;
      text-decoration: line-through;
    }
  }
  .detail-title {
    background-color: #fff;
    padding: 0 1.1rem 1.1rem;
    font-size: 1.5rem;
  }
  .detail-outer {
    background-color: #fff;
    padding: 0 1.1rem 1.1rem;
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 1.4rem;
  }
  .datail_header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 999;
    height: 4rem;
    line-height: 4rem;
    display: flex;
    justify-content: space-between;
    .datail_left {
      margin-left: 1.5rem;
      i {
        font-size: 1.5rem;
      }
    }
    .datail_center {
      width: 60%;
      ul {
        display: flex;
        justify-content: space-around;
        font-size: 1.5rem;
        li {
          width: 100%;
          text-align: center;
          line-height: 4rem;
          &.active {
            color: #f92028;
            border-bottom: 2px solid #f92028;
          }
        }
      }
    }
    .datail_right {
      margin-right: 1.5rem;
    }
  }
  .detail-swiper {
    width: 100%;
    height: 37.5rem;
    .mint-swipe {
      .mint-swipe-items-wrap {
        .mint-swipe-item {
          img {
            width: 100%;
            height: 37.5rem;
          }
        }
      }
    }
  }
  .detail-integral {
    padding: 1.3rem 1.5rem;
    border-bottom: 1px solid #f6f6f9;
    display: flex;
    background-color: #fff;
    margin-top: 0.8rem;
    align-items: center;
    .addInte {
      color: #999;
      font-size: 1.4rem;
    }
    span {
      color: #333;
      &:last-child {
        text-indent: 1rem;
      }
    }
  }
  .detail-selected {
    padding: 13px 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;
    align-items: center;
    .name {
      .nowName {
        color: #999;
        line-height: 24px;
        font-size: 14px;
      }
      span {
        color: #333;
      }
      .city {
        display: inline-block;
        text-indent: 1rem;
      }
    }
  }
  .showHide {
    display: block !important;
  }
  .trams {
    transform: translateY(50vh);
  }
  .detail-mask2 {
    display: none;
    position: fixed;
    top: 0;
    z-index: 99999;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
  }
  .detail-mask {
    position: fixed;
    bottom: 0;
    z-index: 99999;
    width: 100%;
    background-color: transparent;
    .detail-goods-info {
      height: 40vh;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      border-radius: 2rem 2rem 0 0;
      transition: all 0.5s;
      .datail-goods-img {
        width: 100%;
        display: flex;
        padding: 1.1rem;
        width: calc(100% - 2.2rem);
        .img {
          width: 9.2rem;
          height: 9.2rem;
          border-radius: 6px;
          position: relative;
          top: -3rem;
          img {
            width: 9.2rem;
            height: 9.2rem;
          }
        }
        .title {
          margin-left: 1.3rem;
          display: flex;
          flex-direction: column;
          .datail_name {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            padding-right: 1.5rem;
            line-height: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .attr-price {
            font-size: 1.8rem;
            color: #f92028;
          }
          .attr-stock {
            color: #888;
            font-size: 1.2rem;
            line-height: 1.5rem;
          }
        }
      }
      .num {
        padding: 1.1rem;
        line-height: 3rem;
        font-size: 1.4rem;
        display: flex;
        justify-content: space-between;
        span {
          color: #888;
          padding-left: 0.2rem;
        }
        .addNum {
          display: flex;
          a {
            display: inline-block;
            width: 30px;
            height: 30px;
            background-color: #f8f8f8;
            border: 1px solid #eee;
            text-align: center;
            line-height: 28px;
          }
          input {
            width: 60px;
            height: 28px;
            padding: 1px;
            border: 1px solid #eee;
            color: #666;
            text-align: center;
            line-height: 26px;
            border-width: 1px 0;
          }
        }
      }
      .button {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        .nowShop {
          flex: 1;
          background-color: #fba534;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 1.6rem;
          color: #fff;
        }
        .addShop {
          flex: 1;
          background-color: #f92028;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 1.6rem;
          color: #fff;
        }
      }
    }
  }
  .detail-page-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    color: #666;
    height: 50px;
    font-size: 10px;
    text-align: center;
    align-items: center;
    z-index: 999;
    div {
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
      i {
        font-size: 2.2rem;
      }
      .cartNum {
        min-width: 1.4rem;
        min-height: 1.4rem;
        border-radius: 1rem;
        background-color: #f44;
        font-size: 0.6rem;
        font-style: normal;
        color: #fff;
        position: absolute;
        top: -0.6rem;
        right: 0.8rem;
        line-height: 1.4;
        font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
      }
    }
    .addCart {
      width: 25%;
      color: #fff;
      background-color: #f44;
      border: 1px solid #f44;
      height: 100%;
      flex: 2;
      line-height: 50px;
      font-size: 1.6rem;
    }
    .saleCart {
      width: 25%;
      color: #fff;
      background-color: #ff976a;
      border: 1px solid #ff976a;
      flex: 2;
      line-height: 50px;
      font-size: 1.6rem;
      height: 100%;
    }
  }
  .detail-tab {
    margin-top: 0.8rem;
    .detail-tab-header {
      padding-bottom: 1rem;
      height: 4.4rem;
      a {
        padding: 0;
        &.is-selected {
          color: #f44;
          border-bottom: 0px solid #f92028;
          margin-bottom: 0;
          &::after {
            content: "";
            width: 5rem;
            height: 1px;
            display: block;
            background-color: #f92028;
            margin: 0rem auto;
          }
        }
        .mint-tab-item-label {
          font-size: 1.4rem;
          line-height: 4.4rem;
        }
      }
    }
    .detail-tab-content {
      background-color: #fff;
    }
    .mint-tab-container {
      .mint-tab-container-wrap {
        .mint-tab-container-item {
          padding: 1rem;
          width: calc(100% - 2rem);
          img {
            width: 100%;
          }
          .move-remove {
            display: none;
          }
          table {
            width: 100%;
            line-height: 18px;
            font-size: 1.2rem;
            border-collapse: collapse;
            td {
              padding: 8px;
              border: 1px solid #dadada;
              text-align: left;
              &:first-child {
                width: 20%;
              }
            }
          }
        }
      }
    }
  }
}
</style>