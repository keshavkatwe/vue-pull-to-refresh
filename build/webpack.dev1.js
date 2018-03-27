 const merge = require('webpack-merge'),
     common = require('./webpack.common.js'),
     path = require('path'),
     ExtractTextPlugin = require('extract-text-webpack-plugin'),
     webpack = require('webpack'),
     Config = require('./config');

 module.exports = merge(common, {
     devtool: 'inline-source-map',
     devServer: {
         clientLogLevel: 'warning',
         contentBase: Config.outputDir,
         port: 9000,
         hot: true
     },
     plugins: [
         // new webpack.NamedModulesPlugin(),
         // new webpack.HotModuleReplacementPlugin(),
     ],
 });