const multiparty = require('multiparty');
const jwt = require('jsonwebtoken');
const qiniu = require('qiniu');
const request = require('request');

var accessKey = 'qVavZs09FHGxYJdaC-1ZDQeqJVbJQAbyOPnBGu5g';
var secretKey = 'I4Y4lXRbZz4zL7t2llASK5Lg8Eo5zKEna_uTCPfe';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
    scope: "sunnychuan",
  };
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
// var options = {
//     scope: bucket,
//     expires: 7200
//   };
//   var putPolicy = new qiniu.rs.PutPolicy(options);
//   var uploadToken=putPolicy.uploadToken(mac);

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
                var config = new qiniu.conf.Config();
                // 空间对应的机房
                config.zone = qiniu.zone.Zone_z0;
                var localFile = file.path//"/Users/jemy/Documents/qiniu.mp4";
                var formUploader = new qiniu.form_up.FormUploader(config);
                var putExtra = new qiniu.form_up.PutExtra();
                const temp = file.path.split("\\");
                var key=temp[temp.length - 1]//'test.mp4';
                // 文件上传
                formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
                    if (respErr) {
                        throw respErr;
                    }
                    if (respInfo.statusCode == 200) {
                        console.log(respBody);
                    } else {
                        console.log(respInfo.statusCode);
                        console.log(respBody);
                    }
                });
                res.json({
                    retCode: 11
                })
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