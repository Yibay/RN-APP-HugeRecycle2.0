const HtmlWebpackPlugin = require('html-webpack-plugin');


function rewireHtmlWebpackPlugin(config, env){

  config.plugins.forEach(item => {
    if(item instanceof HtmlWebpackPlugin){
      item.options.minify = item.options.minify || {};
      item.options.minify.keepClosingSlash = true; // 保存反斜杠
    }
  });

  return config;
}

module.exports = rewireHtmlWebpackPlugin;