import {Alert} from 'react-native';

export const showRecycleOrderError = (res) => {
  if (res.data && res.data.error) {
    if (res.data.type === 'time_invalid') {
      Alert.alert('呼叫时间：' + res.data['start_appoint_time'] + '~' + res.data['end_appoint_time'],'对不起，当前时间不在该区域工作时间内',[{text:'确认'}]);
    }
    else if (res.data.type === 'monday_rest' || res.data.msg) {
      Alert.alert('呼叫提示', res.data.msg,[{text:'确认'}]);
    }
    else {
      Alert.alert('呼叫失败','',[{text:'确认'}]);
    }
  }
  else if (res.message) {
    Alert.alert('呼叫提示', res.message,[{text:'确认'}]);
  }
  else {
    Alert.alert('呼叫失败','',[{text:'确认'}]);
  }
};