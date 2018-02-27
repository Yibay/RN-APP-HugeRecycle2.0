/**
 * 请求相关配置
 */

const __dirname = __dirname || '/Users/zhouquan/workspace/nodeProgram/rn-hugeRecycle2.0/HugeRecycle2_0/app/util/request/';


// 线上
const api_base_recycle = 'https://www.hugehuge.cn/';
const api_base_mall = 'https://mall.hugehuge.cn/';

// 测试
// const api_base_recycle = 'http://test.hugehuge.cn/';
// const api_base_mall = 'http://test.hugehuge.cn:8070/';

// 本机调试（小武）
// const api_base_recycle = 'http://192.168.50.123:8090/';
// const api_base_mall = 'http://192.168.50.123:8070/';
// 本机调试（秦龙）
// const api_base_recycle = 'http://192.168.50.145:8080/';


export default {
  // 封装 fetch请求头
  requestHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // 请求 api接口
  api: {
    /** ------ 回收 相关api ------  */
    // 获取回收物品 列表 (GET)
    getProducts: `${api_base_recycle}api/customer/app/deal/getProducts`,
    // 获取 定位小区 (GET) 如： /api/customer/app/deal/getLocateCommunity?longitude=120.173374306960&latitude=30.388771979180
    getLocateCommunity: `${api_base_recycle}api/customer/app/deal/getLocateCommunity`,
    // 获取 所有小区 (GET)
    getAllCommunity: `${api_base_recycle}api/customer/app/deal/getAllCommunity`,
    // 获取 短信验证码(POST) application/json params: phone -- 手机号码(必填)
    getCode: `${api_base_recycle}mobile/auth/requestSmsCode`,
    // 获取 身份验证的 accessToken（POST）application/json params: phone -- 手机号码(必填), code  -- 验证码or密码(必填)
    getToken: `${api_base_recycle}mobile/auth/login`,
    // 获取 客户下单页面 初始化数据
    initRecycleCreate: 'api/mobile/deal/initRecycleCreate',
    // 获取一键呼叫地址：上次实际呼叫地址（GET）  需要登录 header X-AUTH-TOKEN
    getDefaultAddress: `${api_base_recycle}api/customer/app/auth/deal/getDefaultAddress`,
    // 获取 客户地址列表（GET） 需要登录 header X-AUTH-TOKEN
    getAddressList: `${api_base_recycle}api/mobile/deal/addresses`,
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
    addAddress: `${api_base_recycle}api/mobile/deal/addAddress`,
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
    createOrder: `${api_base_recycle}api/customer/app/auth/deal/createOrder`,
    // 查看 我的订单（GET）(我的环保记录) 需要登录 header X-AUTH-TOKEN
    myOrders: `${api_base_recycle}api/mobile/deal/myOrders`,
    // 撤单 (POST)  需要登录 header X-AUTH-TOKEN, params orderId (必填)
    cancelOrder: `${api_base_recycle}/api/mobile/deal/cancelOrder`,
    // 催单（POST） 需要登录 header X-AUTH-TOKEN, params orderId (必填)
    urgeOrder: `${api_base_recycle}/api/mobile/deal/urgeOrder`,
    // 联系虎哥上门收件（GET） 需要登录 header X-AUTH-TOKEN /api/mobile/deal/contactHuge/{orderId}
    contactHuge: `${api_base_recycle}/api/mobile/deal/contactHuge/`,
    // 客户评价（POST） 需要登录 header X-AUTH-TOKEN /api/mobile/deal/rateOrder/{orderId}
    rateOrder: `${api_base_recycle}/api/mobile/deal/rateOrder/`,
    // 查看 订单详情 (GET) (根据path {id} 查询)需要登录 header X-AUTH-TOKEN
    order: `${api_base_recycle}api/mobile/deal/order/`,

    /** ------ 我的 相关api ------  */
    // 修改密码(POST) 需要登录 header X-AUTH-TOKEN
    // params:
    //  oldPassword
    //  newPassword
    updatePassword: `${api_base_recycle}/api/auth/updatePassword`,
    // 环保金余额接口(GET) 需要登录 header X-AUTH-TOKEN
    getCustomerScore: `${api_base_recycle}/api/customer/app/auth/deal/getCustomerScore`,
    // 环保金记录接口(GET) 需要登录 header X-AUTH-TOKEN
    getCustomerScoreLog: `${api_base_recycle}/api/customer/app/auth/deal/getCustomerScoreLog`,
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


    /** ------ 商场 便利店相关api ------  */
    // 1, 根据小区id 获取便利店id (GET) wxMiniApp/mall/loadInitStoreInfoByCommunityId?communityId=
    loadInitStoreInfoByCommunityId: `${api_base_recycle}wxMiniApp/mall/loadInitStoreInfoByCommunityId`,

    // 2, 通过便利店id 获取物品大类id (GET) online/mall/getMallIndexInfo?storeId=
    getMallIndexInfo: `${api_base_mall}online/mall/getMallIndexInfo`,

    // 3, 通过便利店id 大类id 获取 商品列表 (GET) online/mall/product/getStoreProductListByCategoryOneId?storeId=&categoryId=
    getProductListByCategory: `${api_base_mall}online/mall/product/getStoreProductListByCategoryOneId`,

    // 4, 添加购物车 /online/mall/cart/add/id?amount
    addCart: `${api_base_mall}online/mall/cart/add/`,

    // 5, 商品查询 (GET) params: storeId {number}, searchType=productName, searchVal {string}
    searchProduct: `${api_base_mall}online/mall/product/searchProduct`,

    // 6, 获取购物车列表 (GET) params: storeId 需要登录 header X-AUTH-TOKEN
    getShoppingCartProductList: `${api_base_mall}/online/mall/cart/getShoppingCartProductList`,

    // 获取全部服务站（便利店）
    getAllStationCommunity: `${api_base_mall}api/mall/pay/getAllStationCommunity`,

    // 7, 修改购买数量 (GET) params  shoppingCartId, amount, storeId, 需要登录 header X-AUTH-TOKEN
    updateShoppingCartAmount: `${api_base_mall}online/mall/cart/updateShoppingCartAmount`,

    // 8, 修改购物车商品状态 (GET) online/mall/cart/changeNeedPay/{shoppingCartId}   params  isNeedPay (1购买，0不买) 需要登录 header X-AUTH-TOKEN
    changeNeedPay: `${api_base_mall}online/mall/cart/changeNeedPay/`,

    /** ------ Mock数据 ------ */
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
    base: 'http://test.hugehuge.cn/web/',
    // 商城图片资源 base路径
    mallBase: 'https://hugehuge.oss-cn-hangzhou.aliyuncs.com',
    // mallBase: 'https://hugetest.oss-cn-hangzhou.aliyuncs.com'
  },
  // 版本号
  version: 1.11
};