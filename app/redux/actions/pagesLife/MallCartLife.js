import {fetchShoppingCart} from "../mall/shoppingCart";

export function onEnter(){
  return async(dispatch, getState) => {
    // 请求购物车数据
    dispatch(fetchShoppingCart());
  }
}