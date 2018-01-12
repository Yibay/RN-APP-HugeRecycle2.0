/**
 * 请求相关配置
 */

export default {
  // 封装 fetch请求头
  requestHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // 请求 api接口
  api: {
    // base: 'http://test.hugehuge.cn/',
    base: 'http://www.hugehuge.cn/',
    getProducts: 'api/mobile/normal/getProducts',
    // 获取
    getLocateCommunity: 'http://192.168.11.122:8080/api/customer/app/deal/getLocateCommunity',
    // 获取 短信验证码
    getCode: 'mobile/auth/requestSmsCode',
    // 获取 身份验证的 accessToken
    getToken: 'mobile/auth/login',
    // 获取 客户下单页面 初始化数据
    initRecycleCreate: 'api/mobile/deal/initRecycleCreate',
    // 获取 客户地址列表
    getAddressList: 'api/mobile/deal/addresses',
    // 获取 地区信息
    getAddressInfo: 'api/mobile/normal/addressinfo',
    // 新增 客户地址
    addAddress: 'api/mobile/deal/addAddress',
    // 编辑 客户地址
    editAddress: 'api/mobile/deal/editAddress',
    // 删除 客户地址
    deleteAddress: 'api/mobile/deal/deleteAddress/',
    // 设置 默认地址
    setDefaultLocation: 'api/mobile/deal/setDefaultLocation/',
    // 移动端 下单
    createOrder: 'api/mobile/deal/createOrder',
    // 查看 我的订单
    myOrders: 'api/mobile/deal/myOrders',
    // 查看 订单详情(根据path {id} 查询)
    order: 'api/mobile/deal/order/',
    // 发送 客户反馈
    createFeedback: 'api/mobile/deal/createFeedback',
    // 获取 最新版本号
    version: 'api/mobile/normal/version',
    // WebView 进入个人中心页面
    userCenter: 'web/mobile/mall/user/index?code=',
    // WebView 进入商城主页
    shoppingMall: 'web/mobile/mall/index?code=',
    // 获取 发布信息列表
    publish: 'mobile/artical/all'
  },
  // 静态资源base路径
  static: {
    base: 'http://test.hugehuge.cn/web/'
  },
  // 版本号
  version: 1.11
}