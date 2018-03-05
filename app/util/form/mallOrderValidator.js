import { Alert } from 'react-native';


import validator from './validator';

export const createMallOrderValidator = mallOrder => {

  if(!validator.isNumber(mallOrder.communityId) || validator.isEmpty(mallOrder.communityName)){
    Alert.alert('请选择小区');
    return false;
  }
  if(validator.isEmpty(mallOrder.customerName)){
    Alert.alert('请填写联系人姓名');
    return false;
  }
  if(!validator.isPhone(mallOrder.customerPhone)){
    Alert.alert('请填写正确手机号码');
    return false;
  }
  if(!validator.isNumber(mallOrder.orderSource)){
    console.log('未设置 订单来源');
  }
  if(validator.isEmpty(mallOrder.address)){
    Alert.alert('未填写详细地址');
    return false;
  }
  if(!validator.isNumber(mallOrder.storeId)){
    Alert.alert('未选择 便利店');
    return false;
  }

  // 无异常，返回true
  return true;
};