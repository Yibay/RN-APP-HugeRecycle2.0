import request from '../../../util/request/request';
import config from '../../../util/request/config';


export const FETCH_PayPasswordFlag_Request = 'FETCH_PayPasswordFlag_Request';
export const FETCH_PayPasswordFlag_Success = 'FETCH_PayPasswordFlag_Success';
export const FETCH_PayPasswordFlag_Failure = 'FETCH_PayPasswordFlag_Failure';


/**
 * 请求 用户设置 是否打开消费密码 状态
 * @returns {Function}
 */
export function fetchPayPasswordFlagThunk(){
  return async function(dispatch, getState){

    let state = getState();

    // 防止重复请求
    if(state.user.payPasswordFlag.isFetching){return;}

    // 请求
    dispatch({type: FETCH_PayPasswordFlag_Request});

    // 登录权限
    let authToken = state.identityToken.authToken;
    if(authToken){
      const res = await request.get(config.api.getUserInfo,null,{'X-AUTH-TOKEN': authToken});
      // 请求成功
      if(res && !res.status){
        dispatch({type: FETCH_PayPasswordFlag_Success, data: res.data.payPasswordFlag});
      }
      // 请求失败
      else{
        dispatch({type: FETCH_PayPasswordFlag_Failure});
      }
    }
  }
}