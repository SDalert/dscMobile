<!-- 登录页面 -->
<template>
  <div class="login-page">
    <div class="login_content">
      <div class="headerPhoto">
        <img :src="headerImg" alt="" />
      </div>
      <div class="login_tabs">
        <div
          class="tabs_message"
          @click="tabs(0)"
          :class="{ active: page == 0 }"
        >
          短信登录
        </div>
        <div
          class="tabs_account"
          @click="tabs(1)"
          :class="{ active: page == 1 }"
        >
          账号登录
        </div>
      </div>
      <div class="login_interface">
        <div class="login_int_mes" v-if="page == 0">
          <div class="graph_verify">
            <input
              type="text"
              placeholder="验证码"
              name="captcha"
              v-model="captcha"
            />
            <img
              class="g_ver_btn"
              src="http://localhost:3000/adminapi/svgcaptcha"
              alt=""
              @click="changeImg()"
              ref="ver_img"
            />
          </div>
          <div class="num_verify">
            <input
              type="text"
              placeholder="手机号"
              name="phone"
              v-model="phone"
              maxlength="11"
              RexgPhone
            />
            <div class="n_ver_btn" v-if="!num" @click="verBtn()">
              {{ getCode }}
            </div>
            <div class="n_ver_btn" v-else>还剩{{ num }}</div>
          </div>
          <div class="import">
            <input type="text" placeholder="输入验证码" v-model="code" />
          </div>
          <div class="ver_submit" @click="LoginCode">短信登录</div>
        </div>
        <div class="login_int_acc" v-else>
          <div class="account_verify">
            <input type="text" placeholder="验证码" />
            <img
              class="account_num"
              src="http://localhost:3000/adminapi/svgcaptcha"
              alt=""
              @click="changeImg()"
              ref="ver_img"
            />
          </div>
          <div class="account_name">
            <input type="text" placeholder="用户名" />
          </div>
          <div class="account_psw">
            <input
              type="password"
              placeholder="密码"
              v-model="loginPsw"
              v-if="loginFalg"
            />
            <input type="text" v-model="loginPsw" placeholder="密码" v-else />
            <i
              class="iconfont"
              :class="loginFalg ? 'icon-yincang' : 'icon-xianshi'"
              @click="loginClick"
            ></i>
          </div>
          <div class="account_btn">立即登录</div>
        </div>
        <div class="toRegister">
          <router-link to="/register">没有账号，去注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Toast } from "mint-ui";
import { getPhoneCode, getPhoneLogin } from "@/api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      headerImg: require("@/assets/login.jpg"),
      page: this.$route.query.page,
      num: 0,
      Time: null,
      phone: "",
      getCode: "获取验证码",
      code: "",
      captcha: "",
      loginPsw: "",
      loginFalg: true,
    };
  },
  //监听属性 类似于data概念
  computed: {
    RexgPhone() {
      return /^1[3|5|6|8][0-9]{9}$/.test(this.phone);
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tabs(index) {
      this.page = index;
    },
    changeImg() {
      // 刷新验证码
      this.$refs.ver_img.src =
        "http://localhost:3000/adminapi/svgcaptcha?time=" +
        new Date().getTime();
    },
    async verBtn() {
      // 获取验证码
      if (this.RexgPhone) {
        // 如果号码存在
        this.num = 5;
        this.Time = setInterval(() => {
          this.num--;
          if (!this.num) {
            clearInterval(this.Time);
            this.Time = null;
            this.getCode = "重新获取验证码";
          }
        }, 1000);
      } else {
        Toast({
          message: "手机号格式不正确",
          position: "center",
          duration: 2000,
        });
      }
      let result = await getPhoneCode("/getcode", Number(this.phone), "post");
      console.log(result);
    },
    async LoginCode() {
      var params = {
        captcha: this.captcha,
        phone: this.phone,
        code: this.code,
      };
      let result = await getPhoneLogin("/phonelogin", params, "post");
      console.log(result);
    },
    loginClick() {
      this.loginFalg = !this.loginFalg;
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
.login-page {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .toRegister {
    line-height: 4.4rem;
    text-align: center;
    text-decoration: underline;
    a {
      color: #f44;
      font-size: 1.4rem;
    }
  }
  .login_content {
    background-color: #fff;
    width: 100%;
    height: 100%;
    .headerPhoto {
      width: 100%;
      height: 30%;
      position: relative;
      img {
        position: absolute;
        bottom: 0;
        margin-left: -5rem;
        left: 50%;
        border-radius: 50%;
        overflow: hidden;
        width: 10rem;
        height: 10rem;
      }
    }
    .login_tabs {
      width: 80%;
      height: 5rem;
      margin-left: 10%;
      display: flex;
      justify-content: space-between;
      font-size: 1.4rem;
      margin-top: 1rem;
      .tabs_message {
        width: 45%;
        height: 5rem;
        background-color: #efefef;
        text-align: center;
        line-height: 5rem;
      }
      .tabs_account {
        width: 45%;
        height: 5rem;
        background-color: #efefef;
        text-align: center;
        line-height: 5rem;
      }
      .active {
        background-color: #f44;
        color: #fff;
      }
    }
    .login_interface {
      width: 80%;
      margin-left: 10%;
      input {
        border: 0.1rem solid #efefef;
        height: 3.8rem;
        text-indent: 1rem;
      }
      .login_int_mes {
        width: 100%;
        font-size: 1.4rem;
        .graph_verify {
          width: 100%;
          height: 4rem;
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          input {
            flex-grow: 2;
          }
          .g_ver_btn {
            flex-grow: 1;
            height: 4rem;
            text-align: center;
            line-height: 4rem;
            background-color: #efefef;
            color: black;
          }
        }
        .num_verify {
          width: 100%;
          height: 4rem;
          display: flex;
          margin-top: 3rem;
          justify-content: space-between;
          input {
            width: 70%;
          }
          .n_ver_btn {
            width: 30%;
            height: 4rem;
            text-align: center;
            line-height: 4rem;
            background-color: #efefef;
            color: black;
            font-size: 1.2rem;
          }
        }
        .import {
          margin-top: 3rem;
          width: 100%;
          input {
            width: 100%;
          }
        }
        .ver_submit {
          margin-top: 3rem;
          width: 100%;
          background-color: #f44;
          height: 4rem;
          text-align: center;
          line-height: 4rem;
          color: #fff;
        }
      }
      .login_int_acc {
        width: 100%;
        font-size: 1.4rem;
        .account_verify {
          width: 100%;
          height: 4rem;
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          input {
            width: 80%;
          }
          .account_num {
            flex-grow: 1;
            height: 4rem;
            text-align: center;
            line-height: 4rem;
            background-color: #efefef;
            color: black;
          }
        }
        .account_name {
          margin-top: 3rem;
          width: 100%;
          input {
            width: 100%;
          }
        }
        .account_psw {
          margin-top: 3rem;
          width: 100%;
          display: flex;
          input {
            width: 80%;
          }
          i {
            width: 20%;
            display: block;
            height: 4rem;
            text-align: center;
            line-height: 4rem;
            font-size: 2.5rem;
            background-color: #efefef;
          }
        }
        .account_btn {
          margin-top: 3rem;
          width: 100%;
          background-color: #f44;
          height: 4rem;
          text-align: center;
          line-height: 4rem;
          color: #fff;
        }
      }
    }
  }
}
</style>