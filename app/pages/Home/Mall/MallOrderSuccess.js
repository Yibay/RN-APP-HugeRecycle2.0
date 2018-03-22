import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';


import Header from '../../../components/Header/Header';
import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';


class MallOrderSuccess extends Component {

  render(){
    return (<View style={styles.container}>
      <Header title='下单成功' back={Actions.popTo('_shoppingMall')} />
      <View style={styles.content}>
        <Image source={require('../../../assets/iconImg/right-call2x.png')} resizeMode='contain' style={styles.logo} />
        <Text style={styles.message}>下单成功</Text>
        <Text style={[styles.message, styles.messageSpacing]}>商家回尽快送货上门</Text>
        <Text style={[styles.message, styles.messageSpacing]}>请留意手机消息</Text>
        <SubmitBtn style={styles.SubmitBtn} text='查看详情' submit={() => this.submit()} />
      </View>
    </View>);
  }

  // 查看详情
  submit(){
    Actions.mallOrderRecordPage();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },
  logo: {
    width: 252,
    height: 252,
    marginTop: 66,
    marginBottom: 42
  },
  message: {
    fontSize: 28,
    color: '#888',
    fontWeight: '700'
  },
  messageSpacing: {
    marginTop: 18
  },
  SubmitBtn: {
    marginTop: 96
  }
});

export default MallOrderSuccess;