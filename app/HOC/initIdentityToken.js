/**
 * 中间件 登录状态初始化（初始化 相关Redux状态）
 * */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';


import request from "../util/request/request";
import config from "../util/request/config";
// Action
import { setIdentityTokenThunk } from '../redux/actions/IdentityToken';
import { setAllProducts } from '../redux/actions/Recycle';


const initIdentityToken = (WrappedComponent) => connect(null, { setAllProducts, setIdentityTokenThunk })(class extends Component {

  async componentWillMount(){

    await Promise.all([
      this.setIdentityToken(),
      this.getProducts()
    ]);

  }

  // 1. 设置身份信息
  async setIdentityToken(){

    // 获取本地储存 身份信息（token）
    let ret = await storage
      .load({ key: 'identityToken' })
      .catch(err => {console.warn(err); return null}); // 若未找到，则log对应信息

    // 若找到 则更新到数据流中
    if(ret){
      this.props.setIdentityTokenThunk(ret);
    }
  }

  render(){

    return (<WrappedComponent {..._.omit(this.props, ['setIdentityTokenThunk'])} />);
  }
});

export default initIdentityToken;