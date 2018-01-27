// 需登录访问页面 代理

import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';


import Login from '../pages/Login';


function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken,
    identityToken: state.identityToken
  }
}

export const verifyLogin = WrappedComponent => connect(mapStateToProps)(
  class extends Component {

    static propTypes = {
      identityToken: PropTypes.shape({
        authToken: PropTypes.string.isRequired // 设置 请求头 'X-AUTH-TOKEN'时用
      }),
      authToken: PropTypes.string.isRequired
    };

    render(){
      // 若已登录，则进入
      if(this.props.authToken){
        return (<WrappedComponent {..._.omit(this.props, ['authToken'])} />);
      }
      // 否则 到登录页
      else{
        return (<Login />);
      }
    }
  }
);