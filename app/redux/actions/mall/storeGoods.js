import config from "../../../util/request/config";
import request from "../../../util/request/request";

export const FETCH_StoreGoods_Request = 'FETCH_StoreGoods_Request';
export const FETCH_StoreGoods_Success = 'FETCH_StoreGoods_Success';
export const FETCH_StoreGoods_Failure = 'FETCH_StoreGoods_Failure';

export function fetchStoreGoods(){
  return async(dispatch, getState) => {
    let state = getState();
    let storeInfo = state.mall.store.data.storeInfo;
    let storeIndex = state.mall.store.data.storeIndex;

    // 无匹配便利店 直接退出
    if(!storeInfo.length){
      return;
    }


    /** 发起请求 */
    dispatch({type: FETCH_StoreGoods_Request}); // <---- 发起请求

    /** 步骤1、根据 小区对应，获取便利店 categoryId 数组、头部banner图片 */
    let mallCategoryInfo = await getMallIndexInfo(storeInfo[storeIndex].storeId);


    /** 请求异常 */
    if(!mallCategoryInfo || mallCategoryInfo.status){
      // 置空 商品列表
      return dispatch({type: FETCH_StoreGoods_Failure}); // <---- 请求异常
    }


    /** 请求成功 */
    let bannerList = mallCategoryInfo.data.bannerList; // banner
    let mainCategoryList = [ // 回收大类
      {id: -1, name: '推荐', imgAddress: '/images/category/tuijian.png'},
      {id: -2, name: '限时促销', imgAddress: '/images/category/tuijian.png'}
    ].concat(mallCategoryInfo.data.mainCategoryList);


    /** 步骤2、根据便利店Id、categoryId，获取便利店 各categoryId下，商品数组 */
    let productList = await getProductListByCategory(storeInfo[storeIndex].storeId, mainCategoryList); // 各类商品

    // 过滤掉 无商品的类别
    let filter_mainCategoryList = [];
    let filter_productList = [];

    for (let i=0;i<productList.length;i++){
      if(productList[i].length){
        filter_mainCategoryList.push(mainCategoryList[i]);
        filter_productList.push(productList[i]);
      }
    }
    mainCategoryList = filter_mainCategoryList;
    productList = filter_productList;

    // 更新 商品大类、banner图、产品列表
    return dispatch({type: FETCH_StoreGoods_Success, data:{bannerList, mainCategoryList, productList}}); // <---- 请求成功
  };
}



/** 步骤1、根据服务站Id, 获取便利店 categoryId 数组、头部banner图片 */
async function getMallIndexInfo(storeId){
  return await request.get(config.api.getMallIndexInfo, {storeId});
}

/** 步骤2、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
async function getProductListByCategory(storeId, mainCategoryList){
  const productList = await Promise.all(mainCategoryList.map(item => request.get(config.api.getProductListByCategory, {
    storeId,
    categoryId: item.id
  })));
  return productList.map(item => item.data.map(item => {item.key = item.storeProductId;return item;}));
}