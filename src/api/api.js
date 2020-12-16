import ajax from './ajax'

const Base_URL = '/api';
const Base_loca = "http://localhost:3000/adminapi"
    // 首页列表
export const getHomeList = (url, params, type) => {
    return ajax(Base_URL + url, params, type)
}

//分类左侧数据
export const getCategoryLeft = () => {
    return ajax(Base_URL + '/catalog/list')
}

//分类右侧数据
export const getCategoryRight = (cat_id) => {
    // console.log(Base_URL + '/catalog/list/' + cat_id)
    return ajax(Base_URL + '/catalog/list/' + cat_id)
}

// 分类列表页
export const getCategoryList = (url, params, type) => {
    return ajax(Base_URL + url, params, type)
}


// 详情页
export const getDetail = (url, params, type) => ajax(Base_URL + url, params, type)

// 获取验证码
export const getPhoneCode = (url, params, type) => ajax(Base_loca + url, params, type)

// 短信登录
export const getPhoneLogin = (url, params, type) => ajax(Base_loca + url, params, type)