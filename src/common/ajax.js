//设置请求的超时时间
const timeout = 60000;

export default {
    /*
     * ajax简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     *
     * */
    gets(url, data, successCallback, failCallback) {
        const request = new XMLHttpRequest();
        let newData = data;
        let newUrl = url;
        if(userInfo.token) {
            newData ? (newData.token = userInfo.token) : (newData = {token: userInfo.token}); 
        }
        if (newData) newData = this.exchangeParmaster(newData);
        else newData = null;
        if (newUrl.indexOf("?") >= 0) {
            if (newData)  newUrl += "&" + newData;
        } 
        else {
            if (newData) newUrl += "?" + newData;
        }
        request.onreadystatechange = e => {
            if (request.readyState !== 4) return;

            if (request.status === 200) {
                try {
                    successCallback && successCallback(JSON.parse(request.responseText))
                } 
                catch (e) {
                    console.log(request.responseText);
                }
            } 
            else {
                console.log(request.status)
                failCallback && failCallback(e);
                console.log(JSON.stringify(e))
                console.log(JSON.stringify(request.responseText))
                console.warn("get error");
            }
        };
        
        request.ontimeout = e => {
            request.abort();
            failCallback && failCallback(e);
        }
        
        request.timeout = timeout;
        //request.withCredentials = true;
        request.open("GET", newUrl);
        request.send();
    },

    exchangeParmaster(data) {
        let newParmaster = "";
        let findIndex = 0;
        for (var key in data) {
            if (findIndex == 0) newParmaster += key + "=" + data[key];
            else newParmaster += "&" + key + "=" + data[key];

            findIndex++;
        }
        return newParmaster;
    },

    posts(url, data, successCallback, failCallback, needJSON) {
        const request = new XMLHttpRequest();
        let newData = data;
        if(!!(~url.indexOf("admin/add")) || !!(~url.indexOf("admin/edit"))) {
            
        }
        else if(userInfo.token) {
            newData ? (newData.token = userInfo.token) : (newData = {token: userInfo.token}); 
        }
        if(newData) {
            if(!!(~url.indexOf("admin/add")) || !!(~url.indexOf("admin/edit"))) {

            }
            else {
                newData = this.exchangeParmaster(newData);
            }
        }
        else newData = null;
        request.onreadystatechange = function(e) {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                try {
                    const res = JSON.parse(request.responseText);
                    successCallback && successCallback(res);
                } 
                catch(e) {
                    console.log(e);
                    console.log(request.responseText);
                }
            } 
            else {
                console.log(request.status)
                failCallback && failCallback(e);
                console.log(JSON.stringify(e))
                console.log(JSON.stringify(request.responseText))
                console.warn("post error");
            }
        };

        request.ontimeout = e => {
            request.abort();
            failCallback && failCallback(e);
        }
        
        request.timeout = timeout;
        
        request.open("POST", url);
        if(needJSON) {
            request.setRequestHeader("Content-Type", "application/json");
            newData = JSON.stringify(data);
        }
        else if(!!!(~url.indexOf("admin/add")) && !!!(~url.indexOf("admin/edit"))) {
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        else {
           // request.setRequestHeader("Content-Type", "multipart/form-data");
        }
        request.send(newData);
    }
}
