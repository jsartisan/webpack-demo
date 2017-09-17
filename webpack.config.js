let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: {
      "app": './src/index.js'
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath : 'dist/',
      filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/, use : [{
          loader : "style-loader"
        }, {
          loader : "css-loader"
        }]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }  
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Tether: 'tether'
    }),
    // new webpack.optimize.UglifyJsPlugin()
  ],
  watch: true
}