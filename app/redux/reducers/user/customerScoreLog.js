import {combineReducers} from 'redux';


import {FETCH_CustomerScoreLog_Request, FETCH_CustomerScoreLog_Success, FETCH_CustomerScoreLog_Failure} from '../../actions/user/customerScoreLog';


function data(state=[], actions){
  switch (actions.type){
    case FETCH_CustomerScoreLog_Success:
      return actions.data;
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_CustomerScoreLog_Request:
      return true;
    case FETCH_CustomerScoreLog_Success:
    case FETCH_CustomerScoreLog_Failure:
      return false;
    default:
      return state;
  }
}

let customerScoreLog = combineReducers({data, isFetching});

export default customerScoreLog;