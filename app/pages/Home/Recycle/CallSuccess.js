import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';


import Header from '../../../components/common/Header/Header';
import SubmitBtn from '../../../components/common/Form/Btn/SubmitBtn';


class CallSuccess extends Component {

  render(){
    console.log(this.props);
    return (<View style={styles.container}>
      <Header title='呼叫成功' />
      <View style={styles.content}>
        <Image source={require('../../../assets/iconImg/right-call2x.png')} resizeMode='contain' style={styles.logo} />
        <Text style={styles.message}>呼叫成功</Text>
        <Text style={[styles.message, styles.messageSpacing]}>虎哥会在15-30分钟内上门</Text>
        <Text style={[styles.message, styles.messageSpacing]}>请留意手机消息</Text>
        {
          this.props.alreadyLogged ?
          <SubmitBtn style={styles.SubmitBtn} text='查看详情' submit={() => this.submit()} />
          : null
        }
      </View>
    </View>);
  }

  // 查看详情
  submit(){
    Actions.popTo('recycle');
    Actions.environmentalRecordPage();
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

export default CallSuccess;