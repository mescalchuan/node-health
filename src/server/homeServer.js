import { getData } from "../common/fetch";
import * as url from "../config/url";
import * as action from "../action/homeAction";

export function getBannerList(successBK, errorBK) {
    return (dispatch, getState) => {
        return getData(url.SERVER_BASE + url.TEST).then(res => {
            dispatch(action.getBannerList(res));
            successBK && successBK(res);
        })
    }
}