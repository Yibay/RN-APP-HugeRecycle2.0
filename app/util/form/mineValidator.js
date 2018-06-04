import { Alert } from 'react-native';


import validator from './validator';


export const updatePasswordValidator = ({oldPassword, newPassword}) => {
  if(validator.isEmpty(newPassword)){
    Alert.alert('请输入新密码','',[{text:'确认'}]);
    return false;
  }
  // 无异常
  return true;
};

export const forgetPasswordValidator = ({code, newPassword}) => {
  if(validator.isEmpty(code)){
    Alert.alert('请输入验证码','',[{text:'确认'}]);
    return false;
  }
  if(validator.isEmpty(newPassword)){
    Alert.alert('请输入新密码','',[{text:'确认'}]);
    return false;
  }
  return true;
};

// 验证消费密码(6位码)
export const updateConsumePWValidator = (newPasswordSource) => {
  if(validator.isEmpty(newPasswordSource)){
    Alert.alert('请输入新密码','',[{text:'确定'}]);
    return {value: false,reset: false};
  }
  if(!validator.isLength(newPasswordSource,12,12)){
    return {value: false,reset: false};
  }
  if(!validator.isEqual(newPasswordSource.substr(0,6),newPasswordSource.substr(6))){
    Alert.alert('二次密码不一致','',[{text:'确定'}]);
    return {value: false,reset: true};
  }
  return {value:true};
};