import React, { Component } from 'react';
import { Platform, Alert } from 'react-native';

import PropTypes from 'prop-types';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation'; // iOS定位
import { wgs84togcj02, gcj02tobd09 } from 'coordtransform'; // 坐标转换
import _ from 'lodash';


import request from '../util/request/request';
import config from '../util/request/config';


export const locationIOS = WrappedComponent => class extends Component{

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
    return (<WrappedComponent {..._.omit(this.props,['autoLocationFlag','setAutoLocationFlag'])} LocateCommunities={this.state.LocateCommunities} />)
  }

  componentDidMount(){

    // 步骤1: 配置configure
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER, // location 供应商
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      maxLocations: 1, // db储存location数，就存1条id: 0的就好，节省存储空间
      // url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
        'X-FOO': 'bar'
      }
    });

    BackgroundGeolocation.on('start', () => {
      // 步骤3: 开启定位（监听）
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      // 步骤4: 授权定位（监听）
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        Alert.alert('Location services are disabled', 'Would you like to open location settings?', [
          { text: 'Yes', onPress: () => BackgroundGeolocation.showLocationSettings() },
          { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
        ]);
      }
    });

    BackgroundGeolocation.on('location', (location) => {
      // 步骤5: 获取定位结果 (监听)

      // 地球坐标（WGS84）
      console.log('------ on-location ------');
      console.log('GPS坐标', location);
      // 火星坐标 (GCJ-02)
      let gcj02Location = wgs84togcj02(location.longitude, location.latitude);
      console.log('火星坐标：', gcj02Location);
      // 百度坐标 (BD-09)
      let bd09Location = gcj02tobd09.apply(this, gcj02Location);
      console.log('百度坐标：', bd09Location);

      // 发送定位请求
      request
        .get(config.api.getLocateCommunity,{
          longitude: bd09Location[0],
          latitude: bd09Location[1]
        })
        .then(res => {
          // 验证请求结果 是否正常（status: 0 正常，1 异常）
          if(res && !res.status){
            this.setState({
              LocateCommunities: res.data
            })
          }
        });

      // 步骤6: 关闭 定位
      BackgroundGeolocation.stop();
      this.props.setAutoLocationFlag(false);
    });

    BackgroundGeolocation.on('stop', () => {
      // 步骤6: 关闭 定位 (监听)
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    // 步骤2: 检测 状态
    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation service has permissions', status.hasPermissions);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      // 步骤3: 开启 定位
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

  }

  componentWillUnmount(){
    BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
  }

  componentDidUpdate(){
    this.props.autoLocationFlag && BackgroundGeolocation.start();
  }

};



export const locationAndroid = WrappedComponent => class extends Component{

  render(){
    console.log(navigator.geolocation.getCurrentPosition);
    return (<WrappedComponent {..._.omit(this.props,['autoLocationFlag','setAutoLocationFlag'])} LocateCommunities={[]} />);
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((res) => this.geo_success(res),(e) => this.geo_error(e))
  }

  geo_success(res){
    console.log(res);
  }

  geo_error(e){
    console.log(e)
  }
};

export const locationCrossPlatform = Platform.select({
  ios: locationIOS,
  android: locationAndroid
});