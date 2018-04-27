
// 线上
// const api_base_recycle = '';
// const api_base_recycle = 'http://hugehuge.cn';

// 测试
const api_base_recycle = 'http://test.hugehuge.cn';

// 本机调试
// const api_base_recycle = 'http://192.168.11.124:8080';

module.exports = {

  // 因为 config-overrides.js 的 rewirePublicPath 也引用 此文件，所以不用 ES6模块；
  publicPath: '/appWebView',

  // 封装 fetch请求头
  requestHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  // 请求 api接口
  api: {
    // 获取 发布信息列表 (GET)
    publish: `${api_base_recycle}/mobile/artical/getHugeNews`,
  },
};

// http://192.168.11.124:3000/appWebView/hugeInformation