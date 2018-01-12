import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView,TouchableWithoutFeedback, Alert } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation'; // 定位
import { wgs84togcj02, gcj02tobd09 } from 'coordtransform'; // 坐标转换


import { setLocation, setAutoLocationFlag } from '../../redux/actions/Location';
import request from '../../util/request/request';
import config from '../../util/request/config';


class CommunitySelector extends Component{

  constructor(props){
    super(props);

    this.state = {
      LocateCommunities: [],
      communitySelected: this.props.communitySelected
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      communitySelected: nextProps.communitySelected
    })
  }

  render(){
    return (<View style={styles.container}>
      <Text style={styles.title}>检测到这些小区在您周围</Text>
      <ScrollView style={styles.communityList}>
        <View style={styles.communityLayout}>
          {this.state.LocateCommunities.map(
            (item, index) =>
              <TouchableWithoutFeedback key={index} onPress={() => this.selectCommunity(item)}>
                <View style={[styles.community, this.state.communitySelected.communityName === item.communityName ? styles.communitySelected : styles.none]}>
                  <Text style={styles.communityName}>{item.communityName}</Text>
                </View>
              </TouchableWithoutFeedback>
          )}
        </View>
      </ScrollView>
      <View style={styles.commitLayout}>
        <TouchableWithoutFeedback onPress={() => this.commitCommunity()}>
          <View style={styles.commitBtn}>
            <Text style={styles.commitText}>确认选择</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.manualInputBtn}>
          <Text style={styles.manualInputText}>手动输入小区</Text>
        </View>
      </View>
    </View>);
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
      request.get(config.api.getLocateCommunity,{
        longitude: bd09Location[0],
        // longitude: '120.173374306960',
        latitude: bd09Location[1],
        // latitude: '30.388771979180'
      })
        .then(res => {
          console.log(res);
          this.setState({
            LocateCommunities: res.data
          })
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

  selectCommunity(communitySelected){
    // 更新选中小区
    this.setState({
      communitySelected: communitySelected
    });
  }
  commitCommunity(){
    // 更新选中小区 到全局
    this.props.setLocation(this.state.communitySelected);
    // 返回回收页
    Actions.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignSelf: 'stretch'
  },
  title: {
    alignSelf: 'center',
    fontSize: 34,
    fontWeight: '700'
  },
  communityList: {
    marginTop: 90,
    marginBottom: 50,
    flex: 1,
    paddingHorizontal: 40
  },
  communityLayout: {
    marginLeft: -20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  community: {
    width: 286,
    marginLeft: 20,
    marginBottom: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  communitySelected: {
    backgroundColor: 'rgba(153, 204, 51, 1)'
  },
  communityName: {
    fontSize: 25
  },
  commitLayout: {
    marginBottom: 100,
    flexDirection: 'row'
  },
  commitBtn: {
    width: 286,
    marginLeft: 40,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#169bd5'
  },
  manualInputBtn: {
    width: 286,
    marginLeft: 20,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  commitText: {
    fontSize: 25,
    color: '#fff'
  },
  manualInputText: {
    fontSize: 25
  }
});

// 过滤出有用state映射给props
function mapStateToProps(state){
  return {
    communitySelected: state.location.currentLocation,
    autoLocationFlag: state.location.autoLocationFlag
  }
}

// 打包 actions 成obj
const actionCreator = { setLocation, setAutoLocationFlag };

export default connect(mapStateToProps, actionCreator)(CommunitySelector);