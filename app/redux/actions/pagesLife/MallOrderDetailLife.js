import {fetchMallOrderDetail} from "../user/mallOrderDetail";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(orderCode){
  return async (dispatch, getState) => {

    // 统计进入消费订单（详情）
    AnalyticsUtil.onEventWithLabel('enter_page','消费订单（详情）');

    dispatch(fetchMallOrderDetail(orderCode));
  };
}