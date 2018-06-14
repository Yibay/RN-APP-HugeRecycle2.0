import {fetchSettlementData} from "../mall/settlement";
import {fetchStoreInfo} from "../mall/store";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(){
  return async(dispatch, getState) => {

    // 统计进入订单结算页
    AnalyticsUtil.onEventWithLabel('enter_page','订单结算页');

    // 便利店信息
    await dispatch(fetchStoreInfo());
    // 结算信息
    dispatch(fetchSettlementData());
  }
}