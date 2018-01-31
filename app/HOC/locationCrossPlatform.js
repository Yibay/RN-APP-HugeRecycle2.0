// 跨平台定位

import React, { Component } from 'react';
import { Platform, Alert } from 'react-native';

import PropTypes from 'prop-types';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation'; // iOS定位
import { wgs84togcj02, gcj02tobd09 } from 'coordtransform'; // 坐标转换
import _ from 'lodash';


import request from '../util/request/request';
import config from '../util/request/config';


export const locationAndroid = WrappedComponent => class extends Component{

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

  // 获取一次本地定位
  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => this.geo_success(position),(e) => this.geo_error(e))
  }

  // 获取定位信息成功
  geo_success(position){

    // 地球坐标（WGS84）
    console.log('------ getCurrentPosition ------');
    console.log('GPS坐标', position);
    // 火星坐标 (GCJ-02)
    let gcj02Location = wgs84togcj02(position.coords.longitude, position.coords.latitude);
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

    // 关闭 定位
    this.props.setAutoLocationFlag(false);
  }

  // 获取定位信息失败
  geo_error(e){
    console.log(e);
    // 关闭 定位
    this.props.setAutoLocationFlag(false);
  }
};

export const locationCrossPlatform =  locationAndroid;