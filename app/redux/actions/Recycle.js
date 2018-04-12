import {Actions} from "react-native-router-flux";


import config from "../../util/request/config";
import request from "../../util/request/request";
import {showRecycleOrderError} from "../../util/alertError";

import {fetchUserAddressList} from './user/userAddressList';

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

// 清空 回收物品列表
export function resetRecycledItem (){
  return async (dispatch, getState) => {

    const products = await request.get(config.api.getProducts);
    if(products && !products.status){
      dispatch({
        type: RESET_RecycledItemsList,
        AllProductsArray: products.data
      })
    }
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
      dispatch(resetRecycledItem());

      if(authToken){
        // 2-2、将 一键呼叫 地址 添加到用户
        params.telNo = params.phone;
        params.customerName = params.accountName;
        params.isLocationDefault = true; // 设成一键呼叫默认地址

        // 添加新地址 请求
        let newAddress = await request
          .post(config.api.addAddress, params, {'X-AUTH-TOKEN': authToken})
          .catch(err => {console.log(err); return null;});

        // 若请求成功 数据正确
        // if(newAddress && !newAddress.status && newAddress.data){
        //   console.log('添加地址成功')
        // }
        // else {
        //   console.log('添加地址失败');
        // }

        // 2-3、更新用户列表
        dispatch(fetchUserAddressList());
      }
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