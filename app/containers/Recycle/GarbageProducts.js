import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class GarbageProducts extends Component{
  render(){
    return (<View style={[styles.container, this.props.show ? styles.none : styles.hide]}>
      <Text>可回收物页</Text>
    </View>)
  }

  componentWillUnmount(){
    console.log('小件干垃圾 componentWillUnmount')
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

export default GarbageProducts;