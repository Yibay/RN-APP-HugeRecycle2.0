import {combineReducers} from 'redux';

import {FETCH_CustomerScore_Request, FETCH_CustomerScore_Success, FETCH_CustomerScore_Failure} from '../../actions/user/customerScore';


function data(state=0, actions){
  switch(actions.type){
    case FETCH_CustomerScore_Success:
      return actions.data;
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch(actions.type){
    case FETCH_CustomerScore_Request:
      return true;
    case FETCH_CustomerScore_Success:
    case FETCH_CustomerScore_Failure:
      return false;
    default:
      return state;
  }
}

const customerScore = combineReducers({data, isFetching});

export default customerScore;