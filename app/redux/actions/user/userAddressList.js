import request from "../../../util/request/request";
import config from "../../../util/request/config";

export const FETCH_UserAddressList_Request = 'FETCH_UserAddressList_Request';
export const FETCH_UserAddressList_Success = 'FETCH_UserAddressList_Success';
export const FETCH_UserAddressList_Failure = 'FETCH_UserAddressList_Failure';
export const RESET_UserAddressList = 'RESET_UserAddressList';

/** 获取用户列表 */
export function fetchUserAddressList(){
  return async (dispatch, getState) => {
    let authToken = getState().identityToken.authToken;

    // 若未登录
    if(!authToken)return;

    // 请求更新 用户地址列表
    dispatch({type: FETCH_UserAddressList_Request});
    let addressList = await request
      .get(config.api.getAddressList, null, {'X-AUTH-TOKEN': authToken})
      .catch(err => {console.log(err); return null;});
    // 用户地址列表 数据正确
    if(addressList && !addressList.status){
      dispatch({type: FETCH_UserAddressList_Success, data: addressList.data.addresses.filter(item => item.communityName !== '其他').map(item => {item.key = item.id; return item;})});
    }
    else {
      dispatch({type: FETCH_UserAddressList_Failure});
    }

  }
}

/** 清空地址列表 */
export function resetUserAddressList() {
  return {type: RESET_UserAddressList}
}