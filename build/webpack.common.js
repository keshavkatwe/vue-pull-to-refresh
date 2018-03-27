const Config = require('./config'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    VueConfig = require('./vue.config'),
    path = require('path');

module.exports = {
    entry: {
        app: Config.entry,
    },
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
        new ExtractTextPlugin(Config.cssOutputFile),
        new HtmlWebpackPlugin({
            template: './examples/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': Config.alias,
        }
    },
    output: {
        filename: Config.scriptOutputFile,
        path: Config.outputDir,
        publicPath: '/'
    },
}