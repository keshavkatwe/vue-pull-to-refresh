const webpack = require('webpack'),
//     merge = require('webpack-merge'),
//     common = require('./webpack.common'),
    path = require('path');

//     Config = require('./config'),
//     CleanWebpackPlugin = require('clean-webpack-plugin'),
//     WorkboxPlugin = require('workbox-webpack-plugin'),
//     ExtractTextPlugin = require('extract-text-webpack-plugin'),
//     HtmlWebpackPlugin = require('html-webpack-plugin'),
//     OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
//     SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
//     utils = require('./utils'),
//     AppCachePlugin = require('appcache-webpack-plugin-client'),
//     UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//
const isProduction = process.env.NODE_ENV === 'production'
const VueConfig = require('./vue.config');
const config = require('./config');


module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: VueConfig
        },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': config.alias,
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'vue-pull-to-refresh.js'
    }
};