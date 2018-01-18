import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import { verifyLogin } from '../../HOC/verifyLogin';


class Mine extends Component {

  render(){
    return (<View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>我的</Text>
      </View>
      <Text>我的</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // 页头
  header: {
    paddingTop: 65,
    height: 128,
    borderBottomWidth: 1,
    borderBottomColor: '#b5b5b5',
    backgroundColor: '#f7f7f7'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '700'
  }
});

// 此页面需验证身份
export default verifyLogin(Mine);