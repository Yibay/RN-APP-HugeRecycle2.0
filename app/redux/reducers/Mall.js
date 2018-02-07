import { combineReducers } from 'redux';
import _ from 'lodash';


import { SET_StoreInfo, SET_MallCategoryInfo, SET_ProductList } from '../actions/Mall';
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
    case SET_MallCategoryInfo:
      return _.omit(actions, ['type']);
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
    default:
      return state;
  }
}


export default combineReducers({ storeInfo, mallCategoryInfo, productList, storeIndex });