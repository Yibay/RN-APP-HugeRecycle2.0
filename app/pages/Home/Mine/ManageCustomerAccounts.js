import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';


import Header from '../../../components/common/Header/Header';


class ManageCustomerAccounts extends Component {

  render(){
    return (<View style={styles.container}>
      <Header title='安全中心'/>
      <View style={styles.content}>
        <Image style={styles.customerPhoto} source={{uri: 'https://avatars3.githubusercontent.com/u/18311200?s=460&v=4'}} resizeMode='contain'/>
        <View style={styles.lineSection}>
          <Text style={styles.text} onPress={() => Actions.manageLoginPassword()}>修改登录密码</Text>
        </View>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  customerPhoto: {
    width: 176,
    height: 176,
    marginTop: 26,
    alignSelf: 'center',
    borderRadius: 88,
    backgroundColor: '#ccc'
  },
  lineSection: {
    marginTop: 10,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 26
  }
});

export default ManageCustomerAccounts;