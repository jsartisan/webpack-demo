let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: {
    "app": './src/index.js'
  },
  output: {
    path : path.resolve(__dirname, 'dist'),
    filename :  "[name]-[hash].js",
  },
  watch: true
}