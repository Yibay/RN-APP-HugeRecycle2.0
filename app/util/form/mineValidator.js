import { Alert } from 'react-native';


import validator from './validator';


export const updatePasswordValidator = ({oldPassword, newPassword, confirmPassword}) => {
  if(validator.isEmpty(newPassword)){
    Alert.alert('请输入新密码');
    return false;
  }
  if(validator.isEmpty(confirmPassword)){
    Alert.alert('请输入重复密码');
    return false;
  }
  if(!validator.isEqual(newPassword, confirmPassword)){
    Alert.alert('2次输入密码不一致');
    return false;
  }
  // 无异常
  return true;
};