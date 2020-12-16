<!--  -->
<template>
  <div class="cart-page">
    <h1 class="cart">购物车页面</h1>
    <div class="cart-content" v-if="cartDatas.length > 0">
      <div
        class="cart_goods_item"
        v-for="(cartData, index) in cartDatas"
        :key="index"
      >
        <div class="cart_checked" @click="changeChecked(cartData, index)">
          <span
            class="iconfont icon-danxuankuang"
            v-if="!cartData.isSelect"
          ></span>
          <span
            class="iconfont icon-danxuankuangxuanzhong"
            style="color: #f44"
            v-else
          ></span>
        </div>
        <div class="cart_shop">
          <div class="cart_shop_img">
            <img :src="cartData.goods_thumb" alt="" />
          </div>
          <div class="cart_goods">
            <div class="cart_shop_title" @click="toDetail(cartData.goods_id)">
              {{ cartData.goods_name }}
            </div>
            <div class="cart_shop_info">
              <div class="price">
                <em>¥</em>
                <span>{{ cartData.shop_price.slice(0, -3) }}</span>
                <em>.00</em>
              </div>
              <div class="stepper">
                <button @click="downCartNum(index)">-</button>
                <input type="number" :value="cartData.value" />
                <button @click="addCartNum(index)">+</button>
                <div class="oper_icon">
                  <i class="iconfont icon-shoucang1"></i>
                  <i class="iconfont icon-shanchu" @click="deleCart(index)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nocart" v-else>
      <i class="iconfont icon-gouwuche"></i>
      <div class="nocart-title">
        购物车空空如也
        <router-link to="/home">去逛逛</router-link>
      </div>
    </div>
    <div class="cart-footer" v-if="cartDatas.length > 0">
      <div class="selectAll" @click="changeAllchecked">
        <i
          class="iconfont icon-danxuankuangxuanzhong"
          style="color: #f44"
          v-if="changeAll"
        ></i>
        <i class="iconfont icon-danxuankuang" v-else></i>

        <span class="checkedText">全选</span>
      </div>
      <div class="priceAll">
        <div class="priceAll_top">
          <span>合计：</span>
          <em>¥</em>
          <i>{{ total.toFixed(2) }}</i>
        </div>
        <div class="priceBottom">(不含运费,已节省¥<em>0.00</em>)</div>
      </div>
      <div class="goPrice">
        去结算(<em>{{ quantity }}</em
        >)
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "@/components/footer.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Footer,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    cartDatas() {
      return this.$store.state.cartDatas;
    },
    changeAll() {
      return this.$store.state.changeAllchecked;
    },
    total() {
      let total = 0;
      this.$store.state.cartDatas.map((item) => {
        if (item.isSelect) {
          total += item.value * item.shop_price;
        }
      });
      return total;
    },
    quantity() {
      let quantityNum = 0;
      this.$store.state.cartDatas.map((item) => {
        if (item.isSelect) {
          quantityNum += item.value;
        }
      });
      return quantityNum;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changeChecked(cartData, index) {
      console.log(index);
      console.log(cartData);
      cartData.isSelect = !cartData.isSelect;
      this.$store.commit("changeChecked", { cartData, index });
    },
    changeAllchecked() {
      this.$store.commit("changeAllchecked");
    },
    addCartNum(index) {
      this.$store.commit("addCartNum", index);
    },
    downCartNum(index) {
      this.$store.commit("downCartNum", index);
    },
    deleCart(index) {
      this.$store.commit("deleCart", index);
    },
    toDetail(data) {
      this.$router.push("/goodsdetail/" + data);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.cartDatas);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.cart {
  text-align: center;
}
.cart-page {
  .cart-footer {
    position: fixed;
    bottom: 5rem;
    left: 0;
    right: 0;
    background: #fafafc;
    border-top: 1px solid #e3e8ee;
    color: #333;
    min-height: 5rem;
    width: 100%;
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    i,
    em {
      font-style: normal;
    }
    .selectAll {
      flex: 1;
      .checkedText {
        margin-left: 1rem;
      }
      i {
        margin-left: 3px;
      }
    }
    .priceAll {
      flex: 2;
      text-align: right;
      .priceAll_top {
        em {
          font-size: 1.26rem;
          color: rgb(242, 14, 40);
          font-weight: 700;
        }
        i {
          font-weight: 700;
          color: rgb(242, 14, 40);
          font-size: 1.8rem;
        }
      }
      .priceBottom {
        font-size: 1.2rem;
        color: #999;
      }
    }
    .goPrice {
      flex: 1;
      background-color: #f44;
      color: #fff;
      border: 1px solid #f44;
      height: 48px;
      text-align: center;
      line-height: 48px;
    }
  }
  .nocart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    i {
      font-size: 25rem;
      color: #666;
    }
    .nocart-title {
      font-size: 2rem;
      a {
        color: red;
      }
    }
  }
  .cart-content {
    width: 100%;
    height: 100%;
    .cart_goods_item {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      .cart_checked {
        width: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          font-size: 1.4rem;
        }
      }
      .cart_shop {
        width: 100%;
        padding: 1.5rem;
        background-color: #fff;
        display: flex;
        width: calc(100% - 3rem);
        justify-content: space-between;
        width: 80%;
        margin-right: 2%;
        .cart_shop_img {
          width: 7rem;
          height: 7rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cart_goods {
          width: 70%;
          .cart_shop_title {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #232326;
            line-height: 1.6;
          }
          .cart_shop_info {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            .price {
              color: rgb(242, 14, 40);
              font-size: 1.5rem;
              font-weight: 700;
              em {
                font-size: 1.05rem;
                font-style: normal;
              }
            }
            .stepper {
              display: flex;
              justify-content: space-between;
              button {
                width: 2rem;
                color: #c8c8c8;
                border: 1px solid #eee;
                text-align: center;
                line-height: 2rem;
                background-color: #fff;
              }
              input {
                width: 2.5rem;
                height: 2rem;
                font-size: 1.2rem;
                text-align: center;
                border: 1px solid #eee;
                border-width: 1px 0;
              }
              .oper_icon {
                margin-left: 1rem;
                line-height: 2rem;
                .iconfont {
                  font-size: 1.6rem;
                  &:first-child {
                    margin-right: 0.3rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>