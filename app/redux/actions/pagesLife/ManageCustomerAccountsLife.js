import {fetchPayPasswordFlagThunk} from "../user/payPasswordFlag";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(){
  return async (dispatch, getState) => {

    // 统计进入安全中心
    AnalyticsUtil.onEventWithLabel('enter_page','安全中心');

    dispatch(fetchPayPasswordFlagThunk());
  };
}