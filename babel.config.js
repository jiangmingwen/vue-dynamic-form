let plugins = [];

if(['production', 'prod'].includes(process.env.NODE_ENV)){
  plugins.push("transform-remove-console");//生产环境移除console 控制台信息
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
