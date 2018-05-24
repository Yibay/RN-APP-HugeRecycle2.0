import {Actions} from 'react-native-router-flux';

import {fetchStoreGoods} from './storeGoods';
import {fetchShoppingCartAmount} from './shoppingCart';
import {fetchSettlementData} from "./settlement";
import config from "../../../util/request/config";
import request from "../../../util/request/request";

// type 类型
export const SET_StoreInfo = 'SET_StoreInfo';
export const CLEAR_StoreInfo = 'CLEAR_StoreInfo';
export const SET_StoreIndex = 'SET_StoreIndex';
export const SET_ShowStoreSelector = 'SET_ShowStoreSelector';

// 其他常量
export const defaultShoppingCart = {validProductList:[],invalidProductList:[],isFetching: false,num: 0}; // 用户购物车，默认值


/**
 * 设置 商场便利店 基本信息
 * @param storeInfo
 * @returns {*}
 */
export function fetchStoreInfo(){

  return async(dispatch, getState) => {

    /** 1、根据小区id, 获取便利店信息 */
    let state = getState();
    let communityId = state.location.currentLocation.communityId;

    if(communityId !== undefined){
      let storeInfo = await loadInitStoreInfoByCommunityId(communityId);
      // 若数据异常、立即结束（包含该小区无对应服务站）
      if(!storeInfo || storeInfo.status || !storeInfo.data || !storeInfo.data.length){  // {data: null, status: 0}
        return dispatch({type:CLEAR_StoreInfo}); // 置空小区 对应的便利店
      }
      // 若成功
      return dispatch({type:SET_StoreInfo,storeInfo:storeInfo.data});
    }
    else{
      return dispatch({type:CLEAR_StoreInfo}); // 置空小区 对应的便利店
    }

  };
}

/** 1、根据小区名字, 获取便利店信息 */
async function loadInitStoreInfoByCommunityId(communityId){
  return await request.get(config.api.loadInitStoreInfoByCommunityId, {communityId});
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
/** Thunk: 选中 数组中 便利店序号 关联数据 */
export function setStoreIndexThunk(storeIndex){
  return async (dispatch, getState) => {

    /** 1、设置 便利店序号 */
    dispatch(setStoreIndex(storeIndex));

    // 后续这里考虑优化
    if(Actions.currentScene === '_shoppingMall'){
      /** 2、根据 便利店id，获取便利店 categoryId 数组、头部banner图片 */
      dispatch(fetchStoreGoods());
      /** 3、根据便利店id，获取 更新购物车 */
      dispatch(fetchShoppingCartAmount());
    }

    /** 4、更新订单结算页 */
    if(Actions.currentScene === 'mallSettlement'){
      dispatch(fetchSettlementData());
    }
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
