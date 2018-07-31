const multiparty = require("multiparty");
const jwt = require("jsonwebtoken");
const qiniu = require("qiniu");
const models = require("../../model/index");

const domain = "http://ox6gixp8f.bkt.clouddn.com/";
const accessKey = "qVavZs09FHGxYJdaC-1ZDQeqJVbJQAbyOPnBGu5g";
const secretKey = "I4Y4lXRbZz4zL7t2llASK5Lg8Eo5zKEna_uTCPfe";

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const bucket = "sunnychuan";
const options = {
    scope: bucket,
    expires: 7200
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
const formUploader = new qiniu.form_up.FormUploader(config);
const bucketManager = new qiniu.rs.BucketManager(mac, config);
const putExtra = new qiniu.form_up.PutExtra();

const createFoodObj = fields => ({
    categoryId: fields.categoryId[0],
    name: fields.name[0],
    kcal: fields.kcal[0],
    protein: fields.protein[0],
    fat: fields.fat[0],
    carbohydrate: fields.carbohydrate[0],
    DF: fields.DF[0],
    VC: fields.VC[0],
    VA: fields.VA[0],
    VE: fields.VE[0],
    carotene: fields.carotene[0],
    VB1: fields.VB1[0],
    VB2: fields.VB2[0],
    niacin: fields.niacin[0],
    cholesterol: fields.cholesterol[0],
    MG: fields.MG[0],
    CA: fields.CA[0],
    FE: fields.FE[0],
    ZN: fields.ZN[0],
    CU: fields.CU[0],
    MN: fields.MN[0],
    K: fields.K[0],
    P: fields.P[0],
    NA: fields.NA[0],
    SE: fields.SE[0],
    rate: fields.rate[0],
    remark: fields.remark[0]
})

const addFood = (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        const token = fields.token[0];
        jwt.verify(token, "node-health", (err, decoded) => {
            if (!err) {
                if(decoded.name !== "token") {
                    res.json({
                        retCode: 500,
                        retMsg: "csrf"
                    })
                }
                const file = files.imgUrl[0];
                const localFile = file.path//"/Users/jemy/Documents/qiniu.mp4";
                const temp = file.path.split("\\");
                const key = temp[temp.length - 1]//'test.mp4';
                // 文件上传
                formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
                    if (respErr) {
                        throw respErr;
                        res.json({
                            retCode: -1,
                            retMsg: "qiniu yun upload erro"
                        })
                    }
                    if (respInfo.statusCode == 200) {
                        console.log(respBody);
                        let food = createFoodObj(fields);
                        food.imgUrl = domain + respBody.key;
                        models.Food.create(food, (err, result) => {
                            if(err) {
                                res.json({
                                    retCode: -1,
                                    retMsg: "add error"
                                })
                            }
                            res.json({
                                retCode: 0,
                                retInfo: {}
                            })
                        })
                    } 
                    else {
                        console.log(respInfo.statusCode);
                        console.log(respBody);
                        res.json({
                            retCode: -1,
                            retMsg: "qiniu yun upload error"
                        })
                    }
                });
            }
            else {
                res.json({
                    retCode: 500,
                    retMsg: "csrf"
                })
            }
        })
    });
}

const editFood = (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        const token = fields.token[0];
        const _id = fields.foodId[0];
        jwt.verify(token, "node-health", (err, decoded) => {
            if (!err) {
                if(decoded.name !== "token") {
                    res.json({
                        retCode: 500,
                        retMsg: "csrf"
                    })
                }
                let updateObj = createFoodObj(fields);
                if(files.imgUrl) {
                    const file = files.imgUrl[0];
                    const localFile = file.path;
                    const temp = file.path.split("\\");
                    const key = temp[temp.length - 1]//'xxx.jpg';
                    //文件上传
                    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
                        if (respErr) {
                            throw respErr;
                            res.json({
                                retCode: -1,
                                retMsg: "qiniu yun upload error"
                            })
                        }
                        if (respInfo.statusCode == 200) {
                            console.log(respBody);
                            updateObj.imgUrl = domain + respBody.key
                            models.Food.findByIdAndUpdate(_id, updateObj, (err, result) => {
                                if(err) {
                                    res.json({
                                        retCode: -1,
                                        retMsg: "add error"
                                    })
                                }
                                res.json({
                                    retCode: 0,
                                    retInfo: {}
                                })
                            })
                        } 
                        else {
                            console.log(respInfo.statusCode);
                            console.log(respBody);
                            res.json({
                                retCode: -1,
                                retMsg: "qiniu yun upload error"
                            })
                        }
                    });
                }
                else {
                    updateObj.imgUrl = fields.oldImgUrl[0];
                    models.Food.findByIdAndUpdate(_id, updateObj, (err, result) => {
                        if(err) {
                            res.json({
                                retCode: -1,
                                retMsg: "add error"
                            })
                        }
                        res.json({
                            retCode: 0,
                            retInfo: {}
                        })
                    })
                }
            }
            else {
                res.json({
                    retCode: 500,
                    retMsg: "csrf"
                })
            }
        })
    });
}

const deleteFood = (req, res) => {
    console.log(req.body);
    const foodId = req.body.foodId;
    models.Food.findById(foodId, (err, result) => {
        if(err) {
            res.json({
                retCode: -1,
                retMsg: "delete error"
            })
        }
        const imgUrl = result.imgUrl;
        const key = imgUrl.split(domain)[1];
        bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
            if (err) {
                console.log(err);
                res.json({
                    retCode: -1,
                    retMsg: "qiniu yun delete error"
                })
                //throw err;
            } 
            if (respInfo.statusCode == 200) { 
                console.log(respBody);
                models.Food.deleteOne({_id: foodId}, (err, result) => {
                    if(err) {
                        res.json({
                            retCode: -1,
                            retMsg: "delete error"
                        })
                    }
                    res.json({
                        retCode: 0,
                        retInfo: {}
                    })
                })
            }
            else {
                console.log(respInfo.statusCode);
                console.log(respBody);
                res.json({
                    retCode: -1,
                    retMsg: "qiniu yun delete error"
                })
            }
        });
    })
}

module.exports = {
    addFood,
    editFood,
    deleteFood
}