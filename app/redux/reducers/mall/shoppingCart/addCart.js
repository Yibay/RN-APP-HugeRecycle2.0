import {combineReducers} from 'redux';
import _ from 'lodash';


import {
  ADD_Cart_Request, ADD_Cart_Finish,
  ADD_Cart_addBuffer, ADD_Cart_clearBuffer,
} from '../../../actions/mall/shoppingCart';

function isFetching(state=false, action){
  switch(action.type){
    case ADD_Cart_Request:
      return true;
    case ADD_Cart_Finish:
      return false;
    default:
      return state;
  }
}

function buffer(state={}, action){
  let new_state = {};
  switch (action.type){
    case ADD_Cart_addBuffer:
      if(typeof state[action.storeProductId] === 'undefined'){
        _.assign(new_state, state);
        new_state[action.storeProductId] = action.amount;
      }
      else if(typeof state[action.storeProductId] === 'number'){
        new_state[action.storeProductId] = state[action.storeProductId] + action.amount;
      }
      return new_state;
    case ADD_Cart_clearBuffer:
      _.assign(new_state,_.omit(state,action.storeProductId));
      return new_state;
    default:
      return state;
  }
}

let addCart = combineReducers({isFetching, buffer});

export default addCart;