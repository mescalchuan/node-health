import { getData, postData } from "../common/fetch";
import * as url from "../config/url";

export function login(params, successBK, errorBK) {
    return (dispatch, getState) => {
        return postData(url.SERVER_ADMIN + url.LOGIN, params).then(res => {
            successBK && successBK(res);
        })
    }
}