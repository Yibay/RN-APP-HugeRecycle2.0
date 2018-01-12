import _ from 'lodash';

// type 类型
export const SET_Location = 'SET_Location';
export const SET_AutoLocationFlag = 'SET_AutoLocationFlag';

// 其他常量
export const defaultCurrentLocation = {communityName: '选择小区'};


/* ------ Action 生成函数 ------ */
// 设置 currentLocation
export function setLocation(location){
  return _.merge(
    {type: SET_Location},
    location
  )
}

/**
 * 刷新 自动定位 开关
 * @param {boolean} flag
 * @returns {{type: string, flag: *}}
 */
export function setAutoLocationFlag(flag){
  return {
    type: SET_AutoLocationFlag,
    flag
  }
}