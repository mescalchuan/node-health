const jwt = require('jsonwebtoken');

const interceptor = module.exports = (req, res, next) => {
    let url = req.path;
    if(!!(~url.indexOf(".html"))) {
        url = url.replace(/\//g, "");
        const page = url.split(".")[0];
        //将用户登录信息和token返回给前台
        if(req.session.user) {
            const token = jwt.sign({name: "token"}, "node-health", {expiresIn: 600});
            const { userName } = req.session.user;
            res.render(page, {
                userName,
                token,
                hasLogin: true
            })
        }
        else {
            res.render(page, {
                userName: "",
                token: "",
                hasLogin: false
            })
        }
        next();
    }
    else if(!!(~url.indexOf("/api/admin")) && !!!(~url.indexOf("/login")) && !!!(~url.indexOf("/addFood")) && !!!(~url.indexOf("/editFood"))) {
        let token = "";
        const method = req.method.toLowerCase();
        if(method == "get") {
            token = req.query.token;
        }
        else {
            token = req.body.token;
        }
        jwt.verify(token, "node-health", (err, decoded) => {
            if (!err) {
                if(decoded.name !== "token") {
                    return res.json({
                        retCode: 500,
                        retMsg: "csrf"
                    })
                }
                else {
                    next();
                }
            }
            else {
                return res.json({
                    retCode: 500,
                    retMsg: "csrf"
                })
            }
        })
    }
    else {
        next();
    }
}