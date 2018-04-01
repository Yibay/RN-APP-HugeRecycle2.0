import {combineReducers} from 'redux';

import {FETCH_MallOrderRecord_Request, FETCH_MallOrderRecord_Success, FETCH_MallOrderRecord_Failure} from '../../actions/user/mallOrderRecord';

function data(state=[],actions){
  switch (actions.type){
    case FETCH_MallOrderRecord_Success:
      return actions.data;
    default:
      return state;
  }
}

function isFetching(state=false,actions){
  switch (actions.type){
    case FETCH_MallOrderRecord_Request:
      return true;
    case FETCH_MallOrderRecord_Success:
    case FETCH_MallOrderRecord_Failure:
      return false;
    default:
      return state;
  }
}

let mallOrderRecord = combineReducers({data, isFetching});

export default mallOrderRecord;