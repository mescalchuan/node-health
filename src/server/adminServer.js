import { getData, postData } from "../common/fetch";
import * as url from "../config/url";

export function login(params, successBK, errorBK) {
    return (dispatch, getState) => {
        return postData(url.SERVER_ADMIN + url.LOGIN, params).then(res => {
            if(res.retCode == 0) {
                successBK && successBK(res);
            }
            else {
                errorBK && errorBK(res);
            }
        })
    }
}

export function logout(successBK, errorBK) {
    return (dispatch, getState) => {
        return postData(url.SERVER_ADMIN + url.LOGOUT).then(res => {
            if(res.retCode == 0) {
                successBK && successBK();
            }
            else {
                errorBK && errorBK(res);
            }
        })
    }
}