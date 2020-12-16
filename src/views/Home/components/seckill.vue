<!-- 限时秒杀 -->
<template>
  <div class="seckill">
    <div class="seckill_header">
      <div class="seckill_h_top">
        <img src="../../../images/seckill.png" alt="" />
        <div class="countdown">
          <span>距结束还剩</span>
          <div class="count">
            <span class="hours">{{ hour }}</span>
            <i>:</i>
            <span class="minute">{{ min }}</span>
            <i>:</i>
            <span class="second">{{ sec }}</span>
          </div>
        </div>
      </div>
      <ul class="header-time-slot">
        <li
          v-for="(value, index) in clickDatas"
          :key="index"
          :class="{ active: clickNum == index }"
          @click="changeTab(index)"
        >
          <strong>{{ value.time }}</strong>
          <span>{{ value.title }}</span>
        </li>
      </ul>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide
        v-for="(value, index) in swiperDatas[clickNum]"
        :key="index"
      >
        <div class="goods-top">
          <img :src="value.img_boxSrc" alt="" class="img-box" />
          <img :src="value.tagiconSrc" alt="" class="tagicon" />
        </div>
        <div class="goods-info">
          <p class="goods-title">{{ value.goods_title }}</p>
          <p class="goods-price">
            <em>¥</em>
            {{ value.goods_price }}
            <em>00</em>
          </p>
          <p class="goods-pre">
            <em>¥</em>
            {{ value.goods_pre }}
            <em>00</em>
          </p>
        </div>
      </swiper-slide>
      <swiper-slide></swiper-slide>
    </swiper>
    <div class="seckill_footer">
      <strong>查看更多秒杀商品</strong>
      <span class="iconfont icon-jiantou2"></span>
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
      swiperOption: {
        slidesPerView: 3.5,
        autoplay: false,
      },

      hour: "",
      min: "",
      sec: "",
      time: null,
      clickNum: 0,
      clickDatas: [
        {
          time: "24:00",
          title: "抢购中",
        },
        {
          time: "8:00",
          title: "即将开始",
        },
        {
          time: "10:00",
          title: "即将开始",
        },
        {
          time: "16:00",
          title: "即将开始",
        },
      ],
      swiper: null,
      swiperDatas: [
        [
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489106749091.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title: "实木衣柜",
            goods_price: "6590.",
            goods_pre: "9360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489106314732.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "丹麦innovation北欧小户型客厅双人多功能沙发床三人布艺沙发IDUN 原创设计 独立簧坐垫 欧美同款 欧标品质",
            goods_price: "1689.",
            goods_pre: "2400.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097621751.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Razer雷蛇 雨林狼蛛幻彩版 Ornata Chroma 机械式薄膜游戏键盘",
            goods_price: "419.",
            goods_pre: "600.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097011644.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Razer/雷蛇 北海巨妖专业版V2 Kraken Pro 电竞游戏耳麦 耳机",
            goods_price: "236.",
            goods_pre: "360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489096810833.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Apple/苹果 13 英寸：MacBook Pro Multi-Touch Bar 和 Touch ID 2.9GHz 处理器 512GB 存储容量",
            goods_price: "7100.",
            goods_pre: "9360.",
          },
        ],
        [
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098157662.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Razer雷蛇 Firefly烈焰神虫织物版 Chroma幻彩硬质游戏鼠标垫",
            goods_price: "7700.",
            goods_pre: "9360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097825348.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Razer雷蛇 炼狱蝰蛇 精英版/2013/幻彩/守望先锋电竞有线游戏鼠标",
            goods_price: "1689.",
            goods_pre: "2400.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097621751.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Razer雷蛇 雨林狼蛛幻彩版 Ornata Chroma 机械式薄膜游戏键盘",
            goods_price: "419.",
            goods_pre: "600.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097011644.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Razer/雷蛇 北海巨妖专业版V2 Kraken Pro 电竞游戏耳麦 耳机",
            goods_price: "236.",
            goods_pre: "360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489096810833.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Apple/苹果 13 英寸：MacBook Pro Multi-Touch Bar 和 Touch ID 2.9GHz 处理器 512GB 存储容量",
            goods_price: "7100.",
            goods_pre: "9360.",
          },
        ],
        [
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099437211.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "秋季新款男士套头卫衣印花外套韩版简约百搭潮流男生上衣服",
            goods_price: "7700.",
            goods_pre: "9360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "名龙堂i7 6700升7700 GTX1060 6G台式电脑主机DIY游戏组装整机 升6GB独显 送正版WIN10 一年上门",
            goods_price: "1689.",
            goods_pre: "2400.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098597912.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Apple/苹果 27” Retina 5K显示屏 iMac:3.3GHz处理器2TB存储",
            goods_price: "419.",
            goods_pre: "600.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098360804.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "三星C24F396FH曲面显示器23.5英寸电脑显示器24液晶显示屏幕超22",
            goods_price: "236.",
            goods_pre: "360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098265067.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "新品HYC 2k显示器32寸电脑显示器无边框HDMI液晶显示器IPS显示屏 2K高清屏IPS 超薄 厚6mm 无边框",
            goods_price: "7100.",
            goods_pre: "9360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489096810833.jpg",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Apple/苹果 13 英寸：MacBook Pro Multi-Touch Bar 和 Touch ID 2.9GHz 处理器 512GB 存储容量",
            goods_price: "7100.",
            goods_pre: "9360.",
          },
        ],
        [
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1490175230574.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            goods_price: "7700.",
            goods_pre: "9360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489105638483.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Midea/美的 MB80-eco31WD 8公斤变频洗衣机全自动波轮智能大容量 省电静音 0.9洗净比 洗得更干净",
            goods_price: "1689.",
            goods_pre: "2400.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489105386951.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Skyworth/创维 55V9E 55吋4K超高清智能网络平板LED液晶电视机 50 25核智能 4K超高清 人气爆款",
            goods_price: "419.",
            goods_pre: "600.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489105301550.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "Midea/美的 F6021-X1(S)热水器储水式 家用洗澡电热水器抑菌节能 直降150 购买送净水器+花洒套装",
            goods_price: "236.",
            goods_pre: "360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489105175252.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "志高嵌入式电陶炉家用双头双灶镶嵌式电磁炉双眼光波炉特价正品 不挑锅可烧烤 三环猛火 嵌入式双灶",
            goods_price: "7100.",
            goods_pre: "9360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "名龙堂i7 6700升7700 GTX1060 6G台式电脑主机DIY游戏组装整机 升6GB独显 送正版WIN10 一年上门",
            goods_price: "7100.",
            goods_pre: "9360.",
          },
          {
            img_boxSrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098724131.jpg?imageView2/2/format/webp",
            tagiconSrc: "https://x.dscmall.cn/static/dist/img/seckill-tag.png",
            goods_title:
              "京天华盛i5 7500/GTX1050Ti独显台式机组装机DIY整机游戏电脑主机 热销25万台 跑分17万 升7代CPU",
            goods_price: "7100.",
            goods_pre: "9360.",
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
  methods: {
    skillFn() {
      let nowTime = new Date();
      let monTime = new Date("2020-11-17  24:00:00");
      let dataTime = monTime.valueOf() - nowTime.valueOf();
      // 小时
      var hour = Math.floor(dataTime / 1000 / 60 / 60);
      this.hour = String(hour).padStart(2, "0");
      // 分钟
      var min = Math.floor((dataTime / 1000 / 60) % 60);
      this.min = String(min).padStart(2, "0");
      // 秒
      var sec = Math.floor(((dataTime / 1000) % 60) % 60);
      this.sec = String(sec).padStart(2, "0");
    },
    changeTab(index) {
      this.clickNum = index;
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.time = setInterval(() => {
      this.skillFn();
    }, 1);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    clearInterval(this.time);
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.seckill {
  margin: 1rem 1rem 0;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  .seckill_header {
    overflow: hidden;

    .seckill_h_top {
      padding: 2.2rem 1rem 1.2rem 1.5rem;
      display: flex;
      justify-content: space-between;

      img {
        display: block;
        width: 10rem;
      }

      .countdown {
        display: flex;
        align-items: center;

        & > span {
          font-size: 1.3rem;
          margin-right: 0.8rem;
          color: #333;
          display: block;
        }

        .count {
          span {
            display: inline-block;
            padding: 0.3rem 0.5rem;
            color: #fff;
            font-size: 1.2rem;
            border-radius: 0.5rem;
            width: 1.5rem;
            background: linear-gradient(-88deg, #ff4f2e, #f91f28);
          }

          i {
            color: #f20d23;
            font-weight: 700;
            font-style: normal;
          }
        }
      }
    }
    .header-time-slot {
      padding: 0.5rem 0;
      display: flex;
      justify-content: space-around;
      padding: 0 1rem;

      li {
        display: flex;
        padding-bottom: 0.8rem;
        color: #999;
        flex-direction: column;
        text-align: center;
        flex-grow: 1;
        position: relative;
        overflow: hidden;
        &.active {
          color: #f20d28 !important;
          strong {
            font-size: 1.8rem;
          }
          &::after {
            background-color: #f20d28 !important;
            height: 2px !important;
            left: 1rem !important;
            right: 1rem !important;
          }
        }
        &::after {
          content: "";
          position: absolute;
          height: 1px;
          background-color: #eee;
          left: 0;
          bottom: 0rem;
          right: 0;
        }
        span {
          margin-top: 3px;
          font-size: 1.2rem;
        }
        strong {
          font-size: 1.4rem;
        }
      }
    }
  }
  .swiper-slide {
    padding: 0.5rem 0.3rem;
  }
  .swiper-container {
    padding: 1rem;
    text-align: center;
  }
  .goods-top {
    width: 100%;
    height: 100%;
    position: relative;
    .img-box {
      width: 100%;
      position: relative;
      display: block;
    }
    .tagicon {
      width: 5rem;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .goods-info {
    width: 100%;
    height: 100%;
    padding: 1rem 0.5rem;
    .goods-title {
      font-size: 1.3rem;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .goods-price {
      margin-top: 0.6rem;
      font-size: 1.5rem;
      color: rgb(242, 14, 40);
      font-weight: 700;
      em {
        font-style: normal;
        font-size: 1.05rem;
      }
    }
    .goods-pre {
      margin-top: 0.2rem;
      text-decoration: line-through;
      color: rgb(136, 136, 136);
      font-size: 1.05rem;
      em {
        font-style: normal;
      }
    }
  }
  .seckill_footer {
    padding-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
      font-size: 1.4rem;
      color: #000;
      margin-right: 0.5rem;
    }
  }
}
</style>