// type 类型
export const SET_LOCATION = 'SET_LOCATION';
export const SET_AutoLocationFlag = 'SET_AutoLocationFlag';


/* ------ Action 生成函数 ------ */
// 设置 currentLocation
export function setLocation(location){
  return {
    type: SET_LOCATION,
    text: location.text
  }
}
// 刷新自动定位 开关
export function setAutoLocationFlag(flag){
  return {
    type: SET_AutoLocationFlag,
    flag
  }
}