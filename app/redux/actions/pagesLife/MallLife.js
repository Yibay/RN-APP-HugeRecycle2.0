// 页面 渲染时，回调
import {fetchStoreGoods} from "../mall/storeGoods";
import {fetchShoppingCartAmount} from '../mall/shoppingCart';

export function onEnter(){
  return async(dispatch, getState) => {
    // 商品信息
    await dispatch(fetchStoreGoods());
    // 购物车角标
    dispatch(fetchShoppingCartAmount());
  };
}