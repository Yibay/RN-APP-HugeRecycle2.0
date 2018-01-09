import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';


import request from '../../util/request/request';
import config from '../../util/request/config';

import ClassificationNavigation from '../../containers/Recycle/ClassificationNavigation';
import CallModule from '../../containers/Recycle/CallModule'

// garbageProducts
// furnitureProducts
// electricProducts

class Home extends Component{
  render(){
    return (<View style={styles.container}>
      <ClassificationNavigation />
      <CallModule />
    </View>)
  }

  componentDidMount(){
    request
      .get(config.api.base + config.api.getProducts)
      .then(res => console.log(res));
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  }
});

export default Home