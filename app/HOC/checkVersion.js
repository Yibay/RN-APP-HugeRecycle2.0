import React, {Component} from 'react';
import {NativeModules, Platform, Alert, DeviceEventEmitter, ToastAndroid, Linking} from 'react-native';


import request from "../util/request/request";
import config from "../util/request/config";
import {checkVersionIOS} from "../util/version";


const checkVersion = (WrappedComponent) => class extends Component {
  render(){
    return <WrappedComponent {...this.props}/>
  }

  componentDidMount(){
    Platform.select({
      ios: this.checkVersionIOS,
      android: this.checkVersionAndroid
    })();
  }

  componentWillUnmount(){
    this.subscription && this.subscription.remove();
  }

  // 检测 iOS版本
  async checkVersionIOS(){
    const version = await request.get(config.api.versionIOS);
    // 检验 是否上架 app Store
    if(!version.results.length){
      console.log('此appID为未上架的APP 或者 查询不到');
    }
    // 检验 app Store 是否有新版本
    if(checkVersionIOS(version.results[0].version)){
      // 检测 设备能否 调用 appStore
      const supported = await Linking.canOpenURL(config.api.appStore).catch(e => {console.log(e);return false});
      if(supported){
        Alert.alert('更新版本','',[
          // 去app Store页面
          {text: '确定', onPress: () => {Linking.openURL(config.api.appStore)}}
        ]);
      }
      else{
        Alert.alert('当前设备不支持 调用 appStore更新版本');
      }
    }
  }

  // 检测 android版本
  async checkVersionAndroid(){

    this.subscription = DeviceEventEmitter.addListener('LOAD_PROGRESS',(msg)=>{
      let title = "当前下载进度：" + msg;
      ToastAndroid.show(title, ToastAndroid.SHORT);
    });

    const res = await request.get(config.api.version);
    // 若有新版本
    if(res && !res.status && res.data.version > config.version){
      console.log('更新');
      // Linking.openURL(config.api.androidAPK);
      Alert.alert('更新版本','',[
        {text: '确定', onPress: () => {Linking.openURL(config.api.androidAPK)}},
        {text: '取消'}
      ]);
      // NativeModules.upgrade.upgrade(config.api.androidAPK);
    }
  }


};

export default checkVersion;