import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import { verifyLogin } from '../HOC/verifyLogin';

import Header from '../components/common/Header/Header';


class MallCart extends Component {

  render(){
    return <View style={styles.container}>
      <Header title='订单结算'/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default verifyLogin(MallCart);