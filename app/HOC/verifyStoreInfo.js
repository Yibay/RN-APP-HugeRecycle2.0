// 需获取到便利店信息 访问页面 代理

import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import StoreSelector from "../containers/common/StoreSelector/StoreSelector";
import MallNotOpen from '../pages/Home/Mall/MallNotOpen';


export const verifyStoreInfo = WrappedComponent => connect(mapStateToProps)(class extends Component{

  static propTypes = {
    storeObj: PropTypes.shape({
      storeInfo: PropTypes.arrayOf(
        PropTypes.shape({
          storeId: PropTypes.number.isRequired
        })
      ),
      storeIndex: PropTypes.number.isRequired,
      showStoreSelector: PropTypes.bool.isRequired
    })
  };

  render(){
    // 该小区 有多个便利店
    if(this.props.storeObj.storeInfo.length > 1 && this.props.storeObj.showStoreSelector){
      return <StoreSelector storeInfo={this.props.storeObj.storeInfo}>
        <WrappedComponent {...this.props}/>
      </StoreSelector>
    }
    // 该小区 一个便利店
    if(this.props.storeObj.storeInfo.length){
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
    // react组件上，不能随意绑定 store属性，所以此处改名storeObj，便于后续 使用...this.props 直接将 storeObj绑定到 react组件上
    storeObj: state.mall.store
  }
}