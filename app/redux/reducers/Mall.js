import { combineReducers } from 'redux';


import { SET_StoreInfo, SET_ProductList, SET_StoreIndex, SET_ShowStoreSelector } from '../actions/Mall';
import { SET_Location } from '../actions/Location';


/**
 * 服务站信息
 * @param {arrayOf({
 *  storeId: number,     服务站id
 *  storeName: string,   服务站名称
 *  storeNumber: string,
 *  storePhone: string,   服务站电话
 *  onlineStatus: number
 * })} state
 * @param actions
 * @returns {*}
 */
function storeInfo(state=[], actions){
  switch(actions.type){
    case SET_StoreInfo:
      return actions.storeInfo;
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
 * 小区对应多个便利店时，当前选中的便利店序号
 * @param {number} state
 * @param actions
 * @returns {number}
 */
function storeIndex(state=0, actions){
  switch(actions.type){
    case SET_Location:
      return 0;
    case SET_StoreIndex:
      return actions.storeIndex;
    default:
      return state;
  }
}

/**
 * 小区对应多个便利店时，是否显示便利店选择器
 * @param state
 * @param actions
 * @returns {bool}
 */
function showStoreSelector(state=true, actions){
  switch(actions.type){
    case SET_Location:
      return true;
    case SET_ShowStoreSelector:
      return actions.showStoreSelector;
    default:
      return state;
  }
}


export default combineReducers({ storeInfo, mallCategoryInfo, productList, storeIndex, showStoreSelector });