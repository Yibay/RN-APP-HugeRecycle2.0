import request from '../../../../util/request/request';
import config from '../../../../util/request/config';
import {fetchMallOrderRecord} from "../../user/mallOrderRecord";

export const DELETE_MallOrder_Request = 'DELETE_MallOrder_Request';
export const DELETE_MallOrder_Success = 'DELETE_MallOrder_Success';
export const DELETE_MallOrder_Failure = 'DELETE_MallOrder_Failure';

// 取消商城订单
export function deleteMallOrder(orderId) {
  return async(dispatch, getState) => {
    let state = getState();

    if(state.mall.mallOrder.deleteMallOrder.isFetching){return;}

    let authToken = state.identityToken.authToken;
    if(!authToken){return {message: '未获取到用户信息'};}

    dispatch({type: DELETE_MallOrder_Request});

    const res = await Promise.race([
      request.postFormData(config.api.deleteMallOrder,{orderId},{'X-AUTH-TOKEN': authToken}),
      new Promise(function(resolve, reject){
        setTimeout(() => {resolve({status: 1,message: '网络请求超时'})}, 10000);
      })
    ]);
    if(res && !res.status){
      dispatch({type: DELETE_MallOrder_Success});
      dispatch(fetchMallOrderRecord());
      return {status: 0}
    }
    else{
      dispatch({type: DELETE_MallOrder_Failure, message: res.message || ''});
      return {status: 1,message: res.message || ''};
    }

  };
}