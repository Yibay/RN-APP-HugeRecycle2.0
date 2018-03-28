import {combineReducers} from 'redux';
import _ from 'lodash';


import {FETCH_PayPasswordFlag} from '../actions/Mine';


function payPasswordFlag(state={data:false,isFetching:false}, actions){
  switch(actions.type){
    case FETCH_PayPasswordFlag:
      return _.assign({}, state, _.omit(actions, ['type']));
    default:
      return state;
  }
}

export default combineReducers({payPasswordFlag});