import _ from 'lodash';
import {Actions} from "react-native-router-flux";


import config from "../../util/request/config";
import request from "../../util/request/request";
import {showRecycleOrderError} from "../../util/alertError";

import {getUserAddressListThunk} from './Location';

// type 类型
export const SET_AllProducts = 'SET_AllProducts'; // 初始化 电器列表、家具列表 等
export const ADD_RecycledItem = 'ADD_RecycledItem'; // 向 待回收订单中，添加 回收物
export const REDUCE_RecycledItem = 'REDUCE_RecycledItem'; // 从 待回收订单中，减少 回收物
export const RESET_RecycledItemsList = 'RESET_RecycledItemsList'; // 重置待回收订单 ，清空 回收物
export const FETCH_RecycleOrder_Request = 'FETCH_RecycleOrder_Request'; // 请求回收订单
export const FETCH_RecycleOrder_Success = 'FETCH_RecycleOrder_Success'; // 请求回收订单 成功
export const FETCH_RecycleOrder_Failure = 'FETCH_RecycleOrder_Failure '; // 请求回收订单 失败


/* ------ Action 生成函数 ------ */

/**
 * 设置 全部回收物（含 废旧家电、废旧家具）
 *
 * @param { array } AllProductsArray
 * @returns {{
 *  type: string,
 *  AllProductsArray: array }}
 */
export function setAllProducts(AllProductsArray){
  return {
    type: SET_AllProducts,
    AllProductsArray
  };
}



/**
 * 向待回收订单中，添加待回收物
 *
 * @param {number} sort
 * @param {number} categoryId
 * @param {number} specsId
 * @param {number} itemNum
 * @returns {{type: string, category: string, categoryId: number, specsId: number, itemNum: number}}
 */
export function addRecycledItem (sort, categoryId, specsId, itemNum){
  return {
    type: ADD_RecycledItem,
    sort,
    categoryId,
    specsId,
    itemNum
  }
}

/**
 * 从待回收订单中，减少待回收物
 * @param {number} sort
 * @param {number} categoryId
 * @param {number} specsId
 * @param {number} itemNum
 * @returns {{type: string, category: string, categoryId: number, specsId: number, itemNum: number}}
 */
export function reduceRecycledItem (sort, categoryId, specsId, itemNum){
  return {
    type: REDUCE_RecycledItem,
    sort,
    categoryId,
    specsId,
    itemNum
  }
}


export function resetRecycledItem (AllProductsArray){
  return {
    type: RESET_RecycledItemsList,
    AllProductsArray
  };
}


function fetchRecycleOrder(status, params){
  switch(status){
    case 'request':
      return {
        type: FETCH_RecycleOrder_Request
      };
    case 'success':
      return {
        type: FETCH_RecycleOrder_Success
      };
    case 'failure':
      return {
        type: FETCH_RecycleOrder_Failure
      }
  }
}

export function fetchRecycleOrderThunk(params) {
  return async (dispatch, getState) => {
    console.log(params);

    // 1、发起请求
    dispatch(fetchRecycleOrder('request'));
    // 判断登录状态
    let authToken = getState().identityToken.authToken;
    // 下回收订单
    let res = await request.post(config.api.createOrder, params, authToken ? {'X-AUTH-TOKEN': authToken} : undefined);
    if(res && !res.status){
      // 2、请求成功
      dispatch(fetchRecycleOrder('success'));
      Actions.callSuccessPage({alreadyLogged: !!authToken}); // 通知 呼叫成功页 已登录/未登录
      // 2-1、清空 回收物品列表
      const products = await request.get(config.api.getProducts);
      if(products && !products.status){
        dispatch(resetRecycledItem(products.data));
      }

      // 2-2、此处先添加地址？

      // 2-3、更新用户列表
      console.log('刷新地址');
      dispatch(getUserAddressListThunk());
      return {status: 0};
    }
    else{
      // 3、请求失败
      dispatch(fetchRecycleOrder('failure'));
      showRecycleOrderError(res);
      return {status: 1};
    }
  }
}