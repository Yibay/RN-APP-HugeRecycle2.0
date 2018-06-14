// 页面 渲染时，回调
import {fetchStoreInfo} from '../mall/store';
import {fetchStoreGoods} from "../mall/storeGoods";
import {fetchShoppingCartAmount} from '../mall/shoppingCart';
import {fetchStoreOffline} from '../mall/storeOffline';

import AnalyticsUtil from '../../../util/nativeModules/AnalyticsUtil';


export function onEnter(){
  return async(dispatch, getState) => {

    // 统计进入商城首页
    AnalyticsUtil.onEventWithLabel('enter_page','商城首页');

    // 便利店信息
    await dispatch(fetchStoreInfo());
    // 商品信息
    await dispatch(fetchStoreGoods());
    // 购物车角标
    dispatch(fetchShoppingCartAmount());
    // 线下店信息
    dispatch(fetchStoreOffline());
  };
}