import {combineReducers} from 'redux';

function data(state=[],actions){
  switch(actions.type){
    default:
      return state;
  }
}

function isFetching(state=false,actions){
  switch(actions.type){
    default:
      return state;
  }
}

let hugeInformation = combineReducers({data, isFetching});

export default hugeInformation;