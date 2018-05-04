import request from "../../../util/request/request";
import config from "../../../util/request/config";

export const FETCH_MallOrderDetail_Request = 'FETCH_MallOrderDetail_Request';
export const FETCH_MallOrderDetail_Success = 'FETCH_MallOrderDetail_Success';
export const FETCH_MallOrderDetail_Failure = 'FETCH_MallOrderDetail_Failure';

// 按订单号 请求订单详情
export function fetchMallOrderDetail(orderCode){
  return async (dispatch, getState) => {
    let state = getState();

    let authToken = state.identityToken.authToken;
    if(!authToken){return {status: 1,message: '未获取用户信息'}}

    dispatch({type: FETCH_MallOrderDetail_Request});
    const res = await request.postFormData(config.api.getMallOrderDetail,{orderCode},{'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      dispatch({type: FETCH_MallOrderDetail_Success, data: res.data});
    }
    else{
      dispatch({type: FETCH_MallOrderDetail_Failure});
    }
  };
}