function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = ['production', 'prod'].includes(process.env.NODE_ENV)

const assetsCDN = {
  externals: {
    vue: 'Vue',
    axios: 'axios',
    'ant-design-vue': 'antd',
  },
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.js',
  ],
  css: [
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.css',
  ]
}

module.exports = {
  configureWebpack: {
    externals: isProd ? assetsCDN.externals : {},
  },
  chainWebpack: config => {
    if (isProd) {
      //cdn配置
      config.plugin('html').tap(args => {
        if (args && args[0]) {
          args[0].assets = assetsCDN
        }
        return args
      })
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        // do not remove this line
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'nuxt-less-resources-loader': [
      'node_modules/ant-design-vue/es/style/themes/default.less'
    ],
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['node_modules/ant-design-vue/es/style/themes/default.less']
    }
  }
}