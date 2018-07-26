const express = require("express");
const mongoose = require("mongoose");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const router = require("./router/index");
const interceptor = require("./controller/interceptorCtrl");
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ type: "multipart/form-data" }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// const compiler = webpack(webpackConfig, (err, status) => {
//     if(err) {
//         console.log(err);
//     }
// })
//  app.use(require("webpack-dev-middleware")(compiler, webpackConfig.devServer));
// app.use(require("webpack-hot-middleware")(compiler));

//设置存放模板文件的目录
app.set("views", __dirname);
//设置模板引擎为ejs
app.set("view engine", "ejs");


app.use((req, res, next) => {
    interceptor(req, res, next);
})
//app.use(multipart({uploadDir:'/upload' }));//设置上传文件存放的地址
app.use("/api", router.foodRouter);
app.use("/api/admin", router.adminRouter);

app.use(express.static("src"));
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    return res.render("index", {
        userName: "",
        token: "",
        hasLogin: false
    })
})

mongoose.connect("mongodb://localhost/db", function(err, db) {
    if(err) {
        console.log("连接失败");
        process.exit(1);
    }
    else {
        console.log("连接成功")
    }
})

app.listen("8888", () => {
    console.log("server created!");
})