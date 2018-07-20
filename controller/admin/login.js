const login = module.exports = (req, res) => {
    const {userName, password} = req.body;
    const session = req.session;
    if(userName === "admin" && password === "admin") {
        if(session) {
            if(session.user) {
                res.json({
                    retCode: -1,
                    retMsg: "您已登录过了"
                })
            }
            else {
                session.user = {
                    userName,
                    password
                }
                res.json({
                    retCode: 0,
                    retInfo: {}
                })
            }
        }
        else {
            res.json({
                retCode: -1,
                retMsg: "尚无session"
            })
        }
    }
    else {
        res.json({
            retCode: -1,
            retMsg: "用户名或密码错误"
        })
    }
}