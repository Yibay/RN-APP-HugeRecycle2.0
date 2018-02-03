/**
 * 封装 fetch 请求模块
 */

// 工具, 用于字符串序列化
import queryString from 'query-string';
// 工具，用于混入属性
import _ from 'lodash';


import config from './config';


// 用 export default 对外暴露整个模块
// 用 export 的话，import 时，需 import * as request
let request = {};

/**
 * get 请求函数
 * @param {string} url
 * @param {Object} [data]
 * @param {Object} [header]
 * @returns {Promise<any>}
 */
request.get = function(url, data, headers){

  // fetch url
  data && (url += '?' + queryString.stringify(data) );

  // fetch options
  let options = _.merge(
    { method: 'GET' },
    { headers: config.requestHeaders },
    headers ? { headers } : {}
  );

  return fetch(url, options)
    .catch(e => {console.log('fetch请求时报错'); console.log(e);})
    .then(res => res.json())
    .catch(e => {console.log('json解析时报错'); console.log(e); return null;})
};

/**
 * post 请求函数
 * @param {string} url
 * @param {Object} [data]
 * @param {Object} [header]
 * @returns {Promise<any>}
 */
request.post = function(url, data, headers){

  // fetch options
  let options = _.merge(
    { method: 'POST' },
    { headers: config.requestHeaders },
    data ? { body: JSON.stringify(data) } : {},
    headers ? { headers } : {}
  );

  return fetch(url ,options)
    .catch(e => {console.log('fetch请求时报错'); console.log(e);})
    .then(res => res.json())
    .catch(e => {console.log('json解析时报错'); console.log(e); return null;})
};

/**
 * postFormData 以Form表单形式，发送post请求
 * @param url
 * @param data
 * @param headers
 * @returns {Promise<any>}
 */
request.postFormData = function(url ,data, headers){

  // fetch options
  let options = _.merge(
    { method: 'POST' },
    { headers: {'Content-Type': 'multipart/form-data'} },
    data ? { body: constructFormData(data)} : {},
    headers ? { headers } : {}
  );

  return fetch(url, options)
    .catch(e => {console.log('fetch请求时报错'); console.log(e);})
    .then(res => res.json())
    .catch(e => {console.log('json解析时报错'); console.log(e); return null;})
};

function constructFormData(data){
  if(typeof data === 'object'){
    let formData = new FormData();
    Reflect.ownKeys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return formData;
  }
  else {
    return {};
  }
}

export default request;