const multiparty = require("multiparty");
const jwt = require("jsonwebtoken");
const qiniu = require("qiniu");
const models = require("../../model/index");

const domain = "http://mescal-chuan.oss-cn-beijing.aliyuncs.com/";

const OSS = require('ali-oss');
const client = new OSS({
    region: 'oss-cn-beijing',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: 'LTAIa2EaQxqPMBfb',
    accessKeySecret: 'WjKeNw8gAdU1y80SpO1JYnWfzq9Pbe',
    bucket: 'mescal-chuan'
  });

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
                let temp = file.path.split("\\");
                if(temp.length <= 1) {
                    temp = file.path.split("/")
                }
                const key = temp[temp.length - 1]//'test.mp4';
                // 文件上传

                client.put('/' + key, localFile).then((respBody, reject) => {
                    if (reject) {

                        res.json({
                            retCode: -1,
                            retMsg: "ali yun upload erro"
                        })
                        throw reject;
                    }
                    console.log(respBody)
                    if(respBody.res.statusCode == 200) {
                        let food = createFoodObj(fields);
                        food.imgUrl = domain + respBody.name;
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
                        console.log(respBody);
                        console.log(respBody.res.statusCode);
                        res.json({
                            retCode: -1,
                            retMsg: "ali yun upload error"
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
                    let temp = file.path.split("\\");
                    if(temp.length <= 1) {
                        temp = file.path.split("/")
                    }
                    const key = temp[temp.length - 1]//'xxx.jpg';
                    //文件上传
                    client.put(key, localFile).then((respBody, reject) => {
                        if (reject) {

                            res.json({
                                retCode: -1,
                                retMsg: "ali yun upload erro"
                            })
                            throw reject;
                        }
                        console.log(respBody)
                        if(respBody.res.statusCode == 200) {
                            updateObj.imgUrl = domain + respBody.name;
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
                            console.log(respBody);
                            console.log(respBody.res.statusCode);
                            res.json({
                                retCode: -1,
                                retMsg: "ali yun upload error"
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
        const key = imgUrl.split(domain)[1]//.split('.')[0];
        console.log(key)
        client.delete(key).then((respBody, reject) => {
            if (reject) {
                console.log(reject);
                res.json({
                    retCode: -1,
                    retMsg: "ali yun delete error"
                })
                //throw err;
            }
            if (respBody.res.statusCode == 200 || respBody.res.statusCode == 204) {
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
                console.log(respBody.res.statusCode);
                console.log(respBody);
                res.json({
                    retCode: -1,
                    retMsg: "ali yun delete error"
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
