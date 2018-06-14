import fetchRecycleRecordThunk from "../user/recycleRecord";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(){
  return async (dispatch, getState) => {

    // 统计进入环保记录页
    AnalyticsUtil.onEventWithLabel('enter_page','环保记录页');

    dispatch(fetchRecycleRecordThunk());
  }
}