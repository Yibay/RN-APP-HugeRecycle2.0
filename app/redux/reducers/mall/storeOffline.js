import {combineReducers} from 'redux';


import {FETCH_StoreOffline_Request,FETCH_StoreOffline_Success,FETCH_StoreOffline_Failure,CLEAR_StoreOffline} from '../../actions/mall/storeOffline';


function data(state=[],action){
  switch(action.type){
    case FETCH_StoreOffline_Success:
      return action.data;
    case FETCH_StoreOffline_Failure:
    case CLEAR_StoreOffline:
      return [];
    default:
      return state;
  }
}

function isFetching(state=false,action){
  switch(action.type){
    case FETCH_StoreOffline_Request:
      return true;
    case FETCH_StoreOffline_Success:
    case FETCH_StoreOffline_Failure:
      return false;
    default:
      return state;
  }
}

let storeOffline = combineReducers({data, isFetching});

export default storeOffline;