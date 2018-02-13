// 需获取到便利店信息 访问页面 代理

import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import MallNotOpen from '../pages/Home/Mall/MallNotOpen';


export const verifyStoreInfo = WrappedComponent => connect(mapStateToProps)(class extends Component{

  static propTypes = {
    storeInfo: PropTypes.arrayOf(
      PropTypes.shape({
        storeId: PropTypes.number.isRequired
      })
    )
  };

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