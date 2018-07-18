const express = require("express");
const mongoose = require("mongoose");
const app = express();

const router = require("./router/index");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use('/api', router.foodRouter);

app.get('/', (req, res) => {
    // mongodb.MongoClient.connect("mongodb://localhost/db",function(err, db){
    //     if(!err){
    //         var dbase = db.db("runoob");
    //         dbase.createCollection('site', function (err, res) {
    //             if (err) throw err;
    //             console.log("创建集合!");
    //             db.close();
    //         });
    //     }
    //     else {
    //         console.log(err);
    //     }
    // })
})

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