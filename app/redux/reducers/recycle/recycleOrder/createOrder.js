import {combineReducers} from 'redux';


import {
  FETCH_RecycleOrder_Request,
  FETCH_RecycleOrder_Success,
  FETCH_RecycleOrder_Failure,
} from "../../../actions/Recycle";


function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_RecycleOrder_Request:
      return true;
    case FETCH_RecycleOrder_Success:
    case FETCH_RecycleOrder_Failure:
      return false;
    default:
      return state;
  }
}

let createOrder = combineReducers({isFetching});

export default createOrder;