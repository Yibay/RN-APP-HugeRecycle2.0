import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class LocationPage extends Component{
  render(){
    return (<View style={styles.container}>
      <Text>定位地址页</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LocationPage;