import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';
import PropType from 'prop-types';


import Header from '../../../components/Header/Header';
import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';


class CallSuccess extends Component {

  static propTypes = {
    alreadyLogged: PropType.bool.isRequired
  };

  static defaultProps = {
    alreadyLogged: false
  };

  render(){
    return (<View style={styles.container}>
      <Header title='呼叫成功' back={() => Actions.popTo('_recycle')} />
      <View style={styles.content}>
        <Image source={require('../../../assets/iconImg/right-call2x.png')} resizeMode='contain' style={styles.logo} />
        <Text style={styles.message}>呼叫成功</Text>
        <Text style={[styles.message, styles.messageSpacing]}>虎哥会在1小时内上门服务</Text>
        <Text style={[styles.message, styles.messageSpacing]}>请保持手机畅通</Text>
        {
          this.props.alreadyLogged ?
            <SubmitBtn style={styles.SubmitBtn} text='查看详情' submit={() => this.submit()} />
            :
            null
        }
      </View>
    </View>);
  }

  // 查看详情
  submit(){
    Actions.popTo('_recycle');
    Actions.jump('mine');
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