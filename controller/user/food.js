const mongoose = require("mongoose");
const models = require("../../model/index");

const searchFoods = (req, res) => {
    const {keyword, categoryId, _id, sortKey, sortType} = req.body;
    let condition = {};
    let sortCondition = {};
    sortKey && (sortCondition[sortKey] = sortType);
    keyword && (condition.name = new RegExp(keyword, "i"));
    categoryId && (condition.categoryId = categoryId);
    models.Food.find(condition).populate("categoryId").sort(sortCondition).exec((err, result) => {
        if(err) {
            res.json({
                retCode: -1,
                retMsg: "mongoose error"
            })
        }
        res.json({
            retCode: 0,
            retInfo: result.map((item, index) => {
                let _item =  JSON.parse(JSON.stringify(item));
                _item.categoryName = item.categoryId.name;
                _item.categoryId = item.categoryId._id;
                return _item;
            })
        })
    })
}

module.exports = {
    searchFoods
}