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
    //0绿 1黄 2红
    rate: Number,
    remark: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category"
    }
})

const category = Schema({
    name: String
})

module.exports = {
    Food: mongoose.model("food", foodSchema),
    Category: mongoose.model("category", category)
}