import {combineReducers} from 'redux';


import {FETCH_HugeInformation_Request, FETCH_HugeInformation_Success, FETCH_HugeInformation_Failure} from '../../actions/official/hugeInformation';

function carousel(state=[],actions){
  switch(actions.type){
    case FETCH_HugeInformation_Success:
      return actions.carousel;
    default:
      return state;
  }
}

function list(state=[],actions){
  switch(actions.type){
    case FETCH_HugeInformation_Success:
      return actions.list;
    default:
      return state;
  }
}

let data = combineReducers({carousel, list});

function isFetching(state=false,actions){
  switch(actions.type){
    case FETCH_HugeInformation_Request:
      return true;
    case FETCH_HugeInformation_Success:
    case FETCH_HugeInformation_Failure:
      return false;
    default:
      return state;
  }
}

let hugeInformation = combineReducers({data, isFetching});

export default hugeInformation;