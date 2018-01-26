import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class CommunitySearched extends Component {

  render(){
    return (
        <View {...this.props} style={[styles.container].concat(this.props.style)}>
          <Text style={styles.communityName}>{this.props.communityData.communityName}</Text>
          <View style={styles.regionAndStreet}>
            <Text style={styles.region}>{this.props.communityData.region}</Text>
            <Text style={styles.street}>{this.props.communityData.street}</Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  communityName: {
    width: 178,
    textAlign: 'center',
    fontSize: 30,
    color: '#000'
  },
  regionAndStreet: {
    flex: 1,
    height: 48,
    borderLeftWidth: 2,
    borderLeftColor: '#dce0e3',
    flexDirection: 'row',
    alignItems: 'center'
  },
  region: {
    marginLeft: 32,
    fontSize: 30,
    color: '#888'
  },
  street: {
    marginLeft: 18,
    fontSize: 30,
    color: '#888'
  }
});

export default CommunitySearched;