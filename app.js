const express = require("express");
const mongoose = require("mongoose");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const bodyParser = require('body-parser')
const app = express();

const router = require("./router/index");
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use('/api', router.foodRouter);
app.use('/api/admin', router.adminRouter);
app.use(bodyParser());

mongoose.connect("mongodb://localhost/db", function(err, db) {
    if(err) {
        console.log("连接失败");
    }
    else {
        console.log("连接成功")
    }
})

const compiler = webpack(webpackConfig, (err, status) => {
    if(err) {
        console.log(err);
    }
})

app.use(require("webpack-dev-middleware")(compiler, webpackConfig.devServer));
app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static('src'));
app.use(express.static(__dirname));

app.listen(webpackConfig.devServer.port, () => {
    console.log("server created!");
})