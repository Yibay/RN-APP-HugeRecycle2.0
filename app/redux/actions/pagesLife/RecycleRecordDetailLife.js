import {fetchRecycleOrderDetail} from "../user/recycleRecordDetail";

export function onEnter(orderId){
  return async (dispatch, getState) => {
    // 获取订单详情数据
    dispatch(fetchRecycleOrderDetail(orderId))
  };
}