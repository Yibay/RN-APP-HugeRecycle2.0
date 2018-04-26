import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class DisableBtn extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render(){
    return (<View style={styles.container}>
      <Text style={styles.text}>{this.props.text}</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: 139,
    height: 57,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: '#888',
  },
});

export default DisableBtn;