const express = require("express");
const adminCtrl = require("../controller/adminCtrl");
const router = express.Router();

router.post("/login", (req, res) => {
    adminCtrl.login(req, res);
})

module.exports = router;