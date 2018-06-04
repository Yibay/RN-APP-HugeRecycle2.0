import { Alert } from 'react-native';


import validator from './validator';

export const createOrderValidator = recycleOrder => {

  // currentLocation 的 id 不存在，认为 地址填写不完整
  // if(!recycleOrder.id){
  //   Alert.alert('请填写完整联系人信息','',[{text:'确认'}]);
  //   return false;
  // }
  if(!validator.isNumber(recycleOrder.communityId) || validator.isEmpty(recycleOrder.communityName)){
    Alert.alert('请选择小区','',[{text:'确认'}]);
    return false;
  }
  if(recycleOrder.communityName === '其他'){
    Alert.alert('小区名不能为其他','',[{text:'确认'}]);
    return false;
  }
  if(!validator.isBoolean(recycleOrder.isAerialWork)){
    Alert.alert('请确认，是否需要拆卸空调','',[{text:'确认'}]);
    return false;
  }
  if(validator.isEmpty(recycleOrder.accountName)){
    Alert.alert('请填写联系人姓名','',[{text:'确认'}]);
    return false;
  }
  if(!validator.isPhone(recycleOrder.phone)){
    Alert.alert('请填写正确手机号码','',[{text:'确认'}]);
    return false;
  }
  if(!validator.isNumber(recycleOrder.orderSource)){
    console.log('未设置 订单来源','',[{text:'确认'}]);
  }
  if(validator.isEmpty(recycleOrder.address)){
    Alert.alert('未填写详细地址','',[{text:'确认'}]);
    return false;
  }
  if(!validator.isBoolean(recycleOrder.haveHouseNumber)){
    Alert.alert('未确认 有无户号','',[{text:'确认'}]);
    return false;
  }
  if(recycleOrder.haveHouseNumber){
    if(validator.isEmpty(recycleOrder.building)){
      Alert.alert('未填写 栋','',[{text:'确认'}]);
      return false;
    }
    if(validator.isEmpty(recycleOrder.unit)){
      Alert.alert('未填写 单元','',[{text:'确认'}]);
      return false;
    }
    if(validator.isEmpty(recycleOrder.room)){
      Alert.alert('未填写 室','',[{text:'确认'}]);
      return false;
    }
  }

  // 无异常，返回true
  return true;
};