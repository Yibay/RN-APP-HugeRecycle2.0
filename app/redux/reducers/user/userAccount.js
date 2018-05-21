import {combineReducers} from 'redux';


import {
  FETCH_UserAccount_Request,
  FETCH_UserAccount_Success,
  FETCH_UserAccount_Failure,
  CLEAR_UserAccount,
} from '../../actions/user/userAccount';


function data(state='',action){
  switch(action.type){
    case FETCH_UserAccount_Success:
      return action.data;
    case FETCH_UserAccount_Failure:
    case CLEAR_UserAccount:
      return '';
    default:
      return state;
  }
}

function isFetch(state=false,action){
  switch(action.type){
    case FETCH_UserAccount_Request:
      return true;
    case FETCH_UserAccount_Success:
    case FETCH_UserAccount_Failure:
      return false;
    default:
      return state;
  }
}

let userAccount = combineReducers({data, isFetch});

export default userAccount;