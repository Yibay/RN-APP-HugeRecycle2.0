import React, { Component } from 'react';
import { StyleSheet, ScrollView ,View, Text } from 'react-native';


import { verifyLogin } from '../HOC/verifyLogin';
import request from '../util/request/request';
import config from '../util/request/config';

import Header from '../components/common/Header/Header';
import OrderItem from '../components/pages/EnvironmentalRecord/OrderItem';
import RecordBtn from '../components/common/Form/Btn/RecordBtn';


class EnvironmentalRecord extends Component {
  
  render(){
    console.log(this.props);
    return (<View style={styles.container}>
      <Header title='我的环保金记录' />
      <ScrollView style={styles.container}>
        <OrderItem createdTs='1515723538000' createOrderTime='2018-01-12 10:18:58' recycledItems='可回收物、CRT寸屏（14寸以下）、衣柜' status='已审/未派' rightButton={<RecordBtn text='催单' />}/>
      </ScrollView>
    </View>);
  }

  // 单一入口页，数据采用本层管理
  async componentDidMount(){
    console.log('EnvironmentalRecord--------componentDidMount');
    const res = await request
      .get(config.api.myOrders, null, {'X-AUTH-TOKEN': this.props.identityToken.authToken})

    console.log(res);
    // 若请求正常、且数据正常
    if(res && !res.status){
      console.log(res);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default verifyLogin(EnvironmentalRecord);