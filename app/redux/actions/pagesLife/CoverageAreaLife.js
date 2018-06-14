import {fetchCoverageAreaThunk} from "../official/coverageArea";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(){
  return async (dispatch, getState) => {

    // 统计进入服务范围
    AnalyticsUtil.onEventWithLabel('enter_page','服务范围');

    // 获取 服务覆盖范围 请求
    dispatch(fetchCoverageAreaThunk());
  }
}