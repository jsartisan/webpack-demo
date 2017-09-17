let path = require('path');
let webpack = require('webpack');

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
      test: /\.scss$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },
  watch: true
}