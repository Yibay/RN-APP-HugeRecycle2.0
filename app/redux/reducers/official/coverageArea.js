import {combineReducers} from 'redux';

import {FETCH_CoverageArea_Request, FETCH_CoverageArea_Success, FETCH_CoverageArea_Failure} from '../../actions/official/coverageArea';


function data(state=[], actions){
  switch (actions.type){
    case FETCH_CoverageArea_Success:
      return actions.data;
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_CoverageArea_Request:
      return true;
    case FETCH_CoverageArea_Success:
    case FETCH_CoverageArea_Failure:
      return false;
    default:
      return state;
  }
}

let coverageArea = combineReducers({data, isFetching});

export default coverageArea;