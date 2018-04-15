/* config-overrides.js */
const {compose}  = require('react-app-rewired');

const rewireSass = require('./rewire/rewireSass');
const rewireHtmlWebpackPlugin = require('./rewire/rewireHtmlWebpackPlugin');
const rewirePublicPath = require('./rewire/rewirePublicPath');


module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = compose(rewireSass, rewireHtmlWebpackPlugin, rewirePublicPath)(config, env);

  return config;
};