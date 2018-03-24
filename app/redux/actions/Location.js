import _ from 'lodash';


import request from "../../util/request/request";
import config from "../../util/request/config";
import {setProductList, setStoreInfo, setStoreInfoThunk } from "./Mall";

// type 类型
export const SET_Location = 'SET_Location';
export const SET_AutoLocationFlag = 'SET_AutoLocationFlag';
export const SET_UserAddressList = 'SET_UserAddressList';

// 其他常量
export const defaultCurrentLocation = {
  communityName: '选择小区',
  haveHouseNumber: true,
  address: '',
  building: '',
  unit: '',
  room: ''
};


/* ------ Action 生成函数 ------ */
/**
 * 设置 currentLocation
 * @param {{communityId: number, communityName: string, ...}} location
 * @returns {{type: string, communityId: number, communityName: string, ...}}
 */
export function setLocation(location){
  return _.merge(
    {type: SET_Location},
    location
  )
}
/** 当前地址 相关数据 */
export function setLocationThunk(location){
  return async (dispatch, getState) => {

    /** 1、设置当前地址 */
    dispatch(setLocation(location));

    /** 2、联动其他数据 */
    let communityId = location.communityId;
    if(communityId !== undefined){
      /** 1、根据小区id, 获取便利店信息 */
      let storeInfo = await loadInitStoreInfoByCommunityId(communityId);
      // 若数据异常、立即结束（包含该小区无对应服务站）
      if(!storeInfo || storeInfo.status || !storeInfo.data || !storeInfo.data.length){  // {data: null, status: 0}
        dispatch(setStoreInfo([])); // 置空小区 对应的便利店
        dispatch(setProductList({mallCategoryInfo: {}, productList:[]})); // 置空便利店产品列表
        return;
      }
      // 若成功
      dispatch(setStoreInfoThunk(storeInfo.data));
    }
    else{
      dispatch(setStoreInfo([])); // 置空小区 对应的便利店
      dispatch(setProductList({mallCategoryInfo: {}, productList:[]})); // 置空便利店产品列表
    }
  }
}
/** 1、根据小区名字, 获取便利店信息 */
async function loadInitStoreInfoByCommunityId(communityId){
  return await request.get(config.api.loadInitStoreInfoByCommunityId, {communityId});
}
/** Thunk: 获取 默认地址 更新到 当前地址 */
export function getDefaultAddressThunk(){
  return async (dispatch, getState) => {
    let authToken = getState().identityToken.authToken;
    // 若已登录
    if(authToken){
      // 获取 用户默认地址（一键呼叫地址）
      let defaultAddress = await request
        .get(config.api.getDefaultAddress, null, {'X-AUTH-TOKEN': authToken})
        .catch(err => {console.log(err); return null;}); // 若请求报错，则log对应信息
      // 默认地址 数据正确
      // 默认地址data 可能为null, 如：当删光用户地址列表时
      if(defaultAddress && !defaultAddress.status && defaultAddress.data) {
        dispatch(setLocationThunk(defaultAddress.data));
      }
    }
  };
}

/**
 * 刷新 自动定位 开关
 * @param {boolean} flag
 * @returns {{type: string, flag: *}}
 */
export function setAutoLocationFlag(flag){
  return {
    type: SET_AutoLocationFlag,
    flag
  }
}

/**
 * 设置用户地址列表
 * @param addressList
 * @returns {{type: string, addressList: arrayOf({communityId: number, communityName: string, customerName: string, ...})}}
 */
export function setUserAddressList(addressList){
  return {
    type: SET_UserAddressList,
    addressList
  }
}
/** Thunk: 获取、设置用户列表 */
export function getUserAddressListThunk() {
  return async (dispatch, getState) => {
    let authToken = getState().identityToken.authToken;
    // 若已登录
    if(authToken){
      console.log('更新地址123123');
      // 请求更新 用户地址列表
      let addressList = await request
        .get(config.api.getAddressList, null, {'X-AUTH-TOKEN': authToken})
        .catch(err => {console.log(err); return null;});
      // 用户地址列表 数据正确
      if(addressList && !addressList.status){
        dispatch(setUserAddressList(addressList.data.addresses));
      }
    }
  }
}