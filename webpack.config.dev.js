let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// outfile name based on enviroment
let outfileName = "[name]";
let publicPath = "/";


// plugins
let plugins = [];

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());
plugins.push(new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Tether: 'tether'
}));
plugins.push(new ExtractTextPlugin("[name].css"));

// loaders
let styleLoaders = [
  { loader: "css-loader", options : { sourceMap : true } },
  { loader: "sass-loader",  options : { sourceMap : true } }
];

module.exports = {
    entry: {
        "app": './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath : publicPath,
        filename: outfileName + ".js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options : { sourceMap : true }
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: styleLoaders
                })
            }, 
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    }
                }]
            }, 
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    plugins: plugins,
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    devServer : {
        hot : true,
        inline: true,
        port :  8080,
        contentBase: path.resolve(__dirname, ''),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
}