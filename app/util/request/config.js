/**
 * 请求相关配置
 */

const __dirname = __dirname || '/Users/zhouquan/workspace/nodeProgram/rn-hugeRecycle2.0/HugeRecycle2_0/app/util/request/';


const api_base_old = 'http://www.hugehuge.cn/';
// const api_base = 'http://192.168.11.122:8080/';
const api_base = 'http://test.hugehuge.cn/';

export default {
  // 封装 fetch请求头
  requestHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // 请求 api接口
  api: {
    // 获取回收物品 列表
    getProducts: `${api_base}api/customer/app/deal/getProducts`,
    // 获取 定位小区
    getLocateCommunity: `${api_base}api/customer/app/deal/getLocateCommunity`,
    // 获取 短信验证码(POST)
    // application/json params: phone -- 手机号码(必填)
    getCode: `${api_base}mobile/auth/requestSmsCode`,
    // 获取 身份验证的 accessToken（POST）
    // application/json params: phone -- 手机号码(必填), code  -- 验证码or密码(必填)
    getToken: `${api_base}mobile/auth/login`,
    // 获取 客户下单页面 初始化数据
    initRecycleCreate: 'api/mobile/deal/initRecycleCreate',
    // 获取默认地址
    getDefaultAddress: `${api_base}api/customer/app/auth/deal/getDefaultAddress`,
    // 获取 客户地址列表
    getAddressList: `${api_base}api/mobile/deal/addresses`,
    // 获取 地区信息
    getAddressInfo: 'api/mobile/normal/addressinfo',
    // 新增 客户地址
    addAddress: `${api_base}api/mobile/deal/addAddress`,
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
    publish: 'mobile/artical/all',

    /* ------ Mock数据 ------*/
    // 获取 定位小区
    // getLocateCommunity: `file://${__dirname}../mock/getLocateCommunity.json`,
  },
  // 静态资源base路径
  static: {
    base: 'http://test.hugehuge.cn/web/'
  },
  // 版本号
  version: 1.11
};