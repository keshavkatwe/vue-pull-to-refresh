const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let configs = {
    default: {
        entry: resolve('examples/main.js'),
        // globalScss: path.resolve(__dirname, '../src/assets/styles/_global.scss'),
        alias: resolve('src')
    },
    dev: {
        scriptOutputFile: 'scripts/[name].js',
        outputDir: path.resolve(__dirname, '../examples/dist'),
        cssOutputFile: 'styles/style.css',
    },
    prod: {
        scriptOutputFile: 'scripts/[name].[chunkhash].bundle.min.js',
        outputDir: path.resolve(__dirname, '../dist'),
        cssOutputFile: 'styles/style.[chunkhash].min.css'
    }
}

module.exports = Object.assign(configs.default, process.env.NODE_ENV == 'production' ? configs.prod : configs.dev);