var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    zepto: ['n-zepto'],
    ['zepto.imgupload']: path.resolve(__dirname, './src/res/js/zepto.imgupload.js'),
  },
  output: {
    path: path.resolve(__dirname, './demo'),
    filename: '[name].min.js'
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
          presets: ['es2015', 'react']
        }
      },

      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash:8]'
　　　},

      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './demo.html',
      template: __dirname + '/src/demo.html',
      inject: 'head'
    }),
    new ExtractTextPlugin('zepto.imgupload.min.css'),
    new CleanWebpackPlugin(
      [
        'demo'
      ]
    )
  ]
};