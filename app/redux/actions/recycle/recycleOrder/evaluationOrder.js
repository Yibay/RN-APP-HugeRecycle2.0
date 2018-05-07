import request from "../../../../util/request/request";
import config from "../../../../util/request/config";
import fetchRecycleRecordThunk from "../../user/recycleRecord";
import {fetchRecycleOrderDetail} from "../../user/recycleRecordDetail";


export const FETCH_EvaluationRecycleOrder_Request = 'FETCH_EvaluationRecycleOrder_Request';
export const FETCH_EvaluationRecycleOrder_Success = 'FETCH_EvaluationRecycleOrder_Success';
export const FETCH_EvaluationRecycleOrder_Failure = 'FETCH_EvaluationRecycleOrder_Failure';

export function evaluationRecycleOrder(orderId, evaluation){
  return async (dispatch, getState) => {
    let state = getState();

    let authToken = state.identityToken.authToken;
    if(!authToken){
      return {status: 1,message: '未获取到用户信息'};
    }

    dispatch({type: FETCH_EvaluationRecycleOrder_Request});
    const res = await Promise.race([
      request.post(`${config.api.rateOrder}/${orderId}`,evaluation,{'X-AUTH-TOKEN': authToken}),
      new Promise(function(resolve, reject){setTimeout(() => {resolve({status: 1, message: '网络请求超时'})}, 10000)})
    ]);

    if(res && !res.status){
      dispatch({type: FETCH_EvaluationRecycleOrder_Success});
      // 更新 我的环保记录
      dispatch(fetchRecycleRecordThunk());
      // 更新 订单详情
      dispatch(fetchRecycleOrderDetail(orderId));
      return {status:0};
    }
    else{
      dispatch({type: FETCH_EvaluationRecycleOrder_Failure});
      return {status: 1,message: res ? (res.message || '评价失败') : '网络请求失败'};
    }
  };
}