const path = require('path'),
    config = require('./config'),
    VueConfig = require('./vue.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: config.entry,
    devtool: 'inline-source-map',
    devServer: {
        clientLogLevel: 'warning',
        contentBase: config.outputDir,
        port: 9002,
        // hot: true
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
        filename: 'bundle.js',
        path: path.resolve(__dirname, config.outputDir)
    }
};
