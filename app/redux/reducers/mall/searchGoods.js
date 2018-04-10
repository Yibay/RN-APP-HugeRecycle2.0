import {combineReducers} from 'redux';

import {FETCH_SearchGoods_Request, FETCH_SearchGoods_Success, FETCH_SearchGoods_Failure} from '../../actions/mall/searchGoods';


function data(state=[], actions){
  switch (actions.type){
    case FETCH_SearchGoods_Success:
      return actions.data;
    case FETCH_SearchGoods_Failure:
      return [];
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_SearchGoods_Request:
      return true;
    case FETCH_SearchGoods_Success:
    case FETCH_SearchGoods_Failure:
      return false;
    default:
      return state;
  }
}

let searchGoods = combineReducers({data, isFetching});

export default searchGoods;