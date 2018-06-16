import {combineReducers} from 'redux';

import {
  FETCH_SettlementData_Request,
  FETCH_SettlementProductList_Success,
  FETCH_SettlementPayMsg_Success,
  FETCH_SettlementPayMsg_Failure,
  FETCH_SettlementData_Finish,
  SUBMIT_MallOrder_Request,
  SUBMIT_MallOrder_Finish,
} from '../../actions/mall/settlement';


function validProductList(state=[], actions){
  switch (actions.type){
    case FETCH_SettlementProductList_Success:
      return actions.validProductList;
    default:
      return state;
  }
}


function invalidProductList(state=[], actions){
  switch (actions.type){
    case FETCH_SettlementProductList_Success:
      return actions.invalidProductList;
    default:
      return state;
  }
}


function payMsg(state={}, actions){
  switch (actions.type){
    case FETCH_SettlementPayMsg_Success:
      return actions.payMsg;
    case FETCH_SettlementPayMsg_Failure:
      return {};
    default:
      return state;
  }
}


let data = combineReducers({validProductList, invalidProductList, payMsg});

function submitMallOrderFetching(state=false,actions){
  switch(actions.type){
    case SUBMIT_MallOrder_Request:
      return true;
    case SUBMIT_MallOrder_Finish:
      return false;
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch(actions.type){
    case FETCH_SettlementData_Request:
      return true;
    case FETCH_SettlementData_Finish:
      return false;
    default:
      return state;
  }
}

let settlement = combineReducers({data, submitMallOrderFetching, isFetching});

export default settlement;