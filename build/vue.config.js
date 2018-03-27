const Config = require('./config'),
    utils = require('./utils');

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    // extractCSS: true,
    loaders: utils.cssLoaders({
        sourceMap: false,
        extract: false
    })
}