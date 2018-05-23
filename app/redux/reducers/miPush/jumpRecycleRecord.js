import {JUMP_RecycleRecord, UNJUMP_RecycleRecord} from '../../actions/miPush/jumpRecycleRecord';

function jumpRecycleRecord(state=false, action){
  switch(action.type){
    case JUMP_RecycleRecord:
      return true;
    case UNJUMP_RecycleRecord:
      return false;
    default:
      return state;
  }
}

export default jumpRecycleRecord;