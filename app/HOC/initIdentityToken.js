// 初始化 登录状态

import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';


// Action
import { setIdentityToken } from '../redux/actions/IdentityToken';
import { setLocation, setUserAddressList } from '../redux/actions/Location';
import request from "../util/request/request";
import config from "../util/request/config";


const initIdentityToken = (WrappedComponent) => connect(null, actionsCreator)(class extends Component {

  async componentWillMount(){

    // 1. 获取本地储存 身份信息（token）
    let ret = await storage
      .load({ key: 'identityToken' })
      .catch(err => {console.warn(err); return null}); // 若未找到，则log对应信息

    // 若找到 则更新到数据流中
    if(ret){
      this.props.setIdentityToken(ret);

      // 2. 获取 一键呼叫 默认地址 (defaultAddress)
      let defaultAddress = await request
        .get(config.api.getDefaultAddress, null, {'X-AUTH-TOKEN': ret['X-AUTH-TOKEN']})
        .catch(err => {console.log(err); return null;}); // 若请求报错，则log对应信息

      // 一键呼叫 默认地址 数据正确
      if(defaultAddress && !defaultAddress.status){
        this.props.setLocation(defaultAddress.data);
      }

      // 3. 获取 用户地址列表
      let addressList = await request
        .get(config.api.getAddressList, null, {'X-AUTH-TOKEN': ret['X-AUTH-TOKEN']})
        .catch(err => {console.log(err); return null;});
      // 用户地址列表 数据正确
      if(addressList && !addressList.status){
        this.props.setUserAddressList(addressList.data.addresses);
      }
    }

  }

  render(){

    return (<WrappedComponent {..._.omit(this.props, ['setIdentityToken', 'setLocation', 'setUserAddressList'])} />);
  }
});

const actionsCreator = { setIdentityToken, setLocation, setUserAddressList };

export default initIdentityToken;