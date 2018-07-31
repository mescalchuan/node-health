import ajax from "./ajax";

export const getData = (url, params) => {
    return new Promise((resolve, reject) => {
        ajax.gets(url, params, res => {
            resolve(res);
        }, e => {
            reject(e);
        })
    })
}

export const postData = (url, params, needJSON) => {
    return new Promise((resolve, reject) => {
        ajax.posts(url, params, res => {
            resolve(res);
        }, e => {
            reject(e);
        }, needJSON);
    })
}