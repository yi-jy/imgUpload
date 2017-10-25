var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    zepto: ['n-zepto'],
    ['zepto.imgupload']: path.resolve(__dirname, './src/res/js/zepto.imgupload.js')
  },
  output: {
    path: path.resolve(__dirname, './demo'),
    filename: '[name].min.js'
  },

  devServer: {
    inline: true,
    historyApiFallback: true
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.less$/i,
        loader:  ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
          publicPath: '../'
        })
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      },

      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash:8]'
　　　},

      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/demo.html',
      inject: 'head'
    }),
    new ExtractTextPlugin('css/style.[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['zepto']
    })
  ]
};