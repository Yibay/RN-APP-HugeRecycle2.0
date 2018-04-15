const config = require('../src/app/utils/config');

function rewirePublicPath(config, env){

  if(env === 'production'){
    config.output.publicPath = `${config.publicPath}/`;
  }
  else if(env === 'development'){
    // do noting
  }
  
  return config;
}

module.exports = rewirePublicPath;