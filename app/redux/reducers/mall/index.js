import { combineReducers } from 'redux';

import _ from 'lodash';


import { SET_StoreInfo, SET_StoreIndex, SET_ShowStoreSelector, SET_ShoppingCart, defaultShoppingCart } from '../../actions/Mall';
import { SET_Location } from '../../actions/Location';

import storeGoods from './storeGoods';


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


export default combineReducers({ store, shoppingCart, storeGoods });