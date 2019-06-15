// vue.config.js
const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config
      .module
      .rule('scss')
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: [
          path.resolve('./src/style/global.scss')
        ]
      })
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    }
  }
}
