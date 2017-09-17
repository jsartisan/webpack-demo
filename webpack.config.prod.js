let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// outfile name based on enviroment
let outfileName = "[name]-[hash]";
let publicPath = "/";


// plugins
let plugins = [];

plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false
    }
}));
plugins.push(new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
        discardComments: {
            removeAll: true
        }
    },
    canPrint: true
}));
plugins.push(new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Tether: 'tether'
}));
plugins.push(new ExtractTextPlugin("[name]-[hash].css"));

// loaders
let styleLoaders = [
  { loader: "css-loader", options : { sourceMap : false } },
  { loader: "sass-loader",  options : { sourceMap : false } }
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
                        options : { sourceMap : false }
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
    devtool: 'cheap-module-source-map',
    watch: true
}