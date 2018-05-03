import {combineReducers} from 'redux';


import {DELETE_MallOrder_Request, DELETE_MallOrder_Success, DELETE_MallOrder_Failure} from '../../../actions/mall/mallOrder/deleteMallOrder';


// 错误消息提示
function message(state='',actions){
  switch (actions.type){
    case DELETE_MallOrder_Request:
      return '';
    case DELETE_MallOrder_Failure:
      return actions.message;
    default:
      return state;
  }
}

// 取消商城订单loading状态
function isFetching(state=false,actions){
  switch (actions.type){
    case DELETE_MallOrder_Request:
      return true;
    case DELETE_MallOrder_Success:
    case DELETE_MallOrder_Failure:
      return false;
    default:
      return state;
  }
}

let deleteMallOrder = combineReducers({isFetching, message});

export default deleteMallOrder;