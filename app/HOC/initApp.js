/**
 * 中间件 登录状态初始化（初始化 相关Redux状态）
 * */

import React, { Component } from 'react';
import {StatusBar, Platform} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import Orientation from 'react-native-orientation';


// 管理推送
import {miPushInit, miPushUninstall} from '../redux/actions/miPush/MiPushManager';

// Action
import { setIdentityTokenThunk } from '../redux/actions/IdentityToken';
import { setAllProducts, resetRecycledItem } from '../redux/actions/Recycle';


const initApp = (WrappedComponent) => connect(null, { setAllProducts, setIdentityTokenThunk, resetRecycledItem, miPushInit, miPushUninstall })(class extends Component {

  render(){
    return (<WrappedComponent {..._.omit(this.props, ['setIdentityTokenThunk'])} />);
  }

  componentDidMount(){
    // 1. 再次锁定垂直方向
    this.lockOrientationAgain();
    // 2. 再次设为沉浸式（防止 应用假退Bug）
    this.setTranslucentAgain();
    // 3. 清空待回收物品
    this.props.resetRecycledItem();
    // 4. 设置身份信息
    this.setIdentityToken();
    // 5. 监听推送
    this.props.miPushInit();
  }

  componentWillUnmount(){
    console.log('应用销毁');
    // 取消监听推送
    this.props.miPushUninstall();
  }

  // 1. 设置身份信息
  async setIdentityToken(){

    // 获取本地储存 身份信息（token）
    let ret = await storage
      .load({ key: 'identityToken' })
      .catch(err => {console.warn(err); return null}); // 若未找到，则log对应信息
    console.log('重启应用');

    // 若找到 则更新到数据流中
    if(ret){
      this.props.setIdentityTokenThunk(ret);
    }
  }

  // 2. Android 重新设为 沉浸式
  setTranslucentAgain(){
    Platform.select({
      ios: () => {},
      android: () => {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
      }
    })();
  }

  // 3. 重新锁屏
  lockOrientationAgain(){
    Orientation.lockToPortrait();
  }


});

export default initApp;