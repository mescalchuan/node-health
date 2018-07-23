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
    adminCtrl.addFood(req, res);
})

module.exports = router;