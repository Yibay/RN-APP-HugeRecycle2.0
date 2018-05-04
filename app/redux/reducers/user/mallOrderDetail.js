import {combineReducers} from 'redux';


import {
  FETCH_MallOrderDetail_Request,
  FETCH_MallOrderDetail_Success,
  FETCH_MallOrderDetail_Failure,
} from '../../actions/user/mallOrderDetail';


function data(state={}, action){
  switch(action.type){
    case FETCH_MallOrderDetail_Success:
      return action.data;
    default:
      return state;
  }
}

function isFetching(state=false, action){
  switch (action.type){
    case FETCH_MallOrderDetail_Request:
      return true;
    case FETCH_MallOrderDetail_Success:
    case FETCH_MallOrderDetail_Failure:
      return false;
    default:
      return state;
  }
}

let mallOrderDetail = combineReducers({data, isFetching});

export default mallOrderDetail;