// 需获取到便利店信息 访问页面 代理

import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import StoreSelector from "../containers/common/StoreSelector/StoreSelector";
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
    // 该小区 有多个便利店
    if(this.props.storeInfo.length > 1 && this.props.showStoreSelector){
      return <StoreSelector storeInfo={this.props.storeInfo}>
        <WrappedComponent {...this.props}/>
      </StoreSelector>
    }
    // 该小区 一个便利店
    if(this.props.storeInfo.length){
      return <WrappedComponent {...this.props} />
    }
    // 该小区 无便利店
    else {
      return <MallNotOpen />
    }
  }
});

function mapStateToProps(state){
  return {
    storeInfo: state.mall.storeInfo,
    showStoreSelector: state.mall.showStoreSelector
  }
}