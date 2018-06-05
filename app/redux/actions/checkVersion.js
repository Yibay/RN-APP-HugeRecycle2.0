import {NativeModules, Platform, Alert, Linking} from 'react-native';


import request from "../../util/request/request";
import config from "../../util/request/config";
import {checkVersionIOS} from "../../util/version";


export function checkVersion(){
  return async (dispatch, getState) => {
    Platform.select({
      ios: _checkVersionIOS,
      android: _checkVersionAndroid
    })();
  }
}

// 检测 iOS版本
async function _checkVersionIOS(){
  const [version,res] = await Promise.all([
    request.get(config.api.versionIOS + '&t=' + new Date().getTime()), // 检验版本
    request.get(config.api.version + '?t=' + new Date().getTime()) // 版本更新内容
  ]);
  // 数据异常
  if(!version){
    console.log('网络异常');
    return;
  }
  // 检验 是否上架 app Store
  if(!version.results.length){
    console.log('此appID为未上架的APP 或者 查询不到');
    return;
  }
  // 检验 app Store 是否有新版本
  if(checkVersionIOS(version.results[0].version)){
    // 检测 设备能否 调用 appStore
    const supported = await Linking.canOpenURL(config.api.appStore).catch(e => {console.log(e);return false});
    if(supported){
      Alert.alert('有新版本发布了',
        res.data.versionDescription ? res.data.versionDescription.join('\n') : '',
        res.data.versionForceUpgrade ?
          [
            // 去app Store页面
            {text: '去升级', onPress: () => {Linking.openURL(config.api.appStore)}}
          ]
          :
          [
            {text: '暂不升级'},
            {text: '去升级', onPress: () => {Linking.openURL(config.api.appStore)}}
          ]
      );
    }
    else{
      Alert.alert('appStore有新版本，\n请前往更新','',[{text:'确认'}]);
    }
  }
}

// 检测 android版本
async function _checkVersionAndroid(){

  const res = await request.get(config.api.version + '?t=' + new Date().getTime());
  // 若有新版本
  if(res && !res.status && res.data.version > config.version){
    Alert.alert('有新版本发布了',
      res.data.versionDescription ? res.data.versionDescription.join('\n') : '',
      res.data.versionForceUpgrade ?
        [
          // 去app Store页面
          {text: '去升级', onPress: () => {NativeModules.upgrade.upgrade(config.api.androidAPK);}}
        ]
        :
        [
          {text: '暂不升级'},
          {text: '去升级', onPress: () => {NativeModules.upgrade.upgrade(config.api.androidAPK);}}
        ],
      {cancelable: false}
    );
  }
}