import {fetchRecycleOrderDetail} from "../user/recycleRecordDetail";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(orderId){
  return async (dispatch, getState) => {

    // 统计进入评价虎哥
    AnalyticsUtil.onEventWithLabel('enter_page','评价虎哥');

    // 获取订单详情数据
    dispatch(fetchRecycleOrderDetail(orderId))
  };
}