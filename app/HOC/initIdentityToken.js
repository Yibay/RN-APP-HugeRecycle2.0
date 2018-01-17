// 初始化 登录状态

import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';


// Action
import { setIdentityToken } from '../redux/actions/IdentityToken';


const initIdentityToken = WrappedComponent => connect(null, actionsCreator)(class extends Component {

  render(){
    storage
      // 获取本地储存 身份信息
      .load({ key: 'identityToken' })
      // 若找到 则更新到数据流中
      .then(ret => {
        this.props.setIdentityToken(ret);
      })
      // 若未找到，则log对应信息
      .catch(err => {
        console.warn(err);
      })

    return (<WrappedComponent {..._.omit(this.props, ['setIdentityToken'])} />);
  }
});

const actionsCreator = { setIdentityToken };

export default initIdentityToken;