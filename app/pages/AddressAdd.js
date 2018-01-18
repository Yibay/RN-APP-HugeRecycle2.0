import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import Header from '../components/common/Header/Header';


class AddressAdd extends Component {

  render(){
    return (<View style={styles.container}>
      <Header title='新增地址' />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddressAdd;