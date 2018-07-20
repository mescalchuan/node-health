var path = require('path');
var webpack = require('webpack');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

//提高loader的解析速度
var HappyPack = require('happypack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

//externals配置的对象在生产环境下会自动引入CDN的对象，不会将node_modules下的文件打包进来
//在开发环境下，会自动将node_modules里的文件打包
var externals = {
    //import angular(value) from 'angular'(key)
    'React': 'react',
    'ReactDOM': 'react-dom'
}

var entry = {
    //vendor: [],
    'index': './src/index.js',
    'admin': './src/admin.js'
};

//最基本的webpack配置
var webpackConfig = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'src/build'),
        filename: '[name].bundle.js'
    },
    externals: externals,
    devtool: 'source-map',
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
                    name: '[name].[ext]'
                }
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }, 
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
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
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new NoEmitOnErrorsPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8888/admin.html'
        }),
        new ExtractTextPlugin('[name].bundle.css', {
            allChunks: false
        }),
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
        new OptimizeCSSPlugin()
    ]
};

module.exports = webpackConfig;