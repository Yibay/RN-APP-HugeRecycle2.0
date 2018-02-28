
export const SET_StoreInfo = 'SET_StoreInfo';
export const SET_ProductList = 'SET_ProductList';
export const SET_StoreIndex = 'SET_StoreIndex';
export const SET_ShowStoreSelector = 'SET_ShowStoreSelector';


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

/**
 * 设置 当前小区下的 便利店序号
 * @param {number}storeIndex
 * @returns {{type: string, storeIndex: *}}
 */
export function setStoreIndex(storeIndex){
  return {
    type: SET_StoreIndex,
    storeIndex
  }
}

/**
 * 设置 显示小区下的 便利店选择器
 * @param {bool} showStoreSelector
 * @returns {{type: string, showStoreSelector: *}}
 */
export function setShowStoreSelector(showStoreSelector) {
  return {
    type: SET_ShowStoreSelector,
    showStoreSelector
  }
}