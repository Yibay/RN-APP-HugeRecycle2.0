import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


class Notice extends Component {
  render(){
    return <View style={styles.container}>
      <Icon style={styles.icon} name='alert-circle' size={28} color='#fff' />
      <Text style={styles.notice}>本店配送时间为: 09:00-20:00, 超出时间隔天配送</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 35,
    backgroundColor: '#898989',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 14,
    paddingBottom: 0
  },
  notice: {
    fontSize: 24,
    color: '#fff',
    lineHeight: 24
  }
});

export default Notice;