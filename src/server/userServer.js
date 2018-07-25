import { getData, postData } from "../common/fetch";
import * as url from "../config/url";
import * as action from "../action/userAction";

export function getCategory(successBK, errorBK) {
    return (dispatch, getState) => {
        return getData(url.SERVER_BASE + url.GET_CATEGORY).then(res => {
            if(res.retCode == 0) {
                dispatch(action.getCategory(res.retInfo));
                successBK && successBK(res.retInfo);
            }
            else {
                errorBK && errorBK(res);
            }
        })
    }
}

export function searchFoods(params, successBK, errorBK) {
    return (dispatch, getState) => {
        return postData(url.SERVER_BASE + url.SEARCH_FOODS, params).then(res => {
            if(res.retCode == 0) {
                dispatch(action.searchFoods(res.retInfo));
                successBK && successBK(res.retInfo);
            }
        })
    }
}

export function setSearchInfo(keyword, categoryId, callback) {
    return (dispatch, getState) => {
        dispatch(action.setSearchInfo({keyword, categoryId}));
        return setTimeout(() => {
            callback && callback();
        }, 0);
    }
}

export function getHomeList(params, moduleType, successBK, errorBK) {
    return (dispatch, getState) => {
        return postData(url.SERVER_BASE + url.SEARCH_FOODS, params).then(res => {
            if(res.retCode == 0) {
                dispatch(action.getHomeList(moduleType, res.retInfo));
                successBK && successBK(res.retInfo);
            }
        })
    }
}