import * as types from "./actionType";

export const getBannerList = bannerList => ({
    type: types.GET_BANNER,
    bannerList
})

export const getCategory = category => ({
    type: types.GET_CATEGORY,
    category
})

export const searchFoods = foods => ({
    type: types.SEARCH_FOODS,
    foods
})

export const setSearchInfo = searchInfo => ({
    type: types.SET_SEARCH_INFO,
    searchInfo
})

export const getHomeList = (moduleType, foods) => ({
    type: types.GET_HOME_LIST,
    moduleType,
    foods
})