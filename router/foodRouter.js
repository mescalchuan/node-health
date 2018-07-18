const express = require("express");
const foodCtrl = require("../controller/foodCtrl");
const router = express.Router();

router.get("/test", (req, res) => {
    foodCtrl.getFoods(req, res);
})

module.exports = router;