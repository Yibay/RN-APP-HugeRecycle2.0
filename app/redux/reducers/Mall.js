import { combineReducers } from 'redux';
import _ from 'lodash';


import { SET_StationInfo, SET_MallCategoryInfo, SET_ProductList } from '../actions/Mall';


/**
 * 服务站信息
 * @param {{
 *  stationId: number,     服务站id
 *  stationName: string,   服务站名称
 *  stationNumber: string,
 *  stationPhone: string   服务站电话
 * }} state
 * @param actions
 * @returns {*}
 */
function stationInfo(state={}, actions){
  switch(actions.type){
    case SET_StationInfo:
      return _.omit(actions, ['type']);
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


export default combineReducers({ stationInfo, mallCategoryInfo, productList });