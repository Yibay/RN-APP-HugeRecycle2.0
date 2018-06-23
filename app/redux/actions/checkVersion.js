import {NativeModules, Platform, Alert, Linking} from 'react-native';

import {checkUpdate, downloadUpdate, switchVersionLater, isFirstTime, markSuccess} from 'react-native-update';
import {Toast} from 'antd-mobile-rn';


import request from "../../util/request/request";
import config from "../../util/request/config";
import {checkVersionIOS} from "../../util/version";
import _updateConfig from "../../../update.json";


const {appKey} = _updateConfig[Platform.OS];

export function checkVersion(){

  return async (dispatch, getState) => {
    Platform.select({
      ios: _checkVersionIOS,
      android: _checkVersionAndroid
    })();
  }
}

// 检测 iOS版本(appStore版本)
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
  // 检查 是否有热更新版本
  else{
    _checkHotUpdate();
  }
}

// 检测 android版本(自己服务器上的apk版本号)
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
  // 检查 是否有热更新版本
  else{
    _checkHotUpdate();
  }
}

// 检查 热更新（react-native-pushy 上 热更新版本）
function _checkHotUpdate(){
  checkUpdate(appKey).then(info => {
    Toast.info('info');
    if(info.expired){
      Toast.info('本地版本与热更新网站 包版本不一致，可能您的应用版更新了,请前往应用商店下载新的版本');
      // 热更新 应用包 版本号变更，而非app store 发布版本号变更
      // 此处判断 线上版本是否更新，并不准确，所以 线上版本更新，还是采用原逻辑。
      // 仅 热更新版本 采用 react-native-update 的逻辑
      console.log('本地版本与热更新网站 包版本不一致，可能您的应用版更新了,请前往应用商店下载新的版本');
    }
    else if (info.upToDate) {
      Toast.info('包版本一致，已经是热更新最新版');
      console.log('包版本一致，已经是热更新最新版');
      // 热更新后，首次启动，确认 无异常后，mark版本更新成功，防止版本回滚。
      if (isFirstTime) {
        markSuccess();
      }
    }
    else{
      Toast.info('包版本一致，有热更新版本');
      console.log('包版本一致，有热更新版本');
      // 下载当前包版本 对应的热更新版本
      downloadUpdate(info).then(hash => {
        Toast.info('有版本更新，下次启动更新',3,()=>{
          // 下次重启时，切换热更新版本
          switchVersionLater(hash);
        });
      })
    }
  });

}