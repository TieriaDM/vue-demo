const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir);
}

const BASE_URL = process.env.NODE_ENV === 'production' ? '/iview-admin/' : '/'

module.exports = {
  lintOnSave: true,
  publicPath: BASE_URL, // 以前叫baseUrl，但是已经废弃，改为publicPath
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  productionSourceMap: false,   // 打包时不生成.map文件，减小打包体积，加快打包速度
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
