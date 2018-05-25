import {SET_QuickStart, SET_NormalStart} from '../../actions/miPush/quickStart';


function quickStart(state=false,action){
  switch(action.type){
    case SET_QuickStart:
      return true;
    case SET_NormalStart:
      return false;
    default:
      return state;
  }
}

export default quickStart;