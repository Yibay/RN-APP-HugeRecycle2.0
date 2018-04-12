import {combineReducers} from 'redux';


import {FETCH_UserAddressList_Request, FETCH_UserAddressList_Success, FETCH_UserAddressList_Failure, RESET_UserAddressList} from '../../actions/user/userAddressList';


function data(state=[], actions){
  switch (actions.type){
    case FETCH_UserAddressList_Success:
      return actions.data;
    case RESET_UserAddressList:
      return [];
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_UserAddressList_Request:
      return true;
    case FETCH_UserAddressList_Success:
    case FETCH_UserAddressList_Failure:
      return false;
    default:
      return state;
  }
}

let userAddressList = combineReducers({data, isFetching});

export default userAddressList;