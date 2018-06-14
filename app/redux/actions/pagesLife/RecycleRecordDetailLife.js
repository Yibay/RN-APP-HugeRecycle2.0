import {fetchRecycleOrderDetail} from "../user/recycleRecordDetail";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(orderId){
  return async (dispatch, getState) => {

    // 统计进入回收单详情
    AnalyticsUtil.onEventWithLabel('enter_page','回收单详情');

    // 获取订单详情数据
    dispatch(fetchRecycleOrderDetail(orderId));
  };
}