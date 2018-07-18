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
        
        if (newData) newData = ajax.exchangeParmaster(data);
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
                console.warn('get error');
            }
        };
        
        request.ontimeout = e => {
            request.abort();
            failCallback && failCallback(e);
        }
        
        request.timeout = timeout;
        //request.withCredentials = true;
        request.open('GET', newUrl);
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
        let newData = null;
        if (data) newData = ajax.exchangeParmaster(data);
        
        else newData = null;
        request.onreadystatechange = function(e) {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                try {
                    const res = JSON.parse(request.responseText);
                     if (url.indexOf('orderGateway/buy_order/') >= 0) {
                         console.log(request.getResponseHeader("Date"))
                        res.serverTime = request.getResponseHeader('Date');
                    }
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
                console.warn('post error');
            }
        };

        request.ontimeout = e => {
            request.abort();
            failCallback && failCallback(e);
        }
        
        request.timeout = timeout;
        
        request.open('POST', url);
        if(needJSON) {
            request.setRequestHeader("Content-Type", "application/json");
            newData = JSON.stringify(data);
        }
        else {
            request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
        }
        request.send(newData);
    }
}
