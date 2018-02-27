import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';


import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';


class MallNotOpen extends Component {

  render(){
    return <View style={styles.container}>
      <Image style={styles.img} resizeMode='contain' source={require('./img/notOpenIcon.png')} />
      <Text style={styles.explain}>当前小区暂末开通在线商城服务</Text>
      <SubmitBtn style={styles.submitBtn} text='重新选择小区' submit={() => Actions.locationPage()}/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  img: {
    width: 400,
    height: 382,
    marginTop: 44
  },
  explain: {
    marginTop: 54,
    fontSize: 30,
    fontWeight: '700',
    color: '#888'
  },
  submitBtn: {
    // width: 300,
    marginTop: 130
  }
});

export default MallNotOpen;