import {fetchMallOrderRecord} from "../user/mallOrderRecord";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

/** 我的消费订单 onEnter */
export function onEnter(){
  return async (dispatch, getState) => {

    // 统计进入消费记录页
    AnalyticsUtil.onEventWithLabel('enter_page','消费记录页');

    // 请求消费订单数据
    dispatch(fetchMallOrderRecord());
  }
}