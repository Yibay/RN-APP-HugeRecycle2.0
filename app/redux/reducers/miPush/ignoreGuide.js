import {IGNORE_GuidePage} from '../../actions/miPush/ignoreGuide';


function ignoreGuide(state=false, action){
  switch(action.type){
    case IGNORE_GuidePage:
      return true;
    default:
      return state;
  }
}

export default ignoreGuide;