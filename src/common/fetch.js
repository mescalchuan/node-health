import ajax from "./ajax";

export function getData(url, params) {
    return new Promise((resolve, reject) => {
        ajax.gets(url, params, res => {
            resolve(res);
        }, e => {
            reject(e);
        })
    })
}

export function postData(url, params, needJSON) {
    return new Promise((resolve, reject) => {
        ajax.posts(url, params, res => {
            resolve(res);
        }, e => {
            reject(e);
        }, needJSON);
    })
}