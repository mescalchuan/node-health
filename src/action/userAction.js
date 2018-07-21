import * as types from "./actionType";

export function getBannerList(bannerList) {
    return {
        type: types.GET_BANNER,
        bannerList
    }
}

export function getCategory(category) {
    return {
        type: types.GET_CATEGORY,
        category
    }
}

export function searchFoods(foods) {
    return {
        type: types.SEARCH_FOODS,
        foods
    }
}