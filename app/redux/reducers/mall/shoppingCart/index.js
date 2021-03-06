import {combineReducers} from 'redux';

import {
  FETCH_ShoppingCart_Request, FETCH_ShoppingCart_Success, FETCH_ShoppingCart_Failure,
  FETCH_ShoppingCartAmount_Success,
  ADD_Cart_addBuffer,
} from '../../../actions/mall/shoppingCart';
import addCart from './addCart';

function validProductList(state=[], actions){
  switch (actions.type){
    case FETCH_ShoppingCart_Success:
      return actions.validProductList;
    default:
      return state;
  }
}

function invalidProductList(state=[], actions){
  switch (actions.type){
    case FETCH_ShoppingCart_Success:
      return actions.invalidProductList;
    default:
      return state;
  }
}

function amount(state=0, actions){
  switch (actions.type){
    case FETCH_ShoppingCart_Success:
      return actions.amount;
    case FETCH_ShoppingCartAmount_Success:
      return actions.amount;
    case ADD_Cart_addBuffer:
      return state + actions.amount;
    default:
      return state;
  }
}

let data = combineReducers({validProductList, invalidProductList, amount});

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_ShoppingCart_Request:
      return true;
    case FETCH_ShoppingCart_Success:
    case FETCH_ShoppingCart_Failure:
      return false;
    default:
      return state;
  }
}

let shoppingCart = combineReducers({data, isFetching, addCart});

export default shoppingCart;