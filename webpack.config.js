let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        "app": './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options : { sourceMap : true }
                }]
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader", // translates CSS into CommonJS
                    options : { sourceMap : true }
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    options : { sourceMap : true }
                }]
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                }
            }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: [{
                loader: 'file-loader'
            }]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Tether: 'tether'
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin(),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: {
        //         discardComments: {
        //             removeAll: true
        //         }
        //     },
        //     canPrint: true
        // })
    ],
    devtool: 'inline-source-map',
    watch: true
}