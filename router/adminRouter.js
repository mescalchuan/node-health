const express = require("express");
const adminCtrl = require("../controller/admin/index");
const router = express.Router();

router.post("/login", (req, res) => {
    adminCtrl.login(req, res);
})

router.post("/logout", (req, res) => {
    adminCtrl.logout(req, res);
})

router.post("/addFood", (req, res) => {
    adminCtrl.foodHandler.addFood(req, res);
})

router.post("/editFood", (req, res) => {
    adminCtrl.foodHandler.editFood(req, res);
})

router.post("/deleteFood", (req, res) => {
    adminCtrl.foodHandler.deleteFood(req, res);
})

module.exports = router;