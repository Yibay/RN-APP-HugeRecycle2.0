// 合并reducers函数
import { combineReducers } from 'redux';

/* ------ type 类型 ------ */
import { SET_Location, SET_AutoLocationFlag } from '../actions/Location';


/* ------ reducer 函数 ------ */
/**
 * 当前定位小区
 * @param state
 * @param action
 * @returns {string}
 */
function currentLocation(state='选择小区', action){
  switch (action.type){
    case SET_Location:
      return action.text;
    default:
      return state;
  }
}
/**
 * 自动定位flag
 * @param state
 * @param action
 * @returns {*}
 */
function autoLocationFlag(state=true, action){
  switch (action.type){
    case SET_AutoLocationFlag:
      return action.flag;
    default:
      return state;
  }
}

const location = combineReducers({
  currentLocation,
  autoLocationFlag
});

export default location;