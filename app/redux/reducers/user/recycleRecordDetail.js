import {combineReducers} from 'redux';


import {FETCH_RecycleOrderDetail_Request, FETCH_RecycleOrderDetail_Success, FETCH_RecycleOrderDetail_Failure} from '../../actions/user/recycleRecordDetail';


function data(state={}, actions){
  switch (actions.type){
    case FETCH_RecycleOrderDetail_Request:
      return {};
    case FETCH_RecycleOrderDetail_Success:
      return actions.data;
    default:
      return state;
  }
}

let dataSourceInit = {
  id: 0,
  orderStatusId: 0,
  tServiceOrder: {
    orderItems: [],
    orderScore: 0,
  },
  createOrderTime: '',
  recycleCategoryDesc: '',
};

function dataSource(state=dataSourceInit, actions){
  switch (actions.type){
    case FETCH_RecycleOrderDetail_Request:
      return dataSourceInit;
    case FETCH_RecycleOrderDetail_Success:
      return actions.dataSource;
    default:
      return state;
  }
}

function isFetching(state=false, actions){
  switch (actions.type){
    case FETCH_RecycleOrderDetail_Request:
      return true;
    case FETCH_RecycleOrderDetail_Success:
    case FETCH_RecycleOrderDetail_Failure:
      return false;
    default:
      return state;
  }
}

let recycleRecordDetail = combineReducers({data, dataSource, isFetching});

export default recycleRecordDetail;