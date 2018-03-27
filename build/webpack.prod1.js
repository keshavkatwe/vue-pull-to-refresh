const webpack = require('webpack'),
    merge = require('webpack-merge'),
    common = require('./webpack.common'),
    path = require('path'),
    Config = require('./config'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    WorkboxPlugin = require('workbox-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
    SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
    utils = require('./utils'),
    AppCachePlugin = require('appcache-webpack-plugin-client'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'

module.exports = merge(common, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin([Config.outputDir], {
            allowExternal: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
                // map: {
                //     inline: false
                // }
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            //     serviceWorkerLoader: `<script>${utils.loadMinified(path.join(__dirname,
            // './service-worker-prod.js'))}</script>`
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new AppCachePlugin({
            cache: ['../'],
            network: ['*'], // No network access allowed!
            fallback: [],
            settings: ['prefer-online'],
            exclude: ['index.html', '.map$'], // Exclude file.txt and all .js files
            output: '../dist/manifest.appcache'
        })
        // service worker caching
        // new SWPrecacheWebpackPlugin({
        //     cacheId: 'vue-pwa',
        //     filename: 'service-worker.js',
        //     staticFileGlobs: ['dist/**/*.{js,html,css}'],
        //     minify: true,
        //     stripPrefix: 'dist/'
        // })
    ],
    output: {
        filename: Config.scriptOutputFile,
        path: Config.outputDir,
        publicPath: '/'
    },
});