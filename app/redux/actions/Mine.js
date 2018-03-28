import request from '../../util/request/request';
import config from '../../util/request/config';


export const FETCH_PayPasswordFlag = 'FETCH_RecycleOrder';


/**
 * 请求 用户设置 是否打开消费密码
 * @param status
 * @param data
 * @returns {*}
 */
function fetchPayPasswordFlag(status, data){
  switch(status){
    case 'request': // 请求回收订单
      return {
        type: FETCH_PayPasswordFlag,
        isFetching: true
      };
    case 'success': // 请求回收订单 成功
      return {
        type: FETCH_PayPasswordFlag,
        isFetching: false,
        data
      };
    case 'failure': // 请求回收订单 失败
      return {
        type: FETCH_PayPasswordFlag,
        isFetching: false
      };
  }

}

export function setPayPasswordFlagThunk(){
  return async function(dispatch, getState){
    // 若有请求未结束，则取消当前请求
    dispatch(fetchPayPasswordFlag('request'));

    let authToken = getState().identityToken.authToken;
    if(authToken){
      const res = await request.get(config.api.getUserInfo,null,{'X-AUTH-TOKEN': authToken});
      if(res && !res.status){
        dispatch(fetchPayPasswordFlag('success', res.data.payPasswordFlag));
      }
      else{
        dispatch(fetchPayPasswordFlag('failure'));
      }
    }
  }
}