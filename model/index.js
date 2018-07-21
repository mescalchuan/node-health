const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = Schema({
    name: String,
    //热量
    kcal: Number,
    imgUrl: String,
    //蛋白质
    protein: Number,
    //脂肪
    fat: Number,
    //碳水化合物
    carbohydrate: Number,
    //膳食纤维
    DF: Number,
    VA: Number,
    VC: Number,
    VE: Number,
    //胡萝卜素
    carotene: Number,
    VB1: Number,
    VB2: Number,
    //烟酸
    niacin: Number,
    //胆固醇
    cholesterol: Number,
    MG: Number,
    CA: Number,
    FE: Number,
    ZN: Number,
    CU: Number,
    MN: Number,
    K: Number,
    P: Number,
    NA: Number,
    SE: Number,
    //1红 2黄 3绿
    rate: Number,
    remark: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category"
    }
}, {
    collection: "food"
})
//collection指定数据库的哪一张表，否则mongoose会默认添加s后缀的表名
const categorySchema = Schema({
    name: String
}, {
    collection: "category"
})

module.exports = {
    Food: mongoose.model("food", foodSchema),
    Category: mongoose.model("category", categorySchema)
}