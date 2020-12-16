import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用
Vue.use(VueRouter);
//解决刷新报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
// 创建组件
import Home from '../views/Home/Home.vue'
import Cart from '../views/Cart/Cart.vue'
import Category from '../views/Category/Category.vue'
import Find from '../views/Find/Find.vue'
import Mine from '../views/Mine/Mine.vue'

// 配置路由
let routes = [{
    path: '/home',
    component: Home,
    children: [{
            path: 'index',
            component: () =>
                import ('../views/Home/children/Index.vue')
        }, {
            path: 'clothing',
            component: () =>
                import ('../views/Home/children/Clothing.vue')
        }, {
            path: 'computer',
            component: () =>
                import ('../views/Home/children/Computer.vue')
        }, {
            path: 'hometextiles',
            component: () =>
                import ('../views/Home/children/HomeTextiles.vue')
        }, {
            path: 'household',
            component: () =>
                import ('../views/Home/children/Household.vue')
        },
        {
            path: 'personalmakeup',
            component: () =>
                import ('../views/Home/children/PersonalMakeup.vue')
        }, {
            path: 'shoebag',
            component: () =>
                import ('../views/Home/children/ShoeBag.vue')
        }, {
            path: '/home',
            redirect: '/home/index'
        }, {
            path: 'mobilephones',
            component: () =>
                import ('../views/Home/children/MobilePhones.vue')
        }
    ]
}, {
    path: '/cart',
    component: Cart
}, {
    path: '/category',
    component: Category
}, {
    path: '/find',
    component: Find
}, {
    path: '/mine',
    component: Mine
}, {
    path: '/',
    redirect: '/home'
}, {
    path: '/search',
    component: () =>
        import ('../views/Search/Search')
}, {
    path: '/categorylist/:cid',
    component: () =>
        import ('../views/Category/components/CategoryList')
}, {
    path: '/goodsdetail/:cid',
    component: () =>
        import ('../views/Detail/Detail.vue')
}, {
    path: '/searchlist',
    component: () =>
        import ('../views/Search/Searchlist.vue')
}, {
    path: '/login',
    component: () =>
        import ('../views/Login/Login.vue')
}, {
    path: '/register',
    component: () =>
        import ('../views/Login/Register.vue')
}];
// 创建一个路由对象
let router = new VueRouter({
    routes,
});
// 暴露路由对象
export default router;