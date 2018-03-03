import request from "../request/request";
import config from "../request/config";
import {setIdentityToken} from '../../redux/actions/IdentityToken';
import {defaultCurrentLocation, setUserAddressList} from "../../redux/actions/Location";
import {changeLocation} from './LocationManage';

/** 后续 使用 redux-thunk 异步action 来处理监控 */

/**
 * 更新 身份令牌
 * @param identityToken
 * @returns {Promise<void>}
 */
export const changeIdentityToken = async (identityToken) => {
  if(global.store){
    // 更新 身份令牌
    global.store.dispatch(setIdentityToken(identityToken));
    // 更新 身份相关数据
    await updateIdentityTokenAssociatedData(identityToken['X-AUTH-TOKEN']);
  }
};
/**
 * 更新 身份令牌 关联数据（更新：1. redux 当前用户地址；2. redux 用户地址列表；）
 * @param authToken
 * @returns {Promise<void>}
 */
export const updateIdentityTokenAssociatedData = async (authToken) => {
  // 若状态，切换为登录
  if(authToken){
    console.log('---登录---');

    // 更新app需要的用户信息
    let [defaultAddress, addressList] = await Promise.all([ // 并发
      // 1-1. 获取 一键呼叫 默认地址 (defaultAddress)
      request
        .get(config.api.getDefaultAddress, null, {'X-AUTH-TOKEN': authToken})
        .catch(err => {console.log(err); return null;}), // 若请求报错，则log对应信息
      // 1-2. 获取 用户地址列表
      request
        .get(config.api.getAddressList, null, {'X-AUTH-TOKEN': authToken})
        .catch(err => {console.log(err); return null;})
    ]);

    // 1-1. 一键呼叫 回收地址 数据正确
    if(defaultAddress && !defaultAddress.status) {
      await changeLocation(defaultAddress.data);
    }

    // 1-2. 用户地址列表 数据正确
    if(addressList && !addressList.status){
      global.store && global.store.dispatch(setUserAddressList(addressList.data.addresses));
    }

  }
  // 若退出登录
  else {
    console.log('---登出---');
    // 2-1. 清空 一键呼叫 回收地址信息
    await changeLocation(defaultCurrentLocation);
    // 2-2. 清空 用户回收地址列表
    global.store && global.store.dispatch(setUserAddressList([]));
  }
};