// 需获取到便利店信息 访问页面 代理

import React, { Component } from 'react';
import { StyleSheet } from 'react-redux';

import { connect } from 'react-redux';


import MallNotOpen from '../pages/Home/Mall/MallNotOpen';


export const verifyStoreInfo = WrappedComponent => connect(mapStateToProps)(class extends Component{
  render(){
    if(this.props.storeInfo.length){
      return <WrappedComponent {...this.props} />
    }
    else {
      return <MallNotOpen />
    }
  }
});

function mapStateToProps(state){
  return {
    storeInfo: state.mall.storeInfo
  }
}