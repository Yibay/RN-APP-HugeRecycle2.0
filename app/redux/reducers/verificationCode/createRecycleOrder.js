import {combineReducers} from 'redux';


import {
  FETCH_RecycleOrder_VerificationCode_Request, FETCH_RecycleOrder_VerificationCode_Success,
  FETCH_RecycleOrder_VerificationCode_Failure, CLEAR_RecycleOrder_VerificationCode_Data
} from '../../actions/verificationCode/createRecycleOrder';


function data(state='', actions){
  switch(actions.type){
    case FETCH_RecycleOrder_VerificationCode_Success:
    case FETCH_RecycleOrder_VerificationCode_Failure:
      return actions.data;
    case CLEAR_RecycleOrder_VerificationCode_Data:
      return '';
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch(actions.type){
    case FETCH_RecycleOrder_VerificationCode_Request:
      return true;
    case FETCH_RecycleOrder_VerificationCode_Success:
    case FETCH_RecycleOrder_VerificationCode_Failure:
      return false;
    default:
      return state;
  }
}

let createRecycleOrder = combineReducers({data, isFetching});

export default createRecycleOrder;