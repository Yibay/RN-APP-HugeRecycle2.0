/**
 * 地址编辑页
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import Header from '../components/common/Header/Header';


class AddressEdit extends Component {

  render(){
    return (<View style={styles.container}>
      <Header title='编辑地址' />
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddressEdit;