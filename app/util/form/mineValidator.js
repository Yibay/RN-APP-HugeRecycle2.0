import { Alert } from 'react-native';


import validator from './validator';


export const updatePasswordValidator = ({oldPassword, newPassword}) => {
  if(validator.isEmpty(newPassword)){
    Alert.alert('请输入新密码');
    return false;
  }
  // 无异常
  return true;
};

export const forgetPasswordValidator = ({code, newPassword}) => {
  if(validator.isEmpty(code)){
    Alert.alert('请输入验证码');
    return false;
  }
  if(validator.isEmpty(newPassword)){
    Alert.alert('请输入新密码');
    return false;
  }
  return true;
};