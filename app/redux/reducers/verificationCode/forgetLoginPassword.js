import {combineReducers} from 'redux';


import {
  FETCH_LoginPassword_VerificationCode_Request, FETCH_LoginPassword_VerificationCode_Success,
  FETCH_LoginPassword_VerificationCode_Failure, CLEAR_LoginPassword_VerificationCode_Data
} from '../../actions/verificationCode/forgetLoginPassword';


function data(state='', actions){
  switch(actions.type){
    case FETCH_LoginPassword_VerificationCode_Success:
    case FETCH_LoginPassword_VerificationCode_Failure:
      return actions.data;
    case CLEAR_LoginPassword_VerificationCode_Data:
      return '';
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch(actions.type){
    case FETCH_LoginPassword_VerificationCode_Request:
      return true;
    case FETCH_LoginPassword_VerificationCode_Success:
    case FETCH_LoginPassword_VerificationCode_Failure:
      return false;
    default:
      return state;
  }
}

let forgetLoginPassword = combineReducers({data, isFetching});

export default forgetLoginPassword;