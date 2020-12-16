const state = {
    categoryLeftDatas: [],
    getCategoryRight: [],
    rightImg: '',
    loadingFalg: true,
    cat_id: 858,
    toggleFalg: true,
    categoryListDatas: [],
    nomore: false,
    detailDatas: {},
    detailDatasInfo: {},
    posterDatas: {},
    // 用本地存储来存放购物车数据
    // 如果是字符串将他转化为对象
    cartDatas: localStorage['carts'] ? JSON.parse(localStorage['carts']) : [],
    changeAllchecked: localStorage['changeAllchecked'] ? JSON.parse(localStorage['changeAllchecked']) : true,
    searchKeywords: localStorage['keywords'] ? JSON.parse(localStorage['keywords']) : [],

}

export default state;