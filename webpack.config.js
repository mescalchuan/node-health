var path = require('path');
var webpack = require('webpack');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
//提高loader的解析速度
var HappyPack = require('happypack');
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

//是否为开发环境
var isDevelopment = process.env.NODE_ENV !== 'production';
//externals配置的对象在生产环境下会自动引入CDN的对象，不会将node_modules下的文件打包进来
//在开发环境下，会自动将node_modules里的文件打包
var externals = {
    //import angular(value) from 'angular'(key)
    'React': 'react',
    'ReactDOM': 'react-dom'
}

var htmlPluginArr = [new HtmlWebpackPlugin({
    //htmlPlugin的filename的参考路径是output的path
    filename: '../build/index.html',
    template: './index.html',
    chunks: ['vendor', 'index'],
    inject: true,
    chunksSortMode: 'manual',
    xhtml: true,
    showErrors: true,
    minify: false
})]

var entry = {
    //vendor: [],
    'index': './src/index.js'
};

//最基本的webpack配置
var webpackConfig = {
    entry: entry,
    externals: isDevelopment ? {} : externals,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=babel']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: isDevelopment ? '[name]_[hash:8].[ext]' : '../image/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    devServer: {
        hot: true,
        inline: true,
        progress: true,
        contentBase: path.resolve(__dirname),
        compress: true,
        port: '8888',
        stats: {
            colors: true
        },
        proxy:{
            '/*.json':{
                target:'http://localhost:3005', // 8005 为mock服务所绑定的端口号
                secure:false
            }
        }
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            }]
        }),
        new CommonsChunkPlugin({
            name: ['vendor'],
            filename: isDevelopment ? 'vendor.__bundle.js' : 'vendor_[chunkhash:8].bundle.js',
            minChunks: Infinity
        })
    ]
};
//当前环境是开发环境：自动启动入口页面，支持热更新，映射原始代码，开启mock服务
if (isDevelopment) {
    webpackConfig.output = {
        path: path.resolve(__dirname, 'src/webpack_temp'),
        filename: '[name].__bundle.js',
        chunkFilename: '[id].__bundle.js',
        //开发环境下是否开启了本地服务器？否：是
        publicPath: process.env.NODE_ENV ? '../js/' : '/'
    };
    var cssLoader = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    };
    var sassLoader = {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
    }
    webpackConfig.module.rules.push(sassLoader);
    webpackConfig.module.rules.push(cssLoader);
    webpackConfig.devtool = 'source-map';
    webpackConfig.plugins = webpackConfig.plugins.concat([
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8888/index.html'
        })
    ]);
}
//当前环境是生产环境：去掉注释、压缩代码、生成html文件
else {
    webpackConfig.output = {
        path: path.resolve(__dirname, 'src/build'),
        filename: '[name]_[chunkhash:8].bundle.js',
        //异步加载模块
        chunkFilename: '[id]_[chunkhash:8].bundle.js',
        publicPath: './'
    }
    var cssLoader = {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
        })
    };
    var sassLoader = {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
        })
    }
    webpackConfig.module.rules.push(sassLoader);
    webpackConfig.module.rules.push(cssLoader);
    webpackConfig.plugins = webpackConfig.plugins.concat([
        new UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false,
                beautify: false
            },
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true
            }
        }),
        new ExtractTextPlugin('[name]_[chunkhash:8].bundle.css', {
            allChunks: false
        }),
        new OptimizeCSSPlugin()
    ]);
    webpackConfig.plugins = webpackConfig.plugins.concat(htmlPluginArr);
}

module.exports = webpackConfig;