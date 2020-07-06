const webpack = require('webpack')
const path = require('path');
const createThemeColorReplacerPlugin = require('./webpack-config/themeReplacer.plugin')

const isProd = ["production", "prod"].includes(process.env.NODE_ENV);
const PRIMARY_COLOR = '#1890ff';
const THEME_FILE_PATH =  'src/assets/styles/theme.less';

//CDN配置设置
const assetsCDN = {
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'moment': 'moment',
    "lodash": "lodash",
    'axios': 'axios',
    'ant-design-vue': 'antd',
  },
  css: [],
  js: [
    "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    "https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js",
    "https://cdn.jsdelivr.net/npm/vuex@3.1.3/dist/vuex.min.js",
    "https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js",
    "https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js",
    "https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js",
    "https://cdn.jsdelivr.net/npm/ant-design-vue@1.5.3/dist/antd.min.js"
  ]
}

module.exports = {
  pwa: { //favicon图标
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      maskIcon: 'favicon.png',
      msTileImage: 'favicon.png'
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      createThemeColorReplacerPlugin(PRIMARY_COLOR, THEME_FILE_PATH)
    ],
    externals: isProd ? assetsCDN.externals : {}
  },
  chainWebpack: (config) => {
    if (isProd) { //cdn配置
      config.plugin('html').tap(args => {
        if (args && args[0]) {
          args[0].cdn = assetsCDN
        }
        return args
      })
    }

    if (process.env.use_analyzer) { //打包分析
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  pluginOptions: {
    'nuxt-less-resources-loader': [
      'src/assets/styles/theme.less'
    ],
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['src/assets/styles/theme.less']
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: { //需要修改的变量
          '@primary-color': PRIMARY_COLOR
        },
        // do not remove this line
        javascriptEnabled: true
      }
    }
  },

}
