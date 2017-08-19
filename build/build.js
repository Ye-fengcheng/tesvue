require('./check-versions')()

process.env.NODE_ENV = 'production'
var arguments = process.argv;
var env = 'production';
if(arguments.length > 1){
  env = arguments[2]
}
process.env.NODE_ENV = !env ? 'production' : env;

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora(process.env.NODE_ENV+'开始构建...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  提示: 构建产生的文件必须部署在一个 HTTP 的服务器上.\n' +
      '  直接打开 index.html 是不会工作的.\n'
    ))
  })
})
