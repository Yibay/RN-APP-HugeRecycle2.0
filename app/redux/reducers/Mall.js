import { combineReducers } from 'redux';

import _ from 'lodash';


import { SET_StoreInfo, SET_ProductList, SET_StoreIndex, SET_ShowStoreSelector, SET_ShoppingCart, defaultShoppingCart } from '../actions/Mall';
import { SET_Location } from '../actions/Location';


/**
 * storeInfo: 服务站信息
 * storeIndex: 小区对应多个便利店时，当前选中的便利店序号
 * showStoreSelector: 小区对应多个便利店时，是否显示便利店选择器
 *
 * @param {{
 * storeInfo: arrayOf({
 *  storeId: number,     服务站id
 *  storeName: string,   服务站名称
 *  storeNumber: string,
 *  storePhone: string,   服务站电话
 *  onlineStatus: number
 * }),
 * storeIndex: number,
 * showStoreSelector: boolean
 * }} state
 * @param actions
 * @returns {{storeInfo: Array, storeIndex: number, showStoreSelector: boolean}}
 */
function store(state={storeInfo:[],storeIndex:0,showStoreSelector:true}, actions){

  let new_state = _.assign({}, state);

  switch(actions.type){

    case SET_Location:
      new_state.showStoreSelector = true;
      return new_state;

    // 设置 便利店信息
    case SET_StoreInfo:
      new_state.storeInfo = actions.storeInfo;
      new_state.storeIndex = 0;
      return new_state;

    // 切换 小区便利店
    case SET_StoreIndex:
      new_state.storeIndex = actions.storeIndex;
      new_state.showStoreSelector = false;
      return new_state;

    // 控制显示 便利店选择器 开关
    case SET_ShowStoreSelector:
      new_state.showStoreSelector = actions.showStoreSelector;
      return new_state;

    default:
      return state;
  }
}

// 注意 mallCategoryInfo、productList 必须在一个action中同时更改，否则切换 便利店时，就会因 2者不匹配，发生bug
/**
 * 便利店 商品大类、banner信息
 * @param {{
 *  bannerList: arrayOf({id: number, imageSrc: string}),   便利店轮播图
 *  mainCategoryList: arrayOf({id: string, name: string}), 便利店商品大类
 *  mallStatus: number  便利店状态
 * }} state
 * @param actions
 * @returns {*}
 */
function mallCategoryInfo(state={}, actions){
  switch(actions.type){
    case SET_ProductList:
      return actions.mallCategoryInfo;
    default:
      return state;
  }
}

/**
 * 便利店 商品列表
 * @param {array} state
 * @param actions
 * @returns {*}
 */
function productList(state=[], actions){
  switch(actions.type){
    case SET_ProductList:
      return actions.productList;
    default:
      return state;
  }
}

/**
 * 用户购物车
 * @param {{
 *  validProductList: Array,  针对当前便利店, 有效商品
 *  invalidProductList: Array,  针对当前便利店, 无效商品
 *  isFetching: boolean
 *  }} state
 * @param actions
 * @returns {{validProductList: Array, invalidProductList: Array, isFetching: boolean}}
 */
function shoppingCart(state=defaultShoppingCart, actions){
  switch(actions.type){
    case SET_ShoppingCart:
      return {
        validProductList: actions.validProductList || state.validProductList,
        invalidProductList: actions.invalidProductList || state.invalidProductList,
        isFetching: typeof actions.isFetching === 'undefined' ? state.isFetching : actions.isFetching,
        num: typeof actions.num === 'undefined' ? state.num : actions.num
      };
    default:
      return state;
  }
}


export default combineReducers({ store, mallCategoryInfo, productList, shoppingCart });