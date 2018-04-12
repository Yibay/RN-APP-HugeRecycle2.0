import _ from 'lodash';


import {defaultCurrentLocation, setLocationThunk, getDefaultAddressThunk} from "./Location";
import {fetchUserAddressList, resetUserAddressList} from "./user/userAddressList";


// type 类型
export const SET_IdentityToken = 'SET_IdentityToken';

// 常量
export const emptyIdentityToken = {
  'X-AUTH-TOKEN': '',
  h5Code: '',
  user: {}
};

/**
 * 设置 用户身份令牌
 * @param {{
 *  'X-AUTH-TOKEN': string,
 *  h5Code: string,
 *  user: object
 * }} identityToken
 * @returns {*}
 */
export function setIdentityToken(identityToken){
  return _.merge(
    { type: SET_IdentityToken },
    identityToken
  )
}

/**
 * 设置 用户身份令牌 Thunk (联动其他 redux数据)
 * @param identityToken
 * @returns {function(*, *)}
 */
export function setIdentityTokenThunk(identityToken){
  return async (dispatch, getState) => {

    /** 1、设置 用户身份令牌 */
    dispatch(setIdentityToken(identityToken));

    /** 2、若是 登录状态 联动其他数据 */
    let authToken = identityToken['X-AUTH-TOKEN'];
    if(authToken){

      // 更新app需要的用户信息
      await Promise.all([ // 并发
        /** 2-1. 获取 默认地址 更新到 当前地址 (defaultAddress) */
        dispatch(getDefaultAddressThunk()),
        /** 2-2. 获取 用户地址列表 */
        dispatch(fetchUserAddressList()),
      ]);

    }
    // 3、若是 登出状态
    else{
      // 3-1. 清空 当前地址
      dispatch(setLocationThunk(defaultCurrentLocation));
      // 3-2. 清空 用户回收地址列表
      dispatch(resetUserAddressList());
    }
  }
}