import _ from 'lodash';

export const SET_StationInfo = 'SET_StationInfo';
export const SET_MallCategoryInfo = 'SET_MallCategoryInfo';
export const SET_ProductList = 'SET_ProductList';


/**
 * 设置 商场服务站 基本信息
 * @param stationInfo
 * @returns {*}
 */
export function setStationInfo(stationInfo){
  return _.merge(
    { type: SET_StationInfo },
    stationInfo
  )
}

/**
 * 设置 便利店 商品大类、banner 信息
 * @param mallCategoryInfo
 * @returns {*}
 */
export function setMallCategoryInfo(mallCategoryInfo){
  return _.merge(
    { type: SET_MallCategoryInfo },
    mallCategoryInfo
  )
}

/**
 * 设置 便利店 商品列表
 * @param {array} productList
 * @returns {{type: string, productList: *}}
 */
export function setProductList(productList) {
  return {
    type: SET_ProductList,
    productList
  }
}