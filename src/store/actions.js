import { getDetail, getCategoryLeft, getCategoryRight, getCategoryList } from '../api/api';
const actions = {
    async actChangeCategoryLeft(context) { //分类左侧
        let result = await getCategoryLeft();
        // console.log(result)
        context.commit('changeCategoryLeft', result.data)
    },
    async actChangeCategoryRight(context, cat_id) { //分类右侧
        context.commit('changeloadingFalg', true)
        let resultRight = await getCategoryRight(cat_id);
        let resultLeft = await getCategoryLeft();
        console.log(resultLeft)
        resultLeft.data.forEach(item => {
            if (item.cat_id == cat_id) {
                context.commit('changeloadingFalg', false)
                context.commit('changeCategoryRightImg', item.touch_catads)
                context.commit('changeCatId', cat_id)
            }
        })
        context.commit('changeCategoryRight', resultRight.data)
    },
    async actChangegetCategoryList(context, params) {
        context.commit('changeloadingFalg', true)
        let resultList = await getCategoryList(params.url, params.params, params.type)
        console.log(resultList)
        console.log(params)
        context.commit('changeCategoryList', resultList.data)
        context.commit('changeloadingFalg', false)
    },
    async actChangedetailDatas(context, params) {
        let resultDetail = await getDetail(params.url, params.params, params.type)
            // console.log(resultDetail)
            // console.log(resultDetail.data.basic_info)
        let posterDatas = {
            image: resultDetail.data.goods_thumb,
            title: resultDetail.data.goods_name,
            price: resultDetail.data.shop_price,
            dprice: resultDetail.data.market_price,
        }
        context.commit('changedetailDatas', resultDetail.data)
        context.commit('changedetailDatasInfo', resultDetail.data.basic_info)
        context.commit('changePosterData', posterDatas)
    }
}

export default actions;