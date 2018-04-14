/* config-overrides.js */
const {getLoader, loaderNameMatches} = require('react-app-rewired');


/** 工具函数 */
// 参考 react-app-rewired getLoader
// 参考 react-app-rewire-typescript findIndexAndRules
const findIndexAndRules = function(rules, matcher) {
  var loader;

  rules.some((rule, index) => {
    return (loader = matcher(rule)
      ? {rules, index}
      : findIndexAndRules(rule.use || rule.oneOf || [], matcher));
  });

  return loader;
};
// 参考 react-app-rewire-typescript addBeforeRule
const addBeforeRule = (rules, matcher, value) => {
  const location = findIndexAndRules(rules, matcher);
  location.rules.splice(location.index, 0, value);
};
const addExclude = (rules, loader_name, extension) => {
  const loader = getLoader(rules, rule => loaderNameMatches(rule, loader_name) && rule.exclude);
  loader && loader.exclude.push(extension);
};

/** sass loaders 配置 */
const sassExtension = /\.scss$/;
const sassRules = {
  test: sassExtension,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        // 启用 css模块化
        modules: true,
        // 启用 css模块化的sourceMap
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: loader => [require('autoprefixer')()]
      }
    },
    {
      loader: 'sass-loader'
    }
  ]
};

/** 覆写 webpack 配置 */
function rewireSass(config, env){

  // 添加 sass loader
  addBeforeRule(config.module.rules, rule => loaderNameMatches(rule, 'file-loader'), sassRules);

  // Exclude all less files (including module files) from file-loader
  addExclude(config.module.rules, 'file-loader', sassExtension);

  return config;
}


module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireSass(config, env);

  console.log(config.module.rules[1].oneOf[3]);

  return config;
};