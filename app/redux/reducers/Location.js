// 合并reducers函数
import { combineReducers } from 'redux';

/* ------ type 类型 ------ */
import { SET_LOCATION } from '../actions/Location';


/* ------ reducer 函数 ------ */
// 当前定位小区
function currentLocation(state='选择小区', action){
  switch (action.type){
    case SET_LOCATION:
      return action.text;
    default:
      return state;
  }
}

export default currentLocation;