import { Alert } from 'react-native';


import validator from './validator';


export const editAddress = location => {
  if(!validator.isNumber(location.id)){
    Alert.alert('请选择待编辑地址');
    return false;
  }
  if(!validator.isNumber(location.communityId)){
    Alert.alert('请选择小区');
    return false;
  }
  if(!validator.isBoolean(location.haveHouseNumber)){
    Alert.alert('确认有无户号');
    return false;
  }
  if(location.haveHouseNumber){
    if(validator.isEmpty(location.building)){
      Alert.alert('请输入幢');
      return false;
    }
    if(validator.isEmpty(location.unit)){
      Alert.alert('请输入单元');
      return false;
    }
    if(validator.isEmpty(location.room)){
      Alert.alert('请输入室');
      return false;
    }
  }
  else {
    if(validator.isEmpty(location.address)){
      Alert.alert('请输入详细地址');
      return false;
    }
  }

  return true;
};