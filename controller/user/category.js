const models = require("../../model/index");

const getCategory = (req, res) => {
    models.Category.find((err, result) => {
        if(err) {
            res.json({
                retCode: -1,
                retMsg: "mongoose error"
            })
        }
        res.json({
            retCode: 0,
            retInfo: result
        })
    })
}

module.exports = {
    getCategory
}