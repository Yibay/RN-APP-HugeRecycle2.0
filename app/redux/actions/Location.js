import _ from 'lodash';

// type 类型
export const SET_Location = 'SET_Location';
export const SET_AutoLocationFlag = 'SET_AutoLocationFlag';
export const SET_UserAddressList = 'SET_UserAddressList';

// 其他常量
export const defaultCurrentLocation = {
  communityName: '选择小区',
  haveHouseNumber: true,
  address: '',
  building: '',
  unit: '',
  room: ''
};


/* ------ Action 生成函数 ------ */
/**
 * 设置 currentLocation
 * @param {{communityId: number, communityName: string, ...}} location
 * @returns {{type: string, communityId: number, communityName: string, ...}}
 */
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

/**
 * 设置用户地址列表
 * @param addressList
 * @returns {{type: string, addressList: arrayOf({communityId: number, communityName: string, customerName: string, ...})}}
 */
export function setUserAddressList(addressList){
  return {
    type: SET_UserAddressList,
    addressList
  }
}