import _ from 'lodash';


import request from "../../util/request/request";
import config from "../../util/request/config";
import { setStoreInfo } from "./mall/store";

// type 类型
export const SET_Location = 'SET_Location';
export const SET_Location_Finish = 'SET_Location_Finish';
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
      if(defaultAddress && !defaultAddress.status && defaultAddress.data && defaultAddress.data.communityName !== '其他') {
        dispatch(setLocation(defaultAddress.data));
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
