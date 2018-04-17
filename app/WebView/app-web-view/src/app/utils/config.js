
// 线上
const api_base_recycle = '';

// 测试
// const api_base_recycle = 'http://test.hugehuge.cn';

// 本机调试
// const api_base_recycle = 'http://localhost:8080';

module.exports = {
  // 因为 config-overrides.js 的 rewirePublicPath 也引用 此文件，所以不用 ES6模块；
  publicPath: '/appWebView',
  // 封装 fetch请求头
  requestHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // 封装 fetch跨域

  // 请求 api接口
  api: {
    // 获取 发布信息列表 (GET)
    publish: `${api_base_recycle}/mobile/artical/getHugeNews`,
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
  }
};