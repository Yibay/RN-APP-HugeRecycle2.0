/**
 * 回收评价（评价虎哥）
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


import { verifyLogin } from '../HOC/verifyLogin';
import request from '../util/request/request';
import config from '../util/request/config';

import Header from '../components/common/Header/Header';


class RecycleEvaluation extends Component {

  static propTypes = {
    orderId: PropTypes.number.isRequired // 订单号
  };

  render(){
    return (<View style={styles.container}>
      <Header title='评价虎哥'/>
    </View>)
  }

  async componentDidMount(){
    // 获取订单信息
    const res = await request.get(`${config.api.order}${this.props.orderId}`,null,{'X-AUTH-TOKEN': this.props.identityToken.authToken})
    if(res){
      console.log(res);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default verifyLogin(RecycleEvaluation);