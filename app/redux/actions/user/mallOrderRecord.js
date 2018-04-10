import config from "../../../util/request/config";
import request from "../../../util/request/request";


export const FETCH_MallOrderRecord_Request = 'FETCH_MallOrderRecord_Request';
export const FETCH_MallOrderRecord_Success = 'FETCH_MallOrderRecord_Success';
export const FETCH_MallOrderRecord_Failure = 'FETCH_MallOrderRecord_Failure';

export function fetchMallOrderRecord() {
  return async (dispatch, getState) => {
    let state = getState();

    if(state.user.mallOrderRecord.isFetching){return;}

    let authToken = state.identityToken.authToken;
    if(!authToken){return;}

    // 发送请求
    dispatch({type: FETCH_MallOrderRecord_Request});
    // 获取商城订单列表（1，未支付；2，已支付待配送；3，配送中；4，已完成）
    let res = await Promise.all([
      // request.get(config.api.getMallOrderList, {orderType: 'unPayCount'}, {'X-AUTH-TOKEN': authToken}),
      request.get(config.api.getMallOrderList, {orderType: 'payedCount'}, {'X-AUTH-TOKEN': authToken}),
      request.get(config.api.getMallOrderList, {orderType: 'deliveringCount'}, {'X-AUTH-TOKEN': authToken}),
      request.get(config.api.getMallOrderList, {orderType: 'completedCount'}, {'X-AUTH-TOKEN': authToken})
    ]);
    let mallOrderList = res
      .map(val => val && !val.status ? val.data : [])
      .reduce((preVal, curVal) => preVal.concat(curVal))
      .map(item => {item.key = item.orderId; return item;});

    // 请求成功
    dispatch({type: FETCH_MallOrderRecord_Success, data: mallOrderList});
  }
}