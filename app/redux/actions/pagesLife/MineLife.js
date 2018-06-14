import AnalyticsUtil from '../../../util/nativeModules/AnalyticsUtil';


export function onEnter(){
  return async(dispatch, getState) => {

    // 统计进入商城首页
    AnalyticsUtil.onEventWithLabel('enter_page','我的首页');
  };
}