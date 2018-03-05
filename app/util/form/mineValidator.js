import { Alert } from 'react-native';


import validator from './validator';


export const updatePasswordValidator = ({oldPassword, newPassword, confirmPassword}) => {
  if(validator.isEmpty(newPassword)){
    Alert.alert('请输入新密码');
    return false;
  }
  // 无异常
  return true;
};