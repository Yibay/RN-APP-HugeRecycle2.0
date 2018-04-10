import {combineReducers} from 'redux';

import {FETCH_SettlementData_Request, FETCH_SettlementProductList_Success, FETCH_SettlementPayMsg_Success, FETCH_SettlementData_Finish} from '../../actions/mall/settlement';


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
    default:
      return state;
  }
}


let data = combineReducers({validProductList, invalidProductList, payMsg});

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

let settlement = combineReducers({data, isFetching});

export default settlement;