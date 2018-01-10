import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class FurnitureProducts extends Component{

  render(){
    return (<View style={[styles.container, this.props.show ? styles.none : styles.hide]}>
      <Text>家具页</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hide: {
    display: 'none'
  },
  none: {

  }
});

export default FurnitureProducts;