import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
// 引入mintui框架
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
// 一个用于移动端的可触摸滑动具有回弹效果的可复用Vue组件
import LyTab from 'ly-tab';
Vue.use(LyTab);
// 导入路由模块
import router from "./router/router.js";

// 引入swiper;
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper);

import store from './store/index'

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');