
export const SET_StoreInfo = 'SET_StoreInfo';
export const SET_ProductList = 'SET_ProductList';


/**
 * 设置 商场便利店 基本信息
 * @param storeInfo
 * @returns {*}
 */
export function setStoreInfo(storeInfo){
  return {
    type: SET_StoreInfo,
    storeInfo
  }
}

/**
 * 设置 便利店 商品大类、banner、商品列表
 * @param {object} mallCategoryInfo
 * @param {array} productList
 * @returns {{type: string, mallCategoryInfo: *, productList: *}}
 */
export function setProductList({mallCategoryInfo, productList}) {
  return {
    type: SET_ProductList,
    mallCategoryInfo,
    productList
  }
}