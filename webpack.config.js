var webpack = require('webpack'),
    path = require("path"),
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
    hotPlugin = new webpack.HotModuleReplacementPlugin(),
    CompressionWebpackPlugin = require('compression-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

// 热模式 webpack-dev-server --hot --quiet
module.exports = {
    //插件项
    plugins: [
        commonsPlugin,
        hotPlugin,
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            //加了就能压缩angular
            sourceMap: false,
            mangle: false
        }),
        new CompressionWebpackPlugin({ //gzip 压缩
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css|png|svg|jpg)$'    //压缩 js 与 css
            ),
            threshold: 20480,
            minRatio: 0.8
        }),
        new HtmlWebpackPlugin({
            filename: '../../../index.html',    //生成的文件，从 output.path 开始 output.path + "/react.html"
            template: './index_template.html',  //读取的模板文件,这个路径是相对于当前这个配置文件的
            inject: true, // 自动注入
            minify: {
                removeComments: true,        //去注释
                collapseWhitespace: true,    //压缩空格
                removeAttributeQuotes: true  //去除属性引用
            },
            //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
            chunksSortMode: 'dependency'
        })
    ],
    //页面入口文件配置web[
    entry: {
        login : ['webpack/hot/dev-server','./src/js/main/index.js'],
    },
    devServer: {
        hot : true,
        host : "localhost",
        // host : "192.168.1.230",
        port : 8080,
        compress : true,
    },
    //入口文件输出配置
    /**
     * @param publicPath js路径,path 路径配置,filename --hot 模式下需要 bundle.js
     */
    output: {
        publicPath: "http://localhost:8080/dist/js/main",
        // publicPath: "hz_web/dist/js/main/",
        path: path.resolve(__dirname, "dist/js/main"),
        // filename : "[name].js"
        filename: "app.js",
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/,exclude:/(node_modules)/,loaders: ['babel?presets[]=es2015']},
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader") },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.less$/, loader: "style!css!less?sourceMap"},
            { test: /\.html$/, loader: 'html' },
            { test: /\.(png|jpg)$/, loader: 'file-loader?limit=8192'},
        ]
    },
    externals: {
        angular : true,
        echarts : true,
    }
};


// 编译模式  webpack --display-error-detail
/*
module.exports = {
    //插件项
    plugins: [
        commonsPlugin,
        jqueryPlugin,
        hotPlugin
    ],
    //页面入口文件配置web[
    entry: {
        index : ['./src/js/main/index.js']
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, "dist/js/main"),
        filename : "[name].js"
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/,exclude:/(node_modules|bower_components)/,loader : 'babel',query : {presets:["es2015"]}},
            { test: /\.css$/, loader: 'style-loadenr!css-loader' },
            { test: /\.sass$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
        ]
    },
    //其它解决方案配置
    resolve: {
        root: '~/WebStormSpace/angular_webpack/', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};*/
