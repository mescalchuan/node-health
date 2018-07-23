const multiparty = require('multiparty');
const jwt = require('jsonwebtoken');
const qiniu = require('qiniu');
const request = require('request');
const models = require("../../model/index");

var accessKey = 'qVavZs09FHGxYJdaC-1ZDQeqJVbJQAbyOPnBGu5g';
var secretKey = 'I4Y4lXRbZz4zL7t2llASK5Lg8Eo5zKEna_uTCPfe';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
    scope: "sunnychuan",
  };
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const addFood = module.exports = (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        const token = fields.token[0];
        jwt.verify(token, "node-health", function (err, decoded) {
            if (!err) {
                if(decoded.name !== "token") {
                    res.json({
                        retCode: 500,
                        retMsg: "csrf"
                    })
                }
                const file = files.imgUrl[0];
                const config = new qiniu.conf.Config();
                // 空间对应的机房
                config.zone = qiniu.zone.Zone_z0;
                const localFile = file.path//"/Users/jemy/Documents/qiniu.mp4";
                const formUploader = new qiniu.form_up.FormUploader(config);
                const putExtra = new qiniu.form_up.PutExtra();
                const temp = file.path.split("\\");
                const key = temp[temp.length - 1]//'test.mp4';
                // 文件上传
                formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
                    if (respErr) {
                        throw respErr;
                        res.json({
                            retCode: -1,
                            retMsg: "qiniu yun upload erro"
                        })
                    }
                    if (respInfo.statusCode == 200) {
                        console.log(respBody);
                        models.Food.create({
                            imgUrl: "http://ox6gixp8f.bkt.clouddn.com/" + respBody.key,
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
                        }, (err, result) => {
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