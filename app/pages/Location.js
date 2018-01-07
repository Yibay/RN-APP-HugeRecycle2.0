import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import CommunitySelector from '../containers/Location/CommunitySelector';
import LoginButton from '../containers/Location/LoginButton'


class LocationPage extends Component{
  render(){
    return (<View style={styles.container}>
      <Text style={styles.prompt}>为了更好的为您服务，虎哥需要知道您的位置，请选择您所在的小区</Text>
      <CommunitySelector />
      <LoginButton />
      <View style={styles.serviceScope}>
        <Text style={styles.serviceScopeText}>查看全部服务范围</Text>
      </View>
    </View>)
  }
}

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
  },
  serviceScope: {
    marginBottom: 200,
  },
  serviceScopeText: {
    fontSize: 23
  }
});

export default LocationPage;