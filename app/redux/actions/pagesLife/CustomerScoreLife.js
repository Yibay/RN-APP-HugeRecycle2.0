import {fetchCustomerScoreThunk} from "../user/customerScore";
import {fetchCustomerScoreLogThunk} from "../user/customerScoreLog";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(){
  return async (dispatch, getState) => {

    // 统计进入环保金余额
    AnalyticsUtil.onEventWithLabel('enter_page','环保金余额');

    // 获取环保金 余额
    dispatch(fetchCustomerScoreThunk());
    // 环保金交易 明细
    dispatch(fetchCustomerScoreLogThunk());
  };
}