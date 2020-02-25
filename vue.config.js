const glob = require('glob')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'html']
const isProduction = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

let jsFileNames = []
function getEntry (globPath) {
  let entries = {}
  let tmp = []
  let htmls = {}

  // 页面名字唯一
  // 获取/src/pages/**下所有的html文件
  glob.sync(globPath + 'html').forEach((entry) => {
    // ['.', 'src', 'pages', 'test', 'test.html'].splice(-3)
    // ['pages', 'test', 'test.html']
    tmp = entry.split('/').splice(-3)
    let fileName = tmp[tmp.length - 1].split('.')[0]
    htmls[fileName] = entry
  })

  // 获取/src/pages/**下所有的js文件
  glob.sync(globPath + 'js').forEach((entry) => {
    // console.log(entry)
    tmp = entry.split('/').splice(-3)
    let fileName = tmp[tmp.length - 1].split('.')[0]
    jsFileNames.push(fileName)
    entries[fileName] = {
      entry,
      template: htmls[fileName],
      filename: fileName + '.html',
      chunks: ['chunk-vendors', 'chunk-common', fileName]
    }
  })
  // console.log(entries)
  return entries
}

let htmls = getEntry('./src/pages/**/*.')

module.exports = {
  pages: htmls,
  publicPath: isProduction ? 'https://static.test.com/' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8987,
    open: false,
    index: '/test.html'
  },
  filenameHashing: true,
  productionSourceMap: !isProduction,
  chainWebpack: config => {
    // console.log(jsFileNames)
    // 删除 preload
    jsFileNames.forEach(name => {
      config.plugins.delete(`preload-${name}`)
    })
    // 路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          minChunks: jsFileNames.length,
          test: /node_modules/,
          priority: -10,
          chunks: 'initial'
        },
        common: {}
      }
    })
  },
  configureWebpack: config => {
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios'
    }
    console.log(isProduction)
    if (isProduction) {
      // 压缩gzip
      config.plugins.push(new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240, // 大于10M // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
        // deleteOriginalAssets: true // 删除原文件
      }))
      // 代码压缩
      config.plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
          // 移出console.log
          compress: {
            // warnings: false, // 若打包错误，则注释这行
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        parallel: true
      }))
    }
  },
  css: {
    // CSS 提取至一个独立的 CSS 文件中
    extract: true
  },
  pluginOptions: {

  }
}
