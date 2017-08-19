var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'uat'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
