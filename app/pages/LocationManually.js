import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/Header/Header';
import CommunitySearchEngines from '../containers/LocationManually/CommunitySearchEngines/CommunitySearchEngines';


class LocationManually extends Component {

  render(){
    return (<View style={styles.container}>
      <Header title='手动输入小区'/>
      <CommunitySearchEngines />
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LocationManually;