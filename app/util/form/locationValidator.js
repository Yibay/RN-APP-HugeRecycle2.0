import { Alert } from 'react-native';


import validator from './validator';


export const editAddress = location => {
  if(!validator.isNumber(location.id)){
    Alert.alert('请选择待编辑地址','',[{text:'确认'}]);
    return false;
  }
  // 检验数据格式
  if(validator.isEmpty(location.customerName)){
    Alert.alert('请输入联系人姓名','',[{text:'确认'}]);
    return;
  }
  if(!validator.isPhone(location.telNo)){
    Alert.alert('请输入正确的手机号码','',[{text:'确认'}]);
    return;
  }
  if(!validator.isNumber(location.communityId)){
    Alert.alert('请选择小区','',[{text:'确认'}]);
    return false;
  }
  if(!validator.isBoolean(location.haveHouseNumber)){
    Alert.alert('确认有无户号','',[{text:'确认'}]);
    return false;
  }
  if(location.haveHouseNumber){
    if(validator.isEmpty(location.building)){
      Alert.alert('请输入幢','',[{text:'确认'}]);
      return false;
    }
    if(validator.isEmpty(location.unit)){
      Alert.alert('请输入单元','',[{text:'确认'}]);
      return false;
    }
    if(validator.isEmpty(location.room)){
      Alert.alert('请输入室','',[{text:'确认'}]);
      return false;
    }
  }
  else {
    if(validator.isEmpty(location.address)){
      Alert.alert('请输入详细地址','',[{text:'确认'}]);
      return false;
    }
  }

  return true;
};