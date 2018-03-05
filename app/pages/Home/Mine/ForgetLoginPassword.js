import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from "../../../components/Header/Header";


class ForgetLoginPassword extends Component {
  render(){
    return <View style={styles.container}>
      <Header title='修改登录密码'/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ForgetLoginPassword;