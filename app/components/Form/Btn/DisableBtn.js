import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class DisableBtn extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render(){
    return (<Text style={styles.container}>{this.props.text}</Text>);
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 28,
    color: '#888'
  }
});

export default DisableBtn;