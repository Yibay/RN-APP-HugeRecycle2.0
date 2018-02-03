import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


import SubmitBtn from '../../components/common/Form/Btn/SubmitBtn';


class MallNotOpen extends Component {

  render(){
    return <View style={styles.container}>
      <Icons name='alert-circle' size={300} color='#888' />
      <Text style={styles.explain}>当前小区暂末开通在线商城服务</Text>
      <SubmitBtn style={styles.submitBtn} text='重新选择小区' submit={() => Actions.locationPage()}/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center'
  },
  explain: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '700'
  },
  submitBtn: {
    width: 300,
    marginTop: 300
  }
});

export default MallNotOpen;