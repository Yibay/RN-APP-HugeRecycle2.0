import {setProductList, setStoreIndex} from "../../redux/actions/Mall";
import request from "../request/request";
import config from "../request/config";


export const changeStore = async  (storeInfo, storeIndex) => {

  storeInfo || global.store.dispatch(setStoreIndex(storeIndex)); // 若为切换 便利店，非更新地址
  storeInfo = storeInfo || global.store.getState().mall.store.storeInfo;

  /** 2、根据 小区对应服务站，获取便利店 categoryId 数组、头部banner图片 */
  let mallCategoryInfo = await getMallIndexInfo(storeInfo[storeIndex].storeId);
  // 若异常
  if(!mallCategoryInfo || mallCategoryInfo.status){
    global.store && global.store.dispatch(setProductList({mallCategoryInfo: {}, productList:[]}));
    return;
  }
  // 若成功
  mallCategoryInfo.data.mainCategoryList = [
    {id: -1, name: '推荐', imgAddress: '/images/category/tuijian.png'},
    {id: -2, name: '限时促销', imgAddress: '/images/category/tuijian.png'}
  ].concat(mallCategoryInfo.data.mainCategoryList);

  console.log('startTime', new Date());

  /** 3、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
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
  global.store && global.store.dispatch(setProductList({mallCategoryInfo: mallCategoryInfo.data, productList}));

};

/** 2、根据服务站Id, 获取便利店 categoryId 数组、头部banner图片 */
async function getMallIndexInfo(storeId){
  const mallCategoryInfo = await request.get(config.api.getMallIndexInfo, {storeId});
  return mallCategoryInfo;
}

/** 3、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
async function getProductListByCategory(storeId, mainCategoryList){
  const productList = await Promise.all(mainCategoryList.map(item => request.get(config.api.getProductListByCategory, {
    storeId,
    categoryId: item.id
  })));
  return productList.map(item => item.data);
}