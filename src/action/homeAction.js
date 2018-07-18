import * as types from "./actionType";

export function getBannerList(bannerList) {
    return {
        type: types.GET_BANNER,
        bannerList
    }
}