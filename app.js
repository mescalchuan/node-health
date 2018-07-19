const express = require("express");
const mongoose = require("mongoose");
const app = express();

const router = require("./router/index");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use('/api', router.foodRouter);

mongoose.connect("mongodb://localhost/db", function(err, db) {
    if(err) {
        console.log("连接失败");
    }
    else {
        console.log("连接成功")
    }
})

app.listen(8999, () => {
    console.log("server created!");
})