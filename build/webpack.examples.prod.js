const webpack = require('webpack'),
    path = require('path');
const isProduction = process.env.NODE_ENV === 'production'
const VueConfig = require('./vue.config');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './examples/main.js',
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
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './examples/index.html',
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': config.alias,
        }
    },
    output: {
        filename: 'vue-pull-to-refresh.js',
        path: path.resolve(__dirname, '../examples/dist')
    }
};