import {combineReducers} from 'redux';


import {FETCH_RecycleRecord_Request, FETCH_RecycleRecord_Success, FETCH_RecycleRecord_Failure} from '../../actions/user/recycleRecord';



function data(state=[], actions){
  switch(actions.type){
    case FETCH_RecycleRecord_Success:
      return actions.data
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch(actions.type){
    case FETCH_RecycleRecord_Request:
      return true;
    case FETCH_RecycleRecord_Success:
    case FETCH_RecycleRecord_Failure:
      return false;
    default:
      return state;
  }
}

let recycleRecord = combineReducers({data, isFetching});

export default recycleRecord;