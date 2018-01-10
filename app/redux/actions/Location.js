// type 类型
export const SET_Location = 'SET_Location';
export const SET_AutoLocationFlag = 'SET_AutoLocationFlag';


/* ------ Action 生成函数 ------ */
// 设置 currentLocation
export function setLocation(location){
  return {
    type: SET_Location,
    text: location.text
  }
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