/** 手机验证码登录：验证码 */

import {combineReducers} from 'redux';


import {
  FETCH_Login_VerificationCode_Request, FETCH_Login_VerificationCode_Success,
  FETCH_Login_VerificationCode_Failure, CLEAR_Login_VerificationCode_Data
} from '../../actions/verificationCode/login';


function data(state='', actions){
  switch(actions.type){
    case FETCH_Login_VerificationCode_Success:
    case FETCH_Login_VerificationCode_Failure:
      return actions.data;
    case CLEAR_Login_VerificationCode_Data:
      return '';
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch(actions.type){
    case FETCH_Login_VerificationCode_Request:
      return true;
    case FETCH_Login_VerificationCode_Success:
    case FETCH_Login_VerificationCode_Failure:
      return false;
    default:
      return state;
  }
}


let login = combineReducers({data, isFetching});

export default login;