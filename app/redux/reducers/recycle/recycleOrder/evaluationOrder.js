import {combineReducers} from 'redux';


import {
  FETCH_EvaluationRecycleOrder_Request,
  FETCH_EvaluationRecycleOrder_Success,
  FETCH_EvaluationRecycleOrder_Failure
} from '../../../actions/recycle/recycleOrder/evaluationOrder';


function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_EvaluationRecycleOrder_Request:
      return true;
    case FETCH_EvaluationRecycleOrder_Success:
    case FETCH_EvaluationRecycleOrder_Failure:
      return false;
    default:
      return state;
  }
}

let evaluationOrder = combineReducers({isFetching});

export default evaluationOrder;