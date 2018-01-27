import { Alert } from 'react-native';


import validator from './validator';

export const createOrderValidator = recycleOrder => {

  // currentLocation 的 id 不存在，认为 地址填写不完整
  // if(!recycleOrder.id){
  //   Alert.alert('请填写完整联系人信息');
  //   return false;
  // }
  if(!validator.isNumber(recycleOrder.communityId) || validator.isEmpty(recycleOrder.communityName)){
    Alert.alert('请选择小区');
    return false;
  }
  if(!validator.isBoolean(recycleOrder.isAerialWork)){
    Alert.alert(('请确认，是否需要拆卸空调'));
    return false;
  }
  if(validator.isEmpty(recycleOrder.accountName)){
    Alert.alert('请填写联系人姓名');
    return false;
  }
  if(!validator.isPhone(recycleOrder.phone)){
    Alert.alert('请填写正确手机号码');
    return false;
  }
  if(!validator.isNumber(recycleOrder.orderSource)){
    console.log('未设置 订单来源');
  }
  if(validator.isEmpty(recycleOrder.address)){
    Alert.alert('未填写详细地址');
    return false;
  }
  if(!validator.isBoolean(recycleOrder.haveHouseNumber)){
    Alert.alert('未确认 有无户号');
    return false;
  }

  // 无异常，返回true
  return true;
};