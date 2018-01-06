// type 类型
export const SET_LOCATION = 'SET_LOCATION';


/* ------ Action 生成函数 ------ */
// 设置 currentLocation
export function setLocation(location){
  return {
    type: SET_LOCATION,
    text: location.text
  }
}