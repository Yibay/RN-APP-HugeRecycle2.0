import {combineReducers} from 'redux';

import {FETCH_HugeInformation_Request, FETCH_HugeInformation_Success, FETCH_HugeInformation_Failure} from '../../actions/official/hugeInformation';

function data(state=[],actions){
  switch(actions.type){
    case FETCH_HugeInformation_Success:
      return actions.data;
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_HugeInformation_Request:
      return true;
    case FETCH_HugeInformation_Success:
    case FETCH_HugeInformation_Failure:
      return false;
    default:
      return state;
  }
}

const hugeInformation = combineReducers({data, isFetching});

export default hugeInformation;