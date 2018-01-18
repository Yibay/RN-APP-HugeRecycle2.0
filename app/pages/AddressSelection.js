import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import Header from '../components/common/Header/Header';


class AddressSelection extends Component {

  render(){
    return (<View style={styles.container}>
      <Header title='选择地址' />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddressSelection;