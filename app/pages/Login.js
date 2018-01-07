import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';

class Login extends Component{
  render(){
    return (<View style={styles.container}><Text style={styles.text} onPress={() => Actions.pop()}>登录页（点击返回上一页）</Text></View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 34
  }
});

export default Login