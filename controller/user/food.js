const models = require("../../model/index");

const searchFoods = (req, res) => {
    models.Food.find((err, result) => {
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
    searchFoods
}