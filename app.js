const express = require("express");

const app = express();

const router = require("./router/index");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use('/api', router.foodRouter);

app.listen(8999, () => {
    console.log("server created!");
})