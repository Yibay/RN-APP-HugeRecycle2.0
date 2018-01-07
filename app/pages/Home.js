import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';


import Login from './Login';

class Home extends Component{
  render(){
    return (<View style={styles.container}>
      <Text>Home</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Home