<!-- 右边 -->
<template>
  <div class="category-right" id="wrapper">
    <div class="category_right_content">
      <div class="category_right_img">
        <img :src="this.$store.state.rightImg" alt="" />
      </div>
      <ul class="category_list">
        <li
          v-for="categoryRightData in categoryRightDatas"
          :key="categoryRightData.cat_id"
        >
          <h3>{{ categoryRightData.cat_name }}</h3>
          <ul class="child">
            <li
              v-for="category in categoryRightData.child"
              :key="category.cat_id"
            >
              <router-link :to="'/categorylist/' + category.cat_id">
                <img :src="category.touch_icon" alt="" />
                <span>{{ category.cat_name }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from "better-scroll";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["categoryRightDatas"],
  data() {
    //这里存放数据
    return {
      rightScroll: null,
      scrollTop: 0,
      oHeight: 0,
      arry: ["858", "6", "8", "3", "4", "5", "860"],
      index: 0,
    };
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      this.rightScroll = new BScroll("#wrapper", {
        pullUpLoad: true,
        scrollbar: false,
        pullDownRefresh: true,
        click: true,
      });
      this.oHeight =
        document.querySelector(".category_right_content").scrollHeight -
        document.querySelector("#wrapper").offsetHeight;
      this.rightScroll.on("scroll", (scrollTop) => {
        this.scrollTop = Math.abs(scrollTop.y);

        // console.log(this.$store.state.cat_id);
        if (this.scrollTop > this.oHeight + 100) {
          let index = this.arry.findIndex((val) => {
            return val == this.$store.state.cat_id;
          });
          if (index >= this.arry.length - 1) {
            this.$store.dispatch("actChangeCategoryRight", this.arry[0]);
          } else {
            this.$store.dispatch(
              "actChangeCategoryRight",
              this.arry[index + 1]
            );
          }
        }
        if (scrollTop.y > 100) {
          let index = this.arry.findIndex((val) => {
            return val == this.$store.state.cat_id;
          });
          if (index) {
            this.$store.dispatch(
              "actChangeCategoryRight",
              this.arry[index - 1]
            );
          }
        }
      });
    });
  },
  updated() {
    // this.scrollPage();
    // console.log(document.querySelector(".category_right_content").scrollHeight);
    // console.log(document.querySelector("#wrapper").offsetHeight);
  },
  beforeDestroy() {},
  destroyed() {
    this.oHeight = 0;
  },
};
</script>
<style lang='less'>
.category-right {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  .category_right_content {
    .category_right_img {
      display: block;
      height: 9.6rem;
      overflow: hidden;
      margin-top: 1.1rem;
      border-radius: 0.2rem;
      padding: 0 1.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .category_list {
      li {
        h3 {
          height: 1.6rem;
          line-height: 1.6rem;
          text-align: center;
          font-size: 1.3rem;
          color: #333;
          margin: 1.1rem 0;
        }
        .child {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 5.2rem;
              height: 5.2rem;
            }
            span {
              display: block;
              height: 2rem;
              line-height: 2rem;
              overflow: hidden;
              text-align: center;
              font-size: 1.2rem;
              color: #777;
              margin-top: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>