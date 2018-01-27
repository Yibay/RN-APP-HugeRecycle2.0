/**
 * 初始化 登录状态
 * 改变登录状态、切换用户信息（一键呼叫 回收地址、用户回收地址列表）
 * */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';


// Action
import { setIdentityToken } from '../redux/actions/IdentityToken';
import { setLocation, setUserAddressList, defaultCurrentLocation } from '../redux/actions/Location';
import request from "../util/request/request";
import config from "../util/request/config";


const initIdentityToken = (WrappedComponent) => connect(mapStateToProps, actionsCreator)(class extends Component {

  async componentWillMount(){

    // 1. 获取本地储存 身份信息（token）
    let ret = await storage
      .load({ key: 'identityToken' })
      .catch(err => {console.warn(err); return null}); // 若未找到，则log对应信息

    // 1. 若找到 则更新到数据流中
    if(ret){
      this.props.setIdentityToken(ret);
    }

  }

  render(){

    return (<WrappedComponent {..._.omit(this.props, ['setIdentityToken', 'setLocation', 'setUserAddressList'])} />);
  }

  // 登录状态发生变化时（更新 相关用户信息）
  async componentDidUpdate(){
    // 若状态，切换为登录
    if(this.props.authToken){
      console.log('---登录---');

      // 清空 身份令牌信息
      // this.props.setLocation({
      //   'X-AUTH-TOKEN': '',
      //   h5Code: '',
      //   user: {}
      // })

      // 更新app需要的用户信息
      let [defaultAddress, addressList] = await Promise.all([ // 并发
        // 2. 获取 一键呼叫 默认地址 (defaultAddress)
        request
          .get(config.api.getDefaultAddress, null, {'X-AUTH-TOKEN': this.props.authToken})
          .catch(err => {console.log(err); return null;}), // 若请求报错，则log对应信息
        // 3. 获取 用户地址列表
        request
          .get(config.api.getAddressList, null, {'X-AUTH-TOKEN': this.props.authToken})
          .catch(err => {console.log(err); return null;})
      ]);

      // 2. 一键呼叫 回收地址 数据正确
      if(defaultAddress && !defaultAddress.status) {
        this.props.setLocation(defaultAddress.data);
      }

      // 3. 用户地址列表 数据正确
      if(addressList && !addressList.status){
        this.props.setUserAddressList(addressList.data.addresses);
      }

    }
    // 若退出登录
    else {
      console.log('---退出登录---');
      // 2. 清空 一键呼叫 回收地址信息
      this.props.setLocation(defaultCurrentLocation);
      // 3. 清空 用户回收地址列表
      this.props.setUserAddressList([]);
    }
  }
});

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken // 根据 登录状态切换，更新其他 Redux 数据
  }
}

const actionsCreator = { setIdentityToken, setLocation, setUserAddressList };

export default initIdentityToken;