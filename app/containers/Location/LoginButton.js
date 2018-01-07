import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';


const LoginButton = () => (<TouchableOpacity onPress={Actions.login}>
  <View style={styles.loginBtn}>
    <Text style={styles.loginText}>已回收用户，手机号直接登录</Text>
  </View>
</TouchableOpacity>);

const styles = StyleSheet.create({
  loginBtn: {
    paddingHorizontal: 30,
    paddingVertical: 25,
    marginBottom: 100,
    backgroundColor: '#169bd5'
  },
  loginText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#fff'
  }
});


export default LoginButton;