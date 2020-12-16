import { MessageBox } from 'mint-ui';
const mutations = {
    changeCategoryLeft(state, data) {
        state.categoryLeftDatas = data
    },
    changeCategoryRight(state, data) {
        state.getCategoryRight = data
    },
    changeCategoryRightImg(state, data) {
        state.rightImg = data
    },
    changeloadingFalg(state, data) {
        state.loadingFalg = data
    },
    changeCatId(state, data) {
        state.cat_id = data
    },
    changeToggleFalg(state) {
        state.toggleFalg = !state.toggleFalg
    },
    changeCategoryList(state, data) {
        if (data.length > 0) {
            state.nomore = false
            state.categoryListDatas = state.categoryListDatas.concat(data)
        } else {
            state.nomore = true
        }
    },
    changedetailDatas(state, data) {
        state.detailDatas = data
    },
    changedetailDatasInfo(state, data) {
        state.detailDatasInfo = data
    },
    changePosterData(state, data) {
        state.posterDatas = data
    },
    // 添加购物车
    changeCartDatas(state, data) {
        if (data) {
            state.cartDatas.unshift(data)
        }
        localStorage.setItem('carts', JSON.stringify(state.cartDatas))
    },
    changeChecked(state, data) {
        state.cartDatas[data.index] = data.cartData;
        localStorage.setItem('carts', JSON.stringify(state.cartDatas))
        let changeAllStatus = state.cartDatas.every(item => {
            return item.isSelect == true;
        })
        state.changeAllchecked = changeAllStatus;
        localStorage.setItem('changeAllchecked', state.changeAllchecked)
    },
    changeAllchecked(state) {
        state.changeAllchecked = !state.changeAllchecked;
        state.cartDatas.forEach(item => {
            item.isSelect = state.changeAllchecked
        })
        localStorage.setItem('carts', JSON.stringify(state.cartDatas))
        localStorage.setItem('changeAllchecked', state.changeAllchecked)
    },
    addCartNum(state, data) {
        state.cartDatas[data].value++;
        localStorage.setItem('carts', JSON.stringify(state.cartDatas))
    },
    downCartNum(state, data) {
        if (state.cartDatas[data].value == 1) {
            state.cartDatas[data].value = 1
        } else {
            state.cartDatas[data].value--;
            localStorage.setItem('carts', JSON.stringify(state.cartDatas))
        }
    },
    deleCart(state, data) {
        MessageBox.confirm('你确定删除此商品吗?').then(() => {
            // console.log(action)
            state.cartDatas.splice(data, 1)
            localStorage.setItem('carts', JSON.stringify(state.cartDatas))
        }, () => {

        });

    },
    searchKeywords(state, data) {
        if (data) {
            for (var key in state.searchKeywords) {
                if (data == state.searchKeywords[key]) {
                    state.searchKeywords.splice(key, 1);
                }
            }
            state.searchKeywords.unshift(data)
        }
        localStorage.setItem('keywords', JSON.stringify(state.searchKeywords))
    }
}

export default mutations;