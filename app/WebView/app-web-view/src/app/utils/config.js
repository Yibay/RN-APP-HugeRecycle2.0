
// 因为 config-overrides.js 的 rewirePublicPath 也引用 此文件，所以不用 ES6模块；
const publicPath = '/appWebView';


// 线上
// const api_base_recycle = 'https://www.hugehuge.cn';
// const api_base_mall = 'https://mall.hugehuge.cn';

// 测试
// const api_base_recycle = 'http://test.hugehuge.cn';
// const api_base_mall = 'http://test.hugehuge.cn:8070';

// 本机调试
const api_base_recycle = 'http://localhost:8080';
const api_base_mall = 'http://localhost:8070';
// 本机调试（小武）
// const api_base_recycle = 'http://192.168.50.123:8090';
// const api_base_mall = 'http://192.168.50.123:8070';
// 本机调试 (双全)
// const api_base_recycle = 'http://192.168.50.79:8080';
// const api_base_mall = 'http://192.168.50.79:8070';

// 线上调试debug
// const api_base_mall = 'http://114.215.172.207:8070';

module.exports = {
  publicPath,
  // 封装 fetch请求头
  requestHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // 封装 fetch跨域

  // 请求 api接口
  api: {
    // 获取 发布信息列表 (GET)
    publish: `${api_base_recycle}/mobile/artical/all`,
  },
  // 静态资源base路径
  static: {
    // 线上
    // base: 'https://www.hugehuge.cn/web/',
    // // 商城图片资源 base路径
    // mallBase: 'https://hugehuge.oss-cn-hangzhou.aliyuncs.com',

    // 测试
    base: 'http://test.hugehuge.cn/web/',
    // 商城图片资源 base路径
    mallBase: 'https://hugetest.oss-cn-hangzhou.aliyuncs.com',

    // 本机调试（小武）
    // base: 'http://192.168.50.123:8090/web/',

    // 本机调试 (双全)
    // base: 'http://192.168.50.79:8080/web/'
  }
};