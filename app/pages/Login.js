import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';

class Login extends Component{
  render(){
    return (<View><Text onPress={() => Actions.pop()}>Login</Text></View>)
  }
}

export default Login