import {combineReducers} from 'redux';


import {FETCH_PayPasswordFlag_Request, FETCH_PayPasswordFlag_Success, FETCH_PayPasswordFlag_Failure} from '../../actions/user/payPasswordFlag';


function data(state=false, actions){
  switch(actions.type){
    case FETCH_PayPasswordFlag_Success:
      return actions.data;
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_PayPasswordFlag_Request:
      return true;
    case FETCH_PayPasswordFlag_Success:
    case FETCH_PayPasswordFlag_Failure:
      return false;
    default:
      return state;
  }
}

const payPasswordFlag = combineReducers({data, isFetching});

export default payPasswordFlag