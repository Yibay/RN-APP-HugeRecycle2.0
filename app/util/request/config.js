/**
 * 请求相关配置
 */

const __dirname = __dirname || '/Users/zhouquan/workspace/nodeProgram/rn-hugeRecycle2.0/HugeRecycle2_0/app/util/request/';


// const api_base_old = 'http://www.hugehuge.cn/';
// const api_base = 'http://192.168.50.145:8080/';
const api_base = 'http://test.hugehuge.cn/';

export default {
  // 封装 fetch请求头
  requestHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // 请求 api接口
  api: {
    // 获取回收物品 列表 (GET)
    getProducts: `${api_base}api/customer/app/deal/getProducts`,
    // 获取 定位小区 (GET) 如： /api/customer/app/deal/getLocateCommunity?longitude=120.173374306960&latitude=30.388771979180
    getLocateCommunity: `${api_base}api/customer/app/deal/getLocateCommunity`,
    // 获取 所有小区 (GET)
    getAllCommunity: `${api_base}api/customer/app/deal/getAllCommunity`,
    // 获取 短信验证码(POST) application/json params: phone -- 手机号码(必填)
    getCode: `${api_base}mobile/auth/requestSmsCode`,
    // 获取 身份验证的 accessToken（POST）application/json params: phone -- 手机号码(必填), code  -- 验证码or密码(必填)
    getToken: `${api_base}mobile/auth/login`,
    // 获取 客户下单页面 初始化数据
    initRecycleCreate: 'api/mobile/deal/initRecycleCreate',
    // 获取一键呼叫地址：上次实际呼叫地址（GET）  需要登录 header X-AUTH-TOKEN
    getDefaultAddress: `${api_base}api/customer/app/auth/deal/getDefaultAddress`,
    // 获取 客户地址列表（GET） 需要登录 header X-AUTH-TOKEN
    getAddressList: `${api_base}api/mobile/deal/addresses`,
    // 获取 地区信息
    getAddressInfo: 'api/mobile/normal/addressinfo',
    // 新增 客户地址（POST） 需要登录 header X-AUTH-TOKEN
    // params:
    //   cityId (必填)
    //   city (必填)
    //   regionId (必填)
    //   region (必填)
    //   streetId (必填)
    //   street (必填)
    //   communityId (必填)
    //   communityName (必填)
    //   address (必填)
    //   telNo (必填)
    //   customerName (必填)
    //   haveHouseNumber (必填)
    //   isLocationDefault (必填)
    //   building
    //   unit
    //   room
    addAddress: `${api_base}api/mobile/deal/addAddress`,
    // 编辑 客户地址
    editAddress: 'api/mobile/deal/editAddress',
    // 删除 客户地址
    deleteAddress: 'api/mobile/deal/deleteAddress/',
    // 设置 默认地址
    setDefaultLocation: 'api/mobile/deal/setDefaultLocation/',
    // 一键呼叫回收 下单 (POST) params:
    // communityId -- 小区ID(必填)
    // communityName -- 小区名称(必填)
    // remarks -- 备注
    // isAerialWork -- 是否拆卸空调(必填)
    // accountName -- 联系人(必填)
    // phone -- 手机号码(必填)
    // code -- 验证码(X-AUTH-TOKEN为空时必填)
    // orderSource -- 订单来源(必填) 4 android 5 ios
    // address -- 详细地址(必填)
    // haveHouseNumber -- 有无户号(必填) ture,false
    // building
    // unit
    // room
    // items -- 选择的物品 [{id:11,name:"电视机 CRT24寸", num: 2},id:12,name:"可回收垃圾", num: 1}]
    createOrder: `${api_base}api/customer/app/auth/deal/createOrder`,
    // 查看 我的订单（GET）(我的环保记录) 需要登录 header X-AUTH-TOKEN
    myOrders: `${api_base}api/mobile/deal/myOrders`,
    // 撤单 (POST)  需要登录 header X-AUTH-TOKEN, params orderId (必填)
    cancelOrder: `${api_base}/api/mobile/deal/cancelOrder`,
    // 催单（POST） 需要登录 header X-AUTH-TOKEN, params orderId (必填)
    urgeOrder: `${api_base}/api/mobile/deal/urgeOrder`,
    // 联系虎哥上门收件（GET） 需要登录 header X-AUTH-TOKEN /api/mobile/deal/contactHuge/{orderId}
    contactHuge: `${api_base}/api/mobile/deal/contactHuge/`,
    // 客户评价（POST） 需要登录 header X-AUTH-TOKEN /api/mobile/deal/rateOrder/{orderId}
    rateOrder: `${api_base}/api/mobile/deal/rateOrder/`,
    // 查看 订单详情 (GET) (根据path {id} 查询)需要登录 header X-AUTH-TOKEN
    order: `${api_base}api/mobile/deal/order/`,
    // 修改密码(POST) 需要登录 header X-AUTH-TOKEN
    // params:
    //  oldPassword
    //  newPassword
    updatePassword: `${api_base}/api/auth/updatePassword`,
    // 环保金余额接口(GET) 需要登录 header X-AUTH-TOKEN
    getCustomerScore: `${api_base}/api/customer/app/auth/deal/getCustomerScore`,
    // 环保金记录接口(GET) 需要登录 header X-AUTH-TOKEN
    getCustomerScoreLog: `${api_base}/api/customer/app/auth/deal/getCustomerScoreLog`,
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
    // 获取回收物品 列表
    // getProducts: `file://${__dirname}../mock/getProducts4Items.json`,
    // getProducts: 'http://192.168.11.124:3000/api/customer/app/deal/getProducts4Items', // 局域网访问 本地服务器 mock, android不支持file:// 请求，也访问不到127.0.0.1
    // getProducts: 'http://192.168.11.124:3000/api/customer/app/deal/getProducts3Items', // 局域网访问 本地服务器 mock, android不支持file:// 请求，也访问不到127.0.0.1
    // getProducts: 'http://192.168.11.124:3000/api/customer/app/deal/getProducts2Items', // 局域网访问 本地服务器 mock, android不支持file:// 请求，也访问不到127.0.0.1
    // 获取 定位小区
    // getLocateCommunity: `file://${__dirname}../mock/getLocateCommunity.json`,
    // 获取 所有小区
    // getAllCommunity: `file://${__dirname}../mock/getAllCommunity.json`,
  },
  // 静态资源base路径
  static: {
    base: 'http://test.hugehuge.cn/web/'
  },
  // 版本号
  version: 1.11
};