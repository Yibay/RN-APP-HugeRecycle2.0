import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class Mall extends Component{
  render(){
    return (<View style={styles.container}>
      <Text>商场</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Mall;