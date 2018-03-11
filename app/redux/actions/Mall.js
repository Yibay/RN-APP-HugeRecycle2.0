import request from "../../util/request/request";
import config from "../../util/request/config";

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
/** 便利店 关联数据 */
export function setStoreInfoThunk(storeInfo){
  return async (dispatch, getState) => {

    /** 1、设置便利店信息 */
    dispatch(setStoreInfo(storeInfo)); // 此处storeIndex 会被重置为0

    /** 2、根据 小区对应服务站，获取便利店 categoryId 数组、头部banner图片 */
    let storeIndex = getState().mall.store.storeIndex;
    let mallCategoryInfo = await getMallIndexInfo(storeInfo[storeIndex].storeId);

    // 若异常
    if(!mallCategoryInfo || mallCategoryInfo.status){
      // 置空 商品列表
      dispatch(setProductList({mallCategoryInfo: {}, productList:[]}));
      return;
    }
    // 若成功
    mallCategoryInfo.data.mainCategoryList = [
      {id: -1, name: '推荐', imgAddress: '/images/category/tuijian.png'},
      {id: -2, name: '限时促销', imgAddress: '/images/category/tuijian.png'}
    ].concat(mallCategoryInfo.data.mainCategoryList);

    console.log('startTime', new Date());

    /** 3、根据便利店Id、categoryId，获取便利店 各categoryId下，商品数组 */
    let productList = await getProductListByCategory(storeInfo[storeIndex].storeId, mallCategoryInfo.data.mainCategoryList);

    console.log('endTime', new Date());

    // 过滤掉 无商品的类别
    let filter_mainCategoryList = [];
    let filter_productList = [];

    for (let i=0;i<productList.length;i++){
      if(productList[i].length){
        filter_mainCategoryList.push(mallCategoryInfo.data.mainCategoryList[i]);
        filter_productList.push(productList[i]);
      }
    }
    mallCategoryInfo.data.mainCategoryList = filter_mainCategoryList;
    productList = filter_productList;

    // 更新 商品大类、banner图、产品列表
    dispatch(setProductList({mallCategoryInfo: mallCategoryInfo.data, productList}));
  }
}
/** 2、根据服务站Id, 获取便利店 categoryId 数组、头部banner图片 */
async function getMallIndexInfo(storeId){
  return await request.get(config.api.getMallIndexInfo, {storeId});
}
/** 3、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
async function getProductListByCategory(storeId, mainCategoryList){
  const productList = await Promise.all(mainCategoryList.map(item => request.get(config.api.getProductListByCategory, {
    storeId,
    categoryId: item.id
  })));
  return productList.map(item => item.data);
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