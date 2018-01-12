// 合并reducers函数
import { combineReducers } from 'redux';
import _ from 'lodash';

/* ------ type 类型 ------ */
import {
  // type 类型
  SET_Location, SET_AutoLocationFlag,
  // 地址常量
  defaultCurrentLocation
} from '../actions/Location';


/* ------ reducer 函数 ------ */
/**
 * 当前定位小区
 * @param {{communityName: string}} state
 * @param {{communityName: string}} action
 * @returns {{communityName: string}}
 */
function currentLocation(state= defaultCurrentLocation, action){

  let new_state = {};

  switch (action.type){
    case SET_Location:
      _.merge(new_state, _.omit(action, ['type'])); // 复制 除type之外 的所有属性
      return new_state;
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