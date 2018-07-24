import { getData, postData } from "../common/fetch";
import * as url from "../config/url";
import * as action from "../action/userAction";

export function getBannerList(successBK, errorBK) {
    return (dispatch, getState) => {
        return getData(url.SERVER_BASE + url.TEST).then(res => {
            dispatch(action.getBannerList(res));
            successBK && successBK(res);
        })
    }
}

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