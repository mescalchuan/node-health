const express = require("express");
const userCtrl = require("../controller/user/index");
const router = express.Router();

router.get("/test", (req, res) => {
    foodCtrl.getFoods(req, res);
})

router.get("/getCategory", (req, res) => {
    userCtrl.category.getCategory(req, res);
})

router.post("/searchFoods", (req, res) => {
    userCtrl.food.searchFoods(req, res);
})

module.exports = router;