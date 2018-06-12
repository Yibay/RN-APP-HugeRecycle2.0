import _ from 'lodash';


import {defaultCurrentLocation, setLocation, getDefaultAddressThunk} from "./Location";
import {fetchUserAddressList, resetUserAddressList} from "./user/userAddressList";
import {clearUserAccount, setUserAccount} from "./user/userAccount";

import AnalyticsUtil from '../../util/nativeModules/AnalyticsUtil';


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

      // 通知友盟 帐号登录
      try{
        AnalyticsUtil.profileSignInWithPUID(String(identityToken.user.id));
      }
      catch(e){
        console.log('友盟统计登录异常：',e);
      }

      // 更新app需要的用户信息
      Promise.all([ // 并发
        /** 2-1. 获取 默认地址 更新到 当前地址 (defaultAddress) */
        dispatch(getDefaultAddressThunk()),
        /** 2-2. 获取 用户地址列表 */
        dispatch(fetchUserAddressList()),
        /** 2-3. 设置推送别名（推送使用） */
        dispatch(setUserAccount())
      ]);

    }
    // 3、若是 登出状态
    else{

      // 通知友盟 帐号登出
      AnalyticsUtil.profileSignOff();

      // 3-1. 清空 当前地址
      dispatch(setLocation(defaultCurrentLocation));
      // 3-2. 清空 用户回收地址列表
      dispatch(resetUserAddressList());
      // 3-3. 清空 用户推送别名（取消推送）
      dispatch(clearUserAccount());
    }
  }
}