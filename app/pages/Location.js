import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';


import CommunitySelector from '../containers/Location/CommunitySelector';
class LocationPage extends Component{
  render(){
    return (<View style={styles.container}>
      <Text style={styles.prompt}>为了更好的为您服务，虎哥需要知道您的位置，请选择您所在的小区</Text>
      <CommunitySelector/>
    </View>)
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 37.5,
    alignItems: 'center'
  },
  prompt: {
    marginTop: 100,
    lineHeight: 35,
    fontSize: 26
  }
});

export default LocationPage;