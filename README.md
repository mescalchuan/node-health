## Node-Health

利用业余时间，自己做了一个食物热量参考网站，数据参考自一个app`食物库`。技术栈使用了`sass`+`react`+`react-router`+`redux`+`antd`+`express`+`mongoose`。
![node-health](https://upload-images.jianshu.io/upload_images/1495096-ffa2512a13209649.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 一、How To Use
#### 下载
首先将代码clone到本地
```
git clone https://github.com/mescalchuan/node-health.git
```
#### 安装依赖包
```
cd node-health && npm i
```
#### 引入数据并启动mongodb服务
要确保你已经安装了`mongodb`，然后在自己电脑上新建数据库文件夹（我的是E:\mongodbData\db）。在`mongodb`安装目录的`bin`文件夹下启动`mongodb`服务：
```
mongodb --dbpath="E:\mongodbData\db" --port 27017 -journal
```

启动成功后，数据库是没有任何数据的，我们需要将一些默认数据导入进来，我已经将这些数据导出成`json`了，你只需要重开一个命令行并输入：
```
mongoexport -d db -c category -o "E:node-health\db\category.json" --type json --port 27017
mongoexport -d db -c food -o "E:node-health\db\food.json" --type json --port 27017
```
这里推荐一个超轻量级数据库操作工具：[adminMongo](https://github.com/mrvautin/adminMongo)。
![adminMongo](https://upload-images.jianshu.io/upload_images/1495096-e7118805d7624887.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果数据导入成功，那么在`food`和`category`表里会看到导入进来的数据，否则，你需要在`adminMongo`里自己手动创建这两张表，然后再导入数据就可以了。

#### 启动前端服务
```
cd /e/node-health
webpack --watch
```

用户：`http://localhost:8888`
管理员：`http://localhost:8888/admin.html`，用户名和密码均为admin
#### 启动后台服务
```
cd /e/node-health
node app
```
项目截图

![node-health](https://upload-images.jianshu.io/upload_images/1495096-ffa2512a13209649.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![分类](https://upload-images.jianshu.io/upload_images/1495096-f2d395dcca74ce45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![推荐食物](https://upload-images.jianshu.io/upload_images/1495096-b314d35f12de3cf7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![高热量食物](https://upload-images.jianshu.io/upload_images/1495096-8ef8a51aea0bb38d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![食物详情](https://upload-images.jianshu.io/upload_images/1495096-5a308abbb2a3d4cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![搜索结果页](https://upload-images.jianshu.io/upload_images/1495096-a9bf6ad837bd0be8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![管理员登录页](https://upload-images.jianshu.io/upload_images/1495096-45ad6317e2122e73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![后台管理页](https://upload-images.jianshu.io/upload_images/1495096-85fbba304bf1b718.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![添加食物](https://upload-images.jianshu.io/upload_images/1495096-6a581c610961d210.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![食物详情](https://upload-images.jianshu.io/upload_images/1495096-55d878686ece6c52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![修改食物](https://upload-images.jianshu.io/upload_images/1495096-55117aecde6650fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![删除食物](https://upload-images.jianshu.io/upload_images/1495096-4b7fe599c24563ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 二、说明
该项目适用于有一定前端基础（包括`react`和`redux`）和`node.js`基础的同学，如果你正在学习`node`，但又无法将一系列知识体系串起来，那么本项目同样适合你~

### 三、环境搭建
#### 整体目录结构
![](https://upload-images.jianshu.io/upload_images/1495096-d0b177f78d6bc024.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* controller：后端控制层
* db：导出的数据库`json`文件
* model：后端模型层
* router：后端路由
* src：前端代码
* admin.ejs：管理员页面（模板引擎）
* app.js：后端根文件
* index.ejs：用户页面（模板引擎）
* webpack.config.js：`webpack`配置文件

#### 前端
目录结构如下：
![](https://upload-images.jianshu.io/upload_images/1495096-d95fff03f6252fab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从头搭建`webpack`吧，由于用到了后台模板引擎，因此我们就不再单独用`webpack`启动一个服务了。
```
var path = require("path");
var webpack = require("webpack");

var OpenBrowserPlugin = require("open-browser-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
//提高loader的解析速度
var HappyPack = require("happypack");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

//externals配置的对象在生产环境下会自动引入CDN的对象，不会将node_modules下的文件打包进来
var externals = {
    "React": "react",
    "ReactDOM": "react-dom"
}
//配置多入口文件，包括用户和管理员
var entry = {
    "index": "./src/index.js",
    "admin": "./src/admin.js"
};

//最基本的webpack配置
var webpackConfig = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, "src/build"),
        filename: "[name].bundle.js"
    },
    externals: externals,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["happypack/loader?id=babel"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "[name].[ext]"
                }
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            }, 
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader"],
                    fallback: "style-loader"
                })
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    plugins: [
        new HappyPack({
            id: "babel",
            loaders: [{
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "stage-2", "react"]
                }
            }]
        }),
        new CommonsChunkPlugin({
            name: ["vendor"],
            filename: "vendor.bundle.js",
            minChunks: Infinity
        }),
        new NoEmitOnErrorsPlugin(),
        new OpenBrowserPlugin({
            url: "http://localhost:8888"
        }),
        new ExtractTextPlugin("[name].bundle.css", {
            allChunks: false
        }),
        //为了方便调试，暂时屏蔽
        // new UglifyJsPlugin({
        //     minimize: true,
        //     output: {
        //         comments: false,
        //         beautify: false
        //     },
        //     compress: {
        //         warnings: false,
        //         drop_console: true,
        //         collapse_vars: true,
        //         reduce_vars: true
        //     }
        // }),
        new OptimizeCSSPlugin()
    ]
};

module.exports = webpackConfig;
```
之后，使用`webpack --watch`既可以完成打包。

#### 后端
后端基于`express`和`mongoose`，用到了`express-session`和`body-parser，所以我们先把这些包安装好：
```
npm i express mongoose express-session body-parser -S
```

然后我们看一下`app.js`：
```
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(cookieParser());
//解析post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//设置存放模板文件的目录
app.set("views", __dirname);
//设置模板引擎为ejs
app.set("view engine", "ejs");
//访问静态资源文件
app.use(express.static("src"));
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    return res.render("index", {
        userName: "",
        token: "",
        hasLogin: false
    })
})
//连接mongodb，db为该工程的数据库名
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
```

运行`node app`：
![](https://upload-images.jianshu.io/upload_images/1495096-aaec7a6377726802.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们还可以使用`supervisor`实现代码更新功能，只需要`npm i supervisor -g`然后用`supervisor app`代替`node app`即可。每次代码有了变更都会自动帮你重启服务器。

#### 环境搭建结束

到此步为止，环境搭建已经结束，项目也可以成功跑起来了，只不过没有任何内容，剩下的就是一步一步写业务。

### 四、CSRF防范
在写业务之前，简单实现了一下`CSRF的`防范，我的做法是管理员登录成功后，后端直接在页面中生成一个`script`标签，标签内包含了简单的登录信息和`token`。之后管理员每一次与后端交互都要发送这个`token`，由后端校验`token`，如果不一致，则直接返回，不再执行正常逻辑。

#### 模板引擎
由后端生成`script`标签，让我最先想到了模板引擎，因此我使用了`ejs`来实现该功能，这也是为什么用户页面和管理员页面的后缀不是`html`的原因。我们看一下`admin.html`里面的内容吧：

![](https://upload-images.jianshu.io/upload_images/1495096-3d14255409e4604c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

当管理员登录成功后，就可以全局访问`userInfo`了。

下面我们看一下登录的逻辑：
```
const login = module.exports = (req, res) => {
    const {userName, password} = req.body;
    const session = req.session;
    //用户名和密码正确，保存session，并告知前端登录成功
    if(userName === "admin" && password === "admin") {
        if(session) {
            if(session.user) {
                res.json({
                    retCode: -1,
                    retMsg: "您已登录过了"
                })
            }
            else {
                session.user = {
                    userName,
                    password
                }
                res.json({
                    retCode: 0,
                    retInfo: {}
                })
            }
        }
        else {
            res.json({
                retCode: -1,
                retMsg: ""
            })
        }
    }
    else {
        res.json({
            retCode: -1,
            retMsg: "用户名或密码错误"
        })
    }
}
```

#### 中间件
管理员登录成功后，`session`里面保存了登录信息，那么下一步就是生成`token`并将其和用户登录信息渲染到页面中。在`asp.net`和`java`中有一个叫做`拦截器`的东西，它的作用就是拦截所有请求，包括ajax请求和资源请求，在其中做一些操作然后控制请求是否继续往下执行，就像一个管道一样。在`express`中，`中间件`的作用和其是一样的，我们看一下中间件的代码：
```
//app,js
const interceptor = require("./controller/interceptorCtrl");
app.use((req, res, next) => {
    interceptor(req, res, next);
})

//interceptorCtrl.js
const jwt = require('jsonwebtoken');

const interceptor = module.exports = (req, res, next) => {
    let url = req.path;
    //页面请求，判断session是否有值，如果有的话则生成token并将userName、token、hasLogin渲染到页面上
    if(!!(~url.indexOf(".html"))) {
        url = url.replace(/\//g, "");
        const page = url.split(".")[0];
        //将用户登录信息和token返回给前台
        if(req.session.user) {
            const token = jwt.sign({name: "token"}, "node-health", {expiresIn: 600});
            const { userName } = req.session.user;
            res.render(page, {
                userName,
                token,
                hasLogin: true
            })
        }
        else {
            res.render(page, {
                userName: "",
                token: "",
                hasLogin: false
            })
        }
        next();
    }
    //如果是ajax请求并且请求接口来自管理员，那么校验请求参数中的token是否正确，不正确的话则直接返回retCode 500
    else if(!!(~url.indexOf("/api/admin"))) {
        let token = "";
        const method = req.method.toLowerCase();
        if(method == "get") {
            token = req.query.token;
        }
        else {
            token = req.body.token;
        }
        jwt.verify(token, "node-health", function (err, decoded) {
            if (!err) {
                if(decoded.name !== "token") {
                    return res.json({
                        retCode: 500,
                        retMsg: "csrf"
                    })
                }
                else {
                    next();
                }
            }
            else {
                return res.json({
                    retCode: 500,
                    retMsg: "csrf"
                })
            }
        })
    }
    else {
        next();
    }
}
```

功能很简单：如果是页面请求，则判断session是否有用户信息：如果有的话说明登录成功了，生成`token`并将其和登录信息渲染到页面上；如果没有登录信息，则渲染空值即可，执行`next()`让请求继续往下执行。如果是ajax请求，获取请求参数中的`token`并解密，校验值的正确性：如果不正确，则直接返回错误信息，请求不再往下执行；如果正确，执行`next()`让请求继续往下执行。

### 五、写一个Ajax吧
我们以管理员获取所有分类为例，看一下前后端分别是如何实现的。

#### 前端

组件在`componentDidMount`阶段发起`server`的请求 --> 等待后端返回数据 --> 发起`action` --> `reducer`中保存数据 --> 更新视图

##### src/components/admin/center.js
```
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as server from "../../server/adminServer";
...
componentDidMount() {
    this.props.actions.getCategory({token: userInfo.token}, null, res => message.error(res.retMsg));
}
render() {
    return (
        <div>
            ...
            {/*渲染分类列表*/}
            {this.props.category.map((item, index) => (<div>...</div>)}
        </div>
    )
}
...
// 将actions绑定到props上
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(server, dispatch)
});
//将state绑定到props上
const mapStateToProps = (state) => ({
    category: state.adminReducer.category
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCenter);
```

##### src/server/adminServer.js
这里使用到了`redux-thunk`。
```
...
import * as action from "../action/userAction";
export function getCategory(successBK, errorBK) {
    return (dispatch, getState) => {
        return getData(url.SERVER_ADMIN + url.GET_CATEGORY).then(res => {
            if(res.retCode == 0) {
                dispatch(action.getCategory(res.retInfo));
                successBK && successBK(res.retInfo);
            }
            else {
                errorBK && errorBK(res);
            }
        }, e => console.log(e))
        .catch(e => console.log(e))
    }
}
```

##### src/actionType/userAction.js
```
...
export function getCategory(category) {
    return {
        type: types.GET_CATEGORY,
        category
    }
}
```

##### src/reducer/adminReducer.js
```
...
const defaultState = {
    category: []
}
const adminReducer = (state = defaultState, action) => {
    switch(action.type) {
        case types.GET_CATEGORY: 
            return Object.assign({}, state, {
                category: action.category
            })
        default:
            return state;
    }
}
export default adminReducer;
```

#### 后端
`中间件`拦截请求，校验`token`并继续执行 --> 路由映射 --> 转发给控制层 --> 处理并返回数据

##### app.js
```
...
const adminRouter = require("./router/adminRouter");

app.use("/api/admin", adminRouter);
...
```

##### router/adminRouter.js
```
const express = require("express");
const category= require("../controller/user/category");
const router = express.Router();
...
//调用控制层
router.get("/getCategory", (req, res) => {
    category.getCategory(req, res);
})

module.exports = router;
```

##### controller/user/category
```
const models = require("../../model/index");
//从数据库中读取分类并返回给前端
const getCategory = (req, res) => {
    models.Category.find((err, result) => {
        if(err) {
            res.json({
                retCode: -1,
                retMsg: "mongoose error"
            })
        }
        res.json({
            retCode: 0,
            retInfo: result
        })
    })
}

module.exports = {
    getCategory
}
```

![](https://upload-images.jianshu.io/upload_images/1495096-7d39ad4d5ba42568.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 六、图片上传
管理员添加和修改食物信息时需要上传图片。如果只是练习的话，可以将图片保存到本地并将图片绝对路径保存到数据库中。但是，我们来个更加贴切真实项目的吧，将图片保存到图片服务器中~

我们将图片保存到`七牛云`存储系统中，你需要先注册个账号，官网地址在[这里](https://www.qiniu.com/)。

在管理控制台 --> 对象存储 --> 内容管理中可以看到已经存储的图片：
![](https://upload-images.jianshu.io/upload_images/1495096-624c106bf6b7671d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下一步要做的就是前端上传图片发送给后端，后端上传到七牛云并将图片链接保存到数据库。

#### 前端上传图片
使用`<input type="file" />`实现图片选择。默认样式比较丑，因此我自己重写了样式：
![](https://upload-images.jianshu.io/upload_images/1495096-f78df8643831c1e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后要做的就是使用`formData`对象将图片信息发送给后端。
```
const fileEle = this.refs.file;
const file = fileEle.files[0];
let formData = new FormData();
formData.append("imgUrl", file);
formData.append("name", this.state.name);
...
this.props.actions.addFood(formData);
```

#### 后端接收图片
后端接收图片需要用到`multiparty`插件，你只需要`npm i multiparty -S`即可。

```
//controller/admin/foodHandler.js
const multiparty = require("multiparty");

const addFood = (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        console.log(files);
    })
}
```

![](https://upload-images.jianshu.io/upload_images/1495096-673e21339f1f2449.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 上传到七牛云
我们需要使用到七牛云的`node sdk`，`npm i qiniu -S`。使用文档请访问[Node.js SDK](https://developer.qiniu.com/kodo/sdk/1289/nodejs)。

我们首先要做一些配置：
```
//七牛云图片域名
const domain = "http://ox6gixp8f.bkt.clouddn.com/";
//两个密钥，可以在七牛云的个人中心的密钥管理中找到
const accessKey = "qVavZs09FHGxYJdaC-1ZDQeqJVbJQAbyOPnBGu5g";
const secretKey = "I4Y4lXRbZz4zL7t2llASK5Lg8Eo5zKEna_uTCPfe";
//定义鉴权对象mac
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//空间名，请和你的七牛云空间名保持一致
const bucket = "sunnychuan";
//上传的凭证
const options = {
    scope: bucket,
    expires: 7200
};
//生成凭证
const putPolicy = new qiniu.rs.PutPolicy(options);
//生成token
const uploadToken = putPolicy.uploadToken(mac);
//初始化config
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
//七牛云图片上传对象
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();
```
接下来要做的就是将图片信息上传到七牛云：
```
const file = files.imgUrl[0];
const localFile = file.path;
const temp = file.path.split("\\");
const key = temp[temp.length - 1]; //xxx.jpg

formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
    if(respInfo.statusCode == 200) {
        const imgUrl = domain + respBody.key;
        //保存到数据库即可
    }
})
```

我们可以在七牛云上看到已经上传的图片：
![](https://upload-images.jianshu.io/upload_images/1495096-fe9e12a4ba7b95c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 结束语
本项目从功能上来说只是简单的`CRUD`，但用到的技术比较多，也是为了给自己做一个整体技术栈的实战，后期还可以考虑添加分页和排序功能。

如果你觉得对你有帮助，欢迎`star`~，如果有任何疑问或bug，也欢迎提供`issue`。
