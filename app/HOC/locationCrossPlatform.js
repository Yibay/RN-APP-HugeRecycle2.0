// 跨平台定位

import React, { Component } from 'react';
import { Alert, Platform, Linking, NativeModules, PermissionsAndroid } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { wgs84togcj02, gcj02tobd09 } from 'coordtransform'; // 坐标转换
import _ from 'lodash';


import request from '../util/request/request';
import config from '../util/request/config';
import { setAutoLocationFlag } from '../redux/actions/Location';


function mapStateToProps(state){
  return {
    autoLocationFlag: state.location.autoLocationFlag,
  }
}
export const locationCrossPlatform = WrappedComponent => connect(mapStateToProps,{setAutoLocationFlag})(class extends Component{

  static propTypes = {
    autoLocationFlag: PropTypes.bool.isRequired, // 是否要更新定位
    setAutoLocationFlag: PropTypes.func.isRequired // 更新定位开关
  };

  constructor(props){
    super(props);

    this.state = {
      LocateCommunities: []
    };
  }

  render(){
    // 将 本代理层，用到的 props，过滤出来
    return (<WrappedComponent {..._.omit(this.props,['autoLocationFlag','setAutoLocationFlag'])} LocateCommunities={this.state.LocateCommunities} />);
  }

  componentDidMount(){
    this.getCurrentPosition();
  }

  componentDidUpdate(){
    // 根据定位开关状态，判断是否 获取本地定位
    this.props.autoLocationFlag && this.getCurrentPosition();
  }

  componentWillUnmount(){
    // 后续开启 定位权限：清除计时器
    if (this.openGeolocationListener){
      console.log('清除计时器');
      clearInterval(this.openGeolocationListener);
    }
  }

  // 获取一次本地定位
  getCurrentPosition(){
    Platform.select({
      ios: () => {
        navigator.geolocation.getCurrentPosition((position) => this.geo_success(position),(e) => this.geo_error(e),{timeout: 5000});
      },
      android: async () => {
        // 检验 app 是否被用户授权 定位
        let accessLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if(accessLocation){
          // 去请求
          navigator.geolocation.getCurrentPosition((position) => this.geo_success(position),(e) => this.geo_error(e),{timeout: 5000});
        }
        else{
          // 去定位授权界面
          Alert.alert('去开启定位权限','',[
            {
              text: '去设置', onPress: () => {
                NativeModules.OpenSettings.openAppSettings(e => {});
                // 开启计时器 检查定位是否开启
                this.openGeolocationListener = setInterval(() => this.getCurrentPosition(),1000);
              }
            },
            {
              text: '取消'
            }
          ]);

        }
      }
    })();
  }

  // 获取定位信息成功
  geo_success(position) {

    // 地球坐标（WGS84）
    console.log('------ getCurrentPosition ------');
    console.log('GPS坐标', position);
    // 火星坐标 (GCJ-02)
    let gcj02Location = wgs84togcj02(position.coords.longitude, position.coords.latitude);
    console.log('火星坐标：', gcj02Location);
    // 百度坐标 (BD-09)
    let bd09Location = gcj02tobd09.apply(this, gcj02Location);
    console.log('百度坐标：', bd09Location);

    // 获取定位小区（回收）(异步)
    this.getLocateCommunity({
      longitude: bd09Location[0],
      latitude: bd09Location[1]
    });

    // 关闭 定位
    this.props.setAutoLocationFlag(false);

    // 后续开启 定位权限：清除计时器
    if (this.openGeolocationListener){
      clearInterval(this.openGeolocationListener);
    }
  }

  // 获取定位小区（回收）
  async getLocateCommunity({longitude, latitude}){
    const res = await request
      .get(config.api.getLocateCommunity,{ longitude, latitude });

    // 验证请求结果 是否正常（status: 0 正常，1 异常）
    if(res && !res.status){
      this.setState({
        LocateCommunities: res.data
      })
    }
  }

  // 获取定位信息失败
  geo_error(e){
    console.log(e);
    // 1. 用户拒绝App访问位置服务。
    if(e.code === 1){
      if (!this.openGeolocationListener){
        Alert.alert('请去开启定位权限','',[
          {
            text: '去设置', onPress: () => {
              // 开启计时器 检查定位是否开启
              this.openGeolocationListener = setInterval(() => this.getCurrentPosition(),1000);
              // 跳转到设置-定位
              Platform.select({
                ios: async () => {
                  let settingUrl = 'app-settings:';
                  const supported = await Linking.canOpenURL(settingUrl).catch(e => {console.log(e); return false});
                  supported && Linking.openURL(settingUrl);
                },
                android: () =>{
                  NativeModules.OpenSettings.openAppSettings(e => {});
                }
              })();
            },
          },
          {
            text: '取消'
          }
        ]);
      }
    }
    // 2. 手机设置内，定位服务未开启
    else if(e.code === 2){
      if (!this.openGeolocationListener){
        Alert.alert('请去开启定位权限','',[
          {
            text: '去设置', onPress: () => {
              // 开启计时器 检查定位是否开启
              this.openGeolocationListener = setInterval(() => this.getCurrentPosition(),1000);
              // 跳转到设置-定位
              Platform.select({
                ios: async () => {
                  let settingUrl = 'App-Prefs:root=Privacy&path=LOCATION';
                  let supported = await Linking.canOpenURL(settingUrl).catch(e => {console.log(e); return false});
                  supported && Linking.openURL(settingUrl);
                },
                android: () => {
                  NativeModules.OpenSettings.openLocationSettings(data => console.log('call back data',data));
                },
              })();
            }
          },
          {
            text: '取消'
          }
        ]);
      }
    }
    // 3. 定位超时
    else if(e.code === 3){
      if(!this.openGeolocationListener){
        Alert.alert('定位超时','请选择手动定位',[{text:'好'}]);
      }
      if (this.openGeolocationListener){
        console.log('清除计时器');
        clearInterval(this.openGeolocationListener);
      }
    }
    // 关闭 定位Flag
    if(this.props.autoLocationFlag){
      this.props.setAutoLocationFlag(false);
    }
  }
});