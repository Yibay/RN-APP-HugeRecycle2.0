import {fetchShoppingCart} from "../mall/shoppingCart";
import AnalyticsUtil from "../../../util/nativeModules/AnalyticsUtil";

export function onEnter(){
  return async(dispatch, getState) => {

    // 统计进入商城购物车
    AnalyticsUtil.onEventWithLabel('enter_page','商城购物车');

    // 请求购物车数据
    dispatch(fetchShoppingCart());
  }
}