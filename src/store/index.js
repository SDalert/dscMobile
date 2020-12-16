// 引入vuex

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

// 导入所需模板
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

// 实例化store
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export default store;