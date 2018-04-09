import { combineReducers } from 'redux';


import { SET_ShoppingCart, defaultShoppingCart } from '../../actions/Mall';

import storeGoods from './storeGoods';
import store from './store';


/**
 * 用户购物车
 * @param {{
 *  validProductList: Array,  针对当前便利店, 有效商品
 *  invalidProductList: Array,  针对当前便利店, 无效商品
 *  isFetching: boolean
 *  }} state
 * @param actions
 * @returns {{validProductList: Array, invalidProductList: Array, isFetching: boolean}}
 */
function shoppingCart(state=defaultShoppingCart, actions){
  switch(actions.type){
    case SET_ShoppingCart:
      return {
        validProductList: actions.validProductList || state.validProductList,
        invalidProductList: actions.invalidProductList || state.invalidProductList,
        isFetching: typeof actions.isFetching === 'undefined' ? state.isFetching : actions.isFetching,
        num: typeof actions.num === 'undefined' ? state.num : actions.num
      };
    default:
      return state;
  }
}


export default combineReducers({ store, shoppingCart, storeGoods });