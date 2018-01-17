import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';


class Mine extends Component {

  render(){
    return (<View style={styles.container}>
      <Text onPress={() => Actions.login()}>我的</Text>
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

export default Mine;